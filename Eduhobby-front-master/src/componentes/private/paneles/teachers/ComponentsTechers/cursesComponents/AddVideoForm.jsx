import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const AddVideoForm = ({ courseId, onClose }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title) {
      setError('Please select a file and provide a title.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const accessToken = Cookies.get('accessToken');
      if (!accessToken) {
        throw new Error('Access token is missing.');
      }

      const formData = new FormData();
      formData.append('file', file);

      let uploadResponse = await fetch('https://eduhobby-back.vercel.app/videos', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (uploadResponse.status === 401) {
        const refreshToken = Cookies.get('refreshToken');
        if (!refreshToken) {
          throw new Error('Refresh token is missing.');
        }

        const refreshResponse = await fetch('https://eduhobby-back.vercel.app/refresh-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        });

        if (!refreshResponse.ok) {
          throw new Error('Failed to refresh token.');
        }

        const refreshData = await refreshResponse.json();
        Cookies.set('accessToken', refreshData.accessToken, { expires: 1, sameSite: 'strict', secure: true });

        uploadResponse = await fetch('https://eduhobby-back.vercel.app/videos', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${refreshData.accessToken}`,
          },
        });
      }

      if (!uploadResponse.ok) {
        throw new Error('Error uploading file.');
      }

      const uploadData = await uploadResponse.json();

      if (!uploadData.videoId) {
        throw new Error('Video URL is missing in upload response.');
      }

      const contentData = {
        title,
        videoId: uploadData.videoId,
      };

      let contentResponse = await fetch(`https://eduhobby-back.vercel.app/courses/${courseId}/content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('accessToken')}`,
        },
        body: JSON.stringify(contentData),
      });

      if (contentResponse.status === 403) {
        const refreshToken = Cookies.get('refreshToken');
        if (!refreshToken) {
          throw new Error('Refresh token is missing.');
        }

        const refreshResponse = await fetch('https://eduhobby-back.vercel.app/refresh-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        });

        if (!refreshResponse.ok) {
          throw new Error('Failed to refresh token.');
        }

        const refreshData = await refreshResponse.json();
        Cookies.set('accessToken', refreshData.accessToken, { expires: 1, sameSite: 'strict', secure: true });

        contentResponse = await fetch(`https://eduhobby-back.vercel.app/courses/${courseId}/content`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${refreshData.accessToken}`,
          },
          body: JSON.stringify(contentData),
        });
      }

      if (!contentResponse.ok) {
        const errorData = await contentResponse.json();
        throw new Error(errorData.Error || 'Error adding video to course.');
      }

      const contentResult = await contentResponse.json();
      console.log(contentResult);

      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'El video se ha subido y añadido al curso correctamente.',
        confirmButtonColor: '#16665d',
      }).then(() => {
        // Llamar a onClose después de que el usuario cierre el alert
        if (onClose) onClose();
      });

    } catch (err) {
      setError(err.message || 'Ocurrió un error inesperado.');

      // Mostrar SweetAlert de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message || 'Ocurrió un error inesperado al subir el video.',
        confirmButtonColor: '#16665d',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Agregar video al curso</h2>
      {error && <p className="text-red-500 text-sm italic mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Título del Video
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Ingrese el título del video"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-6">
        <div className="relative">
          <input
            id="file"
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => document.getElementById('file').click()}
            className="w-full bg-transparent border-2 border-dashed border-[#16665d] text-[#16665d] hover:bg-[#16665d] hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            {file ? file.name : 'Seleccionar video'}
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center">
      <button
  type="submit"
  className={`relative text-center flex items-center justify-center w-full px-6 py-3 text-base font-medium rounded-md shadow-sm transition-all duration-300 ease-in-out overflow-hidden ${
    loading
      ? 'bg-[var(--fondo-color)] text-white cursor-not-allowed'
      : 'bg-gradient-to-r from-[#0BA675] to-[#16665d] hover:from-[#16665d] hover:to-[#0BA675] text-white'
  }`}
  disabled={loading}
>
  {loading ? (
    <div className="flex items-center">
      <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Subiendo...</span>
    </div>
  ) : (
    <span>Subir Video</span>
  )}
</button>
      </div>
    </form>
  );
};

export default AddVideoForm;

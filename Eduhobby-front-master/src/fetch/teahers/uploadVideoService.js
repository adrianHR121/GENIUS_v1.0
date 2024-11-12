const API_URL = 'https://eduhobby-back.vercel.app';

export const uploadVideo = async (file) => {
  const formData = new FormData();
  formData.append('video', file);

  const response = await fetch(`${API_URL}/videos`, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json', // Asegúrate de aceptar respuestas JSON
    },
  });

  if (!response.ok) {
    throw new Error('Failed to upload video');
  }

  return response.json();
};

export const linkVideoToCourse = async (courseId, title, videoUrl) => {
  const response = await fetch(`${API_URL}/courses/${courseId}/content`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json', // Asegúrate de aceptar respuestas JSON
    },
    body: JSON.stringify({ title, videoUrl }),
  });

  if (!response.ok) {
    throw new Error('Failed to link video to course');
  }

  return response.json();
};

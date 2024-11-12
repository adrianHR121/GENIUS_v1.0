import React from 'react';

const MessAuth = ({ email }) => {
  return (
    <div className="mensaje-autenticacion bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
      <strong className="font-bold">Error de autenticación:</strong>
      <p className="block sm:inline">
        El correo electrónico <strong>{email}</strong> no está autenticado o ha ocurrido un error durante el inicio de sesión.
      </p>
      <p className="block sm:inline">
        Por favor, verifica tus credenciales o contacta con soporte si el problema persiste.
      </p>
    </div>
  );
};

export default MessAuth;
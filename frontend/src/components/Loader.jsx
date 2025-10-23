import React from 'react';

function Loader() {
  return (
    <div 
      className="flex justify-center items-center w-full" 
      style={{ height: 'calc(100vh - 7.5rem)' }} 
    >
      {/* Este es el spinner */}
      <div 
        className="w-16 h-16 border-4 border-purple-600 border-t-purple-200 rounded-full animate-spin"
        role="status"
      >
        <span className="sr-only">Cargando...</span> {/* Para accesibilidad */}
      </div>
    </div>
  );
}

export default Loader;
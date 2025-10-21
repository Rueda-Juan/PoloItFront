import { useState } from "react";

function EditarTareaModal({ tarea, onClose, onSubmit }) {
  const [titulo, setTitulo] = useState(tarea.titulo);
  const [descripcion, setDescripcion] = useState(tarea.descripcion || "");

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3001/tareas/${tarea.id_tarea}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, descripcion }),
      });
      if (res.ok) {
        onSubmit();
        onClose();
      } else {
        alert("Error al actualizar la tarea");
      }
    } catch (err) {
      console.error("Error al enviar datos de edición:", err);
    }
  };

  return (
    <>
      {/* Fondo oscuro de Bootstrap */}
      <div className="modal-backdrop fade show"></div>

      {/* Modal centrado con Bootstrap */}
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content glass p-3">
            <div className="modal-header border-0">
              <h5 className="modal-title">Editar tarea</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={manejarSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control glass"
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control glass"
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                  ></textarea>
                </div>
                <div className="modal-footer border-0">
                  <button
                    type="button"
                    className="btn glass btn-glass-red"
                    onClick={onClose}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn glass btn-glass-green"
                  >
                    Guardar cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditarTareaModal;

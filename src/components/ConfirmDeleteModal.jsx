function ConfirmDeleteModal({ estaAbierto, onConfirmar, onCancelar }) {
  if (!estaAbierto) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>¿Estás seguro que querés eliminar este post?</p>
        <div className="btn-group">
          <button onClick={onCancelar} className="btn btn-secondary">Cancelar</button>
          <button onClick={onConfirmar} className="btn btn-danger">Eliminar</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
function ConfirmDeleteModal({ estaAbierto, onConfirmar, onCancelar }) {
  if (!estaAbierto) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px' }}>
        <p>¿Estás seguro que querés eliminar este post?</p>
        <button onClick={onCancelar}>Cancelar</button>
        <button onClick={onConfirmar}>Eliminar</button>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
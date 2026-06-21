export default function ConfirmModal({ onConfirm, onCancel, isDeleting }) {
  return (
    <div className="modal-backdrop">
      <div className="confirm-modal">
        <p>Are you sure to delete this article?</p>

        <div className="modal-actions">
          <button type="button" className="cancel-button" onClick={onCancel}>
            No
          </button>

          <button
            type="button"
            className="delete-button"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
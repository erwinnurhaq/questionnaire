import { Button, Modal } from 'rsuite';

export default function ConfirmSubmit({ open, handleClose, handleSubmit }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>Konfirmasi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Apakah anda yakin? Setelah terkirim jawaban dan hasil tidak dapat diubah.
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit} appearance="primary">
          Ya
        </Button>
        <Button onClick={handleClose} appearance="subtle">
          TIdak
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

import {
  useEffect,
  useRef,
  type MouseEvent,
  type ReactNode,
  type SyntheticEvent,
} from "react";
import "./Modal.css";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      dialog.classList.remove("closing");
    }

    if (!isOpen && dialog.open) {
      dialog.classList.add("closing");
    }
  }, [isOpen]);

  const handleAnimationEnd = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (dialog.classList.contains("closing")) {
      dialog.close();
      dialog.classList.remove("closing");
      onClose();
    }
  };

  const handleBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      dialogRef.current?.classList.add("closing");
    }
  };

  const handleCancel = (e: SyntheticEvent<HTMLDialogElement>) => {
    e.preventDefault();
    dialogRef.current?.classList.add("closing");
  };

  return (
    <dialog
      className="modal"
      onClick={handleBackdropClick}
      onCancel={handleCancel}
      onAnimationEnd={handleAnimationEnd}
      ref={dialogRef}
    >
      <div className="modal-content">{children}</div>
    </dialog>
  );
};

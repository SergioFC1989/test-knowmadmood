import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const modalRoot = document.getElementById("modal-root");

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const [show, setShow] = useState(false); // controla render del modal
  const [animateOut, setAnimateOut] = useState(false); // controla animación de salida

  const defer = useCallback((fn: () => void, time: number = 0) => {
    const timer = setTimeout(() => {
      fn();
    }, time);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Apertura del Modal
  useEffect(() => {
    if (isOpen) {
      defer(() => {
        setShow(true);
        setAnimateOut(false);
      }, 10);
    }
  }, [defer, isOpen]);

  // Cierre del Modal
  useEffect(() => {
    // Si el modal se cierra, primero ejecutamos la animación de salida y luego ocultamos el modal
    if (!isOpen && show) {
      defer(() => {
        setAnimateOut(true);
      });

      defer(() => {
        setShow(false);
        setAnimateOut(false);
      }, 300);
    }
  }, [defer, isOpen, show]);

  // Bloquear scroll mientras el modal está abierto
  useEffect(() => {
    if (show) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  const classNameOverlay = useMemo(
    () =>
      `modal-overlay ${animateOut ? "overlay-slide-up" : "overlay-slide-down"}`,
    [animateOut],
  );
  const classNameContent = useMemo(
    () =>
      `modal-content ${animateOut ? "content-slide-up" : "content-slide-down"}`,
    [animateOut],
  );

  if (!show || !modalRoot) {
    return null;
  }

  return createPortal(
    <div className={classNameOverlay} onClick={onClose}>
      <div className={classNameContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    modalRoot,
  );
};

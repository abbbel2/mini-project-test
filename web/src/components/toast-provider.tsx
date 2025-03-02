/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { ToastContainer } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";

type ToastType = "success" | "danger";

interface ToastContextProps {
  showToast: (title: string, message: string, type?: ToastType) => void;
  hideToast: () => void;
}

const ConfirmationContext = createContext<ToastContextProps>(
  {} as ToastContextProps
);

export const useToastContext = (): ToastContextProps =>
  useContext(ConfirmationContext);

type ToastProviderProps = {
  children: ReactNode;
};

export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<ToastType>("success");

  const debounce = (fn: any) => {
    let timer;
    return (() => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(), 3000);
    })();
  };

  const showToast = useCallback(
    (title: string, message: string, type?: ToastType) => {
      setOpen(true);
      setTitle(title);
      setMessage(message);
      if (type) {
        setType(type);
      }
      debounce(() => hideToast());
    },
    []
  );

  const hideToast = useCallback(() => {
    setOpen(false);
    setTitle("");
    setMessage("");
  }, []);

  return (
    <ConfirmationContext.Provider value={{ showToast, hideToast }}>
      {children}
      <ToastContainer
        className="p-3"
        position="bottom-end"
        style={{ zIndex: 1 }}
      >
        <Toast show={open} onClose={hideToast} bg={type}>
          <Toast.Header>
            <strong className="me-auto">{title}</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </ConfirmationContext.Provider>
  );
};

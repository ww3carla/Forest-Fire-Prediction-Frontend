import * as React from "react";

type ToastProps = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  duration?: number;
};

type ToastState = {
  toasts: ToastProps[];
};

const ToastContext = React.createContext<{
  state: ToastState;
  toast: (t: Omit<ToastProps, "id">) => { id: string; dismiss: () => void };
  dismiss: (id?: string) => void;
} | null>(null);

function genId() {
  return Math.random().toString(36).slice(2);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const dismiss = React.useCallback((id?: string) => {
    if (!id) {
      setToasts([]);
      return;
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = React.useCallback(
    (t: Omit<ToastProps, "id">) => {
      const id = genId();
      const duration = t.duration ?? 4000;

      setToasts((prev) => [{ ...t, id, duration }, ...prev]);

      if (duration > 0) {
        window.setTimeout(() => dismiss(id), duration);
      }

      return { id, dismiss: () => dismiss(id) };
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ state: { toasts }, toast, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
}

export const toast = (t: Omit<ToastProps, "id">) => {
  console.warn("toast() called but ToastProvider is not mounted yet.", t);
  return { id: "", dismiss: () => {} };
};

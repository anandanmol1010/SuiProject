import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (message: string, type: ToastType, duration?: number, action?: Toast['action']) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (message: string, type: ToastType, duration = 5000, action?: Toast['action']) => {
      const id = Date.now().toString();
      const newToast: Toast = { id, message, type, duration, action };

      setToasts(prev => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-md">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const bgColor = {
    success: 'bg-green-900/80 border-green-700',
    error: 'bg-red-900/80 border-red-700',
    info: 'bg-blue-900/80 border-blue-700',
  }[toast.type];

  const Icon = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  }[toast.type];

  const textColor = {
    success: 'text-green-200',
    error: 'text-red-200',
    info: 'text-blue-200',
  }[toast.type];

  return (
    <div className={`${bgColor} border rounded-lg p-4 flex items-start gap-3 backdrop-blur-sm`}>
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${textColor}`} />
      <div className="flex-1">
        <p className={`text-sm ${textColor}`}>{toast.message}</p>
        {toast.action && (
          <button
            onClick={toast.action.onClick}
            className="text-xs mt-2 underline hover:opacity-80"
          >
            {toast.action.label}
          </button>
        )}
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="flex-shrink-0 text-slate-400 hover:text-slate-200"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

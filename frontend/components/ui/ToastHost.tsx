"use client";

import { useEffect, useRef } from "react";
import Badge from "@/components/ui/Badge";
import { CoffeeType } from "@/lib/types";

type ToastKind = "info" | "success" | "warn";

type ToastItem = {
  id: string;
  kind: ToastKind;
  title: string;
  message?: string;
  coffeeType?: CoffeeType;
  createdAt: number;
  durationMs?: number;
};

export default function ToastHost({
  toasts,
  onRemove,
}: {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}) {
  const timers = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    // set auto-dismiss timers
    toasts.forEach((t) => {
      if (timers.current.has(t.id)) return;

      const duration = t.durationMs ?? 2600;
      const timerId = window.setTimeout(() => {
        onRemove(t.id);
        timers.current.delete(t.id);
      }, duration);

      timers.current.set(t.id, timerId);
    });

    // ✅ copy ref to local var for safe cleanup
    const currentTimers = timers.current;
    return () => {
      currentTimers.forEach((id) => clearTimeout(id));
      currentTimers.clear();
    };
  }, [toasts, onRemove]);

  return (
    <div
      className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-50 flex flex-col gap-2 w-[92vw] sm:w-[360px]"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((t) => (
        <ToastCard key={t.id} toast={t} onClose={() => onRemove(t.id)} />
      ))}
    </div>
  );
}

function ToastCard({
  toast,
  onClose,
}: {
  toast: ToastItem;
  onClose: () => void;
}) {
  const color =
    toast.kind === "success"
      ? "border-emerald-400/30 bg-emerald-400/10"
      : toast.kind === "warn"
      ? "border-amber-400/30 bg-amber-400/10"
      : "border-white/10 bg-white/5";

  const dot =
    toast.kind === "success"
      ? "bg-emerald-400"
      : toast.kind === "warn"
      ? "bg-amber-400"
      : "bg-sky-300";

  return (
    <div
      className={`rounded-2xl border ${color} backdrop-blur-md shadow-xl px-4 py-3 flex gap-3 items-start animate-[toast-in_220ms_ease-out]`}
      role="status"
    >
      <div className={`mt-1 h-2.5 w-2.5 rounded-full ${dot}`} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <div className="text-sm font-semibold text-slate-100 truncate">
            {toast.title}
          </div>
          {toast.coffeeType && <Badge type={toast.coffeeType} />}
        </div>
        {toast.message && (
          <div className="text-xs text-slate-200/90 mt-1 leading-relaxed">
            {toast.message}
          </div>
        )}
      </div>

      <button
        onClick={onClose}
        className="text-slate-300 hover:text-white text-sm px-1"
        aria-label="Close notification"
      >
        ✕
      </button>

      <style jsx global>{`
        @keyframes toast-in {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}

export type { ToastItem, ToastKind };

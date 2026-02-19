import { useEffect, useRef, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, XCircle } from "lucide-react";

type Props = {
  value?: string;
  onChange: (date: string) => void;
  placeholder?: string;
  disablePastDates?: boolean; // ⭐ NOUVEAU
  required?: boolean;         // ⭐ NOUVEAU
};

export default function CustomPicker({
  value,
  onChange,
  placeholder = "Choisir une date",
  disablePastDates = false,
  required = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(new Date());
  const [touched, setTouched] = useState(false); // pour gérer required
  const ref = useRef<HTMLDivElement>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = current.getFullYear();
  const month = current.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const format = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  
  const style1 = `
  w-full pl-10 pr-3 py-2 sm:py-3
            bg-gray-50 border border-gray-100 rounded-xl cursor-pointer
            text-sm font-medium text-slate-700
            hover:border-[#e0692d]/50
            focus-within:ring-2 focus-within:ring-[#e0692d]/30
            transition-all`;
  const style2 = `w-full pl-11 pr-10 py-3 bg-slate-50 border-none
                  rounded-[18px] focus:ring-2 focus:ring-orange-100 
                  outline-none text-sm appearance-none cursor-pointer 
                  text-slate-600 font-medium`;

  const isPast = (day: number) => {
    if (!disablePastDates) return false;
    const d = new Date(year, month, day);
    return d < today;
  };

  const handleSelect = (day: number) => {
    if (isPast(day)) return;
    const d = new Date(year, month, day);
    onChange(format(d));
    setOpen(false);
    setTouched(true); // sélection faite, valide required
  };

  const isSelected = (day: number) => {
    if (!value) return false;
    const d = new Date(value);
    return (
      d.getDate() === day &&
      d.getMonth() === month &&
      d.getFullYear() === year
    );
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  const showError = required && touched && !value;

  return (
    <div ref={ref} className="relative w-full">
      {/* INPUT */}
      <div className="relative w-full">
        <Calendar
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#e0692d]/50 pointer-events-none"
        />
            <div
                onClick={() => setOpen(!open)}
                className={`
                    ${!disablePastDates ? style2 : style1}
                    ${showError ? "border-red-400" : "border-slate-200"}
            `}
            >
            {/* Placeholder ou valeur */}
            {value ? (
            <span>{new Date(value).toLocaleDateString()}</span>
            ) : (
            <span className="text-slate-400">{placeholder}</span>
            )}

            {value && (
            <button
                onClick={(e) => {
                e.stopPropagation();
                onChange("");
                setTouched(true);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 hover:text-red-400"
            >
                <XCircle size={14} />
            </button>
            )}

            {/* Hidden input pour focus */}
            <input
            type="text"
            value={value || ""}
            onChange={() => {}}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            required={required}
            />
        </div>

        {showError && <p className="text-red-500 text-xs mt-1">Ce champ est requis</p>}
        </div>


      {/* ERREUR REQUIRED */}
      {showError && (
        <p className="text-red-500 text-xs mt-1">Ce champ est requis</p>
      )}

      {/* POPUP */}
      {open && (
        <div className="absolute z-50 mt-2 w-64 sm:w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 sm:p-4">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => setCurrent(new Date(year, month - 1, 1))}
              className="p-1.5 hover:bg-slate-100 rounded-lg"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="font-semibold text-xs sm:text-sm">
              {current.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </div>

            <button
              onClick={() => setCurrent(new Date(year, month + 1, 1))}
              className="p-1.5 hover:bg-slate-100 rounded-lg"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* DAYS HEADER */}
          <div className="grid grid-cols-7 text-[10px] sm:text-xs text-slate-400 mb-1">
            {["D", "L", "M", "M", "J", "V", "S"].map((d, idx) => (
            <div key={`${d}-${idx}`} className="text-center">{d}</div>
            ))}
          </div>

          {/* DAYS GRID */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((d, i) =>
              d ? (
                <button
                  key={i}
                  disabled={isPast(d)}
                  onClick={() => handleSelect(d)}
                  className={`
                    h-8 w-8 sm:h-9 sm:w-9
                    rounded-lg text-xs sm:text-sm font-medium
                    transition-all
                    ${isSelected(d)
                      ? "bg-[#e0692d] text-white shadow"
                      : isPast(d)
                      ? "text-slate-300 cursor-not-allowed"
                      : "hover:bg-orange-50"}
                  `}
                >
                  {d}
                </button>
              ) : (
                <div key={i} />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

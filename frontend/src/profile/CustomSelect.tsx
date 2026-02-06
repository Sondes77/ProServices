import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Sélectionner"
}: Props) {
  const [open, setOpen] = useState(false);

  const selected = options.find(o => o.value === value);

  return (
    <div className="relative">
      {/* Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          w-full p-4 rounded-2xl
          bg-gray-50 border border-gray-200
          hover:bg-white hover:border-orange-200
          focus:ring-2 focus:ring-orange-200
          transition-all
          flex justify-between items-center
          text-left
        "
      >
        <span className={selected ? "text-gray-800" : "text-gray-400"}>
          {selected ? selected.label : placeholder}
        </span>

        <ChevronDown
          size={18}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="
          absolute z-50 mt-2 w-full
          bg-white rounded-2xl shadow-xl border border-gray-100
          overflow-hidden
          animate-in fade-in zoom-in duration-150
        ">
          {options.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="
                w-full px-4 py-3 text-left
                hover:bg-orange-50 hover:text-orange-700
                transition
              "
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

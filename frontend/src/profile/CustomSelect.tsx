import { useState, useEffect, useRef } from "react";
import { BrickWallIcon, BriefcaseBusiness, ChevronDown, Clock, Filter, Icon, MapPin, SlidersHorizontal, StarIcon, StarOffIcon, Stars, Tag } from "lucide-react";
import Reviews from "./Reviews";

interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  name?: string; // pour le form
  className?: string; // pour styles personnalisés
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Sélectionner",
  required = false,
  disabled = false,
  name = "custom-select",
  className = ""
}: Props) {
  const [open, setOpen] = useState(false);
  const [touched, setTouched] = useState(false);

  const selected = options.find(o => o.value === value);
  const showError = required && touched && !value;
  const containerRef = useRef<HTMLDivElement>(null);
  // 🔹 Fermer dropdown quand clic en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      
      {/* input caché pour validation HTML required */}
      {required && (
        <input
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={() => {}}
          name={name}
          required
          className="absolute opacity-0 pointer-events-none h-0 w-0"
        />
      )}
      {name === "mappin" ? (
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-[#e0692d] transition-colors" />
      </div>
      ) : name === "category" ? (
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Tag className="h-5 w-5 text-gray-400 group-focus-within:text-[#e0692d] transition-colors" />
        </div>
      ) : name === "metier" ?(
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <BriefcaseBusiness className="h-5 w-5 text-gray-400 group-focus-within:text-[#e0692d] transition-colors" />
        </div>
      ) : name === "disponibility" ? (
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Clock className="h-5 w-5 text-gray-400 group-focus-within:text-[#e0692d] transition-colors" />
        </div>
      ) : name === "filtre" ? (
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <SlidersHorizontal size={14} className="h-5 w-5 text-gray-400 group-focus-within:text-[#e0692d] transition-colors" />
        </div>
      ): (
        null
      )}
      
      {/* Button */}
      <button
        type="button"
        onClick={() => {
          setOpen(!open);
          setTouched(true);
        }}
        className={`
          w-full pl-12 pr-3 py-3 rounded-2xl
          border
          transition-all flex justify-between items-center text-left
          ${disabled
            ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-50 border-gray-200 hover:bg-white hover:border-orange-200 focus:ring-2 focus:ring-orange-200"
          }
          ${className}
          
        `}
      >
       {/*${showError ? "border-red-400 ring-2 ring-red-200" : "border-gray-200"}*/}
        <span className={selected ? "text-gray-800" : "text-gray-400"}>
          {selected ? selected.label : placeholder}
        </span>
        {disabled ? 
          <ChevronDown
            size={18}
            className={`text-gray-400 transition-transform ${!open}`}
          />
        :   
          <ChevronDown
            size={18}
            className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          />
        }
      </button>

      {/* Dropdown */}
      {open && !disabled && (
        <div
          className="
            absolute z-50 mt-2 w-full
            bg-white rounded-2xl shadow-xl border border-gray-100
            overflow-hidden
            animate-in fade-in zoom-in duration-150
          "
        >
          <div className="max-h-60 overflow-y-auto">
            {options.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                  setTouched(true);
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
        </div>
      )}
      
      {/* message erreur 
      {showError && (
        <p className="text-red-500 text-xs mt-2">
          Ce champ est obligatoire
        </p>
      )}*/}
    </div>
  );
}

import { useState, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  label: string;
 value: string; 
 id: string;
 name: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  value,

}) => {

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onChange(value); // Trigger parent handler
  };

  return (
    <select
      className={`h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${className}`}
      value={value} // Control value from parent (formData.position)
      onChange={handleChange}
    >
      {/* Placeholder option */}
      <option
        value=""
        disabled
        className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
      >
        {placeholder}
      </option>
      {/* Map over options */}
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
import React from "react";

interface CategoryItemProps {
  id: string;
  name: string;
  label: string;
  checked?: boolean;
  onChange?: () => void;
}

export function CategoryItem({ id, name, label, checked, onChange }: CategoryItemProps) {
  return (
    <div>
      <input
        type="radio"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className="peer hidden"
      />
      <label
        htmlFor={id}
        className="block p-4 border rounded-lg cursor-pointer text-sm
                   bg-gray-100 peer-checked:bg-amber-500"
      >
        {label}
      </label>
    </div>
  );
}

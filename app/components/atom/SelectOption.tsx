"use client";

interface ISelectOption {
    label: string;
    name: string;
    value: string;
    options: string[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectOption({
    label,
    name,
    value,
    options,
    onChange,
}: ISelectOption) {
    return (
        <label className="block mb-2">
            {label}
            <select
                name={name}
                value={value}
                onChange={onChange}
                required
                className="w-full border px-2 py-1 rounded mt-0"
            >
                <option value="">Selecione...</option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </label>
    );
}

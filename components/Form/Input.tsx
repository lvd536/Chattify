interface IProps {
    labelName: string;
    name: string;
    id?: string;
    value: string;
    required?: boolean;
    type?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
    labelName,
    name,
    onChange,
    value,
    id,
    required,
    type,
}: IProps) {
    return (
        <>
            <label
                htmlFor={id || name}
                className="self-start text-text text-sm font-medium text-nowrap"
            >
                {labelName}
            </label>
            <input
                type={type || "text"}
                name={name}
                id={id || name}
                required={required}
                className="w-full h-10 rounded-lg bg-edit-form-bg border-none text-text px-4 focus:ring-1 placeholder:text-edit-form-text transition-all duration-300"
                value={value}
                onChange={onChange}
            />
        </>
    );
}

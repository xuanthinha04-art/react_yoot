
interface InputCustomProps {
    name: string;
    value: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string
}

const InputCustom: React.FC<InputCustomProps> = ({
    name,
    value,
    placeholder,
    onChange,
    type = 'text'
}) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            style={{ height: "30px", width: "500px" }}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}

export default InputCustom
import React from 'react';

interface InputProps {
    type: string;
    id: string;
    placeholder: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean; 

}

const Input: React.FC<InputProps> = ({ type, id, placeholder, name, value, onChange, required }) => {
    return (
        <input
            type={type}
            id={id}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full border rounded p-2 mb-2" 
            
        />

    );

};

export default Input;
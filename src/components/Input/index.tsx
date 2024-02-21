import { ChangeEventHandler, FC, ReactElement } from 'react';

interface InputProps {
    id: string;
    value?: string;
    type?: 'text' | 'number';
    label?: string;
    placeholder?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const Input: FC<InputProps> = ({ id, value, type = 'text', label, placeholder, onChange }): ReactElement => {
    const fullId = 'ipt-' + id;

    return (
        <div className="ipt-container">
            {label && (
                <label htmlFor={fullId} className="ipt-label">
                    {label}:
                </label>
            )}

            <input
                id={fullId}
                value={value}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                className="ipt-field"
            />
        </div>
    );
};

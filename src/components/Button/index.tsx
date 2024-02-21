import { FC, ReactElement } from 'react';

interface ButtonProps {
    children: string;
    onClick: () => void;
}

export const Button: FC<ButtonProps> = ({ children, onClick }): ReactElement => {
    return (
        <button className="btn" onClick={onClick}>
            {children}
        </button>
    );
};

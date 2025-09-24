import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'link';
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, ...props }) => {
  const baseStyles = 'px-4 py-2 rounded focus:outline-none focus:ring';
  const variantStyles = {
    primary: 'bg-green-500 text-white hover:bg-green-600',
    secondary: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
    link: 'text-blue-500 hover:underline',
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
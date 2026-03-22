import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input: React.FC<InputProps> = ({ error, className = '', ...props }) => {
  return (
    <div className="w-full">
      <input
        className={`flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-main placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-zinc-950 disabled:cursor-not-allowed disabled:bg-disabled/20 disabled:opacity-50 transition-all ${
          error ? 'border-error focus:ring-error' : ''
        } ${className}`}
        {...props}
      />
      {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;

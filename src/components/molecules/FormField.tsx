import React from 'react';
import Input from '../atoms/Input';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
  label,
  error,
  required,
  ...props
}) => {
  return (
    <div className="space-y-2 w-full">
      <label className="text-sm font-semibold text-text-main leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      <Input error={error} {...props} />
    </div>
  );
};

export default FormField;

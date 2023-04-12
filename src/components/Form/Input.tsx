import React, { useState } from 'react';

type Props = {
  id: string;
  label?: string;
  description?: string;
  type: 'text' | 'textarea';
  placeholder?: string;
  onChange: (value: string) => void;
  rows?: number;
  defaultValue?: string;
};

function Input({
  id,
  label,
  description,
  type,
  placeholder,
  defaultValue,
  rows = 4,
  onChange,
}: Props) {
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsValid(!!e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col mb-6">
      {label && description && (
        <>
          <label htmlFor={id} className="text-blue-dark text-body-3 font-bold mb-[2px]">
            {label}
          </label>
          <p className="text-blue-gray text-body-3 mb-4">{description}</p>
        </>
      )}
      {type === 'text' ? (
        <input
          id={id}
          className={`peer rounded-md bg-white-dark text-body-2 h-12 pl-4 text-blue-dark outline-0 transition-shadow duration-200 ease-in-out
           ${
             isValid
               ? 'focus:ring-blue focus:ring-[1px] hover:ring-blue hover:ring-[1px]'
               : 'invalid:ring-red invalid:ring-[1px] invalid:focus:ring-red invalid:focus:ring-[1px] invalid:hover:ring-red invalid:hover:ring-[1px]'
           }`}
          required={true}
          onInvalid={() => setIsValid(false)}
          onChange={handleChange}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
      ) : (
        <textarea
          id={id}
          className={`peer rounded-md bg-white-dark text-body-2 p-4 text-blue-dark outline-0 transition-shadow duration-200 ease-in-out
          ${
            isValid
              ? 'focus:ring-blue focus:ring-[1px] hover:ring-blue hover:ring-[1px]'
              : 'invalid:ring-red invalid:ring-[1px] invalid:focus:ring-red invalid:focus:ring-[1px] invalid:hover:ring-red invalid:hover:ring-[1px]'
          }`}
          rows={rows}
          required={true}
          onInvalid={() => setIsValid(false)}
          onChange={handleChange}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
      )}
      {!isValid && (
        <p className="mt-1 invisible peer-invalid:visible text-red text-body-3">Can’t be empty</p>
      )}
    </div>
  );
}

export default Input;

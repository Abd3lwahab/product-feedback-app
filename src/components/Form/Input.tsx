import React, { useState } from 'react';

type Props = {
  id: string;
  label: string;
  description: string;
  type: 'text' | 'textarea';
  onChange: (value: string) => void;
};

function Input({ id, label, description, type, onChange }: Props) {
  const [value, setValue] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
    setIsValid(!!e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col mb-6">
      <label htmlFor={id} className="text-blue-dark text-body-3 font-bold mb-[2px]">
        {label}
      </label>
      <p className="text-blue-gray text-body-3 mb-4">{description}</p>
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
          onBlur={() => setIsValid(!!value)}
          onChange={handleChange}
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
          rows={4}
          required={true}
          onInvalid={() => setIsValid(false)}
          onBlur={() => setIsValid(!!value)}
          onChange={handleChange}
        />
      )}
      {!isValid && (
        <p className="mt-1 invisible peer-invalid:visible text-red text-body-3">Can’t be empty</p>
      )}
    </div>
  );
}

export default Input;

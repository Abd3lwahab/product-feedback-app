import React, { ButtonHTMLAttributes } from 'react';

type Props = {
  color: 'purple' | 'blue' | 'blue-dark' | 'red';
  text: string | React.ReactNode;
  onClick?: () => void;
  customClass?: string;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ color, text, onClick, customClass, isLoading, ...props }: Props) {
  return (
    <div className={customClass}>
      <button
        onClick={onClick}
        className={`bg-${color} text-white rounded-lg h-11 px-6 text-h4 hover:brightness-110 focus:ring-2 focus:ring-${color} focus:ring-opacity-50 capitalize flex flex-row justify-center items-center w-full ${
          isLoading && 'cursor-not-allowed'
        }`}
        disabled={isLoading}
        {...props}
      >
        {!isLoading ? (
          text
        ) : (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </>
        )}
      </button>
    </div>
  );
}

export default Button;

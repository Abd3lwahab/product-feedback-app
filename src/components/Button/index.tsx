import React from 'react';

type Props = {
  color: 'purple' | 'blue' | 'blue-dark' | 'red';
  text: string;
  onClick: () => void;
};

function Button({ color, text, onClick }: Props) {
  return (
    <div>
      <button
        onClick={onClick}
        className={`bg-${color} text-white rounded-lg h-11 px-6 text-h4 hover:brightness-110 focus:ring-2 focus:ring-${color} focus:ring-opacity-50`}
      >
        {text}
      </button>
    </div>
  );
}

export default Button;

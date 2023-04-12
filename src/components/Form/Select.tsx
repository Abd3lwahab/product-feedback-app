import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ArrowDown from '@/assets/shared/icon-arrow-down.svg';
import ArrowUp from '@/assets/shared/icon-arrow-up.svg';
import checkIcon from '@/assets/shared/icon-check.svg';

type Props = {
  id: string;
  label: string;
  description: string;
  options: string[];
  onChange: (value: string) => void;
  selectedValue?: string;
};

function Select({ id, label, description, options, selectedValue, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(selectedValue || options[0]);

  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleSelect = (option: string) => {
    onChange(option);
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col mb-6">
      <label htmlFor={id} className="text-blue-dark text-body-3 font-bold mb-[2px]">
        {label}
      </label>
      <p className="text-blue-gray text-body-3 mb-4">{description}</p>
      <div className="relative" ref={selectRef}>
        <div
          className="flex flex-row justify-between items-center h-12  hover:ring-blue hover:ring-[1px] transition-shadow duration-200 ease-in-out
           bg-white-dark rounded-md cursor-pointer px-6"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className=" text-blue-dark text-body-2 capitalize">{selected}</span>
          <Image src={isOpen ? ArrowUp : ArrowDown} alt="arrow" />
        </div>
        {isOpen && (
          <div className="absolute top-16 flex flex-row w-[476px] bg-white rounded-lg  shadow-[0px_10px_40px_-7px_rgba(55,63,104,0.350492)] z-50">
            <ul className="flex flex-col w-full">
              {options.map((option, idx) => (
                <li
                  className={`flex flex-row justify-between items-center text-blue-gray text-body-2 py-3 px-5  ${
                    idx !== 0 && 'border-t-[1px] border-blue-dark border-opacity-[0.15]'
                  }
                   cursor-pointer hover:text-purple capitalize`}
                  key={option}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                  {selected === option && <Image src={checkIcon} alt="check" />}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Select;

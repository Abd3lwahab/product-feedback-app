import Image from 'next/image';
import React from 'react';
import IconArrowUpBlue from '../../assets/shared/icon-arrow-up.svg';
import IconArrowUpWhite from '../../assets/shared/icon-arrow-up-white.svg';

type Props = {
  name: string | number;
  isActive: boolean;
  clickHanlder?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isVote?: boolean;
};

const Tag = ({ name, isActive, isVote, clickHanlder }: Props): React.ReactElement => {
  return (
    <button
      className={`rounded-lg ${
        clickHanlder && 'cursor-pointer'
      }  hover:bg-[#CFD7FF] transition-colors duration-300 text-center ${
        isActive ? 'bg-blue text-white' : 'bg-blue-light text-blue'
      } ${isVote ? 'w-10 h-14 flex flex-col items-center justify-center' : 'px-4 py-1 mr-2'}`}
      onClick={clickHanlder}
    >
      {isVote && (
        <Image
          src={isActive ? IconArrowUpWhite : IconArrowUpBlue}
          className="mb-2"
          alt="upper_arrow"
        />
      )}
      <span className="capitalize text-body-3 font-semibold">{name}</span>
    </button>
  );
};

export default Tag;

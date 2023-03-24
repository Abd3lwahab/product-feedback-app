import Image from 'next/image';
import React from 'react';
import { useRecoilState } from 'recoil';

import SuggestionsIcon from '@/assets/suggestions/icon-suggestions.svg';
import Button from '@/components/Button';
import { Feedback } from '@/types';
import { feedbackListState } from '@/atoms/FeedbackAtom';

function SuggestionsBar() {
  const [feedbackList] = useRecoilState<Feedback[]>(feedbackListState);

  return (
    <div className="flex flex-row bg-blue-darkest md:rounded-lg  pl-6 pr-4 py-[14px] mb-6 justify-between items-center ">
      <div className="flex flex-row">
        <div className="hidden md:flex flex-row mr-[38px] ">
          <Image src={SuggestionsIcon} className="mr-4" alt="icon_suggestions" />
          <h3 className="text-h3 text-white ">{feedbackList.length} Suggestions</h3>
        </div>
        <div className="flex felx-row items-center hover:opacity-70">
          <label htmlFor="sort" className="text-blue-light text-h4 font-normal">
            Sort by :
          </label>
          <select
            id="sort"
            className="bg-blue-darkest text-blue-light text-h4 focus:outline-none hover:cursor-pointer"
          >
            <option>Most Upvotes</option>
            <option>Least Upvotes</option>
            <option>Most Comments</option>
            <option>Least Comments</option>
          </select>
        </div>
      </div>
      <Button color={'purple'} text="+ Add Feedback" onClick={() => {}} />
    </div>
  );
}

export default SuggestionsBar;

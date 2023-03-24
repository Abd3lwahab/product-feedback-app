import React from 'react';
import { useRecoilState } from 'recoil';

import EmptyContent from './EmptyContent';
import SuggestionsBar from './SuggestionsBar';
import FeedbackList from './FeedbackList';

const Suggestions = ({}) => {
  return (
    <div className="w-full lg:max-w-[825px]">
      <SuggestionsBar />
      <FeedbackList />
    </div>
  );
};

export default Suggestions;

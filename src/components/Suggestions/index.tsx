import React from 'react';
import Tag from '../Tag';

import EmptyContent from './EmptyContent';
import SuggestionsBar from './SuggestionsBar';
import FeedbackList from '../Feedback/FeedbackList';
import { Feedback } from '@/types';

type Props = {
  feedbacksList: Feedback[];
};

const Suggestions = ({ feedbacksList }: Props) => {
  return (
    <div className="w-full lg:max-w-[825px]">
      <SuggestionsBar length={feedbacksList.length} />
      {feedbacksList.length === 0 ? (
        <EmptyContent />
      ) : (
        <FeedbackList feedbacksList={feedbacksList} />
      )}
    </div>
  );
};

export default Suggestions;

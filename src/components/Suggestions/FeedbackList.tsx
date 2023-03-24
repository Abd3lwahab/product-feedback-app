import React from 'react';
import { useRecoilState } from 'recoil';

import { Feedback } from '@/types';
import { activeFeedbackFilterState, feedbackListState } from '@/atoms/FeedbackAtom';
import EmptyContent from './EmptyContent';
import FeedbackItem from './FeedbackItem';

function FeedbackList() {
  const [feedbackList] = useRecoilState<Feedback[]>(feedbackListState);
  const [activeFilter] = useRecoilState<string>(activeFeedbackFilterState);

  const filteredFeedbacks =
    activeFilter === 'all'
      ? feedbackList
      : feedbackList.filter(feedback => feedback.category === activeFilter);

  return (
    <div>
      {filteredFeedbacks.length === 0 ? (
        <EmptyContent />
      ) : (
        filteredFeedbacks.map(feedback => <FeedbackItem feedback={feedback} key={feedback.id} />)
      )}
    </div>
  );
}

export default FeedbackList;

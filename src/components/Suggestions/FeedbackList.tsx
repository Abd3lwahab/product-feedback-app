import React from 'react';
import { useRecoilState } from 'recoil';

import { Feedback } from '@/types';
import {
  activeFeedbackFilterState,
  activeFeedbackSortState,
  feedbackListState,
} from '@/atoms/FeedbackAtom';
import EmptyContent from './EmptyContent';
import FeedbackItem from './FeedbackItem';

function FeedbackList() {
  const [feedbackList] = useRecoilState<Feedback[]>(feedbackListState);
  const [activeFilter] = useRecoilState<string>(activeFeedbackFilterState);
  const [activeSort] = useRecoilState<string>(activeFeedbackSortState);

  const filteredFeedbacks =
    activeFilter === 'all'
      ? feedbackList
      : feedbackList.filter(feedback => feedback.category === activeFilter);

  const sortedFeedbacks = [...filteredFeedbacks].sort((a, b) => {
    switch (activeSort) {
      case 'most-vote':
        return b.upvotes - a.upvotes;
      case 'least-vote':
        return a.upvotes - b.upvotes;
      case 'most-comments':
        return b.comments.length - a.comments.length;
      case 'least-comments':
        return a.comments.length - b.comments.length;
      default:
        return 0;
    }
  });

  return (
    <div>
      {filteredFeedbacks.length === 0 ? (
        <EmptyContent />
      ) : (
        sortedFeedbacks.map(feedback => <FeedbackItem feedback={feedback} key={feedback.id} />)
      )}
    </div>
  );
}

export default FeedbackList;

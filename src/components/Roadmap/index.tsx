import React from 'react';
import { feedbackListState } from '@/atoms/FeedbackAtom';
import { Feedback } from '@/types';
import { useRecoilState } from 'recoil';

const Roadmap = (): React.ReactElement => {
  const [feedbackList] = useRecoilState<Feedback[]>(feedbackListState);

  const plannedFeedbacks = feedbackList.filter(feedback => feedback.status === 'planned');
  const inProgressFeedbacks = feedbackList.filter(feedback => feedback.status === 'in-progress');
  const liveFeedbacks = feedbackList.filter(feedback => feedback.status === 'live');

  return (
    <div className="hidden md:block bg-white rounded-lg lg:mb-6 lg:w-[255px] md:flex-1">
      <div className="flex flex-row justify-between items-center px-6 pt-4">
        <h3 className="text-h3 text-blue-dark">Roadmap</h3>
        {/* <Link
          to={'/roadmap'}
          title={'View'}
          className={'text-blue text-body-3 font-semibold underline hover:opacity-60'}
        >
          View
        </Link> */}
      </div>
      <div className="px-6 py-6">
        <div className="flex flex-row items-center justify-between mb-2 text-body-1 text-blue-gray">
          <div className="flex flex-row items-center">
            <div className="w-2 h-2 bg-orange rounded-full mr-4"></div>
            <span className="font-normal">Planned</span>
          </div>
          <span className="font-bold text-right">{plannedFeedbacks.length}</span>
        </div>
        <div className="flex flex-row items-center justify-between mb-2 text-body-1 text-blue-gray">
          <div className="flex flex-row items-center">
            <div className="w-2 h-2 bg-purple rounded-full mr-4"></div>
            <span className="font-normal">In-Progress</span>
          </div>
          <span className="font-bold text-right">{inProgressFeedbacks.length}</span>
        </div>
        <div className="flex flex-row items-center justify-between text-body-1 text-blue-gray">
          <div className="flex flex-row items-center">
            <div className="w-2 h-2 bg-cyan rounded-full mr-4"></div>
            <span className="font-normal">Live</span>
          </div>
          <span className="font-bold text-right">{liveFeedbacks.length}</span>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;

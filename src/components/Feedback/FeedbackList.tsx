import React from 'react';
import Image from 'next/image';

import Tag from '@/components/Tag';
import IconComment from '@/assets/shared/icon-comments.svg';
import { Feedback } from '@/types';

type Props = {
  feedbacksList: Feedback[];
};

function FeedbackList({ feedbacksList }: Props) {
  return (
    <div>
      {feedbacksList.map(feedback => (
        <div
          className="bg-white px-8 py-7 rounded-lg mb-5 flex flex-row justify-between cursor-pointer mx-6 md:mx-0"
          key={feedback.id}
        >
          <div className="flex flex-row">
            <div className="mr-10">
              <Tag isVote={true} name={feedback.upvotes} isActive={false} clickHanlder={() => {}} />
            </div>
            <div className="flex flex-col">
              <h3 className="text-h3 text-blue-dark mb-1">{feedback.title}</h3>
              <p className="text-body-1 text-blue-gray mb-4">{feedback.description}</p>
              <div className="flex flex-row">
                <Tag name={feedback.category} isActive={false} />
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center">
            <Image src={IconComment} className="mr-2" alt="comment" />
            <span className="text-body-1 text-blue-dark font-bold">{feedback.comments.length}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeedbackList;

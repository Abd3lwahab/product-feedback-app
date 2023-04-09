import React, { MouseEvent, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Image from 'next/image';
import axios from 'axios';

import { Feedback, User } from '@/types';
import Tag from '@/components/Tag';
import IconComment from '@/assets/shared/icon-comments.svg';
import { currentUserState } from '@/atoms/currentUserAtom';
import { feedbackListState } from '@/atoms/FeedbackAtom';
import Link from 'next/link';

type Props = {
  feedback: Feedback;
};

function FeedbackItem({ feedback }: Props) {
  const [feedbackList, setFeedbackList] = useRecoilState<Feedback[]>(feedbackListState);
  const [currentUser, setCurrentUser] = useRecoilState<User>(currentUserState);
  const upvotedFeedbacks = currentUser?.upvoteFeedbackIDs || [];
  const [isUpvoted, setIsUpvoted] = useState<boolean>(upvotedFeedbacks.includes(feedback.id));
  const [upvotes, setUpvotes] = useState<number>(feedback.upvotes);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Upadate upvote status when user state changes
  useEffect(() => {
    setIsUpvoted(upvotedFeedbacks.includes(feedback.id));
  }, [currentUser]);

  const handleUpvote = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isProcessing) return;
    setIsProcessing(true);

    setIsUpvoted(!isUpvoted);
    setUpvotes(isUpvoted ? upvotes - 1 : upvotes + 1);

    const userUpvoteFeedbackIDs = isUpvoted
      ? currentUser.upvoteFeedbackIDs.filter(id => id !== feedback.id)
      : [...currentUser.upvoteFeedbackIDs, feedback.id];

    axios
      .post(
        '/api/vote',
        {
          userId: currentUser.id,
          feedbackId: feedback.id,
          action: isUpvoted ? 'downvote' : 'upvote',
          userUpvoteFeedbackIDs,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then(res => {
        if (res.status === 200) {
          setCurrentUser({
            ...currentUser,
            upvoteFeedbackIDs: userUpvoteFeedbackIDs,
          });
          axios.get('/api/feedback').then(res => {
            setFeedbackList(res.data);
          });
        } else {
          setIsUpvoted(!isUpvoted);
          setUpvotes(isUpvoted ? upvotes - 1 : upvotes + 1);
        }
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <Link
      href={{
        pathname: '/feedback/[id]',
        query: { id: feedback.id },
      }}
      className="bg-white p-6 md:p-8 rounded-lg mb-6 flex flex-row justify-between cursor-pointer mx-6 md:mx-0"
    >
      <div className="flex flex-row">
        <div className="mr-10">
          <Tag isVote={true} name={upvotes} isActive={isUpvoted} clickHanlder={handleUpvote} />
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
    </Link>
  );
}

export default FeedbackItem;

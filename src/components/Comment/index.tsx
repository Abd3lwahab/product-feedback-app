import { FeedbacksComment, FeedbacksCommentReplay, User } from '@/types';
import Image from 'next/image';
import React, { useState } from 'react';
import Input from '../Form/Input';
import Button from '../Button';
import { useRecoilState } from 'recoil';
import { currentUserState } from '@/atoms/currentUserAtom';
import ObjectID from 'bson-objectid';
import axios from 'axios';
import Replay from '../Replay';
import { currentCommentListState } from '@/atoms/currentCommentListAtom';

type Props = {
  comment: FeedbacksComment;
  feedbackId: string;
};

function Comment({ comment, feedbackId }: Props) {
  const [currentCommentList, setCurrentCommentList] =
    useRecoilState<FeedbacksComment[]>(currentCommentListState);
  const [replay, setReplay] = useState<string>('');
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [currentUser] = useRecoilState<User>(currentUserState);

  const handleReply = () => {
    setIsReplying(!isReplying);
  };

  const handleReplayChange = (value: string) => {
    setReplay(value);
  };

  const handlePostReply = () => {
    if (replay === '') return;

    const newReplay = {
      id: ObjectID() as unknown as string,
      content: replay,
      replyingTo: comment.user.username,
      user: {
        name: currentUser.name,
        username: currentUser.username,
        image: currentUser.image,
      },
    };

    const newCommentList = currentCommentList.map(currentComment => {
      if (comment.id === currentComment.id) {
        return {
          ...comment,
          replies: [...comment.replies, newReplay],
        };
      }
      return currentComment;
    });

    axios
      .put(`/api/feedback`, {
        feedbackId: feedbackId,
        data: { comments: newCommentList },
      })
      .then(res => {
        if (res.status === 200) {
          setCurrentCommentList(newCommentList);
          setIsReplying(false);
        }
      });
  };

  return (
    <div
      key={comment.id}
      className={`flex flex-row border-t-[1px] border-[#8C92B3] border-opacity-25 first-of-type:border-none pt-8`}
    >
      <div className="flex-none mr-8 w-10 h-10">
        <Image
          src={`/${comment.user.image}`}
          alt="user"
          width={40}
          height={40}
          className="rounded-full"
          unoptimized
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col mb-4">
            <span className="text-body-3 font-bold text-blue-dark">{comment.user.name}</span>
            <span className="text-body-3 text-blue-gray">@{comment.user.username}</span>
          </div>
          <div>
            <span
              className="text-blue text-body-4 font-bold cursor-pointer hover:underline"
              onClick={handleReply}
            >
              Reply
            </span>
          </div>
        </div>
        <p
          className={`text-body-2 text-blue-gray [overflow-wrap:anywhere] ${
            !comment.replies.length && ' mb-8'
          }`}
        >
          {comment.content}
        </p>
        {comment.replies.length > 0 && (
          <div className="flex flex-col">
            {comment.replies.map(repaly => (
              <Replay
                replay={repaly}
                key={`${repaly.id}`}
                feedbackId={feedbackId}
                comment={comment}
              />
            ))}
          </div>
        )}
        {isReplying && (
          <div className="flex flex-row items-start">
            <div className="flex-1">
              <Input
                type="textarea"
                placeholder="Type your comment here"
                id="replay"
                rows={3}
                onChange={handleReplayChange}
              />
            </div>
            <div className="ml-4">
              <Button
                color="purple"
                text="Post Replay"
                isLoading={false}
                onClick={handlePostReply}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;

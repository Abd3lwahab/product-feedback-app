import { FeedbacksComment, FeedbacksCommentReplay, User } from '@/types';
import Image from 'next/image';
import React, { useState } from 'react';
import Button from '../Button';
import Input from '../Form/Input';
import ObjectID from 'bson-objectid';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { currentUserState } from '@/atoms/currentUserAtom';
import { currentCommentListState } from '@/atoms/currentCommentListAtom';

type Props = {
  feedbackId: string;
  replay: FeedbacksCommentReplay;
  comment: FeedbacksComment;
};

function Replay({ replay, feedbackId, comment }: Props) {
  const [currentCommentList, setCurrentCommentList] =
    useRecoilState<FeedbacksComment[]>(currentCommentListState);
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [replayValue, setReplayValue] = useState<string>('');
  const [currentUser] = useRecoilState<User>(currentUserState);

  const handleReply = () => {
    setIsReplying(!isReplying);
  };

  const handleReplayChange = (value: string) => {
    setReplayValue(value);
  };

  const handlePostReply = () => {
    if (replayValue === '') return;

    const newReplay = {
      id: ObjectID() as unknown as string,
      content: replayValue,
      replyingTo: replay.user.username,
      user: {
        name: currentUser.name,
        username: currentUser.username,
        image: currentUser.image,
      },
    };

    const newComments = currentCommentList.map(currentComment => {
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
        data: { comments: newComments },
      })
      .then(res => {
        if (res.status === 200) {
          setCurrentCommentList(newComments);
          setIsReplying(false);
        }
      });
  };
  return (
    <div
      key={replay.id}
      className={`flex flex-row border-t-[1px] border-[#8C92B3] border-opacity-25 first-of-type:border-none pt-8`}
    >
      <div className="flex-none mr-8 w-10 h-10">
        <Image
          src={`/${replay.user.image}`}
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
            <span className="text-body-3 font-bold text-blue-dark">{replay.user.name}</span>
            <span className="text-body-3 text-blue-gray">@{replay.user.username}</span>
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
        <p className="text-body-2 text-blue-gray [overflow-wrap:anywhere] mb-8">
          <span className="font-bold text-purple">@{replay.replyingTo} </span>
          {replay.content}
        </p>
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

export default Replay;

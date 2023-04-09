import { FeedbacksComment } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  comment: FeedbacksComment;
};

function Comment({ comment }: Props) {
  return (
    <div
      key={comment.id}
      className={`flex flex-row border-b-[1px] border-[#8C92B3] border-opacity-25 mb-8 pb-8 last-of-type:border-none last-of-type:pb-4 last-of-type:mb-0`}
    >
      <div className="flex-none mr-8 w-10 h-10">
        <Image
          src={`/${comment.user.image}`}
          alt="user"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col mb-4">
            <span className="text-body-3 font-bold text-blue-dark">{comment.user.name}</span>
            <span className="text-body-3 text-blue-gray">@{comment.user.username}</span>
          </div>
          <div>
            <Link href={'/'} className="">
              <span className="text-blue text-body-4 font-bold">Reply</span>
            </Link>
          </div>
        </div>
        <p className="text-body-2 text-blue-gray break-all">{comment.content}</p>
      </div>
    </div>
  );
}

export default Comment;

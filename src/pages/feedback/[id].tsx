import React, { useRef, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import prisma from '@/lib/prisma';
import { Feedback, User } from '@/types';
import ArrowIcon from '@/assets/shared/icon-arrow-left.svg';
import FeedbackItem from '@/components/Suggestions/FeedbackItem';
import Button from '@/components/Button';
import Input from '@/components/Form/Input';
import { currentUserState } from '@/atoms/currentUserAtom';
import Comment from '@/components/Comment';

type Props = {
  feedback: Feedback;
};

function feeddback({ feedback }: Props) {
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<Feedback['comments']>(feedback.comments);
  const [remainingCharacters, setRemainingCharacters] = useState<number>(250);
  const [currentUser] = useRecoilState<User>(currentUserState);
  const [isCommenting, setIsCommenting] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);

  const onCommentChange = (value: string) => {
    setComment(value);
    setRemainingCharacters(250 - value.length);
  };

  const handleComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (comment.length === 0) return;
    setIsCommenting(true);

    const newComment = {
      id: comments.length + 1,
      content: comment,
      user: {
        name: currentUser.name,
        username: currentUser.username,
        image: currentUser.image,
      },
    };

    axios
      .put(`/api/feedback`, {
        feedbackId: feedback.id,
        data: { comments: [...comments, newComment] },
      })
      .then(res => {
        if (res.status === 200) {
          setComments([...comments, newComment]);
          setRemainingCharacters(250);
          setIsCommenting(false);
          formRef.current?.reset();
        }
      });
  };

  return (
    <div className="flex flex-col justify-start py-9 md:py-14 lg:py-[94px] max-w-[730px] m-auto px-6">
      <div className="flex flex-row justify-between items-center mb-6">
        <Link href={'/'} className="">
          <Image src={ArrowIcon} alt="arrow" className="inline mr-3" />
          <span className="text-blue-gray text-body-3 font-bold">Go Back</span>
        </Link>
        <Button color="blue" text="edit feedback" />
      </div>
      <FeedbackItem feedback={feedback} />
      <div className="bg-white p-6 md:p-8 rounded-lg mb-6 flex flex-col mx-6 md:mx-0">
        <h2 className="text-blue-dark text-h3 font-bold mb-7">{comments.length} Comments</h2>
        {comments.map(comment => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
      <form
        className="flex flex-col bg-white p-6 md:p-8 rounded-lg"
        ref={formRef}
        onSubmit={handleComment}
      >
        <h2 className="text-blue-dark text-h3 font-bold mb-6">Add Comment</h2>
        <Input
          type="textarea"
          placeholder="Type your comment here"
          id="comment"
          onChange={onCommentChange}
        />
        <div className="flex flex-row justify-between items-center">
          <span className="text-body-2 text-blue-gray">{remainingCharacters} Characters left</span>
          <Button color="purple" text="Post Comment" isLoading={isCommenting} />
        </div>
      </form>
    </div>
  );
}

export default feeddback;

export async function getServerSideProps({ params }: GetServerSidePropsContext) {
  try {
    const feedback = await prisma.feedback.findUnique({
      where: {
        id: params?.id as string,
      },
    });

    if (!feedback) {
      return { notFound: true };
    }
    return {
      props: { feedback },
    };
  } catch (err) {
    return { notFound: true };
  }
}

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';

import ArrowIcon from '@/assets/shared/icon-arrow-left.svg';
import EditFeedbackIcon from '@/assets/shared/icon-edit-feedback.svg';
import Input from '@/components/Form/Input';
import Select from '@/components/Form/Select';
import Button from '@/components/Button';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import prisma from '@/lib/prisma';
import { Feedback } from '@/types';

const categoryOptions = ['feature', 'UI', 'UX', 'enhancement', 'bug'];
const statusOptions = ['suggestion', 'planned', 'in progress', 'live'];

type Props = {
  feedback: Feedback;
};

export default function editFeedback({ feedback }: Props) {
  const router = useRouter();

  const [feedbackTitle, setFeedbackTitle] = useState<string>(feedback.title);
  const [feedbackCategory, setFeedbackCategory] = useState<string>(feedback.category);
  const [feedbackStatus, setFeedbackStatus] = useState<string>(feedback.status);
  const [feedbackDesciption, setFeedbackDesciption] = useState<string>(feedback.description);
  const [isLoadingEdit, setIsLoadingEdit] = useState<boolean>(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoadingEdit(true);
    axios
      .put('/api/feedback', {
        feedbackId: feedback.id,
        data: {
          title: feedbackTitle,
          category: feedbackCategory,
          status: feedbackStatus,
          description: feedbackDesciption,
        },
      })
      .then(res => {
        router.push({
          pathname: '/feedback/[id]',
          query: { id: feedback.id },
        });
      });
  };

  const handleDelete = () => {
    setIsLoadingDelete(true);
    axios
      .delete('/api/feedback', {
        data: {
          feedbackId: feedback.id,
        },
      })
      .then(() => {
        router.push('/');
      });
  };

  return (
    <div className="flex flex-col justify-start py-9 md:py-14 lg:py-[94px] max-w-[540px] m-auto md:px-0 px-6">
      <div className="flex flex-row mb-16">
        <Link
          href={{
            pathname: '/feedback/[id]',
            query: { id: feedback.id },
          }}
        >
          <Image src={ArrowIcon} alt="arrow" className="inline mr-3" />
          <span className="text-blue-gray text-body-3 font-bold">Go Back</span>
        </Link>
      </div>
      <div className="bg-white rounded-lg pt-14 md:pb-8 md:px-8 pb-6 px-6 relative">
        <div className="absolute -top-7 left-6 flex justify-center items-center">
          <Image src={EditFeedbackIcon} alt="edit" width={56} height={56} />
        </div>
        <h1 className="text-h1 text-blue-dark mb-10">Editing: {feedback.title}</h1>
        <form onSubmit={handleSubmit}>
          <Input
            id={'title'}
            label="Feedback Title"
            description="Add a short, descriptive headline"
            type="text"
            defaultValue={feedback.title}
            onChange={(value: string) => {
              setFeedbackTitle(value);
            }}
          />
          <Select
            id={'category'}
            label="Category"
            description="Choose a category for your feedback"
            options={categoryOptions}
            onChange={(value: string) => {
              setFeedbackCategory(value);
            }}
            selectedValue={feedback.category}
          />
          <Select
            id={'status'}
            label="Update Status"
            description="Change feedback status"
            options={statusOptions}
            onChange={(value: string) => {
              setFeedbackStatus(value);
            }}
            selectedValue={feedback.status}
          />
          <Input
            id={'detail'}
            label="Feedback Detail"
            description="Include any specific comments on what should be improved, added, etc."
            type="textarea"
            defaultValue={feedback.description}
            onChange={(value: string) => {
              setFeedbackDesciption(value);
            }}
          />
          <div className="flex flex-col-reverse md:flex-row justify-between pt-2 mb-0 md:mb-4">
            <Button
              color={'red'}
              text="delete"
              isLoading={isLoadingDelete}
              onClick={handleDelete}
            />
            <div className="flex flex-col-reverse md:flex-row justify-end">
              <Button
                customClass="mr-0 my-4 md:mr-4 md:my-0"
                color={'blue-dark'}
                text="cancel"
                onClick={() => {
                  router.push({
                    pathname: '/feedback/[id]',
                    query: { id: feedback.id },
                  });
                }}
                type="button"
              />
              <Button color="purple" text="Save Changes" isLoading={isLoadingEdit} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

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

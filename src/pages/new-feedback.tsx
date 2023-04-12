import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';

import ArrowIcon from '@/assets/shared/icon-arrow-left.svg';
import NewFeedbackIcon from '@/assets/shared/icon-new-feedback.svg';
import Input from '@/components/Form/Input';
import Select from '@/components/Form/Select';
import Button from '@/components/Button';
import { useRouter } from 'next/router';

const options = ['feature', 'UI', 'UX', 'enhancement', 'bug'];

export default function newFeedback() {
  const [feedbackTitle, setFeedbackTitle] = useState<string>('');
  const [feedbackCategory, setFeedbackCategory] = useState<string>(options[0]);
  const [feedbackDesciption, setFeedbackDesciption] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post('/api/feedback', {
        title: feedbackTitle,
        category: feedbackCategory,
        description: feedbackDesciption,
      })
      .then(res => {
        router.push('/');
      });
  };

  return (
    <div className="flex flex-col justify-start py-9 md:py-14 lg:py-[94px] max-w-[540px] m-auto md:px-0 px-6">
      <div className="felx flex-row mb-16">
        <Link href={'/'}>
          <Image src={ArrowIcon} alt="arrow" className="inline mr-3" />
          <span className="text-blue-gray text-body-3 font-bold">Go Back</span>
        </Link>
      </div>
      <div className="bg-white rounded-lg pt-14 pb-6 px-6 relative">
        <div className="absolute -top-7 left-6 flex justify-center items-center">
          <Image src={NewFeedbackIcon} alt="plus" width={56} height={56} />
        </div>
        <h1 className="text-h1 text-blue-dark mb-10">Create New Feedback</h1>
        <form onSubmit={handleSubmit}>
          <Input
            id={'title'}
            label="Feedback Title"
            description="Add a short, descriptive headline"
            type="text"
            onChange={(value: string) => {
              setFeedbackTitle(value);
            }}
          />
          <Select
            id={'category'}
            label="Category"
            description="Choose a category for your feedback"
            options={options}
            onChange={(value: string) => {
              setFeedbackCategory(value);
            }}
          />
          <Input
            id={'detail'}
            label="Feedback Detail"
            description="Include any specific comments on what should be improved, added, etc."
            type="textarea"
            onChange={(value: string) => {
              setFeedbackDesciption(value);
            }}
          />
          <div className="flex flex-col-reverse md:flex-row justify-end pt-2 mb-0 md:mb-4 ">
            <Button
              customClass="mr-0 mt-4 md:mr-4 md:mt-0"
              color="blue-dark"
              text="cancel"
              onClick={() => {
                router.push('/');
              }}
              type="button"
            />
            <Button color="purple" text="add feedback" isLoading={isLoading} />
          </div>
        </form>
      </div>
    </div>
  );
}

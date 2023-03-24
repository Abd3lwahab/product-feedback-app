import React from 'react';
import Image from 'next/image';

import Button from '@/components/Button';
import NoContentIcon from '@/assets/suggestions/illustration-empty.svg';

function EmptyContent() {
  return (
    <div className="bg-white rounded-lg flex flex-col items-center justify-center mx-6 md:mx-0 mb-6">
      <div className="py-[76px] md:py-[110px] w-[410px]">
        <Image src={NoContentIcon} className="w-[129px] m-auto" alt="not_found" />
        <div className="mt-14 text-center">
          <h1 className="text-h1 text-blue-dark mb-4">There is no feedback yet.</h1>
          <p className="text-blue-gray text-body-1 mb-12">
            Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas
            to improve our app.
          </p>
          <Button color={'purple'} text="+ Add Feedback" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}

export default EmptyContent;

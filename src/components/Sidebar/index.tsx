import React from 'react';
import Tag from '../Tag';
import Roadmap from '../Roadmap';
import { useRecoilState } from 'recoil';

import backgroundDesktop from '../../assets/suggestions/desktop/background-header.png';
import backgroundTablet from '../../assets/suggestions/tablet/background-header.png';
import backgroundMobile from '../../assets/suggestions/mobile/background-header.png';
import Image from 'next/image';
import { activeFeedbackFilterState } from '@/atoms/FeedbackAtom';

const tags = ['all', 'UI', 'UX', 'enhancement', 'bug', 'feature'];

const SideBar = () => {
  const [activeFilter, setActiveFilter] = useRecoilState<string>(activeFeedbackFilterState);

  const tagClickHandler = (tagName: string): void => {
    setActiveFilter(tagName);
  };

  return (
    <div className="flex flex-row lg:flex-col lg:mr-[30px] mdo:mb-10 h-fit">
      <div className="grid grid-cols-1 w-full md:w-auto lg:mb-6 mdo:mr-[10px] lg:w-[255px] md:flex-1">
        <div className="relative col-start-1 row-start-1 flex flex-col-reverse pl-6 md:py-4 py-0 justify-center md:justify-start">
          <span className="text-body-3 md:text-body-2 text-white opacity-75">Feedback Board</span>
          <h2 className="font-bold text-body-2 md:text-h2 text-white">Frontend Mentor</h2>
        </div>
        <div className="grid col-start-1 row-start-1">
          <Image src={backgroundDesktop} alt="background" className="lg:block hidden rounded-lg" />
          <Image
            src={backgroundTablet}
            alt="background"
            className="lg:hidden md:block hidden w-full object-fill h-[178px] rounded-lg"
          />
          <Image
            src={backgroundMobile}
            alt="background"
            className="md:hidden block h-[73px] w-full object-fill"
          />
        </div>
      </div>
      <div className="hidden md:block bg-white rounded-lg lg:mb-6 mdo:mr-[10px] lg:w-[255px] md:flex-1">
        <div className="p-6 pr-3 pb-[10px]">
          {tags.map(tag => (
            <div className="mb-[14px] inline-block" key={tag}>
              <Tag
                name={tag}
                isActive={activeFilter === tag}
                clickHanlder={() => tagClickHandler(tag)}
              />
            </div>
          ))}
        </div>
      </div>
      <Roadmap />
    </div>
  );
};

export default SideBar;

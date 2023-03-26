import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import prisma from '@/lib/prisma';
import SideBar from '@/components/Sidebar';
import Suggestions from '@/components/Suggestions';
import { Feedback, User } from '@/types';
import { feedbackListState } from '@/atoms/FeedbackAtom';
import { currentUserState } from '@/atoms/currentUserAtom';

type Props = {
  feedbackList: Feedback[];
  currentUser: User;
};

export default function Home({ feedbackList, currentUser }: Props) {
  const [_f, setFeedbacksList] = useRecoilState<Feedback[]>(feedbackListState);
  const [_u, setCurrentUser] = useRecoilState<User>(currentUserState);
  useEffect(() => {
    setFeedbacksList(feedbackList);
    setCurrentUser(currentUser);
  }, []);

  return (
    <div className="flex lg:flex-row flex-col justify-center md:py-14 md:px-10 lg:py-[94px]">
      <SideBar />
      <Suggestions />
    </div>
  );
}

export async function getServerSideProps() {
  const feedbackList = await prisma.feedback.findMany();
  const currentUser = await prisma.user.findFirst();

  return {
    props: { feedbackList, currentUser },
  };
}

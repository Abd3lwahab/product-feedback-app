import React, { PropsWithChildren, useEffect } from 'react';
import { Jost } from 'next/font/google';
import { User } from '@/types';
import { currentUserState } from '@/atoms/currentUserAtom';
import axios from 'axios';
import { useRecoilState } from 'recoil';

const jost = Jost({ subsets: ['latin'] });

export default function Layout({ children }: PropsWithChildren) {
  const [currentUser, setCurrentUser] = useRecoilState<User>(currentUserState);

  async function fetchUser() {
    const res = await axios.get('/api/user');
    setCurrentUser(res.data);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <main
        className={`${jost.className} className="flex flex-col min-h-screen font-sans bg-white-dark`}
      >
        {children}
      </main>
    </>
  );
}

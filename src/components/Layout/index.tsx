import React, { PropsWithChildren } from 'react';
import { Jost } from 'next/font/google';

const jost = Jost({ subsets: ['latin'] });

export default function Layout({ children }: PropsWithChildren) {
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

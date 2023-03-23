import Head from 'next/head';
import { Jost } from 'next/font/google';

import prisma from '@/lib/prisma';
import SideBar from '@/components/Sidebar';
import Suggestions from '@/components/Suggestions';
import { Feedback } from '@/types';

const jost = Jost({ subsets: ['latin'] });

type Props = {
  feedbacks: Feedback[];
};

export default function Home({ feedbacks }: Props) {
  return (
    <>
      <Head>
        <title>Product Feedback App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon-32x32.png" />
      </Head>
      <main
        className={`${jost.className} className="flex flex-col min-h-screen font-sans bg-white-dark`}
      >
        <div className="flex lg:flex-row flex-col justify-center md:py-14 md:px-10 lg:py-[94px]">
          <SideBar />
          <Suggestions feedbacksList={feedbacks} />
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const feedbacks = await prisma.feedbacks.findMany();

  return {
    props: { feedbacks },
  };
}

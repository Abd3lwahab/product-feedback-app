import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return handleGET(req, res);
    default:
      return res.status(500).json({ error: `The HTTP ${req.method} method is not supported.` });
  }
}

const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await prisma.user.findFirst();
  return res.status(200).json(result);
};

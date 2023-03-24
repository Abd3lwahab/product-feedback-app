import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      return handlePOST(req, res);
    case 'GET':
      return handleGET(req, res);
    default:
      return res.status(500).json({ error: `The HTTP ${req.method} method is not supported.` });
  }
};

const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, category, description } = req.body;
  const result = await prisma.feedback.create({
    data: {
      title: title,
      category: category,
      description: description,
    },
  });
  return res.status(201).json(result);
};

const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await prisma.feedback.findMany();
  return res.status(200).json(result);
};

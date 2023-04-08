import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return handleGET(req, res);
    case 'POST':
      return handlePOST(req, res);
    case 'PUT':
      return handlePUT(req, res);
    default:
      return res.status(500).json({ error: `The HTTP ${req.method} method is not supported.` });
  }
};

const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await prisma.feedback.findMany();
  return res.status(200).json(result);
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

const handlePUT = async (req: NextApiRequest, res: NextApiResponse) => {
  const { feedbackId, data } = req.body;
  const result = await prisma.feedback.update({
    where: {
      id: feedbackId,
    },
    data: data,
  });
  return res.status(200).json({
    message: 'Feedback updated successfully',
  });
};

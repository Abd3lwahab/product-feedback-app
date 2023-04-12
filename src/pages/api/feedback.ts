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
    case 'DELETE':
      return handleDELETE(req, res);
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
  await prisma.feedback
    .create({
      data: {
        title: title,
        category: category,
        description: description,
      },
    })
    .then(result => {
      return res.status(201).json(result);
    })
    .catch(err => {
      return res.status(500).json({
        message: 'Something went wrong',
        error: err,
      });
    });
};

const handlePUT = async (req: NextApiRequest, res: NextApiResponse) => {
  const { feedbackId, data } = req.body;
  const result = await prisma.feedback
    .update({
      where: {
        id: feedbackId,
      },
      data: data,
    })
    .then(() => {
      return res.status(200).json({
        message: 'Feedback updated successfully',
      });
    })
    .catch(err => {
      return res.status(500).json({
        message: 'Something went wrong',
        error: err,
      });
    });
};

const handleDELETE = async (req: NextApiRequest, res: NextApiResponse) => {
  const { feedbackId } = req.body;
  await prisma.feedback
    .delete({
      where: {
        id: feedbackId,
      },
    })
    .then(() => {
      return res.status(200).json({
        message: 'Feedback deleted successfully',
      });
    })
    .catch(err => {
      return res.status(500).json({
        message: 'Something went wrong',
        error: err,
      });
    });
};

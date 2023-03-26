import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { Feedback, User } from '@/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { userId, feedbackId, action } = req.body;

      const user: User = await prisma.user.findUnique({ where: { id: userId } });
      const feedback: Feedback = await prisma.feedback.findUnique({ where: { id: feedbackId } });

      if (!feedback || !user) {
        return res.status(404).json({ message: 'Feedback or user not found' });
      }

      if (action === 'upvote' && !user.upvoteFeedbackIDs.includes(feedbackId)) {
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: { upvoteFeedbackIDs: { push: feedbackId } },
        });
        const updatedFeedback = await prisma.feedback.update({
          where: { id: feedbackId },
          data: { upvotes: { increment: 1 } },
        });

        return res.status(200).json({ user: updatedUser, feedback: updatedFeedback });
      } else if (action === 'downvote' && user.upvoteFeedbackIDs.includes(feedbackId)) {
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: {
            upvoteFeedbackIDs: { set: user.upvoteFeedbackIDs.filter(id => id !== feedbackId) },
          },
        });
        const updatedFeedback = await prisma.feedback.update({
          where: { id: feedbackId },
          data: { upvotes: { decrement: 1 } },
        });

        return res.status(200).json({ user: updatedUser, feedback: updatedFeedback });
      } else {
        return res.status(500).json({ message: 'Unknown action or repeated.' });
      }
    } catch (_) {
      return res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(500).json({ error: `The HTTP ${req.method} method is not supported.` });
  }
}

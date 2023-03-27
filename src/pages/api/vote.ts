import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { userId, feedbackId, action } = req.body;

      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      if (action === 'upvote' && !user.upvoteFeedbackIDs.includes(feedbackId)) {
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: { upvoteFeedbackIDs: { push: feedbackId } },
        });
        await prisma.feedback.update({
          where: { id: feedbackId },
          data: { upvotes: { increment: 1 } },
        });

        return res.status(200).json({ user: updatedUser });
      } else if (action === 'downvote' && user.upvoteFeedbackIDs.includes(feedbackId)) {
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: {
            upvoteFeedbackIDs: { set: user.upvoteFeedbackIDs.filter(id => id !== feedbackId) },
          },
        });
        await prisma.feedback.update({
          where: { id: feedbackId },
          data: { upvotes: { decrement: 1 } },
        });

        return res.status(200).json({ user: updatedUser });
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

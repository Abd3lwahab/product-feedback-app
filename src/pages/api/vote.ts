import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { Feedback, User } from '@/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { userId, feedbackId, action } = req.body;

      const user: User = await prisma.user.findUnique({ where: { id: userId } });

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          upvoteFeedbackIDs:
            action === 'upvote'
              ? { push: feedbackId }
              : { set: user.upvoteFeedbackIDs.filter(id => id !== feedbackId) },
        },
      });
      const updatedFeedback = await prisma.feedback.update({
        where: { id: feedbackId },
        data: { upvotes: action === 'upvote' ? { increment: 1 } : { decrement: 1 } },
      });

      return res.status(200).json({ user: updatedUser, feedback: updatedFeedback });
    } catch (_) {
      return res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(500).json({ error: `The HTTP ${req.method} method is not supported.` });
  }
}

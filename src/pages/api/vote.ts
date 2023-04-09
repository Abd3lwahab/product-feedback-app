import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { userId, feedbackId, action, userUpvoteFeedbackIDs } = req.body;

      await Promise.all([
        prisma.user.update({
          where: { id: userId },
          data: { upvoteFeedbackIDs: userUpvoteFeedbackIDs },
        }),
        prisma.feedback.update({
          where: { id: feedbackId },
          data: { upvotes: action === 'upvote' ? { increment: 1 } : { decrement: 1 } },
        }),
      ]);

      return res.status(200).json({ message: 'Vote successful' });
    } catch (_) {
      return res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(500).json({ error: `The HTTP ${req.method} method is not supported.` });
  }
}

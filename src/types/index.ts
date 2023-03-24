export type Feedback = {
  id: string;
  category: string;
  description: string;
  status: string;
  title: string;
  upvotes: number;
  comments: FeedbacksComments[];
};

export type FeedbacksComments = {
  content: string;
  id: number;
  replies: FeedbacksCommentsReplies[];
  user: User;
};

export type User = {
  id: string;
  image: string;
  name: string;
  username: string;
  upvoteFeedbackIDs: string[];
};

export type FeedbacksCommentsReplies = {
  content: string;
  replyingTo: string;
  user: User;
};

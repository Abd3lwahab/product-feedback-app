export type Feedback = {
  id: string;
  category: string;
  description: string;
  status: string;
  title: string;
  upvotes: number;
  comments: FeedbacksComment[];
};

export type FeedbacksComment = {
  id: string;
  content: string;
  replies: FeedbacksCommentReplay[];
  user: UserComment;
};

export type UserComment = {
  image: string;
  name: string;
  username: string;
};

export type User = {
  id: string;
  image: string;
  name: string;
  username: string;
  upvoteFeedbackIDs: string[];
};

export type FeedbacksCommentReplay = {
  id: string;
  content: string;
  replyingTo: string;
  user: UserComment;
};

import { atom } from 'recoil';
import { FeedbacksComment } from '@/types';

export const currentCommentListState = atom({
  key: 'currentCommentListState',
  default: [] as FeedbacksComment[],
});

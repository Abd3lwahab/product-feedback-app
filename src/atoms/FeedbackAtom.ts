import { atom } from 'recoil';
import { Feedback } from '@/types';

export const feedbackListState = atom({
  key: 'feedbackListState',
  default: [] as Feedback[],
});

export const activeFeedbackFilterState = atom({
  key: 'activeFeedbackFilterState',
  default: 'all',
});

import { atom } from 'recoil';
import { User } from '@/types';

export const currentUserState = atom({
  key: 'currentUserState',
  default: {} as User,
});

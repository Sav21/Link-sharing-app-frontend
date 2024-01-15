import { atom, createStore } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export type UserLink = {
  id: string;
  platform: string;
  value: string;
}

export type UserDetails = {
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

export const store = createStore();

export const userLinksAtom = atomWithStorage<UserLink[]>('userLinks', []);
export const userDetailsAtom = atomWithStorage<UserDetails>('userDetails', {
  firstName: '',
  lastName: '',
  email: '',
  image: '',
});

export const apiAccessTokenAtom = atomWithStorage<string | null>('apiAccessToken', null, undefined, { getOnInit: true });

export const phoneDisplayDataAtom = atom<{ links: UserLink[] }>({ links: [] });
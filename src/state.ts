import {atom} from 'jotai';
import {RepoGithub} from './types';

export const likesAtom = atom<RepoGithub[]>([]);
export const resultsAtom = atom<RepoGithub[]>([]);
export const textInputAtom = atom<string>('');
export const textQueryAtom = atom<string>('');
export const hasSeenMaxMessageAtom = atom<boolean>(false);

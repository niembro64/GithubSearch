// state.ts
import {atom} from 'jotai';
import {RepoGithub} from './types';

export const likesGithubAtom = atom<RepoGithub[]>([]);
export const searchResultsAtom = atom<RepoGithub[]>([]);
export const textInputAtom = atom<string>('');
export const textQueryAtom = atom<string>('');

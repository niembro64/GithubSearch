import {atom} from 'jotai';
import {RepoGithub} from './types';

export const likesGithubAtom = atom<RepoGithub[]>([]);
export const searchResultsAtom = atom<RepoGithub[]>([]);
export const textInputAtom = atom<string>('web_smashed');
export const textQueryAtom = atom<string>('web_smashed');

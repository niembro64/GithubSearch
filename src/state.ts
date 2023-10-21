import {atom} from 'jotai';
import {RepoGithubSmall} from './types';

export const likesAtom = atom<RepoGithubSmall[]>([]);
export const resultsAtom = atom<RepoGithubSmall[]>([]);
export const textInputAtom = atom<string>('');
export const textQueryAtom = atom<string>('');
export const hasSeenMaxMessageAtom = atom<boolean>(false);

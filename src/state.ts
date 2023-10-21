import {atom} from 'jotai';
import {RepoGithubSmall, SortStars} from './types';

export const likesAtom = atom<RepoGithubSmall[]>([]);
export const resultsAtom = atom<RepoGithubSmall[]>([]);
export const textInputAtom = atom<string>('');
export const textQueryAtom = atom<string>('');
export const hasSeenMaxMessageAtom = atom<boolean>(false);
export const sortStarsAtom = atom<SortStars>('desc');

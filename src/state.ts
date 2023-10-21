// state.ts
import {atom} from 'jotai';
import {RepoGithub} from './types';

export const likesGithubAtom = atom<RepoGithub[]>([]);

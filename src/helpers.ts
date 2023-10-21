/* eslint-disable @typescript-eslint/no-unused-vars */
import {RepoGithubSmall, SortStars} from './types';

export const truncateString = (str: any, maxLength: number) => {
  if (typeof str !== 'string') {
    return '';
  }

  return str.length > maxLength ? str.substring(0, maxLength - 3) + '...' : str;
};

export const keyboardVerticalOffsetIOS = 72;

export const sortResults = (
  r: RepoGithubSmall[],
  d: SortStars,
): RepoGithubSmall[] => {
  //////////////////////////////////////////////
  // SORTING IS HAPPENING FOR THE NEXT STATE
  //////////////////////////////////////////////
  switch (d) {
    case 'none':
      return r.sort((a, b) => a.stargazers_count - b.stargazers_count);
    case 'asc':
      return r.sort((a, b) => b.stargazers_count - a.stargazers_count);
    case 'desc':
      // RANDOM SORT
      return r.sort((a, b) => 0.5 - Math.random());
    default:
      throw new Error('sortStars is not a valid value');
  }
};

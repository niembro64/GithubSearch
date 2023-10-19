import axios from 'axios';
import {Repo} from './types';
import {Alert} from 'react-native';

export const truncateString = (str: any, maxLength: number) => {
  if (typeof str !== 'string') {
    return '';
  }

  return str.length > maxLength ? str.substring(0, maxLength - 3) + '...' : str;
};

export const githubGetRepos = async (query: string): Promise<any> => {
  if (!query || query === '') {
    console.log('no query');
    return;
  }

  const res = await axios.get(
    `https://api.github.com/search/repositories?q=${query}`,
  );

  if (res.status === 200) {
    return res.data.items.slice(0, 10);
  } else {
    Alert.alert('Error', 'Error getting repos');
    return [];
  }
};

export const serverLikesGet = async (): Promise<Repo[]> => {
  const res = await axios.get('http://192.168.1.19:8080/repo/');

  if (res.status === 200) {
    return res.data.repos;
  } else {
    Alert.alert('Error', 'Error getting likes');
    return [];
  }
};

export const serverLikeSave = async (repo: Repo): Promise<boolean> => {
  const res = await axios.post('http://192.168.1.19:8080/repo/', {
    id: repo.id.toString(),
    fullName: repo.full_name,
    createdAt: repo.created_at,
    stargazersCount: repo.stargazers_count,
    language: repo.language,
    url: repo.html_url,
  });

  if (res.status === 201) {
    return true;
  } else {
    Alert.alert('Error', 'Error saving like');
    return false;
  }
};

export const serverLikeDelete = async (repoId: string): Promise<boolean> => {
  const res = await axios.delete(`http://192.168.1.19:8080/repo/${repoId}`);

  if (res.status === 200) {
    return true;
  } else {
    Alert.alert('Error', 'Error deleting like');
    return false;
  }
};

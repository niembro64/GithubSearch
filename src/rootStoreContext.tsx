import {createContext} from 'react';
import {RootStore} from '../src/RootStore';

export const RootStoreContext = createContext<RootStore | null>(null);
RootStoreContext.displayName = 'RootStoreContext';

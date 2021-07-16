import { createContext, useContext, useReducer } from 'react';

export interface User {
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface State {
  authenticated: boolean;
  user: User | null;
  loading: boolean;
}
export interface Action {
  type: string;
  payload: any;
}

const StateContext = createContext<State>({
  authenticated: false,
  user: null,
  loading: true,
});
const DispatchContext = createContext<any>(null);

const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case 'LOGIN':
      return { ...state, authenticated: true, user: payload };
    case 'LOGOUT':
      return { ...state, authenticated: false, user: null };
    case 'STOP_LOADING':
      return { ...state, loading: false };
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, defaultDispatch] = useReducer(reducer, {
    user: null,
    authenticated: false,
    loading: true,
  });

  //this one liner adds args to the dispatch so we don't have to keep writing type
  const dispatch = (type: string, payload?: any) =>
    defaultDispatch({ type, payload });

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
export const useFormState = () => useContext(StateContext);
export const useFormDispatch = () => useContext(DispatchContext);

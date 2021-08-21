import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import User from "../../../../server/src/entities/User";
import Project from "../../../../server/src/entities/Project";

interface State {
  authenticated: boolean;
  user: User | undefined;
  loading: boolean;
  showMenu: boolean;
  project: Project | undefined;
}
interface Action {
  type: string;
  payload: any;
}

const StateContext = createContext<State>({
  authenticated: false,
  user: undefined,
  loading: true,
  showMenu: false,
  project: undefined,
});
const DispatchContext = createContext<any>(null);

const reducer: any = (state: State, { type, payload }: Action) => {
  switch (type) {
    case "LOGIN":
      return { ...state, authenticated: true, user: payload };
    case "LOGOUT":
      return { ...state, authenticated: false, user: null };
    case "SET_PROJECT":
      return { ...state, project: payload };
    case "SHOW_MENU":
      return { ...state, showMenu: true };
    case "HIDE_MENU":
      return { ...state, showMenu: false };
    case "STOP_LOADING":
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
    showMenu: false,
    project: null,
  });

  //this one liner adds args to the dispatch so we don't have to keep writing type
  const dispatch = (type: string, payload?: any) =>
    // @ts-ignore
    defaultDispatch({ type, payload });

  //We load the user then dispatch here on first load
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/auth/me");
        dispatch("LOGIN", res.data);
      } catch (err) {
        console.log(err);
        //excecutes after try or catch
      } finally {
        dispatch("STOP_LOADING");
      }
    })();
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      {/*// @ts-ignore*/}
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);

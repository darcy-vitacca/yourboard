import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import User from "../../../../server/src/entities/User";
import Project from "../../../../server/src/entities/Project";

interface State {
  authenticated: boolean;
  user: User | null;
  loading: boolean;
  showMenu: boolean;
  currentProject: Project | null;
  projects: Project[] | null;
  currentProjectIndex: number;
}
interface Action {
  type: string;
  payload: any;
}

const StateContext = createContext<State>({
  authenticated: false,
  user: null,
  loading: true,
  showMenu: false,
  currentProject: null,
  projects: null,
  currentProjectIndex: 0,
});
const DispatchContext = createContext<any>(null);

const reducer: any = (state: State, { type, payload }: Action) => {
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        authenticated: true,
        user: payload.user,
        projects: payload.projects ?? state.projects,
        loading: false,
      };
    case "LOGOUT":
      return { ...state, authenticated: false, user: null };
    case "SET_PROJECTS":
      return {
        ...state,
        projects: payload,
        currentProject: payload[0],
        loading: false,
      };
    case "SET_CURRENT_PROJECT":
      return {
        ...state,
        currentProject: payload,
      };
    case "PREVIOUS_PROJECT":
      const previousIndex = state.projects
        ? state.currentProjectIndex - 1 === -1
          ? state.projects.length - 1
          : state.currentProjectIndex - 1
        : 0;
      return {
        ...state,
        currentProjectIndex: previousIndex,
        currentProject: state.projects ? state.projects[previousIndex] : null,
      };
    case "NEXT_PROJECT":
      const nextIndex = state.projects
        ? state.projects.length === state.currentProjectIndex + 1
          ? 0
          : state.currentProjectIndex + 1
        : 0;
      return {
        ...state,
        currentProjectIndex: nextIndex,
        currentProject: state.projects ? state.projects[nextIndex] : null,
      };
    case "SHOW_MENU":
      return { ...state, showMenu: true };
    case "HIDE_MENU":
      return { ...state, showMenu: false };
    case "LOADING":
      return { ...state, loading: true };
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
    currentProject: null,
    projects: null,
    currentProjectIndex: 0,
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
      } catch (err: any) {
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

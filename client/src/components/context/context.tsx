import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import User from "../../../../server/src/entities/User";
import Project from "../../../../server/src/entities/Project";
import Friend from "../../../../server/src/entities/Friends";
import Note from "../../../../server/src/entities/Notes";
import Link from "../../../../server/src/entities/Link";

interface State {
  authenticated: boolean;
  user: User | null;
  loading: boolean;
  friends: Friend[] | null;
  showMenu: boolean;
  currentProject: Project | null;
  projects: Project[] | null;
  currentProjectIndex: number;
  notes: Note | null;
  editingLink: Link | null;
  editingProject: Project | null;
}
interface Action {
  type: string;
  payload: any;
}

const StateContext = createContext<State>({
  authenticated: false,
  user: null,
  loading: true,
  friends: null,
  showMenu: false,
  currentProject: null,
  projects: null,
  currentProjectIndex: 0,
  notes: null,
  editingLink: null,
  editingProject: null,
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
        loading: false,
      };
    case "SET_CURRENT_PROJECT":
      return {
        ...state,
        currentProject: payload,
        currentProjectIndex:
          state?.projects?.findIndex(
            (project) => project.project_id === payload.project_id
          ) ?? 0,
      };
    case "RETURN_INITIAL_STATE_CURRENT_PROJECT":
      return {
        ...state,
        currentProject: null,
        currentProjectIndex: 0,
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
    case "SET_FRIENDS":
      return {
        ...state,
        friends: payload,
        loading: false,
      };
    case "SET_NOTES":
      return {
        ...state,
        notes: payload,
        loading: false,
      };
    case "CLEAR_NOTES":
      return {
        ...state,
        notes: null,
        loading: false,
      };
    case "SET_EDIT_LINK":
      return {
        ...state,
        editingLink: payload,
      };
    case "REMOVE_EDIT_LINK":
      return {
        ...state,
        editingLink: null,
      };
    case "SET_EDIT_PROJECT":
      return {
        ...state,
        editingProject: payload,
      };
    case "REMOVE_EDIT_PROJECT":
      return {
        ...state,
        editingProject: null,
      };
    case "UPDATE_CURRENT_PROJECT":
      if (state.projects) {
        const projectCopy = [...state.projects];
        return {
          ...state,
          loading: false,
          projects: projectCopy,
          currentProject: payload,
        };
      } else {
        return {
          ...state,
          loading: false,
        };
      }
    case "ADD_NEW_PROJECT":
      if (state.projects) {
        const projectCopy = [...state.projects];
        return {
          ...state,
          loading: false,
          projects: projectCopy,
          currentProject: payload,
        };
      } else {
        return {
          ...state,
          loading: false,
          projects: [payload],
          currentProject: payload,
        };
      }
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
    friends: null,
    showMenu: false,
    currentProject: null,
    projects: null,
    currentProjectIndex: 0,
    notes: null,
    editingLink: null,
    editingProject: null,
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

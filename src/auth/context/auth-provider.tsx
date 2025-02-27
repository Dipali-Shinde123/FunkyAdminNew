import { useMemo, useEffect, useReducer, useCallback, ReactNode } from 'react';
import axios from 'axios';
import { AuthContext } from './auth-context';  // Import AuthContext correctly
import { isValidToken, setLocalStorage } from './utils';

// Constants
const STORAGE_KEY = 'token';

// User Interface
interface User {
  id: string;
  name: string;
  email: string;
  accessToken: string;
}

// State interface
interface State {
  loading: boolean;
  user: User | null;
  toggling: boolean;
}

// Action interface
interface Action {
  type: 'INITIAL' | 'LOGIN';
  payload?: {
    user: User | null;
  };
}

// Initial state for the reducer
const initialState: State = {
  loading: true,
  user: null,
  toggling: true,
};

// Reducer function to manage state
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INITIAL':
      return {
        ...state,
        loading: false,
        user: action.payload?.user ?? null,
        toggling: true,
      };
    case 'LOGIN':
      return {
        ...state,
        user: action.payload?.user ?? null,
      };
    default:
      return state;
  }
};

// AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch user data with token
  const userdata = useCallback(
    async (token: string) => {
      const res = await axios.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    },
    []
  );

  // Initialize and validate the user session
  const initialize = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        const user = await userdata(accessToken);
        dispatch({
          type: 'INITIAL',
          payload: {
            user: {
              ...user,
              accessToken,
            },
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: 'INITIAL',
        payload: {
          user: null,
        },
      });
    }
  }, [userdata]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // Login function for Admin
  const login = useCallback(
    async (phone: string, password: string) => {
      const dataToSend = { phone, password };

      const response = await axios.post('/auth/login', dataToSend);

      const { token: accessToken } = response.data.data;
      const data = await userdata(accessToken);
      setLocalStorage(accessToken);
      dispatch({
        type: 'LOGIN',
        payload: {
          user: {
            ...data,
            accessToken,
          },
        },
      });
    },
    [userdata]
  );


  // Memoized value for context provider
  const status = state.loading ? 'loading' : state.user ? 'authenticated' : 'unauthenticated';

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      login,
    }),
    [login, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
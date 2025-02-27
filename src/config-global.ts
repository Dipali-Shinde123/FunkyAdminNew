import { paths } from "./routes/paths";

// Default paths after login/logout
export const PATH_AFTER_LOGIN = paths.dashboard.root;
export const PATH_AFTER_LOGOUT = paths.auth.signin;

// Defining environments
type Environment = 'PROD' | 'LOCAL';

// Ensure VITE_NODE_ENV is properly typed
const VITE_NODE_ENV: Environment = import.meta.env.VITE_NODE_ENV as Environment;

// Safely access environment variables
const environments: { 
  PROD: { HOST_API: string }; 
  LOCAL: { HOST_API: string }; 
} = {
  PROD: { 
    HOST_API: import.meta.env.VITE_PROD_HOST_API || 'https://api.prod.com' // Fallback to default if not set
  },
  LOCAL: { 
    HOST_API: 'http://localhost:3000' 
  },
};

// Get the appropriate HOST_API value based on VITE_NODE_ENV
const { HOST_API } = environments[VITE_NODE_ENV] || environments.LOCAL;

console.log(HOST_API);

export {
  HOST_API
};
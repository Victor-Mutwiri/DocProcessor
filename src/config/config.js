const config = {
    development: {
      API_BASE_URL: import.meta.env.VITE_API_DEV_URL
    },
    production: {
      API_BASE_URL: import.meta.env.VITE_PROD_PROD_API_URL
    }
  };
  /* Updated config file */
  export const API_BASE_URL = import.meta.env.PROD
    ? config.production.API_BASE_URL
    : config.development.API_BASE_URL;
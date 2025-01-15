const config = {
    development: {
      API_BASE_URL: import.meta.env.VITE_API_DEV_URL || 'http://127.0.0.1:5000'
    },
    production: {
      API_BASE_URL: import.meta.env.VITE_PROD_PROD_API_URL || 'https://docprocessor.loca.lt'
    }
  };
  
  export const API_BASE_URL = import.meta.env.PROD
    ? config.production.API_BASE_URL
    : config.development.API_BASE_URL;
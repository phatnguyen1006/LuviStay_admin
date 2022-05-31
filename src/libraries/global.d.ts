declare namespace NodeJS {
  export interface ProcessEnv {
    REACT_APP_NODE_ENV: "development" | "production";
    PORT?: string;
    REACT_APP_BASE_SERVER_URL: string;
    REACT_APP_BASE_WEBSITE_URL: string;
    REACT_APP_EXPIRES_CACHE_DATA?: string;
    REACT_APP_EXPIRES_TOKEN_COOKIE?: string;
  }
}

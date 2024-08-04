export const PROD_HOST = "https://kaspa-power-law-server.onrender.com";
export const LOCAL_HOST = "http://127.0.0.1:8000";

const server_host = process.env.NODE_ENV === "development" ? LOCAL_HOST : PROD_HOST;

export const GET_KAS_PRICE = server_host + "/kas-price";
export const LOG_ACTION = server_host + "/log-action";

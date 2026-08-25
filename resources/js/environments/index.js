//const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1/';
const apiBaseUrl = `${window.location.origin}/api/v1/`;
const appName = import.meta.env.VITE_APP_NAME || 'SaaS App';
export default {
    apiBaseUrl,
    appName,
};
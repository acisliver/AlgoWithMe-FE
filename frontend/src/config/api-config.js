let backendHost;
const protocol = window.location.protocol;
const hostname = window && window.location && window.location.hostname;

if (hostname === 'localhost') {
    backendHost = `${protocol}//localhost:8080`;
} else if (hostname === 'staging.example.com') {
    backendHost = `${protocol}//staging-api.example.com`;
} else {
    backendHost = `${protocol}//api.example.com`;
}

export const API_BASE_URL = `${backendHost}`;
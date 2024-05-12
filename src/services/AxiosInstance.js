import axios from 'axios';
import { getEnvVars } from './Environment';

const { apiUrl } = getEnvVars();

export const createAxiosInstance = (baseURL) => {
    const instance = axios.create({
        baseURL,
    });

    instance.interceptors.response.use(
        (response) => {
            return Promise.resolve(response);
        },
        (error) => {
            if (error?.response?.status === 401) {
                
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

const axiosInstance = createAxiosInstance(apiUrl);

export default axiosInstance;

export const ApiMethod = {
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT',
    PATCH: 'PATCH',
    SEARCH: 'SEARCH',
    DELETE: 'DELETE',
};

export function ApiCall({
    customEndpoint = false,
    apiEndpoint,
    apiData = {},
    method = ApiMethod.POST,
    apiContentType = 'application/json',
}) {
    let params = {
        method,
        url: customEndpoint ? apiEndpoint : apiUrl + apiEndpoint,
        headers: {
            'Content-Type': apiContentType,
            'Authorization': '80Hp7_MB6V14khly86hD-i6ZxGdKf6Tj'
        },
        data: method === ApiMethod.POST || method === ApiMethod.PATCH ? apiData : undefined,
    };
    
    return axiosInstance(params);
}

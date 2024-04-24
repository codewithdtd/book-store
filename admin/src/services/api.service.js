import axios from "axios";
import Cookies from "js-cookie";

export default (baseURL) => {
    const api = axios.create({
        baseURL,
        headers: {
            // "Content-Type": "application/json",
            // "Content-Type": 'multipart/form-data',
            Accept: "application/json",
            // Kiểm tra xem token có tồn tại trong cookie không
            // Nếu có, thêm token vào headers
            ...(Cookies.get('token') && {
                token: `Bearer ${Cookies.get('token')}`,
            }),
        },
    });

    // Intercept request để thêm token vào headers nếu token thay đổi
    api.interceptors.request.use(config => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.token = `Bearer ${token}`;
        }
        if (config.data && config.data instanceof FormData) {
            // Nếu là FormData, thiết lập Content-Type là multipart/form-data
            config.headers['Content-Type'] = 'multipart/form-data';
        } else {
            // Nếu không phải là FormData, thiết lập Content-Type là application/json
            config.headers['Content-Type'] = 'application/json';
        }
        return config;
    });
    return api;
};

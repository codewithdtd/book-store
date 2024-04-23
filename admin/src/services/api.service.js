import axios from "axios";
import Cookies from "js-cookie";

export default (baseURL) => {
    const api = axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json",
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
        return config;
    });
    return api;
};

import createApiClient from "./api.service";
import Cookies from "js-cookie";

class UserService {
    constructor(baseUrl = "/api/user") {
    this.api = createApiClient(baseUrl);
    }
    async get(id) {
        return (await this.api.get("/"+id)).data;
    }
    async register(data) {
        return (await this.api.post("/register", data)).data;
    }
    async login(data) {
        const user = (await this.api.post("/login", data)).data; 
        return user;
    }
    async logout() {
        const user = (await this.api.post("/logout")).data; 
        return user;
    }
    // CART
    async getCart() {
        return (await this.api.get("/cart")).data;
    }
    async addCart(data) {
        return (await this.api.post("/cart",data)).data;
    }
    async updateCart(data) {
        return (await this.api.put(`/cart`,data)).data;
    }
    async deleteCart(data) {
        return (await this.api.delete("/cart/"+data)).data;
    }
    // ORDER
    async addOrder(data) {
        return (await this.api.post("/order", data)).data;
    }
}
export default new UserService();
import createApiClient from "./api.service";

class StaffService {
    constructor(baseUrl = "/api/staff") {
    this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
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
}
export default new StaffService();
import createApiClient from "./api.service";
class ProductService {
    constructor(baseUrl = "/api/book") {
    this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async getOne(id) {
        return (await this.api.get("/"+id)).data;
    }
    async search(id) {
        return (await this.api.get("/"+id)).data;
    }

}
export default new ProductService();
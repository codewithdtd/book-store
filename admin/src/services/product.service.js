import createApiClient from "./api.service";

class ProductService {
    constructor(baseUrl = "/api/menu") {
    this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async getAllCategory() {
        return (await this.api.get("/category")).data;
    }
    async addProduct(data) {
        return (await this.api.post(`/`, data)).data;
    }
    async updateProduct(data) {
        return (await this.api.put(`/${data._id}`, data)).data;
    }
    async deleteProduct(data) {
        return (await this.api.delete(`/${data._id}`)).data;
    }
}
export default new ProductService();
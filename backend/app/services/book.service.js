const { ObjectId } = require("mongodb");
class ProductService {
    constructor(client) {
        this.Product = client.db().collection("sach");
    }
// Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    infoProduct(payload) {
        const product = {
            ten: payload.ten,
            dongia: payload.dongia,
            tacgia: payload.tacgia,
            soluong: payload.soluong,
            namxuatban: payload.namxuatban,
            soluong_muon: payload.soluong_muon,
            nhaxuatban: payload.nhaxuatban, 
            ngaytao: payload.ngaytao,
            ngaychinhsua: payload.ngaychinhsua,
            deleted: 0,
        };
        // Remove undefined fields
        Object.keys(product).forEach(
            (key) => {
                product[key] === undefined && delete product[key]
            }
        );
        return product;
    }
    async create(payload) {
        const product = this.infoProduct(payload);
        if(product.quantity >= 0) {
            const result = await this.Product.findOneAndUpdate(
                product,
                { $set: {ngaytao: new Date().getDate()+'/'+ (new Date().getMonth()+1)+'/'+new Date().getFullYear()}},
                { returnDocument: "after", upsert: true }
            );
            return result;
        }
        return false;
    }

    async find(filter) {
        // const filter = {};
        const cursor = await this.Product.find(filter);
        return await cursor.toArray();
    }

    async findByQuery(query) {
        const filter = {};
        for (const key in query) {
            if (Object.hasOwnProperty.call(query, key)) {
                filter[key] = { $regex: new RegExp(query[key], 'i') };
            }
        }
        return await this.find(filter);
    }

    async findById(id) {
        const result = await this.Product.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }


    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.infoProduct(payload);
        update.ngaychinhsua = new Date().getDate()+'/'+ (new Date().getMonth()+1)+'/'+new Date().getFullYear();
        if(update.quantity >= 0)  { 
            const result = await this.Product.findOneAndUpdate(
                filter,
                { $set: update },
                { returnDocument: "after" }
            );

            return result;
        }
        return false;
    }    
    
    async updateProductCategory(name, payload) {
        const result = await this.Product.findOneAndUpdate(
            {category: name},
            { $set: {category: payload.name}},
            { returnDocument: "after" }
        );
        return result;
    }

    async delete(id) {
        const result = await this.Product.findOneAndUpdate({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        },
        {$set: {"deleted": 1}},
        { returnDocument: "after" });
        return result;
    }

    async deleteAll() {
        const result = await this.Product.deleteMany({});
        return result.deletedCount;
    }
}



module.exports = ProductService;

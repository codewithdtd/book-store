const { ObjectId } = require("mongodb");
class PublisherService {
    constructor(client) {
        this.Publisher = client.db().collection("nhaXuatBan");
    }
// Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    infoPublisher(payload) {
        const publisher = {
            ten: payload.ten,
            diachi: payload.diachi, 
        };
        // Remove undefined fields
        Object.keys(publisher).forEach(
            (key) => {
                publisher[key] === undefined && delete publisher[key]
            }
        );
        return publisher;
    }
    async create(payload) {
        const publisher = this.infoPublisher(payload);
        const result = await this.Publisher.findOneAndUpdate(
            publisher,
            { $set: {}},
            { returnDocument: "after", upsert: true }
        );
        return result;
    }

    async find(filter) {
        const cursor = await this.Publisher.find(filter);
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
        return await this.Publisher.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.infoPublisher(payload);
        const result = await this.Publisher.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "before" }
        );
        return result;
    }

    async delete(id) {
        const result = await this.Publisher.findOneAndUpdate(
            {
                _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
            }, 
            {$set: {"deleted": 1}},
            { returnDocument: "after" }
        );
       
        return result;
    }

    async deleteAll() {
        const result = await this.Publisher.deleteMany({});
        return result.deletedCount;
    }
}



module.exports = PublisherService;

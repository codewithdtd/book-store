const { ObjectId } = require("mongodb");
class BookService {
    constructor(client) {
        this.Book = client.db().collection("sach");
    }
// Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    infoBook(payload) {
        const book = {
            ten: payload.ten,
            hinhanh: payload.hinhanh,
            dongia: payload.dongia,
            tacgia: payload.tacgia,
            soluong: payload.soluong,
            namxuatban: payload.namxuatban,
            mota: payload.mota,
            soluong_muon: payload.soluong_muon,
            nhaxuatban: payload.nhaxuatban, 
            ngaytao: payload.ngaytao,
            ngaychinhsua: payload.ngaychinhsua,
            deleted: 0,
        };
        // Remove undefined fields
        Object.keys(book).forEach(
            (key) => {
                book[key] === undefined && delete book[key]
            }
        );
        return book;
    }
    async create(payload) {
        const book = this.infoBook(payload);
        if(book.soluong >= 0) {
            const result = await this.Book.findOneAndUpdate(
                book,
                { $set: {ngaytao: new Date().getDate()+'/'+ (new Date().getMonth()+1)+'/'+new Date().getFullYear()}},
                { returnDocument: "after", upsert: true }
            );
            return result;
        }
        return false;
    }

    async find(filter) {
        // const filter = {};
        const cursor = await this.Book.find(filter);
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
        const result = await this.Book.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }


    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.infoBook(payload);
        update.ngaychinhsua = new Date().getDate()+'/'+ (new Date().getMonth()+1)+'/'+new Date().getFullYear();
        if(update.soluong >= 0)  { 
            const result = await this.Book.findOneAndUpdate(
                filter,
                { $set: update },
                { returnDocument: "after" }
            );

            return result;
        }
        return false;
    }    
    
    async updateBookCategory(name, payload) {
        const result = await this.Book.findOneAndUpdate(
            {category: name},
            { $set: {category: payload.name}},
            { returnDocument: "after" }
        );
        return result;
    }

    async delete(id) {
        const result = await this.Book.findOneAndUpdate({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        },
        {$set: {"deleted": 1}},
        { returnDocument: "after" });
        return result;
    }

    async deleteAll() {
        const result = await this.Book.deleteMany({});
        return result.deletedCount;
    }
}



module.exports = BookService;

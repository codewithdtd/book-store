const { ObjectId } = require("mongodb");
class OrderService {
    constructor(client) {
        this.Order = client.db().collection("phieutheodoi");
    }
// Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    infoOrder(payload) {
        const order = {
            docgia: payload.docgia,
            sach: payload.sach,
            tongtien: payload.tongtien,
            ngaymuon: payload.ngaymuon,
            ngaytra: payload.ngaytra,
            trangthai: payload.trangthai,
        };
        // Remove undefined fields
        Object.keys(order).forEach(
            (key) => {
                order[key] === undefined && delete order[key]
            }
        );
        return order;
    }
    async create(payload) {
        const order = this.infoOrder(payload);
        const result = await this.Order.findOneAndUpdate(
            order,
            { $set: { 
                trangthai: 'Đã đăng ký'
                // ngaymuon: new Date().getDate()+'/'+ (new Date().getMonth()+1)+'/'+new Date().getFullYear() + ' ' + new Date().getHours() +':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
            }},
            { returnDocument: "after", upsert: true }
        );
    
        return result;
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.infoOrder(payload);
        // update.ngaytra = new Date().getDate()+'/'+ (new Date().getMonth()+1)+'/'+new Date().getFullYear() + ' ' + new Date().getHours() +':' + new Date().getMinutes() + ':' + new Date().getSeconds();
        const result = await this.Order.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    async find(id) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const result = await this.Order.find(filter);
        return result.toArray();
    }

    async findAll() {
        const result = await this.Order.find();
        return result.toArray();
    }

    async findAllOrderUser(id) {
        const filter = {
            "docgia._id": id,
        };
        const result = await this.Order.find(filter);
        return result.toArray();
    }

    async delete(id) {
        const result = await this.Order.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.Order.deleteMany({});
        return result.deletedCount;
    }

}



module.exports = OrderService;
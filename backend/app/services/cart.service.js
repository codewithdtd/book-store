const { ObjectId } = require("mongodb");
class CartService {
    constructor(client) {
        this.Cart = client.db().collection("giohang");
    }
// Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    infocart(payload) {
        const cart = {
            docgia: payload.docgia,
            sach: payload.sach,
            soluong: payload.soluong,
            gia: payload.soluong*payload.sach.dongia        
        };
        // Remove undefined fields
        Object.keys(cart).forEach(
            (key) => {
                cart[key] === undefined && delete cart[key]
            }
        );
        return cart;
    }
    async create(user, payload) {
        const cart = this.infocart(payload);
        if(cart.soluong > 0) {
            const result = await this.Cart.findOneAndUpdate(
                cart,
                { $set: {
                    docgia: user,
                    gia: payload.soluong*payload.sach.dongia
                    }
                },
                { returnDocument: "after", upsert: true }
            );
            return result;
        }
        return false;
    }

    async update(id, payload) {
        console.log(payload)
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.infocart(payload);
        if(update.soluong >= 0)  { 
            const result = await this.Cart.findOneAndUpdate(
                filter,
                { $set: update },
                { returnDocument: "after" }
            );
            return result;
        }
        return false;
    }

    async updatesoluong(cart) {
        console.log(cart)
        const filter = {
            _id: ObjectId.isValid(cart._id) ? new ObjectId(cart._id) : null,
        };
        const result = await this.Cart.findOneAndUpdate(
            filter,
            { $set: {"soluong": cart.soluong, "gia": cart.gia } },
            { returnDocument: "after" }
        );
        return result;
    }
    async find(user, id) {
        const result = await this.Cart.findOne({ 'sach._id': { $eq: id }, docgia: user });
        return result;
    }

    async findById(id) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const result = await this.Cart.findOne(filter);
        return result ?? false;
    }

    async findAllCartUser(id) {
        const filter = {
            docgia: id,
        };
        const result = await this.Cart.find(filter);
        return result.toArray();
    }

    async delete(id) {
        const result = await this.Cart.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.Cart.deleteMany({});
        return result.deletedCount;
    }

    async deleteAllCartUser(id) {
        const filter = {
            docgia: id,
        };
        const result = await this.Cart.deleteMany(filter);
        return result;
    }

}



module.exports = CartService;
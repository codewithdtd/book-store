const pgp = require('pg-promise')();
const db = require('../utils/postgresql.util');
class CartService {
    constructor() {
        this.db = db;
    }

    infocart(payload) {
        console.log(payload)
        const cart = {
            docgia: payload.docgia,
            sach_id: payload.sach.id,
            soluong: parseInt(payload.soluong),
            gia: parseInt(payload.soluong * payload.sach.dongia)        
        };
        Object.keys(cart).forEach(key => cart[key] === undefined && delete cart[key]);
        return cart;
    }

    async create(user, payload) {
        const cart = this.infocart(payload);
        if (cart.soluong > 0) {
            const result = await this.db.oneOrNone(
                `INSERT INTO carts (docgia, sach_id, soluong, gia) 
                 VALUES ($[docgia], $[sach_id], $[soluong], $[gia])
                 RETURNING *`,
                { ...cart, docgia: user }
            );
            return result;
        }
        return false;
    }

    async update(id, payload) {
        const update = this.infocart(payload);
        if (update.soluong >= 0) {
            const result = await this.db.oneOrNone(
                `UPDATE carts
                 SET soluong = $[soluong], 
                     gia = $[gia] 
                 WHERE id = $[id]
                 RETURNING *`,
                { ...update, id }
            );
            return result;
        }
        return false;
    }

    async updatesoluong(cart) {
        const result = await this.db.oneOrNone(
            `UPDATE carts
             SET soluong = $[soluong], 
                 gia = $[gia]
             WHERE id = $[id]
             RETURNING *`,
            { soluong: cart.soluong, gia: cart.gia, id: cart.id }
        );
        return result;
    }

    async find(user, id) {
        const result = await this.db.oneOrNone(
            `SELECT * FROM carts 
             WHERE sach_id = $1 
             AND docgia = $2`,
            [id, user]
        );
        return result;
    }

    async findById(id) {
        const result = await this.db.oneOrNone(
            `SELECT * FROM carts 
             WHERE id = $1`,
            [id]
        );
        return result ?? false;
    }

    async findAllCartUser(id) {
        const result = await this.db.any(
            `SELECT * FROM carts 
             WHERE docgia = $1`,
            [id]
        );
        return result;
    }

    async delete(id) {
        const result = await this.db.oneOrNone(
            `DELETE FROM carts 
             WHERE id = $1
             RETURNING *`,
            [id]
        );
        return result;
    }

    async deleteAll() {
        const result = await this.db.result(`DELETE FROM carts`);
        return result.rowCount;
    }

    async deleteAllCartUser(id) {
        const result = await this.db.result(
            `DELETE FROM carts 
             WHERE docgia = $1`,
            [id]
        );
        return result.rowCount;
    }
}




module.exports = CartService;
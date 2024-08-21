const db = require('../utils/postgresql.util');

class OrderService {
    constructor() {
        this.db = db;
    }

    infoOrder(payload) {
        const order = {
            docgia_id: payload.docgia.id,  // Assuming 'docgia' is an object with an '_id' field
            // sach_id: payload.sach.id,      // Assuming 'sach' is an object with an '_id' field
            tongtien: payload.tongtien,
            ngaymuon: payload.ngaymuon,
            ngaytra: payload.ngaytra,
            trangthai: payload.trangthai,
            phuongthucthanhtoan: payload.method_payment,
            ghichu: payload.note,
        };
        Object.keys(order).forEach(key => order[key] === undefined && delete order[key]);
        return order;
    }

    async create(payload) {
        console.log(payload)
        const order = this.infoOrder(payload);
        const result = await this.db.oneOrNone(
            `INSERT INTO phieutheodoi (docgia_id, tongtien, ngaymuon, ngaytra, trangthai, phuongthucthanhtoan, ghichu)
             VALUES ($[docgia_id], $[tongtien], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Đã đăng ký', $[phuongthucthanhtoan], $[ghichu])
             RETURNING id`,
            order
        );
        const insertQuery = `
            INSERT INTO chitietphieutheodoi (docgia, phieutheodoi_id, sach_id, soluong, gia, created_at)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;

        // Iterate over the array and insert each item into the database
        for (const item of payload.sach) {
            await db.none(insertQuery, [item.docgia, result.id, item.sach_id, item.soluong, item.gia, item.created_at]);
        }
        return result;
    }

    async update(id, payload) {
        const update = this.infoOrder(payload);
        const result = await this.db.oneOrNone(
            `UPDATE phieutheodoi
             SET docgia_id = $[docgia_id], 
                 tongtien = $[tongtien], 
                 ngaymuon = $[ngaymuon], 
                 ngaytra = $[ngaytra], 
                 trangthai = $[trangthai]
             WHERE id = $[id]
             RETURNING *`,
            { ...update, id }
        );
        return result;
    }

    async find(id) {
        const result = await this.db.any(
            `SELECT * FROM phieutheodoi 
             WHERE id = $1`,
            [id]
        );
        return result;
    }

    async findAll() {
        const result = await this.db.any(`SELECT * FROM phieutheodoi`);
        return result;
    }

    async findAllOrderUser(id) {
        const result = await this.db.any(
            `SELECT * FROM phieutheodoi 
             WHERE docgia_id = $1`,
            [id]
        );

        for (const item of result) {
            const detail = await this.db.any(`SELECT * FROM chitietphieutheodoi WHERE phieutheodoi_id = $1`, item.id);
            item.sach = detail; // Now you should see the actual data
        }
        return result;
    }
    async findAllOrderDetailUser() {
        const result = await this.db.any(
            `SELECT * FROM chitietphieutheodoi `,
        );
        return result;
    }

    async delete(id) {
        const result = await this.db.oneOrNone(
            `DELETE FROM phieutheodoi 
             WHERE id = $1
             RETURNING *`,
            [id]
        );
        return result;
    }

    async deleteAll() {
        const result = await this.db.result(`DELETE FROM phieutheodoi`);
        return result.rowCount;
    }
}

module.exports = OrderService;

const pgp = require('pg-promise')();
const db = require('../utils/postgresql.util');
class sachervice {
    constructor() {
        this.db = db;
    }

    // Định nghĩa các phương thức truy xuất CSDL sử dụng pg-promise API

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
            deleted: false,
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
        if (book.soluong >= 0) {
            const result = await this.db.query(
                `INSERT INTO sach (ten, hinhanh, dongia, tacgia, soluong, namxuatban, mota, soluong_muon, nhaxuatban, ngaytao, ngaychinhsua, deleted)
                 VALUES ($[ten], $[hinhanh], $[dongia], $[tacgia], $[soluong], $[namxuatban], $[mota], 0, $[nhaxuatban], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $[deleted])
                 RETURNING *`,
                book
            );
            return result;
        }
        return false;
    }

    async find(filter) {
        const results = this.db.any('SELECT * FROM sach WHERE $1:raw', [filter]);
        return results;
    }

    async findAll() {
        const query = 'SELECT * FROM sach;'; // Câu lệnh SQL
        const results = await this.db.any(query); // Thực thi câu lệnh SQL và trả về kết quả
        return results;
    }

    async findByQuery(query) {
        const filter = Object.keys(query).map(
            key => `LOWER(${key}) LIKE LOWER('%${query[key]}%')`
        ).join(' AND ');
        const sql = `SELECT * FROM sach WHERE ${filter}`;
        return await this.db.any(sql);
    }

    async findById(id) {
        const result = await this.db.oneOrNone(
            'SELECT * FROM sach WHERE id = $1',
            [id]
        );
        return result;
    }

    async update(id, payload) {
        // Lấy thông tin sách hiện tại
        const currentBook = await this.db.oneOrNone(
            `SELECT * FROM sach WHERE id = $1`,
            [id]
        );

        if (!currentBook) {
            return false; // Nếu không tìm thấy sách với ID này
        }

        // Xử lý thông tin cập nhật
        const update = this.infoBook(payload);
        update.ngaychinhsua = new Date().toISOString().split('T')[0]; // Format date

        // Tạo câu lệnh SQL động để chỉ cập nhật các trường có giá trị
        const setClause = Object.keys(update)
            .filter(key => key !== 'id' && update[key] !== undefined && update[key] !== currentBook[key])
            .map(key => `${key} = $[${key}]`)
            .join(', ');

        if (setClause) {
            const result = await this.db.oneOrNone(
                `UPDATE sach
                SET ${setClause}
                WHERE id = $[id]
                RETURNING *`,
                { ...update, id }
            );
            return result;
        }

        return currentBook; // Nếu không có gì để cập nhật, trả về thông tin hiện tại
    }


    async updateBookCategory(name, payload) {
        const result = await this.db.oneOrNone(
            `UPDATE sach
             SET category = $[category]
             WHERE category = $[name]
             RETURNING *`,
            { category: payload.name, name }
        );
        return result;
    }

    async delete(id) {
        const result = await this.db.oneOrNone(
            `UPDATE sach
             SET deleted = true
             WHERE id = $1
             RETURNING *`,
            [id]
        );
        return result;
    }

    async deleteAll() {
        const result = await this.db.result('DELETE FROM sach');
        return result.rowCount;
    }
}

module.exports = sachervice;
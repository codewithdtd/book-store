const db = require('../utils/postgresql.util');

class StaffService {
    constructor() {
        this.db = db;
    }

    infoUser(payload) {
        const user = {
            hoten: payload.hoten,
            chucvu: payload.chucvu,
            diachi: payload.diachi,
            sodienthoai: payload.sodienthoai,
            password: payload.password,
            ngaytao: payload.ngaytao,
            ngaychinhsua: payload.ngaychinhsua,
            deleted: false,
            role: 'admin'  // Default role for staff
        };
        // Remove undefined fields
        Object.keys(user).forEach(
            (key) => {
                user[key] === undefined && delete user[key];
            }
        );
        return user;
    }

    async create(payload) {
        const user = this.infoUser(payload);
        const result = await this.db.oneOrNone(
            `INSERT INTO nhanvien (hoten, chucvu, diachi, sodienthoai, password, ngaytao, ngaychinhsua, deleted, role)
             VALUES ($[hoten], $[chucvu], $[diachi], $[sodienthoai], $[password], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $[deleted], $[role])
             RETURNING *`,
            user
        );
        return result;
    }

    async find(filter) {
        const conditions = Object.keys(filter).map(key => `${key} = $[${key}]`).join(' AND ');
        const result = await this.db.any(
            `SELECT * FROM nhanvien WHERE ${conditions}`,
            filter
        );
        return result;
    }

    async findByQuery(query) {
        const conditions = Object.keys(query).map(
            key => `${key} ILIKE '%' || $[${key}] || '%'`
        ).join(' AND ');
        const result = await this.db.any(
            `SELECT * FROM nhanvien WHERE ${conditions}`,
            query
        );
        return result;
    }

    async findById(id) {
        const result = await this.db.oneOrNone(
            `SELECT * FROM nhanvien WHERE id = $1`,
            [id]
        );
        return result;
    }

    async findUserLogin(filter) {
        const result = await this.db.oneOrNone(
            `SELECT * FROM nhanvien WHERE ${Object.keys(filter).map(key => `${key} = $[${key}]`).join(' AND ')}`,
            filter
        );
        return result;
    }

    async update(id, payload) {
        const update = this.infoUser(payload);
        const setClause = Object.keys(update).map(key => `${key} = $[${key}]`).join(', ');
        const result = await this.db.oneOrNone(
            `UPDATE nhanvien
             SET ${setClause}
             WHERE id = $[id]
             RETURNING *`,
            { ...update, id }
        );
        return result;
    }

    async delete(id) {
        const result = await this.db.oneOrNone(
            `UPDATE nhanvien
             SET deleted = true
             WHERE id = $1
             RETURNING *`,
            [id]
        );
        return result;
    }

    async deleteAll() {
        const result = await this.db.result(
            `DELETE FROM nhanvien`
        );
        return result.rowCount;
    }

}

module.exports = StaffService;

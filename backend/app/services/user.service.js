const db = require('../utils/postgresql.util');

class docgiaervice {
    constructor() {
        this.db = db;
    }

    // Prepares the user object, removing undefined fields
    infoUser(payload) {
        const user = {
            ho: payload.ho,
            ten: payload.ten,
            diachi: payload.diachi,
            gioitinh: payload.gioitinh,
            ngaysinh: payload.ngaysinh,
            sodienthoai: payload.sodienthoai,
            password: payload.password,
            ngaytao: new Date(),
            ngaychinhsua: new Date(),
            deleted: false,
            role: 'user', // Default role
        };
        Object.keys(user).forEach(key => user[key] === undefined && delete user[key]);
        return user;
    }

    // Inserts a new user or updates if the user already exists
    async create(payload) {
        const user = this.infoUser(payload);
        const result = await this.db.oneOrNone(
            `INSERT INTO docgia (ho, ten, diachi, gioitinh, ngaysinh, sodienthoai, password, ngaytao, ngaychinhsua, deleted, role)
            VALUES ($[ho], $[ten], $[diachi], $[gioitinh], $[ngaysinh], $[sodienthoai], $[password], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $[deleted], $[role])
            RETURNING *`,
            user
        );
        return result;
    }

    // Finds docgia based on given filters
    async find(filter) {
        const conditions = Object.keys(filter).map(key => `${key} = $[${key}]`).join(' AND ');
        const result = await this.db.any(
            `SELECT * FROM docgia`,
        );
        return result;
    }

    // Finds docgia matching a query with case-insensitive search
    async findByQuery(query) {
        const conditions = Object.keys(query).map(
            key => `${key} ILIKE '%$[${key}]%'`
        ).join(' AND ');
        const result = await this.db.any(
            `SELECT * FROM docgia WHERE ${conditions}`,
            query
        );
        return result;
    }

    // Finds a user by ID
    async findById(id) {
        const result = await this.db.oneOrNone(
            `SELECT * FROM docgia WHERE id = $1`,
            [id]
        );
        return result;
    }

    // Finds a user by login credentials
    async findUserLogin(filter) {
        const result = await this.db.oneOrNone(
            `SELECT * FROM docgia WHERE ${Object.keys(filter).map(key => `${key} = $[${key}]`).join(' AND ')}`,
            filter
        );
        return result;
    }

    // Updates a user's details by ID
    async update(id, payload) {
        const update = this.infoUser(payload);
        const result = await this.db.oneOrNone(
            `UPDATE docgia
             SET ho = $[ho], ten = $[ten], diachi = $[diachi], gioitinh = $[gioitinh], ngaysinh = $[ngaysinh], sodienthoai = $[sodienthoai], password = $[password], ngaytao = $[ngaytao], ngaychinhsua = $[ngaychinhsua], deleted = $[deleted], role = $[role]
             WHERE id = $[id]
             RETURNING *`,
            { ...update, id }
        );
        return result;
    }

    // Marks a user as deleted
    async delete(id) {
        const result = await this.db.oneOrNone(
            `UPDATE docgia
             SET deleted = true
             WHERE id = $1
             RETURNING *`,
            [id]
        );
        return result;
    }

    // Deletes all docgia
    async deleteAll() {
        const result = await this.db.result(
            `DELETE FROM docgia`
        );
        return result.rowCount;
    }

    // Adds items to a user's cart
   
}

module.exports = docgiaervice;

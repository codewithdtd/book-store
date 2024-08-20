const db = require('../utils/postgresql.util');

class PublisherService {
    constructor() {
        this.db = db;
    }

    infoPublisher(payload) {
        const publisher = {
            ten: payload.ten,
            diachi: payload.diachi,
            delete: false,
        };
        Object.keys(publisher).forEach(key => publisher[key] === undefined && delete publisher[key]);
        return publisher;
    }

    async create(payload) {
        const publisher = this.infoPublisher(payload);
        const result = await this.db.oneOrNone(
            `INSERT INTO nhaXuatBan (ten, diachi)
             VALUES ($[ten], $[diachi])
             RETURNING *`,
            publisher
        );
        return result;
    }

    async find() {
        const result = await this.db.any(
            `SELECT * FROM nhaXuatBan`,
        );
        return result;
    }

    async findByQuery(query) {
        const conditions = Object.keys(query).map(
            key => `${key} ILIKE '%$[${key}]%'`
        ).join(' AND ');
        const result = await this.db.any(
            `SELECT * FROM nhaXuatBan WHERE ${conditions}`,
            query
        );
        return result;
    }

    async findById(id) {
        const result = await this.db.oneOrNone(
            `SELECT * FROM nhaXuatBan WHERE id = $1`,
            [id]
        );
        return result;
    }

    async update(id, payload) {
        const update = this.infoPublisher(payload);
        const result = await this.db.oneOrNone(
            `UPDATE nhaXuatBan
             SET ten = $[ten], diachi = $[diachi]
             WHERE id = $[id]
             RETURNING *`,
            { ...update, id }
        );
        return result;
    }

    async delete(id) {
        const result = await this.db.oneOrNone(
            `UPDATE nhaXuatBan
             SET deleted = true
             WHERE id = $1
             RETURNING *`,
            [id]
        );
        return result;
    }

    async deleteAll() {
        const result = await this.db.result(
            `DELETE FROM nhaXuatBan`
        );
        return result.rowCount;
    }
}

module.exports = PublisherService;

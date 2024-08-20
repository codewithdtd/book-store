const config = {
    app: {
        port: process.env.PORT || 3000,  // Thay đổi port cho ứng dụng của bạn
    },
    db: {
        uri: process.env.POSTGRES_URI || "postgres://postgres:12345678@localhost:5432/book"
    }
};

module.exports = config;
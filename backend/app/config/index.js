const config = {
    app: {
        port: process.env.PORT || 3000,
    },

    db: {
        uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/book-manager"
        // uri: 'mongodb+srv://test_01:123@cluster0.ghnnihw.mongodb.net/book-manager?retryWrites=true&w=majority&appName=Cluster0'
    }
};

module.exports = config;
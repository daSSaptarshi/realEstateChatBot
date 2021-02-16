const CONFIG = {
    MONGO_URL   : process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/',
    MONGO_DB    : 'chatbotDB',
    PORT        :  process.env.PORT || 3000
}

module.exports = CONFIG
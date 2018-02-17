// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  env: 'development',
  port: process.env.PORT || 3000,
  ip: process.env.IP || '0.0.0.0',
  secrets: {
    session: 'secret'
  },

  mongo: {
    uri:
      process.env.MONGODB_DB_URL ||
      'mongodb://admin:admin123@devcluster-shard-00-00-isjwh.mongodb.net:27017,devcluster-shard-00-01-isjwh.mongodb.net:27017,devcluster-shard-00-02-isjwh.mongodb.net:27017/test?ssl=true&replicaSet=DevCluster-shard-0&authSource=admin',
    options: {
      useMongoClient: true
    },
    populate: false
  }
};

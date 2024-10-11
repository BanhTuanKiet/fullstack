const redis = require('redis')

const client = redis.createClient({
    port: 6379,
    host: 'localhost',
    enable_offline_queue: false
})

client.on('error', err => console.log("Redis Client Error.", err))

module.exports = client
 
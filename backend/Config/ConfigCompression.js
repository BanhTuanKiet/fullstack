const compression = require('compression')

const compressOptions = {
    level: 4,
    threshold: 1024, // only response > 1kb
}

const configCompress = compression(compressOptions)

module.exports = configCompress
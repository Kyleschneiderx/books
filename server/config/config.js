const config = {
    production: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    defualt: {
        SECRET: 'SECRET',
        DATABASE: 'mongodb://localhost:27017/books'

    }

}

exports.get = function get(env){
    return config[env] || config.defualt
}
require('dotenv').config({ path: `${__dirname}/../.env` });

module.exports = {
  env: process.env.NODE_ENV || 'production',
  port: process.env.PORT,
  mongourl: process.env.MONGODB_URL,
  postgress: {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DBNAME,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration: process.env.JWT_EXPIRATION,
  },
};

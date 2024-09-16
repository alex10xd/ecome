module.exports = {
  development: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "MzyHpmooJgrMMuOvSDSyWHrrDqKnPVL",
    database: process.env.DB_DATABASE || "railway",
    host: process.env.DB_HOST || "autorack.proxy.rlwy.net",
    port: process.env.DB_PORT || "59811",
    dialect: "mysql",
    dialectOptions: {
      connectTimeout: 10000,
      // Fuerza IPv4
      useIPv6: false
    }
  }
  ,
  test: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_DATABASE || "database_test",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_DATABASE || "database_production",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql"
  }
};
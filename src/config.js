import url from 'url';

export default {
  env: {
    environment: process.env.NODE_ENV || 'development',
    virtualHost: process.env.VIRTUAL_HOST,
    http: {
      host: process.env.HTTP_HOST || '0.0.0.0',
      port: process.env.HTTP_PORT || '3000',
    },
    db: {
      host: url.parse(process.env.DB_PORT || process.env.MYSQL_PORT).hostname,
      port: parseInt(url.parse(process.env.DB_PORT || process.env.MYSQL_PORT).port, 10),
      user: process.env.DB_USER ||
            process.env.DB_ENV_MYSQL_USER ||
            process.env.MYSQL_ENV_MYSQL_USER,
      password: process.env.DB_PASSWORD ||
                process.env.DB_ENV_MYSQL_PASSWORD ||
                process.env.MYSQL_ENV_MYSQL_PASSWORD,
      database: process.env.DB_DATABASE ||
                process.env.DB_ENV_MYSQL_DATABASE ||
                process.env.MYSQL_ENV_MYSQL_DATABASE,
    },
  },
};

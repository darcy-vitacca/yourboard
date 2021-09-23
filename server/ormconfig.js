const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'build';

module.exports = {
  type: process.env.PG_TYPE,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities: [rootDir + '/entities/**/*{.ts,.js}'],
  migrations: [rootDir + '/migrations/**/*{.ts,.js}'],
  subscribers: [rootDir + '/subscribers/**/*{.ts,.js}'],
  cli: {
    entitiesDir: rootDir + '/entities',
    migrationsDir: rootDir + '/migrations',
    subscribersDir: rootDir + '/subscribers',
  },
};

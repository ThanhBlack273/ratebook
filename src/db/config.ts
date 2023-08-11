require("dotenv").config();
import diff from "microdiff";
import { Dialect, Model, Sequelize } from "sequelize";
import { SequelizeHooks } from "sequelize/types/lib/hooks";

import localCache from "../lib/local-cache";

const isTest = process.env.NODE_ENV === "test";

const dbName = "Cook"; //process.env.DB_NAME;
const dbUser = "postgres"; //process.env.DB_USER;
const dbHost = "localhost"; //process.env.DB_HOST;
const dbDriver = "postgres"; //process.env.DB_DRIVER;
const dbPassword = "Thanh!@2703201"; //process.env.DB_PASSWORD;

const hooks: Partial<SequelizeHooks<Model<any, any>, any, any>> = {
  afterUpdate: (instance: Model<any, any>) => {
    const cacheKey = `${instance.constructor.name.toLowerCase()}s`;

    const currentData = instance.get({ plain: true });

    if (!localCache.hasKey(cacheKey)) {
      return;
    }

    const listingData = localCache.get<any>(cacheKey) as any[];
    const itemIndex = listingData.findIndex(
      (it) => it.id === instance.getDataValue("id"),
    );
    const oldItemData = ~itemIndex ? listingData[itemIndex] : {};

    const instanceDiff = diff(oldItemData, currentData);

    if (instanceDiff.length > 0) {
      listingData[itemIndex] = currentData;
      localCache.set(cacheKey, listingData);
    }
  },
  afterCreate: (instance: Model<any, any>) => {
    const cacheKey = `${instance.constructor.name.toLowerCase()}s`;
    const currentData = instance.get({ plain: true });

    if (!localCache.hasKey(cacheKey)) {
      return;
    }

    const listingData = localCache.get<any>(cacheKey) as any[];
    listingData.push(currentData);

    localCache.set(cacheKey, listingData);
  },
};

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
  logging: false,
  port: 5432,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: { hooks },
});

export default sequelizeConnection;

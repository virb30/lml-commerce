import { Connection } from "backend/src/modules/database/connection/connection.interface";

export async function createOrderSchema(connection: Connection) {
  await connection.query(`
    CREATE TABLE app.order (
      id CHAR(36) PRIMARY KEY NOT NULL,
      email VARCHAR(255) NOT NULL,
      code VARCHAR(16) NOT NULL,
      sequency BIGINT NOT NULL,
      issue_date DATETIME NOT NULL,
      total DECIMAL(10, 2) NOT NULL,
      currency VARCHAR(3) NOT NULL DEFAULT 'brl',
      freight DECIMAL(10,2) NULL DEFAULT NULL,
      coupon_code VARCHAR(100) NULL DEFAULT NULL,
      coupon_percentage DECIMAL(3, 1) NULL DEFAULT NULL,
      coupon_discount_limit DECIMAL(10, 2) NULL DEFAULT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      deleted_at DATETIME DEFAULT NULL
    );
  `);
}

export async function createProductSchema(connection: Connection) {
  await connection.query(`
    CREATE TABLE app.product (
      id CHAR(36) PRIMARY KEY NOT NULL,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      currency VARCHAR(3) NOT NULL DEFAULT 'brl',
      height INT DEFAULT NULL,
      width INT DEFAULT NULL,
      length INT DEFAULT NULL,
      weight INT DEFAULT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      deleted_at DATETIME DEFAULT NULL
    )
  `);
}

export async function createOrderItemSchema(connection: Connection) {
  await connection.query(`
   CREATE TABLE app.order_item (
      id_order CHAR(36) NOT NULL,
      id_product CHAR(36) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      currency VARCHAR(3) NOT NULL DEFAULT 'brl',
      amount INT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id_order,id_product)
    );
  `);
}

export async function createCouponSchema(connection: Connection) {
  await connection.query(`
   CREATE TABLE app.coupon (
      id CHAR(36) PRIMARY KEY NOT NULL,
      code VARCHAR(100) NOT NULL,
      percentage DECIMAL(3, 1) NOT NULL,
      discount_limit DECIMAL(10, 2) DEFAULT 0,
      expiration_date DATETIME NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      deleted_at DATETIME DEFAULT NULL
    );
  `);
}

export async function createStockEntrySchema(connection: Connection) {
  await connection.query(`
   CREATE TABLE app.stock_entry (
      id BIGINT(20) PRIMARY KEY NOT NULL AUTO_INCREMENT,
      id_product CHAR(36) NOT NULL,
      operation ENUM('in', 'out') NOT NULL,
      quantity INT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export const migrate = async (connection: Connection) => {
  await connection.query("DROP TABLE IF EXISTS app.order_item;");
  await connection.query("DROP TABLE IF EXISTS app.order;");
  await connection.query("DROP TABLE IF EXISTS app.product;");
  await connection.query("DROP TABLE IF EXISTS app.coupon;");
  await connection.query("DROP TABLE IF EXISTS app.stock_entry;");
  await createOrderSchema(connection);
  await createProductSchema(connection);
  await createOrderItemSchema(connection);
  await createCouponSchema(connection);
  await createStockEntrySchema(connection);
};

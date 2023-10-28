DROP TABLE IF EXISTS app.order_item;
DROP TABLE IF EXISTS app.order;
DROP TABLE IF EXISTS app.product;
DROP TABLE IF EXISTS app.coupon;

CREATE TABLE app.order (
    id CHAR(32) PRIMARY KEY NOT NULL,
    email VARCHAR(255) NOT NULL,
    code VARCHAR(16) NOT NULL,
    sequency BIGINT NOT NULL,
    issue_date DATETIME NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    freight DECIMAL(10,2) NULL DEFAULT NULL,
    coupon_code VARCHAR(100) NULL DEFAULT NULL,
    coupon_percentage DECIMAL(3, 1) NULL DEFAULT NULL,
    coupon_discount_limit DECIMAL(10, 2) NULL DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME DEFAULT NULL
);

CREATE TABLE app.product (
    id CHAR(32) PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    height INT DEFAULT NULL, 
    width INT DEFAULT NULL, 
    length INT DEFAULT NULL, 
    weight INT DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME DEFAULT NULL
);

CREATE TABLE app.order_item (
    id_order CHAR(32) NOT NULL,
    id_product CHAR(32) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    amount INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_order,id_product)
);

CREATE TABLE app.coupon (
    id CHAR(32) PRIMARY KEY NOT NULL,
    code VARCHAR(100) NOT NULL,
    percentage DECIMAL(3, 1) NOT NULL,
    discount_limit DECIMAL(10, 2) DEFAULT 0,
    expiration_date DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME DEFAULT NULL
);
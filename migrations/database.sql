DROP TABLE IF EXISTS app.order_item;
DROP TABLE IF EXISTS app.order;
DROP TABLE IF EXISTS app.product;

CREATE TABLE app.order (
    id CHAR(32) PRIMARY KEY NOT NULL,
    email VARCHAR(255) NOT NULL,
    code VARCHAR(16) NOT NULL,
    sequency BIGINT NOT NULL,
    issue_date DATETIME NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
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
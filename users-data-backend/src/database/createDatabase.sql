CREATE SCHEMA IF NOT EXISTS users_data_db;

CREATE TABLE
    IF NOT EXISTS users_data_db.users (
        id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
        razao_social TEXT,
        nome_fantasia TEXT,
        address_id INTEGER,
        bairro TEXT,
        fone TEXT,
        cnpj TEXT,
        email TEXT,
        contato TEXT
        -- FOREIGN KEY (address_id) REFERENCES users_data_db.addresses(id)
    );

CREATE TABLE
    IF NOT EXISTS users_data_db.addresses (
        id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
        street TEXT NOT NULL,
        number TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        country TEXT NOT NULL,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users_data_db.users(id)
    );

alter table users_data_db.users add foreign key (address_id) references users_data_db.addresses(id);
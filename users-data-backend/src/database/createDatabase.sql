CREATE SCHEMA IF NOT EXISTS users_data_db;

CREATE TABLE
  IF NOT EXISTS users_data_db.users (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    role TEXT,
    razao_social TEXT,
    nome_fantasia TEXT,
    contato TEXT,
    telefone TEXT,
    cnpj TEXT,
    email TEXT,
    password TEXT,
    seller_id INTEGER
  );


CREATE TABLE
  IF NOT EXISTS users_data_db.addresses (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    rua TEXT,
    nro TEXT,
    bairro TEXT,
    cidade TEXT,
    uf TEXT,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users_data_db.users(id)
  );

-- -- db populate:
-- -- 1st - insert user: password '123456'
INSERT INTO users_data_db.users (razao_social, nome_fantasia, contato, telefone, cnpj, email, role, password, seller_id )
  VALUES 
('DevTests LTDA', 'Devs', 'Paulão', '34 9966 7 3334', '64546087', 'teste@teste', 'admin', '$2a$12$OdCzmttx2xIPgMEKkP6mRe6eq.G4wQrxocV/Ubtgzf9ozbkJs4bNy',  null);

INSERT INTO users_data_db.users (razao_social, nome_fantasia, contato, telefone, cnpj, email, role, password, seller_id )
  VALUES 
('Lorem Ipsum LTDA', 'Lor', 'John Doe', '34 9966 7 3334', '64546087', 'johndoe@teste', 'custommer', '', 1);

INSERT INTO users_data_db.users (razao_social, nome_fantasia, contato, telefone, cnpj, email, role, password, seller_id )
  VALUES 
('Natureza LTDA', 'Eletrônicos Inova', 'Rogério', '34 9866 7 3624', '11255087', 'rogerio@teste', 'seller', '$2a$12$OdCzmttx2xIPgMEKkP6mRe6eq.G4wQrxocV/Ubtgzf9ozbkJs4bNy', 1);

INSERT INTO users_data_db.users (razao_social, nome_fantasia, contato, telefone, cnpj, email, role, password, seller_id )
  VALUES 
('FullStack SA', 'BackEnd', 'Programmer Sr', '34 9966 7 0004', '64546087', 'custommer1@gmail.com', 'custommer','', 3);

INSERT INTO users_data_db.users (razao_social, nome_fantasia, contato, telefone, cnpj, email, role, password, seller_id )
  VALUES 
('FullStack SA', 'BackEnd', 'Programmer Sr', '34 9966 7 0004', '64546087', 'custommer10@gmail.com', 'custommer','', 1);

INSERT INTO users_data_db.users (razao_social, nome_fantasia, contato, telefone, cnpj, email, role, password, seller_id )
  VALUES 
('FullStack SA', 'BackEnd', 'Programmer Sr', '34 9966 7 0004', '64546087', 'custommer12@gmail.com', 'custommer','', 1);

INSERT INTO users_data_db.users (razao_social, nome_fantasia, contato, telefone, cnpj, email, role, password, seller_id )
  VALUES 
('FullStack SA', 'BackEnd', 'Programmer Sr', '34 9966 7 0004', '64546087', 'custommer11@gmail.com', 'custommer','', 1);
-- -- 2nd - insert addresses
INSERT INTO users_data_db.addresses (rua, nro, bairro, user_id, cidade, uf )
  VALUES 
('Rua das Couves', '400', 'Pres. Roosevelt', 1, 'Uberlândia', 'MG');

INSERT INTO users_data_db.addresses (rua, nro, bairro, user_id, cidade, uf )
  VALUES 
('Rua Lorem Ipsum', '123', 'Residencial John Doe III', 2, 'Catalao', 'GO');

INSERT INTO users_data_db.addresses (rua, nro, bairro, user_id, cidade, uf )
  VALUES 
('Rua das Couves', '400', 'Pres. Natureza', 3, 'Uberlândia', 'MG');

INSERT INTO users_data_db.addresses (rua, nro, bairro, user_id, cidade, uf )
  VALUES 
('Rua Lorem Ipsum', '123', 'Residencial Sênior VI', 4, 'Catalao', 'GO');

INSERT INTO users_data_db.addresses (rua, nro, bairro, user_id, cidade, uf )
  VALUES 
('Rua Lorem Ipsum', '123', 'Residencial Sênior VI', 5, 'Araguari', 'MG');

INSERT INTO users_data_db.addresses (rua, nro, bairro, user_id, cidade, uf )
  VALUES 
('Rua Lorem Ipsum', '123', 'Residencial Sênior VI', 6, 'São Paulo', 'SP');

INSERT INTO users_data_db.addresses (rua, nro, bairro, user_id, cidade, uf )
  VALUES 
('Rua Lorem Ipsum', '123', 'Residencial Sênior VI', 7, 'Campinas', 'SP');

-- 3rd - UPDATE no novo Id do backend

-- alter table users_data_db.users add foreign key (address_id) references users_data_db.addresses(id);

-- INSERT INTO users_data_db.states (id, state_name, uf) 
-- VALUES
-- (1, 'Acre', 'AC'),
-- (2, 'Alagoas', 'AL'),
-- (3, 'Amazonas', 'AM'),
-- (4, 'Amapá', 'AP'),
-- (5, 'Bahia', 'BA'),
-- (6, 'Ceará', 'CE'),
-- (7, 'Distrito Federal', 'DF'),
-- (8, 'Espírito Santo', 'ES'),
-- (9, 'Goiás', 'GO'),
-- (10, 'Maranhão', 'MA'),
-- (11, 'Minas Gerais', 'MG'),
-- (12, 'Mato Grosso do Sul', 'MS'),
-- (13, 'Mato Grosso', 'MT'),
-- (14, 'Pará', 'PA'),
-- (15, 'Paraíba', 'PB'),
-- (16, 'Pernambuco', 'PE'),
-- (17, 'Piauí', 'PI'),
-- (18, 'Paraná', 'PR'),
-- (19, 'Rio de Janeiro', 'RJ'),
-- (20, 'Rio Grande do Norte', 'RN'),
-- (21, 'Rondônia', 'RO'),
-- (22, 'Roraima', 'RR'),
-- (23, 'Rio Grande do Sul', 'RS'),
-- (24, 'Santa Catarina', 'SC'),
-- (25, 'Sergipe', 'SE'),
-- (26, 'São Paulo', 'SP'),
-- (27, 'Tocantins', 'TO'),
-- (99, 'Exterior', 'EX');


-- INSERT INTO users_data_db.cities (id, city_name, state_id) 
-- VALUES (1, 'Uberlândia', 11),
-- (2, 'Uberaba', 11),
-- (3, 'Araguari', 11);

-- CREATE TABLE
--   IF NOT EXISTS users_data_db.states (
--     id INTEGER PRIMARY KEY NOT NULL,
--     state_name TEXT,
--     uf TEXT
--   );

-- CREATE TABLE
--   IF NOT EXISTS users_data_db.cities (
--     id INTEGER PRIMARY KEY NOT NULL,
--     city_name TEXT NOT NULL,
--     state_id INTEGER NOT NULL,
--     FOREIGN KEY (state_id) REFERENCES users_data_db.states(id)
--   );
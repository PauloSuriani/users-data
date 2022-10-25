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
    email TEXT
  );


CREATE TABLE
  IF NOT EXISTS users_data_db.addresses (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    rua TEXT,
    nro TEXT,
    bairro TEXT,
    cidade TEXT,
    uf TEXt,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users_data_db.users(id)
  );

-- db populate:
-- 1st - insert user
INSERT INTO users_data_db.users (razao_social, nome_fantasia, contato, telefone, cnpj, email, role )
  VALUES 
('DevTests LTDA', 'Devs', 'Paulão', '34 9966 7 3334', '64546087', 'paulosuriani@gmail.com', 'admin');

INSERT INTO users_data_db.users (razao_social, nome_fantasia, contato, telefone, cnpj, email, role )
  VALUES 
('Lorem Ipsum LTDA', 'Lor', 'John Doe', '34 9966 7 3334', '64546087', 'johndoe@gmail.com', 'custommer');

-- 2nd - insert addresses
INSERT INTO users_data_db.addresses (rua, nro, bairro, user_id, cidade, uf )
  VALUES 
('Rua das Couves', '400', 'Pres. Roosevelt', 1, 'Uberlândia', 'MG');

INSERT INTO users_data_db.addresses (rua, nro, bairro, user_id, cidade, uf )
  VALUES 
('Rua Lorem Ipsum', '123', 'Residencial John Doe III', 2, 'Catalao', 'GO');

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
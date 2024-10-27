CREATE TABLE IF NOT EXISTS logins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS enderecos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cep VARCHAR(9) NOT NULL,
    logradouro VARCHAR(255) NOT NULL,
    complemento VARCHAR(255),
    numero INT NOT NULL,
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(2) NOT NULL
);

CREATE TABLE IF NOT EXISTS arquitetos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    uf_documento VARCHAR(2) NOT NULL,
    matricula VARCHAR(50) NOT NULL,
    celular VARCHAR(15),
    fixo VARCHAR(15),
    data_filiacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_fim_filiacao DATETIME,
    endereco_id INT,
    email VARCHAR(255) NOT NULL,
    hash VARCHAR(255),
    foto VARCHAR(255),
    FOREIGN KEY (endereco_id) REFERENCES enderecos(id)
);

CREATE TABLE IF NOT EXISTS administradores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    uf_documento VARCHAR(2) NOT NULL,
    cargo VARCHAR(100) NOT NULL,
    endereco_id INT,
    email VARCHAR(255) UNIQUE NOT NULL,
    FOREIGN KEY (endereco_id) REFERENCES enderecos(id)
);
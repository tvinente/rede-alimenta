-- Retira a tabela padrão do SQLiteOnline
DROP TABLE IF EXISTS demo;

-- Cria a tabela de pessoa jurídica
CREATE TABLE Pessoa_juridica 
( 
 cnpj VARCHAR(18) NOT NULL,  
 nome_pj VARCHAR(255) NOT NULL,  
 telefone_pj VARCHAR(14) NOT NULL,  
 email_pj VARCHAR(100) NOT NULL,  
 area_atuação_pj TEXT,  
 id SERIAL PRIMARY KEY,  
 UNIQUE (cnpj,email_pj)
); 

-- Cria a tabela de ONG
CREATE TABLE ONG 
( 
 melhor_data_coleta TIMESTAMP WITH TIME ZONE,  
 data_fundacao DATE CHECK (data_fundacao <= CURRENT_DATE),  
 numero_assistidos INT CHECK (numero_assistidos > 0),  
 historia_ong TEXT,  
 id_ong INT,
 -- Definição chave estrangeira
 FOREIGN KEY (id_ong) REFERENCES Pessoa_juridica(id),
 -- Limitação da chave estrangeira
 UNIQUE (id_ong)
); 

-- Cria tabela de empresa
CREATE TABLE Empresa 
( 
 melhor_dia_entrega TIMESTAMP WITH TIME ZONE,  
 id_empresa INT,  
 -- Definição chave estrangeira
 FOREIGN KEY (id_empresa) REFERENCES Pessoa_juridica(id),
 -- Limitação da chave estrangeira
 UNIQUE (id_empresa)
); 

-- Cria tabela de ação social
CREATE TABLE Acao_social 
( 
 cpf_resp VARCHAR(14) NOT NULL,  
 telefone_resp VARCHAR(14) NOT NULL,  
 nome_resp VARCHAR(100) NOT NULL,  
 email_resp VARCHAR(100) NOT NULL,  
 id_pessoa_juridica INT,  
 -- Definição chave estrangeira
 FOREIGN KEY (id_pessoa_juridica) REFERENCES Pessoa_juridica(id)
); 

-- Cria tabela de postagem
CREATE TABLE Postagens 
( 
 id_postagem SERIAL PRIMARY KEY,  
 id_ong INT,  
 id_empresa INT,  
 itens TEXT[] NOT NULL,
 data_postagem TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
 data_coleta TIMESTAMP NOT NULL,
 coletado BOOLEAN DEFAULT NULL CHECK (coletado IN ('yes', 'no', NULL)),
 -- Definição chave estrangeira
 FOREIGN KEY (id_ong) REFERENCES ong(id_ong),
 FOREIGN KEY (id_empresa) REFERENCES empresa(id_empresa)
); 

-- Cria tabela de endereço
CREATE TABLE Enderecos 
( 
 UF CHAR(2) NOT NULL,  
 CEP VARCHAR(10) NOT NULL,  
 numero VARCHAR(20),  
 complemento TEXT,  
 bairro VARCHAR(50) NOT NULL,  
 cidade VARCHAR(50) NOT NULL,  
 rua VARCHAR(50),  
 id_acao_social INT UNIQUE,
 FOREIGN KEY (id_acao_social) REFERENCES Pessoa_juridica(id)
); 

-- Função para previnir empresa e ong com mesmo pj
CREATE OR REPLACE FUNCTION verificar_pj_duplicado_empresa()
RETURNS TRIGGER AS $$
BEGIN

    -- Verifica se o id_ong já existe na tabela Empresa
    IF EXISTS (SELECT 1 FROM ong WHERE id_ong = NEW.id_empresa) THEN
        RAISE EXCEPTION 'PJ já cadastrado em ONG.';
    END IF;
  
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION verificar_pj_duplicado_ong()
RETURNS TRIGGER AS $$
BEGIN
    
    -- Verifica se o id_empresa já existe na tabela ONG
    IF EXISTS (SELECT 1 FROM empresa WHERE id_empresa = NEW.id_ong) THEN
        RAISE EXCEPTION 'PJ já cadastrado em Empresa.';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger on table1 to check for duplicates
CREATE TRIGGER verificar_pj_ONG_duplicado
BEFORE INSERT OR UPDATE ON ong
FOR EACH ROW
EXECUTE FUNCTION verificar_pj_duplicado_ong();

-- Create trigger on table2 to check for duplicates
CREATE TRIGGER verificar_pj_Empresa_duplicado
BEFORE INSERT OR UPDATE ON empresa
FOR EACH ROW
EXECUTE FUNCTION verificar_pj_duplicado_empresa();
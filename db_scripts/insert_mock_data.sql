-- Inserindo dados de ONG
BEGIN;
-- Inserção de dados na tabela pessoa juridica
INSERT INTO Pessoa_juridica (cnpj, nome_pj, telefone_pj, email_pj, area_atuação_pj)
VALUES ('98765432109876', 'ONG ABC', '888888888', 'ong@example.com', 'Assistência Social'),
       ('33333333333333', 'ONG DEF', '333333333', 'ong_def@example.com', 'Educação');

-- Inserção de dados das ONG ligadas a pessoa juridica
INSERT INTO ONG (melhor_data_coleta, data_fundacao, numero_assistidos, historia_ong, id_ong)
VALUES ('2023-01-01', '2020-01-01', 100, 'História da ONG ABC', (SELECT id FROM Pessoa_juridica WHERE cnpj = '98765432109876')),
	   ('2023-03-01', '2018-01-01', 200, 'História da ONG DEF', (SELECT id FROM Pessoa_juridica WHERE cnpj = '33333333333333'));
       
COMMIT;
-- Fim

-- Inserindo dados de Empresa
BEGIN;
-- Inserção de dados na tabela pessoa juridica
INSERT INTO Pessoa_juridica (cnpj, nome_pj, telefone_pj, email_pj, area_atuação_pj)
VALUES ('12345678901234', 'Empresa XYZ', '999999999', 'empresa@example.com', 'Tecnologia'),
       ('11111111111111', 'Empresa ABC', '111111111', 'empresa_abc@example.com', 'Construção Civil'),
       ('22222222222222', 'Empresa XYZ', '222222222', 'empresa_xyz@example.com', 'Saúde');

-- Inserção de dados das Empresas ligadas a pessoa juridica
INSERT INTO Empresa (melhor_dia_entrega, id_empresa)
VALUES ('2023-01-15', (SELECT id FROM Pessoa_juridica WHERE cnpj = '12345678901234')),
       ('2023-03-15', (SELECT id FROM Pessoa_juridica WHERE cnpj = '11111111111111')),
       ('2023-04-15', (SELECT id FROM Pessoa_juridica WHERE cnpj = '22222222222222'));
COMMIT;
-- Fim

-- Inserir dados na tabela Acao_social
BEGIN;
INSERT INTO Acao_social (cpf_resp, telefone_resp, nome_resp, email_resp, id_pessoa_juridica)
VALUES ('12345678901', '777777777', 'João', 'joao@example.com', (SELECT id FROM Pessoa_juridica WHERE cnpj = '98765432109876')),
       ('98765432109', '666666666', 'Maria', 'maria@example.com', (SELECT id FROM Pessoa_juridica WHERE cnpj = '33333333333333')),
       ('11111111111', '555555555', 'Carlos', 'carlos@example.com', (SELECT id FROM Pessoa_juridica WHERE cnpj = '12345678901234')),
       ('22222222222', '444444444', 'Ana', 'ana@example.com', (SELECT id FROM Pessoa_juridica WHERE cnpj = '11111111111111')),
       ('33333333333', '333333333', 'Paula', 'paula@example.com', (SELECT id FROM Pessoa_juridica WHERE cnpj = '22222222222222'));
COMMIT;
-- Fim

-- Inserir dados na tabela Postagens
BEGIN;
INSERT INTO Postagens (id_ong, id_empresa, itens)
VALUES (2, 5, ARRAY['Banana (1 kg)', 'Leita (2 L)']),
	   (1, 3, ARRAY['Cenoura (1,5 Kg)', 'Feijão (2 sacos)', 'Suco uva (3 L)']),
       (1, 3, ARRAY['Batata (2 Kg)']),
       (2, 4, ARRAY['Carne (2 Kg)']);
COMMIT;
-- Fim

-- Inserir dados na tabela Enderecos
BEGIN;
INSERT INTO Enderecos (UF, CEP, numero, complemento, bairro, cidade, rua, id_acao_social)
VALUES ('SP', '01234-567', '123', 'Apto 101', 'Centro', 'São Paulo', 'Av. Paulista', (SELECT id FROM Pessoa_juridica WHERE cnpj = '98765432109876')),
       ('RJ', '98765-432', '456', NULL, 'Copacabana', 'Rio de Janeiro', 'Rua Barata Ribeiro', (SELECT id FROM Pessoa_juridica WHERE cnpj = '33333333333333')),
       ('RS', '12345-678', '789', NULL, 'Centro', 'Porto Alegre', 'Rua Uruguai', (SELECT id FROM Pessoa_juridica WHERE cnpj = '12345678901234')),
       ('MG', '98765-432', '101', NULL, 'Savassi', 'Belo Horizonte', 'Av. Getúlio Vargas', (SELECT id FROM Pessoa_juridica WHERE cnpj = '11111111111111')),
       ('BA', '54321-098', '202', NULL, 'Barra', 'Salvador', 'Av. Oceânica', (SELECT id FROM Pessoa_juridica WHERE cnpj = '22222222222222'));
COMMIT;
-- Fim
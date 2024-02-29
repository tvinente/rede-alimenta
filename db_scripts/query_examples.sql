-- Todos os responsáveis
SELECT
	acao_social.nome_resp as Nome_Responsável,
    acao_social.telefone_resp as Telefone_Responsável,
    pessoa_juridica.nome_pj as Nome_ONG,
    pessoa_juridica.cnpj AS CNPJ_ONG
FROM pessoa_juridica
JOIN acao_social
ON acao_social.id_pessoa_juridica = pessoa_juridica.id;

-- Responsáveis pela ONG
SELECT
	acao_social.nome_resp as Nome_Responsável,
    acao_social.telefone_resp as Telefone_Responsável,
    pessoa_juridica.nome_pj as Nome_ONG,
    pessoa_juridica.cnpj AS CNPJ_ONG
FROM pessoa_juridica
JOIN acao_social
ON acao_social.id_pessoa_juridica = pessoa_juridica.id
WHERE id in (SELECT id_ong from ong);

-- Responsáveis pela Empresa
SELECT
	acao_social.nome_resp as Nome_Responsável,
    acao_social.telefone_resp as Telefone_Responsável,
    pessoa_juridica.nome_pj as Nome_ONG,
    pessoa_juridica.cnpj AS CNPJ_ONG
FROM pessoa_juridica
JOIN acao_social
ON acao_social.id_pessoa_juridica = pessoa_juridica.id
WHERE id in (SELECT id_empresa from empresa);

-- Informações do responsável pela Empresa XYZ
SELECT
	*
FROM enderecos
JOIN pessoa_juridica
on enderecos.id_acao_social = pessoa_juridica.id
WHERE enderecos.id_acao_social in (SELECT id from pessoa_juridica WHERE nome_pj = 'Empresa ABC');

SELECT * from pessoa_juridica;

-- Relação de postagens com nome de empresa e ong
SELECT
	itens,
    pj1.nome_pj As nome_empresa,
    pj2.nome_pj as nome_ong
FROM postagens
join pessoa_juridica as pj1
on pj1.id = postagens.id_empresa
JOIN pessoa_juridica as pj2
on pj2.id = postagens.id_ong;


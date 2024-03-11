-- Todos os responsáveis ONG e Empresa
SELECT
	acao_social.nome_resp as Nome_Responsável,
    acao_social.telefone_resp as Telefone_Responsável,
    pessoa_juridica.nome_pj as Nome_ONG,
    pessoa_juridica.cnpj AS CNPJ_ONG
FROM pessoa_juridica
JOIN acao_social
ON acao_social.id_pessoa_juridica = pessoa_juridica.id;

-- Todos os responsáveis por ONGs
SELECT
	acao_social.nome_resp as Nome_Responsável,
    acao_social.telefone_resp as Telefone_Responsável,
    pessoa_juridica.nome_pj as Nome_ONG,
    pessoa_juridica.cnpj AS CNPJ_ONG
FROM pessoa_juridica
JOIN acao_social
ON acao_social.id_pessoa_juridica = pessoa_juridica.id
WHERE id in (SELECT id_ong from ong);

-- Todos os responsáveis por Empresas
SELECT
	acao_social.nome_resp as Nome_Responsável,
    acao_social.telefone_resp as Telefone_Responsável,
    pessoa_juridica.nome_pj as Nome_ONG,
    pessoa_juridica.cnpj AS CNPJ_ONG
FROM pessoa_juridica
JOIN acao_social
ON acao_social.id_pessoa_juridica = pessoa_juridica.id
WHERE id in (SELECT id_empresa from empresa);

-- Informações do responsável pela Empresa XYZ usando o nome da empresa
SELECT
	*
FROM enderecos
JOIN pessoa_juridica
on enderecos.id_acao_social = pessoa_juridica.id
WHERE enderecos.id_acao_social in (SELECT id from pessoa_juridica WHERE nome_pj = 'Empresa ABC');

-- Todas as postagens incluindo os nome de empresa e ong (quando houver)
SELECT
	id_postagem,
	itens,
    pj1.nome_pj As nome_empresa,
    pj2.nome_pj as nome_ong
FROM postagens
join pessoa_juridica as pj1
on pj1.id = postagens.id_empresa
LEFT JOIN pessoa_juridica as pj2
on pj2.id = postagens.id_ong;

-- Relação de postagens em aberto
SELECT
	post.id_postagem,
	post.itens,
    post.coletado,
    post.data_coleta,
    pj.nome_pj As nome_empresa,
    ac.nome_resp AS nome_responsavel,
    ac.telefone_resp As telefone_do_responsavel
FROM postagens AS post
join pessoa_juridica as pj
on pj.id = post.id_empresa
JOIN acao_social as ac
on ac.id_pessoa_juridica = pj.id
where id_ong is NULL and post.coletado is NULL;

-- Relação de postagens em aberto e que o cep começa com 54
SELECT
	post.id_postagem,
	post.itens,
    post.coletado,
    post.data_coleta,
    pj.nome_pj,
    ac.nome_resp,
    ac.telefone_resp,
    en.cep
FROM postagens AS post
join pessoa_juridica as pj
on pj.id = post.id_empresa
JOIN acao_social as ac
on ac.id_pessoa_juridica = pj.id
JOIN enderecos as en
on pj.id = en.id_acao_social
where id_ong is NULL and en.cep LIKE '54%' and post.coletado is NULL;

-- Relação de postagens em aberto e aceita por uma ONG
SELECT
	post.id_postagem,
    post.coletado,
	post.itens,
    post.data_coleta,
    pj1.nome_pj As nome_empresa,
    pj2.nome_pj As nome_ong,
    ac.nome_resp AS nome_responsavel_empresa,
    ac.telefone_resp As telefone_do_responsavel_empresa
FROM postagens AS post
join pessoa_juridica as pj1
on pj1.id = post.id_empresa
join pessoa_juridica as pj2
on pj2.id = post.id_ong
JOIN acao_social as ac
on ac.id_pessoa_juridica = pj1.id
where id_ong is NOT NULL and post.coletado is NULL;

-- Relação de postagens fechadas sem marcação por uma ONG
SELECT
	post.id_postagem,
	post.itens,
    post.data_coleta,
    post.coletado,
    pj.nome_pj As nome_empresa,
    ac.nome_resp AS nome_responsavel_empresa,
    ac.telefone_resp As telefone_do_responsavel_empresa
FROM postagens AS post
join pessoa_juridica as pj
on pj.id = post.id_empresa
JOIN acao_social as ac
on ac.id_pessoa_juridica = pj.id
where post.id_ong IS NULL and post.coletado is FALSE;

-- Relação de postagens fechadas e coletadas por uma ONG
SELECT
	post.id_postagem,
    post.coletado,
	post.itens,
    post.data_coleta,
    pj1.nome_pj As nome_empresa,
    pj2.nome_pj As nome_ong,
    ac.nome_resp AS nome_responsavel_empresa,
    ac.telefone_resp As telefone_do_responsavel_empresa
FROM postagens AS post
join pessoa_juridica as pj1
on pj1.id = post.id_empresa
join pessoa_juridica as pj2
on pj2.id = post.id_ong
JOIN acao_social as ac
on ac.id_pessoa_juridica = pj1.id
where id_ong is NOT NULL and post.coletado is TRUE;

-- Relação de postagens fechadas, marcadas pela ONG mas não coletadas pela ONG
SELECT
	post.id_postagem,
	post.itens,
    post.data_coleta,
    post.coletado,
    pj.nome_pj As nome_empresa,
    ac.nome_resp AS nome_responsavel_empresa,
    ac.telefone_resp As telefone_do_responsavel_empresa
FROM postagens AS post
join pessoa_juridica as pj
on pj.id = post.id_empresa
JOIN acao_social as ac
on ac.id_pessoa_juridica = pj.id
where post.id_ong IS NOT NULL and post.coletado is FALSE;
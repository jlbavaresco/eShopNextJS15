const { pool } = require('../config');
const Produto = require('../entities/Produto')

const getProdutosDB = async () => {
    try {
        const { rows } = await pool.query(`select p.codigo as codigo, 
            p.nome as nome, p.descricao as descricao, 
            p.quantidade_estoque as quantidade_estoque, 
            p.ativo as ativo, p.valor as valor, 
            to_char(p.data_cadastro,'YYYY-MM-DD') as data_cadastro, 
            p.categoria as categoria, c.nome as categoria_nome
            from produtos p
            join categorias c on p.categoria = c.codigo
            order by p.codigo`);
        return rows.map((produto) =>
            new Produto(produto.codigo, produto.nome, produto.descricao,
                produto.quantidade_estoque, produto.ativo, produto.valor,
                produto.data_cadastro, produto.categoria, produto.categoria_nome));
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addProdutoDB = async (objeto) => {
    try {
        const { nome, descricao, quantidade_estoque, ativo, valor,
            data_cadastro, categoria } = objeto;
        await pool.query(`INSERT INTO produtos (nome, descricao, 
            quantidade_estoque, ativo, valor, 
            data_cadastro, categoria)
        VALUES ($1, $2, $3, $4, $5, $6, $7) `,
            [nome, descricao, quantidade_estoque,
                ativo, valor,
                data_cadastro, categoria]);
    } catch (err) {
        throw "Erro ao inserir o produto: " + err;
    }
}

const updateProdutoDB = async (objeto) => {
    try {
        const { codigo, nome, descricao, quantidade_estoque, ativo, valor,
            data_cadastro, categoria } = objeto;
        const results = await pool.query(`UPDATE produtos SET nome = $2,
                descricao = $3, quantidade_estoque = $4, ativo = $5, valor = $6, 
                data_cadastro = $7, categoria = $8 WHERE codigo = $1 `,
            [codigo, nome, descricao, quantidade_estoque,
                ativo, valor,
                data_cadastro, categoria]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
    } catch (err) {
        throw "Erro ao alterar o produto: " + err;
    }
}

const deleteProdutoDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM produtos where codigo = $1`,
            [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Produto removido com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover o produto: " + err;
    }
}

const getProdutoPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`select p.codigo as codigo, 
            p.nome as nome, p.descricao as descricao, 
            p.quantidade_estoque as quantidade_estoque, 
            p.ativo as ativo, p.valor as valor, 
            to_char(p.data_cadastro,'YYYY-MM-DD') as data_cadastro, 
            p.categoria as categoria, c.nome as categoria_nome
            from produtos p
            join categorias c on p.categoria = c.codigo
            WHERE p.codigo = $1`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo}`;
        } else {
            const produto = results.rows[0];
            return new Produto(produto.codigo, produto.nome, produto.descricao,
                produto.quantidade_estoque, produto.ativo, produto.valor,
                produto.data_cadastro, produto.categoria, produto.categoria_nome);
        }
    } catch (err) {
        throw "Erro ao recuperar o produto: " + err;
    }
}

module.exports = {
    getProdutosDB, addProdutoDB, updateProdutoDB, deleteProdutoDB, getProdutoPorCodigoDB
}
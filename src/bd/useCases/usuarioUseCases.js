const { pool } = require('../config');
const Usuario = require('../entities/Usuario')

const autenticaUsuarioDB = async (objeto) => {
    try {
        const { email, senha } = objeto;
        console.log('Email: ' + email + " Senha: " + senha)
        const results = await pool.query(`SELECT * FROM usuarios 
            WHERE email = $1 AND senha = $2`, [email, senha]);
        if (results.rowCount == 0){
            throw "Usuário ou senha inválidos";
        }
        const usuario = results.rows[0];
        return new Usuario(usuario.email, usuario.tipo,
                            usuario.telefone, usuario.nome);
    } catch(err){
        throw "Erro ao autenticar o usuário: " + err;
    }
}

module.exports = { autenticaUsuarioDB }
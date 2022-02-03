require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('./database/connection');
const app = express();
const port = process.env.PORT_SERVER || 8080;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/users', async (req, res) => {
    const sql = `SELECT * FROM usuarios`;
    await connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
        console.log(result);
    });
})

app.get('/users/:id', async (req, res) => {
    const idusuarios = req.params.id;
    const sql = `SELECT * FROM usuarios WHERE idusuarios = ?`;
    await connection.query(sql, [idusuarios], (err, result) => {
        if (err) throw err;
        res.send(result);
        console.log(result);
    });
})

app.post('/users/new-user', async (req, res) => {
    const nome = req.body.nome;
    const data_de_nascimento = req.body.data_de_nascimento;
    const cpf = req.body.cpf;
    const sexo = req.body.sexo;
    const endereco = req.body.endereco;
    const status = req.body.status;
    const foto_de_perfil = req.body.foto_de_perfil;
    const sql_verificar = `SELECT * FROM usuarios WHERE cpf = ?`;
    await connection.query(sql_verificar, [cpf], (err, result) => {
        if (err) console.log(err);
        if(result.length === 0) {
            const sql_inserir = `INSERT INTO usuarios (nome, data_de_nascimento, cpf, sexo, endereco, status, foto_de_perfil) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            connection.query(sql_inserir, [nome, data_de_nascimento, cpf, sexo, endereco, status, foto_de_perfil], (err, result) => {
                if (err) console.log(err);
                console.log('Usuário cadastrado com sucesso');
                res.send(result)
            });
        } else {
            console.log('Usuário já está cadastrado')
        }
    });
})

app.put('/users/update/:cpf', async (req, res) => {
    const nome = req.body.nome;
    const data_de_nascimento = req.body.data_de_nascimento;
    const cpf = req.params.cpf;
    const sexo = req.body.sexo;
    const endereco = req.body.endereco;
    const status = req.body.status;
    const foto_de_perfil = req.body.foto_de_perfil;
    const sql_verificar = `SELECT * FROM usuarios WHERE cpf = ?`;
    await connection.query(sql_verificar, [cpf], (err, result) => {
        if (err) console.log(err);
        if(result.length === 1) {
            const sql_inserir = `UPDATE usuarios SET nome = ?, data_de_nascimento = ?, sexo = ?, endereco = ?, status = ?, foto_de_perfil = ?`;
            connection.query(sql_inserir, [nome, data_de_nascimento, sexo, endereco, status, foto_de_perfil], (err, result) => {
                if (err) console.log(err);
                console.log('Usuário alterado com sucesso');
                res.send(result)
            });
        } else {
            console.log('Usuário não pode ser alterado')
        }
    });
})

app.delete('/users/delete', async (req, res) => {
    const cpf = req.body.cpf;
    const sql_verificar = `SELECT * FROM usuarios WHERE cpf = ?`;
    await connection.query(sql_verificar, [cpf], (err, result) => {
        if (err) console.log(err);
        if(result.length === 1) {
            const sql = `DELETE FROM usuarios WHERE cpf = ?`;
            connection.query(sql, [cpf], (err, result) => {
                if (err) throw err;
                if (result) {
                    res.send(result);
                    console.log('Usuário deletado com sucesso');
                }
            });
        } else {
            console.log('Usuário não foi deletado')
        }
    })
});

app.get('/create-table', () => {
        console.log('Estamos criando a tabela para você');
        try {
            connection.query('CREATE TABLE IF NOT EXISTS `banco`.`usuarios` (`idusuarios` INT NOT NULL AUTO_INCREMENT, `nome` VARCHAR(45) NOT NULL, `data_de_nascimento` DATE NOT NULL, `cpf` VARCHAR(11) NOT NULL, `sexo` VARCHAR(10) NOT NULL, `endereco` VARCHAR(70) NULL DEFAULT "Sem Endereço", `status` VARCHAR(10) NOT NULL, `foto_de_perfil` VARCHAR(300) NOT NULL, PRIMARY KEY (`idusuarios`));');
        } catch (err) { console.log('Erro: ' + err) }
        console.log('Pronto!');
})

app.listen(port, () => {
    console.log('Servidor rodando na porta ' + port);
    connection.connect((err) => {
        if (err) throw err
        console.log('Banco de dados está conectado');
    })
})
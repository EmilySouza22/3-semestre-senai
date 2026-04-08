import express from 'express';
import { prisma } from './prisma/prisma';
import type { Exame, Usuario } from './prisma/generated/prisma/client';
import { hasheandoSenha } from './utils/createHash';
import cors from "cors";

const app = express();
app.use(express.json())
app.use(cors());
const port = 3000;

//teste
app.get('/', (req, res) => {
    console.log(req)
    res.send("Hello world")
})

// Endpoints usuario
app.get('/usuarios', async (req, res) => {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
})

//pegando usuario por id
app.get('/usuarios/:id', async (req, res) => {
    const idUsuario = Number(req.params.id)
    const usuario = await prisma.usuario.findUnique({
        where: {
            id: idUsuario
        }
    })
    return res.status(200).json(usuario)
})

//criar uma senha e ao inves de salvar a senha no banco, salvar a hash no banco

//criando usuario
// app.post("/usuarios", async (req, res) => {
//     console.log(req.body)
//     const dadosUsuario = req.body as Usuario
//     const usuarioCriado = await prisma.usuario.create({
//         data: {
//             email: dadosUsuario.email,
//             nome: dadosUsuario.nome || null,
//             senha: await hasheandoSenha(dadosUsuario.senha || '')
//         }
//     })
//     return res.status(201).json(usuarioCriado)
// })

//1 - Atualizar rota de criacao do usuario para ser /cadastro
app.post("/register", async (req, res) => {
    const dadosUsuario = req.body as Usuario
    const usuarioCriado = await prisma.usuario.create({
        data: {
            nome: dadosUsuario.nome || null,
            email: dadosUsuario.email,
            senha: await hasheandoSenha(dadosUsuario.senha || '')
        }
    })
    return res.status(201).json(usuarioCriado)
})

/*
2- Criar endpoint post para login, retornando sucesso ou erro 
quando as credenciais forem invalidas
*/

app.post('/login', async (req, res) => {
    const dadosUsuario = req.body as Usuario
    const { email, senha } = req.body;

    try {

        const usuarioLogado = await prisma.usuario.findUnique({
            where: { email }
        })

        return res.status(200).json({
            sucess: true,
            message: 'Login realizado com sucesso',
            data: {
                id: dadosUsuario.id,
                nome: dadosUsuario.nome
            }
        })

    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: "Erro interno do servidor"
        })

    }

})

//atualizando usuario por id
app.put("/usuarios/:id", async (req, res) => {
    const idUsuario = Number(req.params.id)
    const dadosParaAtualizar = req.body as Omit<Usuario, 'id'>

    const usuarioAtualizado = await prisma.usuario.update({
        data: {
            ...dadosParaAtualizar
        },
        where: {
            id: idUsuario
        }
    })

    return res.status(200).json(usuarioAtualizado);
})

//deletando usuario por id
app.delete('/usuarios/:id', async (req, res) => {
    const idUsuario = Number(req.params.id)
    const usuarioDeletado = await prisma.usuario.delete({
        where: {
            id: idUsuario
        }
    })

    return res.status(200).json({
        mensagem: "Usuário deletado com sucesso!",
        data: usuarioDeletado
    });
})

// Endpoints Exames

//   tipo_exame String
//   valor      Decimal
//   descricao  String
//   resultado  String
//   data_exame DateTime

//get exames
app.get('/exames', async (req, res) => {
    const exames = await prisma.exame.findMany();
    res.json(exames);
})

//get exames por id
app.get('/exames/:id', async (req, res) => {
    const idExames = Number(req.params.id)
    const exame = await prisma.exame.findUnique({
        where: {
            id: idExames
        }
    })
    return res.status(200).json(exame)
})

//post exames
app.post('/exames', async (req, res) => {
    const dadosExames = req.body as Exame
    const exameCriado = await prisma.exame.create({
        data: {
            tipo_exame: dadosExames.tipo_exame,
            valor: dadosExames.valor,
            descricao: dadosExames.descricao,
            resultado: dadosExames.resultado,
            data_exame: new Date(dadosExames.data_exame)
        }
    })
    return res.status(201).json(exameCriado)
})


//put exames
app.put('/exames/:id', async (req, res) => {
    const idExame = Number(req.params.id)
    const dadosExamesParaAtualizar = req.body as Omit<Usuario, 'id'>
    const exameAtualizado = await prisma.exame.update({
        data: {
            ...dadosExamesParaAtualizar
        },
        where: {
            id: idExame
        }
    })
    return res.status(200).json(exameAtualizado)
})

//delete exame
app.delete('/exames/:id', async (req, res) => {
    const idExame = Number(req.params.id)
    const dadosExameDeletado = await prisma.exame.delete({
        where: {
            id: idExame
        }
    })
    return res.status(200).json({
        mensagem: "Exame deletado com sucesso!",
        data: dadosExameDeletado
    })
})


app.listen(port, () => {
    console.log("Servidor ta de pé :p")
})

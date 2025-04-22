const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Middleware para processar dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para processar o formulário
app.post('/send-email', (req, res) => {
    const { turno, unidade, tipo_ocorrencia, descricao, data, urgencia } = req.body;

    // Configuração do transporte de e-mail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'seuemail@gmail.com', // Substitua pelo seu e-mail
            pass: 'suasenha'           // Substitua pela sua senha
        }
    });

    // Configuração do e-mail
    const mailOptions = {
        from: 'seuemail@gmail.com', // Substitua pelo seu e-mail
        to: 'ttriadedev@gmail.com',
        subject: 'Nova Ocorrência Registrada',
        text: `
            Turno: ${turno}
            Unidade: ${unidade}
            Tipo de Ocorrência: ${tipo_ocorrencia}
            Descrição: ${descricao}
            Data: ${data}
            Grau de Urgência: ${urgencia}
        `
    };

    // Enviar o e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Erro ao enviar o e-mail.');
        } else {
            console.log('E-mail enviado: ' + info.response);
            res.status(200).send('Ocorrência registrada com sucesso!');
        }
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
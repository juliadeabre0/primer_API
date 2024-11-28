import express from 'express';

import { obterHist, filtrarAno, buscarId, ajustarValor } from "./servicos/servicos.js";

const app = express();

app.get('/hist', (req, res) => {
    const ano = req.query.ano;
    const result = (ano !== undefined) ? filtrarAno(ano) : obterHist();

    if (result.length > 0) {
        res.json(result);
    } else if (isNaN(ano)) {
        res.status(400).json({ "Erro": "Parâmetro 'ano' está ausente ou inválido." });
    } else {
        res.status(404).json({ "Erro": "Nenhum histórico encontrado para o ano especificado." });
    }
});

app.get('/hist/calc', (req, res) => {
    const valor = parseFloat(req.query.valor);
    const mesIni = parseInt(req.query.mesInicial);
    const anoIni = parseInt(req.query.anoInicial);
    const mesFim = parseInt(req.query.mesFinal);
    const anoFim = parseInt(req.query.anoFinal);

    if (isNaN(valor) || isNaN(mesIni) || isNaN(anoIni) || isNaN(mesFim) || isNaN(anoFim)) {
        return res.status(400).json({ "Erro": "Parâmetros inválidos." });
    } else if (anoIni > anoFim || (anoIni === anoFim && mesIni > mesFim)) {
        return res.status(400).json({ "Erro": "Parâmetros inválidos." });
    } else if (anoIni < 2015 || anoFim > 2024 || mesIni < 1 || mesIni > 12 || mesFim > 12 || mesFim < 1) {
        return res.status(400).json({ "Erro": "Parâmetros inválidos." });
    } else {
        const result = ajustarValor(valor, mesIni, anoIni, mesFim, anoFim);
        res.json({ resultado: result });
    }
});

app.get('/hist/:id', (req, res) => {
    const id = buscarId(req.params.id);
    if (id) {
        res.json(id);
    } else if (isNaN(parseInt(req.params.id))) {
        res.status(400).json({ "Erro": "Requisição Inválida" });
    } else {
        res.status(404).json({ "Erro": "Elemento não encontrado!" });
    }
});

app.listen(8080, () => {
   
    console.log('Servidor iniciado na porta 8080');
});

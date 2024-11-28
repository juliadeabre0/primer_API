import historicoInflacao from '../dados/dados.js';

export const obterHist = () => {
    return historicoInflacao;
};

export const filtrarAno = (ano) => {
    const anoNum = Number(ano);
    return historicoInflacao.filter(i => i.ano === anoNum);
};

export const buscarId = (id) => {
    const idNum = Number(id);
    return historicoInflacao.find(i => i.id === idNum);
};

export const ajustarValor = (valor, mesIni, anoIni, mesFim, anoFim) => {
    const dados = historicoInflacao.filter(i => {
        return (
            (i.ano === anoIni && i.mes >= mesIni) ||
            (i.ano > anoIni && i.ano < anoFim) ||
            (i.ano === anoFim && i.mes <= mesFim)
        );
    });

    let valorFinal = valor;

    for (const i of dados) {
        valorFinal *= 1 + (i.ipca / 100);
    }

    return parseFloat(valorFinal.toFixed(2));
};

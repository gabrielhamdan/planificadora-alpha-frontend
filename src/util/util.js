import moment from "moment";

const valorParaMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
        valor
    )
}

const inputParaMoeda = (valor) => {
    if (valor === '') return 'R$ 0,00';

    valor = String(valor);

    let valorLimpo = valor.replace(/\D/g, '');

    let valorNumerico = parseInt(valorLimpo, 10);

    let valorComCentavos = (valorNumerico / 100).toFixed(2);

    const [inteiro, centavos] = valorComCentavos.split('.');

    const inteiroFormatado = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return `R$ ${inteiroFormatado},${centavos}`;
};

const moedaParaReal = (valor) => {
    if (!valor) return 0;

    return parseFloat(valor.replace('R$ ', '').replace('.', '').replace(',', '.'));
};

const localDateToData = data => {
    return moment(data).format('DD/MM/YYYY');
}

export { valorParaMoeda, inputParaMoeda, moedaParaReal, localDateToData }
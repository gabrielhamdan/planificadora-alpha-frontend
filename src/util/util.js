const valorParaMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
        valor
    )
}

const inputParaMoeda = (valor) => {
    if (valor === '') return 'R$ 0,00';

    valor = String(valor);

    // Remove tudo o que não for número
    let valorLimpo = valor.replace(/\D/g, '');

    // Converte para inteiro (evita qualquer casa decimal incorreta)
    let valorNumerico = parseInt(valorLimpo, 10);

    // Formata para ter sempre 2 casas decimais
    let valorComCentavos = (valorNumerico / 100).toFixed(2); // Divide por 100 para simular os centavos

    // Converte novamente para uma string formatada
    const [inteiro, centavos] = valorComCentavos.split('.');

    // Aplica a formatação de milhar (colocando ponto entre os milhares)
    const inteiroFormatado = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Monta o valor final com "R$"
    return `R$ ${inteiroFormatado},${centavos}`;
};

const moedaParaReal = (valor) => {
    console.log(valor)
    return valor.replace('.', '').replace(',', '.').replace('R$', '');
}

export { valorParaMoeda, inputParaMoeda, moedaParaReal }
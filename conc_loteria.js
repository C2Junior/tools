// Função para formatar valores em reais
function formatarValorReais(valor) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor).replace('R$', '').trim();
}

// Função para formatar números inteiros com separador de milhares
function formatarNumero(numero) {
    return numero.toLocaleString('pt-BR');
}

// Dicionário com as loterias e suas respectivas URLs
const loterias = {
    "DiadeSorte": "diadesorte",
    "DuplaSena": "duplasena",
    "Lotofacil": "lotofacil",
    "Lotomania": "lotomania",
    "Maismilionaria": "maismilionaria",
    "MegaSena": "megasena",
    "Quina": "quina",
    "SuperSete": "supersete",
    "TimeMania": "timemania"
};

// Função para fazer a requisição GET para a API e exibir os resultados da loteria selecionada para um determinado concurso
function obterResultados(loteriaSelecionada, numeroConcurso) {
    if (loteriaSelecionada && numeroConcurso) {
        try {
            numeroConcurso = parseInt(numeroConcurso);
            if (numeroConcurso <= 0 || isNaN(numeroConcurso)) {
                alert("Número de Concurso Inválido. O número do concurso deve ser um inteiro e maior que zero.");
                return "";
            }
        } catch (error) {
            alert("Número de Concurso Inválido. O número do concurso deve ser um inteiro e maior que zero.");
            return "";
        }

        // URL da API da Caixa Econômica Federal
        const url = `https://loteriascaixa-api.herokuapp.com/api/${loterias[loteriaSelecionada]}/${numeroConcurso}`;

        // Fazendo uma requisição GET para a URL da API
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao obter os dados da ${loteriaSelecionada}. Código de status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Exibir os resultados da loteria selecionada para o concurso específico
                let resultadoTexto = `Loteria: ${data.loteria}\nConcurso: ${data.concurso}\nData: ${data.data}\nLocal: ${data.local}\n`;

                if (loteriaSelecionada === 'DuplaSena') {
                    // Lista as dezenas do primeiro sorteio
                    resultadoTexto += `Dezenas sorteadas - 1° sorteio: ${data.dezenas.slice(0, 6).join(', ')}\n`;
                    // Lista as dezenas do segundo sorteio
                    resultadoTexto += `Dezenas sorteadas - 2° sorteio: ${data.dezenas.slice(6).join(', ')}\n`;
                } else {
                    // Para outras loterias, lista todas as dezenas sorteadas em um único sorteio
                    resultadoTexto += `Dezenas sorteadas: ${data.dezenas.join(', ')}\n`;
                }

                if (loteriaSelecionada === 'DiadeSorte') {
                    resultadoTexto += `Mês de sorte: ${data.mesSorte ? data.mesSorte : 'N/A'}\n`;
                }

                if (loteriaSelecionada === 'Maismilionaria') {
                    resultadoTexto += `Trevos: ${data.trevos.join(', ')}\n`;
                }

                if (loteriaSelecionada === 'TimeMania') {
                    resultadoTexto += `Time do Coração: ${data.timeCoracao ? data.timeCoracao : 'N/A'}\n`;
                }

                if (loteriaSelecionada === 'DuplaSena') {
                    // Lista os prêmios do primeiro sorteio
                    resultadoTexto += "Prêmios - 1° sorteio:\n";
                    data.premiacoes.slice(0, 4).forEach(premio => {
                        resultadoTexto += `Descrição: ${premio.descricao}, Faixa: ${premio.faixa}, Ganhadores: ${formatarNumero(premio.ganhadores)}, Valor do prêmio: R$ ${formatarValorReais(premio.valorPremio)}\n`;
                    });
                    // Lista os prêmios do segundo sorteio
                    resultadoTexto += "Prêmios - 2° sorteio:\n";
                    data.premiacoes.slice(4).forEach(premio => {
                        resultadoTexto += `Descrição: ${premio.descricao}, Faixa: ${premio.faixa}, Ganhadores: ${formatarNumero(premio.ganhadores)}, Valor do prêmio: R$ ${formatarValorReais(premio.valorPremio)}\n`;
                    });
                } else {
                    // Para outras loterias, lista todos os prêmios em um único sorteio
                    resultadoTexto += "Prêmios:\n";
                    data.premiacoes.forEach(premio => {
                        resultadoTexto += `Descrição: ${premio.descricao}, Faixa: ${premio.faixa}, Ganhadores: ${formatarNumero(premio.ganhadores)}, Valor do prêmio: R$ ${formatarValorReais(premio.valorPremio)}\n`;
                    });
                }

                // Adiciona o restante das informações
                resultadoTexto += `Acumulou: ${data.acumulou ? 'Sim' : 'Não'}\n`;
                resultadoTexto += `Próximo concurso: ${data.proximoConcurso}\n`;
                resultadoTexto += `Data do próximo concurso: ${data.dataProximoConcurso}\n`;
                resultadoTexto += `Valor arrecadado: R$ ${formatarValorReais(data.valorArrecadado)}\n`;
                resultadoTexto += `Valor acumulado do concurso 0-5: R$ ${formatarValorReais(data.valorAcumuladoConcurso_0_5)}\n`;
                resultadoTexto += `Valor acumulado do concurso especial: R$ ${formatarValorReais(data.valorAcumuladoConcursoEspecial)}\n`;
                resultadoTexto += `Valor acumulado do próximo concurso: R$ ${formatarValorReais(data.valorAcumuladoProximoConcurso)}\n`;
                resultadoTexto += `Valor estimado do próximo concurso: R$ ${formatarValorReais(data.valorEstimadoProximoConcurso)}`;

                document.getElementById("resultado").innerText = resultadoTexto;
            })
            .catch(error => {
                alert(error.message);
            });
    } else {
        alert("Dados Incompletos. Por favor, selecione a loteria desejada e digite o número do concurso.");
    }
}

// Função para lidar com o clique no botão "Exibir Resultado"
function exibirResultado() {
    const loteriaSelecionada = document.getElementById("loteria").value;
    const numeroConcurso = document.getElementById("concurso").value;
    obterResultados(loteriaSelecionada, numeroConcurso);
}

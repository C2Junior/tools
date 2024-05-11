// Definindo o objeto loterias com as URLs das loterias
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

// Função para formatar valores em reais
function formatarValorReais(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '').trim();
}

// Função para formatar números inteiros com separador de milhares
function formatarNumero(numero) {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Função para fazer a requisição GET para a API e exibir os resultados da loteria selecionada
async function obterResultados(loteriaSelecionada) {
    if (loteriaSelecionada) {
        // URL da API da Caixa Econômica Federal
        const url = `https://loteriascaixa-api.herokuapp.com/api/${loterias[loteriaSelecionada]}/latest`;

        try {
            // Fazendo uma requisição GET para a URL da API
            const response = await fetch(url);

            // Verificando se a requisição foi bem-sucedida (código de status 200)
            if (response.ok) {
                const data = await response.json();

                let textoResultado = `Loteria: ${data.loteria}\n`;
                textoResultado += `Concurso: ${data.concurso}\n`;
                textoResultado += `Data: ${data.data}\n`;
                textoResultado += `Local: ${data.local}\n`;

                if (loteriaSelecionada === 'DuplaSena') {
                    textoResultado += `Dezenas sorteadas - 1° sorteio: ${data.dezenas.slice(0, 6).join(', ')}\n`;
                    textoResultado += `Dezenas sorteadas - 2° sorteio: ${data.dezenas.slice(6).join(', ')}\n`;
                } else {
                    textoResultado += `Dezenas sorteadas: ${data.dezenas.join(', ')}\n`;
                }

                if (loteriaSelecionada === 'DiadeSorte') {
                    textoResultado += `Mês de sorte: ${data.mesSorte || 'N/A'}\n`;
                }

                if (loteriaSelecionada === 'Maismilionaria') {
                    textoResultado += `Trevos: ${data.trevos.join(', ')}\n`;
                }

                if (loteriaSelecionada === 'TimeMania') {
                    textoResultado += `Time do Coração: ${data.timeCoracao || 'N/A'}\n`;
                }

                if (loteriaSelecionada === 'DuplaSena') {
                    textoResultado += "Prêmios - 1° sorteio:\n";
                    textoResultado += data.premiacoes.slice(0, 4).map(premio => {
                        return `Descrição: ${premio.descricao}, Faixa: ${premio.faixa}, Ganhadores: ${formatarNumero(premio.ganhadores)}, Valor do prêmio: R$ ${formatarValorReais(premio.valorPremio)}`;
                    }).join('\n');
                    textoResultado += "\n";

                    textoResultado += "Prêmios - 2° sorteio:\n";
                    textoResultado += data.premiacoes.slice(4).map(premio => {
                        return `Descrição: ${premio.descricao}, Faixa: ${premio.faixa}, Ganhadores: ${formatarNumero(premio.ganhadores)}, Valor do prêmio: R$ ${formatarValorReais(premio.valorPremio)}`;
                    }).join('\n');
                } else {
                    textoResultado += "Prêmios:\n";
                    textoResultado += data.premiacoes.map(premio => {
                        return `Descrição: ${premio.descricao}, Faixa: ${premio.faixa}, Ganhadores: ${formatarNumero(premio.ganhadores)}, Valor do prêmio: R$ ${formatarValorReais(premio.valorPremio)}`;
                    }).join('\n');
                }

                textoResultado += `\nAcumulou: ${data.acumulou ? 'Sim' : 'Não'}\n`;
                textoResultado += `Próximo concurso: ${data.proximoConcurso}\n`;
                textoResultado += `Data do próximo concurso: ${data.dataProximoConcurso}\n`;
                textoResultado += `Valor arrecadado: R$ ${formatarValorReais(data.valorArrecadado)}\n`;
                textoResultado += `Valor acumulado do concurso 0-5: R$ ${formatarValorReais(data.valorAcumuladoConcurso_0_5)}\n`;
                textoResultado += `Valor acumulado do concurso especial: R$ ${formatarValorReais(data.valorAcumuladoConcursoEspecial)}\n`;
                textoResultado += `Valor acumulado do próximo concurso: R$ ${formatarValorReais(data.valorAcumuladoProximoConcurso)}\n`;
                textoResultado += `Valor estimado do próximo concurso: R$ ${formatarValorReais(data.valorEstimadoProximoConcurso)}`;

                return textoResultado;
            } else {
                throw new Error(`Erro ao obter os dados da ${loteriaSelecionada}. Código de status: ${response.status}`);
            }
        } catch (error) {
            console.error(error);
            alert(`Erro ao obter os dados da ${loteriaSelecionada}.`);
        }
    } else {
        return "";
    }
}

// Chamando a função para selecionar a loteria
function selecionarLoteria() {
    const loteriaSelecionada = document.getElementById("loteria").value;
    obterResultados(loteriaSelecionada).then(resultado => {
        document.getElementById("resultado").textContent = resultado;
    });
}

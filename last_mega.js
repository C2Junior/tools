document.addEventListener("DOMContentLoaded", function() {
    // URL da API da Caixa Econômica Federal
    const url = "https://loteriascaixa-api.herokuapp.com/api/megasena/latest";

    // Selecionando o elemento onde os resultados serão exibidos
    const resultadoDiv = document.getElementById("resultado");

    // Função para traduzir valores booleanos
    function traduzirBooleano(valor) {
        return valor ? "sim" : "não";
    }

    // Função para formatar os valores em reais com ponto para separar as milhares e vírgula como separador decimal
    function formatarValor(valor) {
        return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });
    }

    // Fazendo uma requisição GET para a URL da API usando fetch
    fetch(url)
        .then(response => {
            // Verificando se a requisição foi bem-sucedida (código de status 200)
            if (response.ok) {
                // Convertendo a resposta para o formato JSON
                return response.json();
            } else {
                throw new Error("Erro ao obter os dados. Código de status: " + response.status);
            }
        })
        .then(data => {
            // Criando e preenchendo os elementos HTML com as informações do último concurso da Mega-Sena
            const ul = document.createElement("ul");
            ul.innerHTML = `
                <li><strong>Loteria:</strong> ${data.loteria}</li>
                <li><strong>Concurso:</strong> ${data.concurso}</li>
                <li><strong>Data:</strong> ${data.data}</li>
                <li><strong>Local:</strong> ${data.local}</li>
                <li><strong>Dezenas na ordem do sorteio:</strong> ${data.dezenasOrdemSorteio.join(", ")}</li>
                <li><strong>Dezenas sorteadas:</strong> ${data.dezenas.join(", ")}</li>
                <li><strong>Prêmios:</strong>
                    <ul>
                        ${data.premiacoes.map(premio => `<li><strong>Descrição:</strong> ${premio.descricao}, <strong>Faixa:</strong> ${premio.faixa}, <strong>Ganhadores:</strong> ${premio.ganhadores.toLocaleString('pt-BR')}, <strong>Valor do prêmio:</strong> ${formatarValor(premio.valorPremio)}</li>`).join("")}
                    </ul>
                </li>
                <li><strong>Acumulou:</strong> ${traduzirBooleano(data.acumulou)}</li>
                <li><strong>Próximo concurso:</strong> ${data.proximoConcurso}</li>
                <li><strong>Data do próximo concurso:</strong> ${data.dataProximoConcurso}</li>
                <li><strong>Valor arrecadado:</strong> ${formatarValor(data.valorArrecadado)}</li>
                <li><strong>Valor acumulado do concurso 0-5:</strong> ${formatarValor(data.valorAcumuladoConcurso_0_5)}</li>
                <li><strong>Valor acumulado do concurso especial:</strong> ${formatarValor(data.valorAcumuladoConcursoEspecial)}</li>
                <li><strong>Valor acumulado do próximo concurso:</strong> ${formatarValor(data.valorAcumuladoProximoConcurso)}</li>
                <li><strong>Valor estimado do próximo concurso:</strong> ${formatarValor(data.valorEstimadoProximoConcurso)}</li>
            `;
            resultadoDiv.appendChild(ul);
        })
        .catch(error => {
            // Exibindo mensagem de erro caso ocorra algum problema
            resultadoDiv.textContent = "Erro: " + error.message;
        });
});

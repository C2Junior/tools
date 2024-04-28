document.getElementById("combinationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var elementsInput = document.getElementById("elements").value;
    var elements = elementsInput.split(" ").filter(function(element) {
        return element.trim() !== "";
    }).sort(); // Ordenar o conjunto de elementos em ordem crescente
    var m = parseInt(document.getElementById("m").value);
    var x = parseInt(document.getElementById("x").value);

    var outputDiv = document.getElementById("output");
    var sortedElementsDiv = document.getElementById("sortedElements"); // Div para exibir o conjunto de elementos ordenado
    outputDiv.innerHTML = "";
    sortedElementsDiv.innerHTML = ""; // Limpar o conteúdo anterior

    // Exibir o conjunto de elementos ordenado
    var sortedElementsText = "Elementos fornecidos em ordem crescente: " + elements.join(", ");
    sortedElementsDiv.textContent = sortedElementsText;

    // Verificar se o número de elementos é suficiente para gerar as combinações
    if (elements.length < m) {
        outputDiv.textContent = "Erro: O número de elementos deve ser maior ou igual ao tamanho das combinações.";
        return;
    }

    // Calcular o número total de combinações possíveis
    var totalComb = totalCombinations(elements.length, m);
    var totalCombDiv = document.getElementById("totalCombinations");
    totalCombDiv.textContent = "Número total de combinações possíveis: " + formatNumberWithDots(Math.round(totalComb));

    // Verificar se o número de combinações aleatórias a serem geradas excede o número total de combinações possíveis
    if (x > totalComb) {
        outputDiv.textContent = "Erro: O número de combinações aleatórias a serem geradas não pode ser maior que o número total de combinações possíveis.";
        return;
    }

    // Gerar combinações aleatórias distintas
    var combinationsCount = 0;
    var generatedCombinations = new Set(); // Usar um conjunto para garantir combinações únicas
    while (combinationsCount < x) {
        var randomCombination = getRandomCombination(elements, m).sort().join(","); // Ordenar a combinação gerada
        if (!generatedCombinations.has(randomCombination)) {
            var p = document.createElement("p");
            p.textContent = "Combinação " + (combinationsCount + 1) + ": " + randomCombination;
            outputDiv.appendChild(p);
            generatedCombinations.add(randomCombination);
            combinationsCount++;
        }
    }
});

function getRandomCombination(elements, m) {
    var shuffledElements = shuffleArray(elements);
    return shuffledElements.slice(0, m);
}

function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // Enquanto ainda houver elementos a serem embaralhados...
    while (0 !== currentIndex) {
        // Selecionar um elemento restante...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // E trocá-lo com o elemento atual.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function totalCombinations(n, m) {
    // Calcular o coeficiente binomial (n escolha m)
    return factorial(n) / (factorial(m) * factorial(n - m));
}

function factorial(num) {
    // Calcular o fatorial de um número
    if (num === 0 || num === 1)
        return 1;
    for (var i = num - 1; i >= 1; i--) {
        num *= i;
    }
    return num;
}

function formatNumberWithDots(number) {
    // Formatando um número com pontos para separar os milhares
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

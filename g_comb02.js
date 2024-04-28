document.getElementById("combinationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var elementsInput = document.getElementById("elements").value;
    var elements = elementsInput.split(",").map(function(element) {
        return parseInt(element.trim()); // Convertendo para número e removendo espaços em branco extras
    }).filter(function(element) {
        return !isNaN(element); // Removendo elementos NaN
    }).sort(function(a, b) {
        return a - b; // Ordenando em ordem crescente
    });
    var m = parseInt(document.getElementById("m").value);
    var x = parseInt(document.getElementById("x").value);

    var outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";

    // Exibir os elementos fornecidos em ordem crescente
    var elementsSortedP = document.createElement("p");
    elementsSortedP.textContent = "Elementos fornecidos em ordem crescente: " + elements.join(", ");
    outputDiv.appendChild(elementsSortedP);

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
    var combinations = new Set();
    while (combinations.size < x) {
        var randomCombination = getRandomCombination(elements, m).sort(function(a, b) {
            return a - b; // Ordenando como números
        }).join(",");
        combinations.add(randomCombination);
    }

    // Converter Set para array, ordenar e exibir as combinações geradas em ordem crescente
    var sortedCombinations = Array.from(combinations).sort();
    sortedCombinations.forEach(function(combination, index) {
        var p = document.createElement("p");
        p.textContent = "Combinação " + (index + 1) + ": " + combination;
        outputDiv.appendChild(p);
    });
});

function getRandomCombination(elements, m) {
    var shuffledElements = shuffleArray(elements);
    return shuffledElements.slice(0, m);
}

function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function totalCombinations(n, m) {
    var numerator = factorial(n);
    var denominator = factorial(m) * factorial(n - m);
    return numerator / denominator;
}

function factorial(num) {
    if (num === 0 || num === 1) {
        return 1;
    }
    for (var i = num - 1; i >= 1; i--) {
        num *= i;
    }
    return num;
}

function formatNumberWithDots(number) {
    return number.toLocaleString('en');
}

document.getElementById("combinationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var n = parseInt(document.getElementById("n").value);
    var m = parseInt(document.getElementById("m").value);
    var x = parseInt(document.getElementById("x").value);

    var outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";

    // Verificar se o número de elementos é suficiente para gerar as combinações
    if (n < m) {
        outputDiv.textContent = "Erro: O número de elementos deve ser maior ou igual ao tamanho das combinações.";
        return;
    }

    // Criar uma lista de elementos
    var elements = Array.from({ length: n }, (_, i) => i + 1);

    // Calcular o número total de combinações possíveis
    var totalComb = totalCombinations(n, m);
    var totalCombDiv = document.getElementById("totalCombinations");
    totalCombDiv.textContent = "Número total de combinações possíveis: " + formatNumberWithDots(Math.round(totalComb));

    // Verificar se o número de combinações aleatórias a serem geradas excede o número total de combinações possíveis
    if (x > totalComb) {
        outputDiv.textContent = "Erro: O número de combinações aleatórias a serem geradas não pode ser maior que o número total de combinações possíveis.";
        return;
    }

    // Gerar combinações aleatórias distintas
    var combinationsCount = 0;
    var generatedCombinations = [];
    while (combinationsCount < x) {
        var randomCombination = getRandomCombination(elements, m).join(",");
        if (!generatedCombinations.includes(randomCombination)) {
            var p = document.createElement("p");
            p.textContent = "Combinação " + (combinationsCount + 1) + ": " + randomCombination;
            outputDiv.appendChild(p);
            generatedCombinations.push(randomCombination);
            combinationsCount++;
        }
    }
});

function getRandomCombination(elements, m) {
    var shuffledElements = shuffleArray(elements);
    return shuffledElements.slice(0, m).sort((a, b) => a - b);
}

function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // Enquanto ainda houver elementos para embaralhar
    while (0 !== currentIndex) {
        // Escolher um elemento restante
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // Trocar com o elemento atual
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function totalCombinations(n, m) {
    // Calcular o número total de combinações possíveis
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
    return number.toLocaleString('pt-br');
}

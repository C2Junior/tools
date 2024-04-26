document.getElementById("combinationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var n = parseInt(document.getElementById("n").value);
    var m = parseInt(document.getElementById("m").value);
    var x = parseInt(document.getElementById("x").value);

    var elements = Array.from({ length: n }, (_, i) => i + 1);

    var outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";

    // Calcular o número total de combinações possíveis
    var totalComb = totalCombinations(n, m);
    var totalCombDiv = document.getElementById("totalCombinations");
    totalCombDiv.textContent = "Número total de combinações possíveis: " + Math.round(totalComb).toLocaleString('en');

    for (var i = 0; i < x; i++) {
        var randomCombination = getRandomCombination(elements, m);
        var combinationString = randomCombination.join(", ");
        var p = document.createElement("p");
        p.textContent = "Combinação " + (i + 1) + ": " + combinationString;
        outputDiv.appendChild(p);
    }
});

function getRandomCombination(elements, m) {
    var shuffledElements = elements.sort(() => Math.random() - 0.5);
    return shuffledElements.slice(0, m).sort((a, b) => a - b);
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

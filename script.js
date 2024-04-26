document.getElementById("combinationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var n = parseInt(document.getElementById("n").value);
    var m = parseInt(document.getElementById("m").value);
    var x = parseInt(document.getElementById("x").value);

    var elements = Array.from({ length: n }, (_, i) => i + 1);

    var outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";

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

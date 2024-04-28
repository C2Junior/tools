window.onload = function() {
    var tools = [
        { name: "01. Gerador de Combinações Aleatórias - C(n,m)", url: "g_comb01.html" },
        { name: "02. Gerador de Combinações Aleatórias - (informe um cojunto de números inteiros, separados por vírgula)", url: "g_comb02.html" }
        // Adicione mais objetos conforme necessário para cada ferramenta
    ];

    var toolList = document.getElementById("toolList");

    // Preencher a lista de ferramentas
    tools.forEach(function(tool) {
        var listItem = document.createElement("li");
        var link = document.createElement("a");
        link.textContent = tool.name;
        link.href = tool.url;
        listItem.appendChild(link);
        toolList.appendChild(listItem);
    });
};

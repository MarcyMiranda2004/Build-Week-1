document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("resultChart").getContext("2d");

  new Chart(ctx, {
    type: "doughnut", // Tipo di grafico
    data: {
      labels: ["Corrette", "Errate"], // Testo nella legenda
      datasets: [
        {
          data: [66.7, 33.3], // Percentuali di risposte corrette/sbagliate
          backgroundColor: ["#00eaff", "#b033a3"], // Colori
          borderWidth: 0, // Rimuove i bordi tra le sezioni
        },
      ],
    },
    options: {
      responsive: true, // Adatta il grafico allo schermo
      cutout: "80%", // Grandezza del buco centrale (più grande per un buon effetto)
      plugins: {
        legend: {
          display: false, // Nasconde la legenda
        },
      },
    },
  });
});

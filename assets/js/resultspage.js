document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("resultChart").getContext("2d");

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Corrette", "Errate"],
      datasets: [
        {
          data: [66.7, 33.3],
          backgroundColor: ["#00eaff", "#b033a3"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      cutout: "80%",
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
});

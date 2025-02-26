document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("resultChart").getContext("2d");

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Errate", "Corrette"],
      datasets: [
        {
          data: [33.3, 66.7],
          backgroundColor: ["#b033a3", "#00eaff"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      cutout: "70%",
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
});

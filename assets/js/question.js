const ctx = document.getElementById('donutTimer').getContext('2d');
let timer = 60; // Imposta il tempo iniziale del timer in secondi

const chart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    datasets: [
      {
        data: [timer, 100 - timer], // I dati per il grafico a ciambella
        backgroundColor: [
          // I colori per le due parti del grafico
          '#00ffff', // Parte colorata (timer)
          '#98699c', // Parte rimanente
        ],
        borderWidth: 0, // Spessore dei bordi
        circumference: 360, // Imposta la circonferenza a 360 per un cerchio completo
        rotation: 270, // Ruota il grafico di 270 gradi per iniziare dall'alto
      },
    ],
  },
  options: {
    cutout: '80%', // Imposta la dimensione del "buco" al centro del grafico
    plugins: {
      legend: {
        display: false, // Nascondi la legenda
      },
      tooltip: {
        enabled: false, // Disabilita i tooltip
      },
    },
  },
});
const intervalId = setInterval(updateTimer, 1000); // Aggiorna il timer ogni secondo
const timerText = document.getElementById('timerText'); // Ottieni riferimento all'elemento per il testo

function updateTimer() {
  timer--; // Decrementa il timer di 1 secondo
  chart.data.datasets[0].data = [timer, 100 - timer]; // Aggiorna i dati del grafico
  chart.update(); // Aggiorna il grafico

  // Aggiorna il testo del timer
  timerText.textContent = timer;

  if (timer < 0) {
    clearInterval(intervalId); // Ferma l'intervallo quando il timer arriva a zero
    // Reindirizza a un'altra pagina
    window.location.href = 'assets/html/resultspage.html'; // Sostituisci con l'URL desiderato
  }
}

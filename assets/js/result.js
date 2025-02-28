document.addEventListener("DOMContentLoaded", function () {
  let totalQuestions = parseInt(localStorage.getItem("totalQuestions")) || 10;
  let correctAnswers = parseInt(localStorage.getItem("score")) || 0;

  if (totalQuestions < correctAnswers || totalQuestions === 0) {
    let wrongAnswers = parseInt(localStorage.getItem("wrongAnswers")) || 0;
    totalQuestions = correctAnswers + wrongAnswers;
  }

  let wrongAnswers = totalQuestions - correctAnswers;

  let correctPercentage =
    totalQuestions > 0
      ? ((correctAnswers / totalQuestions) * 100).toFixed(1)
      : 0;
  let wrongPercentage =
    totalQuestions > 0 ? ((wrongAnswers / totalQuestions) * 100).toFixed(1) : 0;

  console.log("Total Questions:", totalQuestions);
  console.log("Correct Answers:", correctAnswers);
  console.log("Wrong Answers:", wrongAnswers);

  let resultMessage =
    correctPercentage >= 60
      ? "Congratulations!\nYou passed the exam.\n\nYou will receive your certificate soon.\nCheck your email.\nCheck your email (including \npromotions / spam folder)"
      : "Sorry,\nyou failed the exam.";

  let correctLabel = document.getElementById("correctLabel");
  let correctPercentageLabel = document.getElementById("correctPercentage");
  let wrongLabel = document.getElementById("wrongLabel");
  let wrongPercentageLabel = document.getElementById("wrongPercentage");

  correctLabel.textContent = "Correct";
  correctPercentageLabel.innerHTML = `<span style="font-size: 58px; font-weight: 600;">${correctPercentage}%</span><br><span style="font-size: 20px; margin-top: -5px; display: block;">${correctAnswers} / ${totalQuestions} Questions</span>`;
  wrongLabel.textContent = "Wrong";
  wrongPercentageLabel.innerHTML = `<span style="font-size: 58px; font-weight: 600;">${wrongPercentage}%</span><br><span style="font-size: 20px; margin-top: -5px; display: block;">${wrongAnswers} / ${totalQuestions} Questions</span>`;

  [correctLabel, wrongLabel].forEach((el) => {
    el.style.fontSize = "50px";
    el.style.color = "#fff";
    el.style.fontWeight = "400";
    el.style.marginBottom = "-10px";
  });

  [correctPercentageLabel, wrongPercentageLabel].forEach((el) => {
    el.style.color = "#fff";
  });

  const ctx = document.getElementById("resultChart").getContext("2d");

  const centerTextPlugin = {
    id: "centerText",
    beforeDraw(chart) {
      const { width, height, ctx } = chart;
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const x = width / 2;
      const y = height / 2;
      const maxWidth = width * 0.6;
      const lineHeight = Math.max(14, height * 0.065);
      let fontSize = Math.min(width * 0.075, 26);
      let boldFontSize = Math.min(width * 0.11, 36);

      let lines = wrapText(ctx, resultMessage, maxWidth);
      while (lines.length > 6 && fontSize > 14) {
        fontSize -= 1;
        boldFontSize -= 1;
        lines = wrapText(ctx, resultMessage, maxWidth);
      }

      let startY = y - ((lines.length - 1) * lineHeight) / 2;
      lines.forEach((line, index) => {
        if (index === 0 && line.toLowerCase().includes("congratulations")) {
          ctx.fillStyle = "#00FFFF";
          ctx.font = `bold ${boldFontSize}px Arial`;
        } else if (line.toLowerCase().includes("you passed the exam")) {
          ctx.fillStyle = "#D20090";
          ctx.font = `bold ${fontSize}px Arial`;
        } else {
          ctx.fillStyle = "#fff";
          ctx.font = `bold ${fontSize}px Arial`;
        }
        ctx.fillText(line, x, startY + index * lineHeight);
      });

      ctx.restore();
    },
  };

  function wrapText(ctx, text, maxWidth) {
    let paragraphs = text.split("\n");
    let lines = [];

    paragraphs.forEach((paragraph) => {
      let words = paragraph.split(" ");
      let line = "";

      words.forEach((word) => {
        const testLine = line + word + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && line.length > 0) {
          lines.push(line.trim());
          line = word + " ";
        } else {
          line = testLine;
        }
      });

      lines.push(line.trim());
    });

    return lines;
  }

  new Chart(ctx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [wrongPercentage, correctPercentage],
          backgroundColor: ["#d20090", "#00ffff"],
          borderWidth: 0,
          cutout: "70%",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "80%",
      rotation: 0,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return `${tooltipItem.label}: ${tooltipItem.raw}%`;
            },
          },
        },
      },
    },
    plugins: [centerTextPlugin],
  });
});

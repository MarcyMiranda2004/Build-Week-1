document.getElementById("startButton").addEventListener("click", () => {
  let checkbox = document.getElementById("checkbox");
  let alertMessage = document.getElementById("alertMessage");

  if (checkbox.checked) {
    window.location.href = "question.html";
  } else {
    alertMessage.style.display = "block";
  }
});

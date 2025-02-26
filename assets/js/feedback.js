let stelle = document.querySelectorAll(".star");
stelle.forEach((star) => {
  star.addEventListener("click", function () {
    let rating = parseInt(star.getAttribute("data-value"));
    stelle.forEach((luce) => {
      let starValue = parseInt(luce.getAttribute("data-value"));
      if (starValue <= rating) {
        luce.classList.add("active");
      } else {
        luce.classList.remove("active");
      }
    });
  });
});

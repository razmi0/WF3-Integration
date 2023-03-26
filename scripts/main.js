//-------//
//
// TITRE : Validation du formulaire de contact
// AUTHOR : Thomas Cuesta
// DATE : 2023/03/25
//
//-------//

//-------//
//
// THIS SCRIPT BUILD THE OVERLAY DYNAMIC AND DISPLAYING,
// CAROUSEL DISPLAYING,
// LOGS SCREEN WIDTH AND HEIGHT IN CONSOLE IF ORIENTATION DETECTED.
//
//-------//

const close_overlay = document.querySelector("#close-overlay");
const overlay      = document.querySelector(".overlay-black");
const carousel     = document.querySelector("#carousel-image");

//--
// OPEN CAROUSEL
//--

//--
//ONE IMG EQUAL ONE LISTENER TYPE CLICK
//--

document.querySelectorAll(".img-format").forEach((image) => {
  image.addEventListener("click", () => {

    carousel.classList.toggle("visually-hidden");
    carousel.classList.toggle("carousel-format");
    overlay.classList.toggle("visually-hidden");
    close_overlay.classList.toggle("top-right-page-fixed");
    close_overlay.classList.toggle("visually-hidden");

  });
});

//--
// CLOSE CAROUSEL
//--

if (close_overlay !== null){

    close_overlay.addEventListener("click" , () => {

        carousel.classList.toggle("visually-hidden");
        carousel.classList.toggle("carousel-format");
        overlay.classList.toggle("visually-hidden");
        close_overlay.classList.toggle("top-right-page-fixed");
        close_overlay.classList.toggle("visually-hidden");

    });
}

//--
//LOGS SCREEN DATA FOR DEBUGGING PURPOSE
//--

screen.orientation.addEventListener("change", (e) => {

    console.log(`Change orientation detected :  ${e.currentTarget.type}`);
    console.log(`Screen width : ${screen.availWidth}`);
    console.log(`Screen height : ${screen.availHeight}`);

  });



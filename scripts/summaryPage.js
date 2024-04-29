import { bikes } from "../data.js";

//---------------------------------------------------------
//  POBIERANIE DANYCH Z LOCAL STORAGE
//---------------------------------------------------------
const userChoice = JSON.parse(localStorage.getItem("chosenBikeId"));
const paymentMethod = JSON.parse(localStorage.getItem("paymentMethod"));
const finalRentalPrice = JSON.parse(localStorage.getItem("finalRentalPrice"));

//---------------------------------------------------------
//  TWORZENIE ZMIENNYCH DOM
//---------------------------------------------------------

const $paymentMethod = document.getElementById("payment-method");
const $finalRentalPrice = document.getElementById("final-rental-price");
const $bikeName = document.getElementById("bike-name");
const $bikeImg = document.getElementById("bike-img");

$paymentMethod.innerText = paymentMethod;
$finalRentalPrice.innerText = `${finalRentalPrice},00 zł`;
$bikeName.innerText = bikes[userChoice].name;
$bikeImg.setAttribute("src", bikes[userChoice].img);

//---------------------------------------------------------
//  FAJERWERKI
//---------------------------------------------------------

const duration = 3 * 1000,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 40, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
        return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    confetti(
        Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
    );
    confetti(
        Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
    );
}, 250);

//---------------------------------------------------------
//  CZYSZCZENIE LOCAL STORAGE PO DOKONANIU ZAKUPU
//---------------------------------------------------------
const $pageTitle = document.getElementById("page-title");
const $nextOrder = document.getElementById("next-order");

$pageTitle.addEventListener("click", () => {
    localStorage.clear();
});

$nextOrder.addEventListener("click", () => {
    localStorage.clear();
});

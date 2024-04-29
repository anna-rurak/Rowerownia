import { bikes } from "../data.js";

//---------------------------------------------------------
//  POBIERANIE DANYCH Z LOCAL STORAGE
//---------------------------------------------------------
const userChoice = JSON.parse(localStorage.getItem("chosenBikeId"));
console.log(typeof userChoice);
const paymentMethod = JSON.parse(localStorage.getItem("paymentMethod"));
const additionals = JSON.parse(localStorage.getItem("additionals"));
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

//TODO
// dodać przycisk - "kolejne zamówienie"
// dodać resetowanie local storage po zamknięciu przeglądarki lub jeśli ktoś wchodzi na stronę po raz pierwszy

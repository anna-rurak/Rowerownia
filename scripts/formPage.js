import { bikes } from "../data.js";

const $nameInput = document.getElementById("name-input");
const $nameError = document.getElementById("error-message-name");
const $emailInput = document.getElementById("email-input");
const $emailError = document.getElementById("error-message-email");
const $radioButton1 = document.getElementById("flexRadioDefault1");
const $radioButton2 = document.getElementById("flexRadioDefault2");
const $radioButtons = document.querySelectorAll(".form-check-input");
const $additionalAccessories = document.querySelectorAll(".accessories");
const $startDateInput = document.getElementById("start-date");
const $startDateMsg = document.getElementById("start-date-msg");
const $endDateInput = document.getElementById("end-date");
const $endDateMsg = document.getElementById("end-date-msg");
const $finalPrice = document.getElementById("final-price");
const $finalizationButton = document.getElementById("submit-btn");
const $bikeName = document.getElementById("bike-name");
const $bikeImg = document.getElementById("bike-img");
const $bikeProducer = document.getElementById("p-producer");
const $bikeType = document.getElementById("p-type");
const $bikeWheelSize = document.getElementById("p-wheelSize");
const $bikeFrameSize = document.getElementById("p-frameSize");
const $bikeWeight = document.getElementById("p-weight");
const $bikePrice = document.getElementById("p-price");
const unreadableChoice = localStorage.getItem("chosenBikeId");
const userChoice = JSON.parse(unreadableChoice);
const defaultName = JSON.parse(localStorage.getItem("userName"));
const defaultEmail = JSON.parse(localStorage.getItem("userEmail"));
// const defaultRadio = JSON.parse(localStorage.getItem("paymentMethod"));

//-------------------------------------------------
//   ŁADOWANIE DANYCH Z LOCAL STORAGE
//-------------------------------------------------

if (defaultName != "" || defaultName != null) {
    $nameInput.value = defaultName;
}

if (defaultEmail != "" || defaultEmail != null) {
    $emailInput.value = defaultEmail;
}

$bikeName.innerText = bikes[userChoice].name;
$bikeImg.setAttribute("src", bikes[userChoice].img);

$bikeProducer.innerText = `Producent: ${bikes[userChoice].producer}`;
$bikeType.innerText = `Typ: ${bikes[userChoice].type}`;
$bikeWheelSize.innerText = `Rozmiar koła: ${bikes[userChoice].wheelSize}`;
$bikeFrameSize.innerText = `Rozmiar ramy: ${bikes[userChoice].frameSize}`;
$bikeWeight.innerText = `Waga: ${bikes[userChoice].weight}kg`;
$bikePrice.innerText = `Cena: ${bikes[userChoice].price},00 zł / dzień`;

//-------------------------------------------------
// USTAWIENIE DANYCH DOMYŚLNYCH
//-------------------------------------------------

function setSpecifictDate(num) {
    const today = new Date();
    today.setDate(today.getDate() + num);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const initialDate = `${year}-${month}-${day}`;
    return initialDate;
}

function setSpecifictDateX(myDay, num) {
    myDay.setDate(myDay.getDate() + num);
    const year = day.getFullYear();
    const month = String(myDay.getMonth() + 1).padStart(2, "0");
    const day = String(myDay.getDate()).padStart(2, "0");
    const initialDate = `${year}-${month}-${day}`;
    return initialDate;
}

$startDateInput.value = setSpecifictDate(7);
$endDateInput.value = setSpecifictDate(7);

//-------------------------------------------------
//  WALIDACJA INPUTÓW
//-------------------------------------------------

$nameInput.addEventListener("change", () => {
    const name = $nameInput.value;
    const isValidName = /^[A-Z][a-z]{1,}\s[A-Z][a-z]{1,}$/;

    if (name === "" || name === null || !isValidName.test(name)) {
        $nameError.style.visibility = "visible";
    } else {
        $nameError.style.visibility = "hidden";
        localStorage.setItem("userName", JSON.stringify(name));
    }
});

$emailInput.addEventListener("change", () => {
    const email = $emailInput.value;
    const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email === "" || email === null || !isValidEmail.test(email)) {
        $emailError.style.visibility = "visible";
    } else {
        $emailError.style.visibility = "hidden";
        localStorage.setItem("userEmail", JSON.stringify(email));
    }
});

//!!!!!!!!!!!!!!!!!!TRZEBA TO NAPRAWIĆ!!!!!!!!!!!!!!!!!!
// $radioButtons.forEach((el) => {
//     el.addEventListener("click", () => {
//         localStorage.setItem("paymentMethod", JSON.stringify(el.getAttribute("id")));
//     });
// });

//---------------------------------------------------------
//  WYBÓR DATY ROZPOCZĘCIA I ZAKOŃCZENIA NAJMU ROWERU
//---------------------------------------------------------

function checkStartDate(startDate) {
    if (startDate < new Date(setSpecifictDate(7))) {
        $startDateMsg.style.boxShadow = "5px 5px 15px 6px #892514";
        $startDateInput.value = setSpecifictDate(7);
    } else {
        $startDateMsg.style.boxShadow = "";
        $endDateInput.value = startDate;
    }
}

function checkEndDate(endDate) {
    endDate = new Date(endDate);
    let startDateScope = new Date($startDateInput.value);
    startDateScope.setDate(startDateScope.getDate() + 30);
    if (endDate > startDateScope) {
        $endDateMsg.style.boxShadow = "5px 5px 15px 6px #892514";
        $endDateInput.value = startDateScope.toISOString().slice(0, 10); // Format "YYYY-MM-DD"
    } else if (endDate < new Date($startDateInput.value)) {
        $endDateMsg.style.boxShadow = "5px 5px 15px 6px #892514";
        $endDateInput.value = $startDateInput.value;
    } else {
        $endDateMsg.style.boxShadow = "";
    }
}

function countDays() {
    const daysCount = Math.ceil((new Date($endDateInput.value) - new Date($startDateInput.value)) / (1000 * 60 * 60 * 24));
    return daysCount;
}

$startDateInput.addEventListener("change", () => {
    const startDate = $startDateInput.value;
    checkStartDate(startDate);
    priceUpdate();
});

$endDateInput.addEventListener("change", () => {
    const endDate = $endDateInput.value;
    checkEndDate(endDate);
    priceUpdate();
});

//---------------------------------------------------------
//  KALKULACJA CENY NAJMU
//---------------------------------------------------------

let additionalsArray = [];

// DODAĆ WYBÓR DODATKOWYCH AKCESORIÓW

function priceUpdate() {
    let additionalsCost = 0;
    for (let i = 0; i < additionalsArray.length; i++) {
        additionalsCost = +additionalsArray[i];
    }

    const summary = (bikes[userChoice].price + additionalsCost) * countDays();
    $finalPrice.innerHTML = `${summary},00 zł`;
}

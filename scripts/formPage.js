import { bikes } from "../data.js";

const $nameInput = document.getElementById("name-input");
const $nameError = document.getElementById("error-message-name");
const $emailInput = document.getElementById("email-input");
const $emailError = document.getElementById("error-message-email");
const $radioButton1 = document.getElementById("flexRadioDefault1");
const $radioButtons = document.querySelectorAll('input[type="radio"][name="flexRadioDefault"]');
const $startDateInput = document.getElementById("start-date");
const $startDateMsg = document.getElementById("start-date-msg");
const $endDateInput = document.getElementById("end-date");
const $endDateMsg = document.getElementById("end-date-msg");
const $additionals = document.querySelectorAll(".accessories");
const $finalPrice = document.getElementById("final-price");
const $bikeName = document.getElementById("bike-name");
const $bikeImg = document.getElementById("bike-img");
const $bikeProducer = document.getElementById("p-producer");
const $bikeType = document.getElementById("p-type");
const $bikeWheelSize = document.getElementById("p-wheelSize");
const $bikeFrameSize = document.getElementById("p-frameSize");
const $bikeWeight = document.getElementById("p-weight");
const $bikePrice = document.getElementById("p-price");

//-------------------------------------------------
//   ŁADOWANIE DANYCH Z LOCAL STORAGE
//-------------------------------------------------

const userChoice = JSON.parse(localStorage.getItem("chosenBikeId"));
const storedName = JSON.parse(localStorage.getItem("userName"));
const storedEmail = JSON.parse(localStorage.getItem("userEmail"));
const storedPaymentMethod = JSON.parse(localStorage.getItem("paymentMethod"));
let additionalsArray = JSON.parse(localStorage.getItem("additionals"));

//-------------------------------------------------
//   SPECYFIKACJA TECHNICZNA
//-------------------------------------------------

$bikeName.innerText = bikes[userChoice].name;
$bikeImg.setAttribute("src", bikes[userChoice].img);
$bikeProducer.innerText = `Producent: ${bikes[userChoice].producer}`;
$bikeType.innerText = `Typ: ${bikes[userChoice].type}`;
$bikeWheelSize.innerText = `Rozmiar koła: ${bikes[userChoice].wheelSize}`;
$bikeFrameSize.innerText = `Rozmiar ramy: ${bikes[userChoice].frameSize}`;
$bikeWeight.innerText = `Waga: ${bikes[userChoice].weight}kg`;
$bikePrice.innerText = `Cena: ${bikes[userChoice].price},00 zł / dzień`;
$finalPrice.innerHTML = `${bikes[userChoice].price},00 zł`;

//-------------------------------------------------
//  WALIDACJA INPUTÓW
//-------------------------------------------------
if (storedName != "" || storedName != null) {
    $nameInput.value = storedName;
}

if (storedEmail != "" || storedEmail != null) {
    $emailInput.value = storedEmail;
}

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

//-------------------------------------------------
//  WYBÓR FORMY PŁATNOŚCI
//-------------------------------------------------

if (storedPaymentMethod != "" || storedPaymentMethod != null) {
    localStorage.setItem("paymentMethod", JSON.stringify($radioButton1.value));
}

$radioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", () => {
        localStorage.setItem("paymentMethod", JSON.stringify(radioButton.value));
    });
});

//---------------------------------------------------------
//  WYBÓR DATY ROZPOCZĘCIA I ZAKOŃCZENIA NAJMU ROWERU
//---------------------------------------------------------

function setSpecifictDate(num) {
    const today = new Date();
    today.setDate(today.getDate() + num);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const initialDate = `${year}-${month}-${day}`;
    return initialDate;
}

function checkStartDate(startDate) {
    startDate = new Date(startDate);
    let startDateScope = new Date(setSpecifictDate(7));
    if (startDate < startDateScope) {
        $startDateMsg.style.boxShadow = "5px 5px 15px 6px #892514";
        $startDateInput.value = startDateScope.toISOString().slice(0, 10); // Format "YYYY-MM-DD"
        $endDateInput.value = $startDateInput.value;
    } else {
        $startDateMsg.style.boxShadow = "";
        $endDateInput.value = $startDateInput.value;
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
    const daysCount = Math.ceil((new Date($endDateInput.value) - new Date($startDateInput.value)) / (1000 * 60 * 60 * 24) + 1);
    return daysCount;
}

$startDateInput.value = setSpecifictDate(7); //ustawia najwcześniejszą możliwą datę rozpoczęcia najmu
$endDateInput.value = setSpecifictDate(7); //ustawia najkrótszy możliwy czas najmu (1 dzień)

$startDateInput.addEventListener("change", (e) => {
    const startDate = e.target.value;
    checkStartDate(startDate);
    priceUpdate();
});

$endDateInput.addEventListener("change", (e) => {
    const endDate = e.target.value;
    checkEndDate(endDate);
    priceUpdate();
});

//---------------------------------------------------------
//  DODAWANIE AKCESORIÓW
//---------------------------------------------------------

if (additionalsArray === null || additionalsArray === "") {
    additionalsArray = [];
}

for (let i = 0; i < $additionals.length; i++) {
    if (additionalsArray.includes($additionals[i].getAttribute("id"))) {
        $additionals[i].setAttribute("checked", "checked");
    }
}

$additionals.forEach((item) => {
    item.addEventListener("click", () => {
        const itemId = item.getAttribute("id");
        const index = additionalsArray.indexOf(itemId);

        if (item.checked && index === -1) {
            additionalsArray.push(itemId);
        } else if (!item.checked && index !== -1) {
            additionalsArray.splice(index, 1);
        }
        localStorage.setItem("additionals", JSON.stringify(additionalsArray));
        priceUpdate();
    });
});

//---------------------------------------------------------
//  KALKULACJA CENY NAJMU
//---------------------------------------------------------

function priceUpdate() {
    let additionalsCost = 0;
    for (let i = 0; i < additionalsArray.length; i++) {
        if (additionalsArray[i] === "kask") {
            additionalsCost = additionalsCost + 15;
        } else if (additionalsArray[i] === "blokada") {
            additionalsCost = additionalsCost + 10;
        } else if (additionalsArray[i] === "koszyk") {
            additionalsCost = additionalsCost + 12;
        }
    }

    const summary = (bikes[userChoice].price + additionalsCost) * countDays();
    $finalPrice.innerHTML = `${summary},00 zł`;
    localStorage.setItem("finalRentalPrice", JSON.stringify(summary));
}

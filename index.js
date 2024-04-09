import "./style.css";
import { bikes } from "./data.js";

// --------- GENEROWANIE TABLICY ELEMENTÓW ---------
const cardContainer = document.getElementById("card-container");

for (let i = 0; i < bikes.length; i++) {
    const newCard = `<section class="col d-inline-block my-4 d-none">
<div class="card text-center border-dark">
    <div class="card-header text-bg-dark">
        <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
                <a class="nav-link summary-tab active" href="#">Przegląd</a>
            </li>
            <li class="nav-item">
                <a class="nav-link tech-spec-tab" href="#">Dane techniczne</a>
            </li>
        </ul>
    </div>
    <div class="card-body text-start">
        <div class="d-inline-block row content">
            <section class="summary-card">
                <img class="image col" src="${bikes[i].img}" alt="" />
                <div class="card-body col px-3">
                    <h7 class="category lighter">- ${bikes[i].type} -</h7>
                    <h3 class="card-title my-3">${bikes[i].name}</h3>
                    <p class="card-text">${bikes[i].info}</p>
                </div>
            </section>
            <section class="tech-spec-card d-none">
                <div class="card-body col my-0">
                    <h5 class="card-title my-3">${bikes[i].name}</h5>
                    <!-- <hr class="line" /> -->
                    <p class="card-text py-3 my-0 border-bottom border-warning">Marka: ${bikes[i].producer}</p>
                    <!-- <hr class="line" /> -->
                    <p class="card-text py-3 my-0 border-bottom border-warning">Typ: ${bikes[i].type}</p>
                    <!-- <hr class="line" /> -->
                    <p class="card-text py-3 my-0 border-bottom border-warning">Rozmiar koła: ${bikes[i].wheelSize}</p>
                    <!-- <hr class="line" /> -->
                    <p class="card-text py-3 my-0 border-bottom border-warning">Rozmiar ramy: ${bikes[i].frameSize} cm</p>
                    <!-- <hr class="line" /> -->
                    <p class="card-text py-3 my-0 border-bottom border-warning">Waga: ${bikes[i].weight} kg</p>
                </div>
            </section>
        </div>
        <a href="#" class="choose-btn btn btn-dark" id='element${i}'>Wybierz</a>
    </div>
</div>
</section>`;

    cardContainer.insertAdjacentHTML("beforeend", newCard);
}

// --------- OBSŁUGA KART PRZEGLĄD / DANE TECHNICZNE NA KARCIE ELEMENTU ---------
const summaryTab = document.querySelectorAll(".summary-tab");
const techSpecTab = document.querySelectorAll(".tech-spec-tab");

summaryTab.forEach((element) => {
    element.addEventListener("click", () => {
        console.log("hi");
        const cardHeader = element.closest(".card-header");
        const techSpec = cardHeader.querySelector(".tech-spec-tab");
        const colParent = element.closest(".col");
        const techSpecCard = colParent.querySelector(".tech-spec-card");
        const summaryCard = colParent.querySelector(".summary-card");

        if (!element.classList.contains("active") && techSpec.classList.contains("active")) {
            element.classList.add("active");
            techSpec.classList.remove("active");
            summaryCard.classList.remove("d-none");
            techSpecCard.classList.add("d-none");
        }
    });
});

techSpecTab.forEach((element) => {
    element.addEventListener("click", () => {
        const cardHeader = element.closest(".card-header");
        const summaryEl = cardHeader.querySelector(".summary-tab");
        const colParent = element.closest(".col");
        const techSpecCard = colParent.querySelector(".tech-spec-card");
        const summaryCard = colParent.querySelector(".summary-card");

        if (!element.classList.contains("active") && summaryEl.classList.contains("active")) {
            element.classList.add("active");
            summaryEl.classList.remove("active");
            summaryCard.classList.add("d-none");
            techSpecCard.classList.remove("d-none");
        }
    });
});

// --------- CHOOSING ELEMENT ---------
const userChoice = [];
const chooseButtons = document.querySelectorAll(".choose-btn");

chooseButtons.forEach((element) => {
    element.addEventListener("click", () => {
        const bikeIndex = element.getAttribute("id").slice(-1);
        console.log(bikeIndex);
    });
});

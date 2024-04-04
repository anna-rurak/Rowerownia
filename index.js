import { bikes } from "./data.js";

console.log(bikes);
const chooseButtons = document.querySelectorAll(".choose-btn ");
const summaryTab = document.querySelectorAll(".summary-tab");
const techSpecTab = document.querySelectorAll(".tech-spec-tab");

// --------- OBSŁUGA KART PRZEGLĄD / DANE TECHNICZNE NA KARCIE ELEMENTU ---------

summaryTab.forEach((element) => {
    element.addEventListener("click", () => {
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

// --------- GENEROWANIE TABLICY ELEMENTÓW ---------
const cardContainer = document.getElementById("card-container");
const newCard = `<section class="col d-inline-block">
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
                                    <img class="image col" src="./assets/1.jpg" alt="" />
                                    <div class="card-body col px-3">
                                        <h7 class="category lighter">- trekkingowy -</h7>
                                        <h3 class="card-title my-3">Rower nr 1</h3>
                                        <p class="card-text">Rower miejski z 3-rzędowymi przerzutkami i nóżką. Komfortowa jazda po mieście.</p>
                                        <!-- <a href="#" class="choose-btn btn btn-dark">Wybierz</a> -->
                                    </div>
                                </section>
                                <section class="tech-spec-card d-none">
                                    <div class="card-body col my-0">
                                        <h5 class="card-title my-3">Rower nr 1</h5>
                                        <!-- <hr class="line" /> -->
                                        <p class="card-text py-3 my-0 border-bottom border-warning">Marka: Romet</p>
                                        <!-- <hr class="line" /> -->
                                        <p class="card-text py-3 my-0 border-bottom border-warning">Model: SX5230</p>
                                        <!-- <hr class="line" /> -->
                                        <p class="card-text py-3 my-0 border-bottom border-warning">Typ: trekkingowy</p>
                                        <!-- <hr class="line" /> -->
                                        <p class="card-text py-3 my-0 border-bottom border-warning">Rozmiar ramy: 57 cm</p>
                                        <!-- <hr class="line" /> -->
                                        <p class="card-text py-3 my-0 border-bottom border-warning">Waga: 15 kg</p>
                                    </div>
                                </section>
                            </div>
                            <a href="#" class="choose-btn btn btn-dark">Wybierz</a>
                        </div>
                    </div>
                </section>`;

for (let i = 0; i < bikes.length; i++) {}

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

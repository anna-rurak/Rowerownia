import { bikes } from "../data.js";
//------------------------------------------------------------------------------------------------------------------------------------------------
//  GENEROWANIE TABLICY ELEMENTÓW
//------------------------------------------------------------------------------------------------------------------------------------------------
const $cardContainer = document.getElementById("card-container");

function generateCards(producer) {
    while ($cardContainer.firstChild) {
        $cardContainer.removeChild($cardContainer.firstChild);
    }

    let bikesFiltered = [];

    if (producer != "") {
        for (let i = 0; i < bikes.length; i++) {
            if (bikes[i].producer === producer) {
                bikesFiltered.push(bikes[i]);
            }
        }
    } else {
        bikesFiltered = bikes;
    }

    for (let i = 0; i < bikesFiltered.length; i++) {
        const $newCard = `
          <section class="col d-inline-block my-4 w-75 ">
            <div class="card text-center border-secondary-subtle">
            <div class="card-header text-bg-dark ">
                <ul class="nav nav-tabs card-header-tabs">
                    <li class="nav-item">
                        <a class="nav-link summary-tab active orange-text" href="#">Przegląd</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link tech-spec-tab orange-text" href="#">Dane techniczne</a>
                    </li>
                </ul>
            </div>
            <div class="card-body text-start bg-light">
                <div class="d-inline-block row content">
                    <section class="summary-card ">
                        <img class="image col" src="${bikesFiltered[i].img}" alt="" />
                        <div class="card-body col px-3">
                            <h7 class="category lighter orange-text">- ${bikesFiltered[i].type} -</h7>
                            <div class='d-flex justify-content-between align-items-center'>
                              <h3 class="card-title my-3 fw-bolder ">${bikesFiltered[i].name} </h3>
                              <p id='bike-price'>${bikesFiltered[i].price}zł/dzień</p>
                        </div>                    
                        <p class="card-text">${bikesFiltered[i].info}</p>
                    </section>
                    <section class="tech-spec-card d-none">
                        <div class="card-body col my-0">
                            <h5 class="card-title my-3">${bikesFiltered[i].name}</h5>
                            <p class="card-text py-3 my-0 border-bottom border-warning">Marka: ${bikesFiltered[i].producer}</p>
                            <p class="card-text py-3 my-0 border-bottom border-warning">Typ: ${bikesFiltered[i].type}</p>
                            <p class="card-text py-3 my-0 border-bottom border-warning">Rozmiar koła: ${bikesFiltered[i].wheelSize}</p>
                            <p class="card-text py-3 my-0 border-bottom border-warning">Rozmiar ramy: ${bikesFiltered[i].frameSize} cm</p>
                            <p class="card-text py-3 my-0 border-bottom border-warning">Waga: ${bikesFiltered[i].weight} kg</p>
                        </div>
                    </section>
                </div>
                <a href="./formPage.html" class="choose-btn btn btn-dark orange-text" id='button${i}'>Wybierz</a>
            </div>
            </div>
        </section>`;

        $cardContainer.insertAdjacentHTML("beforeend", $newCard);
    }
    assignEventHandlers();
}

function assignEventHandlers() {
    const $logoBtn = document.getElementById("logo");
    const $filterBtn = document.getElementById("filter-btn");
    const $filterInput = document.getElementById("filter-input");
    const $summaryTab = document.querySelectorAll(".summary-tab");
    const $techSpecTab = document.querySelectorAll(".tech-spec-tab");
    const $chooseButtons = document.querySelectorAll(".choose-btn");

    //------------------------------------------------------------------------------------------------------------------------------------------------
    //  OBSŁUGA KART PRZEGLĄD / DANE TECHNICZNE NA KARCIE ELEMENTU
    //------------------------------------------------------------------------------------------------------------------------------------------------

    $summaryTab.forEach((element) => {
        element.addEventListener("click", () => {
            const $cardHeader = element.closest(".card-header");
            const $techSpec = $cardHeader.querySelector(".tech-spec-tab");
            const $colParent = element.closest(".col");
            const $techSpecCard = $colParent.querySelector(".tech-spec-card");
            const $summaryCard = $colParent.querySelector(".summary-card");

            if (!element.classList.contains("active") && $techSpec.classList.contains("active")) {
                element.classList.add("active");
                $techSpec.classList.remove("active");
                $summaryCard.classList.remove("d-none");
                $techSpecCard.classList.add("d-none");
            }
        });
    });

    $techSpecTab.forEach((element) => {
        element.addEventListener("click", () => {
            const $cardHeader = element.closest(".card-header");
            const summaryEl = $cardHeader.querySelector(".summary-tab");
            const $colParent = element.closest(".col");
            const $techSpecCard = $colParent.querySelector(".tech-spec-card");
            const $summaryCard = $colParent.querySelector(".summary-card");

            if (!element.classList.contains("active") && summaryEl.classList.contains("active")) {
                element.classList.add("active");
                summaryEl.classList.remove("active");
                $summaryCard.classList.add("d-none");
                $techSpecCard.classList.remove("d-none");
            }
        });
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------
    //  FILTROWANIE PO MARCE
    //------------------------------------------------------------------------------------------------------------------------------------------------

    $filterBtn.addEventListener("click", () => {
        const inputValue = $filterInput.value;
        console.log(inputValue);
        const firstLetter = inputValue.slice(0, 1).toUpperCase();
        const restWord = inputValue.slice(1, inputValue.length).toLowerCase();
        const brandName = firstLetter + restWord;
        generateCards(brandName);
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------
    //  PRZYCISKI WYBORU -> PRZENIESIENIE DO STRONY Z FORMULARZEM
    //------------------------------------------------------------------------------------------------------------------------------------------------

    $chooseButtons.forEach((element) => {
        element.addEventListener("click", () => {
            const cardId = element.getAttribute("id");
            const chosenBikeId = cardId.slice(-1);
            localStorage.setItem("chosenBikeId", JSON.stringify(chosenBikeId));
        });
    });
}

generateCards("");

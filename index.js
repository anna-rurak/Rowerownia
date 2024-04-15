import { bikes } from "./data.js";

// --------- GENEROWANIE TABLICY ELEMENTÓW ---------

function generateCards(producer) {
    let cardContainer = document.getElementById("card-container");
    while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
    }

    let bikesFiltered = [];

    if (producer != "") {
        console.log("w ifie");
        for (let i = 0; i < bikes.length; i++) {
            if (bikes[i].producer === producer) {
                bikesFiltered.push(bikes[i]);
            }
        }
    } else {
        bikesFiltered = bikes;
    }

    for (let i = 0; i < bikesFiltered.length; i++) {
        const newCard = `
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
                <a href="#" class="choose-btn btn btn-dark orange-text" id='element${i}'>Wybierz</a>
            </div>
            </div>
        </section>`;
        cardContainer.insertAdjacentHTML("beforeend", newCard);
    }
}

generateCards("");

// --------- OBSŁUGA KART PRZEGLĄD / DANE TECHNICZNE NA KARCIE ELEMENTU ---------
const summaryTab = document.querySelectorAll(".summary-tab");
const techSpecTab = document.querySelectorAll(".tech-spec-tab");

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

// --------- SEARCHING BY THE BRAND NAME ---------

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");

searchBtn.addEventListener("click", () => {
    const inputValue = searchInput.value;
    const firstLetter = inputValue.slice(0, 1).toUpperCase();
    const restWord = inputValue.slice(1, inputValue.length).toLowerCase();
    const brandName = firstLetter + restWord;
    generateCards(brandName);
});

// --------- CHOOSING ELEMENT ---------
const userChoice = [];
const chooseButtons = document.querySelectorAll(".choose-btn");

chooseButtons.forEach((element) => {
    element.addEventListener("click", () => {});
});

// setting Date
const rentStart = new Date().setDate(new Date().getDate() + 7);

// const rentEndMax = input.value.setDate(date.getDate() + 30)
console.log(rentStart);

// --------- POKAZYWANIE / CHOWANIE POPOVERÓW ---------

// const popMsg = document.querySelectorAll(".popup");
// popMsg.forEach((el) => {
//     el.addEventListener("click", () => {
//         const msg = el.closest(".msg");
//         msg.classList.toggle("show", "hide");
//     });
// });

// console.log(popMsg);

const secondSection = `
    <button type="button" id="previous-page-btn" class="btn btn-md btn-dark my-3 orange-text fw-bolder">Powrót do listy</button>
    <div class="row mx-auto">
        <div class="col my-3">
            <div class="h-100 p-5 bg-light border rounded-3">
                <h2 class="pb-3 fw-bolder">${bikesFiltered[i].name}</h2>
                <img class="image-second-page" alt="bike image" src="./assets/1.jpg" />
            </div>
        </div>
        <div class="col my-3">
            <div class="h-100 p-5 bg-light border rounded-3">
                <h2 class="pb-3">Specyfikacja techniczna</h2>
                <p class="card-text py-3 my-0 border-bottom border-warning">Marka: ${bikesFiltered[i].producer}</p>
                <p class="card-text py-3 my-0 border-bottom border-warning">Typ: ${bikesFiltered[i].type}</p>
                <p class="card-text py-3 my-0 border-bottom border-warning">Rozmiar koła: ${bikesFiltered[i].wheelSize}</p>
                <p class="card-text py-3 my-0 border-bottom border-warning">Rozmiar ramy: ${bikesFiltered[i].frameSize} cm</p>
                <p class="card-text py-3 my-0 border-bottom border-warning">Waga: ${bikesFiltered[i].weight} kg</p>
                <p class="card-text py-3 my-0 border-bottom border-warning orange-text fw-bolder">Cena: ${bikesFiltered[i].price}zł/dzień</p>
            </div>
        </div>
    </div>
    <form class="row mx-auto w-100">
        <div id="name-input" class="my-1 d-block mx-auto w-75">
            <h5 class="fw-bolder">Imię i nazwisko:</h5>
            <div class="input-group">
                <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-user"></i></span>
                <input type="text" class="form-control" placeholder="Imię i nazwisko" aria-label="Username" aria-describedby="basic-addon1" required />
                <p class="w-100 my-1" id="error-message-name">Błąd: Twoje imię i nazwisko powinno być oddzielone pojedynczą spacją np. "Jan Kowalski"</p>
            </div>
        </div>
        <div id="email-input" class="my-1 d-block mx-auto w-75">
            <h5 class="fw-bolder">Adres email:</h5>
            <div class="input-group">
                <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-envelope"></i></span>
                <input type="text" class="form-control" placeholder="Identyfikator" aria-label="Identifier" required />
                <span class="input-group-text">@</span>
                <input type="text" class="form-control" placeholder="domena" aria-label="Server" required />
                <p class="w-100 my-1" id="error-message-email">Błąd: Prawidłowy format adres e-mail: "jankowalski@gmail.com" - nie powinien zawierać znaków specjalnych</p>
            </div>
        </div>
        <div id="payment-input" class="mb-3 mt-2 d-block mx-auto w-75">
            <h5 class="fw-bolder">Forma płatności:</h5>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked />
                <label class="form-check-label" for="flexRadioDefault1"> Gotówka przy odbiorze </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                <label class="form-check-label" for="flexRadioDefault2"> Przelew (dane do przelewy zostaną wysłane na podany adres email) </label>
            </div>
        </div>
        <div id="additional-accessories" class="my-3 d-block mx-auto w-75">
            <h5 class="fw-bolder">Dodatkowe akcesoria:</h5>
            <div class="btn-group w-100" role="group">
                <div class="col border rounded">
                    <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off" />
                    <label class="btn btn-light w-100 border-bottom m-right-2" for="btncheck1">Kask rowerowy <span class="orange-text fw-bolder">+15,00 zł</span></label>
                    <img class="d-block w-75 mx-auto" src="./assets/kask.jpg" alt="bike helmet" />
                </div>
                <div class="col border rounded">
                    <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off" />
                    <label class="btn btn-light w-100 border-bottom me-2" for="btncheck2">Blokada rowerowa <span class="orange-text fw-bolder">+10,00 zł</span></label>
                    <img class="d-block w-75 mx-auto" src="./assets/blokada.jpg" alt="bike lock" />
                </div>
                <div class="col border rounded">
                    <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off" />
                    <label class="btn btn-light w-100 border-bottom" for="btncheck3">Koszyk <span class="orange-text fw-bolder">+12,00 zł</span></label>
                    <img class="d-block w-75 mx-auto" src="./assets/koszyk.jpg" alt="bike basket" />
                </div>
            </div>
        </div>
        <div id="date-input" class="my-3 d-block mx-auto w-75">
            <h5 class="fw-bolder">Wybierz daty rozpoczęcia i zakończenia wynajmu:</h5>
            <div id="minDateMessage" class="col h-auto d-inline-block text-bg-light text-center my-auto msg">Najwcześniejsza data rozpoczęcia: 7 dni od aktualnej daty</div>
            <div class="row my-3 w-75">
                <div class="col input-group w-50">
                    <input type="date" class="form-control d-inline-block" min="${rentStart}" required />
                    <button type="button" class="btn btn-md btn-light border popup" required>Rozpoczęcie:<i class="fa-regular fa-circle-question mx-2"></i></button>
                </div>
            </div>

            <div id="maxDateMessage" class="col h-auto d-inline-block text-bg-light text-center my-auto msg">Min czas wynajmu: 1 dzień Maks czas wynajmu: 30 dni</div>
            <div class="row my-3 w-75">
                <div class="col input-group w-50">
                    <input type="date" class="form-control d-inline-block" min="${rentEnd}" required />
                    <button type="button" class="btn btn-md btn-light border popup" required>Zakończenie:<i class="fa-regular fa-circle-question mx-2"></i></button>
                </div>
            </div>
        </div>
        <div id="submit-div" class="row border-top border-bottom w-75 my-4 py-4 mx-auto">
            <h2 class="col d-block w-50">Do zapłaty: <span class="orange-text">150,00 zł</span></h2>
            <button type="submit" id="submit-btn" class="col btn btn-lg btn-dark d-block orange-text">- Zatwierdź -</button>
        </div>
    </form>`;

const thirdSection = `
    <section class="w-75 d-block mx-auto text-center border rounded my-4 bg-light">
      <h1 class="fw-bolder my-4">Dziękujemy za dokonanie rezerwacji!</h1>
      <h3 class="my-4 d-block mx-auto w-75">Forma płatności: <span class="fw-bolder orange-text">Gotówka</span></h3>
      <h3 class="my-4 d-block mx-auto w-75">Kwota do zapłaty: <span class="fw-bolder orange-text">150,00 zł</span></h3>
      <h3 class="my-4 d-block mx-auto w-75">Wybrany rower: <span class="fw-bolder orange-text">NAZWA</span></h3>
      <img class="image-third-page my-4 d-block mx-auto" src="./assets/1.jpg" alt="chosen bike" />
    </section>`;

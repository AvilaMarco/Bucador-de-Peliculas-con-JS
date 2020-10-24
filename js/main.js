/* DECLARACION DE VARIABLES */
const $titulos = [...document.querySelectorAll("h2, h3")];
const $results = document.getElementById("results");
const $tooltipResults = document.querySelector(".results-tooltip");
const $btnSearch = document.getElementById("search");

/* EVENTOS */
$btnSearch.addEventListener("input", filterSearch);
$btnSearch.addEventListener("blur", toClean);
$results.addEventListener("click", toSection);
window.addEventListener("scroll", btnStart);

/* MAIN FUNCIONS */
function filterSearch({ target: { value } }) {
  clearHTML();
  displayResults();
  const lowerValue = value.toLowerCase();
  const dataFilter = $titulos.filter(
    ({ innerText }) =>
      value != "" && innerText.toLowerCase().includes(lowerValue)
  );
  debugger;
  if (dataFilter.length != 0) {
    dataFilter.forEach((e, i) => {
      const newText = resaltarTexto(e.innerText.toLowerCase(), lowerValue);
      $results.append(createP(newText, i));
      e.dataset.id = i;
    });
  } else {
    $results.append(createP("No se encontraron resultados"));
  }
}

function toSection({ target }) {
  const element = target.tagName == "P" ? target : target.parentElement;
  const hyperLink = document.getElementById("hyper-link");
  const titulo = document.querySelector(
    `:not(p)[data-id='${element.dataset.id}']`
  );
  titulo.id = "searchApp";
  hyperLink.click();
  titulo.removeAttribute("id");
  noSearch();
}

function toClean({ target }) {
  if (target.value == "" || $results.firstElementChild.dataset.id == -1)
    noSearch();
}

function btnStart() {
  const btn = document.querySelector(".btn-start");
  const doct = document.documentElement;
  btn.classList.toggle("d-none", doct.scrollTop < 500);
}
/* FUNCIONES AUXILIARES */
function noSearch() {
  clearHTML();
  $results.classList.add("d-none");
  $tooltipResults.classList.add("d-none");
  $btnSearch.value = "";
}

function createP(text, id = -1) {
  const card = document.createElement("p");
  card.dataset.id = id;
  card.classList.add("ellipsis", "m-1", "pointer", "p-1");
  card.classList.add(id == -1 ? "bad" : "good");
  card.innerHTML = text;
  return card;
}

function displayResults() {
  $results.classList.remove("d-none");
  $tooltipResults.classList.remove("d-none");
}

function resaltarTexto(text, fragment) {
  const start = text.indexOf(fragment);
  const end = start + fragment.length;
  const textMarked = `<span class="mark">${text.slice(start, end)}</span>`;
  const completeText = text.slice(0, start) + textMarked + text.slice(end);
  return completeText;
}

function clearHTML() {
  $results.innerHTML = "";
  $titulos.forEach((e) => e.removeAttribute("data-id"));
}

const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let select of dropdowns){
    for(let codes in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = codes;
        newoption.value = codes;
        if (select.name === "from" && codes === "USD") {
            newoption.selected = "selected";
          } else if (select.name === "to" && codes === "INR") {
            newoption.selected = "selected";
          }
          select.append(newoption);

    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
      });
}

const updateCurrencyRate = async () =>
{
let amount = document.querySelector("form input");
let amtVal = amount.value;
if(amtVal === "" || amtVal < 1){
    amtVal = 1;
    amount.value ="1";
}
const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
let response = await fetch(URL);
let data = await response.json();
let rates = data[fromCurr.value.toLowerCase()];
let rate = rates[toCurr.value.toLowerCase()];
console.log(rate );
let finalAmt = amtVal * rate;
msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;

};
const updateFlag =(element) => {
    let codes = element.value;
    let countryCode = countryList[codes];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

}
btn.addEventListener("click", (evt) =>{
    evt.preventDefault();
    updateCurrencyRate();
});
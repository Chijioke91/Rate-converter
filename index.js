const currencyOne = document.querySelector('#currency-one');
const currencyTwo = document.querySelector('#currency-two');
const amountOne = document.querySelector('#amount-one');
const amountTwo = document.querySelector('#amount-two');
const rateEl = document.querySelector('#rate');
const swap = document.querySelector('#swap');

const calculateRate = () => {
  const currencyOneVal = currencyOne.value;
  const currencyTwoVal = currencyTwo.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOneVal}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currencyTwoVal];
      rateEl.innerText = `1 ${currencyOneVal} = ${rate} ${currencyTwoVal}`;

      amountTwo.value = (rate * amountOne.value).toFixed(2);
    });
};

// event listeners
currencyOne.addEventListener('change', calculateRate);
amountOne.addEventListener('input', calculateRate);
currencyTwo.addEventListener('change', calculateRate);
amountTwo.addEventListener('input', calculateRate);

swap.addEventListener('click', () => {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculateRate();
});

calculateRate();

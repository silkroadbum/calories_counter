const inputAgeElement = document.querySelector('#age');
const inputHeightElement = document.querySelector('#height');
const inputWeightElement = document.querySelector('#weight');
const resultElement = document.querySelector('.counter__result');
const inputGroupElement = document.querySelector('.inputs-group');
const submitButtonElement = document.querySelector('.form__submit-button');
const resetButtonElement = document.querySelector('.form__reset-button');

inputGroupElement.addEventListener('change', (evt) => {
    if (evt.target.type === 'text') {
        if (inputAgeElement.value !== '' && inputHeightElement.value !== '' && inputWeightElement.value !== '') {
            submitButtonElement.disabled = false;
            // resultElement.classList.remove('counter__result--hidden');
        } else {
            submitButtonElement.disabled = true;
            // resultElement.classList.add('counter__result--hidden');
        }
    }
});

submitButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    resultElement.classList.remove('counter__result--hidden');
});


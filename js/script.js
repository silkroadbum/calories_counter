const inputAgeElement = document.querySelector('#age');
const inputHeightElement = document.querySelector('#height');
const inputWeightElement = document.querySelector('#weight');
const resultElement = document.querySelector('.counter__result');
const inputGroupElement = document.querySelector('.inputs-group');
const submitButtonElement = document.querySelector('.form__submit-button');
const resetButtonElement = document.querySelector('.form__reset-button');
const maleRadioButtonElement = document.querySelector('#gender-male');
const counterResultListElement = document.querySelector('.counter__result-list');
const radioButtonsPhysicalActivity = document.querySelector('.radios-group');
const inputActivityMinimal = document.querySelector('#activity-minimal');
console.log(inputActivityMinimal);
let coefficient = 1.2;

const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1 `);
};

const disableSubmitButton = () => {
    if (inputAgeElement.value && inputHeightElement.value && inputWeightElement.value) {
        submitButtonElement.disabled = false;
    } else {
        submitButtonElement.disabled = true;
    }
};

const disableResetButton = () => {
    if (inputAgeElement.value || inputHeightElement.value || inputWeightElement.value) {
        resetButtonElement.disabled = false;
    } else {
        resetButtonElement.disabled = true;
    }
};

const calculateCalories = (input) => {
    let calories = 0;
    let n = 0;
    if (input.checked) {
        n = (10 * inputWeightElement.value) + (6.25 * inputHeightElement.value) - (5 * inputAgeElement.value) + 5;
        calories = coefficient * n;
    } else {
        n = (10 * inputWeightElement.value) + (6.25 * inputHeightElement.value) - (5 * inputAgeElement.value) - 161;
        calories = coefficient * n;
    }
    return Math.round(calories);
};

resetButtonElement.addEventListener('click', () => {
    resultElement.classList.add('counter__result--hidden');
    coefficient = 1.2;
    submitButtonElement.disabled = true;
    resetButtonElement.disabled = true;
    inputAgeElement.value = '';
    inputHeightElement.value = '';
    inputWeightElement.value = '';
    maleRadioButtonElement.checked = true;
    radioButtonsPhysicalActivity.querySelectorAll('input').forEach((element) => {
        element.checked = false;
    });
    inputActivityMinimal.checked = true;
});

radioButtonsPhysicalActivity.addEventListener('change', (evt) => {
    evt.preventDefault();
    if (evt.target.name = 'actibity') {
        evt.target.checked = true;
        switch (evt.target.value) {
            case 'min':
                coefficient = 1.2;
                break;
            case 'low':
                coefficient = 1.375;
                break;
            case 'medium':
                coefficient = 1.55;
                break;
            case 'high':
                coefficient = 1.725;
                break;
            case 'max':
                coefficient = 1.9;
                break;
            default:
                coefficient = 1.2;
                break;
        }
    }
});

inputGroupElement.addEventListener('input', (evt) => {
    if (evt.target.type === 'text') {
        disableSubmitButton();
        disableResetButton();
    }
});

submitButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    resultElement.classList.remove('counter__result--hidden');
    const resultCalories = calculateCalories(maleRadioButtonElement);
    counterResultListElement.querySelector('#calories-norm').textContent = formatNumber(resultCalories);
    counterResultListElement.querySelector('#calories-minimal').textContent = formatNumber(Math.round(resultCalories * 0.85));
    counterResultListElement.querySelector('#calories-maximal').textContent = formatNumber(Math.round(resultCalories * 1.15));
});
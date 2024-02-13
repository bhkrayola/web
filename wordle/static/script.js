const inputs = document.querySelector(".inputs"),
submitButton = document.querySelector(".submit-btn"),
resetButton = document.querySelector(".reset-btn"),
typingInput = document.querySelector(".typingInput");
let boxes = "";
boxes += '<input type="text" id="input1">' //make empty boxes to type in (5 characters cuz wordle uses that)
boxes += '<input type="text" id="input2">'
boxes += '<input type="text" id="input3">'
boxes += '<input type="text" id="input4">'
boxes += '<input type="text" id="input5">'
inputs.innerHTML = boxes;

function stuff(e){
    let key = e.target.value.toLowerCase();     
    for (let i = 1; i <= 5; i++) {
        let input = document.getElementById(`input${i}`);
        if (!input.value) {
            input.value = key; //goes through the boxes looking for empty one otheriwse break the loop!!!!
            break;
        }
    }
    typingInput.value = "";
    
}
function displayWords(words) {
    let stuff = document.querySelector('.results-container');
    stuff.innerHTML = words.join(' '); 
}
async function fetchstuff(word) {
    const response = await fetch('/wordfinder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', //fetch stuff
        },
        body: JSON.stringify({ word })
    });
    const data = await response.json();
    displayWords(data); 
}

typingInput.addEventListener("input", stuff);
inputs.addEventListener("click", () => typingInput.focus());
submitButton.addEventListener("click", () => {
    let userInput = Array.from(inputs.querySelectorAll("input")).map(input => input.value).join(''); //get the data from the boxes and make it an array 
    fetchstuff(userInput);
});
resetButton.addEventListener("click", () => {
    let inputFields = inputs.querySelectorAll("input");
    inputFields.forEach(input => {
        input.value = "";
    });
    let stuff = document.querySelector('.results-container');
    stuff.innerHTML = '';
});

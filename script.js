// spell-checker: disable

let selectedPrompts = {
    "mathy":[],
    "funny":[],
    "normal":[]
};
let allPrompts = {};
let promptsLoaded = false;

function main() {
    // Funny Button
    const funnyButton = document.getElementById('funny-button');
    funnyButton.addEventListener('click', function() {
        randomPrompt('funny');
    });

    // Mathy button
    const mathyButton = document.getElementById('mathy-button');
    mathyButton.addEventListener('click', function() {
        randomPrompt('mathy');
    });

    // Normal button
    const normalButton = document.getElementById('normal-button');
    normalButton.addEventListener('click', function() {
        randomPrompt('normal');
    });
} // main

async function loadPrompts() {
    try {
        let response = await fetch('player_prompts.json');
        let prompts = await response.json();
        return prompts;
    } catch (error) {
        console.log(error);
    }
} // loadPrompts

async function randomPrompt(category) {
    // Disable buttons until selection is completed.
    const allButtons = document.getElementsByClassName('random-button');
    for (let i = 0; i < allButtons.length; i++) {
        allButtons.disabled = true;
    } // for

    if (!promptsLoaded) {
        allPrompts = await loadPrompts().then( data => {return data});
        promptsLoaded = true;
    }
    const thisCategoryPrompts = allPrompts[category];
    const outputElement = document.getElementById('output');
    
    // Ensure no repeated prompts
    let thisPrompt;
    while (true) {
        thisPrompt = thisCategoryPrompts[Math.floor(Math.random()*thisCategoryPrompts.length)];

        if (!selectedPrompts[category].includes(thisPrompt)) {
            // Add prompt to list of "used prompts" and display on page
            console.log(thisPrompt);
            selectedPrompts[category].push(thisPrompt);
            outputElement.innerHTML = thisPrompt;

            // Add background and border-radius to div
            // outputElement.classList.add('output-active');

            break;

        } else if (selectedPrompts[category].length == thisCategoryPrompts.length) {
            // User has gone through everything!
            console.log('User has run through all prompts. Resetting...')
            selectedPrompts[category] = [thisPrompt];
        } // if-else-if
        
    } // while-true

    // Re-enable buttons
    for (let i = 0; i < allButtons.length; i++) {
        allButtons.disabled = false;
    }

} // randomPrompt
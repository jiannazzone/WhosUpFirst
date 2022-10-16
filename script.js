let selectedPrompts = {
    "mathy":[],
    "funny":[]
};

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
}

async function loadPrompts() {
    try {
        let response = await fetch('player_prompts.json');
        let prompts = await response.json();
        return prompts;
    } catch (error) {
        console.log(error);
    }
}

async function randomPrompt(category) {
    const prompts = await loadPrompts().then( data => {return data});
    const thisCategoryPrompts = prompts[category];
    const outputElement = document.getElementById('output');
    
    // Ensure no repeated prompts
    while (true) {
        const thisPrompt = thisCategoryPrompts[Math.floor(Math.random()*thisCategoryPrompts.length)];
        
            if (!selectedPrompts[category].includes(thisPrompt)) {
                // Add prompt to list of "used prompts" and display on page
                console.log(thisPrompt);
                selectedPrompts[category].push(thisPrompt);
                outputElement.innerHTML = thisPrompt;
                break;
            } else if (selectedPrompts[category].length == thisCategoryPrompts.length) {
                // User has gone through everything!
                console.log('User has run through all prompts. Resetting...')
                selectedPrompts[category] = [];
            }
        
    }

}
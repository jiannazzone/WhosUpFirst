function main() {
    const funnyButton = document.getElementById('funny-button');
    // console.log(funnyButton);
    funnyButton.addEventListener('click', function() {
        randomPrompt('funny');
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
    const thisPrompt = thisCategoryPrompts[Math.floor(Math.random()*thisCategoryPrompts.length)];
    console.log(thisPrompt);
}
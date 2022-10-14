(async () => {
    const prompts = loadPrompts().then( data => {return data});
    console.log(prompts); // #1
})();

async function loadPrompts() {
    try {
        let response = await fetch('player_prompts.json');
        let prompts = await response.json();
        console.log(prompts); // #2
        return prompts;
    } catch (error) {
        console.log(error);
    }
}
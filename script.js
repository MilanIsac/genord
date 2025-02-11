document.addEventListener("DOMContentLoaded", () => {
    const word = document.getElementById("word")
    const meaning = document.getElementById("meaning")
    const example = document.getElementById("example")
    const synonyms = document.getElementById("synonyms")
    const btn = document.getElementById("btn");

    async function getRandomWords() {
        try {
            const response = await fetch("/random-words");
            const data = await response.json();
            
            word.textContent = `${data.word}`
            meaning.textContent = ` ${data.meaning}`
            example.textContent = `${data.example}`
            synonyms.textContent = `${data.synonyms}`
                

        } catch (error) {
            console.log("Er ror fetching the word");
            word.textContent = "Error fetching the word. Try again."
        }
    }

    btn.addEventListener("click", getRandomWords);

    getRandomWords();
})
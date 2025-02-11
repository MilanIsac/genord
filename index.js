require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const randomWords = require("random-words");
// import randomWords from "randomWords";
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL;

app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/random-words", async (req, res) => {
    const word = randomWords.generate();
    const api_url = `${API_URL}${word}`;

    try {
        const response = await axios.get(api_url);
        const data = response.data[0];

        const meaning = data.meanings[0]?.definitions[0]?.definition || "No any meanings available";
        const example = data.meanings[0]?.definitions[0]?.example || "No any examples available";
        const synonyms = data.meanings[0]?.definitions[0]?.synonym || "No any synonyms available";

        res.json({ word, meaning, example, synonyms });
    } catch (error) {
        res.json({ word, meaning: "No any meanings available", example: "No any examples available", synonyms: "No any synonyms available" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
    // console.log(randomWords); // Should log the function
    // console.log(randomWords()); // Should log a random word
})




// https://chat.deepseek.com/a/chat/s/3293d442-213b-439b-b79e-91f8a1f6efb1
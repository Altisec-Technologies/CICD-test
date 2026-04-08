// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//   res.send('Hello, CI/CD World!');
// });

// module.exports = app;

// if (require.main === module) {
//   app.listen(3000, () => {
//     console.log('App running on port 3000');
//   });
// }


/**
 * 🌐 Legendary Cybersecurity Facts API
 * Altisec-inspired minimal, CI/CD-ready design
 */// Old ES6
// import express from 'express';
// import fs from 'fs';
// import path from 'path';
// import morgan from 'morgan';
// import colors from 'colors';

// CommonJS version
const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const colors = require('colors');

const app = express();
app.use(morgan('dev'));

// Load 100+ cybersecurity facts
const factsFilePath = path.resolve('./cyberFacts.json');
let cyberFacts = [];
try {
  const data = fs.readFileSync(factsFilePath, 'utf-8');
  cyberFacts = JSON.parse(data);
  console.log(colors.green(`✅ Loaded ${cyberFacts.length} cybersecurity facts`));
} catch (err) {
  console.error(colors.red('⚠️ Failed to load cybersecurity facts:', err));
}

// Utility function: get a random fact
function getRandomFact() {
  if (!cyberFacts.length) return "No facts available right now!";
  return cyberFacts[Math.floor(Math.random() * cyberFacts.length)];
}

// Serve frontend (everything inline)
app.get('/', (req, res) => {
  const fact = getRandomFact();
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Legendary Cybersecurity Facts</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

        * { margin:0; padding:0; box-sizing:border-box; }
        body {
          font-family: 'Roboto', sans-serif;
          background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          color: #fff;
        }
        .container {
          background: rgba(0,0,0,0.6);
          padding: 2.5rem 3rem;
          border-radius: 15px;
          text-align: center;
          box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
          max-width: 600px;
          transition: transform 0.3s ease;
        }
        .container:hover {
          transform: scale(1.02);
        }
        h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          text-shadow: 0 0 10px #0ff;
        }
        p.fact {
          font-size: 1.4rem;
          margin-bottom: 2rem;
          line-height: 1.5;
          color: #0ff;
        }
        button {
          padding: 0.7rem 1.5rem;
          font-size: 1.1rem;
          background-color: #0ff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          color: #000;
          font-weight: bold;
          box-shadow: 0 0 15px #0ff88;
          transition: all 0.3s ease;
        }
        button:hover {
          background-color: #00ffffaa;
          transform: scale(1.1);
          box-shadow: 0 0 25px #0ff;
        }
        footer {
          margin-top: 1.5rem;
          font-size: 0.9rem;
          color: #0ff88;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🌐 Altisec Cybersecurity Fact</h1>
        <p class="fact" id="fact">${fact}</p>
        <button onclick="getNewFact()">Get Another Fact</button>
        <footer>Altisec-inspired minimal design</footer>
      </div>
      <script>
        async function getNewFact() {
          try {
            const res = await fetch('/api/fact');
            const data = await res.json();
            document.getElementById('fact').innerText = data.fact;
          } catch (err) {
            console.error(err);
            document.getElementById('fact').innerText = "Failed to load new fact.";
          }
        }
      </script>
    </body>
    </html>
  `);
});

// API route for frontend JS to fetch new facts dynamically
app.get('/api/fact', (req, res) => {
  res.json({ fact: getRandomFact() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(colors.cyan(`✨ Server running on port ${PORT}`)));
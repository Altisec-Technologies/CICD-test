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
 */
import express from 'express';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import colors from 'colors';

const app = express();

// Logging middleware (clear, minimal, Altisec-style)
app.use(morgan('dev'));

// Load facts from JSON file
const factsFilePath = path.resolve('./cyberFacts.json');
let cyberFacts = [];

try {
  const data = fs.readFileSync(factsFilePath, 'utf-8');
  cyberFacts = JSON.parse(data);
  console.log(colors.green(`✅ Loaded ${cyberFacts.length} cybersecurity facts`));
} catch (error) {
  console.error(colors.red('⚠️ Failed to load cybersecurity facts:', error));
}

// Root endpoint: serves a random cybersecurity fact
app.get('/', (req, res) => {
  if (!cyberFacts.length) {
    return res.status(500).json({ message: 'No facts available. Try again later.' });
  }

  const randomFact = cyberFacts[Math.floor(Math.random() * cyberFacts.length)];
  res.status(200).json({
    message: "🌐 Legendary Cybersecurity Fact",
    fact: randomFact,
    source: "Global Cybersecurity Records",
    theme: "Altisec-inspired minimal design"
  });
});

// Export app for modular use (tests, CI/CD)
export default app;

// Start server if run directly
if (process.argv[1] === process.argv[1]) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(colors.cyan(`✨ Server running on port ${PORT}`));
  });
}
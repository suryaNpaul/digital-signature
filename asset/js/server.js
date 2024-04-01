const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/api/me', async (req, res) => {
  try {
    const apiKey = 'YWNjZXNzOmZmZmRkNWZiMjQ2NjFiOTJmOTkwNTk1NmEyMzU0ZjFl';
    const url = 'https://www.signwell.com/api/v1/me-h';

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

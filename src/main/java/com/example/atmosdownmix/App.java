const express = require('express');
const { downmix } = require('./ffmpegWrapper');

const app = express();
app.use(express.json());

app.post('/downmix', async (req, res) => {
  const { inputFile, options } = req.body;
  try {
    const result = await downmix(inputFile, options);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
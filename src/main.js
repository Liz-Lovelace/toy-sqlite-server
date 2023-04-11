import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const stuff = [];

app.post('/stuff', async (req, res) => {
  const newStuff = {
    id: uuidv4(),
    current_timestamp: new Date().toISOString(),
    message: req.body.message,
  };

  stuff.push(newStuff);
  res.status(201).send(newStuff);
});

app.get('/stuff', async (req, res) => {
  res.status(200).send(stuff);
});

app.delete('/stuff', async (req, res) => {
  stuff.length = 0;
  res.status(200).send({ message: 'All stuff items have been removed.' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

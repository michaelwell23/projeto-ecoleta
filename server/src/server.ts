import express from 'express';

const app = express();

app.get('/users', (request: any, response: any) => {
  console.log('Listagem de usuários');

  response.json([
    'Michael',
    'Carol',
    'Gabriel',
    'Gabriella',
    'Junior',
    'Rafael',
  ]);
});

const PORT = 3333;
app.listen(PORT, () => {
  console.log('Server listing on port', PORT);
});

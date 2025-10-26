
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());


let books = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin' },
  { id: 2, title: "You Don't Know JS", author: 'Kyle Simpson' },
  { id: 3, title: 'The Pragmatic Programmer', author: 'Andrew Hunt' }
];



// GET all
app.get('/books', (req, res) => {
  res.json(books);
});

// GET one
app.get('/books/:id', (req, res) => {
  const id = Number(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

// POST create
app.post('/books', (req, res) => {
  const { title, author } = req.body || {};
  if (!title || !author) {
    return res.status(400).json({ message: 'title and author are required' });
  }
  const newBook = { id: books.length ? Math.max(...books.map(b => b.id)) + 1 : 1, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update
app.put('/books/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = books.findIndex(b => b.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Book not found' });

  const { title, author } = req.body || {};
  books[idx] = {
    ...books[idx],
    title: title ?? books[idx].title,
    author: author ?? books[idx].author
  };
  res.json(books[idx]);
});

// DELETE
app.delete('/books/:id', (req, res) => {
  const id = Number(req.params.id);
  const before = books.length;
  books = books.filter(b => b.id !== id);
  if (books.length === before) {
    return res.status(404).json({ message: 'Book not found' });
  }
  res.json({ message: 'Book deleted successfully' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// handler.js
const books = require('./book');

// Handler untuk POST /books
const addBookHandler = (req, res) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;

  if (!name) {
    return res.status(400).send({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
  }

  if (readPage > pageCount) {
    return res.status(400).send({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
  }

  const id = Math.random().toString(36).substr(2, 9);
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: readPage === pageCount,
    reading,
    insertedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  books.push(newBook);

  res.status(201).send({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  });
};

// Handler untuk GET /books
const getBooksHandler = (req, res) => {
  res.status(200).send({
    status: 'success',
    data: {
      books: books.map(book => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
};

// Handler untuk GET /books/:bookId
const getBookByIdHandler = (req, res) => {
  const { bookId } = req.params;
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).send({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
  }

  res.status(200).send({
    status: 'success',
    data: {
      book,
    },
  });
};

// Handler untuk PUT /books/:bookId
const updateBookHandler = (req, res) => {
  const { bookId } = req.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;

  if (!name) {
    return res.status(400).send({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
  }

  if (readPage > pageCount) {
    return res.status(400).send({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
  }

  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).send({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
  }

  books[bookIndex] = {
    ...books[bookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished: readPage === pageCount,
    updatedAt: new Date().toISOString(),
  };

  res.status(200).send({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
};

// Handler untuk DELETE /books/:bookId
const deleteBookHandler = (req, res) => {
  const { bookId } = req.params;
  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).send({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
  }

  books.splice(bookIndex, 1);

  res.status(200).send({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });
};

module.exports = {
  addBookHandler,
  getBooksHandler,
  getBookByIdHandler,
  updateBookHandler,
  deleteBookHandler,
};

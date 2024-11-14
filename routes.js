// routes.js
const express = require('express');
const {
  addBookHandler,
  getBooksHandler,
  getBookByIdHandler,
  updateBookHandler,
  deleteBookHandler,
} = require('./handler');

const router = express.Router();

// Route untuk menambah buku
router.post('/books', addBookHandler);

// Route untuk menampilkan seluruh buku
router.get('/books', getBooksHandler);

// Route untuk menampilkan detail buku berdasarkan ID
router.get('/books/:bookId', getBookByIdHandler);

// Route untuk memperbarui buku berdasarkan ID
router.put('/books/:bookId', updateBookHandler);

// Route untuk menghapus buku berdasarkan ID
router.delete('/books/:bookId', deleteBookHandler);

module.exports = router;

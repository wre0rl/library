let library = [];

function Book(title, author, pages, read) {
	this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function addBook(title, author, pages, read) {
  library = [...library, new Book(title, author, pages, read)];
}

function getBooks() {
  for (const book of library) {
    showBook(book.title, book.author, book.pages, book.read)
  }
}

function showBook(title, author, pages, read) {
  const booksContainer = document.querySelector('.main');
  const book = document.createElement('div');
  book.setAttribute('class', 'main__item');
  booksContainer.appendChild(book);
  
  const bookTitle = document.createElement('div');
  bookTitle.setAttribute('class', 'main__item-title');
  book.appendChild(bookTitle);
  bookTitle.innerText = title;

  const bookAuthor = document.createElement('div');
  bookAuthor.setAttribute('class', 'main__item-author');
  book.appendChild(bookAuthor);
  bookAuthor.innerText = author;

  const bookPages = document.createElement('div');
  bookPages.setAttribute('class', 'main__item-pages');
  book.appendChild(bookPages);
  bookPages.innerText = `${pages} pages`;

  const bookRead = document.createElement('div');
  bookRead.setAttribute('class', 'main__item-read');
  book.appendChild(bookRead);
  bookRead.innerText = read;
}

function deleteBook(index) {
  library.splice(index, 1);
}

addBook('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBook('Six of Crows', 'Leigh Bardugo', 496, true);
getBooks();
//deleteBook(0);
//getBooks();
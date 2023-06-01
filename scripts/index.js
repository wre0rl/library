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
  bookAuthor.innerText = `by ${author}`;

  const bookPages = document.createElement('div');
  bookPages.setAttribute('class', 'main__item-pages');
  book.appendChild(bookPages);
  bookPages.innerText = `${pages}`;

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
addBook('Atomic Habits', 'James Clear', 288, false);
addBook('Intelligent Design', 'William Dembski', 312, false);
addBook('Blink', 'Malcolm Gladwell', 244, false);
addBook('Factfulness', 'Malcolm Gladwell', 244, false);
addBook('Eat That Frog', 'Brian Tracy', 144, false);
addBook('The Alchemist', 'Paulo Coelho', 208, false);
addBook('The Last Wish', 'Andrzej Sapkowski', 288, false);
addBook('1984', 'George Orwell', 328, false);
addBook('On the Road', 'Jack Kerouac', 307, false);
addBook('Baptism of Fire', 'Andrzej Sapkowski', 343, false);
addBook('Time of Contempt', 'Andrzej Sapkowski', 331, false);
getBooks();
//deleteBook(0);
//getBooks();
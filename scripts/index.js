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
    console.log(book.author);
  }
}

addBook('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBook('Six of Crows', 'Leigh Bardugo', 496, true);
getBooks();
let library = [];

function Book(title, author, pages, isRead) {
	this.title = title
  this.author = author
  this.pages = pages
  this.isRead = isRead
}

Book.prototype.toggleReadStatus = function() {
  this.isRead = !this.isRead;
}

function addBook(title, author, pages, isRead) {
  library = [...library, new Book(title, author, pages, isRead)];
}

function getBooks() {
  for (const book of library) {
    showBook(book.title, book.author, book.pages, book.isRead)
  }
}

function showBook(title, author, pages, isRead) {
  const booksContainer = document.querySelector('.main');
  const book = document.createElement('div');
  book.setAttribute('class', 'main__item');
  booksContainer.appendChild(book);

  const bookHeader = document.createElement('div');
  bookHeader.setAttribute('class', 'main__item-header');
  book.appendChild(bookHeader);
  const bookDeleteImg = document.createElement('img');
  bookDeleteImg.setAttribute('class', 'main__item-header-delete');
  bookDeleteImg.setAttribute('src', 'images/icons/close.svg');
  bookHeader.appendChild(bookDeleteImg);
  const bookToggleReadImg = document.createElement('img');
  const imgSrc = isRead ? 'eye-check-outline' : 'eye-remove-outline';
  bookToggleReadImg.setAttribute('class', 'main__item-header-read-status');
  bookToggleReadImg.setAttribute('src', `images/icons/${imgSrc}.svg`);
  bookHeader.appendChild(bookToggleReadImg);
  
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
  bookRead.innerText = isRead;
}

function deleteBook(title) {
  index = library.findIndex(book => book.title === title);
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

const modal = document.querySelector('.modal');
const closeModalButton = document.querySelector('.form__button-close');
const deleteModal = document.querySelector('.modal__delete');
const deleteButton = 'main__item-header-delete';
const toggleReadStatusButton = 'main__item-header-read-status';
const closeDeleteModalButton = document.querySelector('.modal__delete-button-close');
const submitDeleteModalButton = document.querySelector('.modal__delete-button-submit');
const form = document.querySelector('.form');
const newBookButton = document.querySelector('.new');
let thisTitle = '';

// listen to document instead each of deleteButton e.g deleteButtons.foreach()
// so it can listen to new dynamically created element
document.addEventListener("click", function(e){
  const target = e.target.className;
  
  if (target === deleteButton) {
    thisTitle = e.target.parentElement.nextElementSibling;
    deleteModal.showModal();
  }

  if (target === toggleReadStatusButton) {
    thisTitle = e.target.parentElement.nextElementSibling;
    const index = library.findIndex(book => book.title === thisTitle.innerText);
    library[index].toggleReadStatus();

    // Rerender
    const bookToggleReadImg = thisTitle.previousElementSibling.lastChild;
    const imgSrc = library[index].isRead ? 'eye-check-outline' : 'eye-remove-outline';
    bookToggleReadImg.setAttribute('class', 'main__item-header-read-status');
    bookToggleReadImg.setAttribute('src', `images/icons/${imgSrc}.svg`);

    const readStatus = thisTitle.parentElement.lastChild;
    readStatus.innerText = library[index].isRead;
  }
});

closeDeleteModalButton.addEventListener('click', () => {
  deleteModal.close();
});

submitDeleteModalButton.addEventListener('click', () => {
  deleteBook(thisTitle.innerText);
  thisTitle.parentElement.remove(); // Delete the element from html
  deleteModal.close();
});

newBookButton.addEventListener('click', () => {
  modal.showModal();
});

closeModalButton.addEventListener('click', () => {
  modal.close();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target).entries());
  const readStatus = data.isRead === 'on' ? true : false;
  
  addBook(data.title, data.author, data.pages, readStatus);
  showBook(data.title, data.author, data.pages, readStatus);
  form.reset();
  modal.close();
});
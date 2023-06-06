class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  toggleRead() {
    this.isRead = !this.isRead;
  }
}

class Library {
  books = [];

  add(book) {
    this.books.push(book);
  }

  remove(title) {
    this.books = this.books.filter((book) => book.title !== title);
  }

  get() {
    return this.books;
  }

  findIndex(title) {
    return this.books.findIndex(book => book.title === title);
  }
}

const Render = (function() {
  const libraryContainer = document.querySelector('.main');

  const render = (book) => {
    //console.log(library.get());
    const bookContainer = createBookContainer(libraryContainer);
    const actionsDiv = createActionsDiv(bookContainer);
    createDeleteButton(actionsDiv);
    createReadButton(actionsDiv, book.isRead);
    
    for (const key in book) {
      const el = document.createElement('div');
      el.setAttribute('class', `main__item-${key}`);
      el.innerText = book[key];
      bookContainer.appendChild(el);
    }
  };

  const createBookContainer = (parent) => {
    const bookContainer = document.createElement('div');
    bookContainer.classList.add('main__item');
    parent.appendChild(bookContainer);
    return bookContainer;
  };

  const createActionsDiv = (parent) => {
    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('main__item-header');
    parent.appendChild(actionsDiv);
    return actionsDiv;
  };

  const createDeleteButton = (parent) => {
    const deleteButton = document.createElement('img');
    deleteButton.classList.add('main__item-header-delete');
    deleteButton.setAttribute('src', 'images/icons/close.svg');
    parent.appendChild(deleteButton);
  }

  const createReadButton = (parent, isRead) => {
    const readButton = document.createElement('img');
    readButton.classList.add('main__item-header-read-status');
    decideReadIcon(readButton, isRead);
    parent.appendChild(readButton);
  }

  const decideReadIcon = (iconDiv, isRead) => {
    const icon = isRead ? 'eye-check-outline' : 'eye-remove-outline';
    iconDiv.setAttribute('src', `images/icons/${icon}.svg`);
  };

  const updateReadText = (div, isRead) => {
    const isReadDiv = div.parentElement.lastChild;
    isReadDiv.innerText = isRead;
  }

  const unrender = (book) => book.parentElement.remove();

  return {
    render,
    unrender,
    decideReadIcon,
    updateReadText
  }
})();

const DOM = (function() {
  const form = document.querySelector('.form');
  const formModal = document.querySelector('.modal');
  const formModalAddButton = document.querySelector('.new');
  const formModalCloseButton = document.querySelector('.form__button-close');
  const bookContainer = document.querySelector('.main');
  const deleteModal = document.querySelector('.modal__delete');
  const deleteModalCloseButton = document.querySelector('.modal__delete-button-close');
  const deleteModalSubmitButton = document.querySelector('.modal__delete-button-submit');

  // Book title tracker for reference
  let clickedBookTitle = '';

  // Bind Events
  form.addEventListener('submit', (e) => handleSubmit(e, formModal));
  formModalAddButton.addEventListener('click', () => showModal(formModal));
  formModalCloseButton.addEventListener('click', () => hideModal(formModal));
  bookContainer.addEventListener('click', (e) => handleActions(e));
  deleteModalCloseButton.addEventListener('click', () => hideModal(deleteModal));
  deleteModalSubmitButton.addEventListener('click', (e) => handleDelete(e));
  
  const showModal = (modal) => {
    modal.showModal();
  }

  const hideModal = (modal) => {
    modal.close();
  };

  const handleSubmit = (e, modal) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target).entries());
    const isRead = data.read === 'on' ? true : false;
    const book = new Book(data.title, data.author, data.pages, isRead);
    library.add(book);
    Render.render(book);
    form.reset();
    hideModal(modal);
  };

  const handleDelete = (e) => {
    const book = getClickedTitle();
    const title = book.innerText;
    library.remove(title);
    hideModal(deleteModal);
    Render.unrender(book);
    //console.log(library.get());
  };

  const setClickedTitle = (e) => {
    clickedBookTitle = e.target.parentElement.nextElementSibling;
  };

  const getClickedTitle = () => clickedBookTitle;

  const handleActions = (e) => {
    const deleteButtonClass = '.main__item-header-delete';
    const readButtonClass = '.main__item-header-read-status';
    console.log();
    if (e.target.matches(deleteButtonClass)) {
      showModal(deleteModal);
      setClickedTitle(e);
      return;
    }

    if (e.target.matches(readButtonClass)) {
      setClickedTitle(e);
      const titleDiv = getClickedTitle();
      const titleText = titleDiv.innerText;  
      const booksInLibrary = library.get();
      const bookIndex = library.findIndex(titleText);
      const book = booksInLibrary[bookIndex];
      book.toggleRead();
      Render.decideReadIcon(titleDiv.previousElementSibling.lastChild, book.isRead);
      Render.updateReadText(titleDiv, book.isRead);
      return;
    }
  };
})();

// Init
const library = new Library();
const books = [
  new Book('The Hobbit', 'J.R.R. Tolkien', 295, false),
  new Book('To Kill a Mockingbird', 'Harper Lee', 281, true),
  new Book('1984', 'George Orwell', 328, true),
  new Book('Pride and Prejudice', 'Jane Austen', 279, true),
  new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, false),
  new Book('The Catcher in the Rye', 'J.D. Salinger', 277, false),
  new Book('One Hundred Years of Solitude', 'Gabriel Garcia Marquez', 417, false),
  new Book('War and Peace', 'Leo Tolstoy', 1392, false),
  new Book('The Lord of the Rings', 'J.R.R. Tolkien', 1178, true),
  new Book('Animal Farm', 'George Orwell', 112, true),
  new Book('The Picture of Dorian Gray', 'Oscar Wilde', 254, true),
  new Book('Brave New World', 'Aldous Huxley', 311, false)
];

for (const book of books) {
  library.add(book);
  Render.render(book);
}

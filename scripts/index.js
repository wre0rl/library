const Mediator = (function() {
  const subscribers = {};

  function subscribe(eventType, fn) {
    if (!subscribers[eventType]) {
      subscribers[eventType] = [];
    }
    subscribers[eventType].push(fn);
  };

  function unsubscribe(eventType, fn) {
    subscribers[eventType] = subscribers[eventType].filter(
      subscriber => subscriber !== fn
    );
  };

  function publish(eventType, data) {
    if (!subscribers[eventType]) {
      return;
    }
    subscribers[eventType].forEach(subscriber => subscriber(data));
  };

  return {
    subscribe,
    unsubscribe,
    publish
  };
})();

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
    Mediator.publish('bookAdded', book);
  }

  remove(title) {
    this.books = this.books.filter((book) => book.title !== title);
  }

  get() {
    return this.books;
  }
}

const Render = (function() {
  const libraryContainer = document.querySelector('.main');

  const render = (book) => {
    console.log(library.get());
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
    const readIcon = isRead ? 'eye-check-outline' : 'eye-remove-outline';
    readButton.classList.add('main__item-header-read-status');
    readButton.setAttribute('src', `images/icons/${readIcon}.svg`);
    parent.appendChild(readButton);
  }

  const unrender = (book) => book.parentElement.remove();

  Mediator.subscribe('bookAdded', render);

  return {
    unrender
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
    form.reset();
    hideModal(modal);
  };

  function handleDelete(e) {
    const book = getClickedTitle();
    const title = book.innerText;
    library.remove(title);
    hideModal(deleteModal);
    Render.unrender(book);
    console.log(library.get());
  };

  const setClickedTitle = (e) => {
    clickedBookTitle = e.target.parentElement.nextElementSibling;
  };

  const getClickedTitle = () => clickedBookTitle;

  const handleActions = (e) => {
    const deleteButtonClass = '.main__item-header-delete';
    //const readButtonClass = '.main__item-header-read-status';
    console.log();
    if (e.target.matches(deleteButtonClass)) {
      showModal(deleteModal);
      setClickedTitle(e);
    }
  };
})();

// Init
const library = new Library();
const book = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
library.add(book);
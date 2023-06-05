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

const UI = (function() {
  const libraryContainer = document.querySelector('.main');

  const render = (book) => {
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
    deleteButton.classList.add('.main__item-header-delete');
    deleteButton.setAttribute('class', 'main__item-header-delete');
    deleteButton.setAttribute('src', 'images/icons/close.svg');
    parent.appendChild(deleteButton);
  }

  const createReadButton = (parent, isRead) => {
    const isReadButton = document.createElement('img');
    const isReadIcon = isRead ? 'eye-check-outline' : 'eye-remove-outline';
    isReadButton.classList.add('.main__item-header-delete');
    isReadButton.setAttribute('class', 'main__item-header-read-status');
    isReadButton.setAttribute('src', `images/icons/${isReadIcon}.svg`);
    parent.appendChild(isReadButton);
  }

  Mediator.subscribe('bookAdded', render);
})();

const library = new Library();
const book = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
library.add(book);
//library.remove(book.title);
//console.log(library.get());
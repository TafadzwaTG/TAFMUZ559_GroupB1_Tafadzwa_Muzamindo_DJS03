// Import data and constants from external module
import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";

//Interfaces
class IBook {
  createPreviewButton() {}
}

class IBookList {
  // Interface methods for managing book list
  appendBooksToFragment() {}
  updateBookList() {}
  updateShowMoreButton() {}
  handleSearchFormSubmit() {}
  handleShowMoreButtonClick() {}
}

class IThemeManager {
  //Interface methods for managing themes
  static setTheme() {}
  static handleSettingsFormSubmit() {}
}
// Data service to fetch books, authors, and genres
class DataService {
  static fetchBooks() {
    return books;
  }
  static fetchAuthors() {
    return authors;
  }
  static fetchGenres() {
    return genres;
  }
}

//Book Class adheres to IBook interface
class Book extends IBook {
  constructor({ author, id, image, title, published, description }) {
    super();
    this.author = author;
    this.id = id;
    this.image = image;
    this.title = title;
    this.published = published;
    this.description = description;
  }
  // Method to create a preview button for a book
  createPreviewButton() {
    const element = document.createElement("button");
    element.classList = "preview";
    element.setAttribute("data-preview", this.id);

    element.innerHTML = `
        <img
            class="preview__image"
            src="${this.image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${this.title}</h3>
            <div class="preview__author">${authors[this.author]}</div>
        </div>
    `;

    return element;
  }
}
//Booklist class adheres to IBookList interface
class Booklist extends IBookList {
  constructor(books) {
    super();
    this.books = books;
    this.page = 1;
    this.matches = books;
  }
  // Append books to a document fragment
  appendBooksToFragment(fragment, start = 0, end = BOOKS_PER_PAGE) {
    for (const book of this.matches.slice(start, end)) {
      const bookInstance = new Book(book);
      fragment.appendChild(bookInstance.createPreviewButton());
    }
  }
  // Update the displayed book list
  updateBookList() {
    const fragment = document.createDocumentFragment();
    this.appendBooksToFragment(fragment);
    document.querySelector("[data-list-items]").appendChild(fragment);
  }
  // Updated the show more button based on remaining books
  updateShowMoreButton() {
    const remaining = this.matches.length - this.page * BOOKS_PER_PAGE;
    document.querySelector("[data-list-button]").innerText =
      `Show more (${remaining})`;
    document.querySelector("[data-list-button]").disabled = remaining <= 0;
  }
  // Handle form submission for book search
  handleSearchFormSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);

    // Filter books based on form input
    this.matches = this.books.filter(book => {
        const genreMatch = filters.genre === 'any' || book.genres.includes(filters.genre);
        const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());
        const authorMatch = filters.author === 'any' || book.author === filters.author;

        return genreMatch && titleMatch && authorMatch;

    });
    // Reset page and update UI elements
    this.page = 1;
     const listMessageElement = document.querySelector('[data-list-message]');
     if(listMessageElement) {
        listMessageElement.classList.toggle('list__message_show', this.matches.length < 1);
     }
    const listItemsElement = document.querySelector('[data-list-items]');
    if (listItemsElement) {
        listItemsElement.innerHTML = '';
    this.updateBookList();
    this.updateShowMoreButton();
    window.scrollTo({top: 0, behavior: 'smooth'});
    }
    OverlayManager.closeOverlay('[data-search-overlay]');
 }
// Handle show more button click to load more books
 handleShowMoreButtonClick(){
    const fragment = document.createDocumentFragment();
    this.appendBooksToFragment(fragment, this.page * BOOKS_PER_PAGE, (this.page + 1) * BOOKS_PER_PAGE);
    document.querySelector('[data-list-items]').appendChild(fragment);
    this.page += 1;
    this.updateShowMoreButton();
 }
}
 //Dropdown class for managing dropdowns
 class IDropdown {
  // Static method to create dropdown options from data
    static createDropdownOptions(data, firstOptionText) {
        const fragment = document.createDocumentFragment();
        const firstOption = document.createElement('option');
        firstOption.value ='any';
        firstOption.innerText = firstOptionText;
        fragment.appendChild(firstOption);

        // Create options from data entries

        for (const [id, name] of Object.entries(data)) {
            const option = document.createElement('option');
            option.value = id;
            option.innerText = name;
            fragment.appendChild(option);
        }
        return fragment;
    }
    // Initialize dropdowns with data
    static initializeDropdowns(){
        document.querySelector('[data-search-genres]').appendChild(this.createDropdownOptions(DataService.fetchGenres(), 'All Genres'));
        document.querySelector('[data-search-authors]').appendChild(this.createDropdownOptions(DataService.fetchAuthors(), 'All Authors'));
     
    }
 }
 // ThemeManager class adheres to IThemeManager interface
 class ThemeManager extends IThemeManager {
  
  // Set theme based on user preferences
   static setTheme() {
     if (
       window.matchMedia &&
       window.matchMedia('(prefers-color-scheme: dark)').matches
     ) {
       document.querySelector('[data-settings-theme]').value = "night";
       document.documentElement.style.setProperty(
         "--color-dark",
         "255, 255, 255"
       );
       document.documentElement.style.setProperty(
         "--color-light",
         "10, 10, 20"
       );
     } else {
       document.querySelector("[data-settings-theme]").value = "day";
       document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
       document.documentElement.style.setProperty(
         "--color-light",
         "255, 255, 255"
       );
     }
   }

   // Handle form submission for theme settings
   static handleSettingsFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);

//Apply selected theme
    if (theme === "night") {
      document.documentElement.style.setProperty(
        "--color-dark",
        "255, 255, 255"
      );
      document.documentElement.style.setProperty("--color-light", "10, 10, 20");
    } else {
      document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
      document.documentElement.style.setProperty(
        "--color-light",
        "255, 255, 255"
      );
    }

    OverlayManager.closeOverlay('[data-settings-overlay]');
   }
 }
// CloseOverlay class adheres to IDdropdown interface

class OverlayManager {
  //close an overlay based on selector
  static closeOverlay(selector) {
    document.querySelector(selector).open = false;
  }
  // open an overlay and optionally focus on an element
  static openOverlay(selector, focusSelector = null) {
    document.querySelector(selector).open = true;
    if (focusSelector) {
      document.querySelector(focusSelector).focus();
    }
  }
}

// Handle click on a book preview
function handlePreviewClick(event) {
  const pathArray = Array.from(event.path || event.composedPath());
  const previewElement = pathArray.find((node) => node?.dataset?.preview);

  if (previewElement) {
    const book = books.find(
      (book) => book.id === previewElement.dataset.preview
    );
    if (book) {
      document.querySelector("[data-list-active]").open = true;
      document.querySelector("[data-list-blur]").src = book.image;
      document.querySelector("[data-list-image]").src = book.image;
      document.querySelector("[data-list-title]").innerText = book.title;
      document.querySelector("[data-list-subtitle]").innerText =
        `${authors[book.author]} (${new Date(book.published).getFullYear()})`;
      document.querySelector("[data-list-description]").innerText =
       book.description;
    }
  }
}

// Initialize the app
document.addEventListener('DOMContentLoaded',  () =>{
    const bookList = new Booklist(DataService.fetchBooks());

// Intialize book list with initial books
    const startingFragment = document.createDocumentFragment();
    bookList.appendBooksToFragment(startingFragment);
    document.querySelector('[data-list-items]').appendChild(startingFragment);

// Intialize dropdowns and theme
    IDropdown.initializeDropdowns();
    ThemeManager.setTheme();
    
    // Event listeners for overlays, forms, and buttons
    document.querySelector('[data-search-cancel]').addEventListener('click', () => OverlayManager.closeOverlay('[data-search-overlay]'));
    document.querySelector('[data-settings-cancel]').addEventListener('click', () => OverlayManager.closeOverlay('[data-settings-overlay]'));
    document.querySelector('[data-header-search]').addEventListener('click', () => OverlayManager.openOverlay('[data-search-overlay]', '[data-search-title]'));
    document.querySelector('[data-header-settings]').addEventListener('click', () => OverlayManager.openOverlay('[data-settings-overlay]'));
    document.querySelector('[data-list-close]').addEventListener('click', () => OverlayManager.closeOverlay('[data-list-active]'));

    document.querySelector('[data-settings-form]').addEventListener('submit', ThemeManager.handleSettingsFormSubmit);
    document.querySelector('[data-search-form]').addEventListener('submit', event => bookList.handleSearchFormSubmit(event));
    document.querySelector('[data-list-button]').addEventListener('click', () => bookList.handleShowMoreButtonClick());
    document.querySelector('[data-list-items]').addEventListener('click', handlePreviewClick);

});



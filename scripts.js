//The main purpose of our scripts will be threefold. Adding a button on the side of each moused-over row to
//have the ability of deleting books from the list. Having a working button than, when pressed, brings up a
//form to enter the info of a new book. Handling the output of the form to, instead of sending the data to
//a non-existing server, add a new row w/the info of the book.

/**
 * @type {array} - Saves all books introduced by the user.
 */
let myLibrary = [];

/**This function creates book objects.
 * @param {string} title - Title of the book
 * @param {string} author - Name of the author(s)
 * @param {string} pages - Number of pages
 * @param {boolean} read - Wether the book has been read by us or not
 * @returns {object}
 */
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;  //this last one should be a true or false
    myLibrary.push(this); //stores the book to our array
}

/**
 * This function adds a new book to our array upon press of a button, after filling up the form.
 */
function addToLibrary() {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read').value;
    return new Book(title, author, pages, read);
}

/**This function adds all the book info to a new row on our list, upon call. IN REWORK
     * @returns {div}
     */
function newRow(book) {
    const content1 = document.createElement('div');
    content1.textContent = `${book.title}`;
    container.appendChild(content1);
    // alert('newrow enabled');
    const content2 = document.createElement('div');
    content2.textContent = `${book.author}`;
    container.appendChild(content2);

    const content3 = document.createElement('div');
    content3.textContent = `${book.title}`;
    container.appendChild(content3);

    const content4 = document.createElement('div');
    content4.textContent = `${book.pages}`;
    container.appendChild(content4);

    const content5 = document.createElement('div');
    if (book.read === true) {
        content5.textContent = 'Yes';
    }
    else {
        content5.textContent = 'No';
    }
    container.appendChild(content5);
}

const dialog = document.getElementById('modal')
function modalPopup() {
    //alert('Popup works')
    dialog.showModal();
}

const container = document.getElementById('dataContainer');

const newBookButton = document.getElementById('addBookBtn');
newBookButton.addEventListener('click', modalPopup);

const form = document.getElementById('signUpForm');
form.addEventListener('submit', function(event) {
    event.preventDefault;
    addToLibrary();
})

// const submitButton = document.getElementById('submitButton');
// submitButton.addEventListener('click', addToLibrary());

//in this strip I should add  the code that creates new book entries
const book1 = new Book('The Hobbit', 'J.R.R Tolkien', '295', false);
const book2 = new Book('Peter Capusotto: El Libro', 'Diego Capusotto & Pedro Saborido', '237', true);
const book3 = new Book('World War Z', 'Max Brooks', '457', true);
const book4 = new Book('El Eternauta', 'Hector G Oesterheld & Francisco Solano Lopez', '351', false);
console.log(myLibrary)
//it should finish here
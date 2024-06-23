//The main purpose of our scripts will be threefold. Adding a button on the side of each moused-over row to
//have the ability of deleting books from the list. Having a working button than, when pressed, brings up a
//submitDataButton to enter the info of a new book. Handling the output of the submitDataButton to, instead of sending the data to
//a non-existing server, add a new row w/the info of the book.

//This time around, I will add as a starting point what the exercise demands the page to contain:

/**
 * @var {Array} - This array veriable will contain our stored book info
 */
let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    // the constructor...
}

/**
 * Upon being called, this function removes all content from the container div we've set up as our library
 * and it fills it with every object found currently in our myLibrary array. 
 */
function render() {
    let container = document.getElementById('library');
    container.innerHTML = '';
    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];
        let wrapperElement = document.createElement('div');
        wrapperElement.setAttribute('class', 'bookCard');
        wrapperElement.innerHTML = `
        <div class="cardHeader">
            <h3 class="bookTitle">${book.title}</h3>
            <h5 class="author">by ${book.author}</h5>
        </div>

        <div class="cardBody">
            <p>${book.pages} pages.</p>
            <p>${book.read ? 'Read' : 'Not read yet'}</p>
        </div>
        `;
        container.appendChild(wrapperElement);
    }
}

/**
 * This funtion takes the current values that have been input to our form, creates a new book object out of 
 * that data and stores it to our myLibrary array.
 */
function addBookToLibrary() {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read').checked;
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    imputForm.style.display = 'none';
    render();
    // console.log(myLibrary);
    // do stuff here
}

/**
 * This object variable containsthe input form, but is mostly used so that we can add the functionality we
 * need to the submit button
 */
const imputForm = document.getElementById('newBookInputForm')
imputForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addBookToLibrary();
})

/**
 * This object variable contains the button that shows the hidden form where the user inputs data to add
 * a new book to our array.
 */
const newBookButton = document.getElementById('newBookButton');
newBookButton.addEventListener('click', () => {
    imputForm.style.display = 'block';
})


//added some pre-loaded books so it looks better and to test all is working
const book1 = new Book('The Hobbit', 'J.R.R Tolkien', '295', false);
const book2 = new Book('Peter Capusotto: El Libro', 'Diego Capusotto & Pedro Saborido', '237', true);
const book3 = new Book('World War Z', 'Max Brooks', '457', true);
const book4 = new Book('El Eternauta', 'Hector G Oesterheld & Francisco Solano Lopez', '351', false);
myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
myLibrary.push(book4);
render();
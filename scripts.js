//The main purpose of our scripts will be threefold. Adding a button on the side of each moused-over row to
//have the ability of deleting books from the list. Having a working button than, when pressed, brings up a
//submitDataButton to enter the info of a new book. Handling the output of the submitDataButton to, instead of sending the data to
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
 * This function adds a new book to our array upon press of a button, after filling up the submitDataButton. (ADD CHECK FOR EMPTY VALUES)
 */
function addToLibrary() {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read').checked;
    return new Book(title, author, pages, read);
}

/**This function adds all the book info to a new row on our list, upon call.
     * @returns {div}
     */
function newRow(book) {
    const wrapper = document.createElement('div');
    const content1 = document.createElement('div');
    content1.textContent = `${book.title}`;
    wrapper.appendChild(content1);

    const content2 = document.createElement('div');
    content2.textContent = `${book.author}`;
    wrapper.appendChild(content2);

    const content3 = document.createElement('div');
    content3.textContent = `${book.title}`;
    wrapper.appendChild(content3);

    const content4 = document.createElement('div');
    content4.textContent = `${book.pages}`;
    wrapper.appendChild(content4);

    const content5 = document.createElement('div');
    if (book.read === true) {
        content5.textContent = 'Yes';
    }
    else {
        content5.textContent = 'No';
    }
    wrapper.appendChild(content5);

    wrapper.addEventListener('click', (event) => {
        if (content5.textContent === 'Yes') {
            content5.textContent = 'No';
        }
        else {
            content5.textContent = 'Yes';
        }
    })
    wrapper.addEventListener('mouseenter', (event) => { //breakthrough! inside this we should put code that makes button appear/disappear
        console.log('entered');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete Book?';
        wrapper.appendChild(deleteButton);
    });
    wrapper.addEventListener('mouseleave', (event) => {
        wrapper.removeChild(wrapper.lastChild);
    })
    container.appendChild(wrapper);
}

/**
 * This funtion cycles through our book array and executes a function on a book-by-book basis
 */
function render() {
    container.innerHTML = '';
    myLibrary.forEach((book) => {
        newRow(book);
    })
};

const container = document.getElementById('dataContainer');

const dialog = document.getElementById('modal');

const openModalButton = document.getElementById('addBookBtn');
openModalButton.addEventListener('click', function (e) {
    dialog.showModal();
});

const submitDataButton = document.getElementById('submitButton');
submitDataButton.addEventListener('click', function (event) {
    event.preventDefault;
    addToLibrary();
    render();
    dialog.close();
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('read').checked = false;
})

const closeModalButton = document.getElementById('closeButton');
closeModalButton.addEventListener('click', function (e) {
    dialog.close();
})

//added some pre-loaded books so it looks better and to test all is working
const book1 = new Book('The Hobbit', 'J.R.R Tolkien', '295', false);
const book2 = new Book('Peter Capusotto: El Libro', 'Diego Capusotto & Pedro Saborido', '237', true);
const book3 = new Book('World War Z', 'Max Brooks', '457', true);
const book4 = new Book('El Eternauta', 'Hector G Oesterheld & Francisco Solano Lopez', '351', false);
console.log(myLibrary);
render();

//trying to implement a remove button

function removeButton(index) {
    myLibrary.splice(index, 1);
    render();
}
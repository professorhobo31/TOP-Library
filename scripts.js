//The main purpose of our scripts will be threefold. Adding a button on the side of each moused-over row to
//have the ability of deleting books from the list. Having a working button than, when pressed, brings up a
//submitDataButton to enter the info of a new book. Handling the output of the submitDataButton to, instead of sending the data to
//a non-existing server, add a new row w/the info of the book.

//This time around, I will add as a starting point what the exercise demands the page to contain:

/**
 * @var {Array} - This array veriable will contain our stored book info
 */
let myLibrary = [];

/**
 * This is a CONSTRUCTOR FUNCTION, the main topic of this lesson. It creates an object that stores data of any
 * book the user wants to log. They'll become our book elements of the myLibrary array
 * @param {string} title  -The title of the book
 * @param {string} author -The name of the author of the book
 * @param {number} pages  -The total number of pages of the book
 * @param {boolean} read  -Wether the user has read it or not 
 */
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//Since the course explains prototype editing as a more efficient way to add functions, compared to writing the
//function within our object constructor, we'll use that here...
Book.prototype.readToggle = function() { 
    this.read = !this.read; //"replace this value with its opposite value"
}

//...however, we still need another function so that this universally available toggle function is used 
//specifically on the object we click on. We create this, and then attach an event listener that can provide
//us the index of the clicked element from within the array loop of the render function.
//The KEY to our page is the fact that the index number of each Book will be stored in each button within each
//book card, allowing us to pass it along here:
function toggleByIndex(index) {
    myLibrary[index].readToggle();
    render();
}

/**
 * Upon being called, this function removes all content from the container div we've set up as our library
 * and it fills it with every element found currently in our myLibrary array. Every card is created using a
 * wrapper element and filling its empty html with bespoke code.
 */
function render() {
    let container = document.getElementById('library');
    container.innerHTML = '';
    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        const wrapperElement = document.createElement('div');
        wrapperElement.setAttribute('class', 'bookCard');
        wrapperElement.innerHTML = `
        <div class="cardHeader">
            <h3 class="bookTitle">${book.title}</h3>
            <h5 class="author">by ${book.author}</h5>
        </div>

        <div class="cardBody">
            <p>${book.pages} pages</p>
            <p>${book.read ? 'Read' : 'Not read yet'}</p>
            <div class=buttonContainer>
                <button class="removeButton" onclick="removeBook(${i})">Remove</button>
                <button class="toggleButton" onclick="toggleByIndex(${i})">Toggle Read</button>
            </div>
        </div>
        `;
        //notice the button line. Using the for loop gives us a KEY advantage: during the execution of each loop
        //we have access to the index number of each element. This allows us to create and call any number of
        //functions that use the index to identify pieces of an array. Since in our case, this looping function
        //is called back whenever we delete an item, it also automatically assigns new indexes no matter where
        //or in what order we delete the books. 
        container.appendChild(wrapperElement);
    }
}

/**
 * This funtion takes the current values that have been input to our form, creates a new book object out of 
 * that data and stores it to our myLibrary array.
 */
function addBookToLibrary() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    imputForm.style.display = 'none';
    render();
    // console.log(myLibrary);
}

/**
 * This function is called by clicking the "Remove" button within each card. It removes the indexed element
 * from our myLibrary array and re-renders it. 
 * @param {number} index - Retrieved index of the book that needs removal 
 */
function removeBook(index) {
    myLibrary.splice(index,1);
    render();
}

/**
 * This object variable contains the input form, but is mostly used so that we can add the functionality we
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
const book1 = new Book('The Hobbit', 'J.R.R Tolkien', '320', false);
const book2 = new Book('Peter Capusotto: El Libro', 'Diego Capusotto & Pedro Saborido', '237', true);
const book3 = new Book('World War Z', 'Max Brooks', '457', true);
const book4 = new Book('El Eternauta', 'Hector G Oesterheld & Francisco Solano Lopez', '351', true);
myLibrary.push(book1);
myLibrary.push(book3);
myLibrary.push(book4);
render();
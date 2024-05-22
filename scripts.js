//The main purpose of our scripts will be threefold. Adding a button on the side of each moused-over row to
//have the ability of deleting books from the list. Having a working button than, when pressed, brings up a
//form to enter the info of a new book. Handling the output of the form to, instead of sending the data to
//a non-existing server, add a new row w/the info of the book.

/**This function creates book objects which have a function to log some info about each book into the console
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

    /**This function logs each book's info to the console, upon call. 
     * @returns {string}
     */
    this.bookInfo = function () {
        if (this.read === false) {
            return console.log(`${this.title} by ${this.author}, ${this.pages} pages, not read yet.`);
        }
        else {
            return console.log(`${this.title} by ${this.author}, ${this.pages} pages, has been read already.`);
        }
    }

    /**This function adds all the book info to a new row on our list, upon call.
     * @returns {div}
     */
    this.newRow = function () {
        const content1 = document.createElement('div');
        content1.textContent = `${this.title}`;
        container.appendChild(content1);
        // alert("newrow enabled");
    }
}

const container = document.getElementById("dataContainer");


const book1 = new Book('The Hobbit', 'J.R.R Tolkien', '295', false);
const book2 = new Book('Peter Capusotto: El Libro', 'Diego Capusotto y Pedro Saborido', '237', true);
book1.bookInfo();
book2.bookInfo();
book1.newRow();
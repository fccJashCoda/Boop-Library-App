// DOM queries and variables
// -- Object properties
const bookTitle = document.querySelector('#bookTitle');
const bookAuthor = document.querySelector('#bookAuthor');
const numOfPages = document.querySelector('#numOfPages');
const readStatus = document.querySelector('#readStatus');
const bookDescription = document.querySelector('#bookDescription');
const bookCover = document.querySelector('#bookCover');
// -- Buttons
const editBtns = document.querySelectorAll('.editBtn');
// -- Modal queries
const backgroundLayer = document.querySelector('.background-layer')
let bookModal = document.querySelector('#addBookModal');
let editModal = document.querySelector('#editBookModal')
// -- Library query and array declaration
const bookLibary = document.querySelector('#library');

// Book class
function Book (title, author, pages, description, read, cover) {
    this.title = title
    this.author = author
    this.pages = pages
    this.description = description
    this.read = read
    this.cover = cover
}

// Event Listeners
document.querySelector('#addToLibraryBtn').addEventListener('click', addBookToLibrary);
document.querySelector('#cancelBookForm').onclick = () => {
    toggleBookModal()
}

document.querySelector('#addABookBtn').onclick = () => {
    toggleBookModal()
}

window.onclick = (e) => {if (e.target == backgroundLayer) {
        toggleBookModal()
    }
}

// Initial Library Population: runs only if No localStorage is present
function initializeLibrary () {
    let book = new Book();

    book.title = 'The Hobbit';
    book.author = 'J.R.R Tolkien';
    book.pages = '295';
    book.description = "Gandalf tricks Bilbo Baggins into hosting a party for Thorin Oakenshield and his band of dwarves, who sing of reclaiming the Lonely Mountain and its vast treasure from the dragon Smaug. When the music ends, Gandalf unveils Thrór's map showing a secret door into the Mountain and proposes that the dumbfounded Bilbo serve as the expedition's \"burglar\". The dwarves ridicule the idea, but Bilbo, indignant, joins despite himself. "
    book.read = 'read';
    book.cover = 'https://upload.wikimedia.org/wikipedia/en/4/4a/TheHobbit_FirstEdition.jpg'

    let myLibrary = [];

    myLibrary.push(book);

    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

    render()
}

// Add a book to your library
function addBookToLibrary () {
    let book = new Book();

    if (bookTitle.value === "" || bookAuthor.value === "" || numOfPages.value === "") {
        displayErrorMessage()
        return
    }
    
    book.title = bookTitle.value;
    book.author = bookAuthor.value;
    book.pages = numOfPages.value;
    book.description = (bookDescription.value != "") ? bookDescription.value : 'No description yet.'
    book.read = readStatus.value;
    book.cover = (bookCover.value != "") ? bookCover.value : 'https://via.placeholder.com/150x250';

    // Save to local storage
    let myLibrary = JSON.parse(localStorage.getItem('myLibrary'));

    myLibrary.push(book);

    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

    render()
    document.querySelector('#bookForm').reset()
    toggleBookModal()
}


// Render the library table
function render () {
    let myLibrary = JSON.parse(localStorage.getItem('myLibrary'))

    bookLibary.innerHTML = '';
    myLibrary.forEach(book => {
        bookLibary.innerHTML += renderBook(book);
    })
}

// render a book block 
function renderBook(book) {
    button = (book.read === 'read') ? '<button onclick="toggleReadStatus(\'' + book.title +'\')" class="btn btn-success">Read</button>' : '<button onclick="toggleReadStatus(\'' + book.title +'\')" class="btn btn-warning">Not read yet!</button>';
    return `<div class="card book-wrapper">` +
                `<div class="card-body book-inner">` +
                    `<div class="book-cover">` +
                        `<img src=${book.cover} alt="book cover" class="cover-image">` +
                    `</div>` +
                    `<div class="book-info-and-options">` +
                        `<div class="book-info">` +
                            `<h4>${book.title} by ${book.author}</h4>` +
                            `<h6>${book.pages} Pages</h6>` +
                            `<h5>Description:</h5>` +
                            `<p class="book-description">${book.description}</p>` +
                        `</div>`+
                        `<div class="book-options">` +
                            `${button}` + 
                            '<button onclick="deleteBook(\'' + book.title +'\')" class="btn btn-danger deleteBtn">Delete</button>' +
                        `</div>` + 
                    `</div>` +
                `</div>`+
            `</div>` + 
            `<br>`;
}

// Toggle Modal displays
function toggleBookModal () {
    backgroundLayer.style.display = (backgroundLayer.style.display === "none") ? "block" : "none";
    bookModal.style.display = (bookModal.style.display === "none") ? "block" : "none";
}

function toggleEditModal () {
    backgroundLayer.style.display = (backgroundLayer.style.display === "none") ? "block" : "none";
    editModal.style.display = (editModal.style.display === "none") ? "block" : "none";
}

// Display Error message in case a field is empty when click "Add to library" - Work in progress
function displayErrorMessage () {
    console.log('ERROR')
}

// Toggle read status
function toggleReadStatus (target) {
    console.log(typeof target)
    let myLibrary = JSON.parse(localStorage.getItem('myLibrary'));

    for (book in myLibrary) {
        if (myLibrary[book].title === target) {
            myLibrary[book].read = (myLibrary[book].read === "read") ? "not read" : "read";
            console.log(book)
        }
    }

    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
    render()
}

// Delete a book entry from library
function deleteBook (target) {
    let myLibrary = JSON.parse(localStorage.getItem('myLibrary'));

    for (book in myLibrary) {
        if (myLibrary[book].title === target) {
            myLibrary.splice(book, 1)
        }
    }

    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
    render()
}

// run initializeLibrary once to set a base example and initiate localStorage
if (localStorage.getItem('myLibrary') === null) initializeLibrary();
window.onload = render();
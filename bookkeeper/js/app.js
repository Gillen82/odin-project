const booksEl = document.querySelector('.books');
const bookTitleEl = document.querySelector('.new-book-title');
const bookAuthorEl = document.querySelector('.new-book-author');
const bookPagesEl = document.querySelector('.new-book-pages');
const beenReadEl = document.querySelector('.been-read');
const addBookBtn = document.querySelector('.add-book');

let books = [];

// book object
function Book(_title, _author, _pages, _beenRead) {
	if (!new.target) {
		throw Error("You must use the 'new' operator to call the constructor");
	}
	this.id = crypto.randomUUID();
	this.title = _title;
	this.author = _author;
	this.pages = _pages;
	this.beenRead = _beenRead;
}

Book.prototype.changeReadStatus = function () {
	this.beenRead = this.beenRead == true ? false : true;
};

// create new book
function createBook() {
	// get book values
	const title = bookTitleEl.value;
	const author = bookAuthorEl.value;
	const pages = bookPagesEl.value;
	const beenRead = beenReadEl.checked;
	// create the book
	const newBook = new Book(title, author, pages, beenRead);
	// add book to library
	books.push(newBook);
	displayBooks();
	resetFileds();
}

// update ui to show books
function displayBooks() {
	booksEl.innerHTML = '';
	books.forEach((book) => {
		// create book elements
		const bookCard = document.createElement('div');
		const bookTitle = document.createElement('h2');
		const bookAuthor = document.createElement('p');
		const bookPages = document.createElement('p');
		const bookControls = document.createElement('div');
		const removeBookBtn = document.createElement('button');
		const changeStatusBtn = document.createElement('button');
		// add book text content
		bookTitle.textContent = book.title;
		bookAuthor.textContent = `Author: ${book.author}`;
		bookPages.textContent = `Pages: ${book.pages}`;
		removeBookBtn.textContent = 'Remove Book';
		changeStatusBtn.textContent = 'Been Read?';
		// add classes
		bookCard.classList.add('book-card');
		bookTitle.classList.add('book-title');
		bookAuthor.classList.add('book-author');
		bookPages.classList.add('book-pages');
		bookControls.classList.add('book-controls');
		removeBookBtn.classList.add('remove-book');
		changeStatusBtn.classList.add('change-status');
		// add read class
		book.beenRead ? bookCard.classList.add('been-read') : bookCard.classList.add('not-read');
		// add book id attrbute
		bookCard.setAttribute('data-id', book.id);
		// join elements
		bookCard.appendChild(bookTitle);
		bookCard.appendChild(bookAuthor);
		bookCard.appendChild(bookPages);
		bookControls.appendChild(changeStatusBtn);
		bookControls.appendChild(removeBookBtn);
		bookCard.appendChild(bookControls);
		booksEl.appendChild(bookCard);
		// add event listeners
		changeStatus(changeStatusBtn, book);
		removeBook(removeBookBtn);
	});
}

// reset for fileds
function resetFileds() {
	bookTitleEl.value = '';
	bookAuthorEl.value = '';
	bookPagesEl.value = '';
	beenReadEl.checked = false;
}

// change read status
function changeStatus(btn, book) {
	btn.addEventListener('click', function () {
		book.changeReadStatus();
		displayBooks();
	});
}

// remove book
function removeBook(btn) {
	btn.addEventListener('click', function () {
		const bookID = this.parentElement.parentElement.getAttribute('data-id');
		const newBooks = books.filter((book) => book.id != bookID);
		books = newBooks;
		displayBooks();
	});
}

// createBook
addBookBtn.addEventListener('click', function (e) {
	e.preventDefault();
	createBook();
});

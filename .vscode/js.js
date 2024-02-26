let library = JSON.parse(localStorage.getItem('library')) || [];
const form = document.querySelector('form');
const table = document.querySelector('.table');


function saveLibraryToLocalStorage() {
    localStorage.setItem('library', JSON.stringify(library));
}


function addBook(bookId, title, author) {
    library.push({ bookId, title, author });
    saveLibraryToLocalStorage();
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td class="row">${bookId}</td>
        <td class="row">${title}</td>
        <td class="row">${author}</td>
        <td><button class="action-btn borrow-btn" data-state="available">Borrow</button></td>
        
    `;
    tr.setAttribute('id', bookId);

    table.appendChild(tr);

}


window.onload = function () {
    library.forEach(book => {
        addBook(book.bookId, book.title, book.author);
    });
}


form.addEventListener('submit', function (e) {
    e.preventDefault();
    const bookId = document.querySelector('#id').value;
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    addBook(bookId, title, author);
});
const form1 = document.querySelector('#form1');

form1.addEventListener('submit', function (e) {
    e.preventDefault();
    const search = document.querySelector('#search').value.toLowerCase();
    const rows = document.querySelectorAll('tr');

    rows.forEach((row) => {
        const cells = row.querySelectorAll('.row');


        if (cells.length >= 2) {
            const title = cells[1].textContent.toLowerCase();
            if (title.includes(search)) {
                form1.appendChild(row.cloneNode(true));
            }
        }
    });
});
table.addEventListener('click', function (event) {
    const target = event.target;
    if (target.classList.contains('action-btn')) {
        const state = target.getAttribute('data-state');
        if (state === 'available') {
            borrowBook(target);

        } else if (state === 'borrowed') {
            returnBook(target);
        }
    }
});


// Function to borrow a book
function borrowBook(button) {
    alert("BOOK BORROWED");
    const row = button.closest('tr');

    button.textContent = 'Return';
    button.setAttribute('data-state', 'borrowed');

}


function returnBook(button) {
    alert("BOOK RETURNED");
    const row = button.closest('tr');

    button.textContent = 'Borrow';
    button.setAttribute('data-state', 'available');

}


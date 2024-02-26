let library = [];
const form = document.querySelector('form');
const table = document.querySelector('.table');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const bookId = document.querySelector('#id').value;
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    library.push(`${bookId}, ${title}, ${author}`);
    addBook(bookId, title, author);
});

function addBook(bookId, title, author) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td class="row">${bookId}</td>
        <td class="row">${title}</td>
        <td class="row">${author}</td>
        <td><button class="action-btn borrow-btn" data-state="available">Borrow</button></td>
        <td class="delete"><button>DELETE</button></td>
    `;
    tr.setAttribute('id', bookId);

    table.appendChild(tr);
    alert("BOOK ADDED")
}

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
table.addEventListener('click', function (event) {
    const target = event.target;
    if (target.classList.contains('delete')) {
        removeChild();
    }
});
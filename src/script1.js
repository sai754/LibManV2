const books = [
  {
    //Book Datas
    title: 'Book 1',
    author: 'Author 1',
    subject: 'Subject 1',
    publishDate: '2023-01-01',
    ISBN: '123456789',
  },
  {
    title: 'Book 2',
    author: 'Author 2',
    subject: 'Subject 2',
    publishDate: '2022-02-01',
    ISBN: '123456666',
  },
  {
    title: 'Book 3',
    author: 'Author 1',
    subject: 'Subject 3',
    publishDate: '2021-03-01',
    ISBN: '123457777',
  },
  {
    title: 'Book 3',
    author: 'Author 1',
    subject: 'Subject 3',
    publishDate: '2021-03-01',
    ISBN: '123457777',
  },
  {
    title: 'Book 3',
    author: 'Author 1',
    subject: 'Subject 3',
    publishDate: '2021-03-01',
    ISBN: '123457777',
  },
  {
    title: 'Book 3',
    author: 'Author 1',
    subject: 'Subject 3',
    publishDate: '2021-03-01',
    ISBN: '123457777',
  },
  {
    title: 'Book 3',
    author: 'Author 1',
    subject: 'Subject 3',
    publishDate: '2021-03-01',
    ISBN: '123457777',
  },
  {
    title: 'Book 3',
    author: 'Author 1',
    subject: 'Subject 3',
    publishDate: '2021-03-01',
    ISBN: '123457777',
  },
  {
    title: 'Book 3',
    author: 'Author 1',
    subject: 'Subject 3',
    publishDate: '2021-03-01',
    ISBN: '123457777',
  },
  {
    title: 'Book 3',
    author: 'Author 1',
    subject: 'Subject 3',
    publishDate: '2021-03-01',
    ISBN: '123457777',
  },
  {
    title: 'Book 3',
    author: 'Author 1',
    subject: 'Subject 3',
    publishDate: '2021-03-01',
    ISBN: '123457777',
  },
  {
    title: 'Book 3',
    author: 'Author 1',
    subject: 'Subject 3',
    publishDate: '2021-03-01',
    ISBN: '123457777',
  },
];

const booksPerPage = 10;
let currentPage = 1;

function showBook(books) {
  //This function is used for rendering the books by creating row elements
  const tableBody = document.getElementById('book-table-body');
  tableBody.innerHTML = '';

  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const disBooks = books.slice(startIndex, endIndex);

  disBooks.forEach((book) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.subject}</td>
        <td>${book.publishDate}</td>
        <td>${book.ISBN}</td>
      `;

    tableBody.appendChild(row);
  });

  showPagination(); //Pagination function call
  renderCriteriaCounts(books); //Counting function call
}

function renderCriteriaCounts(books) {
  //This function is used for counting the number of books....
  const criteriaCounts = {
    // ....based on the given criteria
    title: {},
    author: {},
    subject: {},
    publishDate: {},
  };

  books.forEach((book) => {
    incrementCriteriaCount(criteriaCounts.title, book.title);
    incrementCriteriaCount(criteriaCounts.author, book.author);
    incrementCriteriaCount(criteriaCounts.subject, book.subject);
    incrementCriteriaCount(criteriaCounts.publishDate, book.publishDate);
  });

  renderCount('#title-count', criteriaCounts.title);
  renderCount('#author-count', criteriaCounts.author);
  renderCount('#subject-count', criteriaCounts.subject);
  renderCount('#publish-date-count', criteriaCounts.publishDate);
}

function incrementCriteriaCount(criteria, value) {
  if (criteria.hasOwnProperty(value)) {
    criteria[value].count += 1;
  } else {
    criteria[value] = { count: 1 };
  }
}

function renderCount(selector, criteria) {
  const countElement = document.querySelector(selector);
  let totalCount = 0;

  for (const value in criteria) {
    if (criteria.hasOwnProperty(value)) {
      const count = criteria[value].count;
      totalCount += count;
    }
  }

  countElement.textContent = totalCount;
}

function showPagination() {
  //Function for Pagination
  const totalBooks = books.length;
  const totalPages = Math.ceil(totalBooks / booksPerPage);

  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const link = document.createElement('span');
    link.textContent = i;
    link.classList.add('pagination-link');
    if (i === currentPage) {
      link.classList.add('active');
    }

    link.addEventListener('click', () => {
      currentPage = i;
      showBook(books);
    });

    pagination.appendChild(link);
  }
}

function filter() {
  //Function for filtering the book list based on the criteria
  const titleFilter = document
    .getElementById('title-filter')
    .value.toLowerCase();
  const authorFilter = document
    .getElementById('author-filter')
    .value.toLowerCase();
  const subjectFilter = document
    .getElementById('subject-filter')
    .value.toLowerCase();
  const dateFilter = document.getElementById('date-filter').value.toLowerCase();

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(titleFilter) &&
      book.author.toLowerCase().includes(authorFilter) &&
      book.subject.toLowerCase().includes(subjectFilter) &&
      book.publishDate.toLowerCase().includes(dateFilter)
  );

  currentPage = 1;
  showBook(filteredBooks);
}

showBook(books);

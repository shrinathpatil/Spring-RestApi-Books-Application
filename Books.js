let books = [];
let index;
const getData = async () => {
  books = [];
  const data = await fetch("http://localhost:8080/api/v_1/books");
  let result = await data.json();
  books = [...result];
  images(books);
};
getData();

let container = document.querySelector(".main__bg");
let add = document.querySelector(".btn");
let details = document.querySelector(".details");
let addBook = document.querySelector(".addBook");
let back = document.querySelector(".back");
let backBook = document.querySelector(".backBook");
let backUpdate = document.querySelector(".backUpdate");
let title = document.getElementById("title");
let id = document.getElementById("id");
let author = document.getElementById("author");
let genre = document.getElementById("genre");
let price = document.getElementById("price");
let createBtn = document.getElementById("create");
let updateBtn = document.querySelector(".update");
let deleteBtn = document.querySelector(".delete");
let openUpd = document.querySelector(".updateBook");
let upd_btn = document.querySelector(".upd_btn");

upd_btn.addEventListener("click", () => updateBook());

updateBtn.addEventListener("click", () => {
  details.classList.add("close");
  addBook.classList.add("close");
  openUpd.classList.remove("close");
  openUpdate();
});

deleteBtn.addEventListener("click", async () => {
  let id = books[index].id;
  const res = await fetch(`http://localhost:8080/api/v_1/books?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  getData();
  document.getElementById("input_id").value = "";
  document.getElementById("input_title").value = "";
  document.getElementById("input_author").value = "";
  document.getElementById("input_genre").value = "";
  document.getElementById("input_price").value = "";
  details.classList.add("close");
});

backUpdate.addEventListener("click", () => {
  openUpd.classList.add("close");
});

const images = (arr) => {
  container.innerHTML = arr
    .map(
      (e, i) => `<div class="card" onclick="showDetails(${i})" >
<img
  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLfaXoC03uLa_Sr1Ys_aMeBv5rnHym2zhGRwLLt-CchdP6CSze6KkzvrgOX7Flhiswfs0&usqp=CAU"
  alt=""
  class=""
/>

<h3>${e.title}</h3>
</div>`
    )
    .join("");
};

back.addEventListener("click", () => {
  details.classList.add("close");
});
backBook.addEventListener("click", () => {
  addBook.classList.add("close");
});

add.addEventListener("click", () => {
  details.classList.add("close");
  addBook.classList.remove("close");
});
createBtn.addEventListener("click", () => createBook());

const showDetails = (idx) => {
  index = idx;
  console.log(index);

  addBook.classList.add("close");
  details.classList.remove("close");
  const book = books[idx];
  title.innerHTML = book.title;
  id.innerHTML = book.id;
  author.innerHTML = book.author;
  genre.innerHTML = book.genre;
  price.innerHTML = `₹. ${book.price}`;
};

const openUpdate = () => {
  let upd_id = document.getElementById("upd_id");
  let upd_title = document.getElementById("upd_title");
  let upd_author = document.getElementById("upd_auhtor");
  let upd_genre = document.getElementById("upd_genre");
  let upd_price = document.getElementById("upd_price");

  upd_id.value = books[index].id;
  upd_title.value = books[index].title;
  upd_author.value = books[index].author;
  upd_genre.value = books[index].genre;
  upd_price.value = books[index].price;
};

const createBook = async () => {
  let input_id = document.getElementById("input_id").value;
  let input_title = document.getElementById("input_title").value;
  let input_author = document.getElementById("input_author").value;
  let input_genre = document.getElementById("input_genre").value;
  let input_price = document.getElementById("input_price").value;

  if (
    !input_id ||
    !input_title ||
    !input_author ||
    !input_price ||
    !input_genre
  ) {
    alert("Please give all details !");
    return;
  }

  const res = await fetch("http://localhost:8080/api/v_1/books", {
    method: "POST",
    body: JSON.stringify({
      id: input_id,
      title: input_title,
      author: input_author,
      price: input_price,
      genre: input_genre,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const book = res.json();
  input_id.value = "";
  input_title.value = "";
  input_author.value = "";
  input_genre.value = "";
  input_price.value = "";
  if (book) {
    getData();
    addBook.classList.add("close");
  }
};

const updateBook = async () => {
  let upd_id = document.getElementById("upd_id").value;
  let upd_title = document.getElementById("upd_title").value;
  let upd_author = document.getElementById("upd_auhtor").value;
  let upd_genre = document.getElementById("upd_genre").value;
  let upd_price = document.getElementById("upd_price").value;

  const res = await fetch(`http://localhost:8080/api/v_1/book/${upd_id}`, {
    method: "PUT",
    body: JSON.stringify({
      id: upd_id,
      title: upd_title,
      author: upd_author,
      price: upd_price,
      genre: upd_genre,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (data) {
    getData();
    openUpd.classList.add("close");
  }
};

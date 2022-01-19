const UNCOMPLETED_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_BOOK_ID = "completeBookshelfList"; 
const BOOK_ITEMID = "itemId";

function tambahBuku(){
    const bookTitle = document.getElementById("inputBookTitle").value;
    const bookAuthor = document.getElementById("inputBookAuthor").value;
    const bookYear = document.getElementById("inputBookYear").value;
    const inputBookIsComplete = document.getElementById("inputBookIsComplete").checked;
    
    const book = makeBuku(bookTitle, bookAuthor, bookYear, inputBookIsComplete);
    const bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, inputBookIsComplete);
    console.log(inputBookIsComplete)
    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);

    if(inputBookIsComplete){
        bookStatus = document.getElementById(COMPLETED_BOOK_ID);
    } else {
        bookStatus = document.getElementById(UNCOMPLETED_BOOK_ID);
    }

    bookStatus.append(book);
    updateDataToStorage();
}

function makeBuku(bookTitle, bookAuthor, bookYear, isCompleted) {
 
    const title = document.createElement("h3");
    title.innerText = bookTitle;
 
    const author = document.createElement("p");
    author.classList.add("author")
    author.innerText = "Penulis : " + bookAuthor;
 
    const year = document.createElement("p");
    year.classList.add("year")
    year.innerText = "Tahun : " + bookYear;
 
    const bookItem = document.createElement("article");
    bookItem.classList.add("book_item")
    bookItem.append(title, author, year);

    if(isCompleted){
        bookItem.append(
            buatTombolUndo(),
            buatTombolHapus()
            );
    } else {
        bookItem.append(
            buatTombolCek(),
            buatTombolHapus()
        );
    }
 
    return bookItem;
}

function buatTombol(buttonTypeClass , eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function tambahBukuSelesai(taskElement) {
    const bukuSelesai = document.getElementById(COMPLETED_BOOK_ID);
    const bookTitle = taskElement.querySelector(".book_item > h3").innerText;
    const bookAuthor = taskElement.querySelector(".book_item > .author").innerText;
    const bookYear = taskElement.querySelector(".book_item > .year").innerText;

    const bukuBaru = makeBuku(bookTitle, bookAuthor, bookYear, true);
    const book = cariBuku(taskElement[BOOK_ITEMID]);
    book.isCompleted = true;
    bukuBaru[BOOK_ITEMID] = book.id;

    bukuSelesai.append(bukuBaru);
    taskElement.remove();

    updateDataToStorage();

}

function buatTombolCek() {
    return buatTombol("tombol-cek", function(event){
        event.preventDefault();
        tambahBukuSelesai(event.target.parentElement);
    });
}

function hapusBukuYangSelesai(taskElement) {
    const bookPosition = cariIndexBuku(taskElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);

    taskElement.remove();
    updateDataToStorage();
}

function buatTombolHapus() {
    return buatTombol("tombol-hapus", function(event){
        hapusBukuYangSelesai(event.target.parentElement);
    });
}

function undoBukuYangSelesai(taskElement){
    const bukuBelumSelesai = document.getElementById(UNCOMPLETED_BOOK_ID);
    
    const book = cariBuku(taskElement[BOOK_ITEMID]);

    const bookTitle = book.bookTitle
    const bookAuthor = book.bookAuthor
    const bookYear = book.bookYear

    const bukuBaru = makeBuku(bookTitle, bookAuthor, bookYear, false);
    book.isCompleted = false;
    bukuBaru[BOOK_ITEMID] = book.id;

    bukuBelumSelesai.append(bukuBaru);
    taskElement.remove();

    updateDataToStorage();

}

function buatTombolUndo() {
    return buatTombol("tombol-undo", function(event){
        undoBukuYangSelesai(event.target.parentElement);
    });
}

function refreshDataFromBoooks() {
    const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_ID);
    let listCompleted = document.getElementById(COMPLETED_BOOK_ID);
  
    for(buku of books){
        const bukuBaru = makeBuku(buku.bookTitle, buku.bookAuthor, buku.bookYear, buku.isCompleted);
        bukuBaru[BOOK_ITEMID] = buku.id;
  
        if(buku.isCompleted){
            listCompleted.append(bukuBaru);
        } else {
            listUncompleted.append(bukuBaru);
        }
    }
}
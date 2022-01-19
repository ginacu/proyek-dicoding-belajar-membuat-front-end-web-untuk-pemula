const STORAGE_KEY = "BOOKLIST_APPS";
 
let books = [];
 
function isStorageExist() {
    if(typeof(Storage) === undefined){
        alert("Browser tidak mendukung local storage");
        return false
    }
    return true;
}
 
function saveData() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}
 
function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
   
    let data = JSON.parse(serializedData);
   
    if(data !== null)
        books = data;
 
    document.dispatchEvent(new Event("ondataloaded"));
}
 
function updateDataToStorage() {
    if(isStorageExist())
        saveData();
}
 
function composeBookObject(bookTitle, bookAuthor, bookYear, inputBookIsComplete) {
    return {
        id: +new Date(),
        bookTitle,
        bookAuthor,
        bookYear,
        inputBookIsComplete
    };
}
 
function cariBuku(bukuId) {
    for(buku of books){
        if(buku.id === bukuId)
            return buku;
    }
    return null;
}
 
function cariIndexBuku(bukuId) {
    let index = 0
    for (buku of books) {
        if(buku.id === bukuId)
           return index;
 
        index++;
    }
    return -1;
}
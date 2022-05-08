// (function () {
//     const addToCatalogForm = document.getElementById('addToCatalogForm');
//     if (addToCatalogForm) {
//         const bookNameElement = document.getElementById('bookName');
//         const numCopiesElement = document.getElementById('numCopies');
//         const genreElement = document.getElementById('genre');
//         const imageElement = document.getElementById('image');
//         let errorDiv = document.getElementById('Error');
//         addToCatalogForm.addEventListener('submit', (event) => {
//         try {
//             //Book name checking
//             if (!bookNameElement.value) throw 'you must provide a book name';
//             let bookNameValue = bookNameElement.value;
//             if (typeof bookNameValue !== 'string') throw 'you must provide a book name';
//             bookNameValue = bookNameValue.trim();
//             if (bookNameValue.length == 0) throw 'you must provide a valid book name';
//             //Number of copies checking
//             if (!numCopiesElement.value) throw 'you must provide a number of copies';
//             let numCopiesValue = numCopiesElement.value;
//             if (typeof numCopiesValue !== 'string') throw 'you must provide a number of copies';
//             numCopiesValue = numCopiesValue.trim();
//             if (numCopiesValue.length == 0) throw 'you must provide a number of copies';
//             let numCopiesConverted = parseInt(numCopiesValue);
//             if (typeof numCopiesConverted != "number") throw "you must provide a positive integer input";
//             if (!Number.isInteger(numCopiesConverted)) throw "you must provide a positive integer input";
//             if (numCopiesConverted < 1) "number of copies out of range";
//             //Genre checking
//             if (!genreElement.value) throw 'you must provide a genre';
//             let genreValue = genreElement.value;
//             if (typeof genreValue !== 'string') throw 'you must provide a genre';
//             genreValue = genreValue.trim();
//             if (genreValue.length == 0) throw 'you must provide a genre';
//             //Image checking
//             if (!imageElement.value) throw 'you must provide an image link';
//             let imageValue = imageElement.value;
//             if (typeof imageValue !== 'string') throw 'you must provide an image link';
//             imageValue = imageValue.trim();
//             if (imageValue.length == 0) throw 'you must provide a image link';
//             errorDiv.hidden = true;
//         } catch (e) {
//             event.preventDefault();
//             errorDiv.hidden = false;
//             errorDiv.innerHTML = 'Error: ' + e;

//         }
//       });
//     }
//   })();

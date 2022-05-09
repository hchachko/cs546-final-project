const connection = require("../config/mongoConnection");
const catalogData = require("../data/books/catalog");
const menuData = require("../data/products/menu");

async function main() {
  const db = await connection();
  await db.dropDatabase();

  //add books
  const book1 = await catalogData.createItem(
    "The Catcher in the Rye",
    5,
    "Young adult fiction",
    "https://www.pluggedin.com/wp-content/uploads/2020/01/catcher-in-the-rye-cover-image-682x1024.jpeg"
  );
  const book2 = await catalogData.createItem(
    "To Kill a Mockingbird",
    3,
    "Southern Gothic",
    "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1553383690l/2657.jpg"
  );
  const book3 = await catalogData.createItem(
    "The Lord of the Rings",
    4,
    "Adventure",
    "https://media.npr.org/assets/bakertaylor/covers/t/the-lord-of-the-rings/9780618640157_custom-bd5c36cb700fafac72208e5f622a6d1a9ca85489-s500-c85.webp"
  );
  const book4 = await catalogData.createItem(
    "The Alchemist",
    8,
    "Drama",
    "https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg"
  );

  //add menu items
  const menu1 = await menuData.createItem(
    "Coffee",
    "$2.50",
    "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/newscms/2019_33/2203981/171026-better-coffee-boost-se-329p.jpg"
  );
  const menu2 = await menuData.createItem(
    "Iced Tea",
    "$3.50",
    "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/6/3/1/FNM_070111-Centerfold-007_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371597847872.jpeg"
  );
  const menu3 = await menuData.createItem(
    "Lemonade",
    "$3.50",
    "https://celebratingsweets.com/wp-content/uploads/2021/03/Homemade-Lemonade-1-2.jpg"
  );
  const menu4 = await menuData.createItem(
    "Hot Cocoa",
    "$2.99",
    "https://assets.epicurious.com/photos/61eb09dfb37c8d2963dd7bde/4:6/w_2069,h_3104,c_limit/HotCocoaForOne_RECIPE_012022_086_VOG_final.jpg"
  );
}

main();

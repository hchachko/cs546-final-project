const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const favoriteBooksOrDrinks = mongoCollections.favoriteBooksOrDrinks;
const bcrypt = require("bcryptjs");
const saltRounds = 8;

module.exports = {
  createUser: async (firstName, lastName, email, password, employee) => {
    if (
      firstName == undefined ||
      lastName == undefined ||
      email == undefined ||
      password == undefined
    ) {
      throw "All fields must be provided";
    }
    if (typeof email != "string") {
      throw "email must be a string.";
    }
    if (email.trim().length == 0) {
      throw "email must not be only spaces.";
    }
    if (email.indexOf(".") == -1) {
      throw "email must be a valid email address.";
    }
    const ext = email.slice(email.lastIndexOf(".") + 1);
    if (ext.length < 2) {
      throw "email must be a valid email address.";
    } else {
      for (let i = 0; i < ext.length; i++) {
        if (/[a-zA-Z]/.test(ext[i])) {
          continue;
        } else {
          throw "email must be a valid email address.";
        }
      }
    }

    if (typeof firstName != "string" || typeof lastName != "string") {
      throw "first name/last name  must be a valid string";
    }
    if (
      firstName.trim().length == 0 ||
      lastName.trim().length == 0 ||
      email.trim().length == 0 ||
      password.trim().length == 0
    ) {
      throw "first name/last name/email/password must not be empty";
    }
    for (let i = 0; i < firstName.length; i++) {
      if (
        !(firstName.charCodeAt(i) > 64 && firstName.charCodeAt(i) < 91) &&
        !(firstName.charCodeAt(i) > 96 && firstName.charCodeAt(i) < 123)
      ) {
        throw "you must provide a valid first name";
      }
    }
    for (let i = 0; i < lastName.length; i++) {
      if (
        !(lastName.charCodeAt(i) > 64 && lastName.charCodeAt(i) < 91) &&
        !(lastName.charCodeAt(i) > 96 && lastName.charCodeAt(i) < 123)
      ) {
        throw "you must provide a valid last name";
      }
    }
    if (firstName.length < 1 || lastName.length < 1) {
      throw "first name/last name must be 1 character long or more";
    }

    if (typeof password != "string") {
      throw "password must be a valid string";
    }
    if (password.trim().length == 0) {
      throw "password must not be empty";
    }
    if (password.length < 6) {
      throw "password must be at least 6 characters";
    }
    for (let i = 0; i < password.length; i++) {
      if (password.charAt(i) == " ") {
        throw "password cannot have spaces";
      }
    }
    const email_lowercase = email.toLowerCase();
    const userCollection = await users();

    const duplicateUser = await userCollection.findOne({
      email: email_lowercase,
    });
    if (duplicateUser) {
      throw "User already exists! Please sign in.";
    }
    const hash = await bcrypt.hash(password, saltRounds);

    let newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email_lowercase,
      password: hash,
      employee: employee,
      favoriteItems: [],
    };
    const insertInfo = await userCollection.insertOne(newUser);
    if (insertInfo.insertedCount === 0) throw "could not add user";

    const favoriteBooksOrDrinksCollection = await favoriteBooksOrDrinks();
    const newId = insertInfo.insertedId;
    let intializeFavBooksNdDrinks = {
      userId: newId,
      user: firstName + " " + lastName,
      favoriteBooks: [],
      favoriteDrinks: [],
    };
    await favoriteBooksOrDrinksCollection.insertOne(intializeFavBooksNdDrinks);

    return { userInserted: true };
  },
  checkUser: async (email, password) => {
    if (email == undefined || password == undefined) {
      throw "email and password must be provided";
    }
    if (typeof email != "string") {
      throw "email must be a valid string";
    }
    if (email.trim().length == 0) {
      throw "email must not be empty";
    }
    if (email.indexOf(".") == -1) {
      throw "email must be a valid email address.";
    }
    const ext = email.slice(email.lastIndexOf(".") + 1);
    if (ext.length < 2) {
      throw "email must be a valid email address.";
    } else {
      for (let i = 0; i < ext.length; i++) {
        if (/[a-zA-Z]/.test(ext[i])) {
          continue;
        } else {
          throw "email must be a valid email address.";
        }
      }
    }
    if (typeof password != "string") {
      throw "password must be a valid string";
    }
    if (password.trim().length == 0) {
      throw "password must not be empty";
    }
    if (password.length < 6) {
      throw "password must be at least 6 characters";
    }
    for (let i = 0; i < password.length; i++) {
      if (password.charAt(i) == " ") {
        throw "password cannot have spaces";
      }
    }
    const email_lowercase = email.toLowerCase();
    const userCollection = await users();

    const findUser = await userCollection.findOne({
      email: email_lowercase,
    });
    if (!findUser) {
      throw "email or password is incorrect";
    }
    const comparePasswords = await bcrypt.compare(password, findUser.password);
    if (!comparePasswords) {
      throw "email or password is incorrect";
    } else {
      return {
        authenticated: true,
        firstName: findUser.firstName,
        lastName: findUser.lastName,
        employee: findUser.employee,
        userId: findUser._id,
      };
    }
  },
};

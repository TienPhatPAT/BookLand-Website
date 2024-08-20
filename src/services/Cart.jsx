import { useEffect, useState } from "react";
import { fetchApi, getApiEnv } from "../utils/api";

export function getIdCartList() {
  return JSON.parse(localStorage.getItem("cart"));
}

export function increaseQuantityById(bookId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const bookIndex = cart.findIndex((item) => item.id === bookId);

  if (bookIndex !== -1) {
    cart[bookIndex].quantity += 1;
  } else {
    cart.push({ id: bookId, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  console.log(cart);
  console.log("add " + bookId + " successfully");
}

export function decreaseQuantityById(bookId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Find the index of the book in the cart
  const bookIndex = cart.findIndex((item) => item.id === bookId);

  if (bookIndex !== -1) {
    // If the book is found in the cart, decrease the quantity
    if (cart[bookIndex].quantity > 1) {
      cart[bookIndex].quantity -= 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log(cart);
      console.log("removed one " + bookId + " successfully");
    } else if (cart[bookIndex].quantity === 1) {
      // If the quantity is 1, remove the book from the cart
      cart.splice(bookIndex, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log(cart);
      console.log("removed one " + bookId + " successfully");
    } else {
      // If the quantity is zero or less, do not perform any action and log a failure message
      console.log("Failed to update book " + bookId + ": quantity cannot be negative.");
    }
  } else {
    // If the book is not found in the cart, log a failure message
    console.log("Failed to update book " + bookId + ": book not found in cart.");
  }
}

export function removeCartById(bookId) {
  // Retrieve the cart from localStorage or initialize it as an empty array
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Find the index of the book in the cart
  const bookIndex = cart.findIndex((item) => item.id === bookId);

  if (bookIndex !== -1) {
    // If the book is found in the cart, remove it
    cart.splice(bookIndex, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);
    console.log("Removed book with ID " + bookId + " successfully");
  } else {
    // If the book is not found in the cart, log a failure message
    console.log("Failed to remove book with ID " + bookId + ": book not found in cart.");
  }
}

// Initialize the cart in localStorage if it doesn't exist
export function initialCart() {
  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
  }
}

// Reset the cart in localStorage to an empty array
export function resetCart() {
  localStorage.setItem("cart", JSON.stringify([]));
}

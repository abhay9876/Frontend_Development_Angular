"use strict";
/* TypeScript KeyWord --
-> Let : Used to declare a variable whose value can change later .
         It is a block-scoped.

-> Const : used to declare a variable whose reference can't be reassigned.
           
-> Type : Used to Create a custom type allias.
         It helps describe the shape of data, especially for objects, unions, and intersections.
          It is very similar to anonymous types in C#.

-> Interface: Defines a contract (structure) that an object must follow.

-> Function: Used to declare a reusable block of logic.

-> Class: Defines a blueprint for creating objects that contain data (properties) and behaviour (methods).

-> Constructor: A special method inside a class that runs automatically when an object is created. It is used to initialize class properties.

-> New: Creates a new object (instance) from a class.

-> Extends: Used in inheritance to create a child class from a parent class.

-> Super: Used inside a child class constructor to call the parent class constructor.
*/
Object.defineProperty(exports, "__esModule", { value: true });
// Data Types in TypeScript ------
// Number 
let price = 500.56;
let quantity = 2;
let total = price * quantity;
console.log("Total Amount : ", total);
// String
let customerName = "Zeno";
let email = "zeno@gail.com";
console.log("Customer : ", customerName.toUpperCase());
console.log("Email :", email);
// Boolean
let isLogged = true;
let isPremium = false;
if (isLogged) {
    console.log("User is Logged in..");
}
else {
    console.log("invalid user");
}
// Arrays
let cart = [199.99, 299, 149];
let tags = ["Angular", "TypeScript", "WebAPI"];
console.log("Cart Price : ", cart);
console.log("Tags : ", tags.join(" , "));
// Null/Undefined
let selectedCoupon = null; // can be string OR null
let deliveryInstruction; // declared but not assigned => undefined
console.log("Selected Coupon:", selectedCoupon); // null
console.log("Delivery Instruction:", deliveryInstruction); // undefined
// 6) any -> allows ANY type (TypeScript stops protecting you) - NOT recommended in Angular
let dynamicValue = "100";
// 7) unknown -> safer than any (forces you to check type before use)
let apiResponse = "SUCCESS";
// console.log(apiResponse.toUpperCase()); // Error: Object is of type 'unknown'
// Safe usage with type check (type narrowing)
if (typeof apiResponse === "string") {
    console.log("API Response (string):", apiResponse.toUpperCase());
}
apiResponse = 200;
if (typeof apiResponse === "number") {
    console.log("API Response (number):", apiResponse.toFixed(2));
}
//# sourceMappingURL=index.js.map
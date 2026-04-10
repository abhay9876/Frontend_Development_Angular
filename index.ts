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



// Data Types in TypeScript ------

// Number 
let price : number = 500.56;
let quantity : number = 2;
let total : number = price * quantity;
console.log("Total Amount : ",total);

// String
let customerName : string = "Zeno";
let email : string = "zeno@gail.com";
console.log("Customer : ",customerName.toUpperCase());
console.log("Email :",email);

// Boolean
let isLogged : boolean = true;
let isPremium : boolean = false;
if(isLogged){
    console.log("User is Logged in..");
}
else{
    console.log("invalid user")
}

// Arrays
let cart : number[] = [199.99,299,149]
let tags : string[] = ["Angular","TypeScript", "WebAPI"];

console.log("Cart Price : ",cart);
console.log("Tags : ",tags.join(" , "));


// Null/Undefined
let selectedCoupon: string | null = null; // can be string OR null
let deliveryInstruction: string | undefined; // declared but not assigned => undefined

console.log("Selected Coupon:", selectedCoupon); // null
console.log("Delivery Instruction:", deliveryInstruction); // undefined

// 6) any -> allows ANY type (TypeScript stops protecting you) - NOT recommended in Angular
let dynamicValue: any = "100";


// 7) unknown -> safer than any (forces you to check type before use)
let apiResponse: unknown = "SUCCESS";
// console.log(apiResponse.toUpperCase()); // Error: Object is of type 'unknown'
// Safe usage with type check (type narrowing)
if (typeof apiResponse === "string") {
  console.log("API Response (string):", apiResponse.toUpperCase());
}
apiResponse = 200;
if (typeof apiResponse === "number") {
  console.log("API Response (number):", apiResponse.toFixed(2));
}



// What is Type Inference in TypeScript ?
// Type Inference is a Feature of TypeScript Where the Compiler automatically determins the data types of a variablebased on the value assigned to it .
// When you declare a variable and assign a value at the same time, TypeScript examines the value and infers the type automatically. 

let courseName = "TypeScript Fundamentals"; 
console.log("Course Name (upper):", courseName.toUpperCase());
// courseName = 123; 
// Error (if you uncomment): Type 'number' is not assignable to type 'string'
// Because TypeScript already inferred courseName as string.



// What is an Interface in TypeScript 
// An interface in TypeScript is a Blueprint (Or Contract) that defines the structure of an object, that is, what properties it must have and what types those properties should be.

interface IUser{
    id : number;
    name : string;
    email : string;
    isActive? : boolean;
}

const user1 : IUser ={
    id : 101,
    name : "Zeno,",
    email : "zeno@gmail.com"
}
const user2: IUser = {
  id: 102,
  name: "Goku",
  email: "goku@example.com",
  isActive: true
};
console.log("User1 : ",user1);

const users: IUser[] = [user1, user2];
console.log("Total Users:", users.length);


// What are Functions in TypeScript ?
// A function is a reusable block of code that performs a specific task and can be executed whenever needed.

function calculatePayableAmount(amount:number,discountPct?:number,gstPct:number = 18):number{
       const discount =  amount * ((discountPct ?? 0) / 100);
        const amountAfterDiscount = amount - discount;
        const gst = amountAfterDiscount * (gstPct / 100);
        return amountAfterDiscount + gst;
}

const bill1 = calculatePayableAmount(2000);
console.log("Bill1 (no discount, default GST 18%):", bill1);



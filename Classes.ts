// What Are Classes in TypeScript ?
// A class in TypeScript is a blueprint for creating objects that combine data (properties) and behaviour (methods) into a single structured unit. 

/*
 In Angular:

Components are classes
Services are classes
Guards are classes
Interceptors are classes
Pipes are classes
*/

/*
 * TypeScript Classes
 * Goal: Understand class concepts in TypeScript:
 *  1) Class + Object creation (new)
 *  2) Constructor (initialization)
 *  3) Properties (data)
 *  4) Methods (behavior)
 *  5) Access modifiers: public, private, readonly
 *  6) Getter method (to safely expose private data)
 */

console.log(" Classes Demo ");

/**
 * A class is a blueprint to create objects.
 * In Angular, you often use classes for:
 * - Models (sometimes)
 * - Utility/Helper classes
 * - And Angular itself uses classes for Components/Services internally
 */
class BankAccount {
  // public: accessible from outside (default is public if not mentioned)
  public accountHolderName: string;

  // readonly: can be set only once (usually in constructor) and cannot be changed later
  public readonly accountNumber: string;

  // private: accessible ONLY inside the class
  private balance: number;

  constructor(accountHolderName: string, accountNumber: string, openingBalance: number) {
    // Initialize class properties when object is created
    this.accountHolderName = accountHolderName;
    this.accountNumber = accountNumber;
    this.balance = openingBalance;
  }

  // public method: can be called from outside
  public deposit(amount: number): void {
    if (amount <= 0) {
      console.log("Deposit amount must be greater than 0");
      return;
    }

    this.balance += amount;
    console.log(`Deposited: ${amount}. New Balance: ${this.balance}`);
  }

  // public method: can be called from outside
  public withdraw(amount: number): void {
    if (amount <= 0) {
      console.log("Withdraw amount must be greater than 0");
      return;
    }

    if (amount > this.balance) {
      console.log("Insufficient balance!");
      return;
    }

    this.balance -= amount;
    console.log(`Withdrawn: ${amount}. New Balance: ${this.balance}`);
  }

  // Getter method: a safe way to read private balance without exposing it directly
  public getBalance(): number {
    return this.balance;
  }
}

// Create an object (instance) of the class using "new"
const account1 = new BankAccount("Pranaya Rout", "ACC-1001", 5000);

console.log("Account Holder:", account1.accountHolderName); // public property access
console.log("Account Number:", account1.accountNumber);     // readonly property access

// account1.accountNumber = "ACC-9999";
// Compile-time error if uncommented: Cannot assign to 'accountNumber' because it is a read-only property

// account1.balance = 10000;
// Compile-time error if uncommented: Property 'balance' is private and only accessible within class 'BankAccount'

// Call methods (behavior)
account1.deposit(2000);
account1.withdraw(1000);

// Access private balance through a public method (getter)
console.log("Final Balance:", account1.getBalance());

console.log("=== End ===");
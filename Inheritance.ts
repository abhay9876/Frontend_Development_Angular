// What is Inheritance in TypeScript ?
// Inheritance is an object-oriented concept where one class (child or derived class) reuses and extends the properties and methods of another class (parent or base class). 

/**
 * TypeScript Inheritance
 * Goal: Understand inheritance concepts:
 *  1) Base class (Parent) and Derived class (Child)
 *  2) "extends" keyword
 *  3) Calling parent constructor using "super(...)"
 *  4) Inheriting parent properties/methods
 *  5) Method overriding (child changes parent behavior)
 */

console.log("=== Inheritance Demo ===");

// Step 1: Base (Parent) Class
// Represents common data and behavior for ALL users
class User {

  public userId: number;
  public name: string;
  public email: string;

  constructor(userId: number, name: string, email: string) {
    this.userId = userId;
    this.name = name;
    this.email = email;
  }

  // Common behavior shared by all users
  getUserSummary(): string {
    return `${this.name} (${this.email})`;
  }
}

// Step 2: Derived (Child) Class
// AdminUser IS-A User, but with extra responsibilities
class AdminUser extends User {

  public adminLevel: number;

  constructor( userId: number,  name: string,  email: string,  adminLevel: number) 
  {
    // Call parent constructor to initialize common fields
    super(userId, name, email);

    // Initialize admin-specific data
    this.adminLevel = adminLevel;
  }

  // Admin-specific behavior
  getAdminAccessInfo(): string {
    return `Admin Level: ${this.adminLevel}`;
  }
}

// Step 3: Create an Admin user object
const admin = new AdminUser(
  1,
  "Pranaya Rout",
  "pranaya@company.com",
  5
);

// Step 4: Use inherited + child behavior
console.log(admin.getUserSummary());      // inherited from AppUser
console.log(admin.getAdminAccessInfo());  // specific to AdminUser
// Problem 1: The Strict Type Checker
function checkVariable(input) {
    switch (typeof input) {
        case "string":
            return "string";
        case "number":
            return "number";
        case "boolean":
            return "boolean";
        case "bigint":
            return "bigint";
        case "undefined":
            return "undefined";
        case "object":
            return "object";
        default:
            return "unknown";
    }
}

// Test
console.log("Problem 1:");
console.log(checkVariable("hello"));
console.log(checkVariable(10));
console.log(checkVariable(true));
console.log(checkVariable(undefined));
console.log(checkVariable(null));


// Problem 2: Secure ID Generator
function generateIDs(count) {
    const ids = [];

    for (let i = 0; i < count; i++) {
        if (i === 5) {
            continue;
        }
        ids.push(`ID-${i}`);
    }

    return ids;
}

// Test
console.log("\nProblem 2:");
console.log(generateIDs(7));


// Problem 3: The Functional Sum
function calculateTotal(...numbers) {

    numbers.forEach(num => {
        if (typeof num !== "number") {
            throw new TypeError("Invalid input: All arguments must be numbers");
        }
    });

    return numbers.reduce((total, num) => total + num, 0);
}

// Test
console.log("\nProblem 3:");
console.log(calculateTotal(5, 10, 15));


// Problem 4: Leaderboard Filter
function getTopScorers(playerList) {

    return playerList
        .filter(player => player.score > 8)
        .map(player => player.name)
        .join(", ");
}

// Test
console.log("\nProblem 4:");

const players = [
    {name: "Kyla", score: 10},
    {name: "Megan", score: 5},
    {name: "Charlene", score: 9},
    {name: "Kyle", score: 7},
    {name: "Lenita", score: 12}
];

console.log(getTopScorers(players));


// Problem 5: The Private Inventory
class Item {

    #discount = 0.1;

    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    get finalPrice() {
        return this.price - (this.price * this.#discount);
    }
}

// Test
console.log("\nProblem 5:");

const laptop = new Item("Laptop", 45000);
console.log("Final Price:", laptop.finalPrice);


// Problem 6: Robust Division
function safeDivide(a, b) {

    try {

        if (b === 0) {
            throw new Error("Cannot divide by zero");
        }

        return a / b;

    } catch (error) {

        return error.message;

    } finally {

        console.log("Operation attempted");

    }
}

// Test
console.log("\nProblem 6:");
console.log(safeDivide(10, 2));
console.log(safeDivide(10, 0));
/* Project Standartlar:
   - Logging standardlar
   - Naming standardlar
       function, method, variable => CAMEL
       class => PASCAL
       folder, file => KEBAB
       CSS => SNAKE
  - Error handling
*/

//============= API APLIKESHIN PROGRAMMING INTERFEYS =============
/** 
 TREDITIONAL API
 REST API
 GraphQL API
*/

//Mitask------L
function reverseSentence(sentence: string): string {
  return sentence
    .split(" ")
    .map((word) => word.split("").reverse().join(""))
    .join(" ");
}

console.log(reverseSentence("we like coding!"));
//Mitask------M
function getSquareNumbers(arr: number[]): { number: number; square: number }[] {
  return arr.map((num: number) => ({
    number: num,
    square: num * num,
  }));
}

console.log(getSquareNumbers([1, 2, 3]));
console.log("========= MITASK N =========");
function palindromCheck(str: string): boolean {
  return str === str.split("").reverse().join("");
}

console.log(palindromCheck("dad")); // true
console.log(palindromCheck("son")); // false
//Mitask------O
console.log("MITASK-O");
function calculateSumOfNumbers(arr: any[]): number {
  let sum = 0;

  for (const item of arr) {
    if (typeof item === "number") {
      sum += item;
    }
  }

  return sum;
}

console.log(calculateSumOfNumbers([10, "10", { son: 10 }, true, 35])); //
// =================== MITASK P ===================
console.log("======== MITASK-P =======");
function objectToArray(obj: { [key: string]: any }): [string, any][] {
  return Object.entries(obj);
}

console.log(objectToArray({ a: 10, b: 20 }));

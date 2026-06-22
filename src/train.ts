/* Project Standartlar:
   - Logging standardlar
   - Naming standardlar
       function, method, variable => CAMEL
       class => PASCAL
       folder, file => KEBAB
       CSS => SNAKE
  - Error handling
*/

//============= Request API APLIKESHIN PROGRAMMING INTERFEYS =============
/** 
 TREDITIONAL API (form POST)
 REST API
 GraphQL API
*/

// ================ Fronend developlementlar ================
/** 
 Traditional frontend development => BSSR(admin) qisqacha SSR => EJS
 Modern FD => SPA (user aplekeshin) SINGLE PAGE APLIKESHIN => REACT
*/

/** cookies
 request join (requestni ichiga o'zini jolavoladi )
 self destroy (o'zini o'zi  destroy o'ldira qila oladi)

 */
/**validation
  Fronten
  Backend
  Database
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

// =================== MITASK Q ===================
console.log("======== MITASK-Q =======");
function hasProperty(obj: object, key: string): boolean {
  return key in obj;
}
console.log(hasProperty({ name: "BMW" }, "name"));
function hasPropert(obj: object, key: string) {
  return key in obj;
}
console.log(hasPropert({ name: "ILYOSBEK" }, "name"));

// =================== MITASK R ===================
console.log("======== MITASK-R =======");
function calculate(str: string): number {
  const [a, operator, b] = str.split(" ");

  if (operator === "+") {
    return Number(a) + Number(b);
  }

  throw new Error("Noto'g'ri operator");
}

console.log(calculate("1 + 3")); // 4
// =================== MITASK S ===================
console.log("======== MITASK-S =======");

function missingNumber(arr: number[]): number {
  arr.sort((a, b) => a - b);

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== i) {
      return i;
    }
  }

  return arr.length;
}

console.log(missingNumber([3, 0, 1]));
// =================== MITAS T  ===================
console.log("======== MITASK-T =======");

function mergeSortedArrays(arr1: number[], arr2: number[]): number[] {
  return [...arr1, ...arr2].sort((a, b) => a - b);
}

console.log(mergeSortedArrays([0, 3, 4], [4, 6]));

// =================== MITAS V  ===================
console.log("======== MITASK-V =======");
function countChars(str: string): Record<string, number> {
  const result: Record<string, number> = {};

  for (const char of str) {
    if (result[char]) {
      result[char]++;
    } else {
      result[char] = 1;
    }
  }

  return result;
}

console.log(countChars("hello"));

// =================== MITAS W  ===================
console.log("======== MITASK-w =======");
function chunkArray<T>(arr: T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error("Size must be greater than 0");
  }

  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

console.log(chunkArray([1, 2, 3, 4, 5], 2));

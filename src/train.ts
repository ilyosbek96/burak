/* Project Standartlar:
   - Logging standardlar
   - Naming standardlar
       function, method, variable => CAMEL
       class => PASCAL
       folder => KEBAB
       CSS => SNAKE
  - Error handling
*/


//Mitask------L
function reverseSentence(sentence: string): string {
  return sentence
    .split(" ") 
    .map(word => word.split("").reverse().join("")) 
    .join(" "); 
}


console.log(reverseSentence("we like coding!"));
//Mitask------M
function getSquareNumbers(arr: number[]): { number: number; square: number }[] {
  return arr.map((num: number) => ({
    number: num,
    square: num * num
  }));
}


console.log(getSquareNumbers([1, 2, 3]));
console.log("========= MITASK N =========")
function palindromCheck(str: string): boolean {
    return str === str.split("").reverse().join("");
}

console.log(palindromCheck("dad")); 
console.log(palindromCheck("son")); 
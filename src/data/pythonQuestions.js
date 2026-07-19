export default [
  // ═══════════════════════════════════════════
  // EASY — Variables & Data Types (10)
  // ═══════════════════════════════════════════
  {
    question: "What is the output of `type(42)`?",
    options: ["<class 'int'>", "<class 'float'>", "<class 'number'>", "<class 'decimal'>"],
    correct: 0,
    difficulty: "easy",
    category: "Python",
    explanation: "42 is an integer literal, so type() returns <class 'int'>."
  },
  {
    question: "Which keyword is used to define a variable in Python?",
    options: ["var", "let", "No keyword needed", "dim"],
    correct: 2,
    difficulty: "easy",
    category: "Python",
    explanation: "Python is dynamically typed — you assign a value directly without a keyword."
  },
  {
    question: "What is the result of `3.0 + 2`?",
    options: ["5", "5.0", "TypeError", "3.2"],
    correct: 1,
    difficulty: "easy",
    category: "Python",
    explanation: "When you add an int and a float, Python promotes the result to float."
  },
  {
    question: "Which of these is a valid Boolean value in Python?",
    options: ["TRUE", "True", "true", "Yes"],
    correct: 1,
    difficulty: "easy",
    category: "Python",
    explanation: "Python uses capitalized True and False for Boolean literals."
  },
  {
    question: "What does `bool('')` return?",
    options: ["True", "False", "None", "Error"],
    correct: 1,
    difficulty: "easy",
    category: "Python",
    explanation: "An empty string is falsy in Python, so bool('') returns False."
  },
  {
    question: "What is the output of `print(type(None))`?",
    options: ["<class 'null'>", "<class 'NoneType'>", "<class 'void'>", "<class 'None'>"],
    correct: 1,
    difficulty: "easy",
    category: "Python",
    explanation: "None is its own type called NoneType."
  },
  {
    question: "What is the result of `'hello' * 3`?",
    options: ["'hellohellohello'", "'hello 3'", "TypeError", "'hello3'"],
    correct: 0,
    difficulty: "easy",
    category: "Python",
    explanation: "The * operator repeats a string when used with an integer."
  },
  {
    question: "Which type is immutable in Python?",
    options: ["list", "dict", "set", "tuple"],
    correct: 3,
    difficulty: "easy",
    category: "Python",
    explanation: "Tuples are immutable — once created, their elements cannot be changed."
  },
  {
    question: "What is `len({'a': 1, 'b': 2, 'c': 3})`?",
    options: ["6", "3", "2", "Error"],
    correct: 1,
    difficulty: "easy",
    category: "Python",
    explanation: "len() on a dictionary returns the number of key-value pairs."
  },
  {
    question: "What is the output of `print(10 // 3)`?",
    options: ["3.33", "3", "4", "3.0"],
    correct: 1,
    difficulty: "easy",
    category: "Python",
    explanation: "The // operator performs floor (integer) division."
  },
  // ═══════════════════════════════════════════
  // EASY — Strings (7)
  // ═══════════════════════════════════════════
  {
    question: "What is the output of `'Python'.upper()`?",
    options: ["python", "PYTHON", "Python", "Error"],
    correct: 1,
    difficulty: "easy",
    category: "Python",
    explanation: "The upper() method converts all characters to uppercase."
  },
  {
    question: "How do you create an f-string in Python?",
    options: ["f'text'", "fmt'text'", "'text'.f", "string.f'text'"],
    correct: 0,
    difficulty: "easy",
    category: "Python",
    explanation: "Prefix the string literal with 'f' to create an f-string."
  },
  {
    question: "What does `'hello world'.split()` return?",
    options: ["['hello world']", "['hello', 'world']", "('hello', 'world')", "'hello world'"],
    correct: 1,
    difficulty: "easy",
    category: "Python",
    explanation: "split() with no arguments splits on whitespace into a list."
  },
  {
    question: "What is `'Hello'.startswith('He')`?",
    options: ["True", "False", "Error", "None"],
    correct: 0,
    difficulty: "easy",
    category: "Python",
    explanation: "startswith() checks if the string begins with the given substring."
  },
  {
    question: "What is the output of `'mississippi'.count('ss')`?",
    options: ["4", "2", "3", "1"],
    correct: 1,
    difficulty: "easy",
    category: "Python",
    explanation: "'ss' appears at positions 2 and 5, so count is 2."
  },
  {
    question: "What does `'hello'.replace('l', 'r')` return?",
    options: ["'herro'", "'hero'", "'helo'", "'herr'"],
    correct: 0,
    difficulty: "easy",
    category: "Python",
    explanation: "replace() replaces all occurrences — both l's become r's, giving 'herro'."
  },
  {
    question: "Which method removes whitespace from both ends of a string?",
    options: ["strip()", "trim()", "clean()", "chop()"],
    correct: 0,
    difficulty: "easy",
    category: "Python",
    explanation: "strip() removes leading and trailing whitespace (or specified characters)."
  },
  // ═══════════════════════════════════════════
  // EASY — Lists & Control Flow (8)
  // ═══════════════════════════════════════════
  {
    question: "What is `[1, 2, 3] + [4, 5]`?",
    options: ["[1, 2, 3, 4, 5]", "[5, 7]", "[[1, 2, 3], [4, 5]]", "Error"],
    correct: 0,
    difficulty: "easy",
    category: "Python",
    explanation: "The + operator concatenates two lists into one."
  },
  {
    question: "What does `list.append(4)` do?",
    options: ["Adds 4 to the beginning", "Adds 4 to the end", "Returns a new list with 4", "Removes 4"],
    correct: 1,
    difficulty: "easy",
    category: "Python",
    explanation: "append() adds a single element to the end of the list in place."
  },
  {
    question: "What is the output of `[10, 20, 30][1]`?",
    options: ["10", "20", "30", "Error"],
    correct: 1,
    difficulty: "easy",
    category: "Python",
    explanation: "Python uses zero-based indexing, so index 1 gives the second element."
  },
  {
    question: "What does `for i in range(5):` iterate over?",
    options: ["0, 1, 2, 3, 4", "1, 2, 3, 4, 5", "0, 1, 2, 3, 4, 5", "1, 2, 3, 4"],
    correct: 0,
    difficulty: "easy",
    category: "Python",
    explanation: "range(5) generates numbers from 0 up to (but not including) 5."
  },
  {
    question: "What is the output of `print('A' if True else 'B')`?",
    options: ["A", "B", "True", "AB"],
    correct: 0,
    difficulty: "easy",
    category: "Python",
    explanation: "The ternary expression returns 'A' because the condition is True."
  },
  {
    question: "Which statement skips the current loop iteration?",
    options: ["break", "continue", "pass", "skip"],
    correct: 1,
    difficulty: "easy",
    category: "Python",
    explanation: "continue jumps to the next iteration of the loop."
  },
  {
    question: "What is the output of `bool([])`?",
    options: ["True", "False", "None", "Error"],
    correct: 1,
    difficulty: "easy",
    category: "Python",
    explanation: "An empty list is falsy in Python."
  },
  {
    question: "What is the purpose of `pass`?",
    options: ["Raises an exception", "Does nothing — a null statement", "Exits the program", "Skips to the next line"],
    correct: 1,
    difficulty: "easy",
    category: "Python",
    explanation: "pass is a no-op statement used as a placeholder."
  },
  // ═══════════════════════════════════════════
  // EASY — Functions, Imports, Sets & Exceptions (15)
  // ═══════════════════════════════════════════
  {
    question: "Which keyword defines a function in Python?",
    options: ["function", "func", "def", "fn"],
    correct: 2,
    difficulty: "easy",
    category: "Python",
    explanation: "The 'def' keyword is used to define functions in Python."
  },
  {
    question: "What does `return` do in a function?",
    options: ["Prints a value", "Exits the function and optionally sends back a value", "Loops again", "Imports a module"],
    correct: 1,
    difficulty: "easy",
    category: "Python",
    explanation: "return exits the function and passes a value back to the caller."
  },
  {
    question: "What is the output of `print(type(lambda x: x))`?",
    options: ["<class 'function'>", "<class 'lambda'>", "<class 'method'>", "Error"],
    correct: 0,
    difficulty: "easy",
    category: "Python",
    explanation: "Lambdas are functions, so type() returns <class 'function'>."
  },
  {
    question: "Which import style is valid?",
    options: ["import math", "from math import sqrt", "import math as m", "All of the above"],
    correct: 3,
    difficulty: "easy",
    category: "Python",
    explanation: "All three are valid import styles in Python."
  },
  {
    question: "What does `if __name__ == '__main__':` do?",
    options: ["Defines a class", "Checks if the file is run directly", "Imports a module", "Defines a decorator"],
    correct: 1,
    difficulty: "easy",
    category: "Python",
    explanation: "This guard ensures code runs only when the script is executed directly, not when imported."
  },
  {
    question: "What is `{1, 2, 3} | {3, 4, 5}`?",
    options: ["{1, 2, 3, 4, 5}", "{3}", "{1, 2, 3, 3, 4, 5}", "Error"],
    correct: 0,
    difficulty: "easy",
    category: "Python",
    explanation: "The | operator returns the union of two sets."
  },
  {
    question: "Can a tuple contain mutable elements?",
    options: ["No, never", "Yes, but the elements can be modified", "Only with a special flag", "Only empty tuples"],
    correct: 1,
    difficulty: "easy",
    category: "Python",
    explanation: "A tuple itself is immutable, but it can contain mutable objects like lists."
  },
  {
    question: "What is `set([1, 1, 2, 3, 3])`?",
    options: ["[1, 1, 2, 3, 3]", "{1, 2, 3}", "(1, 2, 3)", "Error"],
    correct: 1,
    difficulty: "easy",
    category: "Python",
    explanation: "Sets automatically remove duplicates."
  },
  {
    question: "Which block always executes in try/except/finally?",
    options: ["try", "except", "finally", "else"],
    correct: 2,
    difficulty: "easy",
    category: "Python",
    explanation: "The finally block always runs, whether or not an exception occurred."
  },
  {
    question: "What does `open('file.txt', 'w')` do if the file doesn't exist?",
    options: ["Raises FileNotFoundError", "Creates the file", "Returns None", "Deletes the file"],
    correct: 1,
    difficulty: "easy",
    category: "Python",
    explanation: "Opening a file in 'w' mode creates it if it doesn't exist."
  },
  {
    question: "Which exception is raised by `1 / 0`?",
    options: ["ValueError", "ZeroDivisionError", "ArithmeticError", "RuntimeError"],
    correct: 1,
    difficulty: "easy",
    category: "Python",
    explanation: "Division by zero raises ZeroDivisionError."
  },
  {
    question: "What is the output of `print(type([]))`?",
    options: ["<class 'array'>", "<class 'list'>", "<class 'tuple'>", "<class 'sequence'>"],
    correct: 1,
    difficulty: "easy",
    category: "Python",
    explanation: "An empty literal [] creates a list."
  },
  {
    question: "What does `5 % 2` return?",
    options: ["2.5", "1", "2", "0"],
    correct: 1,
    difficulty: "easy",
    category: "Python",
    explanation: "The % operator returns the remainder of division."
  },
  {
    question: "What is `isinstance(42, int)`?",
    options: ["False", "True", "Error", "None"],
    correct: 1,
    difficulty: "easy",
    category: "Python",
    explanation: "isinstance checks if an object is an instance of a given type."
  },
  {
    question: "What does `'Py' + 'thon'` return?",
    options: ["'Py thon'", "'Python'", "Error", "['P','y','t','h','o','n']"],
    correct: 1,
    difficulty: "easy",
    category: "Python",
    explanation: "The + operator concatenates two strings."
  },
  // ═══════════════════════════════════════════
  // MEDIUM — String Methods & Formatting (5)
  // ═══════════════════════════════════════════
  {
    question: "What is `'hello {0} and {1}'.format('A', 'B')`?",
    options: ["'hello A and B'", "'hello B and A'", "'hello 0 and 1'", "Error"],
    correct: 0,
    difficulty: "medium",
    category: "Python",
    explanation: "Positional arguments in format() are substituted by their index."
  },
  {
    question: "What does `'abcde'[1:4]` return?",
    options: ["'abcd'", "'bcd'", "'bcde'", "'cde'"],
    correct: 1,
    difficulty: "medium",
    category: "Python",
    explanation: "Slicing [1:4] gets characters at indices 1, 2, and 3."
  },
  {
    question: "What is the output of `f'{3.14159:.2f}'`?",
    options: ["'3.14'", "'3.1'", "'3.142'", "'3.1416'"],
    correct: 0,
    difficulty: "medium",
    category: "Python",
    explanation: "The .2f format specifier rounds to 2 decimal places."
  },
  {
    question: "What does `'a,b,c'.partition(',')` return?",
    options: ["('a', ',', 'b,c')", "['a', 'b', 'c']", "('a,b', ',', 'c')", "'a,b,c'"],
    correct: 0,
    difficulty: "medium",
    category: "Python",
    explanation: "partition() splits at the first occurrence, returning a 3-tuple."
  },
  {
    question: "What does `'hello world'.title()` return?",
    options: ["'Hello World'", "'HELLO WORLD'", "'hello world'", "'Hello world'"],
    correct: 0,
    difficulty: "medium",
    category: "Python",
    explanation: "title() capitalizes the first letter of each word."
  },
  // ═══════════════════════════════════════════
  // MEDIUM — Lists & Comprehensions (5)
  // ═══════════════════════════════════════════
  {
    question: "What is `[x**2 for x in range(5)]`?",
    options: ["[1, 4, 9, 16, 25]", "[0, 1, 4, 9, 16]", "[0, 2, 4, 6, 8]", "[1, 2, 3, 4, 5]"],
    correct: 1,
    difficulty: "medium",
    category: "Python",
    explanation: "range(5) gives 0-4, and squaring each gives [0, 1, 4, 9, 16]."
  },
  {
    question: "What is `[i for i in range(10) if i % 2 == 0]`?",
    options: ["[1, 3, 5, 7, 9]", "[0, 2, 4, 6, 8]", "[2, 4, 6, 8, 10]", "[0, 1, 2, 3, 4]"],
    correct: 1,
    difficulty: "medium",
    category: "Python",
    explanation: "The comprehension filters for even numbers in range(10)."
  },
  {
    question: "What does `list(zip([1,2], ['a','b']))` return?",
    options: ["[(1, 'a'), (2, 'b')]", "[1, 'a', 2, 'b']", "[[1, 'a'], [2, 'b']]", "Error"],
    correct: 0,
    difficulty: "medium",
    category: "Python",
    explanation: "zip pairs elements from each iterable into tuples."
  },
  {
    question: "What is `[x for x in range(3) for y in range(2)]`?",
    options: ["[0, 0, 1, 1, 2, 2]", "[0, 1, 2]", "[0, 1, 0, 1, 0, 1]", "Error"],
    correct: 0,
    difficulty: "medium",
    category: "Python",
    explanation: "Nested comprehension iterates y for each x, expanding each x twice."
  },
  {
    question: "What does `max([10, 20, 30], key=lambda x: -x)` return?",
    options: ["30", "10", "20", "Error"],
    correct: 1,
    difficulty: "medium",
    category: "Python",
    explanation: "Using -x as key makes the largest positive value the smallest negative, so max returns the smallest original value."
  },
  // ═══════════════════════════════════════════
  // MEDIUM — Dictionaries (3)
  // ═══════════════════════════════════════════
  {
    question: "What is `{k: v**2 for k, v in {'a':1, 'b':2}.items()}`?",
    options: ["{'a': 1, 'b': 4}", "{'a': 2, 'b': 4}", "[('a', 1), ('b', 4)]", "Error"],
    correct: 0,
    difficulty: "medium",
    category: "Python",
    explanation: "Dictionary comprehension squares each value."
  },
  {
    question: "What does `{**{'a':1}, **{'a':2, 'b':3}}` return?",
    options: ["{'a': 1, 'b': 3}", "{'a': 2, 'b': 3}", "{'a': 1, 'a': 2, 'b': 3}", "Error"],
    correct: 1,
    difficulty: "medium",
    category: "Python",
    explanation: "Dict unpacking with ** — the second dict's 'a' overwrites the first."
  },
  {
    question: "What is `dict(zip(['a','b'], [1,2]))`?",
    options: ["{'a': 1, 'b': 2}", "[('a', 1), ('b', 2)]", "{'a': 'b', 1: 2}", "Error"],
    correct: 0,
    difficulty: "medium",
    category: "Python",
    explanation: "zip pairs the keys and values, dict() converts to a dictionary."
  },
  // ═══════════════════════════════════════════
  // MEDIUM — Control Flow (2)
  // ═══════════════════════════════════════════
  {
    question: "What does the following output?\n```python\nfor i in range(5):\n    if i == 3:\n        break\n    print(i, end=' ')\n```",
    options: ["0 1 2 3", "0 1 2", "0 1 2 3 4", "3"],
    correct: 1,
    difficulty: "medium",
    category: "Python",
    explanation: "break exits the loop when i==3, so only 0, 1, 2 are printed."
  },
  {
    question: "What does `match case` pattern matching match in Python 3.10+?",
    options: ["Only integers", "Only strings", "Various structural patterns", "Only regular expressions"],
    correct: 2,
    difficulty: "medium",
    category: "Python",
    explanation: "match/case supports matching values, sequences, mappings, classes, and more."
  },
  // ═══════════════════════════════════════════
  // MEDIUM — Functions (5)
  // ═══════════════════════════════════════════
  {
    question: "What does `def foo(a, b=5, c=10): pass` allow?",
    options: ["Only foo(1,2,3)", "foo(1), foo(1,2), foo(1,2,3)", "foo(b=5)", "All of the above"],
    correct: 1,
    difficulty: "medium",
    category: "Python",
    explanation: "Default arguments allow b and c to be optional."
  },
  {
    question: "What is `lambda x, y: x + y`?",
    options: ["A class definition", "An anonymous function", "A variable assignment", "A loop construct"],
    correct: 1,
    difficulty: "medium",
    category: "Python",
    explanation: "lambda creates a small anonymous function."
  },
  {
    question: "What does `*args` represent in a function definition?",
    options: ["A list of keyword arguments", "A tuple of positional arguments", "A single argument", "A dictionary"],
    correct: 1,
    difficulty: "medium",
    category: "Python",
    explanation: "*args collects extra positional arguments into a tuple."
  },
  {
    question: "What does `**kwargs` represent in a function definition?",
    options: ["A tuple of arguments", "A list of keyword arguments", "A dictionary of keyword arguments", "A set of arguments"],
    correct: 2,
    difficulty: "medium",
    category: "Python",
    explanation: "**kwargs collects extra keyword arguments into a dictionary."
  },
  {
    question: "What does `def foo(a, *, b): pass` enforce?",
    options: ["a and b must be positional", "b must be passed as a keyword argument", "b is optional", "a is optional"],
    correct: 1,
    difficulty: "medium",
    category: "Python",
    explanation: "The * forces all parameters after it to be passed as keyword arguments."
  },
  // ═══════════════════════════════════════════
  // MEDIUM — OOP Basics (6)
  // ═══════════════════════════════════════════
  {
    question: "What does `self` refer to in a class method?",
    options: ["The class itself", "The instance calling the method", "The parent class", "The module"],
    correct: 1,
    difficulty: "medium",
    category: "Python",
    explanation: "self refers to the instance on which the method is called."
  },
  {
    question: "What is `__init__`?",
    options: ["A destructor", "The constructor method", "A class variable", "A static method"],
    correct: 1,
    difficulty: "medium",
    category: "Python",
    explanation: "__init__ initializes a new instance of the class."
  },
  {
    question: "What does `@staticmethod` do?",
    options: ["Makes method callable without an instance", "Makes method only callable on the class", "Makes method static in memory", "All of the above"],
    correct: 0,
    difficulty: "medium",
    category: "Python",
    explanation: "A static method doesn't receive self and can be called without an instance."
  },
  {
    question: "What does `@classmethod` receive as its first argument?",
    options: ["self", "cls (the class)", "instance", "nothing"],
    correct: 1,
    difficulty: "medium",
    category: "Python",
    explanation: "classmethod receives the class (cls) as the first argument, not the instance."
  },
  {
    question: "What is the purpose of `super()`?",
    options: ["Creates a new instance", "Calls the parent class method", "Deletes the parent class", "Makes a method faster"],
    correct: 1,
    difficulty: "medium",
    category: "Python",
    explanation: "super() delegates method calls to the parent class."
  },
  {
    question: "What does `@property` allow you to do?",
    options: ["Use a method like a variable", "Make a variable private", "Cache a method result", "Define a class variable"],
    correct: 0,
    difficulty: "medium",
    category: "Python",
    explanation: "@property lets you access a method as if it were an attribute."
  },
  // ═══════════════════════════════════════════
  // MEDIUM — Modules, Exceptions & Venvs (4)
  // ═══════════════════════════════════════════
  {
    question: "What does `import os.path as p` do?",
    options: ["Imports the os module", "Imports os.path and aliases it as p", "Creates a path object", "Nothing"],
    correct: 1,
    difficulty: "medium",
    category: "Python",
    explanation: "as creates an alias — p becomes a shorthand for os.path."
  },
  {
    question: "What does `raise ValueError('msg')` do?",
    options: ["Catches a ValueError", "Creates and throws a ValueError", "Ignores the error", "Prints 'msg'"],
    correct: 1,
    difficulty: "medium",
    category: "Python",
    explanation: "raise explicitly throws an exception."
  },
  {
    question: "What is a virtual environment in Python?",
    options: ["A Docker container", "An isolated Python environment for dependencies", "A cloud environment", "A virtual machine"],
    correct: 1,
    difficulty: "medium",
    category: "Python",
    explanation: "A virtual environment isolates project dependencies from the global Python installation."
  },
  {
    question: "Which command creates a virtual environment?",
    options: ["pip install venv", "python -m venv myenv", "venv create myenv", "virtualenv new myenv"],
    correct: 1,
    difficulty: "medium",
    category: "Python",
    explanation: "python -m venv is the standard way to create a virtual environment."
  },
  // ═══════════════════════════════════════════
  // MEDIUM — Generators & Iterators (4)
  // ═══════════════════════════════════════════
  {
    question: "What does `yield` do in a function?",
    options: ["Returns a value and exits", "Produces a value lazily, pausing the function", "Raises an exception", "Creates a thread"],
    correct: 1,
    difficulty: "medium",
    category: "Python",
    explanation: "yield pauses the function and produces a value, resuming on next call."
  },
  {
    question: "What is the difference between a list and a generator?",
    options: ["No difference", "A generator is lazily evaluated, a list is eagerly evaluated", "A generator is faster but uses more memory", "A list can only hold integers"],
    correct: 1,
    difficulty: "medium",
    category: "Python",
    explanation: "Generators produce values one at a time (lazy), while lists store all values in memory (eager)."
  },
  {
    question: "What is a generator expression syntax?",
    options: ["(x for x in range(5))", "[x for x in range(5)]", "{x for x in range(5)}", "yield from range(5)"],
    correct: 0,
    difficulty: "medium",
    category: "Python",
    explanation: "Generator expressions use parentheses instead of brackets."
  },
  {
    question: "What does `yield from [1,2,3]` do?",
    options: ["Yields the list itself", "Yields each element individually", "Returns the list", "Raises an error"],
    correct: 1,
    difficulty: "medium",
    category: "Python",
    explanation: "yield from iterates over the iterable and yields each item."
  },
  // ═══════════════════════════════════════════
  // MEDIUM — Type Hints & Walrus (3)
  // ═══════════════════════════════════════════
  {
    question: "What does `def greet(name: str) -> str:` indicate?",
    options: ["name must be int", "Function returns str, name is str", "name is optional", "Function returns None"],
    correct: 1,
    difficulty: "medium",
    category: "Python",
    explanation: "Type hints specify expected argument types and return type."
  },
  {
    question: "What does the walrus operator `:=` do?",
    options: ["Compares two values", "Assigns and returns a value in an expression", "Defines a lambda", "Creates a generator"],
    correct: 1,
    difficulty: "medium",
    category: "Python",
    explanation: "The walrus operator assigns a value to a variable as part of an expression."
  },
  {
    question: "What does `(n := len([1,2,3]))` evaluate to?",
    options: ["None", "[1,2,3]", "3", "Error"],
    correct: 2,
    difficulty: "medium",
    category: "Python",
    explanation: "n is assigned the value 3, and the expression evaluates to 3."
  },
  // ═══════════════════════════════════════════
  // MEDIUM — Collections & itertools (4)
  // ═══════════════════════════════════════════
  {
    question: "What does `collections.Counter(['a','b','a'])` return?",
    options: ["{'a': 1, 'b': 1}", "{'a': 2, 'b': 1}", "['a', 'a', 'b']", "Error"],
    correct: 1,
    difficulty: "medium",
    category: "Python",
    explanation: "Counter counts occurrences of each element."
  },
  {
    question: "What does `collections.deque([1,2,3])` provide?",
    options: ["A fixed-size list", "O(1) append/pop from both ends", "A sorted list", "A hash table"],
    correct: 1,
    difficulty: "medium",
    category: "Python",
    explanation: "deque (double-ended queue) allows efficient append/pop from both ends."
  },
  {
    question: "What does `itertools.chain([1,2], [3,4])` return?",
    options: ["[[1,2],[3,4]]", "[1,2,3,4]", "(1,2,3,4)", "An iterator yielding 1,2,3,4"],
    correct: 3,
    difficulty: "medium",
    category: "Python",
    explanation: "chain combines iterables into a single iterator."
  },
  {
    question: "What does `functools.reduce(lambda x,y: x+y, [1,2,3,4])` return?",
    options: ["10", "[1,2,3,4]", "((1+2)+3)+4 as a lambda", "Error"],
    correct: 0,
    difficulty: "medium",
    category: "Python",
    explanation: "reduce applies the function cumulatively: 1+2=3, 3+3=6, 6+4=10."
  },
  // ═══════════════════════════════════════════
  // MEDIUM — File I/O, Regex, Decorators (4)
  // ═══════════════════════════════════════════
  {
    question: "What does `with open('f.txt') as f:` ensure?",
    options: ["File is locked", "File is automatically closed", "File is backed up", "File is compressed"],
    correct: 1,
    difficulty: "medium",
    category: "Python",
    explanation: "The with statement uses a context manager to guarantee cleanup (closing the file)."
  },
  {
    question: "What does `re.findall(r'\\d+', 'abc12def34')` return?",
    options: ["['12', '34']", "[12, 34]", "'1234'", "['abc', 'def']"],
    correct: 0,
    difficulty: "medium",
    category: "Python",
    explanation: "findall returns all non-overlapping matches as a list of strings."
  },
  {
    question: "What does `functools.wraps` do in a decorator?",
    options: ["Makes the function run faster", "Preserves the original function's metadata", "Wraps the return value", "Adds logging"],
    correct: 1,
    difficulty: "medium",
    category: "Python",
    explanation: "wraps copies __name__, __doc__, etc. from the original function to the wrapper."
  },
  {
    question: "Can you stack multiple decorators on one function?",
    options: ["Yes, they apply bottom-up", "Yes, they apply top-down", "No, only one allowed", "Only with classes"],
    correct: 0,
    difficulty: "medium",
    category: "Python",
    explanation: "Decorators are applied bottom-up: @b @a def f means a(b(f))."
  },
  // ═══════════════════════════════════════════
  // MEDIUM — Testing, Async, Web, Packages (5)
  // ═══════════════════════════════════════════
  {
    question: "What does `assert x > 0` do when x is -1?",
    options: ["Returns False", "Raises AssertionError", "Raises ValueError", "Does nothing"],
    correct: 1,
    difficulty: "medium",
    category: "Python",
    explanation: "assert raises AssertionError when the condition is False."
  },
  {
    question: "What does `async def` define?",
    options: ["A synchronous function", "A coroutine function", "A generator function", "A class method"],
    correct: 1,
    difficulty: "medium",
    category: "Python",
    explanation: "async def creates a coroutine function that can use await."
  },
  {
    question: "In Flask, what does `@app.route('/')` do?",
    options: ["Defines a class", "Maps a URL to a function", "Creates a database", "Imports a module"],
    correct: 1,
    difficulty: "medium",
    category: "Python",
    explanation: "The route decorator maps a URL path to a view function."
  },
  {
    question: "What file lists a project's Python dependencies?",
    options: ["requirements.txt", "dependencies.txt", "packages.txt", "setup.py only"],
    correct: 0,
    difficulty: "medium",
    category: "Python",
    explanation: "requirements.txt is the standard file for listing pip dependencies."
  },
  {
    question: "What is PyPI?",
    options: ["A Python IDE", "The Python Package Index", "A testing framework", "A database"],
    correct: 1,
    difficulty: "medium",
    category: "Python",
    explanation: "PyPI (Python Package Index) is the official repository for Python packages."
  },
  // ═══════════════════════════════════════════
  // HARD — OOP Advanced & MRO (8)
  // ═══════════════════════════════════════════
  {
    question: "What is the Method Resolution Order (MRO) in Python?",
    options: ["The order methods are defined in code", "The order Python searches for methods in a class hierarchy", "The order functions are called", "The order of module imports"],
    correct: 1,
    difficulty: "hard",
    category: "Python",
    explanation: "MRO determines the lookup order for methods in multiple inheritance scenarios."
  },
  {
    question: "What does `__slots__` do in a class?",
    options: ["Creates slots in memory", "Restricts instance attributes to a fixed set", "Makes class immutable", "Increases performance by 10x"],
    correct: 1,
    difficulty: "hard",
    category: "Python",
    explanation: "__slots__ limits instances to specific attributes, reducing memory usage."
  },
  {
    question: "What is the diamond problem in multiple inheritance?",
    options: ["Two classes inherit from one parent", "A class inherits from two classes that share a common ancestor", "Two methods have the same name", "A method calls itself"],
    correct: 1,
    difficulty: "hard",
    category: "Python",
    explanation: "The diamond problem occurs when a class inherits from two classes with a common base, creating ambiguity in method resolution."
  },
  {
    question: "What does `__new__` do versus `__init__`?",
    options: ["__new__ creates the instance, __init__ initializes it", "__new__ is for classes, __init__ is for instances", "They are the same", "__new__ is deprecated"],
    correct: 0,
    difficulty: "hard",
    category: "Python",
    explanation: "__new__ creates the object (called before __init__), __init__ configures it after creation."
  },
  {
    question: "What is a metaclass in Python?",
    options: ["A class for other classes", "A parent class", "A static class", "An abstract class"],
    correct: 0,
    difficulty: "hard",
    category: "Python",
    explanation: "A metaclass is the class of a class — it defines how classes themselves behave."
  },
  {
    question: "What does `type(MyClass)` return when MyClass is defined?",
    options: ["MyClass", "<class 'type'>", "<class 'MyClass'>", "object"],
    correct: 1,
    difficulty: "hard",
    category: "Python",
    explanation: "By default, classes are instances of the 'type' metaclass."
  },
  {
    question: "What is a descriptor in Python?",
    options: ["A variable naming convention", "An object defining __get__, __set__, or __delete__", "A type hint", "A docstring"],
    correct: 1,
    difficulty: "hard",
    category: "Python",
    explanation: "Descriptors are objects that define attribute access behavior via __get__, __set__, or __delete__."
  },
  {
    question: "What does `__mro__` attribute give you?",
    options: ["The class name", "The method resolution order tuple", "The parent class", "The module path"],
    correct: 1,
    difficulty: "hard",
    category: "Python",
    explanation: "__mro__ returns a tuple of the class and its bases in MRO order."
  },
  // ═══════════════════════════════════════════
  // HARD — Advanced Comprehensions & Generators (5)
  // ═══════════════════════════════════════════
  {
    question: "What is `{x: x**2 for x in range(5) if x % 2}`?",
    options: ["{0:0, 1:1, 2:4, 3:9, 4:16}", "{1:1, 3:9}", "{0:0, 2:4, 4:16}", "Error"],
    correct: 1,
    difficulty: "hard",
    category: "Python",
    explanation: "x % 2 is truthy for odd numbers, so only 1 and 3 are included."
  },
  {
    question: "What does `itertools.groupby` require about the input?",
    options: ["Nothing special", "The input must be sorted by the grouping key", "The input must be a list", "The input must be numeric"],
    correct: 1,
    difficulty: "hard",
    category: "Python",
    explanation: "groupby requires the input to be sorted by the grouping key to group consecutive elements."
  },
  {
    question: "What does `*` do in `first, *rest = [1, 2, 3, 4]`?",
    options: ["Creates a list", "Splits into first=1, rest=[2,3,4]", "Creates a tuple", "Error"],
    correct: 1,
    difficulty: "hard",
    category: "Python",
    explanation: "The star assignment operator collects remaining elements into a list."
  },
  {
    question: "What does `itertools.accumulate([1,2,3,4])` produce?",
    options: ["[1, 3, 6, 10]", "[1, 2, 3, 4]", "[1, 2, 6, 24]", "An iterator for running sums"],
    correct: 3,
    difficulty: "hard",
    category: "Python",
    explanation: "accumulate produces running totals: 1, 1+2=3, 3+3=6, 6+4=10."
  },
  {
    question: "What is the output of `[x := x + 1 for x in range(3)]`?",
    options: ["[1, 2, 3]", "[0, 1, 2]", "Error", "[1, 3, 5]"],
    correct: 0,
    difficulty: "hard",
    category: "Python",
    explanation: "The walrus operator in a comprehension: x starts at 0 (from range), then becomes 1, 2, 3."
  },
  // ═══════════════════════════════════════════
  // HARD — Decorators & Exceptions (4)
  // ═══════════════════════════════════════════
  {
    question: "What does `@functools.singledispatch` enable?",
    options: ["Single method classes", "Function overloading based on the type of the first argument", "Single inheritance", "Single thread execution"],
    correct: 1,
    difficulty: "hard",
    category: "Python",
    explanation: "singledispatch allows a function to have different implementations based on the first argument's type."
  },
  {
    question: "What does `except Exception as e:` catch vs `except:`?",
    options: ["No difference", "The first catches only Exceptions, the second catches everything including SystemExit", "The first is faster", "The second is deprecated"],
    correct: 1,
    difficulty: "hard",
    category: "Python",
    explanation: "Bare except catches everything including SystemExit and KeyboardInterrupt; except Exception is safer."
  },
  {
    question: "What does `raise ... from e` do?",
    options: ["Raises a new exception", "Chains exceptions, setting __cause__", "Ignores the original exception", "Creates a warning"],
    correct: 1,
    difficulty: "hard",
    category: "Python",
    explanation: "raise X from Y sets __cause__ on the new exception, preserving the exception chain."
  },
  {
    question: "What is a decorator factory?",
    options: ["A factory that makes decorators", "A function that returns a decorator", "A class-based decorator", "A built-in decorator"],
    correct: 1,
    difficulty: "hard",
    category: "Python",
    explanation: "A decorator factory is a function that takes arguments and returns a decorator."
  },
  // ═══════════════════════════════════════════
  // HARD — Async, Pattern Matching & Advanced (18)
  // ═══════════════════════════════════════════
  {
    question: "What does `asyncio.gather()` do?",
    options: ["Runs coroutines sequentially", "Runs coroutines concurrently and returns results in order", "Creates threads", "Runs only one coroutine"],
    correct: 1,
    difficulty: "hard",
    category: "Python",
    explanation: "gather runs multiple coroutines concurrently and returns results in the same order as input."
  },
  {
    question: "What does `async with` enable?",
    options: ["Synchronous context management", "Asynchronous context managers (__aenter__, __aexit__)", "Thread-safe file access", "Nothing special"],
    correct: 1,
    difficulty: "hard",
    category: "Python",
    explanation: "async with supports asynchronous context managers that can await in __aenter__ and __aexit__."
  },
  {
    question: "What does `_` mean in a match/case pattern?",
    options: ["A variable named _", "A wildcard that matches anything", "A private attribute", "An error"],
    correct: 1,
    difficulty: "hard",
    category: "Python",
    explanation: "_ is a wildcard that matches anything without binding to a variable."
  },
  {
    question: "What is a guard clause in match/case?",
    options: ["A try/except block", "An 'if' condition after a case pattern", "A finally block", "A class check"],
    correct: 1,
    difficulty: "hard",
    category: "Python",
    explanation: "Guards add conditions to case patterns: `case x if x > 0:` only matches when the condition is true."
  },
  {
    question: "What is the GIL in CPython?",
    options: ["A data structure", "Global Interpreter Lock — allows only one thread to execute Python bytecode", "A garbage collector", "A package manager"],
    correct: 1,
    difficulty: "hard",
    category: "Python",
    explanation: "The GIL is a mutex that protects access to Python objects, limiting multi-threaded CPU-bound performance."
  },
  {
    question: "What does `__all__` do in a module?",
    options: ["Exports all functions", "Defines which names are exported by `from module import *`", "Imports everything", "Deletes all variables"],
    correct: 1,
    difficulty: "hard",
    category: "Python",
    explanation: "__all__ is a list of strings specifying what gets imported with `from module import *`."
  },
  {
    question: "What is monkey patching?",
    options: ["Testing with monkeys", "Dynamically modifying classes/modules at runtime", "A debugging technique", "A sorting algorithm"],
    correct: 1,
    difficulty: "hard",
    category: "Python",
    explanation: "Monkey patching involves changing attributes of classes or modules at runtime to alter behavior."
  },
  {
    question: "What does `__init_subclass__` allow?",
    options: ["Initializing subclasses", "Customizing class creation when a subclass is defined", "Creating metaclasses", "Overriding __init__"],
    correct: 1,
    difficulty: "hard",
    category: "Python",
    explanation: "__init_subclass__ is called when a class inherits from the parent, enabling customization without metaclasses."
  },
  {
    question: "What is `weakref` used for?",
    options: ["Creating weak passwords", "Creating weak references that don't prevent garbage collection", "Error handling", "Type checking"],
    correct: 1,
    difficulty: "hard",
    category: "Python",
    explanation: "weakref creates references that don't increase the reference count, allowing objects to be garbage collected."
  },
  {
    question: "What does `abc.ABC` and `@abstractmethod` enforce?",
    options: ["Abstract syntax checking", "That subclasses must implement abstract methods", "Automatic type hints", "Code formatting"],
    correct: 1,
    difficulty: "hard",
    category: "Python",
    explanation: "ABC + @abstractmethod creates abstract base classes that require subclasses to implement specified methods."
  },
  {
    question: "What is the difference between `__str__` and `__repr__`?",
    options: ["No difference", "__str__ is for users, __repr__ is for developers/debugging", "__str__ is faster", "__repr__ is deprecated"],
    correct: 1,
    difficulty: "hard",
    category: "Python",
    explanation: "__str__ returns a readable string (for print), __repr__ returns an unambiguous representation (for debugging)."
  },
  {
    question: "What does `@dataclass` from Python 3.7+ provide?",
    options: ["A database class", "Auto-generates __init__, __repr__, __eq__ and more", "A data structure only", "A testing class"],
    correct: 1,
    difficulty: "hard",
    category: "Python",
    explanation: "@dataclass automatically generates boilerplate methods like __init__, __repr__, and __eq__."
  },
  {
    question: "What is `typing.Protocol` used for?",
    options: ["Network protocols", "Structural subtyping (duck typing) via type hints", "HTTP protocols", "File protocols"],
    correct: 1,
    difficulty: "hard",
    category: "Python",
    explanation: "Protocol enables structural subtyping — a class satisfies a Protocol if it has the required attributes/methods."
  },
  {
    question: "What does `match/case` with `|` do in a pattern?",
    options: ["Bitwise OR", "Matches either pattern (OR)", "Logical AND", "Pattern concatenation"],
    correct: 1,
    difficulty: "hard",
    category: "Python",
    explanation: "In match/case, | acts as an OR operator: `case 1 | 2 | 3:` matches 1, 2, or 3."
  },
  {
    question: "What is `contextlib.contextmanager` used for?",
    options: ["Managing files only", "Creating context managers from generator functions", "Managing threads", "Database connections only"],
    correct: 1,
    difficulty: "hard",
    category: "Python",
    explanation: "@contextmanager lets you write a context manager using yield in a generator function."
  },
  {
    question: "What is `functools.partial` used for?",
    options: ["Partial function application — pre-filling arguments", "Making functions private", "Creating partial classes", "Error handling"],
    correct: 0,
    difficulty: "hard",
    category: "Python",
    explanation: "partial creates a new function with some arguments pre-filled."
  },
  {
    question: "What does `concurrent.futures.ThreadPoolExecutor` provide?",
    options: ["Async/await support", "Thread pool for parallel execution", "Process pool", "Database connection pool"],
    correct: 1,
    difficulty: "hard",
    category: "Python",
    explanation: "ThreadPoolExecutor manages a pool of threads for concurrent execution of callables."
  },
  {
    question: "What does `collections.ChainMap` do?",
    options: ["Maps chains of characters", "Groups multiple dicts into a single view for lookups", "Creates a linked list", "Sorts dictionaries"],
    correct: 1,
    difficulty: "hard",
    category: "Python",
    explanation: "ChainMap treats multiple dicts as one — lookups search through all dicts in order."
  }
];
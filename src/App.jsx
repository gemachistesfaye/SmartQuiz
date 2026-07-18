import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import QuizPage from './pages/QuizPage';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import AdminPanel from './pages/AdminPanel';
import CodeLab from './pages/CodeLab';
import AIAssistant from './pages/AIAssistant';
import TheoryVault from './pages/TheoryVault';
import Cybersecurity from './pages/Cybersecurity';
import Analytics from './pages/Analytics';
import UserManagement from './pages/admin/UserManagement';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import ForgotPassword from './auth/ForgotPassword';
import ProtectedRoute from './auth/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { db } from './services/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const INITIAL_QUESTIONS = [
  // ─── JavaScript ────────────────────────────────
  { question: "What is the output of typeof null?", options: ["'object'", "'null'", "'undefined'", "'number'"], correct: 0, difficulty: "medium", category: "JavaScript", explanation: "typeof null returns 'object' — a well-known JS quirk." },
  { question: "Which keyword is used to define a constant in ES6?", options: ["var", "let", "const", "def"], correct: 2, difficulty: "easy", category: "JavaScript", explanation: "const declares a block-scoped, read-only variable." },
  { question: "What is hoisting in JavaScript?", options: ["Moving declarations to top", "Lifting errors", "A way to loop", "Memory cleanup"], correct: 0, difficulty: "hard", category: "JavaScript", explanation: "Hoisting moves all declarations to the top of their scope before execution." },
  { question: "What does '===' check?", options: ["Value only", "Value and type", "Reference only", "Nothing"], correct: 1, difficulty: "easy", category: "JavaScript", explanation: "=== checks both value and type (strict equality)." },
  { question: "Which method adds an element to the end of an array?", options: ["unshift()", "push()", "pop()", "shift()"], correct: 1, difficulty: "easy", category: "JavaScript", explanation: "push() appends one or more elements to the end of an array." },
  { question: "What is a closure?", options: ["A loop construct", "A function with access to its outer scope", "A closed browser tab", "A type of variable"], correct: 1, difficulty: "medium", category: "JavaScript", explanation: "A closure is a function that retains access to variables from its enclosing scope." },
  { question: "What is the output of: console.log(0.1 + 0.2 === 0.3)?", options: ["true", "false", "undefined", "TypeError"], correct: 1, difficulty: "medium", category: "JavaScript", explanation: "Floating-point precision issue — 0.1 + 0.2 equals 0.30000000000000004." },
  { question: "Which symbol is used for template literals?", options: ["Single quotes ''", "Double quotes \"\"", "Backticks ` `", "Parentheses ()"], correct: 2, difficulty: "easy", category: "JavaScript", explanation: "Template literals use backticks and support ${} interpolation." },
  { question: "What does Array.prototype.reduce() return?", options: ["A new array", "A single value", "undefined", "A boolean"], correct: 1, difficulty: "medium", category: "JavaScript", explanation: "reduce() accumulates array elements into a single output value." },
  { question: "What is the purpose of 'use strict'?", options: ["Enables ES6 features", "Enables strict mode catching common mistakes", "Makes code run faster", "Disables console.log"], correct: 1, difficulty: "medium", category: "JavaScript", explanation: "Strict mode helps catch unsafe actions and ambiguous behavior." },
  { question: "What is event bubbling?", options: ["Events going from parent to child", "Events going from child to parent", "Events being canceled", "Events firing twice"], correct: 1, difficulty: "medium", category: "JavaScript", explanation: "Event bubbling means events propagate from the innermost target up to the root." },
  { question: "Which method creates a new array with filtered elements?", options: ["map()", "forEach()", "filter()", "reduce()"], correct: 2, difficulty: "easy", category: "JavaScript", explanation: "filter() returns a new array with elements that pass the test function." },
  { question: "What is a Promise?", options: ["A variable type", "An object representing eventual completion of an async operation", "A loop", "A function"], correct: 1, difficulty: "medium", category: "JavaScript", explanation: "A Promise represents a value that may be available now, later, or never." },
  { question: "What does the 'async' keyword do?", options: ["Makes a function synchronous", "Makes a function return a Promise", "Deletes the function", "Makes a variable constant"], correct: 1, difficulty: "medium", category: "JavaScript", explanation: "async functions always return a Promise and allow use of await inside." },
  { question: "What is the output of typeof undefined?", options: ["'object'", "'null'", "'undefined'", "'boolean'"], correct: 2, difficulty: "easy", category: "JavaScript", explanation: "typeof undefined correctly returns the string 'undefined'." },
  { question: "Which method is used to convert a JSON string to an object?", options: ["JSON.stringify()", "JSON.parse()", "JSON.toObject()", "JSON.convert()"], correct: 1, difficulty: "easy", category: "JavaScript", explanation: "JSON.parse() deserializes a JSON string into a JavaScript object." },
  { question: "What is the event loop?", options: ["A type of for-loop", "A mechanism that handles async callbacks", "A recursion pattern", "A DOM method"], correct: 1, difficulty: "hard", category: "JavaScript", explanation: "The event loop continuously checks the call stack and task queue to execute callbacks." },
  { question: "What is destructuring assignment?", options: ["Breaking objects", "Extracting values from arrays/objects into variables", "Deleting properties", "Merging arrays"], correct: 1, difficulty: "easy", category: "JavaScript", explanation: "Destructuring lets you unpack values from arrays or properties from objects into distinct variables." },
  { question: "What is the spread operator?", options: ["...", "**", "&&", "=>"], correct: 0, difficulty: "easy", category: "JavaScript", explanation: "The spread operator (...) expands an iterable into individual elements." },
  { question: "Which method finds the first element that matches a condition?", options: ["find()", "filter()", "indexOf()", "search()"], correct: 0, difficulty: "medium", category: "JavaScript", explanation: "find() returns the first element that satisfies the provided testing function." },

  // ─── HTML ──────────────────────────────────────
  { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink Text Mode Language"], correct: 0, difficulty: "easy", category: "HTML", explanation: "HTML stands for HyperText Markup Language." },
  { question: "Which tag is used for the largest heading?", options: ["<heading>", "<h6>", "<h1>", "<head>"], correct: 2, difficulty: "easy", category: "HTML", explanation: "<h1> defines the largest and most important heading." },
  { question: "Which attribute is used to specify an image source?", options: ["href", "link", "src", "img"], correct: 2, difficulty: "easy", category: "HTML", explanation: "The src attribute specifies the path to the image." },
  { question: "What is the correct HTML for creating a hyperlink?", options: ["<link>url</link>", "<a href='url'>link</a>", "<href>url</href>", "<url>link</url>"], correct: 1, difficulty: "easy", category: "HTML", explanation: "The <a> tag with href attribute creates hyperlinks." },
  { question: "Which tag is used for an unordered list?", options: ["<ol>", "<li>", "<ul>", "<list>"], correct: 2, difficulty: "easy", category: "HTML", explanation: "<ul> creates an unordered (bulleted) list." },
  { question: "What is the correct way to add a comment in HTML?", options: ["// comment", "/* comment */", "<!-- comment -->", "# comment"], correct: 2, difficulty: "easy", category: "HTML", explanation: "HTML comments are written between <!-- and -->." },
  { question: "Which meta tag controls viewport behavior on mobile?", options: ["<meta charset>", "<meta name='viewport'>", "<meta name='description'>", "<meta name='author'>"], correct: 1, difficulty: "medium", category: "HTML", explanation: "The viewport meta tag controls layout and scaling on mobile devices." },
  { question: "Which element represents the main content of a document?", options: ["<div>", "<section>", "<main>", "<body>"], correct: 2, difficulty: "medium", category: "HTML", explanation: "<main> represents the dominant content of the <body>." },
  { question: "What is the purpose of the <form> tag?", options: ["Display data", "Create input forms for user data", "Style content", "Link pages"], correct: 1, difficulty: "easy", category: "HTML", explanation: "The <form> element contains interactive controls for submitting information." },
  { question: "Which attribute makes an input field required?", options: ["mandatory", "required", "validate", "necessary"], correct: 1, difficulty: "easy", category: "HTML", explanation: "The required attribute specifies that an input field must be filled before submitting." },
  { question: "What does the <canvas> element do?", options: ["Displays vector graphics", "Provides a drawing surface via JavaScript", "Creates 3D models", "Embeds PDF files"], correct: 1, difficulty: "medium", category: "HTML", explanation: "<canvas> provides a resolution-dependent bitmap rendering surface for drawing with JS." },
  { question: "Which tag is used for a navigation section?", options: ["<nav>", "<menu>", "<navigate>", "<links>"], correct: 0, difficulty: "easy", category: "HTML", explanation: "<nav> represents a section with navigation links." },
  { question: "What is semantic HTML?", options: ["HTML with animations", "Using tags that describe meaning", "HTML with CSS", "Compressed HTML"], correct: 1, difficulty: "medium", category: "HTML", explanation: "Semantic HTML uses meaningful tags like <header>, <article>, <footer> instead of generic <div>." },
  { question: "Which input type creates a date picker?", options: ["text", "date", "calendar", "time"], correct: 1, difficulty: "easy", category: "HTML", explanation: "input type='date' provides a native date picker in modern browsers." },
  { question: "What is the purpose of the alt attribute on images?", options: ["Sets image size", "Provides alternative text for accessibility", "Adds a caption", "Defines image format"], correct: 1, difficulty: "easy", category: "HTML", explanation: "alt text describes the image for screen readers and when the image fails to load." },

  // ─── CSS ───────────────────────────────────────
  { question: "What does CSS stand for?", options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Colorful Style Sheets"], correct: 1, difficulty: "easy", category: "CSS", explanation: "CSS stands for Cascading Style Sheets." },
  { question: "Which property changes text color?", options: ["font-color", "text-color", "color", "foreground"], correct: 2, difficulty: "easy", category: "CSS", explanation: "The color property sets the text color of an element." },
  { question: "How do you select an element with id 'main'?", options: [".main", "#main", "main", "*main"], correct: 1, difficulty: "easy", category: "CSS", explanation: "The # selector targets elements by their ID." },
  { question: "Which property controls text size?", options: ["text-size", "font-size", "text-style", "font-style"], correct: 1, difficulty: "easy", category: "CSS", explanation: "font-size sets the size of the font." },
  { question: "What is the CSS box model?", options: ["A 3D rendering technique", "Content + Padding + Border + Margin", "A JavaScript object", "A layout algorithm"], correct: 1, difficulty: "medium", category: "CSS", explanation: "The box model describes the rectangular boxes generated for elements: content, padding, border, margin." },
  { question: "Which property creates space inside an element's border?", options: ["margin", "padding", "border-spacing", "gap"], correct: 1, difficulty: "easy", category: "CSS", explanation: "Padding creates space between the content and the border." },
  { question: "How do you make text bold in CSS?", options: ["font-weight: bold", "text-weight: bold", "font-style: bold", "text-bold: true"], correct: 0, difficulty: "easy", category: "CSS", explanation: "font-weight: bold makes text bold." },
  { question: "What does display: flex do?", options: ["Makes text flexible", "Creates a flexbox container", "Hides the element", "Adds animation"], correct: 1, difficulty: "medium", category: "CSS", explanation: "display: flex enables flexbox layout for the element's children." },
  { question: "Which property adds shadow to text?", options: ["text-shadow", "box-shadow", "font-shadow", "shadow"], correct: 0, difficulty: "medium", category: "CSS", explanation: "text-shadow adds shadow effect to text." },
  { question: "What is CSS specificity?", options: ["How fast CSS loads", "The priority order of CSS rules", "Browser compatibility", "File size of stylesheets"], correct: 1, difficulty: "medium", category: "CSS", explanation: "Specificity determines which CSS rule is applied when multiple rules match the same element." },
  { question: "Which value of position keeps an element in the normal flow?", options: ["fixed", "absolute", "static", "sticky"], correct: 2, difficulty: "medium", category: "CSS", explanation: "static is the default — element follows normal document flow." },
  { question: "How do you center a block element horizontally?", options: ["margin: 0 auto", "text-align: center", "display: center", "float: center"], correct: 0, difficulty: "medium", category: "CSS", explanation: "margin: 0 auto centers a block element within its parent." },
  { question: "Which property creates rounded corners?", options: ["border-radius", "corner-radius", "rounded", "border-style"], correct: 0, difficulty: "easy", category: "CSS", explanation: "border-radius defines the radius of the element's corners." },
  { question: "What does z-index control?", options: ["Text size", "Stacking order of overlapping elements", "Animation speed", "Color depth"], correct: 1, difficulty: "medium", category: "CSS", explanation: "z-index controls the vertical stacking order of positioned elements." },
  { question: "Which CSS unit is relative to the parent element's font size?", options: ["px", "em", "vh", "pt"], correct: 1, difficulty: "medium", category: "CSS", explanation: "em is relative to the font size of the parent element." },

  // ─── React ─────────────────────────────────────
  { question: "What is React?", options: ["A database", "A JavaScript library for building UIs", "A CSS framework", "A server language"], correct: 1, difficulty: "easy", category: "React", explanation: "React is a JavaScript library for building user interfaces." },
  { question: "What is JSX?", options: ["A new programming language", "JavaScript XML — syntax extension for JS", "A CSS preprocessor", "A testing tool"], correct: 1, difficulty: "easy", category: "React", explanation: "JSX lets you write HTML-like syntax inside JavaScript." },
  { question: "What hook is used for side effects?", options: ["useState", "useEffect", "useContext", "useReducer"], correct: 1, difficulty: "easy", category: "React", explanation: "useEffect handles side effects like data fetching and subscriptions." },
  { question: "What does useState return?", options: ["Just the value", "A state variable and a setter function", "An object", "A Promise"], correct: 1, difficulty: "easy", category: "React", explanation: "useState returns [state, setState] — the current value and a function to update it." },
  { question: "What is a prop in React?", options: ["A local variable", "Data passed from parent to child component", "A global state", "A CSS property"], correct: 1, difficulty: "easy", category: "React", explanation: "Props are read-only data passed from a parent component to a child." },
  { question: "What is the virtual DOM?", options: ["The real DOM", "A lightweight copy of the real DOM", "A browser API", "A testing framework"], correct: 1, difficulty: "medium", category: "React", explanation: "React keeps a virtual copy of the DOM to minimize expensive real DOM operations." },
  { question: "When does useEffect run by default?", options: ["Before every render", "After every render", "Only once on mount", "Never"], correct: 1, difficulty: "medium", category: "React", explanation: "By default, useEffect runs after every completed render." },
  { question: "What is the key prop used for?", options: ["Styling elements", "Helping React identify list items", "Setting state", "Fetching data"], correct: 1, difficulty: "medium", category: "React", explanation: "Keys help React identify which items have changed, been added, or removed in lists." },
  { question: "What is prop drilling?", options: ["Passing props deeply through many components", "Deleting props", "Using TypeScript", "Memoizing props"], correct: 0, difficulty: "medium", category: "React", explanation: "Prop drilling is passing data through many intermediate components to reach a deeply nested child." },
  { question: "What is React Context used for?", options: ["Styling", "Sharing state globally without prop drilling", "Routing", "Form validation"], correct: 1, difficulty: "medium", category: "React", explanation: "Context provides a way to share values between components without explicitly passing props." },
  { question: "What does useRef return?", options: ["A DOM element directly", "A mutable ref object with .current", "A state variable", "A Promise"], correct: 1, difficulty: "medium", category: "React", explanation: "useRef returns { current: initialValue } — a persistent mutable object across renders." },
  { question: "Which hook replaces Redux for simple state?", options: ["useState", "useReducer", "useEffect", "useMemo"], correct: 1, difficulty: "medium", category: "React", explanation: "useReducer manages complex state logic with a reducer function, similar to Redux." },
  { question: "What does useMemo do?", options: ["Memorizes component names", "Caches expensive computations between renders", "Creates memo files", "Stores form data"], correct: 1, difficulty: "hard", category: "React", explanation: "useMemo returns a memoized value, recalculating only when dependencies change." },
  { question: "What is React.memo used for?", options: ["Adding comments", "Preventing unnecessary re-renders of a component", "Memoizing events", "Saving data to localStorage"], correct: 1, difficulty: "hard", category: "React", explanation: "React.memo skips re-rendering a component if its props haven't changed." },

  // ─── Cybersecurity ─────────────────────────────
  { question: "What is XSS?", options: ["Cross-Site Scripting", "Extra Secure System", "External Style Sheet", "Extra Safe Storage"], correct: 0, difficulty: "easy", category: "Cybersecurity", explanation: "XSS (Cross-Site Scripting) injects malicious scripts into trusted websites." },
  { question: "What is SQL injection?", options: ["Adding SQL to a database", "Inserting malicious SQL code into queries", "Optimizing SQL queries", "Creating SQL tables"], correct: 1, difficulty: "easy", category: "Cybersecurity", explanation: "SQL injection inserts malicious SQL statements into input fields to manipulate the database." },
  { question: "What does HTTPS encrypt?", options: ["Only passwords", "Data in transit between client and server", "Files on disk", "CPU instructions"], correct: 1, difficulty: "easy", category: "Cybersecurity", explanation: "HTTPS encrypts all data transmitted between the browser and the server." },
  { question: "What is a firewall?", options: ["A physical wall", "A network security system monitoring traffic", "A type of virus", "An antivirus software"], correct: 1, difficulty: "easy", category: "Cybersecurity", explanation: "A firewall monitors and controls incoming and outgoing network traffic based on security rules." },
  { question: "What is phishing?", options: ["Fishing for data in a lake", "A social engineering attack tricking users into revealing info", "A type of malware", "A password manager"], correct: 1, difficulty: "easy", category: "Cybersecurity", explanation: "Phishing tricks users into providing sensitive data by posing as a trustworthy entity." },
  { question: "What makes a strong password?", options: ["Your birthday", "Short and simple", "At least 12 characters with mixed types", "A dictionary word"], correct: 2, difficulty: "easy", category: "Cybersecurity", explanation: "Strong passwords use 12+ characters with uppercase, lowercase, numbers, and symbols." },
  { question: "What is two-factor authentication (2FA)?", options: ["Using two passwords", "Requiring two forms of verification to log in", "Logging in twice", "Having two accounts"], correct: 1, difficulty: "easy", category: "Cybersecurity", explanation: "2FA adds an extra layer by requiring a second form of identification beyond just a password." },
  { question: "What is CSRF?", options: ["Cross-Site Request Forgery", "Computer Security Research Foundation", "Certified Secure File Registry", "Cross System File Reader"], correct: 0, difficulty: "medium", category: "Cybersecurity", explanation: "CSRF tricks authenticated users into submitting unintended requests to a web application." },
  { question: "What is the purpose of input sanitization?", options: ["Making inputs pretty", "Removing or encoding dangerous characters from user input", "Encrypting data", " compressing data"], correct: 1, difficulty: "medium", category: "Cybersecurity", explanation: "Input sanitization prevents injection attacks by cleaning user-provided data." },
  { question: "What is a man-in-the-middle attack?", options: ["A physical attack", "Intercepting communication between two parties", "Attacking a server directly", "Using a VPN"], correct: 1, difficulty: "medium", category: "Cybersecurity", explanation: "An attacker secretly intercepts and possibly alters communication between two parties." },
  { question: "What is CORS?", options: ["Cross-Origin Resource Sharing — controls cross-domain requests", "A type of encryption", "A password hashing algorithm", "A DNS service"], correct: 0, difficulty: "medium", category: "Cybersecurity", explanation: "CORS is a security mechanism that allows or restricts resource requests from different origins." },
  { question: "What does a salt do in password hashing?", options: ["Makes passwords longer", "Adds random data before hashing to prevent rainbow tables", "Encrypts the password", "Stores the password in plain text"], correct: 1, difficulty: "medium", category: "Cybersecurity", explanation: "Salting adds unique random data to each password before hashing, defeating precomputed attacks." },
  { question: "What is zero trust security?", options: ["Trusting no one by default", "No security at all", "Trusting everyone on the network", "A single password system"], correct: 0, difficulty: "medium", category: "Cybersecurity", explanation: "Zero trust means no user or device is trusted by default, even inside the network perimeter." },
  { question: "What is the principle of least privilege?", options: ["Giving all users admin access", "Granting only the minimum permissions needed", "Locking all accounts", "Using the weakest password"], correct: 1, difficulty: "medium", category: "Cybersecurity", explanation: "Least privilege means giving users only the access they need to perform their job — nothing more." },
  { question: "What is OWASP?", options: ["A web browser", "Open Web Application Security Project — a security standard", "A programming language", "A firewall brand"], correct: 1, difficulty: "medium", category: "Cybersecurity", explanation: "OWASP is a nonprofit foundation working to improve software security through standards and tools." },
];

function App() {
  React.useEffect(() => {
    const seedQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, "questions"));
      const existingTexts = new Set(querySnapshot.docs.map(doc => doc.data().question));
      const missing = INITIAL_QUESTIONS.filter(q => !existingTexts.has(q.question));
      for (const q of missing) {
        await addDoc(collection(db, "questions"), q);
      }
    };
    seedQuestions();
  }, []);

  return (
    <AuthProvider>
      <ToastContainer theme="dark" position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Student Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/quiz" 
          element={<ProtectedRoute><QuizPage /></ProtectedRoute>} 
        />
        <Route 
          path="/profile" 
          element={<ProtectedRoute><Profile /></ProtectedRoute>} 
        />
        <Route 
          path="/leaderboard" 
          element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} 
        />
        <Route 
          path="/codelab" 
          element={<ProtectedRoute><CodeLab /></ProtectedRoute>} 
        />
        <Route 
          path="/ai-assistant" 
          element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} 
        />
        <Route 
          path="/theory" 
          element={<ProtectedRoute><TheoryVault /></ProtectedRoute>} 
        />
        <Route 
          path="/cybersecurity" 
          element={<ProtectedRoute><Cybersecurity /></ProtectedRoute>} 
        />
        <Route 
          path="/analytics" 
          element={<ProtectedRoute><Analytics /></ProtectedRoute>} 
        />

        {/* Admin Routes (Strictly Protected) */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute requireAdmin={true}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute requireAdmin={true}>
              <UserManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/questions" 
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminPanel />
            </ProtectedRoute>
          } 
        />

        {/* Catch-all Redirect */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

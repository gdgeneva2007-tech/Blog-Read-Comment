react-client-template/
├── src/
│ ├── api/
│ │ └── client.js ← axios setup (template)
│ ├── context/
│ │ └── AuthContext.jsx ← auth state (template)
│ ├── hooks/
│ │ └── useAuth.js ← auth hook (template)
│ ├── components/
│ │ ├── Navbar.jsx ← nav with auth links (template)
│ │ └── ProtectedRoute.jsx ← redirect if not logged in (template)
│ ├── pages/
│ │ ├── Home.jsx ← starter home page
│ │ ├── Login.jsx ← login form (template)
│ │ ├── Signup.jsx ← signup form (template)
│ │ └── NotFound.jsx ← 404 page (template)
│ ├── App.jsx ← routes setup (template)
│ └── main.jsx ← entry point (template)
├── .env
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── .gitignore
└── package.json

MAINTAIN (copy as-is, never edit):
src/api/client.js ← axios setup never changes
src/context/AuthContext.jsx ← auth context never changes
src/hooks/useAuth.js ← auth hook never changes
src/components/ProtectedRoute.jsx ← redirect logic never changes
src/pages/Login.jsx ← login form never changes
src/pages/Signup.jsx ← signup form never changes
src/pages/NotFound.jsx ← 404 page never changes
src/main.jsx ← entry point never changes

CONFIGURE ONCE PER PROJECT (edit during setup only):
src/App.jsx ← add your routes
src/components/Navbar.jsx ← add your nav links
.env ← set VITE_API_URL

ADD NEW FILES PER PROJECT (your actual work):
src/pages/[YourPage].jsx ← your pages
src/components/[Component].jsx ← your reusable components

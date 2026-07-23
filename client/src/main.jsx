// ─────────────────────────────────────────────────────────────────────────────
// main.jsx
// Core entry point of the React app that mounts the application to the DOM.
// ─────────────────────────────────────────────────────────────────────────────

import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css' // Import Tailwind and global styles
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx'

// Create the React root and render the application inside the 'root' element in index.html.
createRoot(document.getElementById('root')).render(
  // BrowserRouter enables declarative, client-side routing within our app.
  // We pass v7 configuration flags for seamless future-proofing.
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    {/* AppContextProvider wraps the app to provide global state variables to all components */}
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>,
)

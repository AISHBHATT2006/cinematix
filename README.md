# 🎬 CINEMATIX — Movie Ticket Booking App

A full-featured movie ticket booking web app built with **React** and **Node.js (Create React App)**.

## React Concepts Covered

| Concept | Where Used |
|---|---|
| **React JSX** | All components use JSX syntax |
| **Class Components + Constructor** | `NavLogo` in `Navbar.js` with `this.state` and lifecycle methods |
| **Functional Components** | `MovieCard`, `SeatMap`, all pages |
| **State** | `useState` in Home (search/filter), BookingPage (seats), MovieDetail (date/time) |
| **Props + PropTypes** | `MovieCard.propTypes`, `SeatMap.propTypes` |
| **Context API (Global State)** | `BookingContext.js` — useReducer + createContext |
| **Hooks** | `useState`, `useEffect`, `useReducer`, `useContext`, `useMemo`, `useCallback`, `useRef` |
| **React Router v6** | `BrowserRouter`, `Routes`, `Route`, `Link`, `useNavigate`, `useParams`, `useLocation` |
| **CSS Modules / Scoped CSS** | Each component has its own `.css` file |
| **LocalStorage persistence** | Bookings saved across sessions via `BookingContext` |

## Features

- 🎥 Browse 6 movies with search, genre filter, and sort
- 📅 Select date and showtime for each movie
- 💺 Interactive seat map (Premium / Standard / Economy)
- 🎟️ Animated booking confirmation with ticket UI
- 📋 My Bookings page with cancel functionality
- 📱 Fully responsive design

## Project Structure

```
cinematix/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js / .css     ← Class component (NavLogo)
│   │   ├── MovieCard.js / .css  ← PropTypes validation
│   │   ├── SeatMap.js / .css    ← Complex stateless component
│   │   └── Footer.js / .css
│   ├── context/
│   │   └── BookingContext.js    ← Global state (useReducer + Context)
│   ├── data/
│   │   └── movies.js            ← Movie data + seat generator
│   ├── pages/
│   │   ├── Home.js / .css       ← Search, filter, sort with useMemo
│   │   ├── MovieDetail.js / .css← Date/time picker, routing
│   │   ├── BookingPage.js / .css← Seat selection, 2-step flow
│   │   ├── Confirmation.js / .css← Animated ticket
│   │   ├── MyBookings.js / .css ← Cancel bookings
│   │   └── NotFound.js
│   ├── App.js                   ← Router setup
│   ├── index.js                 ← Entry point
│   └── index.css                ← Global styles + CSS variables
└── package.json
```

## Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start
# Opens http://localhost:3000
```

## Deployment

### Option 1: Vercel (Recommended — Free)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow the prompts — your app will be live at https://your-app.vercel.app
```

### Option 2: Netlify (Free)
```bash
# Build the app
npm run build

# Drag and drop the /build folder to netlify.com/drop
# OR use Netlify CLI:
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

### Option 3: GitHub Pages (Free)

1. Add `"homepage": "https://YOUR_USERNAME.github.io/cinematix"` to `package.json`
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Add to `package.json` scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```
4. Push to GitHub, then run: `npm run deploy`

### Option 4: Railway / Render
- Connect your GitHub repo
- Set build command: `npm run build`
- Set output directory: `build`
- Deploy!

## Tech Stack

- React 18
- React Router v6
- PropTypes
- CSS Custom Properties (no external UI library)
- LocalStorage for persistence
- Google Fonts (Bebas Neue + DM Sans)

import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";

// import { Home } from './pages/Home/index.jsx';
import { NotFound } from "./pages/_404.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

import "./style.css";
import LandingPage from "./components/LandingPage.jsx";
import Dashboard from "./components/Dashboard.jsx";

export function App() {
  return (
    <LocationProvider>
      {/* <Header /> */}
      <main>
        <Router>
          {/* <Route path="/" component={Home} /> */}
          <Route path="/" component={LandingPage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route default component={NotFound} />
        </Router>
      </main>
    </LocationProvider>
  );
}

render(<App />, document.getElementById("app"));

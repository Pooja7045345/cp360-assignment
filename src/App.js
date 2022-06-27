import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './Login';
import Home from './Home';
function App() {
  return (
    <div className="App">
      <Router>
       <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/home"  element={<Home />} />
       </Routes>
    </Router>
    </div>
  );
}

export default App;

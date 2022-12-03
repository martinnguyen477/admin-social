import './App.css';
import './styles/sb-admin-2.min.css';
import { Admin } from './pages/Admin/Admin';
import { PrivateRoute } from './components';
import { Login } from './pages/Account';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Users } from 'pages/Admin/Users/Users';

function App() {
  return (
    <div className='App' id='wrapper'>
      <Router>
        <Routes>
        <Route
            path="/login"
            element={
                <Login />
            }
          />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

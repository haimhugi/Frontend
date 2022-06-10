import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';



import Users from './users/pages/Users';

import './App.css';
import AddUser from './users/pages/AddUser';
import MainNavigation from './shared/components/Navigation/MainNavigation'


function App() {

  return (
    <BrowserRouter>
      <MainNavigation />
      <main>

        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route
            path="*"
            element={<Navigate to="/users" replace />}
          />
        </Routes>
      </main>

    </BrowserRouter>
  )


}

export default App;

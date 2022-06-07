import Home from './AuthenticatedPages/HomePage.js';
import {
    Routes,
    Route,
    Link,
    BrowserRouter
  } from 'react-router-dom';

export default AuthenticatedPages

function AuthenticatedPages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route/>
      </Routes>
    </BrowserRouter>
  );
}
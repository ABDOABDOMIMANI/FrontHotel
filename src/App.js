import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ReservationList from './components/ReservationList';
import ReservationForm from './components/ReservationForm';
import ReservationEdit from './components/ReservationEdit';
import ReservationDetails from './components/ReservationDetails';
import 'typeface-inter';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
    


        <Routes>
          <Route path="/" element={<ReservationList />} />
          <Route path="/new-reservation" element={<ReservationForm />} />
          <Route path="/edit-reservation/:id" element={<ReservationEdit />} />
          <Route path="/reservation/:id" element={<ReservationDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


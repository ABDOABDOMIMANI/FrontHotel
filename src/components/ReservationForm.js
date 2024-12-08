import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateReservation() {
  const [formData, setFormData] = useState({
    clientNom: '',
    clientPrenom: '',
    clientEmail: '',
    chambreType: '',
    checkIn: '',
    checkOut: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleBackToList = () => {
    navigate('/'); // Navigate back to the reservations list page
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await axios.post('http://localhost:8080/api/reservations', {
        client: {
          nom: formData.clientNom,
          prenom: formData.clientPrenom,
          email: formData.clientEmail,
        },
        chambre: {
          type: formData.chambreType,
        },
        dateDebut: formData.checkIn,
        dateFin: formData.checkOut,
      });
      setLoading(false);
      navigate('/');
    } catch (err) {
      setError('Failed to create the reservation. Please try again.');
      setLoading(false);
      console.error('Error while creating reservation:', err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header text-center bg-primary text-white">
          <h2 className="card-title">Create Reservation</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} style={{fontFamily:'Inter'}}>
            {/* Error message */}
            {error && <div className="alert alert-danger text-center">{error}</div>}

            <div className="row mb-4">
              {/* Last Name */}
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="clientNom" className="form-label">Last Name</label>
                  <input
                    type="text"
                    id="clientNom"
                    name="clientNom"
                    value={formData.clientNom}
                    onChange={handleChange}
                    required
                    className="form-control"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              {/* First Name */}
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="clientPrenom" className="form-label">First Name</label>
                  <input
                    type="text"
                    id="clientPrenom"
                    name="clientPrenom"
                    value={formData.clientPrenom}
                    onChange={handleChange}
                    required
                    className="form-control"
                    placeholder="Enter first name"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="form-group mb-4">
              <label htmlFor="clientEmail" className="form-label">Email</label>
              <input
                type="email"
                id="clientEmail"
                name="clientEmail"
                value={formData.clientEmail}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Enter email address"
              />

            </div>

            {/* Room Type */}
            <div className="form-group mb-4">
              <label htmlFor="chambreType" className="form-label">Room Type</label>
              <select
                id="chambreType"
                name="chambreType"
                value={formData.chambreType}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="">Select room type</option>
                <option value="SIMPLE">Simple</option>
                <option value="DOUBLE">Double</option>
                <option value="SUITE">Suite</option>
              </select>
            </div>

            {/* Check-in and Check-out Dates */}
            <div className="row mb-4">
              {/* Check-in */}
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="checkIn" className="form-label">Check-in Date</label>
                  <input
                    type="date"
                    id="checkIn"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
              </div>

              {/* Check-out */}
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="checkOut" className="form-label">Check-out Date</label>
                  <input
                    type="date"
                    id="checkOut"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-100"
            >
              {loading ? 'Creating Reservation...' : 'Create Reservation'}
            </button>
          </form>
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-secondary" onClick={handleBackToList}>Back to Reservations List</button>
          </div>
        
        </div>
      </div>
    </div>
  );
}

export default CreateReservation;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function ReservationEdit() {
  const [formData, setFormData] = useState({
    clientId: '',
    clientNom: '',
    clientPrenom: '',
    clientEmail: '',
    chambreId: '',
    chambreNumero: '',
    chambreType: '',
    chambrePrix: '',
    checkIn: '',
    checkOut: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchReservation();
  }, []);

  const fetchReservation = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/reservations/${id}`);
      const reservation = response.data;
      setFormData({
        clientId: reservation.client.id,
        clientNom: reservation.client.nom,
        clientPrenom: reservation.client.prenom,
        clientEmail: reservation.client.email,
        chambreId: reservation.chambre.id,
        chambreNumero: reservation.chambre.numero,
        chambreType: reservation.chambre.type,
        chambrePrix: reservation.chambre.prix,
        checkIn: reservation.dateDebut,
        checkOut: reservation.dateFin,
      });
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch reservation. Please try again.');
      setLoading(false);
      console.error('Error fetching reservation:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await axios.put(`http://localhost:8080/api/reservations/${id}`, {
        client: {
          nom: formData.clientNom,
          prenom: formData.clientPrenom,
          email: formData.clientEmail,
        },
        chambre: {
          numero: formData.chambreNumero,
          type: formData.chambreType,
          prix: formData.chambrePrix,
        },
        dateDebut: formData.checkIn,
        dateFin: formData.checkOut,
      });
      setLoading(false);
      navigate('/');
    } catch (err) {
      setError('Failed to update reservation. Please try again.');
      setLoading(false);
      console.error('Error updating reservation:', err);
    }
  };

  const handleBackToList = () => {
    navigate('/'); // Navigate back to the reservations list page
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="alert alert-danger text-center">{error}</div>;

  return (
    <div className="container mt-5" style={{fontFamily:'Inter'}}>
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h2 className="text-center">Edit Reservation</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Client Information */}
            <h4>Client Information</h4>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="clientNom" className="form-label">Last Name</label>
                <input
                  type="text"
                  id="clientNom"
                  name="clientNom"
                  value={formData.clientNom}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="clientPrenom" className="form-label">First Name</label>
                <input
                  type="text"
                  id="clientPrenom"
                  name="clientPrenom"
                  value={formData.clientPrenom}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="clientEmail" className="form-label">Email</label>
              <input
                type="email"
                id="clientEmail"
                name="clientEmail"
                value={formData.clientEmail}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            {/* Room Information */}
            <h4>Room Information</h4>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="chambreNumero" className="form-label">Room Number</label>
                <input
                  type="text"
                  id="chambreNumero"
                  name="chambreNumero"
                  value={formData.chambreNumero}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
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
            </div>
            <div className="mb-3">
              <label htmlFor="chambrePrix" className="form-label">Room Price</label>
              <input
                type="number"
                id="chambrePrix"
                name="chambrePrix"
                value={formData.chambrePrix}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            {/* Reservation Dates */}
            <h4>Reservation Dates</h4>
            <div className="row mb-3">
              <div className="col-md-6">
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
              <div className="col-md-6">
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

            <div className="d-grid gap-2">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? 'Updating...' : 'Update Reservation'}
              </button>
            </div>
          </form>

          {/* Back to List Button */}
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-secondary" onClick={handleBackToList}>Back to Reservations List</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationEdit;

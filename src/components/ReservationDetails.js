import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>

function ReservationDetails() {
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/reservations/${id}`);
        setReservation(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch reservation details. Please try again.');
        setLoading(false);
        console.error('Error fetching reservation details:', err);
      }
    };

    fetchReservation();
  }, [id]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="alert alert-danger text-center">{error}</div>;
  if (!reservation) return <div className="alert alert-warning text-center">Reservation not found.</div>;

  return (
    <div className="container mt-5" style={{fontFamily:'Inter'}}>
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h2 className="text-center">Reservation Details</h2>
        </div>
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-md-6">
              <h5 className="text-secondary">Client Information</h5>
              <ul className="list-group">
                <li className="list-group-item">
                  <strong>Name:</strong> {reservation.client.nom} {reservation.client.prenom}
                </li>
                <li className="list-group-item">
                  <strong>Email:</strong> {reservation.client.email}
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <h5 className="text-secondary">Room Information</h5>
              <ul className="list-group">
                <li className="list-group-item">
                  <strong>Room Type:</strong> {reservation.chambre.type}
                </li>
                <li className="list-group-item">
                  <strong>Room Number:</strong> {reservation.chambre.numero}
                </li>
                <li className="list-group-item">
                  <strong>Price:</strong> {reservation.chambre.prix}dh
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-4">
            <h5 className="text-secondary">Reservation Dates</h5>
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Check-in:</strong> {reservation.dateDebut}
              </li>
              <li className="list-group-item">
                <strong>Check-out:</strong> {reservation.dateFin}
              </li>
            </ul>
          </div>
          <div className="d-flex justify-content-between">
            <Link to="/" className="btn btn-outline-primary">
              Back to List
            </Link>
            <Link to={`/edit-reservation/${id}`} className="btn btn-outline-success">
              Edit Reservation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationDetails;

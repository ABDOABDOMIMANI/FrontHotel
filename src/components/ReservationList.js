import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ConfirmationModal({ show, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Deletion</h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this reservation?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={onConfirm}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReservationList() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState(null); // Store the reservation to delete

  // Fetch reservations from the API
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/reservations');
        setReservations(response.data);
      } catch (err) {
        setError('Failed to fetch reservations. Please try again later.');
        console.error('Error fetching reservations:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  // Handle the actual delete action
  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/reservations/${reservationToDelete}`);
      setReservations(prevReservations => prevReservations.filter(reservation => reservation.id !== reservationToDelete));
      setShowModal(false); // Hide modal after deletion
    } catch (err) {
      setError('Failed to delete reservation. Please try again.');
      console.error('Error deleting reservation:', err);
    }
  };

  const handleDelete = (id) => {
    setReservationToDelete(id); // Set the reservation to delete
    setShowModal(true); // Show the confirmation modal
  };

  // Loading and error handling UI
  const renderLoadingState = () => <div className="text-center">Loading...</div>;
  const renderErrorState = () => <div className="alert alert-danger text-center">{error}</div>;

  // Render reservations table
  const renderTable = () => (
    <table className="table table-bordered table-striped table-hover" style={{fontFamily:'Inter'}}>
      <thead className="thead-light">
        <tr className="text-center">
          <th>ID</th>
          <th>Client Name</th>
          <th>Room Type</th>
          <th>Check-in</th>
          <th>Check-out</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((reservation) => (
          <tr key={reservation.id} className="text-center">
            <td>{reservation.id}</td>
            <td>{`${reservation.client.nom} ${reservation.client.prenom}`}</td>
            <td>{reservation.chambre.type}</td>
            <td>{reservation.dateDebut}</td>
            <td>{reservation.dateFin}</td>
            <td>
              <Link to={`/reservation/${reservation.id}`} className="btn btn-info btn-sm me-3" style={{fontFamily:'Inter'}}>View</Link>
              <Link to={`/edit-reservation/${reservation.id}`} className="btn btn-warning btn-sm me-3"style={{fontFamily:'Inter'}}>Edit</Link>
              <button onClick={() => handleDelete(reservation.id)} className="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white flex justify-between items-center" style={{ display: 'flex',fontFamily:'Inter' }}>
          <h2 className="card-title flex-1" style={{ marginRight: "66%" ,fontFamily:'Inter'}}>Reservation List</h2>
          <Link to={`/new-reservation`} className="btn btn-outline-success" style={{backgroundColor :"#FF5722" , color : "white" ,paddingTop :'9px', fontFamily:'Inter' }}>
              New Reservation
            </Link>
        </div>
        <div className="card-body" style={{fontFamily:'Inter'}}>
          {loading && renderLoadingState()}
          {error && renderErrorState()}
          {!loading && !error && renderTable()}
        </div>
      </div>
      <ConfirmationModal
        show={showModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
}

export default ReservationList;

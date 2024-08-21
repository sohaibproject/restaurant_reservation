import { useEffect, useState } from 'react';
import { Reservation } from '../../../@core/types/reservationType';
import { reservationData } from '../../../@core/data/mockData';
import ReservationList from './components/reservationList';
import ReservationFilters from './components/reservationList/components/ReservationFilters';
import NavBar from '../../layout/navBar';

const ReservationApp = () => {
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>(reservationData.reservations);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        // Fetch the local JSON file
        const response = await fetch('../../../@core/data/mockData'); // Path to your local file
        if (!response.ok) {
          throw new Error('Failed to fetch reservations');
        }
        const data = await response.json();
        // setFilteredReservations(data.reservations);
        console.log(data);
      } catch (err) {
        // setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return (
    <>
      <NavBar />
      <div className='p-6  '>
        <ReservationFilters reservationData={reservationData} setFilteredReservations={setFilteredReservations} />
        <ReservationList reservations={filteredReservations} />
      </div>
    </>
  );
};

export default ReservationApp;

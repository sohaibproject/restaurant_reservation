import { useEffect, useState } from 'react';
import { Reservation } from '../../../@core/types/reservationType';
import { reservationData } from '../../../@core/data/mockData';
import ReservationList from './components/reservationList';
import ReservationFilters from './components/reservationList/components/ReservationFilters';
import NavBar from '../../layout/navBar';

const ReservationApp = () => {
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>(reservationData.reservations);
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

import { Reservation } from '../../../../../@core/types/reservationType';
import ReservationCard from './components/ReservationCard';

const ReservationList = ({ reservations }: { reservations: Reservation[] }) => {
  return (
    <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {reservations.map((reservation) => (
        <ReservationCard key={reservation.id} reservation={reservation} />
      ))}
    </div>
  );
};

export default ReservationList;

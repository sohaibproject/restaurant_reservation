import { Reservation } from '../../../../../../@core/types/reservationType';
import StatusBadge from '../../../../../components/shared/badge';

const ReservationCard = ({ reservation }: { reservation: Reservation }) => (
  <div className='bg-white border border-gray-200 rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gray-50'>
    <div className='flex items-center justify-between mb-2'>
      <span className='text-xl font-bold'>Qty: {reservation.quantity}</span>
      <StatusBadge status={reservation.status} />
    </div>
    <div className='mb-2'>
      <h3 className='text-lg font-semibold text-gray-800'>
        {reservation.customer.firstName} {reservation.customer.lastName}
      </h3>
      <p className='text-sm text-gray-600'>
        {reservation.businessDate} | {new Date(reservation.start).toLocaleTimeString()} - {new Date(reservation.end).toLocaleTimeString()}
      </p>
      <p className='text-sm text-gray-600'>Area: {reservation.area}</p>
    </div>
    <div className='text-sm text-gray-600'>
      <p>Shift: {reservation.shift}</p>
      <p>Notes: {reservation.guestNotes || 'No special notes'}</p> {/* or -  */}
    </div>
  </div>
);

export default ReservationCard;

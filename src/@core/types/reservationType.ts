export interface Customer {
  firstName: string;
  lastName: string;
}

export interface Reservation {
  id: number;
  quantity: number;
  status: 'CHECKED OUT' | 'NOT CONFIRMED' | 'SEATED' | 'CONFIRMED';
  businessDate: string;
  start: string;
  end: string;
  area: 'BAR' | 'MAIN ROOM';
  shift: 'BREAKFAST' | 'LUNCH' | 'DINNER';
  guestNotes?: string;
  customer: Customer;
}

export interface ReservationData {
  reservations: Reservation[];
}

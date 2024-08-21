// import { useCallback, useEffect, useState } from 'react';
// import { Reservation, ReservationData } from '../../../../../../@core/types/reservationType';

// const useReservationFilters = ({ reservationData, setFilteredReservations }: { reservationData: ReservationData; setFilteredReservations: React.Dispatch<React.SetStateAction<Reservation[]>> }) => {
//   //  i use quantity for gustNumber and  firstName && lastName for gustName

//   const [statusFilter, setStatusFilter] = useState<string>('');
//   const [startDateFilter, setStartDateFilter] = useState<string>('');
//   const [endDateFilter, setEndDateFilter] = useState<string>('');
//   const [shiftFilter, setShiftFilter] = useState<string>('');
//   const [areaFilter, setAreaFilter] = useState<string>('');
//   const [sortKey, setSortKey] = useState<'guestNumberAsc' | 'guestNumberDesc' | 'nameAsc' | 'nameDesc' | null>(null);
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const toggleCollapse = () => {
//     setIsCollapsed(!isCollapsed);
//   };
//   const applyFiltersAndSort = useCallback(() => {
//     let updatedReservations = [...reservationData.reservations];

//     // Filter by status
//     if (statusFilter) {
//       updatedReservations = updatedReservations.filter((reservation) => reservation.status === statusFilter);
//     }

//     // Filter by date range
//     if (startDateFilter || endDateFilter) {
//       updatedReservations = updatedReservations.filter((reservation) => {
//         const reservationDate = new Date(reservation.start);
//         const startDate = startDateFilter ? new Date(startDateFilter) : null;
//         const endDate = endDateFilter ? new Date(endDateFilter) : null;

//         if (startDate && endDate) {
//           return reservationDate >= startDate && reservationDate <= endDate;
//         } else if (startDate) {
//           return reservationDate >= startDate;
//         } else if (endDate) {
//           return reservationDate <= endDate;
//         }
//         return true;
//       });
//     }

//     // Filter by shift
//     if (shiftFilter) {
//       updatedReservations = updatedReservations.filter((reservation) => reservation.shift === shiftFilter);
//     }

//     // Filter by area
//     if (areaFilter) {
//       updatedReservations = updatedReservations.filter((reservation) => reservation.area === areaFilter);
//     }

//     // Search by name
//     if (searchTerm) {
//       updatedReservations = updatedReservations.filter(
//         (reservation) => reservation.customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || reservation.customer.lastName.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Sort the data
//     if (sortKey) {
//       updatedReservations.sort((a, b) => {
//         if (sortKey === 'guestNumberAsc') {
//           return a.quantity - b.quantity;
//         } else if (sortKey === 'guestNumberDesc') {
//           return b.quantity - a.quantity;
//         } else if (sortKey === 'nameAsc') {
//           const nameA = `${a.customer.firstName} ${a.customer.lastName}`.toLowerCase();
//           const nameB = `${b.customer.firstName} ${b.customer.lastName}`.toLowerCase();
//           return nameA.localeCompare(nameB);
//         } else if (sortKey === 'nameDesc') {
//           const nameA = `${a.customer.firstName} ${a.customer.lastName}`.toLowerCase();
//           const nameB = `${b.customer.firstName} ${b.customer.lastName}`.toLowerCase();
//           return nameB.localeCompare(nameA);
//         }
//         return 0;
//       });
//     }

//     setFilteredReservations(updatedReservations);
//   }, [statusFilter, shiftFilter, areaFilter, sortKey, searchTerm, startDateFilter, endDateFilter, reservationData.reservations, setFilteredReservations]);

//   useEffect(() => {
//     applyFiltersAndSort();
//   }, [applyFiltersAndSort]);

//   const clearFilterDate = () => {
//     setStartDateFilter('');
//     setEndDateFilter('');
//   };

//   return {
//     setSearchTerm,
//     searchTerm,
//     setSortKey,
//     sortKey,
//     setStatusFilter,
//     statusFilter,
//     setShiftFilter,
//     shiftFilter,
//     setAreaFilter,
//     areaFilter,
//     setStartDateFilter,
//     setEndDateFilter,
//     clearFilterDate,
//     startDateFilter,
//     endDateFilter,
//     toggleCollapse,
//     isCollapsed,
//   };
// };

// export default useReservationFilters;

import { useCallback, useEffect, useState } from 'react';
import { Reservation, ReservationData } from '../../../../../../@core/types/reservationType';
import CacheService from '../../../../../../@core/service/cacheService'; // Adjust path as needed

const cacheDuration = 5 * 60 * 1000; // 5 minutes
const cacheService = new CacheService(cacheDuration);

const generateCacheKey = (filters: { statusFilter: string; startDateFilter: string; endDateFilter: string; shiftFilter: string; areaFilter: string; sortKey: string | null; searchTerm: string }) => {
  return `reservations_${filters.statusFilter}_${filters.startDateFilter}_${filters.endDateFilter}_${filters.shiftFilter}_${filters.areaFilter}_${filters.sortKey}_${filters.searchTerm}`;
};

const useReservationFilters = ({ reservationData, setFilteredReservations }: { reservationData: ReservationData; setFilteredReservations: React.Dispatch<React.SetStateAction<Reservation[]>> }) => {
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [startDateFilter, setStartDateFilter] = useState<string>('');
  const [endDateFilter, setEndDateFilter] = useState<string>('');
  const [shiftFilter, setShiftFilter] = useState<string>('');
  const [areaFilter, setAreaFilter] = useState<string>('');
  const [sortKey, setSortKey] = useState<'guestNumberAsc' | 'guestNumberDesc' | 'nameAsc' | 'nameDesc' | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const applyFiltersAndSort = useCallback(() => {
    const cacheKey = generateCacheKey({
      statusFilter,
      startDateFilter,
      endDateFilter,
      shiftFilter,
      areaFilter,
      sortKey,
      searchTerm,
    });

    const cachedReservations = cacheService.get<Reservation[]>(cacheKey);

    if (cachedReservations) {
      let updatedReservations = [...cachedReservations];

      setFilteredReservations(updatedReservations);
    } else {
      let updatedReservations = [...reservationData.reservations];

      if (statusFilter) {
        updatedReservations = updatedReservations.filter((reservation) => reservation.status === statusFilter);
      }
      if (startDateFilter || endDateFilter) {
        updatedReservations = updatedReservations.filter((reservation) => {
          const reservationDate = new Date(reservation.start);
          const startDate = startDateFilter ? new Date(startDateFilter) : null;
          const endDate = endDateFilter ? new Date(endDateFilter) : null;

          if (startDate && endDate) {
            return reservationDate >= startDate && reservationDate <= endDate;
          } else if (startDate) {
            return reservationDate >= startDate;
          } else if (endDate) {
            return reservationDate <= endDate;
          }
          return true;
        });
      }
      if (shiftFilter) {
        updatedReservations = updatedReservations.filter((reservation) => reservation.shift === shiftFilter);
      }
      if (areaFilter) {
        updatedReservations = updatedReservations.filter((reservation) => reservation.area === areaFilter);
      }
      if (searchTerm) {
        updatedReservations = updatedReservations.filter(
          (reservation) => reservation.customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || reservation.customer.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      if (sortKey) {
        updatedReservations.sort((a, b) => {
          if (sortKey === 'guestNumberAsc') {
            return a.quantity - b.quantity;
          } else if (sortKey === 'guestNumberDesc') {
            return b.quantity - a.quantity;
          } else if (sortKey === 'nameAsc') {
            const nameA = `${a.customer.firstName} ${a.customer.lastName}`.toLowerCase();
            const nameB = `${b.customer.firstName} ${b.customer.lastName}`.toLowerCase();
            return nameA.localeCompare(nameB);
          } else if (sortKey === 'nameDesc') {
            const nameA = `${a.customer.firstName} ${a.customer.lastName}`.toLowerCase();
            const nameB = `${b.customer.firstName} ${b.customer.lastName}`.toLowerCase();
            return nameB.localeCompare(nameA);
          }
          return 0;
        });
      }

      // Cache the processed data
      cacheService.set(cacheKey, updatedReservations);
      setFilteredReservations(updatedReservations);
    }
  }, [statusFilter, shiftFilter, areaFilter, sortKey, searchTerm, startDateFilter, endDateFilter, reservationData.reservations, setFilteredReservations]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [applyFiltersAndSort]);

  const clearFilterDate = () => {
    setStartDateFilter('');
    setEndDateFilter('');
  };

  return {
    setSearchTerm,
    searchTerm,
    setSortKey,
    sortKey,
    setStatusFilter,
    statusFilter,
    setShiftFilter,
    shiftFilter,
    setAreaFilter,
    areaFilter,
    setStartDateFilter,
    setEndDateFilter,
    clearFilterDate,
    startDateFilter,
    endDateFilter,
    toggleCollapse,
    isCollapsed,
  };
};

export default useReservationFilters;

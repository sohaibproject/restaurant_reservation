import React from 'react';
import SearchInput from '../../../../../components/shared/search';
import CustomSelect from '../../../../../components/shared/select/CustomSelect';
import DateInput from '../../../../../components/shared/date';
import { Reservation, ReservationData } from '../../../../../../@core/types/reservationType';
import useReservationFilters from '../hooks/useReservationFilters';

const ReservationFilters = React.memo(
  ({ reservationData, setFilteredReservations }: { reservationData: ReservationData; setFilteredReservations: React.Dispatch<React.SetStateAction<Reservation[]>> }) => {
    const {
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
      isCollapsed,
      toggleCollapse,
    } = useReservationFilters({ reservationData, setFilteredReservations });

    return (
      <div className='mb-6'>
        {/* Toggle Button */}
        <button onClick={toggleCollapse} className='bg-[#fb2576] text-white px-4 py-2 rounded-lg mb-4'>
          {isCollapsed ? 'Show Filters' : 'Hide Filters'}
        </button>

        {/* Collapsible Section */}
        <div className={`transition-all duration-300 ${isCollapsed ? 'max-h-0 overflow-hidden' : 'max-h-screen'}`}>
          <div className='flex flex-col sm:flex-row sm:items-center mb-4'>
            <SearchInput onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
            <div className='flex space-x-4 sm:ml-4'>
              <button onClick={() => setSortKey(sortKey === 'guestNumberAsc' ? 'guestNumberDesc' : 'guestNumberAsc')} className='bg-[#fb2576] text-white px-4 py-2 rounded-lg'>
                Sort by Guest Number
              </button>
              <button onClick={() => setSortKey(sortKey === 'nameAsc' ? 'nameDesc' : 'nameAsc')} className='bg-[#6316db] text-white px-4 py-2 rounded-lg'>
                Sort by Name
              </button>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4'>
            <CustomSelect
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: '', label: 'All Statuses' },
                { value: 'CHECKED OUT', label: 'Checked Out' },
                { value: 'CONFIRMED', label: 'Confirmed' },
                { value: 'NOT CONFIRMED', label: 'Not Confirmed' },
                { value: 'SEATED', label: 'Seated' },
              ]}
              selectedStatus={statusFilter}
            />
            <CustomSelect
              onChange={(e) => setShiftFilter(e.target.value)}
              options={[
                { value: '', label: 'All Shifts' },
                { value: 'BREAKFAST', label: 'Breakfast' },
                { value: 'LUNCH', label: 'Lunch' },
                { value: 'DINNER', label: 'Dinner' },
              ]}
              selectedStatus={shiftFilter}
            />
            <CustomSelect
              onChange={(e) => setAreaFilter(e.target.value)}
              options={[
                { value: '', label: 'All Areas' },
                { value: 'BAR', label: 'Bar' },
                { value: 'MAIN ROOM', label: 'Main Room' },
                { value: 'DINNER', label: 'Dinner' },
              ]}
              selectedStatus={areaFilter}
            />
            <DateInput placeholder='Start Date' onChange={(e) => setStartDateFilter(e.target.value)} value={startDateFilter} />
            <DateInput placeholder='End Date' onChange={(e) => setEndDateFilter(e.target.value)} value={endDateFilter} />
            <div className='flex space-x-2 items-end'>
              <button onClick={clearFilterDate} className='bg-[#fb2576] text-white p-2 rounded-lg'>
                Clear Filter Date
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ReservationFilters;

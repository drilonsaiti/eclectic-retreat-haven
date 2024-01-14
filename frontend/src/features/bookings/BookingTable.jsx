import Spinner from "../../ui/Spinner.jsx";
import Empty from "../../ui/Empty.jsx";
import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import BookingRow from "./BookingRow.jsx";
import {useBookings} from "./useBookings.js";
import Pagination from "../../ui/Pagination.jsx";
import {useSearchParams} from "react-router-dom";
import {getToday, PAGE_SIZE} from "../../utils/helpers.js";


function BookingTable() {
  const { bookings, totalElements, isLoading } = useBookings();


  if (!bookings) return <Empty resource={'bookings'} />;

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns='0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem'>
        <Table.Header>
          <div>Accommodation</div>

          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
            data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={totalElements} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

// We could create yet another layer of abstraction on top of this. We could call this component just <Results>, like: Results({data, count, isLoading, columns, rowComponent}). Then <BookingTable> and ALL other tables would simply call that.
// BUT, creating more abstractions also has a cost! More things to remember, more complex codebase to understand. Sometimes it's okay to just copy and paste instead of creating abstractions

export default BookingTable;

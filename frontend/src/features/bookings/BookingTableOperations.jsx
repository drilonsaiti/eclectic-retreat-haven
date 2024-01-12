import TableOperations from "../../ui/TableOperations.jsx";
import Filter from "../../ui/Filter.jsx";
import SortBy from "../../ui/SortBy.jsx";


function BookingTableOperations() {

    const optionsTypes = [
        {value: 'all', label: "All"},
        {value: 'cabin', label: "Cabins"},
        {value: 'villa', label: "Villas"},
        {value: 'cave_room', label: "Cave rooms"},
    ]

    const options = {
        status: {
            field: "Status",
            optionsFiled: [
                {value: 'checked-out', label: 'Checked out'},
                {value: 'checked-in', label: 'Checked in'},
                {value: 'unconfirmed', label: 'Unconfirmed'},
            ]
        }
    }

    const optionsSort = [
        {value: 'startDate-desc', label: 'Sort by date (recent first)'},
        {value: 'startDate-asc', label: 'Sort by date (earlier first)'},
        {
            value: 'totalPrice-desc',
            label: 'Sort by amount (high first)',
        },
        {value: 'totalPrice-asc', label: 'Sort by amount (low first)'},
    ]

    return (
        <TableOperations>
            {/* We could do these two as compound components as well, but let's keep it simple, and let's also explore different ways of achieving the same thing */}
            <Filter filterField='types' options={optionsTypes}/>
            <SortBy type="checkbox" filterField='status' options={options}/>
            <SortBy options={optionsSort}/>
        </TableOperations>
    );
}

export default BookingTableOperations;

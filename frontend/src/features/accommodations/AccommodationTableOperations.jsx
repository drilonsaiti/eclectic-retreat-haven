import TableOperations from "../../ui/TableOperations.jsx";
import Filter from "../../ui/Filter.jsx";
import SortBy from "../../ui/SortBy.jsx";


const AccommodationTableOperations = () => {
    const optionsTypes = [
        {value: 'all', label: "All"},
        {value: 'cabin', label: "Cabins"},
        {value: 'villa', label: "Villas"},
        {value: 'cave_room', label: "Cave rooms"},
    ]
    const options = {
        discount: {
            field: "Discount",
            optionsFiled: [
                {value: 'with-discount', label: "With discount"},
                {value: 'no-discount', label: "No discount"},
                ]
        },
    }

    const optionsSort = [
        {value: 'name-asc', label: "Sort by name (A-Z)"},
        {value: 'name-desc', label: "Sort by name (Z-A)"},
        {value: 'regularPrice-asc', label: "Sort by price low to high"},
        {value: 'regularPrice-desc', label: "Sort by price high to low"},
        {value: 'maxCapacity-asc', label: "Sort by capacity low to high"},
        {value: 'maxCapacity-desc', label: "Sort by capacity high to low"},
    ]
    return (
        <TableOperations>
            <Filter filterField='types' options={optionsTypes}/>
            <SortBy type="checkbox" filterField='discount' options={options}/>
            <SortBy options={optionsSort}/>
        </TableOperations>


)
    ;
};

export default AccommodationTableOperations;
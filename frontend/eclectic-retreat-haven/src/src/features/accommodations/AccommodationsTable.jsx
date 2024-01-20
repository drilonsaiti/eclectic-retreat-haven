import Spinner from "../../ui/Spinner.jsx";
import AccommodationsRow from "./AccommodationsRow.jsx";
import {useAccommodations} from "./useAccommodations.js";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus.jsx";
import {useSearchParams} from "react-router-dom";


const AccommodationsTable = () => {

    const {isPending, accommodations} = useAccommodations();
    const [searchParams] = useSearchParams();


    if (isPending) return <Spinner/>
    const filterDiscount = searchParams.get('discount') || 'all';
    const filterTypes = searchParams.get('types') || 'all';


    let filteredAccommodations = accommodations.filter((accm) => {
        const typeCondition =
            filterTypes === 'all' || accm.types === filterTypes.toUpperCase();

        const discountCondition =
            filterDiscount === 'all' ||
            (filterDiscount === 'no-discount' && accm.discount === 0) ||
            (filterDiscount === 'with-discount' && accm.discount > 0);

        return typeCondition && discountCondition;
    });
    const  sortBy = searchParams.get("sortBy") || "startDate-asc";
    const [field,direction] = sortBy.split("-");
    const modifier = direction === 'asc' ? 1 : -1;
    const sortedAccommodations = filteredAccommodations.sort((a, b) =>
        field === 'name' ?
             modifier * a[field].localeCompare(b[field]) :
             modifier * (a[field] - b[field])

    );


    return (
        <Menus>
            <Table columns={'0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'}>
                <Table.Header>
                    <div></div>
                    <div>Accommodation</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>

                </Table.Header>
                <Table.Body data={sortedAccommodations} render={
                    accm => <AccommodationsRow accommodation={accm} key={accm.accommodationId}/>
                }/>

            </Table>
        </Menus>
    );
};

export default AccommodationsTable;
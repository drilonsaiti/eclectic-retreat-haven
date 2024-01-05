import styled from "styled-components";
import Spinner from "../../ui/Spinner.jsx";
import AccommodationsRow from "./AccommodationsRow.jsx";
import {useAccommodations} from "./useAccommodations.js";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus.jsx";

const TableHeader = styled.header`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;

    background-color: var(--color-grey-50);
    border-bottom: 1px solid var(--color-grey-100);
    text-transform: uppercase;
    letter-spacing: 0.4px;
    font-weight: 600;
    color: var(--color-grey-600);
    padding: 1.6rem 2.4rem;
`;


const AccommodationsTable = () => {

    const {isPending, accommodations} = useAccommodations();

    if (isPending) return <Spinner/>

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
                <Table.Body data={accommodations} render={
                    accm => <AccommodationsRow accommodation={accm} key={accm.accommodationId}/>
                }/>

            </Table>
        </Menus>
    );
};

export default AccommodationsTable;
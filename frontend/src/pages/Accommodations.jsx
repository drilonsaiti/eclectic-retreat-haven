import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AccommodationsTable from "../features/accommodations/AccommodationsTable.jsx";
import AddAccommodation from "../features/accommodations/AddAccommodation.jsx";

function Accommodations() {
  return (
      <>
    <Row type="horizontal">
      <Heading as="h1">All accommodations</Heading>
      <p>Filter / Sort</p>

    </Row>

      <Row>
          <AccommodationsTable/>
          <AddAccommodation/>
      </Row>
      </>
  );
}

export default Accommodations;

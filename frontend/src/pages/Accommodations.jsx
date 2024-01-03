import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AccommodationsTable from "../features/accommodations/AccommodationsTable.jsx";
import Button from "../ui/Button.jsx";
import {useState} from "react";
import CreateAccommodationsForm from "../features/accommodations/CreateAccommodationsForm.jsx";

function Accommodations() {
  const [showForm,setShowFrom] = useState(false);
  return (
      <>
    <Row type="horizontal">
      <Heading as="h1">All accommodations</Heading>

    </Row>

      <Row>
          <AccommodationsTable/>
          <Button onClick={() => setShowFrom(!showForm)}>Add new cabin</Button>
        {showForm && <CreateAccommodationsForm/>}
      </Row>
      </>
  );
}

export default Accommodations;

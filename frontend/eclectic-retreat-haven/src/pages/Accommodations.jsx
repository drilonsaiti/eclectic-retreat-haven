import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AccommodationsTable from "../features/accommodations/AccommodationsTable.jsx";
import AddAccommodation from "../features/accommodations/AddAccommodation.jsx";
import AccommodationTableOperations from "../features/accommodations/AccommodationTableOperations.jsx";
import {useGetRole} from "../services/useGetRole.js";

function Accommodations() {
    const {roles,isLoading:isLoadingRole} = useGetRole();
    const hasAdminRole = roles.includes("ROLE_ADMIN");
  return (
      <>
    <Row type="horizontal" change="yes">
      <Heading as="h1">All accommodations</Heading>
     <AccommodationTableOperations/>

    </Row>

      <Row>
          <AccommodationsTable/>
          {hasAdminRole && <AddAccommodation/>}

      </Row>
      </>
  );
}

export default Accommodations;

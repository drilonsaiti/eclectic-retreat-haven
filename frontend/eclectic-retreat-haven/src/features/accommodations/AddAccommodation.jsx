import Button from "../../ui/Button.jsx";
import CreateAccommodationsForm from "./CreateAccommodationsForm.jsx";
import Modal from "../../ui/Modal.jsx";
import {useGetRole} from "../../services/useGetRole.js";
import AccessDenied from "../../ui/AccessDenied.jsx";


const AddAccommodation = () => {

    const {roles,isLoading:isLoadingRole} = useGetRole();
    const hasAdminRole = roles.includes("ROLE_ADMIN");

    if (!hasAdminRole) return <AccessDenied/>

    return <Modal>
        <Modal.Open opens={"accommodation-form"}>
            <Button>Add new accommodation</Button>
        </Modal.Open>
        <Modal.Window name={"accommodation-form"}>
            <CreateAccommodationsForm/>
        </Modal.Window>

       {/* <Modal.Open name={"table"}>
            <Button>Show table</Button>
        </Modal.Open>
        <Modal.Window name={"table"}>
            <CreateAccommodationsForm/>
        </Modal.Window>*/}
    </Modal>
};

export default AddAccommodation;
/*const AddAccommodation = () => {
    const [isOpenModal,setIsOpenModal] = useState(false);

    return (
        <div>
            <Button onClick={() => setIsOpenModal(!isOpenModal)}>Add new cabin</Button>
            {isOpenModal && (
                <Modal onClose={() => setIsOpenModal(false)}>
                    <CreateAccommodationsForm onCloseModal={() => setIsOpenModal(false)}/>
                </Modal>
            )}
        </div>
    );
};*/

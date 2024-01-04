
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import {useSettings} from "./useSettings.js";
import Form from "../../ui/Form";
import Spinner from "../../ui/Spinner.jsx";
import {useUpdateSettings} from "./useUpdateSettings.js";

function UpdateSettingsForm() {
    const {
        isPending,
        settings: settingsData
    } = useSettings();
    const {isUpdating,updatedSettings} = useUpdateSettings();


    if(isPending) return <Spinner/>

    function handleUpdate(e,field) {
        const {value} = e.target;

        if (!value || typeof settingsData.settingsId === 'undefined') return;

        settingsData[field] = value;
        updatedSettings({...settingsData});

    }


  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' disabled={isUpdating} defaultValue={settingsData.minBookingLength} onBlur={e => handleUpdate(e,'minBookingLength')}/>
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' disabled={isUpdating} defaultValue={settingsData.maxBookingLength} onBlur={e => handleUpdate(e,'maxBookingLength')}/>
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' disabled={isUpdating} defaultValue={settingsData.maxGuestsPerBooking} onBlur={e => handleUpdate(e,'maxGuestsPerBooking')}/>
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' disabled={isUpdating} defaultValue={settingsData.breakfastPrice} onBlur={e => handleUpdate(e,'breakfastPrice')}/>
      </FormRow>
        <FormRow label='Dinner price'>
            <Input type='number' id='dinner-price' disabled={isUpdating} defaultValue={settingsData.dinnerPrice} onBlur={e => handleUpdate(e,'dinnerPrice')}/>
        </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;

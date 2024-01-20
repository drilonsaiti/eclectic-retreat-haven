import styled from 'styled-components';
import Stats from "./Stats.jsx";
import TodayActivity from "../check-in-out/TodayActivity.jsx";
import DurationChart from "./DurationChart.jsx";
import SalesChart from "./SalesChart.jsx";
import Spinner from "../../ui/Spinner.jsx";
import {useAccommodations} from "../accommodations/useAccommodations.js";
import {useRecentBookings} from "./useRecentBookings.js";
import {useRecentStays} from "./useRecentStays.js";



const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;


function DashboardLayout() {
 const { isLoading: isLoading1, bookings, numDays } = useRecentBookings();
    const { isLoading: isLoading2, stays } = useRecentStays();
  const { isLoading: isLoading3, accommodations } = useAccommodations();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={stays}
        numDays={numDays}
        accmCount={accommodations?.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={stays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;

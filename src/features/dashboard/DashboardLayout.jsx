import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useGetCabinData } from "../cabins/useGetCabinData";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 37rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  const { isLoading: isLoading1, recentBookings } = useRecentBookings();
  const {
    isLoading: isLoading2,
    recentStays,
    confirmedStays,
    numDays,
  } = useRecentStays();
  const { cabinsData, isLoading: isLoading3 } = useGetCabinData();
  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        recentBookings={recentBookings}
        confirmedStays={confirmedStays}
        recentStays={recentStays}
        cabinsData={cabinsData.length}
        numDays={numDays}
      />

      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart recentBookings={recentBookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;

import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";

function Stats({
  recentBookings,
  confirmedStays,
  recentStays,
  numDays,
  cabinsData,
}) {
  const numBookings = recentBookings.length;
  const totalSales = recentBookings.reduce(
    (acc, cur) => acc + cur.totalPrice,
    0
  );
  const numberNights =
    (recentStays.reduce((acc, cur) => acc + cur.numNights, 0) / numDays) *
    cabinsData;
  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="bookings"
        value={numBookings}
        color="blue"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="sales"
        value={formatCurrency(totalSales)}
        color="green"
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="check ins"
        value={confirmedStays.length}
        color="yellow"
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="occupancy rate"
        value={Math.round(numberNights) + "%"}
        color="red"
      />
    </>
  );
}

export default Stats;

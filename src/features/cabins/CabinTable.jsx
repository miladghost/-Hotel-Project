import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import { useGetCabinData } from "./useGetCabinData";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, error, cabinsData } = useGetCabinData();
  const [searchParam] = useSearchParams();
  if (error) throw new Error(error);
  if (isLoading) return <Spinner />;
  //1-filter
  const filterValue = searchParam.get("discount") || "all";
  console.log(cabinsData);
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabinsData;
  if (filterValue === "no-discount")
    filteredCabins = cabinsData.filter((cabins) => cabins.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabinsData.filter((cabins) => cabins.discount > 0);
  //2-sort
  const sortBy = searchParam.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifire = direction === "asc" ? 1 : -1;
  // const sortedCabins = filteredCabins.sort(
  //   (a, b) => (a[field] - b[field]) * modifire
  // );
  const sortedCabins = [...filteredCabins].sort((a, b) => {
    if (typeof a[field] === "string") {
      return a[field].localeCompare(b[field]) * modifire;
    } else {
      return (a[field] - b[field]) * modifire;
    }
  });
  return (
    <Menus>
      <Table columns="1fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}
export default CabinTable;

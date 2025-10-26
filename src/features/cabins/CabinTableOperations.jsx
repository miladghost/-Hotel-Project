import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "with-discount", label: "With Discount" },
          { value: "no-discount", label: "No Discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort By (A-Z)" },
          { value: "name-desc", label: "Sort By (Z-A)" },
          { value: "maxCapacity-asc", label: "Sort By Capacity (Low First)" },
          { value: "maxCapacity-desc", label: "Sort By Capacity (High First)" },
          { value: "regularPrice-asc", label: "Sort By Price (Low First)" },
          { value: "regularPrice-desc", label: "Sort By Price (High First)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;

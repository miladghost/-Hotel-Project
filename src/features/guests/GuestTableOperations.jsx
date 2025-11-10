import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";
import SearchBox from "./SearchBox";
function GuestTableOperations() {
  return (
    <TableOperations>
      <SortBy
        options={[
          { value: "fullName-asc", label: "sort by A-Z" },
          { value: "fullName-desc", label: "sort by Z-A" },
          {
            value: "created_at-desc",
            label: "sort by add date (recent first)",
          },
          {
            value: "created_at-asc",
            label: "sort by add date (earlier first)",
          },
        ]}
      />
      <SearchBox />
    </TableOperations>
  );
}

export default GuestTableOperations;

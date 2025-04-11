import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../ui/table";
import Select from "../../form/Select";
import Input from "../../form/input/InputField";

interface BasicTableOneProps {
  tableData: (string | number | React.ReactNode | null)[][];
  tableHeadings: string[];
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
  showFilter?: boolean;
  searchColumns: string[];
}

const BasicTableOne: React.FC<BasicTableOneProps> = ({
  tableData,
  tableHeadings,
  searchQuery,
  setSearchQuery,
  selectedFilter,
  setSelectedFilter,
  showFilter = true,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4 space-y-10">
      {/* Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="w-full md:w-1/3">
          <Input
           
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {showFilter && (
          <div className="w-full md:w-1/3">
            <Select
              id="filter"
              name="filter"
              label="Filter by Type"
              value={selectedFilter}
              onChange={setSelectedFilter}
              options={[
                { label: "All", value: "all" },
                { label: "Creator", value: "creator" },
                { label: "Advertiser", value: "advertiser" },
                { label: "Suspended", value: "suspended" },
                { label: "Unblock", value: "unblock" },
                { label: "Block", value: "block" },
              ]}
            />
          </div>
        )}

        <div className="w-full md:w-1/3">
          <Select
          id="page"
          name="page"
            label="Rows per page"
            value={itemsPerPage.toString()}
            onChange={handleItemsPerPageChange}
            options={[
              { label: "5 rows", value: "5" },
              { label: "10 rows", value: "10" },
              { label: "20 rows", value: "20" },
            ]}
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {tableHeadings.map((heading, index) => (
                <TableCell
                  key={index}
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {currentItems.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400"
                  >
                    {typeof cell === "string" &&
                    (cell.startsWith("http") || cell.startsWith("https")) &&
                    (cell.includes(".jpg") ||
                      cell.includes(".jpeg") ||
                      cell.includes(".png") ||
                      cell.includes(".PNG")) ? (
                      <div className="h-16 w-16 rounded-[100%]">
                        <img
                          src={cell}
                          alt={`Image ${rowIndex}-${cellIndex}`}
                          className="h-full w-full object-cover rounded-full"
                        />
                      </div>
                    ) : (
                      cell || "N/A"
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Section */}
      <div className="flex justify-between items-center my-4 px-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 text-sm font-semibold ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BasicTableOne;

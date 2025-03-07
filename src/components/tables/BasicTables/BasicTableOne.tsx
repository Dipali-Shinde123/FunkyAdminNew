import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../ui/table";

// Define the type for the data being passed
interface BasicTableOneProps {
  tableData: (string | null)[][]; // Array of arrays containing strings or null values
  tableHeadings: string[];
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
  searchColumns: string[];
  showFilter?: boolean; // Optional prop to conditionally show the filter
}

const BasicTableOne: React.FC<BasicTableOneProps> = ({
  tableData,
  tableHeadings,
  searchQuery,
  setSearchQuery,
  selectedFilter,
  setSelectedFilter,
  searchColumns,
  showFilter = true,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1); // State to track current page
  const [itemsPerPage, setItemsPerPage] = useState<number>(5); // Items to display per page (default: 5)

  // Handle the change in the number of items per page
  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  // Filter tableData based on search query (case-insensitive) and dropdown filter (e.g., Role)
  const filteredData = tableData.filter((row) => {
    // Check if any of the specified columns contain the search query
    let matchesSearch = false;
    searchColumns.forEach((_, index) => {
      const columnValue = row[index]?.toString().toLowerCase() || "";
      if (columnValue.includes(searchQuery.toLowerCase())) {
        matchesSearch = true;
      }
    });

    const typeColumn = row[4]?.toLowerCase() || ""; // Assuming type/role is in the 5th column
    const matchesFilter = selectedFilter === "" || typeColumn === selectedFilter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  // Get the current page's data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          {/* Search Bar and Dropdown Filter */}
          <div className="my-4 px-6 flex gap-4 items-center justify-between">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-80 text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {
              showFilter && (
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-56 text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  <option value="">Filter by Role</option>
                  <option value="Creator">Creator</option>
                  <option value="Advertiser">Advertiser</option>
                  <option value="Kids">Kids</option>
                </select>
              )
            }
            {/* Dropdown for selecting the number of items per page */}
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-56 text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value={5}>5 rows</option>
              <option value={10}>10 rows</option>
              <option value={20}>20 rows</option>
            </select>
          </div>

          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {tableHeadings.map((heading, index) => (
                  <TableCell key={index} isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    {heading}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {currentItems.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <TableCell key={cellIndex} className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {typeof cell === 'string' && (cell.startsWith('http') || cell.startsWith('https')) && (cell.includes('.jpg') || cell.includes('.jpeg') || cell.includes('.png') || cell.includes('.PNG')) ? (
                        <div className="h-16 w-16 rounded-[100%]">
                          <img
                            src={cell}
                            alt={`Category Image ${rowIndex}-${cellIndex}`}
                            className="h-full w-full object-cover rounded-[100%]"
                          />
                        </div>
                      ) : (
                        cell || 'N/A'
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>

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
                  className={`px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-600'}`}
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
      </div>
    </div>
  );
};

export default BasicTableOne;
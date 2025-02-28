import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../ui/table";
import Badge from "../../ui/badge/Badge";

// Define the type for the data being passed
interface BasicTableOneProps {
  tableData: (string | null)[][]; // Array of arrays containing strings or null values
  tableHeadings: string[];
}

const BasicTableOne: React.FC<BasicTableOneProps> = ({ tableData, tableHeadings }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>(""); // Dropdown filter state
  const [currentPage, setCurrentPage] = useState<number>(1); // State to track current page
  const [itemsPerPage, setItemsPerPage] = useState<number>(5); // Items to display per page (default: 5)

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Handle dropdown filter change
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value);
  };

  // Handle the change in the number of items per page
  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  // Filter tableData based on search query (case-insensitive) and dropdown filter (e.g., Role)
  const filteredData = tableData.filter((row) => {
    const nameColumn = row[0]?.toLowerCase() || ""; // Assuming name is in the first column
    const typeColumn = row[4]?.toLowerCase() || ""; // Assuming type/role is in the 5th column

    // Apply search and filter logic
    const matchesSearch = nameColumn.includes(searchQuery.toLowerCase());
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
              onChange={handleSearchChange}
              placeholder="Search by name..."
              className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-80 text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <select
              value={selectedFilter}
              onChange={handleFilterChange}
              className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-56 text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">Filter by Role</option>
              <option value="Creator">Creator</option>
              <option value="Advertiser">Advertiser</option>
              <option value="Kids">Kids</option>
              {/* Add other filter options as needed */}
            </select>
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
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {/* Map over tableHeadings and render a TableCell for each */}
                {tableHeadings.map((heading, index) => (
                  <TableCell
                    key={index} // Use index as the key for each heading
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    {heading}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {currentItems.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400"
                    >
                      {/* Check if the cell content is an image URL */}
                      {typeof cell === 'string' && (cell.startsWith('http') || cell.startsWith('https')) && (cell.includes('.jpg') || cell.includes('.jpeg') || cell.includes('.png') || cell.includes('.PNG')) ? (
                        <div className="h-16 w-16 rounded-[100%]">
                          <img
                            src={cell}
                            alt={`Category Image ${rowIndex}-${cellIndex}`}
                            className="h-full w-full object-cover rounded-[100%]"
                          />
                        </div>
                      ) : (
                        // If it's not an image, display the text content
                        cell || 'N/A' // Display 'N/A' if the cell is empty or null
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>

          </Table>

          {/* Pagination Controls */}
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
                  className={`px-4 py-2 text-sm font-semibold ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-300'} rounded-md`}
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
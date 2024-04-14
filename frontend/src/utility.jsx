import * as XLSX from 'xlsx';

export const processExcel = async (file) => {
  // Fetch the Excel file from the public folder
  const response = await fetch(`/original.xlsx`);
  const arrayBuffer = await response.arrayBuffer();

  // Read the Excel file
  const workbook = XLSX.read(arrayBuffer, { type: 'buffer' });

  // Assuming the first sheet is the one you need
  const worksheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[worksheetName];

  // Convert the sheet to JSON
  const jsonData = XLSX.utils.sheet_to_json(worksheet);

  // Process the JSON data as needed for your heatmap
  // ...

  return jsonData;
};


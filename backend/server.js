const express = require('express');
const cors = require('cors');
const xlsx = require('xlsx');
const fs = require('fs');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/data', (req, res) => {

    // Read the Excel file
    const workbook = xlsx.readFile('./data/AvgSummary.xlsx');
    
    // Get the name of the first sheet
    const sheetNameList = workbook.SheetNames;
    
    // Convert the first sheet to JSON
    const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNameList[1]]);

    // Define the path for the output JSON file
    const outputFile = './data/average.json';

    // Convert JSON object to string for saving
    const jsonString = JSON.stringify(jsonData, null, 2);

    // Save JSON string to a file
    fs.writeFile(outputFile, jsonString, (err) => {
        if (err) {
            console.error('An error occurred while writing JSON Object to File.', err);
        } else {
            console.log('JSON file has been saved.');
        }
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

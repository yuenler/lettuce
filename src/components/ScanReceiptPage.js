import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDocs, collection } from 'firebase/firestore'
import { auth, firestore } from '../firebase';
import generic_food from '../assets/generic-food.csv';
import walmart from '../assets/walmart';

const ScanReceiptPage = () => {
  const [user] = useAuthState(auth);
  const [imageFile, setImageFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  useEffect(() => {
    const getReceipts = async () => {
      const receiptsRef = collection(firestore, 'receipts')
      const receiptsSnapshot = await getDocs(receiptsRef)
      const receiptsList = receiptsSnapshot.docs.map(doc => doc.data())
      console.log(receiptsList)
    }
    getReceipts()
  }
    , [])

  async function extractFoodItems(text) {
    //const foodItems = await parseCSVAndExtractFirstColumn(generic_food);
    const foodItems = await extractNamesFromJSONString(walmart);
    //onsole.log(foodItems);
    function separateTextByNumbers(inputText) {
      // Use a regular expression to split the text by numbers
      const textArray = inputText.split(/\d+/);
    
      // Filter out any empty strings from the result
      const filteredArray = textArray.filter((text) => text.trim() !== '');
    
      return filteredArray;
    }
    const filteredFoods = filterArrayByString(foodItems,text);
    text = separateTextByNumbers(text);
    //console.log(text);
    console.log(filteredFoods);
    // const foodItems = [];
    // const lines = text.split(/\r?\n/); // Split the text into lines

    // for (const line of lines) {
    //   // Look for lines that start with a code (e.g., "F") followed by a description
    //   const match = line.match(/^\s*([A-Z]+\s+[A-Z]+)\s+(.+)/);
    //   if (match) {
    //     const code = match[1].trim();
    //     const description = match[2].trim();
    //     foodItems.push(description);
    //   }
    // }

    return filteredFoods;
  }

  async function extractNamesFromJSONString(jsonPath) {
    try {
      const jsonString = await readFile(jsonPath);
      const jsonObjects = jsonString.split('\n').filter((line) => line.trim() !== '');
    
      // Initialize an array to store the extracted names
      const allNames = [];

      // Iterate through each JSON object
      for (const jsonObject of jsonObjects) {
        const parsedJSON = JSON.parse(jsonObject);

        // Check if the parsed object has an "items" property
        if (parsedJSON.items && Array.isArray(parsedJSON.items)) {
          // Extract "name" attributes from each item
          const itemNames = parsedJSON.items.map((item) => item.name);
          
          // Concatenate item names to the result array
          allNames.push(...itemNames);
        }
      }

      return allNames;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }

  function filterArrayByString(array, searchString) {
    // Convert the searchString to lowercase for case-insensitive comparison
    searchString = searchString.toLowerCase();
    console.log(searchString);
  
    // Use the filter method to keep items that appear in the searchString
    const filteredArray = array.filter((item) => {
      // Convert the item to lowercase for case-insensitive comparison
      const lowercasedItem = item.toLowerCase();
      return searchString.split(" ").includes(lowercasedItem);
    });
  
    return filteredArray;
  }
  
 // Function to read a CSV file
async function readFile(file) {
  const get = await fetch(file).then(
    (r)=> r.text());
  
    return get;

}

  async function parseCSVAndExtractFirstColumn(filePath) {
    try {
      const csvData = await readFile(filePath);
      //console.log(csvData);
      // Split the CSV data into rows
      const rows = csvData.split('\n');
  
      // Extract the first column from each row
      const firstColumn = rows.map((row) => {
        const columns = row.split(',');
        return columns[0]; // Extract the first element of each row
      });
  
      return firstColumn;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
  


  const [receipts, loading, error] = [null, null, null];
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleScanReceipt = async () => {
    if (!imageFile) {
      alert('Please select an image first.');
      return;
    }

    try {
      // const formData = new FormData();
      // formData.append('file', imageFile);
      const ReadText = require('text-from-image')

      const text = await ReadText(
        imageFile
      )


      // const extractedText =
      //   response?.data?.responses[0]?.fullTextAnnotation?.text || '';

      setExtractedText(await extractFoodItems(text));

      // Store the extracted text in Firestore
      if (user) {
        await firestore.collection('receipts').add({
          userId: user.uid,
          text: extractedText,
          timestamp: new Date(),
        });
      }
    } catch (error) {
      console.error('Error scanning receipt:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <h2>Scan Your Receipt</h2>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button className="btn btn-primary" onClick={handleScanReceipt}>
            Scan Receipt
          </button>
          <div>
            <h4>Extracted Text:</h4>
            <p>{extractedText}</p>
          </div>
          {user && (
            <div>
              <h4>Your Receipts:</h4>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <ul>
                  {receipts?.docs.map((doc) => (
                    <li key={doc.id}>{doc.data().text}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
          <Link to="/">Go back to Landing Page</Link>
        </div>
      </div>
    </div>
  );
};

export default ScanReceiptPage;

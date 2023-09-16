import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDocs, collection } from 'firebase/firestore'
import { auth, firestore } from '../firebase';
import generic_food from '../assets/generic-food.csv';
import walmart from '../assets/walmart';
import { Link, useLocation } from 'react-router-dom';
import { getDocs, doc, setDoc, deleteDoc, collection } from 'firebase/firestore'
import { firestore } from '../firebase';


const foodLifespan = {
  'zucchini': 5,
  'potato': 10,
}


const ScanReceiptPage = () => {
  const [imageFile, setImageFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const location = useLocation();
  const { username } = location.state;
  const [loading, setLoading] = useState(false);
  const [receiptsList, setReceiptsList] = useState([])
  const [otherPeopleFood, setOtherPeopleFood] = useState([])


  useEffect(() => {
    const getReceipts = async () => {
      const receiptsRef = collection(firestore, 'receipts')
      const receiptsSnapshot = await getDocs(receiptsRef)
      let receiptsList = receiptsSnapshot.docs.map(doc => doc.data())

      // sort by expiration date
      receiptsList.sort((a, b) => a.expiration.seconds - b.expiration.seconds)
      // add a field to all of them called "expiresSoon" if expires in 7 days or less
      receiptsList.forEach(receipt => {
        receipt.expiresSoon = receipt.expiration.seconds * 1000 - Date.now() < 7 * 24 * 60 * 60 * 1000
      })

      //set id to be the doc id
      receiptsList.forEach((receipt, index) => {
        receipt.id = receiptsSnapshot.docs[index].id
      })

      // filter to those where username matches
      receiptsList = receiptsList.filter(receipt => receipt.username === username)

      const other = receiptsList.filter(receipt => receipt.username !== username && receipt.notified)
      setOtherPeopleFood(other)

      setReceiptsList(receiptsList)
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
  


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleScanReceipt = async () => {

    if (!imageFile) {
      alert('Please select an image first.');
      return;
    }

    setLoading(true);


    try {
      // const formData = new FormData();
      // formData.append('file', imageFile);
      const ReadText = require('text-from-image')

      const text = await ReadText(
        imageFile
      )


      // const extractedText =
      //   response?.data?.responses[0]?.fullTextAnnotation?.text || '';

      const foods = await extractFoodItems(text);

      // Store the extracted text in Firestore
      foods.forEach(async (food) => {
        setDoc(doc(firestore, 'receipts', Math.random().toString()), {
          username,
          food: food,
          expiration: new Date(Date.now() + foodLifespan[food] * 24 * 60 * 60 * 1000),
          notified: false
        })
      })
      setLoading(false);
    } catch (error) {
      console.error('Error scanning receipt:', error);
    }
  };

  const notifyNetwork = async (id) => {
    const receiptRef = doc(firestore, 'receipts', id)
    await setDoc(receiptRef, {
      ...receiptsList.find(receipt => receipt.id === id),
      notified: true
    })
    alert('Network notified!')
  }

  const closeCard = async (id) => {
    const receiptRef = doc(firestore, 'receipts', id)
    await deleteDoc(receiptRef)
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <label htmlFor="imageFile" className="form-label">
            Upload a receipt
          </label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <div>
            <button className="btn btn-primary m-3" onClick={handleScanReceipt}>
              Scan Receipt
            </button>
            <Link to="/recipes" className="btn btn-primary btn-lg m-3">
              Recipes
            </Link>
          </div>
          <div>
            <h4>Extracted Text:</h4>
            <p>{extractedText}</p>
          </div>

          <div>
            <h4>Your food</h4>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="container">
                <div className="row">
                  {receiptsList.map((receipt, index) => (
                    <div key={index} className="col-md-6">
                      <div className="card-container">
                        <button
                          className="btn btn-close"
                          onClick={() => closeCard(receipt.id)} // Replace closeCard with your actual close function
                        >
                        </button>
                        <div className="card mb-3">
                          <div className="card-body">
                            <h5 className="card-title">{receipt.food}</h5>
                            <p className="card-text">
                              Expires: {new Date(receipt.expiration.seconds * 1000).toLocaleDateString()}
                            </p>
                            {receipt.expiresSoon && <p className="card-text text-danger">Expires soon!</p>}
                            {!receipt.notified ?
                              <button className='btn btn-primary' onClick={() => notifyNetwork(
                                receipt.id
                              )}>
                                Notify network
                              </button>
                              : <p className="card-text text-success">Network notified!</p>
                            }
                          </div>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>

            )}
          </div>

          <div>
            <h4>Food available in your network</h4>
            <p>These people have food that will expire soon and would love to share it with you!</p>
            <div className="container">
              <div className="row">
                {otherPeopleFood.map((receipt, index) => (
                  <div key={index} className="col-md-6">
                    <div className="card mb-3">
                      <div className="card-body">
                        <h5 className="card-title">{receipt.food}</h5>
                        <p className="card-text">
                          Expires: {new Date(receipt.expiration.seconds * 1000).toLocaleDateString()}
                        </p>
                        {receipt.expiresSoon && <p className="card-text text-danger">Expires soon!</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ScanReceiptPage;

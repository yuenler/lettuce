import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { firestore } from '../firebase';
import { doc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore'
import './ScanReceiptPage.css';
import LoadingSpinner from './Loading';


const foodLifespan = {
  'zucchini': 7,              // Zucchini can last up to 7 days in the fridge.
  'potato': 30,               // Potatoes have a longer shelf life and can last up to 30 days.
  'milk': 7,                  // Milk typically lasts about 7 days in the fridge.
  'grape': 5,                 // Grapes can last around 5 days in the fridge.
  'salad': 5,                 // Salad greens like lettuce can last up to 5 days.
  'pepper': 7,                // Peppers can last about 7 days in the fridge.
  'onion': 30,                // Onions have a longer shelf life and can last up to 30 days.
  'banana': 5,                // Bananas typically last about 5 days in the fridge.
  'garlic': 90,               // Garlic can last up to 90 days or more in the fridge.
  'broccoli': 7,              // Broccoli can last about 7 days in the fridge.
  'lettuce': 5,               // Lettuce typically lasts around 5 days in the fridge.
  'cucumber': 7,              // Cucumbers can last about 7 days in the fridge.
  'tilapia': 3,               // Tilapia is best consumed within 3 days.
  'apple': 30,                // Apples have a longer shelf life and can last up to 30 days.
  'turkey': 3,                // Turkey should be consumed within 3 days.
  'chicken': 3,               // Chicken should be consumed within 3 days.
  'beef': 3,                  // Beef should be consumed within 3 days.
  'ham': 3,                   // Ham should be consumed within 3 days.
  'peach': 5,                 // Peaches typically last about 5 days in the fridge.
  'orange': 14,               // Oranges have a longer shelf life and can last up to 14 days.
  'pea': 3,                   // Peas should be consumed within 3 days.
  'carrot': 14,               // Carrots have a longer shelf life and can last up to 14 days.
  'tomato': 7,                // Tomatoes can last about 7 days in the fridge.
  'spinach': 5,               // Spinach typically lasts around 5 days in the fridge.
  'egg': 30,                  // Eggs have a longer shelf life and can last up to 30 days.
  'cheese': 30,               // Cheese can last up to 30 days or more in the fridge.
  'brussels sprouts': 7,      // Brussels sprouts can last about 7 days in the fridge.
  'peanut butter': 90,        // Peanut butter can last up to 90 days or more in the fridge.
  'parmesan': 4,             // Parmesan can last up to 4 days or more in the fridge.
}


const receiptTextToFoodMap = {
  'ZUCCHINI': 'zucchini',
  'POTATOES': 'potatoes',
  'MILK': 'milk',
  'GRAPE': 'grape',
  'SALAD': 'salad',
  'PEPPERS': 'peppers',
  'ONIONS': 'onions',
  'BANANAS': 'bananas',
  'GARLIC': 'garlic',
  'BROCCOLI': 'broccoli',
  'LETTUCE': 'lettuce',
  'CUCUMBERS': 'cucumbers',
  'TILAPIA': 'tilapia',
  'APPLES': 'apples',
  'TURKEY': 'turkey',
  'CHICKEN': 'chicken',
  'BEEF': 'beef',
  'HAM': 'ham',
  'PEACHES': 'peaches',
  'ORANGES': 'oranges',
  'PEAS': 'peas',
  'CARROTS': 'carrots',
  'TOMATOES': 'tomatoes',
  'SPINACH': 'spinach',
  'EGGS': 'eggs',
  'CHEESE': 'cheese',
  'BRUSSELS SPROUTS': 'brussels sprouts',
  'PNT BUTTR': 'peanut butter',
  'CHKN': 'chicken',
  'PARM': 'parmesan',
}


const ScanReceiptPage = () => {
  const [imageFile, setImageFile] = useState(null);
  const location = useLocation();
  const { username } = location.state;
  const [loading, setLoading] = useState(false);
  const [receiptsList, setReceiptsList] = useState([])
  const [otherPeopleFood, setOtherPeopleFood] = useState([])
  const getReceipts = async () => {
    const receiptsRef = collection(firestore, 'receipts')
    const receiptsSnapshot = await getDocs(receiptsRef)
    let receiptsList = receiptsSnapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })

    // sort by expiration date
    receiptsList.sort((a, b) => a.expiration.seconds - b.expiration.seconds)
    // add a field to all of them called "expiresSoon" if expires in 7 days or less
    receiptsList.forEach(receipt => {
      receipt.expiresSoon = receipt.expiration.seconds * 1000 - Date.now() < 7 * 24 * 60 * 60 * 1000
    })

    // filter to those where username matches
    const myList = receiptsList.filter(receipt => receipt.username === username)

    const other = receiptsList.filter(receipt => receipt.username !== username && receipt.notified)
    setOtherPeopleFood(other)

    setReceiptsList(myList)
  }

  useEffect(() => {
    getReceipts()
  }
    , [])

  async function extractFoodItems(text) {
    text = text.toLowerCase();

    const foods = []
    Object.keys(receiptTextToFoodMap).forEach(key => {
      if (text.includes(key.toLowerCase())) {
        foods.push(receiptTextToFoodMap[key])
      }
    })

    return foods;
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
      const ReadText = require('text-from-image')

      const text = await ReadText(
        imageFile
      )

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
      getReceipts()

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
    getReceipts()
    alert('Network notified!')
  }

  const closeCard = async (id) => {
    console.log(id)
    const receiptRef = doc(firestore, 'receipts', id)
    await deleteDoc(receiptRef)
    getReceipts()
  }

  return (
    <div className='m-5'>
      <div className=" pt-5" >
        <div className="row">
          <div className="text-center">
            <h1
              style={{ color: 'green', fontWeight: 'bold' }}
            >{`Hello ${username}!`}</h1>
            <div style={{ border: '2px solid green', borderRadius: '10px', padding: 20 }}>
              <h2>
                <label htmlFor="imageFile" className="form-label">
                  Upload your grocery receipt
                </label>
              </h2>
              <input type="file" accept="image/*" onChange={handleImageChange} />

            </div>
            <div>
              <button
                className="btn btn-success  btn-lg m-3 "
                onClick={handleScanReceipt}
              >
                Scan Receipt
              </button>
              <Link to="/recipes" className="btn btn-success btn-lg m-3"
                state={{
                  ownFood: receiptsList,
                  otherPeopleFood: otherPeopleFood
                }}

              >
                Recipes
              </Link>
            </div>

            <div>
              <h4>Your food</h4>
              {loading ? (
                <LoadingSpinner />
              ) : (
                <div >
                  {receiptsList.length === 0 && <p>You have no food in your fridge!</p>}
                  <div className="row">
                    {receiptsList.map((receipt, index) => (
                      <div key={receipt.id} className="col-md-4">
                        <div className="card-container">

                          <div className="card mb-3">
                            <button
                              className="btn btn-close m-2"
                              onClick={() => closeCard(receipt.id)}
                            >
                            </button>
                            <div className="card-body">
                              <h5 className="card-title">{receipt.food[0].toUpperCase() + receipt.food.slice(1)}</h5>
                              <p className="card-text">
                                Expires: {new Date(receipt.expiration.seconds * 1000).toLocaleDateString()}
                              </p>
                              {receipt.expiresSoon && <p className="card-text text-danger">Expires soon!</p>}
                              {!receipt.notified ?
                                <button
                                  className='btn btn-success' onClick={() => notifyNetwork(
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
              <div className="">
                {otherPeopleFood.length === 0 && <p>
                  No food available in your network!
                </p>}

                <div className="row">
                  {otherPeopleFood.map((receipt, index) => (
                    <div key={receipt.id} className="col-md-4">
                      <div className="card mb-3">
                        <div className="card-body">
                          <p>{receipt.username}</p>

                          <h5 className="card-title">{receipt.food[0].toUpperCase() + receipt.food.slice(1)

                          }</h5>
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
    </div >
  );
};

export default ScanReceiptPage;

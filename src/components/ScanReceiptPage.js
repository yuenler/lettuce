import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { firestore } from '../firebase';
import walmart from '../assets/walmart';
import { doc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore'


const foodLifespan = {
  'zucchini': 5,
  'potato': 10,
  'milk': 7,
  'grape': 3,
  'salad': 7,
}

const receiptTextToFoodMap = {
  'ZUCCHINI': 'zucchini',
  'POTATO': 'potato',
  'MILK': 'milk',
  'GRAPE': 'grape',
  'SALAD': 'salad',
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
                className="btn btn-success m-3 "
                onClick={handleScanReceipt}
              >
                Scan Receipt
              </button>
              <Link to="/recipes" className="btn btn-success btn-lg m-3"
              >
                Recipes
              </Link>
            </div>

            <div>
              <h4>Your food</h4>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div >
                  <div className="row">
                    {receiptsList.map((receipt, index) => (
                      <div key={receipt.id} className="col-md-6">
                        <div className="card-container">

                          <div className="card mb-3">
                            <button
                              className="btn btn-close m-2"
                              onClick={() => closeCard(receipt.id)}
                            >
                            </button>
                            <div className="card-body">
                              <h5 className="card-title">{receipt.food}</h5>
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
                <div className="row">
                  {otherPeopleFood.map((receipt, index) => (
                    <div key={receipt.id} className="col-md-6">
                      <div className="card mb-3">
                        <div className="card-body">
                          <p>{receipt.username}</p>

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
    </div >
  );
};

export default ScanReceiptPage;

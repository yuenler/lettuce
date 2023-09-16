import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getDocs, doc, setDoc, collection } from 'firebase/firestore'
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


  useEffect(() => {
    const getReceipts = async () => {
      const receiptsRef = collection(firestore, 'receipts')
      const receiptsSnapshot = await getDocs(receiptsRef)
      const receiptsList = receiptsSnapshot.docs.map(doc => doc.data())
      setReceiptsList(receiptsList)
    }
    getReceipts()
  }
    , [])

  function extractFoodItems(text) {
    const foods = ['zucchini', 'potato']

    return foods;
  }


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleScanReceipt = async () => {
    setLoading(true);

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

      const foods = extractFoodItems(text)

      // Store the extracted text in Firestore
      foods.forEach(async (food) => {
        setDoc(doc(firestore, 'receipts', Math.random().toString()), {
          username,
          food: food,
          expiration: new Date(Date.now() + foodLifespan[food] * 24 * 60 * 60 * 1000)
        })
      })
      setLoading(false);
    } catch (error) {
      console.error('Error scanning receipt:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
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
            <h4>Your food:</h4>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="container">
                <div className="row">
                  {receiptsList.map((receipt, index) => (
                    <div key={index} className="col-md-6">
                      <div className="card mb-3">
                        <div className="card-body">
                          <h5 className="card-title">{receipt.food}</h5>
                          <p className="card-text">
                            Expires: {new Date(receipt.expiration.seconds * 1000).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ScanReceiptPage;

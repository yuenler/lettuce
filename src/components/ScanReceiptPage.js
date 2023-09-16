import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDocs, collection } from 'firebase/firestore'
import { auth, firestore } from '../firebase';

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

  function extractFoodItems(text) {
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

    return text;
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

      setExtractedText(extractFoodItems(text));

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

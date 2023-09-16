import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDocs, collection } from 'firebase/firestore'
import { auth, firestore } from '../firebase';
import axios from 'axios';

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
      const formData = new FormData();
      formData.append('file', imageFile);

      // Send the image to the Google Cloud Vision API for text extraction
      const response = await axios.post(
        'https://vision.googleapis.com/v1/images:annotate?key=YOUR_API_KEY',
        {
          requests: [
            {
              image: {
                content: formData,
              },
              features: [{ type: 'DOCUMENT_TEXT_DETECTION' }],
            },
          ],
        }
      );

      const extractedText =
        response?.data?.responses[0]?.fullTextAnnotation?.text || '';

      setExtractedText(extractedText);

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

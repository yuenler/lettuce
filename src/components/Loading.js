import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center m-5">
      {/* Use Bootstrap's spinner class */}
      <div className="spinner-border text-success" role="status">
      </div>
    </div>
  );
};

export default LoadingSpinner;

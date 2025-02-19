import PropTypes from 'prop-types'
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faFileAlt, faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./ContractReview.css";

const ContractReview = ({sessionId}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionId) {
      localStorage.setItem('sessionId', sessionId);
    }
  }, [sessionId]);

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setError("Please select a file to upload.");
      return;
    }

    setLoading(true);
    setError("");
    setReview("");

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post("/api/review-contract", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Session-Id": sessionId, // Replace with actual session ID
        },
        withCredentials: true,
      });

      setReview(response.data.review);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to review contract.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contract-review">
      <h2>Contract Review</h2>
      <div className="file-upload">
        <input type="file" multiple onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={loading}>
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            <>
              <FontAwesomeIcon icon={faUpload} /> Upload & Review
            </>
          )}
        </button>
      </div>

      {selectedFiles.length > 0 && (
        <div className="file-list">
          <h4>Selected Files:</h4>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>
                <FontAwesomeIcon icon={faFileAlt} /> {file.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {loading && <p className="loading">Reviewing contract...</p>}
      {error && <p className="error">{error}</p>}
      {review && (
        <div className="review-output">
          <h4>Review Results:</h4>
          <p>{review}</p>
        </div>
      )}
    </div>
  );
};

ContractReview.propTypes = {
    sessionId: PropTypes.string.isRequired
}

export default ContractReview;

import { useState, useEffect } from 'react';
import { updateModel } from '../../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminAuth.css';

const ModelChange = () => {
  const [modelName, setModelName] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [supportedModels, setSupportedModels] = useState([]);
  const [currentModel, setCurrentModel] = useState('');

  useEffect(() => {
    const fetchSupportedModels = async () => {
      try {
        const data = await updateModel(); // Call with no arguments to fetch models
        setSupportedModels(data.supported_models);
        setCurrentModel(data.current_model);
      } catch (error) {
        toast.error(error.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };

    fetchSupportedModels();
  }, []);

  const handleUpdateModel = async () => {
    if (!modelName) {
      toast.error('Please enter a model name.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    setIsUpdating(true);
    try {
      const message = await updateModel(modelName);
      toast.success(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setCurrentModel(modelName); // Update the current model
      setModelName(''); // Clear the input field
    } catch (error) {
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="model-change-container">
      <ToastContainer />
      <h2>Change AI Model</h2>
      <p>Current Model: <strong>{currentModel}</strong></p>
      <p>Select a new AI model to use in the backend. Ensure the model name is valid and supported.</p>
      <select
        value={modelName}
        onChange={(e) => setModelName(e.target.value)}
        disabled={isUpdating}
      >
        <option value="">Select a model</option>
        {supportedModels.map((model) => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>
      <button onClick={handleUpdateModel} disabled={isUpdating || !modelName}>
        {isUpdating ? 'Updating...' : 'Update Model'}
      </button>
    </div>
  );
};

export default ModelChange;
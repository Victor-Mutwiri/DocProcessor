import { useState, useEffect } from 'react';
import { getMemoryUsage } from '../../../services/api';

const MemoryUsage = () => {
  const [memory, setMemory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMemoryUsage = async () => {
      try {
        const data = await getMemoryUsage();
        setMemory(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    loadMemoryUsage();
    const interval = setInterval(loadMemoryUsage, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="loading">Loading memory usage...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="memory-usage">
      <h3>Memory Usage</h3>
      <ul>
        <li>RSS: {memory.rss.toFixed(2)} MB</li>
        <li>VMS: {memory.vms.toFixed(2)} MB</li>
        {memory.shared && <li>Shared: {memory.shared.toFixed(2)} MB</li>}
      </ul>
    </div>
  );
};

export default MemoryUsage;
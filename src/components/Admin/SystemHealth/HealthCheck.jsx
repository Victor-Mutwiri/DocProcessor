import { useState, useEffect } from 'react';
import { checkHealth } from '../../../services/api';

const HealthCheck = () => {
  const [status, setStatus] = useState('checking...');
  const [lastChecked, setLastChecked] = useState(null);

  useEffect(() => {
    const check = async () => {
      try {
        const data = await checkHealth();
        setStatus(data.status);
        setLastChecked(new Date());
      } catch (error) {
        setStatus('Error: ' + error.message);
      }
    };
    
    check();
    const interval = setInterval(check, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="health-check">
      <h3>System Status</h3>
      <p>Status: <span className={status === 'running' ? 'status-good' : 'status-bad'}>{status}</span></p>
      {lastChecked && <p>Last checked: {lastChecked.toLocaleTimeString()}</p>}
    </div>
  );
};

export default HealthCheck;
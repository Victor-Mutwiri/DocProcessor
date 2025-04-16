import {API_BASE_URL} from '../config/config';

const getSessionId = () =>localStorage.getItem('adminSessionId')


export const fetchUsers = async () => {
  try {
    const sessionId = getSessionId();
    console.log('Using sessionId for API call:', sessionId);
    if (!sessionId) {
      throw new Error('No valid session ID found. Please log in again.');
    }
    const response = await fetch(`${API_BASE_URL}/api/users`, {
      credentials: 'include', // Include cookies for session
      headers: {
        'Content-Type': 'application/json', // Include session ID in headers
        'X-Session-ID': sessionId
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch users');
    }
    const data = await response.json();
    console.log('Fetched users:', data)
    return data;
  } catch (error) {
    console.error('Error fetching users:', error.message);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  const sessionId = getSessionId();
  const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json', // Include session ID in headers
      'X-Session-ID': sessionId
    },
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to delete user');
  return await response.json();
};

export const toggleUserStatus = async (userId) => {
  const sessionId = getSessionId();
  const response = await fetch(`${API_BASE_URL}/api/users/${userId}/toggle-status`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Session-ID': sessionId
    },
    credentials: 'include',
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to toggle user status');
  }
  
  return await response.json();
};

export const getSummary = async () => {
  try {
    const sessionId = getSessionId();
    console.log('Using sessionId for summary API call:', sessionId);
    if (!sessionId) {
      throw new Error('No valid session ID found. Please log in again.');
    }

    const response = await fetch(`${API_BASE_URL}/api/summary`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // Include session ID in headers
        'X-Session-ID': sessionId
      },
      credentials: 'include', // Include cookies for session
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch summary');
    }

    const data = await response.json();
    console.log('Fetched summary:', data);
    return data;
  } catch (error) {
    console.error('Error fetching summary:', error.message);
    throw error;
  }
};

export const checkHealth = async () => {
  const response = await fetch(`${API_BASE_URL}/api/health-check`, {
    headers: {
      'Session-Id': getSessionId(), // Include session ID in headers
    },
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Health check failed');
  return await response.json();
};

export const getMemoryUsage = async () => {
  const response = await fetch(`${API_BASE_URL}/api/memory-usage`, {
    headers: {
      'Session-Id': getSessionId(), // Include session ID in headers
    },
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to get memory usage');
  return await response.json();
};
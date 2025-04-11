import {API_BASE_URL} from '../config/config';

const getSessionId = () =>localStorage.getItem('adminSessionId')

export const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users`, {
      headers: {
        'Session-Id': getSessionId(), // Include session ID in headers
      },
      credentials: 'include', // Include cookies for session
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
  const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Session-Id': getSessionId(), // Include session ID in headers
    },
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to delete user');
  return await response.json();
};

export const toggleUserStatus = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/api/users/${userId}/toggle-status`, {
    method: 'POST',
    headers: {
      'Session-Id': getSessionId(), // Include session ID in headers
    },
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to toggle user status');
  return await response.json();
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
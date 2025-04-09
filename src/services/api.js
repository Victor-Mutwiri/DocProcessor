import {API_BASE_URL} from '../config/config';


export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/api/users`);
  if (!response.ok) throw new Error('Failed to fetch users');
  return await response.json();
};

export const deleteUser = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete user');
  return await response.json();
};

export const toggleUserStatus = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/api/users/${userId}/toggle-status`, {
    method: 'POST',
  });
  if (!response.ok) throw new Error('Failed to toggle user status');
  return await response.json();
};

export const checkHealth = async () => {
  const response = await fetch(`${API_BASE_URL}/api/health-check`);
  if (!response.ok) throw new Error('Health check failed');
  return await response.json();
};

export const getMemoryUsage = async () => {
  const response = await fetch(`${API_BASE_URL}/api/memory-usage`);
  if (!response.ok) throw new Error('Failed to get memory usage');
  return await response.json();
};
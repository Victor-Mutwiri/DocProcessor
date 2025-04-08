import { Route, Routes } from 'react-router-dom';
import Sidebar from '../../components/Admin/Layout/Sidebar';
import Header from '../../components/Admin/Layout/Header';
import UsersList from '../../components/Admin/UsersManagement/UsersList';
import HealthCheck from '../../components/Admin/SystemHealth/HealthCheck';
import { getMemoryUsage as MemoryUsage } from '../../services/api';

const Admin = () => {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content-area">
          <Routes>
            <Route path="/admin/users" element={
              <div className="system-health">
                <UsersList />
              </div>
              } />
            <Route
              path="/admin/system"
              element={
                <div className="system-health">
                  <HealthCheck />
                  <MemoryUsage />
                </div>
              }
            />
            <Route
              path="/admin"
              element={
                <div className="dashboard">
                  <h2>Admin Dashboard</h2>
                  <p>Select a section from the sidebar to manage the system.</p>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
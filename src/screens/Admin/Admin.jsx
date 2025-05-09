import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../../components/Admin/Layout/Sidebar';
import Header from '../../components/Admin/Layout/Header';
/* import UsersList from '../../components/Admin/UsersManagement/UsersList'; */
import UserManagement from '../../components/Admin/UsersManagement/UserManagement'
//import HealthCheck from '../../components/Admin/SystemHealth/HealthCheck';
//import { getMemoryUsage as MemoryUsage } from '../../services/api';
import useAdminLogout from '../../components/Admin/Authentication/AdminLogout';
import Dashboard from './Dashboard';
import ModelChange from './ModelChange';

const Admin = () => {
  const handleAdminLogout = useAdminLogout()
  const navigate = useNavigate()

  useEffect(() => {
    const checkSession = ()=>{
      const sessionId = localStorage.getItem('adminSessionId');
      const sessionExpiration = localStorage.getItem('adminSessionExpiration');
      const currentTime = new Date().getTime();

      if (!sessionId || !sessionExpiration || currentTime > sessionExpiration) {
        localStorage.remove('adminSessionId');
        localStorage.remove('adminSessionExpiration');
        navigate('/adminlogin')
      }
    }
    checkSession()

    const interval = setInterval(checkSession, 60 *1000); // Check every minute

    return ()=>clearInterval(interval);
  },[navigate])

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="main-content">
        <Header onLogout={handleAdminLogout}/>
        <div className="content-area">
          <Routes>
            <Route index element={<Dashboard/>} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/models" element={<ModelChange />} />
            {/* <Route
              path="/system"
              element={
                <div className="system-health">
                  <HealthCheck />
                  <MemoryUsage />
                </div>
              }
            /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
import {useState, useEffect} from 'react';
import {getSummary} from '../../services/api';
import { FaUsers, FaFileAlt, FaFileContract } from 'react-icons/fa';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SummaryCards = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const Card = styled.div`
  flex: 1;
  min-width: 200px;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CardIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 10px;
  color: #007bff;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const CardValue = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
`;

const ChartContainer = styled.div`
  background: #fff;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Dashboard = ()=> {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSummary = async () => {
          setLoading(true);
          setError(null);
          try {
            const data = await getSummary();
            setSummary(data);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchSummary();
      }, []);
    
    if (loading) return <div>Loading summary...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!summary) return <div>No summary data available</div>;

    const chartData = {
        labels: ['Total Files', 'Total Contracts', 'Total Users', 'Active Users', 'Inactive Users'],
        datasets: [
          {
            label: 'Summary Data',
            data: [
              summary.total_files,
              summary.total_contracts,
              summary.total_users,
              summary.active_users,
              summary.inactive_users,
            ],
            backgroundColor: ['#007bff', '#28a745', '#ffc107', '#17a2b8', '#dc3545'],
          },
        ],
    };
    
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Admin Dashboard Summary',
            },
        },
    };
    
    return (
        <DashboardContainer>
            <h2>Admin Dashboard</h2>
            <SummaryCards>
                <Card>
                  <CardIcon>
                      <FaFileAlt />
                  </CardIcon>
                  <CardTitle>Total Files</CardTitle>
                  <CardValue>{summary.total_files}</CardValue>
                </Card>
                <Card>
                  <CardIcon>
                      <FaFileContract />
                  </CardIcon>
                  <CardTitle>Total Contracts</CardTitle>
                  <CardValue>{summary.total_contracts}</CardValue>
                </Card>
                <Card>
                  <CardIcon>
                      <FaUsers />
                  </CardIcon>
                  <CardTitle>Total Users</CardTitle>
                  <CardValue>{summary.total_users}</CardValue>
                </Card>
                <Card>
                  <CardIcon>
                      <FaUsers />
                  </CardIcon>
                  <CardTitle>Active Users</CardTitle>
                  <CardValue>{summary.active_users}</CardValue>
                </Card>
                <Card>
                  <CardIcon>
                      <FaUsers />
                  </CardIcon>
                  <CardTitle>Inactive Users</CardTitle>
                  <CardValue>{summary.inactive_users}</CardValue>
                </Card>
            </SummaryCards>
            <ChartContainer>
                <h3>Summary Chart</h3>
                <Bar data={chartData} options={chartOptions} />
            </ChartContainer>
        </DashboardContainer>
    )
}

export default Dashboard;
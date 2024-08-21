import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import io from 'socket.io-client';
// import './styles.css';

const socket = io('http://localhost:5000');

function CustomerDashboard() {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState({
    categoryChart: {
      labels: [],
      datasets: []
    },
    pieChart: {
      labels: [],
      datasets: []
    }
  });
  const [expenseVsRevenue, setExpenseVsRevenue] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/api/transactions')
      .then(res => res.json())
      .then(data => {
        setData(data);
        updateCharts(data);
      });

    socket.on('data_updated', () => {
      fetch('http://localhost:5000/api/transactions')
        .then(res => res.json())
        .then(data => {
          setData(data);
          updateCharts(data);
        });
    });
  }, []);

  const updateCharts = (data) => {
    const categories = [...new Set(data.map(record => record.category))];
    const categoryData = categories.map(category =>
      data.filter(record => record.category === category).reduce((acc, record) => acc + parseFloat(record.amount), 0)
    );

    const totalAmount = data.reduce((acc, record) => acc + parseFloat(record.amount), 0);
    const expense = data.filter(record => parseInt(record.fraud) === 1).reduce((acc, record) => acc + parseFloat(record.amount), 0);
    const revenue = totalAmount - expense;
    const expensePercentage = totalAmount ? (expense / totalAmount) * 100 : 0;
    setExpenseVsRevenue(expensePercentage);

    setChartData({
      categoryChart: {
        labels: categories,
        datasets: [{
          label: 'Amount by Category',
          data: categoryData,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      pieChart: {
        labels: ['Expenses', 'Revenue'],
        datasets: [{
          data: [expense, revenue],
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
          borderWidth: 1
        }]
      }
    });
  };

  return (
    <div className="dashboard">
      <h2>Customer Dashboard</h2>
      <div className="chart-container">
        <h3>Category-wise Transactions</h3>
        <Bar data={chartData.categoryChart} options={{ responsive: true }} />
      </div>
      <div className="chart-container">
        <h3>Expenses vs Revenue</h3>
        <Pie data={chartData.pieChart} options={{ responsive: true }} />
      </div>
      {/* Add more graphs for other suggested features */}
    </div>
  );
}

export default CustomerDashboard;

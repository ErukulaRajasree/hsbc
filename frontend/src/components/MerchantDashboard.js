import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const MerchantDashboard = () => {
    const [chartData, setChartData] = useState({
        expensesVsRevenue: {
            labels: [],
            datasets: [
                {
                    label: 'Expenses vs Revenue',
                    data: [],
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 1,
                },
            ],
        },
        // Add other chart data objects here
    });

    useEffect(() => {
        socket.on('dataUpdate', (newData) => {
            // Process the newData to update the chartData state
            // Example: update expensesVsRevenue data
            setChartData((prevData) => ({
                ...prevData,
                expensesVsRevenue: {
                    labels: newData.expensesVsRevenue.labels,
                    datasets: [{
                        ...prevData.expensesVsRevenue.datasets[0],
                        data: newData.expensesVsRevenue.data,
                    }],
                },
            }));
        });
    }, []);

    return (
        <div>
            <h1>Merchant Dashboard</h1>
            <div className="chart-container">
                <h2>Expenses vs Revenue</h2>
                <Bar data={chartData.expensesVsRevenue} />
                {/* Add other charts here */}
            </div>
        </div>
    );
};

export default MerchantDashboard;

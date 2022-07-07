import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js'
Chart.register(ArcElement);

const state = {
    labels: ['January', 'February', 'March',
        'April', 'May'],
    datasets: [
        {
            label: 'Rainfall',
            backgroundColor: [
                '#B21F00',
                '#C9DE00',
                '#2FDE00',
                '#00A6B4',
                '#6800B4'
            ],
            hoverBackgroundColor: [
                '#501800',
                '#4B5000',
                '#175000',
                '#003350',
                '#35014F'
            ],
            data: [65, 59, 80, 81, 56]
        }
    ]
}
const PieChart = () => {
    return (
        <div>
            <Pie
                data={state}
                options={{
                    layout: {
                        padding: {
                            left: 250, right: 250,
                            bottom: 250
                        }
                    },
                    plugins: {
                        title: {
                            align: 'start',
                            // display: true,
                            text: 'Custom Chart Title'
                        },
                        legend: {
                            // display: true,
                            position: "right",
                            labels: {
                                font: {
                                    size: 14
                                }
                            }
                        }
                    }
                }}
            />
        </div>
    );
};

export default PieChart;
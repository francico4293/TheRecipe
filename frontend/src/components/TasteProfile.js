import React from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Radar } from 'react-chartjs-2';

  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

  export const TasteProfile = ({ profile }) => {

    // chartjs radar configuration and data
    const data = {
        labels: ['Sweetness', 'Saltiness', 'Sourness', 'Bitterness', 'Savoriness', 'Fattiness'],
        datasets: [
          {
            label: 'Taste Profile',
            data: [profile.sweetness, profile.saltiness, profile.sourness, profile.bitterness, profile.savoriness, profile.fatiness],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          },
        ],
    };

    return (
        <Radar data={data}/>
    );
  }

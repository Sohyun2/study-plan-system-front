import '../commonStyle.css'

import {Bar} from 'react-chartjs-2';
import React from 'react'

const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: '사용자별 접속 횟수',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
}
const Home = () => {
    return(
        <div className="main">
            home
            <div>
                <Bar
                data={barData}
                width={100}
                height={30}          
                />
            </div>
        </div>
    )

}

export default Home
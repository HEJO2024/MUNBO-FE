import React, { useEffect, useState } from 'react';
import AdminHeader from "../components/AdminHeader";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
ChartJS.register(ArcElement, Tooltip, Legend);
const ViewRate=()=>{
  const token=sessionStorage.getItem("token")
  const navigate=useNavigate();
  const [rate,setRate]=useState([]);



     useEffect(() => {
      fetchviewrate();
   }, []); //가져온 오답률 통계
  
   
     const fetchviewrate = async () => {     
       try {
           const response = await axios.get(`/admin/viewRate`,{
            headers:{
             'Authorization':token
           }
           
         })
         
         if(response){
          setRate(response.data.rateData);
       }
  
      }catch (error) {
        if(error.response.status===500){
         alert(error.response.data.message);
        }
        else if(error.response.status===401 || error.response.status===403){
          alert(error.response.data.message);
          sessionStorage.removeItem("token");
          navigate("/admin/login");
         }
       }  }// api로 오답률 받아오는 함수
    function getRandomColor() {
      const r = Math.floor(Math.random() * 256); // 0부터 255까지의 임의의 정수
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgba(${r}, ${g}, ${b}, 0.6)`; // 랜덤한 RGB 색상에 투명도 추가
    }
    
    const backgroundColors = rate.map(() => getRandomColor());
    
    
const data = {
    labels: rate.map((it)=>it.subjectName),
    datasets: [
      {
        label: '평균 오답률(%)',
        data: rate.map(rateItem => (rateItem.wrgCount / rateItem.totalCount * 100).toFixed(2)),
        backgroundColor: backgroundColors,
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    width: 100, 
    height: 50, 
};

return(
    <div className="AdminEntire">
        <AdminHeader/>
        <div className="UserText">과목별 오답률 통계</div>
        <div className="PieChart">
        <Pie data={data} options={options}/></div>
    </div>
)
};
export default ViewRate;



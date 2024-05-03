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
  const [subject,setSubject]=useState([])
  const [rate,setRate]=useState([

    {
      subjectId:1,
      countSolveTimes:135,
      countWrgTimes:117
    },
    {
      subjectId:3,
      countSolveTimes:9665,
      countWrgTimes:1465
    },
    {
      subjectId:4,
      countSolveTimes:87,
      countWrgTimes:55
     },
     {
      subjectId:4,
      countSolveTimes:47,
      countWrgTimes:15
     },
  ]);

  useEffect(() => {
    fetchsubjectData();
 }, []); //가져온 과목데이터 실행

 
   const fetchsubjectData = async () => {     
     try {
         const response = await axios.get(`/admin/subject/listView`,{
          headers:{
           'Authorization':token
         }
       })
       if(response)
         setSubject(response.data.subjectList);

     }catch (error) {
      if(error.response.status===500){
       alert(error.response.data.message);
      }
      else if(error.response.status===401 || error.response.status===403){
        alert(error.response.data.message);
        sessionStorage.removeItem("token");
        navigate("/admin/login");
       }
     }  }// api로 과목 정보 받아오는 함수
     const labelData = rate.map(rateItem => {
      const subjectItem = subject.find(subjectItem => rateItem.subjectId === subjectItem.subjectId);
      return subjectItem ? subjectItem.subjectName : ''; 
    });  //subjectName을 매칭해서 가져옴
    function getRandomColor() {
      const r = Math.floor(Math.random() * 256); // 0부터 255까지의 임의의 정수
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgba(${r}, ${g}, ${b}, 0.6)`; // 랜덤한 RGB 색상에 투명도 추가
    }
    
    const backgroundColors = rate.map(() => getRandomColor());
    
    
const data = {
    labels: labelData,
    datasets: [
      {
        label: '평균 오답률',
        data: rate.map(rateItem => (rateItem.countWrgTimes / rateItem.countSolveTimes * 100).toFixed(2)),
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



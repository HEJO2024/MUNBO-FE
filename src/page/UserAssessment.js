import AdminHeader from "../components/AdminHeader";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2'; 
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const UserAssessment = () => {
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();
    const [assess, setAssess] = useState({ 
        Allsolve: 200,
        unAssess: 20
    });
   /* useEffect(() => {
        fetchassessment();
     }, []); //가져온 사용자평가
    
     
       const fetchassessment = async () => {     
         try {
             const response = await axios.get(`/admin/userAssessment`,{
              headers:{
               'Authorization':token
             }
             
           })
           if(response){
            setAssess({
        Allsolve:response.data.assessmentData.totalCount,
        unAssess:response.data.assessmentData.count
        })
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
         }  }// api로 사용자평가 받아오는 함수*/
    const data = {
        labels: [ '비추천','비추천받지 않음'],
        datasets: [
            {
                label: '횟수',
                data: [assess.unAssess,assess.Allsolve - assess.unAssess],
                backgroundColor: ['#FF6384','#36A2EB'],
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        width: 100,
        height: 50,
    };
    
    return (
        <div className="AdminEntire">
            <AdminHeader/>
            <div className="UserText">사용자 평가 통계</div>
            <div className="PieChart">
                <Pie data={data} options={options}/>  
            </div>
        </div>
    )
};

export default UserAssessment;

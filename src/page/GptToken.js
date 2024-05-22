import { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const GptToken=()=>{
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();
    const [data,setData]=useState();
    useEffect(() => {
        fetchtoken();
     }, []); //가져온 토큰사용량
    
     
       const fetchtoken = async () => {     
         try {
             const response = await axios.get(`/admin/viewToken`,{
              headers:{
               'Authorization':token
             }
             
           })
           if(response){
            setData(response.data.totalToken);
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
         }  }// api로 토큰 사용량 받아오는 함수
return(
    <div className="AdminEntire">
        <AdminHeader/>
        <div className="UserText">GPT 토큰 사용량</div>
        <div className="TokenText">전체 토큰사용량 : {data}</div>

    </div>
)
};
export default GptToken;
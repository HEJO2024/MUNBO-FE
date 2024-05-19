import { useNavigate } from "react-router-dom";
import AdminButton from "../../components/AdminButton";
import AdminHeader from "../../components/AdminHeader";
import { useEffect, useState } from "react";
import axios from "axios";
const AiPrompt=()=>{
    const [data,setData]=useState();
    const navigate=useNavigate();
    const token=sessionStorage.getItem("token");

    useEffect(() => {
        fetchpromptData();
     }, []); //가져온 aiprompt 실행
    
       const fetchpromptData = async () => {     
         try {
             const response = await axios.get(`/admin/prompt_manager`, {
              headers:{
               'Authorization':token
             }
           })
          setData(response.data.prompt)
         }catch (error) {
          if(error.response.status===500){
          alert(error.response.data.message);
          }
          else if(error.response.status===401 || error.response.status===403){
            alert(error.response.data.message);
            sessionStorage.removeItem("token");
            navigate("/admin/login");
           }
         } } // api로 aiprompt 정보 받아오는 함수
return(
    <div className="AdminEntire">
    <AdminHeader/>
    <div className="UserText">AiPrompt 관리</div>
    <div className="AiPromptView">{data}</div>
    <AdminButton text="수정" className="AiPromptViewButton" onClick={()=>navigate("/admin/ai/aiprompt/edit")}/>
    </div>
)
};
export default AiPrompt
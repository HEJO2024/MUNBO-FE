
import { useNavigate } from "react-router-dom";
import AdminButton from "../../components/AdminButton";
import AdminHeader from "../../components/AdminHeader";
import { useEffect, useState } from "react";
import axios from "axios";
const AiPromptEdit=()=>{
    const [data,setData]=useState("");
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
    const handleSubmit=async()=>{
        axios.post(`/admin/prompt_manager`,{
            prompt:data
        }, {
            headers:{
             'Authorization':token
           }
         }).then(response => {        
            alert("수정 성공했습니다");
            navigate("/admin/ai/aiprompt")
        })
        .catch(error => {
           if(error.response.status===500){
             alert(error.response.data.message);
           }
          else if(error.response.status===401 || error.response.status===403){
             alert(error.response.data.message);
             sessionStorage.removeItem("token");
             navigate("/admin/login");
            }
        });
       }  // axios 이용하여 aipromt 전송

return(
    <div className="AdminEntire">
        <AdminHeader/>
        <div className="UserText">AiPrompt 수정</div>
        <textarea value={data}className="AiPromptBox" onChange={(e)=>setData(e.target.value)} style={{ resize: 'none' }}/>
        <div className="AiPromptButtonList">
        <AdminButton text="이전" className="AiPromptButton" onClick={()=>navigate(-1)}/>
        <AdminButton text="완료" className="AiPromptButton" onClick={handleSubmit}/></div>
        </div>
)
}
export default AiPromptEdit;
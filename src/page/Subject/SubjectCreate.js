import { useState } from "react";
import AdminButton from "../../components/AdminButton";
import AdminHeader from "../../components/AdminHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SubjectCreate=()=>{
    const [data,setData]=useState();
    const navigate=useNavigate();
    const handleSubmit=async()=>{
        axios.post(`/admin/subject/create`,{
            subjectName:data
        }).then(response => {        
            alert("과목이 생성되었습니다.");
            window.location.reload();
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
        navigate("/admin/subject/view");

       }  // axios 이용하여 과목 생성처리하는 함수
    
return(
    <div className="AdminEntire">
        <AdminHeader/>
        <div className="UserText">과목 생성</div>
        <input className="RoundCreateBox" onChange={(e)=>setData(e.target.value)} ></input>
        <div className="RoundCreateButtonList">
        <AdminButton text="취소" className="RoundCreateButton" onClick={()=>navigate(-1)}/>
        <AdminButton text="완료" className="RoundCreateButton" onClick={handleSubmit}/>
        </div></div>
)
};
export default SubjectCreate;
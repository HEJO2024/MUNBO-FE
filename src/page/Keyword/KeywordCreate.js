import { useState } from "react";
import AdminButton from "../../components/AdminButton";
import AdminHeader from "../../components/AdminHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const KeywordCreate=()=>{
    const [name,setName]=useState();
    const [mean,setMean]=useState();
    const token=sessionStorage.getItem("token")
    const navigate=useNavigate();
    const handleSubmit=async()=>{
        axios.post(`/admin/keyword/create`,{
            keywordName:name,
            keywordMean:mean
        }, {
            headers:{
             'Authorization':token
           }
         }).then(response => {        
            alert("키워드가 생성되었습니다.");
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
        navigate("/admin/keyword/view");

       }  // axios 이용하여 키워드 생성처리하는 함수
    
return(
    <div className="AdminEntire">
        <AdminHeader/>
        <div className="UserText">키워드 생성</div>
        <div className="KeywordBoxAll">
        <input className="KeywordCreateBox1" onChange={(e)=>setName(e.target.value)} ></input>
        <textarea className="KeywordCreateBox2" onChange={(e)=>setMean(e.target.value)} /></div>
        <div className="KeywordCreateButtonList">
        <AdminButton text="취소" className="KeywordCreateButton" onClick={()=>navigate(-1)}/>
        <AdminButton text="완료" className="KeywordCreateButton" onClick={handleSubmit}/>
        </div></div>
)
};
export default KeywordCreate;
import { useEffect, useState } from "react";
import AdminButton from "../components/AdminButton";
import AdminHeader from "../components/AdminHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AdminLogin=()=>{
    const [id,setId]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate()
   
  const handleSubmit=async()=>{
   try {
      const response = await axios.post(`/admin/users/login`, { 
         userId:id,
         passwd:password });
         console.log(response)
  
      if (response.status === 200) {
         console.log('로그인 성공');
     
         const token = response.headers['authorization'];
    
         sessionStorage.setItem('token', token);
        
        navigate("/");
      }
    } catch (error) {
      console.log(error)
      if(error.response.status===500){
      alert(error.response.data.message);}
      else if (error.response.status === 401) {
        alert(error.response.data.message)
      }
    } // axios 이용하여 로그인하는 함수
   }
 return(
    <div className="AdminLogin">
        <AdminHeader/>
        <div className="LoginText">관리자용 로그인</div>
        <input placeholder="아이디" value={id} onChange={(e)=>setId(e.target.value)} className="LoginInput"></input>
        <input placeholder="비밀번호" value={password} onChange={(e)=>setPassword(e.target.value)} className="LoginInput"></input>
        <AdminButton text="로그인" className="LoginButton" onClick={handleSubmit} />

        
    </div>
 )
};
export default AdminLogin;
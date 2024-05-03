import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../components/AdminHeader";
import axios from "axios";
import AdminButton from "../../components/AdminButton";

const QuizSubjectList=()=>{
    const token=sessionStorage.getItem("token")
    const[subject,setSubject]=useState([]);
    const navigate=useNavigate();

    useEffect(() => {
        fetchsubjectData();
        console.log(subject)
     }, []); //가져온 과목데이터 실행
    
     
       const fetchsubjectData = async () => {     
         try {
             const response = await axios.get(`/admin/subject/listView`, {
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
           }}
         }  // api로 과목 정보 받아오는 함수
         const handleOnClick=(id)=>{
          navigate(`/admin/quiz/view/${id}`)
         }
return(
    <div className="AdminEntire">
        <AdminHeader/>
        <div className="QuizSubjectList">
          {subject&&subject.map((it)=>{
            return(
              <AdminButton text={it.subjectName} onClick={()=>handleOnClick(it.subjectId)} className="QuizSubjectItem"/>
            )
          })}
        </div>
    </div>
)
};
export default QuizSubjectList;
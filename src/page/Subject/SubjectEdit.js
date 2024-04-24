import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import AdminHeader from "../../components/AdminHeader";
import AdminButton from "../../components/AdminButton";

const SubjectEdit=()=>{
    const [data,setData]=useState({
        subjectId:"",
        subjectName:""
    });
    const {id}=useParams();
    const navigate=useNavigate();
    useEffect(() => {
        fetchuserData();
     }, []); //가져온 과목데이터 실행
    
     
       const fetchuserData = async () => {     
         try {
             const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/subject/view`);
             const userData = response.data.find(item => item.subjectId ==id);
             setData({
                subjectId:userData.subjectId,
                subjectName:userData.subjectName});
        
    
         }catch (error) {
        //  if(error.response.status===500){
         //  alert(error.response.data.message);
          }
         }  // api로 과목 정보 받아오는 함수

         const handleSubmit=()=>{
            axios.post(`${process.env.REACT_APP_API_URL}/admin/subject/update`,{
                subjectName:data.subjectName,
                subjectId:data.subjectId
            }).then(response => {        
                alert("과목이 수정되었습니다.");
                window.location.reload();
            })
            .catch(error => {
              /* if(error.response.status===500){
                 alert(error.response.data.message);
               }
              else if(error.response.status===401 || error.response.status===403){
                 alert(error.response.data.message);
                 sessionStorage.removeItem("token");
                 navigate("/admin/login");
                }*/
            });
            navigate("/admin/subject/view");
           }  // axios 이용하여 회차 생성처리하는 함수

         const handleChange = (event) => {
            const { name, value } = event.target;
            setData(prevState => ({
                ...prevState,
                [name]: value
            }));
        
        }; //정보 수정 입력하면 바뀌는 함수
 return(
    <div className="AdminEntire">
    <AdminHeader/>
    <div className="UserText">과목 수정</div>
    <input name="subjectName" className="RoundCreateBox" value={data.subjectName} onChange={handleChange} ></input>
    <div className="RoundCreateButtonList">
    <AdminButton text="취소" className="RoundCreateButton" onClick={()=>navigate(-1)}/>
    <AdminButton text="완료" className="RoundCreateButton" onClick={handleSubmit}/>
    </div></div>
 )
};
export default SubjectEdit;
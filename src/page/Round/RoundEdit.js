import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminHeader from "../../components/AdminHeader";
import AdminButton from "../../components/AdminButton";

const RoundEdit=()=>{
    const [data,setData]=useState({
        roundId:"",
        roundName:""
    });
    const {id}=useParams();
    const navigate=useNavigate();
    const token=sessionStorage.getItem("token")
    useEffect(() => {
        fetchroundData();
     }, []); //가져온 회차데이터 실행
    
     
       const fetchroundData = async () => {     
         try {
             const response = await axios.get(`/admin/round/listView` ,{
              headers:{
               'Authorization':token
             }
           })
             const roundData = response.data.round.find(item => item.roundId ==id);
             setData({
                roundId:roundData.roundId,
                roundName:roundData.roundName});
        
    
         }catch (error) {
          if(error.response.status===500){
          alert(error.response.data.message);
          }
          else if(error.response.status===401 || error.response.status===403){
            alert(error.response.data.message);
            sessionStorage.removeItem("token");
            navigate("/admin/login");
           }
         } } // api로 회차 정보 받아오는 함수

         const handleSubmit=async ()=>{
            axios.put(`/admin/round/update`,{
                roundName:data.roundName,
                roundId:data.roundId
            }, {
              headers:{
               'Authorization':token
             }
           }).then(response => {        
                alert("회차가 수정되었습니다.");
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
            navigate("/admin/round/view");

           }  // axios 이용하여 회차 수정처리하는 함수

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
    <div className="UserText">회차 수정</div>
    <input name="roundName" className="RoundCreateBox" value={data.roundName} onChange={handleChange} ></input>
    <div className="RoundCreateButtonList">
    <AdminButton text="취소" className="RoundCreateButton" onClick={()=>navigate(-1)}/>
    <AdminButton text="완료" className="RoundCreateButton" onClick={handleSubmit}/>
    </div></div>
 )
};
export default RoundEdit;
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import AdminHeader from "../../components/AdminHeader";
import AdminButton from "../../components/AdminButton";
const KeywordEdit=()=>{
    const [data,setData]=useState({
        keywordId:"",
        keywordName:"",
        keywordMean:"",
    });
    const {id}=useParams();
    const navigate=useNavigate();
    const token=sessionStorage.getItem("token")
    useEffect(() => {
        fetchkeywordData();
     }, []); //가져온 키워드데이터 실행
    
       const fetchkeywordData = async () => {     
         try {
             const response = await axios.get(`/admin/keyword/listView`, {
              headers:{
               'Authorization':token
             }
           })
             const keywordData = response.data.find(item => item.keywordId ==id);
             setData({
                keywordId:keywordData.keywordId,
                keywordName:keywordData.keywordName,
                keywordMean:keywordData.keywordMean});
        
    
         }catch (error) {
          if(error.response.status===500){
          alert(error.response.data.message);
          }
          else if(error.response.status===401 || error.response.status===403){
            alert(error.response.data.message);
            sessionStorage.removeItem("token");
            navigate("/admin/login");
           }
         } } // api로 키워드 정보 받아오는 함수

         const handleSubmit=async ()=>{
            axios.put(`/admin/keyword/update`,{
                keywordName:data.keywordName,
                keywordMean:data.keywordMean,
                keywordId:data.keywordId
            }, {
              headers:{
               'Authorization':token
             }
           }).then(response => {        
                alert("키워드가 수정되었습니다.");
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

           }  // axios 이용하여 키워드 수정처리하는 함수

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
    <div className="UserText">키워드 수정</div>
    <div className="KeywordBoxAll">
    <input name="keywordName" className="KeywordCreateBox1" value={data.keywordName} onChange={handleChange} ></input>
    <textarea name="keywordMean" className="KeywordCreateBox2" value={data.keywordMean} onChange={handleChange} /></div>
    <div className="KeywordCreateButtonList">
    <AdminButton text="취소" className="KeywordCreateButton" onClick={()=>navigate(-1)}/>
    <AdminButton text="완료" className="KeywordCreateButton" onClick={handleSubmit}/>
    </div></div>
 )
};
export default KeywordEdit;
import axios from "axios";
import { useEffect, useState } from "react";
import AdminHeader from "../../components/AdminHeader";
import AdminButton from "../../components/AdminButton";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
const KeywordView=()=>{
    const [data,setData]=useState([]);
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
           if(response)
             setData(response.data.keyword);
    
         }catch (error) {
          if(error.response.status===500){
           alert(error.response.data.message);
          }
          else if(error.response.status===401 || error.response.status===403){
            alert(error.response.data.message);
            sessionStorage.removeItem("token");
            navigate("/admin/login");
           }}
         }  // api로 키워드 정보 받아오는 함수
         const handleRemove=async(keywordId)=>{
            Swal.fire({
                title: '정말로 삭제하시겠습니까?',
                text: "이 작업은 되돌릴 수 없습니다!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '네, 삭제합니다!',
                cancelButtonText: '아니오, 취소합니다!'
            }).then((result) => { 
                if (result.isConfirmed) { //삭제하기 누르면
            
                  axios.delete(`/admin/keyword/delete`, {
                   
                    headers:{
                      'Authorization':token
                    },data:{keywordId:keywordId,
                    
                 }
               })
                 .then(response => {   //삭제성공   
                  Swal.fire(
                    '삭제 완료!',
                    '해당 항목이 성공적으로 삭제되었습니다.',
                    'success'
                );
                     window.location.reload();
                 })
                 .catch(error => {  //삭제 실패
                  if(error.response.status===404){
                    Swal.fire(
                      '삭제 실패!',
                      error.response.data.message,
                      'fail'
                  );
                  }
                  else if(error.response.status===500){
                    Swal.fire(
                      '삭제 실패!',
                      error.response.data.message,
                      'fail'
                  );
                  }
                  else if(error.response.status===401 || error.response.status===403){
                    sessionStorage.removeItem("token");
                   Swal.fire(
                    '삭제 실패!',
                    error.response.data.message,
                    'fail'
                ) ;
                 navigate('/admin/login')
                };
                     window.location.reload();
                 });
                }
            });  //삭제함수
        }
    return(
        <div className="AdminEntire">
            <AdminHeader/>
            <div className="UserText">키워드 조회</div>
            <div className="KeywordAll">
            <div className="KeywordMenuList">
            <div className="KeywordMenuItem1">ID</div>
            <div className="KeywordMenuItem2">키워드 이름</div> 
            <div className="KeywordMenuItem3">키워드 내용</div>
             <div className="KeywordMenuItem4">수정하기</div> <div className="KeywordMenuItem4">삭제하기</div>
            </div>
            {data&&data.map((it)=>{
                return(
                <div className="KeywordList">
                     <div className="KeywordItem1">{it.keywordId}</div>
                     <div className="KeywordItem2">{it.keywordName}</div>
                    <div className="KeywordItem3">{it.keywordMean}</div>
              <AdminButton text="수정하기" className="KeywordItem4" onClick={()=>navigate(`/admin/keyword/edit/${it.keywordId}`)}/>
              <AdminButton text="삭제하기" className="KeywordItem4" onClick={()=>handleRemove(it.keywordId)}/>
              </div>
                )
            })}
        </div>
        <AdminButton text="생성" className="KeywordCreate" onClick={()=>navigate("/admin/keyword/create")}/>
        </div>
    )

};
export default KeywordView;
import axios from "axios";
import { useEffect, useState } from "react";
import AdminHeader from "../../components/AdminHeader";
import AdminButton from "../../components/AdminButton";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
const RoundView=()=>{
const [data,setData]=useState([]);
const navigate=useNavigate();
useEffect(() => {
    fetchuserData();
 }, []); //가져온 회차데이터 실행

 
   const fetchuserData = async () => {     
     try {
         const response = await axios.get(`/admin/round/view`);
         setData(response.data);

     }catch (error) {
      if(error.response.status===500){
       alert(error.response.data.message);
      }
      else if(error.response.status===401 || error.response.status===403){
        alert(error.response.data.message);
        sessionStorage.removeItem("token");
        navigate("/admin/login");
       }}
     }  // api로 회차 정보 받아오는 함수
     const handleRemove=async(roundId)=>{
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
        
              axios.post(`/admin/round/delete`, {
                roundId:roundId,
                
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
        <div className="UserText">회차 조회</div>
        <div className="RoundAll">
        <div className="RoundMenuList">
        <div className="RoundMenuItem1">회차 이름</div> <div className="RoundMenuItem2">수정하기</div> <div className="RoundMenuItem2">삭제하기</div>
        </div>
        {data&&data.map((it)=>{
            return(
            <div className="RoundList">
          <div className="RoundItem1">{it.roundName}</div>
          <AdminButton text="수정하기" className="RoundItem2" onClick={()=>navigate(`/admin/round/edit/${it.roundId}`)}/>
          <AdminButton text="삭제하기" className="RoundItem2" onClick={()=>handleRemove(it.roundId)}/>
          </div>
            )
        })}
    </div>
    <AdminButton text="생성" className="RoundCreate" onClick={()=>navigate("/admin/round/create")}/>
    </div>
)
};
export default RoundView;
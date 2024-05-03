import { useEffect, useState } from "react";
import AdminHeader from "../../components/AdminHeader";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import AdminButton from "../../components/AdminButton";
import Swal from 'sweetalert2';
const UserView=()=>{
   const navigate=useNavigate();
    const [data,setData]=useState([]); // 전체 사용자 정보
    const token=sessionStorage.getItem("token")
    useEffect(() => {
      userData();

   }, []); // 사용자정보 가져오기 실행하는 함수


     const userData = async () => {
       
       try {

           const response = await axios.get(`/admin/users/listView`,{
           headers:{
              'Authorization':token
            }
           });
           setData(response.data.users);
           
       } catch (error) {
       if(error.response.status===500){
        alert(error.response.data.message);
       }
       else if(error.response.status===401 || error.response.status===403){
        alert(error.response.data.message);
        sessionStorage.removeItem("token");
        navigate("/admin/login");
       }
      }
   }; //api로 전체 사용자 정보 가져오는 함수

const handleDelete=async(userId)=>{
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

      axios.delete(`/admin/users/delete`, 
      {
        headers:{
          'Authorization':token
        },data:{
          userId:userId,
        },
         

      } )
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
});
};
 return(
    <div className="AdminEntire">
        <AdminHeader/>
        <div className="UserText">사용자 조회</div>
        <div className="UserAll">
        <div className="UserMenuList">
            <div className="UserMenuItem1">ID</div> <div className="UserMenuItem2">비밀번호</div>
             <div className="UserMenuItem3">닉네임</div> <div className="UserMenuItem4">이메일</div> 
             <div className="UserMenuItem5">식별코드</div> 
             <div className="UserMenuItem5">수정하기</div> <div className="UserMenuItem5">삭제하기</div>
        </div>
        <div>
        {data&&data.map((it)=>{
           return(
            <div className="UserList">
            <div className="UserItem1">{it.userId}</div>
            <div className="UserItem2">{it.passwd}</div>
            <div className="UserItem3">{it.userName}</div>
            <div className="UserItem4">{it.userEmail}</div>
            <div className="UserItem5">{it.is_admin}</div>
            <Link to={`/admin/user/edit/${it.userId}`} className="UserItem6">수정하기</Link>
            <AdminButton text="삭제하기" onClick={()=>handleDelete(it.userId)} className="UserItem6"/>
            </div>
           )
        })}
        </div>
        </div>
    </div>
 )
};
export default UserView;
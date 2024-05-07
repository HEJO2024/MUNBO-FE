import { useEffect, useState } from "react";
import AdminHeader from "../../components/AdminHeader";
import axios from "axios";
import AdminButton from "../../components/AdminButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
const QuizView=()=>{
    const [quiz,setQuiz]=useState([]);
    const navigate=useNavigate();
    const {id}=useParams();
    const token=sessionStorage.getItem("token")
    useEffect(() => {
        fetchquizData();
     }, []); //가져온 문제데이터 실행
  
     
       const fetchquizData = async () => {     
         try {
             const response = await axios.get(`/admin/quiz/listView?subjectId=${id}`, { 
              headers:{
               'Authorization':token
             }
            
           })
           if(response)
             setQuiz(response.data.quiz);

         }catch (error) {
          if(error.response.status===500){
          alert(error.response.data.message);
          }
          else if(error.response.status===401 || error.response.status===403){
            alert(error.response.data.message);
            sessionStorage.removeItem("token");
            navigate("/admin/login");
           }}
         }  // api로 문제 정보 받아오는 함수

         const handleDelete=async(quizId)=>{
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
        
              axios.delete(`/admin/quiz/delete`, {
                headers:{
                  'Authorization':token
                },data:{quizId:quizId,
                
             }, 
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
    <div className="UserText">기출문제 조회</div>
    <div className="QuizAll">
    <div className="QuizMenuList">
        <div className="QuizMenuItem1">ID</div> <div className="QuizMenuItem2">문제</div>   
         <div className="QuizMenuItem3">수정하기</div> <div className="QuizMenuItem3">삭제하기</div>
    </div>
    <div>
    {quiz&&quiz.map((it)=>{
       return(
        <div className="QuizList">         
        <div className="QuizItem1">{it.quizId}</div>
        <div className="QuizItem2">{it.quizContent}</div> 
        <div >{it.subjectId} </div>
        <Link to={`/admin/quiz/edit/${it.quizId}/${id}`} className="QuizItem3">수정하기</Link>
        <AdminButton text="삭제하기" onClick={()=>handleDelete(it.quizId)} className="QuizItem3"/>
        </div>
       )
    })}
    </div>
    </div>
</div>
  )
};
export default QuizView;
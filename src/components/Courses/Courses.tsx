import { Suspense, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './Courses.css';
import { coursesAPI } from "../../api/CoursesApi";
import Loading from "../Loading";
import Pagination from "../Pagination";

const Courses = () => {
    const {data: courses, isLoading, isError} = coursesAPI.useFetchAllCoursesQuery(5); 
    const {page} = useParams();
    let pageNumber = parseInt(page || "1");
    pageNumber = isNaN(pageNumber)?1:pageNumber;
    const navigate = useNavigate(); 

    useEffect(() => {
       isError && navigate('/error'); 
    },[isError]);

    return <main className="Courses">
        <h1 className="Courses-heading">Courses</h1>
            {courses && <Pagination page={pageNumber} courses={courses} />}
            {(isLoading && !isError) && <Loading />}
    </main>
}

export default Courses;
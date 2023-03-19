import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Pagination.css';
import { ICourse } from "../../store/typings/ICourse";
import CourseCard from "../CourseCard";
import arrowImg from "../../assets/imgs/arrow.png";
import dotsImg from "../../assets/imgs/more.png";
import CourseBtn from "../CourseBtn";

type Props = {
    page: number,
    courses: ICourse[]
}

const Pagination = ({page, courses}: Props) => {
    const [pages, setPages] = useState<number>(page-1);
    const limit = 10;
    const navigate = useNavigate(); 
    const limitedCourses = courses.slice(pages*limit, pages*limit+limit);
    const lastPage = Math.ceil((courses.length||0)/limit);

     useEffect(() => {
         if(courses && courses?.length>0) {
             if(pages>lastPage-1) {
                 setPages(lastPage-1);
                 navigate(`/${lastPage}`);
             }
             if(pages<0) {
                 setPages(0);
                 navigate(`/1`);
             }
         }
     }, [courses]);

    const prev = () => {
        let previosPage = (pages>0?pages - 1:pages);
        setPages(previosPage);
        navigate(`/${previosPage+1}`);
    }
    const next = () => {
        let nextPage = pages<lastPage-1?pages + 1:lastPage-1;
        setPages(nextPage);
        navigate(`/${nextPage+1}`);
    }

    const toPage = useCallback((e:any) => {
        let newPage = e.target.value;
        setPages(newPage-1);
        navigate(`/${newPage}`);
    }, []);

    return <>
        <div className="Pagination-list">
            {limitedCourses.map((el:ICourse)=><CourseCard key={el.id} {...el} />)}
        </div>
        <div className="Pagination-toolbar">
            <button className="Pagination-btn-prev" type="button" onClick={prev}>
                <img src={arrowImg} alt="arrow icon" />
            </button>
            {lastPage-(pages+1) <= 1 && pages > 1? 
                <>
                    <CourseBtn page={pages-1} toPage={toPage} />
                    <CourseBtn page={pages} toPage={toPage} />
                </>:
                (lastPage-(pages+1) == 1 && pages > 0) && <CourseBtn page={pages} toPage={toPage} />
            }
            <button type="button" className="Pagination-btn active" value={pages+1} onClick={toPage}>{pages+1}</button>
            {   lastPage-(pages+1)>2?
                <>
                    <img className="Pagination-more" src={dotsImg} alt="more courses" />
                    <CourseBtn page={lastPage} toPage={toPage} />
                </>: lastPage-(pages+1)>1?
                <>
                    <CourseBtn page={pages+2} toPage={toPage} />
                    <CourseBtn page={lastPage} toPage={toPage} />
                </>: (lastPage-(pages+1) == 1) && <CourseBtn page={lastPage} toPage={toPage} />
            }
            <button type="button" className="Pagination-btn-next" onClick={next}>
                <img src={arrowImg} alt="arrow icon" />
            </button>
        </div>
    </>
}

export default Pagination;


import { RefObject, useEffect, useRef, useState } from "react";
import ReactHlsPlayer from "react-hls-player";
import { useNavigate, useParams } from "react-router-dom";
import { coursesAPI } from "../../api/CoursesApi";
import Loading from "../Loading";
import "./Course.css";

const Course = () => {
    const { id } = useParams();
    const [videoNum, setVideoNum] = useState(0);
    const [speed, setSpeed] = useState(1);
    const playerRef = useRef<HTMLVideoElement>();
    const {data, error, isLoading, isError} = coursesAPI.useFetchCourseQuery((id as string)); 
    const navigate = useNavigate(); 
    
    useEffect(() => {
        isError && navigate('/error'); 
    },[isError]);

    if(isLoading && !isError) return <Loading />;

    if(!data) return null;

    const {previewImageLink, title, description, lessons } = data;

    let sortedLesson = [...lessons].sort((lesson1, lesson2)=>lesson1.order>lesson2.order?1:-1);
    const changeVideo = (index: number) => {
        if(lessons[index].status !== "locked") {
            setVideoNum(index);
        }
    }
    const setPlayBack = () => {
        if(playerRef.current)
        playerRef.current.playbackRate = 2;
      };

    return <div className="Course">
        <ReactHlsPlayer
            playerRef={playerRef as RefObject<HTMLVideoElement>}
            className="Course-video"
            src={lessons[videoNum].link}
            autoPlay={false}
            controls={true}
            width="100%"
            height="auto"
            poster={`${previewImageLink}/cover.webp`}
            onCanPlay={() => setPlayBack()}
        />
        <h1 className="Course-title">{title}</h1>
        <h3 className="Course-desc-title">Lesson {lessons[videoNum].order}:  {lessons[videoNum].title}</h3>
        <h4 className="Course-desc-title">Description</h4>
        <p className="Course-desc">{description}</p>
        <div className="Course-lessons">{
            sortedLesson.map(({id, title, previewImageLink, order, status}, index)=>
            (<div key={id} className="Course-lesson" onClick={()=>changeVideo(index)}>
                <div className={`Course-overflow ${status}`}></div>
                <div className="Course-lesson-img-wrapper">
                    <img className="Course-lesson-img" src={previewImageLink+'/lesson-' + order + '.webp'} alt={title} />
                </div>
                <p className="Course-lesson-title">{title}</p>
            </div>))
        }</div>
    </div>
}

export default Course;
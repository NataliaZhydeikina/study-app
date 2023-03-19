import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import ReactHlsPlayer from "react-hls-player";
import { useNavigate, useParams } from "react-router-dom";
import { coursesAPI } from "../../api/CoursesApi";
import Loading from "../Loading";
import "./Course.css";
import { mergeDeep } from "../../utils/mergeDeep";

const Course = () => {
    let { courseId } = useParams();
    const [videoNum, setVideoNum] = useState(0);
    const [speed, setSpeed] = useState(1);
    const playerRef = useRef<HTMLVideoElement>();
    const {data, error, isLoading, isError} = coursesAPI.useFetchCourseQuery((courseId as string)); 
    const navigate = useNavigate(); 
    
    useEffect(() => {
        isError && navigate('/error'); 
    },[isError]);

    function getTime() {
        let videoTime = JSON.parse(localStorage.getItem("videoTime")||"{}");
        if(!videoTime[id] || !videoTime[id][lessons[videoNum].order]) return 0;
        return videoTime[id][lessons[videoNum].order];
    }  

    useEffect(() => {  
        playerRef.current?.addEventListener('ended', setVideoTime);
        return playerRef.current?.removeEventListener('ended', setVideoTime);
    }, []);
    
    if(isLoading && !isError) return <Loading />;

    if(!data) return null;

    const {previewImageLink, title, description, lessons, id } = data;

    function setVideoTime() {
        let newVideoTime = mergeDeep(
            (JSON.parse(localStorage.getItem("videoTime")||"{}")), 
            {[id]:{[lessons[videoNum].order]:playerRef.current?.currentTime}}
        );
        localStorage.setItem("videoTime", JSON.stringify(newVideoTime));
    }

    const setPlayBack = () => {
        playerRef.current!.playbackRate = speed;
    }
    function speedUp() {
        let currentSpeed =  speed+0.25;
        setSpeed(currentSpeed);
    }

    function slowDown() {
        let currentSpeed =  speed-0.25;
        setSpeed(currentSpeed);
    }

    let sortedLesson = [...lessons].sort((lesson1, lesson2)=>lesson1.order>lesson2.order?1:-1);
    const changeVideo = (index: number) => {
        if(lessons[index].status !== "locked") {
            setVideoNum(index);
        }
    }

    return <div className="Course">
        <ReactHlsPlayer
            playerRef={playerRef as RefObject<HTMLVideoElement>}
            className="Course-video"
            src={lessons[videoNum].link}
            autoPlay={false}
            controls={true}
            width="auto"
            height="100%"
            poster={`${previewImageLink}/cover.webp`}
            onPause={() => setVideoTime()}
            onCanPlay={() => setPlayBack()}
            hlsConfig={{
                startPosition: getTime()
            }}
        />
        <div className="Course-speed">
            <button onClick={slowDown} className="Course-speed-btn" type="button">-</button>
            {speed}
            <button onClick={speedUp} className="Course-speed-btn" type="button">+</button>
        </div>
        <h1 className="Course-title">{title}</h1>
        <h3 className="Course-desc-title">Lesson {lessons[videoNum].order}:  {lessons[videoNum].title}</h3>
        <p className="Course-desc">{description}</p>
        <div className="Course-lessons">{
            sortedLesson.map(({previewImageLink, status, id, order, title}, index)=>
            (<div key={id} className={`Course-lesson ${(order-1 === videoNum) && 'active'}`} onClick={()=>changeVideo(index)}>
                <div className={`Course-overflow ${status}`}></div>
                <div className="Course-lesson-img-wrapper">
                    <img className="Course-lesson-img" src={`${previewImageLink}/lesson-${order}.webp`} alt={title} />
                </div>
                <p className="Course-lesson-title">{title}</p>
            </div>))
        }</div>
    </div>
}

export default Course;
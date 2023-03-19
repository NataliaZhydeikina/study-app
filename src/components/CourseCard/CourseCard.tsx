import './CourseCard.css';
import { NavLink } from "react-router-dom";
import { ICourse } from "../../store/typings/ICourse";
import studyImg from "../../assets/imgs/mortarboard.png";

const CourseCard = ({
        id,
        title, 
        tags, 
        description, 
        duration, 
        lessonsCount, 
        containsLockedLessons, 
        previewImageLink, 
        rating,
        meta
    }: ICourse) => {
    return <article className="CourseCard">
        <NavLink to={`/courses/${id}`}>
            <div className="CourseCard-container-img">
                <img className="CourseCard-img" src={previewImageLink+'/cover.webp'} alt={title} />
            </div>
            <div className="CourseCard-tags">{
                tags.map(tag=>
                    (<span className="CourseCard-tag" key={tag}>{tag}</span>)
                )
            }</div>
            <div className="CourseCard-container">
                <h3 className="CourseCard-title">{title}</h3> 
                <p className="CourseCard-time">
                    <img className="CourseCard-time-img" src={studyImg} alt="lessons icon" />
                    {lessonsCount} lessons/{duration}h
                </p>
                <p className="CourseCard-desc">{description}</p>
                 <div className="CourseCard-skills">{
                    meta.skills && meta.skills.map(skill=>
                        (<span className="CourseCard-skill" key={skill}>{skill}</span>)
                    )
                }</div>
            </div>
            <div className="CourseCard-rating">{rating}</div>
        </NavLink>
    </article>
}

export default CourseCard;
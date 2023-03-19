import loadingImg from "../../assets/imgs/work-in-progress.png";
import "./Loading.css";

const Loading = () => {
    return <div className="Loading">
        <div className="Loading-ring">
            <img className="Loading-img" src={loadingImg} alt="" />
            <span></span>
        </div>
    </div>
}
export default Loading;
import { useRouteError } from "react-router-dom";
import notFoundImg from "../../assets/imgs/not found.jpg";
import './NotFound.css';

const NotFound = () => {
    const error:any = useRouteError();
    
    return <div className="NotFound">
        <div>
            <h1 className="NotFound-heading">Ooops!</h1>
            <h2 className="NotFound-heading small">Bad request</h2>
            <p className="NotFound-text">{error && (error.statusText || error.message) || "Try again later..."}</p>
        </div>
        <img className="NotFound-img" src={notFoundImg} alt="" />
    </div>
}

export default NotFound;
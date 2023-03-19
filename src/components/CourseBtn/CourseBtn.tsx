import './CourseBtn.css';

type Props = {
    page: number,
    toPage: (e:any) => void
}

const CourseBtn = ({page, toPage}: Props) => {
    return <button type="button" className="CourseBtn" value={page} onClick={toPage}>{page}</button>
}

export default CourseBtn;
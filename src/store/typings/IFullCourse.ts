import { ICourse } from "./ICourse";

export interface ILesson {
    id: string;
    title: string;
    duration: number;
    order: number;
    type: string;
    status: string;
    link: string;
    previewImageLink: string;
}

export interface IFullCourse extends ICourse {
    lessons: ILesson[],
    mata: {
        slug: string;
        skills: string[];
        courseVideoPreview: {
            link: string;
            duration: number;
            previewImageLink: string;
        }
    };
}
export interface ICourse {
    containsLockedLessons: boolean;
    description: string;
    duration: number;
    id: number;
    launchDate: string;
    lessonsCount: number;
    meta: {
        courseVideoPreview: {
            duration: number;
            link: string;
            previewImageLink: string;
        }
        skills: string[];
        slug: string;
    }
    previewImageLink: string;
    rating: number;
    status: string;
    tags: string[];
    title: string;
}
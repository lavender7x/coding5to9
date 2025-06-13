export interface Post {
    id: string;
    title: string;
    teaser: string;
    tags: string[];
    publishedDate: string;
    lastModifiedDate: string;
    content?: string;
}

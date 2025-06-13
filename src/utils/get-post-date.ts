import { Post } from "./post";

export const getPostDate = (post: Post): Date => new Date(post.lastModifiedDate?.split(' ')[0]
    || post.publishedDate?.split(' ')[0]
    || new Date().toISOString().split('T')[0]);

export function formatDate(date: string) {
    const tokens = (date || '').split(' ');
    const currentDate = new Date(tokens[0]);
    const year = currentDate.getFullYear().toString().padStart(4, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

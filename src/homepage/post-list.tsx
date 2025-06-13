import React from 'react';
import { getPosts } from '../server/service';
import { formatDate, getPostDate } from '../utils/get-post-date';
import { Post } from '../utils/post';

export function PostList(): JSX.Element {
    const sortedPosts = getPosts().sort((a, b) => getPostDate(b).getTime() - getPostDate(a).getTime());

    function renderPostItem(post: Post): JSX.Element {
        return (
            <div className="post-item">
                <div className="post-title">
                    <a href={`/${post.id}`}>{post.title}</a>
                </div>
                <div className="post-meta">
                    Published on {formatDate(post.publishedDate)}
                    {post.lastModifiedDate && `, last modified on ${formatDate(post.lastModifiedDate)}`}
                </div>
                <div>
                    {post.teaser}
                </div>
            </div>
        )
    }
    
    return (
        <React.Fragment>
            <div className="hello">
                Just some random posts.
            </div>

            <div className="post-items">
                {sortedPosts.map(post => renderPostItem(post))}
            </div>
        </React.Fragment>
    )
}

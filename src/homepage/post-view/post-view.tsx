import React from 'react';
import './post-view.scss';
import type { Post } from '../../utils/post';
import { Toc } from './toc';

interface PostViewProps {
    post: Post;
}

export function PostView({ post }: PostViewProps): JSX.Element {
    return (
        <div className="post-view">
            <div className="post-header">
                <h1>
                    {post.title}
                </h1>
            </div>

            <div className="post-wrapper">
                <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content ?? '' }} />
                <div className="post-toc">
                    <Toc content={post.content} />
                </div>
            </div>

        </div>
    );
};

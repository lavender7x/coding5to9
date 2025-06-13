import React from 'react';
import { Post } from '../utils/post';
import './app.scss';
import { PostList } from './post-list';
import { PostView } from './post-view/post-view';

interface AppProps {
    post?: Post;
}

export const App = ({ post }: AppProps) => {
    return (
        <div>
            <div className="header-wrapper">
                <div className="header">
                    <div className="logo">
                        coding5to9
                    </div>

                    <div className="home-button">
                        <a href="/">Home</a>
                    </div>
                </div>
            </div>

            {post ? <PostView post={post} /> : <PostList />}
        </div>
    )
}

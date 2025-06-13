import React from 'react';
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import { renderToStaticMarkup } from 'react-dom/server';
import { App } from '../homepage/app';
import { getConfig } from './config';
import { logRequest } from './middlewares/log.middleware';
import { getPageTemplate, getPosts } from './service';
import { addSitemap } from './sitemap';

const config = getConfig();

const app = express();

app.use(helmet());
app.use(logRequest);

addSitemap(app);

app.use('/static', express.static(path.join(__dirname, '../static')));

app.get('/rebuild-cache', (req, res) => {
    const secret = process.env.BLOG_SECRET

    if (req.headers['x-secret'] !== secret) {
        res.sendStatus(404);
        return;
    }

    getPosts(true);

    res.sendStatus(200);
});

app.get('/:postId', (req, res) => {
    if (!req.params.postId) {
        res.sendStatus(404);
        return;
    }

    const post = getPosts().find(post => post.id === req.params.postId);

    if (!post) {
        res.sendStatus(404);
        return;
    }

    let headerTitle = 'a programming blog';
    let metaTemplate = 'coding5to9.com - a blog about various programming stuff';

    if (post.teaser) {
        metaTemplate = post.teaser;
    }
    if (post.title) {
        headerTitle = post.title;
    }

    res.send(
        getPageTemplate()
            .replace('{{title}}', headerTitle)
            .replace('{{meta}}', metaTemplate)
            .replace('{{content}}',
                renderToStaticMarkup(
                    <App post={post} />
                )
            )
    );
});

// attachments
app.get('/:postId/*', (req, res) => {
    if (!req.params.postId) {
        res.sendStatus(404);
        return;
    }

    const post = getPosts().find(post => post.id === req.params.postId);
    if (!post) {
        res.sendStatus(404);
        return;
    }

    const file = (req.params as any)[0];

    res.sendFile(
        file,
        {
            root: path.resolve(`${config.contentDir}/${req.params.postId}`)
        }
    )
});

app.get('/', (req, res) => {
    let headerTitle = 'a programming blog';
    let metaTemplate = 'coding5to9.com - a blog about various programming stuff';

    res.send(
        getPageTemplate()
            .replace('{{title}}', headerTitle)
            .replace('{{meta}}', metaTemplate)
            .replace('{{content}}',
                renderToStaticMarkup(
                    <App />
                )
            )
    );
});

app.use(function (err: any, req: any, res: any, next: any) {
    console.log(err);
    res.sendStatus(500);
})

app.listen(8080, () => {
    console.log('app listening on port 8080 in development mode');
});
import { getPostDate } from "../utils/get-post-date";
import { getPosts } from "./service";
import { Express } from 'express';

export function addSitemap(app: Express) {
    app.get('/robots.txt', (req, res) => {
        res.setHeader('content-type', 'text/plain; charset=utf-8');
        res.send(`User-agent: *
Allow: /`);
    })

    app.get('/sitemap.xml', (req, res) => {
        const sortedPosts = getPosts().sort((a, b) => getPostDate(b).getTime() - getPostDate(a).getTime());
        const response = [`<?xml version="1.0" encoding="UTF-8"?>`,
            `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`]
        for (const post of sortedPosts) {
            response.push(`<url>`)
            response.push(`<loc>https://coding5to9.com/${post.id}</loc>`);
            response.push(`<lastmod>${post.lastModifiedDate.split(' ')[0]}</lastmod>`);
            response.push(`</url>`)
        }
        response.push(`</urlset>`);

        res.setHeader('content-type', 'text/xml')
        res.send(response.join('\n'));
    });
}
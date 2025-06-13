import fs from 'fs';
import { Post } from "../utils/post";

import showdown from 'showdown';
import { getConfig } from "./config";

let posts: Post[] = [];

export function getPosts(forceRebuild = false): Post[] {
    if (posts.length > 0 && !forceRebuild) {
        return posts;
    }

    posts = [];

    const contenDir = getConfig().contentDir;
    for (const file of fs.readdirSync(contenDir)) {
        if (fs.lstatSync(`${contenDir}/${file}`).isFile()) {
            continue;
        }

        const postFile = fs.readdirSync(`${contenDir}/${file}`)
            .find(f => fs.lstatSync(`${contenDir}/${file}/${f}`).isFile() && f.endsWith('.md'));
        if (!postFile) {
            continue;
        }

        const markdownContent = fs.readFileSync(`${contenDir}/${file}/${postFile}`).toString();
        posts.push(createPost(markdownContent));
    }

    return posts;
}

export function getPageTemplate() {
    return fs.readFileSync(`./templates/page.template.html`).toString();
}

function createPost(markdownContent: string): Post {
    const converter = new showdown.Converter({ metadata: true });
    const html = converter.makeHtml(markdownContent);

    const { id, title, lastModifiedDate, publishedDate, teaser } = converter.getMetadata() as any;

    return {
        id,
        lastModifiedDate,
        publishedDate,
        teaser,
        tags: [],
        title,
        content: formatContent(id, html),
    };
};

function formatContent(id: string, content: string): string {
    return content.replace(/<pre><code(?:\s+class="([^"]*)")?>([\s\S]*?)<\/code><\/pre>/g, injectCodeBlock)
        .replace(/src="\./g, `src="/${id}`)
        .replace(/href="\./g, `src="/${id}`);
}

function injectCodeBlock(_: any, language: string, code: string): string {
    return fs.readFileSync('./templates/code-block.template.html')
        .toString()
        .replace('{{language}}', language)
        .replace('{{code}}', code);
};


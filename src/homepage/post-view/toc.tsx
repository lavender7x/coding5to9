import React from 'react';

interface TocProps {
    content: string | undefined;
}

interface TocElement {
    title: string;
    id: string;
    level: number;
    parent?: TocElement;
    children: TocElement[];
}

const addTocElement = (tocElement: TocElement) => {
    return (
        <ul>
            {tocElement.children.map(child => {
                return <li>
                    <a className="anchor" href={`#${child.id}`}>{child.title}</a>
                    {child.children.length > 0 ? addTocElement(child) : <></>}
                </li>
            })}
        </ul>
    );
};

export function Toc({ content }: TocProps) {
    const root: TocElement = {
        title: 'Root',
        id: '',
        children: [],
        level: 1,
    }

    if (!content) {
        return <></>;
    }

    const headers = Array.from(content?.matchAll(/<h([0-9]) id="([^\"]+)">([^<]+)<\/h[0-9]>/g) || []);

    if (headers.length === 0) {
        return <></>;
    }

    let previousElement: TocElement | undefined;
    headers.forEach(header => {
        const id = header[2];
        const title = header[3];
        const level = Number(header[1]);

        const element: TocElement = { title, id, level, children: [], parent: root };

        if (!previousElement) {
            element.parent = root;
            root.children.push(element);
            previousElement = element;
            return;
        }

        if (previousElement.level === level) {
            element.parent = previousElement.parent;
            previousElement.parent?.children.push(element);
            previousElement = element;
        } else if (previousElement.level > level) {
            // h3 -> h2
            let diff = previousElement.level - level;
            let parent = previousElement.parent;
            while (diff > 0) {
                parent = parent?.parent;
                diff--;
            }
            if (parent) {
                element.parent = parent;
                parent.children.push(element);
                previousElement = element;
            }
        } else if (previousElement.level < level) {
            if (level - previousElement.level === 1) {
                // h2 -> h3
                element.parent = previousElement
                previousElement.children.push(element);
                previousElement = element;
            }
        }
    });

    return (
        <div>
            <b>Table of contents</b>
            <div>
                {addTocElement(root)}
            </div>
        </div>
    )
};

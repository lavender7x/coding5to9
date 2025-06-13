window.addEventListener('click', e => {
    if ((e.target as HTMLElement)?.classList?.contains('copy-button-icon')) {
        e.preventDefault(); e.stopPropagation(); const code = (e.target as HTMLElement)?.closest('.code-block')?.querySelector('.edit');
        code && navigator.clipboard.writeText(code.textContent || '');
    }
});

window.addEventListener('scroll', () => {
    const headers = Array.from(document.querySelectorAll('h1, h2, h3, h4') || []);

    let minY = 9999;
    let minElement = undefined;
    for (const header of headers) {
        const dim = header.getBoundingClientRect();
        if (minY > dim.top && dim.top > 0) {
            minY = dim.top;
            minElement = header;
        }
    }

    const anchors = Array.from(document.querySelectorAll('.anchor'));
    for (const anchor of anchors) {
        anchor.classList.remove('anchor-selected');
    }

    if (minElement) {
        const index = headers.indexOf(minElement);
        if (minElement.getBoundingClientRect().top > 200 && index > 0) {
            minElement = headers[index - 1];
        }
    }

    if (minElement) {
        const a = document.querySelector(`[href="#${minElement.id}"]`);
        if (a) {
            a.classList.add('anchor-selected');
        }
    }
});


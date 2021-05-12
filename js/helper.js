export const setAttributes = (el, attrs) => {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

export const isDarkTheme = () => {
    const body = document.body;
    return body.classList.contains('dark-mode');
}

export const isDetailsPageOpen = () => {
    const detailsContainer = document.querySelector('.details');
    return detailsContainer.classList.contains('details-open');
}

export const shouldDisplayBorderNames = borders => {
    return Array.isArray(borders) && borders.length;
}

export const lazyLoad = target => {
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {
                let url = entry.target.getAttribute('data-src');
                entry.target.setAttribute('src', `${url}`);
                console.log(entry.target);
                observer.disconnect();
            }
        })
    });

    io.observe(target);
}
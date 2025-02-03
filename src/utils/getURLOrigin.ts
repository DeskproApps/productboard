type url = string | null | undefined;

function getURLOrigin(url: url): void | string {
    if (!url) return;

    const { origin } = new URL(url);

    return origin;
};

export default getURLOrigin;
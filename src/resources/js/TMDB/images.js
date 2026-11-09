const IMAGE_BASE = "https://image.tmdb.org/t/p";

// TMDB serves several pre-sized renditions; "original" can be several MB.
export function tmdbImage(path, size = "w780") {
    return path ? `${IMAGE_BASE}/${size}${path}` : null;
}

// Featured (portrait) rows prefer the poster, everything else the backdrop.
export function pickImagePath(item, featured = false) {
    return featured
        ? item.poster_path ?? item.backdrop_path ?? null
        : item.backdrop_path ?? item.poster_path ?? null;
}

// Movies use `title`, TV shows use `name`.
export function getTitle(item) {
    return item.title ?? item.name ?? "";
}

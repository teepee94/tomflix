import React, { useMemo } from "react";
import ListingItem from "./ListingItem";
import useTmdb from "../../hooks/useTmdb";
import { getTitle, pickImagePath } from "../../resources/js/TMDB/images";

const MAX_ITEMS = 10;

function getTmdbUrl(item) {
    // Trending results include media_type; other endpoints are inferred from
    // the field TMDB uses for the title (movies: `title`, TV: `name`).
    const mediaType = item.media_type ?? (item.title ? "movie" : "tv");
    return `https://www.themoviedb.org/${mediaType}/${item.id}`;
}

function Listing({ endpoint, header, featured = false, className = "" }) {
    const { data, loading, error } = useTmdb(endpoint);

    const items = useMemo(
        () =>
            (data ?? [])
                .map((item) => ({ item, imagePath: pickImagePath(item, featured) }))
                .filter(({ imagePath }) => imagePath)
                .slice(0, MAX_ITEMS),
        [data, featured]
    );

    return (
        <section className={`c-listing ${className}`} aria-busy={loading}>
            <div className="container-fluid">
                {header && (
                    <div className="row">
                        <div className="c-listing__header">
                            <h2 className="c-listing__header-title">{header}</h2>
                        </div>
                    </div>
                )}
                <div className="row">
                    {error ? (
                        <p className="c-listing__error" role="status">
                            Sorry, we couldn't load this row right now.
                        </p>
                    ) : (
                        items.map(({ item, imagePath }, index) => (
                            <ListingItem
                                key={item.id}
                                title={getTitle(item)}
                                image={imagePath}
                                href={getTmdbUrl(item)}
                                number={index + 1}
                                featured={featured}
                            />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

export default Listing;

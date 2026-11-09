import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Masthead from "../../components/Masthead";
import Listing from "../../components/Listing";
import requests from "../../../resources/js/TMDB/Requests";
import useTmdb from "../../../hooks/useTmdb";
import { getTitle } from "../../../resources/js/TMDB/images";

const LISTINGS = [
    { endpoint: requests.topRated, header: "Top 10 Films in the UK Today", featured: true },
    { endpoint: requests.netflixOriginals, header: "Netflix Originals" },
    { endpoint: requests.trending, header: "Currently Trending" },
    { endpoint: requests.actionMovies, header: "Action Movies" },
    { endpoint: requests.comedyMovies, header: "Comedies" },
    { endpoint: requests.documentaries, header: "Documentaries" },
    { endpoint: requests.romanceMovies, header: "Romance" },
];

function TemplateHomepage() {
    // Same endpoint as the "Netflix Originals" row; useTmdb shares the request.
    const { data: originals } = useTmdb(requests.netflixOriginals);

    // Pick one random title per data load (not per render).
    const featured = useMemo(() => {
        const candidates = (originals ?? []).filter((item) => item.backdrop_path);
        if (candidates.length === 0) return null;
        return candidates[Math.floor(Math.random() * candidates.length)];
    }, [originals]);

    return (
        <>
            <Helmet>
                <title>Tommy Parkinson | Netflix Clone</title>
            </Helmet>
            <Navbar />
            <main id="main-content">
                <article>
                    <Masthead
                        title={featured ? getTitle(featured) : undefined}
                        image={featured?.backdrop_path}
                        summary={featured?.overview}
                    />
                    {LISTINGS.map(({ endpoint, header, featured: isFeatured }) => (
                        <Listing
                            key={endpoint}
                            endpoint={endpoint}
                            header={header}
                            featured={isFeatured}
                            className={isFeatured ? "c-listing--featured" : ""}
                        />
                    ))}
                </article>
            </main>
            <Footer />
        </>
    );
}

export default TemplateHomepage;

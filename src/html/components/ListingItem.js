import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { tmdbImage } from "../../resources/js/TMDB/images";

gsap.registerPlugin(ScrollTrigger);

function ListingItem({ title, image, href, number, featured = false, className = "" }) {
    const mediaRef = useRef(null);

    // One ScrollTrigger per item, attached to this item's own element and
    // killed on unmount.
    useEffect(() => {
        const trigger = ScrollTrigger.create({
            trigger: mediaRef.current,
            toggleClass: "is-visible",
        });

        return () => trigger.kill();
    }, []);

    return (
        <div className={`c-listing__item ${className}`}>
            <a href={href} className="c-listing__item-link" target="_blank" rel="noopener noreferrer">
                <div className="c-listing__item-media-container">
                    {featured && (
                        <img
                            className="c-listing__item-number"
                            src={`/resources/images/listing-featured-${number}.svg`}
                            alt=""
                        />
                    )}
                    <div className="c-listing__item-media-container js-media-visibility" ref={mediaRef}>
                        <picture className="c-listing__item-media-wrapper">
                            <img
                                src={tmdbImage(image, featured ? "w342" : "w780")}
                                className="c-listing__item-media"
                                alt=""
                                loading="lazy"
                                decoding="async"
                            />
                        </picture>
                    </div>
                </div>
                <h3 className="c-listing__item-title">{title}</h3>
            </a>
        </div>
    );
}

export default ListingItem;

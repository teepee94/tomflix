import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { tmdbImage } from "../../resources/js/TMDB/images";

gsap.registerPlugin(ScrollTrigger);

function Masthead({ title, summary, image, className = "" }) {
    const mastheadRef = useRef(null);

    // Parallax: scoped to this component via gsap.context so every tween and
    // ScrollTrigger is reverted on unmount (and on StrictMode's dev re-run).
    // Re-runs once the content has loaded so the measured height is correct.
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: mastheadRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });

            gsap.utils.toArray(".parallax").forEach((layer) => {
                const depth = Number(layer.dataset.depth) || 0;
                tl.to(layer, { y: layer.offsetHeight * depth, ease: "none" }, 0);
            });
        }, mastheadRef);

        return () => ctx.revert();
    }, [title]);

    const imageSrc = tmdbImage(image, "w1280");

    return (
        <div className={`c-masthead ${className}`} ref={mastheadRef} aria-busy={!title}>
            <div className="container-fluid">
                <div className="row">
                    <div className="c-masthead__container parallax" data-depth="0.2">
                        {title && <h1 className="c-masthead__title">{title}</h1>}
                        {summary && <p className="c-masthead__summary">{summary}</p>}
                        {title && (
                            <div className="c-masthead__btn-container">
                                <button type="button" className="c-masthead__btn c-btn">Play</button>
                                <button type="button" className="c-masthead__btn c-btn c-btn--grey">More Info</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="c-masthead__media-container">
                {imageSrc && (
                    <picture className="c-masthead__media-wrapper">
                        <img src={imageSrc} className="c-masthead__media" alt="" fetchpriority="high" />
                    </picture>
                )}
            </div>
        </div>
    );
}

export default Masthead;

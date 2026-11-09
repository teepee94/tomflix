import { render, screen } from "@testing-library/react";
import Listing from "../Listing";
import useTmdb from "../../../hooks/useTmdb";
import { getTitle, pickImagePath } from "../../../resources/js/TMDB/images";
import { ScrollTrigger } from "gsap/ScrollTrigger";

jest.mock("../../../hooks/useTmdb");
jest.mock("gsap", () => ({ __esModule: true, default: { registerPlugin: jest.fn() } }));
jest.mock("gsap/ScrollTrigger", () => ({
    ScrollTrigger: { create: jest.fn() },
}));

// CRA's Jest config resets mock implementations before every test.
beforeEach(() => {
    ScrollTrigger.create.mockImplementation(() => ({ kill: jest.fn() }));
});

const movie = { id: 1, title: "A Film", backdrop_path: "/film-backdrop.jpg", poster_path: "/film-poster.jpg" };
const show = { id: 2, name: "A Show", backdrop_path: null, poster_path: "/show-poster.jpg" };
const noImage = { id: 3, title: "No Image", backdrop_path: null, poster_path: null };

describe("helpers", () => {
    test("getTitle falls back from movie title to TV name", () => {
        expect(getTitle(movie)).toBe("A Film");
        expect(getTitle(show)).toBe("A Show");
    });

    test("pickImagePath prefers posters for featured rows and backdrops otherwise", () => {
        expect(pickImagePath(movie, true)).toBe("/film-poster.jpg");
        expect(pickImagePath(movie, false)).toBe("/film-backdrop.jpg");
        expect(pickImagePath(show, false)).toBe("/show-poster.jpg");
        expect(pickImagePath(noImage, false)).toBeNull();
    });
});

test("renders movie and TV titles and skips items without an image", () => {
    useTmdb.mockReturnValue({ data: [movie, show, noImage], loading: false, error: null });

    render(<Listing endpoint="/x" header="Row" />);

    expect(screen.getByRole("heading", { name: "Row" })).toBeInTheDocument();
    expect(screen.getByText("A Film")).toBeInTheDocument();
    expect(screen.getByText("A Show")).toBeInTheDocument();
    expect(screen.queryByText("No Image")).not.toBeInTheDocument();
    expect(screen.getByText("A Film").closest("a")).toHaveAttribute("href", "https://www.themoviedb.org/movie/1");
    expect(screen.getByText("A Show").closest("a")).toHaveAttribute("href", "https://www.themoviedb.org/tv/2");
});

test("shows an error message when the request fails", () => {
    useTmdb.mockReturnValue({ data: null, loading: false, error: new Error("nope") });

    render(<Listing endpoint="/x" header="Row" />);

    expect(screen.getByRole("status")).toHaveTextContent("couldn't load this row");
});

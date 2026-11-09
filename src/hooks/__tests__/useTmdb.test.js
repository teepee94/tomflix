import { act, renderHook, waitFor } from "@testing-library/react";
import useTmdb, { clearTmdbCache } from "../useTmdb";
import tmdb from "../../resources/js/TMDB/Axios";

jest.mock("../../resources/js/TMDB/Axios", () => ({
    __esModule: true,
    default: { get: jest.fn() },
}));

const results = [{ id: 1, title: "Film" }];

beforeEach(() => {
    clearTmdbCache();
    tmdb.get.mockReset();
});

test("returns results once loaded", async () => {
    tmdb.get.mockResolvedValue({ data: { results } });

    const { result } = renderHook(() => useTmdb("/movie/top_rated"));
    expect(result.current).toEqual({ data: null, loading: true, error: null });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current).toEqual({ data: results, loading: false, error: null });
});

test("shares one request between components using the same endpoint", async () => {
    tmdb.get.mockResolvedValue({ data: { results } });

    const a = renderHook(() => useTmdb("/discover/tv"));
    const b = renderHook(() => useTmdb("/discover/tv"));

    await waitFor(() => expect(a.result.current.data).toEqual(results));
    await waitFor(() => expect(b.result.current.data).toEqual(results));
    expect(tmdb.get).toHaveBeenCalledTimes(1);

    // A later mount is served from the cache synchronously.
    const c = renderHook(() => useTmdb("/discover/tv"));
    expect(c.result.current).toEqual({ data: results, loading: false, error: null });
    expect(tmdb.get).toHaveBeenCalledTimes(1);
});

test("exposes errors and allows a retry on the next mount", async () => {
    const failure = new Error("Network down");
    tmdb.get.mockRejectedValueOnce(failure);

    const first = renderHook(() => useTmdb("/trending/all/week"));
    await waitFor(() => expect(first.result.current.error).toBe(failure));
    expect(first.result.current.data).toBeNull();

    tmdb.get.mockResolvedValueOnce({ data: { results } });
    const second = renderHook(() => useTmdb("/trending/all/week"));
    await waitFor(() => expect(second.result.current.data).toEqual(results));
    expect(tmdb.get).toHaveBeenCalledTimes(2);
});

test("ignores a response that arrives after unmount", async () => {
    let resolve;
    tmdb.get.mockReturnValue(new Promise((r) => { resolve = r; }));
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    const { unmount } = renderHook(() => useTmdb("/slow"));
    unmount();
    await act(async () => resolve({ data: { results } }));

    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
});

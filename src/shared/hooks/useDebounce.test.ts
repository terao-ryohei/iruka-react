import { describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@/test/test-utils";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
	it("returns initial value immediately", () => {
		const { result } = renderHook(() => useDebounce("hello", 300));
		expect(result.current).toBe("hello");
	});

	it("debounces value changes", () => {
		vi.useFakeTimers();

		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{ initialProps: { value: "hello", delay: 300 } },
		);

		rerender({ value: "world", delay: 300 });
		expect(result.current).toBe("hello");

		act(() => {
			vi.advanceTimersByTime(300);
		});
		expect(result.current).toBe("world");

		vi.useRealTimers();
	});
});

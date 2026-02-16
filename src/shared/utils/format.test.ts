import { describe, expect, it } from "vitest";
import { formatDate, truncate } from "./format";

describe("formatDate", () => {
	it("formats a date in default locale", () => {
		const date = new Date("2026-02-16");
		const formatted = formatDate(date);
		expect(formatted).toContain("2026");
	});
});

describe("truncate", () => {
	it("returns the original text when within limit", () => {
		expect(truncate("hello", 10)).toBe("hello");
	});

	it("truncates long text with ellipsis", () => {
		expect(truncate("hello world", 5)).toBe("hello...");
	});

	it("handles exact length", () => {
		expect(truncate("hello", 5)).toBe("hello");
	});
});

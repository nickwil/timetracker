import shortTimeFormatting from "./shortTimeFormatting.js"
describe("shortTimeFormatting", () => {
	it("get time in seconds", () => {
		const sixtySeconds = shortTimeFormatting(60)
		expect(sixtySeconds).toBe("60s")
	}),
	it("get time in minutes", () => {
		const oneAndAHalfMinutes = shortTimeFormatting(90)
		expect(oneAndAHalfMinutes).toBe("1.5m")
	}),
	it("get time in hours", () => {
		const oneAndAHalfMinutes = shortTimeFormatting(3600)
		expect(oneAndAHalfMinutes).toBe("1h")
	}),
	it("returns unknown quantity", () => {
		expect(shortTimeFormatting("a")).toBe("a")
	})
	
})

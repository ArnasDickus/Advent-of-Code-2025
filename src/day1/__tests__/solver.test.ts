import { puzzleString } from "..";
import { filterCombinations, safeLocker } from "../solver";

test('Filter if doesnt start with L or R', () => {
    expect(filterCombinations(['12fdf, 56rdd, 49gb', 'R100', 'L50'])).toEqual(['R100', 'L50'])
})

test('Filter values that are not numbers excluding first character and empty spaces', () => {
    expect(filterCombinations(['Lfsdf', 'R100', 'L50', 'Lsfsdfsdf', ' fdf  ', '   ', ''])).toEqual(['R100', 'L50'])
})

test('Count when value reached 0 1 time', () => {
    expect(safeLocker(['L50', 'R50'], false)).toBe(1)
})

test('If values are below 0 or above 100 recount', () => {
    expect(safeLocker(['L68', 'L30', 'R48', 'L5', 'R60', 'L55'], false)).toBe(2)
})

test('Task test case', () => {
    expect(safeLocker(['L68','L30','R48','L5','R60','L55','L1','L99','R14','L82'], false)).toBe(3)
})

test('Test with big Left dial numbers', () => {
    expect(safeLocker(['L700','R50'], false)).toBe(1)
})

test('Test with big Right dial numbers', () => {
    expect(safeLocker(['R700','L50'], false)).toBe(1)
})

test('Count any click to 0 with one small number', () => {
    expect(safeLocker(['L68'], true)).toBe(1)
})

test('Count any click to 0 with big numbers', () => {
    expect(safeLocker(['R1000'], true)).toBe(10)
})

// 6140 is incorrect.
// test('Puzzle test case', () => {
//     expect(safeLocker(puzzleString, true)).toBe(6140)
// })


// First try: 307 and not
// Second try: 70 
// Final Correct answer is 1172
// test('Puzzle test case', () => {
//     expect(safeLocker(puzzleString, false)).toBe(1172)
// })
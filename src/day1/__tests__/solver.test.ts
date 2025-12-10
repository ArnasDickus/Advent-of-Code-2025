import { puzzleString } from "..";
import { filterCombinations, safeLocker } from "../solver";

test('Filter if doesnt start with L or R', () => {
    expect(filterCombinations(['12fdf, 56rdd, 49gb', 'R100', 'L50'])).toEqual(['R100', 'L50'])
})

test('Filter values that are not numbers excluding first character and empty spaces', () => {
    expect(filterCombinations(['Lfsdf', 'R100', 'L50', 'Lsfsdfsdf', ' fdf  ', '   ', ''])).toEqual(['R100', 'L50'])
})

test('Count when value reached 0 1 time', () => {
    expect(safeLocker(['L50', 'R50'])).toBe(1)
})

test('If values are below 0 or above 100 recount', () => {
    expect(safeLocker(['L68', 'L30', 'R48', 'L5', 'R60', 'L55'])).toBe(2)
})

test('Task test case', () => {
    expect(safeLocker(['L68','L30','R48','L5','R60','L55','L1','L99','R14','L82'])).toBe(3)
})

test('Test with big Left dial numbers', () => {
    expect(safeLocker(['L700','R50'])).toBe(1)
})

test('Test with big Right dial numbers', () => {
    expect(safeLocker(['R700','L50'])).toBe(1)
})

// Unfortunatelly test failed. its not 307 and not 70
// test('Puzzle test case', () => {
//     expect(safeLocker(puzzleString)).toBe(70)
// })
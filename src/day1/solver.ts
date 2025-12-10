/*
https://adventofcode.com/2025/day/1
*/

const maxDialValue = 100;
const startingNumber = 50;

export const safeLocker = (combinations: string[]) => {
    const cleanValues = filterCombinations(combinations);
    let safeCounter = 0;
    let totalNumber = startingNumber;

    cleanValues.forEach(val => {
        const firstChar = val.charAt(0);
        const dialValue = parseInt(val.slice(1)); 
        
        let newTotal = totalNumber;

        if (dialLeftCharacter(firstChar)) {
            newTotal -= dialValue;
        } else if (dialRightCharacter(firstChar)) {
            newTotal += dialValue;
        }

        totalNumber = calculateOverDialing(newTotal);

        if (totalNumber === 0) {
            safeCounter++;
        }
    })

    return safeCounter;
}

export const filterCombinations = (combinations: string[]) => {
    return combinations.filter(isCombinationValid);
}

const calculateOverDialing = (outOfBoundsValue: number): number => {
    return (outOfBoundsValue % maxDialValue + maxDialValue) % maxDialValue;
}

const dialLeftCharacter = (firstChar: string) => firstChar === 'L'
const dialRightCharacter = (firstChar: string) => firstChar === 'R'

const isNumeric = (str: string) => {
    const regex = /^[+-]?\d+(\.\d*)?$/;
    return regex.test(str);
}

const isCombinationValid = (combination: string) => {
    const firstChar = combination.charAt(0);
    const restOfChar = combination.slice(1)
    const doesDialExist = (dialLeftCharacter(firstChar) || dialRightCharacter(firstChar))

    if (doesDialExist && isNumeric(restOfChar)) return true
    return false
}
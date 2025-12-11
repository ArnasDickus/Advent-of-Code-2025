/*
https://adventofcode.com/2025/day/1
*/

const maxDialValue = 100;
const startingNumber = 50;

export const safeLocker = (combinations: string[], onAnyClick: boolean) => {
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

        const overDialedValue = calculateOverDialing(newTotal)

        totalNumber = overDialedValue;

        safeCounter += updateSafeCounter({
            newTotal,
            onAnyClick,
            totalNumber,
        })
    })

    return safeCounter;
}

export const filterCombinations = (combinations: string[]) => {
    return combinations.filter(isCombinationValid);
}

interface UpdateSafeCounterProps {
    onAnyClick: boolean;
    newTotal: number;
    totalNumber: number
}

const updateSafeCounter = ({ newTotal, onAnyClick, totalNumber }: UpdateSafeCounterProps ) => {
    const isOutOfBounds = newTotal < 0 || newTotal > maxDialValue;

        if (onAnyClick && isOutOfBounds)  return calculateTimeOverDialed(newTotal);
        if (!onAnyClick && totalNumber === 0)  return 1;

    return 0
}

const calculateTimeOverDialed = (outOfBoundsValue: number) => {
    const ratio = Math.abs(outOfBoundsValue) / maxDialValue;
    return Math.max(1, Math.floor(ratio));
}

const calculateOverDialing = (outOfBoundsValue: number) => {
   return (outOfBoundsValue % maxDialValue + maxDialValue) % maxDialValue
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
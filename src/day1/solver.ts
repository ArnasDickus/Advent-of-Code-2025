/*
https://adventofcode.com/2025/day/1
*/

const maxDialValue = 100;
const startingNumber = 50;

export const filterCombinations = (combinations: string[]) => {
    return combinations.filter(isCombinationValid);
}

export const safeLocker = (combinations: string[]) => {
    const cleanValues = filterCombinations(combinations);
    let safeCounter = 0;
    let totalNumber = startingNumber;

    cleanValues.forEach(val => {
        const firstChar = val.charAt(0);
        const dialValue = Number(val.slice(1))

        if(dialLeftCharacter(firstChar)) {
            totalNumber -= dialValue;
            
            if(totalNumber < 0) {
             totalNumber = calculateOverDialing(totalNumber, 'left')
            }
        }
        if(dialRightCharacter(firstChar)) {
             totalNumber += dialValue;

             if(totalNumber >= maxDialValue) {
                 totalNumber = calculateOverDialing(totalNumber, 'right')
             }
        }

        if(totalNumber === 0) {
            safeCounter++
        }
    })

    return safeCounter;
   
}


const calculateOverDialing = (totalNumber: number, prefix: 'left' | 'right') => {
    let dialValue = 0
    
    if(prefix === 'left') dialValue += totalNumber + maxDialValue
    if(prefix === 'right') dialValue -= totalNumber + maxDialValue

    const absoluteValue = Math.abs(dialValue);

    return dialValue = absoluteValue % maxDialValue
}

const isNumeric = (str: string) => {
  const regex = /^[+-]?\d+(\.\d*)?$/;
  return regex.test(str);
}

const dialLeftCharacter = (firstChar: string) => firstChar === 'L'
const dialRightCharacter = (firstChar: string) => firstChar === 'R'

const isCombinationValid = (combination: string) => {
    const firstChar = combination.charAt(0);
    const restOfChar = combination.slice(1)
    const doesDialExist = (dialLeftCharacter(firstChar) || dialRightCharacter(firstChar))

    if (doesDialExist && isNumeric(restOfChar)) return true
    return false
}

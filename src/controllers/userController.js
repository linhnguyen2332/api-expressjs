const jwt = require('jsonwebtoken');

//4.1

const numBubbleSort = (req, res) => {
    let arrInput = req.query.arrInput
    if (!arrInput) {
        return res.status(400).json({ error: 'Missing parameters' });
    }
    try {
        arrInput = JSON.parse(arrInput);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid parameters' });
    }
    let temp = 0
    let num = 0
    for (let i = 1; i < arrInput.length; i++) {
        for (let j = 0; j < i; j++) {
            if (arrInput[i] < arrInput[j]) {
                temp = arrInput[j];
                arrInput[j] = arrInput[i];
                arrInput[i] = temp;
                num += 1
            }
        }
    }
    return res.json({ result: num });

}

//4.2

const distincArr = (req, res) => {
    let nums = req.query.nums;
    let target = req.query.target;

    if (!nums || !target) {
        return res.status(400).json({ error: 'Missing parameters' });
    }

    try {
        nums = JSON.parse(nums);
        target = JSON.parse(target);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid parameters' });
    }

    function countDistinctSubsequences(nums, target) {
        const memo = new Map();
        return backtrack(nums, target, 0, 0, memo);
    }

    function backtrack(nums, target, index, currSum, memo) {
        if (index === nums.length) {
            if (currSum === target) {
                return 1; // Found a valid subsequence
            }
            return 0; // Reached the end of the list
        }

        const key = `${index}-${currSum}`;
        if (memo.has(key)) {
            return memo.get(key); // Return memoized value if available
        }

        const count1 = backtrack(nums, target, index + 1, currSum + nums[index], memo); // Include current number
        const count2 = backtrack(nums, target, index + 1, currSum, memo); // Exclude current number

        const totalCount = count1 + count2;
        memo.set(key, totalCount); // Memoize the result

        return res.json({ result: totalCount });
    }
}

//4.3

const findLongestSubstring = (req, res) => {
    let strings = req.query.strings
    if (!strings) {
        return res.status(400).json({ error: 'Missing parameters' });
    }
    try {
        strings = JSON.parse(strings);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid parameters' });
    }
    let longestSubstring = '';

    for (let i = 0; i < strings.length; i++) {
        const currentString = strings[i];

        for (let j = 0; j < currentString.length; j++) {
            for (let k = j + 1; k <= currentString.length; k++) {
                const substring = currentString.slice(j, k);
                let isSubstringPresentInAllStrings = true;

                for (let m = 0; m < strings.length; m++) {
                    if (strings[m].indexOf(substring) === -1) {
                        isSubstringPresentInAllStrings = false;
                        break;
                    }
                }

                if (isSubstringPresentInAllStrings && substring.length > longestSubstring.length) {
                    longestSubstring = substring;
                }
            }
        }
    }

    return res.json({ result: longestSubstring.length });
}

//4.6
const findMaxProduct = (req, res) => {
    let numbers = req.query.numbers
    if (!numbers) {
        return res.status(400).json({ error: 'Missing parameters' });
    }
    try {
        numbers = JSON.parse(numbers);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid parameters' });
    }
    const sortedNumbers = numbers.sort((a, b) => a - b);
    const n = sortedNumbers.length;

    const product1 = sortedNumbers[n - 1] * sortedNumbers[n - 2] * sortedNumbers[n - 3];

    const product2 = sortedNumbers[0] * sortedNumbers[1] * sortedNumbers[n - 1];
    return res.json({ result: Math.max(product1, product2) });
}

//4.9

const increasingSequenceLength = (req, res) => {
    let numbers = req.query.numbers
    if (!numbers) {
        return res.status(400).json({ error: 'Missing parameters' });
    }
    try {
        numbers = JSON.parse(numbers);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid parameters' });
    }
    let maxLength = 0;
    let currentLength = 1;

    numbers.reduce((previousNumber, currentNumber) => {
        if (currentNumber - 1 === previousNumber) {
            currentLength++;
            maxLength = Math.max(maxLength, currentLength);
        } else {

            currentLength = 1;
        }

        return currentNumber;
    });
    return res.json({ result: numbers })

}

//4.10
const findLongestCommonSubstring = (req, res) => {
    let strings = req.query.strings;
    let k = req.query.k;

    if (!strings || !k) {
        return res.status(400).json({ error: 'Missing parameters' });
    }

    try {
        strings = JSON.parse(strings);
        k = JSON.parse(k);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid parameters' });
    }
    let longestSubstring = '';
    let maxLength = k;

    for (let i = 0; i < strings.length - 1; i++) {
        for (let j = i + 1; j < strings.length; j++) {
            for (let m = 0; m <= strings[i].length - maxLength; m++) {
                const substring = strings[i].substring(m, m + maxLength);
                if (strings[j].includes(substring)) {
                    longestSubstring = substring;
                    maxLength = substring.length;
                }
            }
        }
    }
    return res.json({ result: longestSubstring });
}

//5.1

const reverseArr = (req, res) => {
    let arr = req.query.arr
    if (!arr) {
        return res.status(400).json({ error: 'Missing parameters' });
    }
    try {
        arr = JSON.parse(arr);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid parameters' });
    }
    const reversed = [];
    arr.forEach((element) => {
        reversed.unshift(element);
    });
    return res.jsom({ result: reversed });
}

//5.2
const remakeChunk = (req, res) => {
    let array = req.query.array;
    let target = req.query.target;

    if (!array || !target) {
        return res.status(400).json({ error: 'Missing parameters' });
    }

    try {
        array = JSON.parse(array);
        target = JSON.parse(target);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid parameters' });
    }
    if (target <= 0) return [array];
    const numberArray = Math.floor(array.length / target);
    const remainder = array.length % target;
    const chunks = [];
    let startIndex = 0;
    for (let i = 0; i < target; i++) {
        const chunkSize = numberArray + (i < remainder ? 1 : 0);
        const endIndex = startIndex + chunkSize;
        chunks.push(array.slice(startIndex, endIndex));
        startIndex = endIndex;
    }
    return res.json({ result: chunks });
}

//5.3
const uniq = (req, res) => {
    let arr = req.query.arr
    if (!arr) {
        return res.status(400).json({ error: 'Missing parameters' });
    }
    try {
        arr = JSON.parse(arr);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid parameters' });
    }
    let array = new Set(arr);
    return res.json({ result: [...array] })

}

//5.4

const uniqArr = (req, res) => {
    let arr = req.query.arr
    if (!arr) {
        return res.status(400).json({ error: 'Missing parameters' });
    }
    try {
        arr = JSON.parse(arr);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid parameters' });
    }
    let uniqueArr = [];
    for (let i = 0; i < arr.length; i++) {
        let isDuplicate = false;
        for (let j = 0; j < uniqueArr.length; j++) {
            if (arr[i].x === uniqueArr[j].x && arr[i].y === uniqueArr[j].y) {
                isDuplicate = true;
                break;
            }
        }
        if (!isDuplicate) {
            uniqueArr.push(arr[i]);
        }
    }
    return res.json({ result: uniqueArr });
}

//5.5

const groupBy = (req, res) => {
    let collections = req.query.collections;
    let prop = req.query.prop;

    if (!collections || !prop) {
        return res.status(400).json({ error: 'Missing parameters' });
    }

    try {
        collections = JSON.parse(collections);
        prop = JSON.parse(prop);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid parameters' });
    }
    return res.json({
        result: collection.reduce(function (acc, obj) {
            let key = obj[prop];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
        }, {})
    })
}


const mapKeys = (req, res) => {
    let collections = req.query.collections;
    let keys = req.query.keys;

    if (!collections || !keys) {
        return res.status(400).json({ error: 'Missing parameters' });
    }

    try {
        collections = JSON.parse(collections);
        keys = JSON.parse(keys);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid parameters' });
    }

    let objs = collections.map((obj) => {
        return keys.reduce((acc, key) => {
            acc[key] = obj[key];
            return acc;
        }, {});
    });

    objs = objs.filter((obj) =>
        Object.values(obj).every((val) => val !== undefined)
    );

    return res.json({ result: objs });
}

const trimAll = (req, res) => {
    let arr = req.query.arr
    if (!arr) {
        return res.status(400).json({ error: 'Missing parameters' });
    }
    try {
        arr = JSON.parse(arr);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid parameters' });
    }

    return res.json({ result: arr.trim().replace(/\s+/g, " ") });

}

const reverseArray = (req, res) => {
    let arr55 = req.query.arr55;

    if (!arr55) {
        return res.status(400).json({ error: 'Missing parameters' });
    }

    try {
        arr55 = JSON.parse(arr55);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid parameters' });
    }
    let reversed = [];
    arr55.forEach((element) => {
        reversed.unshift(element);
    });
    return res.json(reversed);
}

//5.8
const switchOrder = (req, res) => {
    let { id, newOrder, arr } = req.query;
    if (!id || !newOrder || !arr) {
        return res.status(400).json({ error: 'Missing parameters' });
    }

    try {
        id = JSON.parse(id);
        newOrder = JSON.parse(newOrder);
        arr = JSON.parse(arr);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid parameters' });
    }
    if (newOrder < 0 || newOrder >= arr.length) {
        throw new Error("New order is out of range.");
    }

    if (newOrder > oldOrder) {
        for (let i = oldOrder; i < newOrder; i++) {
            arr[i].order--;
        }
    } else if (newOrder < oldOrder) {
        for (let i = newOrder; i < oldOrder; i++) {
            arr[i].order++;
        }
    }
    arr.splice(objIndex, 1);
    obj.order = newOrder;
    arr.splice(newOrder, 0, obj);

    return res.json({ result: arr });

}

/**----------infix to postfix----------*/
const toPostfix = (req, res) => {
    let input = req.query.input;

    if (!input) {
        return res.status(400).json({ error: 'Missing parameters' });
    }

    try {
        input = JSON.parse(input);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid parameters' });
    }
    function infixToPostfix(input) {
        let stack = [];
        let answer = [];
        const precedence = {
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2,
        };

        const isOperator = (char) => {
            return precedence.hasOwnProperty(char);
        };

        const hasHigherPrecedence = (op1, op2) => {
            return precedence[op1] >= precedence[op2];
        };

        for (let char of input.split(' ')) {
            if (isOperator(char)) {
                while (
                    stack.length > 0 &&
                    isOperator(stack[stack.length - 1]) &&
                    hasHigherPrecedence(stack[stack.length - 1], char)
                ) {
                    answer.push(stack.pop());
                }
                stack.push(char);
            } else {
                answer.push(char);
            }
        }

        while (stack.length > 0) {
            answer.push(stack.pop());
        }

        return answer.join(' ');
    }


    function executePostfix(str) {
        let stack = [];

        for (let char of str.split(' ')) {
            if (!isNaN(parseFloat(char))) {
                stack.push(parseFloat(char));
            } else {
                let operand2 = stack.pop();
                let operand1 = stack.pop();

                switch (char) {
                    case '+':
                        stack.push(operand1 + operand2);
                        break;
                    case '-':
                        stack.push(operand1 - operand2);
                        break;
                    case '*':
                        stack.push(operand1 * operand2);
                        break;
                    case '/':
                        stack.push(operand1 / operand2);
                        break;
                    default:
                        break;
                }
            }
        }

        return stack[0]; // Trả về giá trị đầu tiên trong stack
    }


    let postfixExpression = infixToPostfix(input);
    let result = executePostfix(postfixExpression);

    res.json({
        infixExpression: input,
        postfixExpression: postfixExpression,
        result: result
    });
}




//////////////////////////////////////////////

const secretKey = 'linhnguyenvan'
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }

        req.user = user;
        next();
    });
}

const handleLogin = (req, res) => {
    // Xác thực người dùng và tạo JWT
    let { username, password } = req.body;

    // Kiểm tra xác thực người dùng
    if (username === 'admin' && password === 'password') {
        // Tạo JWT
        const token = jwt.sign({ username }, secretKey);
        return res.json({ token });
    } else {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
}


module.exports = {
    mapKeys, trimAll,
    authenticateToken, handleLogin,
    reverseArray, numBubbleSort,
    distincArr, findLongestSubstring,
    findMaxProduct, increasingSequenceLength,
    findLongestCommonSubstring, reverseArr,
    remakeChunk, uniq, uniqArr, groupBy,
    switchOrder, toPostfix
};
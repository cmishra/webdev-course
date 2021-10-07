const calculator = document.querySelector('.calculator');
const view = document.querySelector('.stateView')


prevState = 0;
curState = 0
curOperator = null

operationMap = {
    '÷': (a, b) => a / b,
    '×': (a, b) => a * b,
    '-': (a, b) => a - b,
    '+': (a, b) => a + b,
}

calculate = (curButton) => {
    if (curButton.className.includes('stateView')) {
        return
    }

    if (curButton.className.includes('equals') && (!prevState || !curState)) {
        return
    }

    if (curButton.className.includes('equals')) {
        curState = operationMap[curOperator](prevState, curState)
        view.innerText = curState
        curOperator, prevState = null, null
        return
    }

    if (curButton.className.includes('math-operator') && curState != 0) {
        if (prevState) {
            prevState = operationMap[curOperator](prevState, curState)
        } else {
            prevState = curState
        }
        curOperator = curButton.innerText
        curState = 0.0
        view.innerText = curState
        return
    }

    if (curButton.className.includes('clear')) {
        curState = 0
        curOperator = null
        prevState = null
        view.innerText = curState
        return
    }

    if (curButton.className.includes('math-operator')) {
        return
    }

    if (curButton.className.includes('backspace')) {
        curState = parseFloat(`${curState}`.slice(0, -1))
        view.innerText = curState
        return
    }

    if (curButton.className.includes('button')) {
        if (curState == 0) {
            curState = parseFloat(curButton.innerText)
        } else {
            curState = parseFloat(`${curState}${curButton.innerText}`)
        }
        view.innerText = curState
        return
    }

    alert('Should not be possible -- error')

    return curState, curOperator
}

calculator.addEventListener('click', (event) => {
    calculate(event.target)
})
let tickers = document.querySelectorAll('.ticker')
for (let ticker of tickers) {
    tickerInit(ticker)
}

function tickerInit(ticker) {
    let tickerList = ticker.querySelector('.ticker__list')

    let tickerListItems = ticker.querySelectorAll('.ticker__item')
    for (let item of tickerListItems) {
        tickerList.append(item.cloneNode(true))
    }
        
    function move() {
        let currentTX = getComputedStyle(tickerList).transform.split(','),
            firstItem = ticker.querySelector('.ticker__item'),
            firrstItemWidth = firstItem.offsetWidth
        if( currentTX[4] === undefined ) {
            currentTX = -1
        } else {
            currentTX = parseFloat(currentTX[4]) - 1

            if (-currentTX > firrstItemWidth) {
                currentTX += firrstItemWidth
                tickerList.append(firstItem)
            }
        }

        tickerList.style.transform = 'translateX(' + currentTX + 'px)'
    }

    let interval = setInterval(move, 10)
}
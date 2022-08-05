const fetchCoins = async() => {
    const res = await axios('https://api.coincap.io/v2/assets')
    listCoins(res.data.data)
}



const listCoins = (res) => {
    const data = res
    const tbody = document.querySelector('.coin-list-body')
    
    for(let i = 0; i<data.length; i++){
        
        tbody.innerHTML += ` 
        <tr class="coin">
            <td><img src="https://www.gate.io/images/coin_icon/64/${data[i].symbol.toLowerCase()}.png" width="30px" height="30px" alt="Not found."></td>
            <td>#${data[i].rank}</td>
            <td>${data[i].name}</td>
            <td>${data[i].symbol}</td>
            <td>$${Number(data[i].priceUsd).toFixed(2)}</td>
            <td>${Number(data[i].supply).toFixed(2)}</td>
        </tr>`
    }
    
}

fetchCoins()






   

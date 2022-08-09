
document.querySelector("#btnSearch").addEventListener('click',() => {
    let text = document.querySelector('#txtSearch').value;
    getCountry(text)
    setTimeout(() => {
        document.querySelector('#border-neighbors').classList.remove('hidden')
    },500)

})
document.querySelector("#txtSearch").addEventListener('keypress',(e) => {
    if(e.key == 'Enter'){
        let text = document.querySelector('#txtSearch').value;
        getCountry(text)
        setTimeout(() => {
            document.querySelector('#border-neighbors').classList.remove('hidden')
        },500)
    }
})

function getCountry(country){
    const req = new XMLHttpRequest()
    req.open('GET','https://restcountries.com/v3.1/name/'+ country)
    req.onreadystatechange = () => {
        if(req.status === 404){
            document.querySelector('#country-details').innerHTML = '<div class="card-header">No results were found for your search.</div>'
            document.querySelector('#border-neighbors').classList.add('hidden')
        }
        
    }
    req.send()
   

    // async
    req.addEventListener('load',function() {
        // string to JSON
       
        const data = JSON.parse(this.responseText)
      
        renderCountry(data[0]);

        const countries = data[0].borders.toString()
        // load neighbors of country
        const req2 = new XMLHttpRequest();
        req2.open('GET','https://restcountries.com/v3.1/alpha?codes='+countries)
        req2.send()
        req2.addEventListener('load',function() {
            const data = JSON.parse(this.responseText)
            renderNeighbors(data)
        })
    })
   

    
}

function renderCountry(data){
    let html = `
    <div class="card-header">
        Search Results
    </div>
    <div class="card-body">
        <div class="row">
            <div class="col-4">
                <img src="${data.flags.png}" alt="" class="img-fluid">
            </div>
            <div class="col-8">
                <h3 class="card-title">${data.name.common}</h3>
                <hr>
                <div class="row">
                    <div class="col-4">Population: </div>
                    <div class="col-8">${(data.population/1000000).toFixed(1)} M</div>
                </div>
                <div class="row">
                    <div class="col-4">Language: </div>
                    <div class="col-8">${Object.values(data.languages)}</div>
                </div>
                <div class="row">
                    <div class="col-4">Capital: </div>
                    <div class="col-8">${data.capital[0]}</div>
                </div>
                <div class="row">
                    <div class="col-4">Currency: </div>
                    <div class="col-8">${Object.values(data.currencies)[0].symbol} ${Object.values(data.currencies)[0].name} </div>
                </div>
        </div>
    </div>
    `
    document.querySelector('#country-details').innerHTML = html;
    
}

function renderNeighbors(data){
    let html = ''
    for(let country of data){
        html += `
        <div class='col-2 mt-2'>
            <div class="card">
                <img src='${country.flags.png}' class='card-img-top'>
                <div class='card-body'>
                    <h6 class='card-title'>${country.name.common}</h6>
                </div>
            </div>
        </div>
        `
        document.querySelector('#neighbors').innerHTML = html
    }
}
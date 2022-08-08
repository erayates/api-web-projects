const siteTitle = document.querySelector('.site-title')
const ipAddress = document.querySelector('.ip-address')
const container = document.querySelector('.container')

axios('https://api.ipify.org/?format=json').then(res => getIpAddress(res.data.ip))

    

const getIpAddress = (res) => {
    siteTitle.innerText = res
    ipAddress.innerText = res
   axios(`https://ipinfo.io/${res}?token=5222404a7029a7`).then(resDetail => getIpDetails(resDetail.data))
}

const getIpDetails = (resDetail) => {

    var pArray = []
    for(let i = 0; i<6; i++){
        pArray.push(document.createElement('p'))
    }
     pArray[0].innerHTML = `<strong>City:</strong> ${resDetail.city}`
     pArray[1].innerHTML = `<strong>Country:</strong> ${resDetail.country}`
     pArray[2].innerHTML = `<strong>Org:</strong> ${resDetail.org}`
     pArray[3].innerHTML = `<strong>Postal:</strong> ${resDetail.postal}`
     pArray[4].innerHTML = `<strong>Region:</strong> ${resDetail.region}`
     pArray[5].innerHTML =`<strong>Timezone:</strong> ${resDetail.timezone}`

    for(let i = 0; i<6; i++){
         container.append(pArray[i])
     }
}


   

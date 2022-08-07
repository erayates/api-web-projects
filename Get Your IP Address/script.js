const siteTitle = document.querySelector('.site-title')
const ipAddress = document.querySelector('.ip-address')

axios('https://api.ipify.org/?format=json').then(res => getIpAddress(res.data.ip))
    
    

const getIpAddress = (res) => {
    siteTitle.innerText = res
    ipAddress.innerText = res
}


   

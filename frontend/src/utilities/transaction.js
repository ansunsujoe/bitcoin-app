import axios from 'axios';

const commissionRates = {
    "silver": "0.03",
    "gold": "0.01"
}

export function getCurrentBTC() {
    axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then(response => {
      console.log("SUCCESS", response);
      return response.data
    }).catch(error => {
      console.log(error);
    })
}

export function getCommission() {
    return commissionRates["gold"];
}
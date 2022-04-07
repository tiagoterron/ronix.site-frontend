import { ethers, utils, Wallet } from "ethers";
const Number_Format = new Intl.NumberFormat(undefined);
const Number_Format_Compact = new Intl.NumberFormat(undefined, { notation: "compact"});
export const CurrencyFormat = (amount) => {
    return Number_Format.format(amount);
    // return parseFloat(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}
export const CurrencyFormat2 = (amount) => {
    return parseFloat(amount).toFixed(6).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}
export const CurrencyFormatDecimals = (amount, dec) => {
    return Number_Format_Compact.format(amount);
// return parseFloat(amount).toFixed(dec).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

export function sleep(duration){
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    })
}

export function addGlobalEventListener(
    type,
    selector,
    callback,
    options,
    parent = document
  ) {
    parent.addEventListener(
      type,
      e => {
        if (e.target.matches(selector)) callback(e)
      },
      options
    )
  }
  
  export function qs(selector, parent = document) {
    return parent.querySelector(selector)
  }
  
  export function qsa(selector, parent = document) {
    return [...parent.querySelectorAll(selector)]
  }
  
  export function createElement(type, options = {}) {
    const element = document.createElement(type)
    Object.entries(options).forEach(([key, value]) => {
      if (key === "class") {
        element.classList.add(value)
        return
      }
  
      if (key === "dataset") {
        Object.entries(value).forEach(([dataKey, dataValue]) => {
          element.dataset[dataKey] = dataValue
        })
        return
      }
  
      if (key === "text") {
        element.textContent = value
        return
      }
  
      element.setAttribute(key, value)
    })
    return element
  }
export const short = (_url) => {
    return _url.slice(0, 5)+"..."+_url.slice(_url.length-4);
}

export const BigNumber = (amount, reverted, decimals) => {
    decimals = decimals ?? 18;
    if(reverted) return parseFloat(utils.formatUnits(amount, decimals)).toFixed(decimals/2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    else return utils.formatUnits(amount, decimals);
}

export const MoneyFormat = (labelValue) => { 
  
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e+15

       ? parseFloat(Math.abs(Number(labelValue)) / 1.0e+15).toFixed(0) + "T"
       // Six Zeroes for Millions 
       : parseFloat(Math.abs(Number(labelValue)) >= 1.0e+9).toFixed(0)

       ? parseFloat(Math.abs(Number(labelValue)) / 1.0e+9).toFixed(6) + "B"
       // Six Zeroes for Millions 
       : parseFloat(Math.abs(Number(labelValue)) >= 1.0e+6).toFixed(6)

       ? parseFloat(Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
       // Three Zeroes for Thousands
       : parseFloat(Math.abs(Number(labelValue)) >= 1.0e+3).toFixed(2)

       ? parseFloat(Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

       : parseFloat(Math.abs(Number(labelValue))).toFixed(2);

   }
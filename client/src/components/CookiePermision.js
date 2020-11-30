const cookieStorage = {
    getItem: (key) => {
      const cookies = document.cookie
      .split(';')
      .map(cookie => cookie.split('='))
      .reduce((acc, [key, value])=> ({ ...acc,[key.trim()]: value}));
      return cookies[key]; 
    },
    setItem: (key, value) => {
        document.cookie = `${key}=${value}`
    }
}

const storageType = cookieStorage;
const consentPropertyName = 'jdc_consent';

const shouldShowPopup = () => !storageType.getItem(consentPropertyName);
const saveToStorage = () => storageType.setItem(consentPropertyName, true);

window.onload = () => {
    if(shouldShowPopup()) {
        const conset = confirm ('Agree to terms');
        if (consent) {
            saveToStorage();
        }
    }
}

import React from 'react';
import ReactDOM from 'react-dom';
import  App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { CookiesProvider } from "react-cookie";

ReactDOM.render( 
<CookiesProvider> 
<div id="consent-popup" class="hidden">
        <p>By using this site you agree to our <a href="#">Terms and Conditions</a>.
            Please <a id="accept" href="#">Accept</a> these before using the site.
        </p>
    </div>
    <App />
</CookiesProvider>, document.getElementById('root'));

registerServiceWorker();

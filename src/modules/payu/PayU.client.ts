import axios from 'axios'
const CryptoJS = require("crypto-js");

export class PayUClient{
    apiLogin: string
    apiKey: string
    merchantId: string

    url_test:string
    url_prod:string

    test_env:boolean


    constructor(){
        this.url_test = "https://sandbox.api.payulatam.com/reports-api/4.0/service.cgi"
        this.url_prod = "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu"
        this.test_env = true

        this.apiLogin = "wq2v5iJQOtDSb83"
        this.apiKey = "cCZOQv72214hmG5EFCbJ9AGJGO"
        this.merchantId ="860010";

       // this.apiLogin = "pRRXKOl8ikMmt9u"
        //this.apiKey = "4Vj8eK4rloUd272L48hsrarnUA"
        //this.merchantId ="508029";
    }

    getUrl(){
        return (this.test_env)?this.url_test:this.url_prod;
    }

    getApiLogin(){
        return this.apiLogin
    }

    getApiKey(){
        return this.apiKey
    }

    getMerchantId(){
        return this.merchantId
    }

    async sendRequest(details = null){
        let response_data = {};
        await axios({
            method: 'post',
            url: this.getUrl(),
            headers:{
                "Content-Type":"application/json; charset=utf-8",
                "Accept":"application/json",
                "Content-Length":"Content-Length"
            },
            data:JSON.stringify(details)
        })
        .then(function (response) {
            response_data = {error:false,data:response.data}
        })
        .catch(function (error) {
            response_data = {error:true,data:error}
        });

        return response_data;
    }

    requestTest(){
        const data = {
            "test": true,
            "language": "en",
            "command": "PING",
            "merchant": {
               "apiLogin": this.getApiLogin(),
               "apiKey": this.getApiKey()
            }
        }
        return this.sendRequest(data);
    }

    generateMD5(text:string){
        return CryptoJS.MD5(text).toString()
    }
}
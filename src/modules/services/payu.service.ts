import { PayUClient } from '../payu/PayU.client'
export class PayuService {
    getSign(data){
        const payuClient = new PayUClient();
        const text = payuClient.getApiKey()+"~"+payuClient.getMerchantId()+"~"+data.referenceCode+"~"+data.amount+"~COP";
        return (new PayUClient()).generateMD5(text);
    }

}

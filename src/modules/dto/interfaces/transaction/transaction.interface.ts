export interface TransactionInterface {
    order: any;
    transaction_id: number;
    tx_value: number;
    currency: string;
    transaction_state_number: number;
    transaction_state_label: string;
    cus: string;
    reference_pol: string;
    signature: string;
    reference_code: string;
    transaction_id_payu: string;
    lap_payment_method: string;
    pse_bank: string;
    description: string;
}

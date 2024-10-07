class PaymentService {
    constructor(TransactionModel) {
        this.Transaction = TransactionModel;
    }

    // Processar pagamento - cartão de crédito
    async processCreditCardPayment(userId, valorTotal) {
        try {
            const paymentSuccess = Math.random() > 0.2;

            const transaction = await this.Transaction.create({
                userId,
                valorTotal,
                metodoPagamento: 'cartão de crédito',
                status: paymentSuccess ? 'concluído' : 'falhado'
            });

            return transaction;
        } catch (error) {
            throw error;
        }
    }

    // Processar pagamento - PIX
    async processPixPayment(userId, valorTotal) {
        try {
            const paymentSuccess = Math.random() > 0.1; 

            const transaction = await this.Transaction.create({
                userId,
                valorTotal,
                metodoPagamento: 'PIX',
                status: paymentSuccess ? 'concluído' : 'falhado'
            });

            return transaction;
        } catch (error) {
            throw error;
        }
    }

    // Consultar o status da transação
    async getTransactionStatus(transactionId) {
        try {
            const transaction = await this.Transaction.findByPk(transactionId);
            if (!transaction) {
                throw new Error('Transação não encontrada');
            }
            return transaction;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PaymentService;

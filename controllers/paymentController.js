class PaymentController {
    constructor(PaymentService) {
        this.paymentService = PaymentService;
    }

    // Processar pagamento - cartão de crédito
    async creditCardPayment(req, res) {
        const { userId, valorTotal } = req.body;
        try {
            const transaction = await this.paymentService.processCreditCardPayment(userId, valorTotal);
            res.status(200).json(transaction);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Processar pagamento - PIX
    async pixPayment(req, res) {
        const { userId, valorTotal } = req.body;
        try {
            const transaction = await this.paymentService.processPixPayment(userId, valorTotal);
            res.status(200).json(transaction);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Consultar status da transação
    async getTransactionStatus(req, res) {
        const { transactionId } = req.params;
        try {
            const transaction = await this.paymentService.getTransactionStatus(transactionId);
            res.status(200).json(transaction);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PaymentController;
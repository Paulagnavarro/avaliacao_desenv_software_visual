class CartController {
    constructor(CartService) {
        this.cartService = CartService;
    }

    // Adicionar um produto na cesta
    async addItemToCart(req, res) {
        const { userId, productId, quantidade } = req.body;
        try {
            const updatedCart = await this.cartService.addItemToCart(userId, productId, quantidade);
            res.status(200).json(updatedCart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Remover um produto da cesta
    async removeItemFromCart(req, res) {
        const { userId } = req.body;
        const { id } = req.params; 
        try {
            const updatedCart = await this.cartService.removeItemFromCart(userId, id);
            res.status(200).json(updatedCart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Visualizar cesta de compras
    async getCart(req, res) {
        const { userId } = req.body;
        try {
            const cart = await this.cartService.getCart(userId);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CartController;

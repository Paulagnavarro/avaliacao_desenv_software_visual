class CartService {
    constructor(CartModel, ProductModel) {
        this.Cart = CartModel;
        this.Product = ProductModel;
    }

    // Adicionar um produto à cesta
    async addItemToCart(userId, productId, quantidade) {
        try {
            const product = await this.Product.findByPk(productId);
            if (!product) {
                throw new Error('Produto não encontrado');
            }

            let cart = await this.Cart.findOne({ where: { userId } });
            if (!cart) {
                cart = await this.Cart.create({ userId, itens: [] });
            }

            // Adicionar ou atualizar item na cesta
            let itens = cart.itens || [];
            const existingItem = itens.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantidade += quantidade;
                existingItem.precoTotal = existingItem.quantidade * product.preco;
            } else {
                itens.push({
                    id: product.id,
                    nome: product.nome,
                    quantidade,
                    precoTotal: product.preco * quantidade
                });
            }

            cart.itens = itens;
            await cart.save();

            return cart;
        } catch (error) {
            throw error;
        }
    }

    // Remover um produto da cesta
    async removeItemFromCart(userId, productId) {
        try {
            const cart = await this.Cart.findOne({ where: { userId } });
            if (!cart) {
                throw new Error('Cesta não encontrada');
            }

            cart.itens = cart.itens.filter(item => item.id !== productId);
            await cart.save();

            return cart;
        } catch (error) {
            throw error;
        }
    }

    // Visualizar itens da cesta
    async getCart(userId) {
        try {
            const cart = await this.Cart.findOne({ where: { userId } });
            return cart ? cart : { userId, itens: [] };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CartService;

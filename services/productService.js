class ProductService {
    constructor(ProductModel) {
        this.Product = ProductModel;
    }

    // Criar novo produto
    async createProduct(nome, descricao, preco, estoque) {
        try {
            const newProduct = await this.Product.create({ nome, descricao, preco, estoque });
            return newProduct;
        } catch (error) {
            throw error;
        }
    }

    // Listar produtos
    async getAllProducts() {
        try {
            const products = await this.Product.findAll();
            return products;
        } catch (error) {
            throw error;
        }
    }

    // Atualizar produto
    async updateProduct(id, updates) {
        try {
            const [updated] = await this.Product.update(updates, { where: { id } });
            return updated ? await this.Product.findByPk(id) : null;
        } catch (error) {
            throw error;
        }
    }

    // Deletar produto
    async deleteProduct(id) {
        try {
            const deleted = await this.Product.destroy({ where: { id } });
            return deleted;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductService;

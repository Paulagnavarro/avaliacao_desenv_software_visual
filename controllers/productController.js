class ProductController {
    constructor(ProductService) {
        this.productService = ProductService;
    }

    // Criar novo produto
    async createProduct(req, res) {
        const { nome, descricao, preco, estoque } = req.body;
        try {
            const newProduct = await this.productService.createProduct(nome, descricao, preco, estoque);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar o produto.' });
        }
    }

    // Listar produtos
    async getAllProducts(req, res) {
        try {
            const products = await this.productService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar os produtos.' });
        }
    }

    // Atualizar produto
    async updateProduct(req, res) {
        const { id } = req.params;
        const updates = req.body;
        try {
            const updatedProduct = await this.productService.updateProduct(id, updates);
            if (!updatedProduct) {
                res.status(404).json({ error: 'Produto não encontrado.' });
            } else {
                res.status(200).json(updatedProduct);
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar o produto.' });
        }
    }

    // Deletar produto
    async deleteProduct(req, res) {
        const { id } = req.params;
        try {
            const deleted = await this.productService.deleteProduct(id);
            if (!deleted) {
                res.status(404).json({ error: 'Produto não encontrado.' });
            } else {
                res.status(200).json({ message: 'Produto deletado com sucesso.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar o produto.' });
        }
    }
}

module.exports = ProductController;

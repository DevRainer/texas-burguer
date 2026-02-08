# Plano de Correção - Categoria retornando "Uncategorized"

## Status: Concluído

### Etapas:
- [x] Editar OrderController.js para incluir dados da categoria
- [x] Editar ProductController.js para incluir dados da categoria
- [ ] Testar a correção

## Detalhes:
O problema é que as consultas `Product.findAll()` não estão usando a opção `include` para buscar os dados da categoria associada.

## Correções aplicadas:

### OrderController.js:
- Adicionado import de Category
- Adicionado `include` na consulta Product.findAll() com `model: Category`, `as: 'category'` e `attributes: ['name']`

### ProductController.js:
- Adicionado import de Category
- Adicionado `include` na consulta Product.findAll() com `model: Category`, `as: 'category'` e `attributes: ['name']`




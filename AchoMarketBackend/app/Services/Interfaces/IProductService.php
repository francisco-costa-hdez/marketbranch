<?php

namespace App\Services\Interfaces;

use Illuminate\Http\Request;

interface IProductService
{
    public function findAllProducts();

    public function findProductBySubcategory(int $subcategory_id);

    public function findProductByCategory(int $category_id);

    public function findProductById(int $id);

    public function findProductByShop(int $shop_id);

    public function findProductsByString(string $string);    

    public function createProduct(Request $data, int $user_id);

    public function updateProduct(int $id, Request $data);

    public function deleteProduct(int $id);

    public function uploadProductImage(Request $data);

    public function deleteProductImage(int $img_id);

    public function desplegableBusquedas(string $name);

    public function desplegableBusquedasCategoria(string $name, int $category_id);
}

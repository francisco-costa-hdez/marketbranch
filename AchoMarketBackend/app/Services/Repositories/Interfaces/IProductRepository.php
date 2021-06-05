<?php

namespace App\Services\Repositories\Interfaces;

use Illuminate\Http\Request;

interface IProductRepository
{
    public function findAllProducts();

    public function findProductBySubcategory(int $subcategory_id);

    public function findProductByCategory(int $category_id);

    public function findProductByCategoryAndName(int $category_id, string $name);

    public function findProductById(int $id);

    public function findProductByShop(int $shop_id);

    public function findProductsByString($string);

    public function createProduct(Request $request, int $shop_id);

    public function updateProduct(int $id, Request $request);

    public function deleteProduct(int $id);

    public function uploadProductImage(Request $request);

    public function deleteProductImage(int $img_id);

    public function desplegableBusquedas(string $name);

    public function desplegableBusquedasCat(string $name, int $category_id);
}
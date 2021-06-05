<?php

namespace App\Services;

use App\Services\Interfaces\IProductService;
use App\Services\Repositories\ProductRepository;
use Illuminate\Http\Request;

class ProductService implements IProductService
{
    protected $productRepository;

    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function findAllProducts()
    {
        return $this->productRepository->findAllProducts();
    }

    public function findProductBySubcategory(int $subcategory_id)
    {
        return $this->productRepository->findProductBySubcategory($subcategory_id);
    }

    public function findProductByCategory(int $category_id)
    {
        return $this->productRepository->findProductByCategory($category_id);
    }

    public function findProductByCategoryAndName(int $category_id, string $name)
    {
        return $this->productRepository->findProductByCategoryAndName($category_id,$name);
    }

    public function findProductById(int $id)
    {
        return $this->productRepository->findProductById($id);
    }

    public function findProductByShop(int $shop_id)
    {
        return $this->productRepository->findProductByShop($shop_id);
    }

    public function findProductsByString(string $string)
    {
        return $this->productRepository->findProductsByString($string);
    }

    public function createProduct(Request $data, int $shop_id)
    {
       return $this->productRepository->createProduct($data, $shop_id);
    }

    public function updateProduct(int $id, Request $request)
    {
        return $this->productRepository->updateProduct($id, $request);
    }

    public function deleteProduct(int $id)
    {
       return $this->productRepository->deleteProduct($id);
    }

    public function uploadProductImage(Request $request)
    {
        $this->productRepository->uploadProductImage($request);
    }

    public function deleteProductImage(int $img_id)
    {
        $this->productRepository->deleteProductImage($img_id);
    }

    public function desplegableBusquedas(string $name) 
    {
        return $this->productRepository->desplegableBusquedas($name);
    }

    public function desplegableBusquedasCategoria(string $name, int $category_id) 
    {
        return $this->productRepository->desplegableBusquedasCat($name,$category_id);
    }
}
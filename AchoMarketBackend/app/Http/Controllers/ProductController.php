<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    protected $productService;
    
    public function __construct(ProductService $ps)
    {
        $this->productService = $ps;
    }
    public function findAllProducts()
    {
        $products = $this->productService->findAllProducts();
        return response()->json(['products'=> $products],200);
    }

    public function findProductBySubcategory(int $subcategory_id)
    {
        $products = $this->productService->findProductBySubcategory($subcategory_id);
        return response()->json(['products'=> $products],200);
    }

    public function findProductByCategory(int $category_id)
    {
        $products = $this->productService->findProductByCategory($category_id);
        return response()->json(['products'=> $products],200);
    }

    public function findProductByCategoryAndName(int $category_id, string $name)
    {
        $products = $this->productService->findProductByCategoryAndName($category_id,$name);
        return response()->json(['products'=> $products],200);
    }

    public function findProductById(int $id)
    {
        $product = $this->productService->findProductById($id);
        return response()->json(['product'=> $product],200);
    }

    public function findProductByShop(int $shop_id)    
    {
        $products = $this->productService->findProductByShop($shop_id);
        return response()->json(['products'=> $products],200);
    }
    public function findProductsByString(string $string)    
    {
        $products = $this->productService->findProductsByString($string);
        return response()->json(['products'=> $products],200);
    }

    public function createProduct(Request $request)
    {
        if(auth()->user()->tokenCan('shop_user'))
        {
            $shop_id = auth()->user()->shop->id;
            return $this->productService->createProduct($request, $shop_id);  
        }
        else return response()->json(['message'=>'Usuario no autorizado']);
           
    }

    public function updateProduct(int $id, Request $request)
    {
        if(auth()->user()->tokenCan('shop_user'))
        {
            return $this->productService->updateProduct($id, $request);
        }
        else return response()->json(['message'=>'Usuario no autorizado']);
        
    }

    public function deleteProduct(int $id)
    {
        if(auth()->user()->tokenCan('shop_user'))
        {
            return $this->productService->deleteProduct($id);
        }
        else return response()->json(['message'=>'Usuario no autorizado']);
        
    }

    public function uploadProductImage(Request $request)
    {
        $this->productService->uploadProductImage($request);
    }

    public function deleteProductImage(int $img_id)
    {
        $this->productService->deleteProductImage($img_id);
    }
}

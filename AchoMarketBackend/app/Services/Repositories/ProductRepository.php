<?php

namespace App\Services\Repositories;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductRepository
{

    protected $product;

    public function __construct(Product $product)
    {
        $this->product = $product;
    }

    public function findAllProducts()
    {
        $allProducts = DB::select('SELECT p.id, p.name,p.price,p.discount,p.shop_id,shops.name as shop_name,
        categories.id as category_id,p.subcategory_id as subcategory_id,ifnull(round(AVG(r.rating),1),0) 
        AS media_rating FROM (((products p LEFT JOIN reviews r ON p.id = r.product_id) JOIN shops 
        ON p.shop_id = shops.id) JOIN subcategories ON p.subcategory_id = subcategories.id) JOIN categories 
        on subcategories.category_id = categories.id GROUP By p.id, p.name, p.price,p.discount,p.shop_id,
        shops.name,categories.id,p.subcategory_id
        ORDER BY p.created_at DESC');
        return $allProducts;
    }

    public function findProductBySubcategory(int $subcategory_id)
    {
        $products = DB::select('SELECT p.id, p.name,p.price,p.discount,p.shop_id, ifnull(round(AVG(r.rating),1),0)  AS media_rating
        FROM products p LEFT JOIN reviews r 
        ON p.id = r.product_id
        WHERE p.subcategory_id = ?
        GROUP By p.id, p.name, p.price,p.discount,p.shop_id
        ORDER By p.created_at DESC',[$subcategory_id]);
        return $products;
    }

    public function findProductByCategory(int $category_id)
    {
        $products = DB::select('SELECT p.id, p.name,p.price,p.discount,p.shop_id, ifnull(round(AVG(r.rating),1),0)  AS media_rating
        FROM (products p LEFT JOIN reviews r 
        ON p.id = r.product_id) JOIN subcategories s ON p.subcategory_id = s.id
        WHERE s.category_id = ?
        GROUP By p.id, p.name,p.price,p.discount,p.shop_id
        ORDER BY p.created_at DESC',[$category_id]);
        return $products;

    }

    public function findProductByCategoryAndName(int $category_id, string $name)
    {
        $str = '%'.$name.'%';
        $products = DB::select('SELECT p.id, p.name,p.price,p.discount,p.shop_id, ifnull(round(AVG(r.rating),1),0)  AS media_rating
        FROM (products p LEFT JOIN reviews r 
        ON p.id = r.product_id) JOIN subcategories s ON p.subcategory_id = s.id
        WHERE s.category_id = ? and p.name like ?
        GROUP By p.id, p.name,p.price,p.discount,p.shop_id
        ORDER BY p.created_at DESC',[$category_id,$str]);
        return $products;

    }

    public function findProductById(int $id)
    {
        $product = DB::select('SELECT p.*, ifnull(round(AVG(r.rating),1),0)  AS media_rating
        FROM (products p LEFT JOIN reviews r 
        ON p.id = r.product_id)
        WHERE p.id = ?
        GROUP By p.id, p.name,p.price,p.discount,p.shop_id,p.description,p.stock,p.availability,p.subcategory_id,p.trademark_id,p.created_at,p.updated_at
        ORDER BY p.created_at DESC',[$id]);
        return $product;
    }

    public function findProductByShop(int $shop_id)    
    {
        $products = DB::select('SELECT p.id, p.name,p.price,p.discount, ifnull(round(AVG(r.rating),1),0)  AS media_rating
        FROM products p LEFT JOIN reviews r 
        ON p.id = r.product_id
        WHERE p.shop_id = ?
        GROUP By p.id, p.name, p.price,p.discount,p.shop_id
        ORDER BY p.created_at DESC',[$shop_id]);
        return $products;
    }

    public function findProductsByString($string)    
    {
        $str = '%'.$string.'%';
        $products = DB::select("SELECT p.id, p.name,p.price,p.discount,p.shop_id,shops.name as shop_name,
        categories.id as category_id,p.subcategory_id as subcategory_id,ifnull(round(AVG(r.rating),1),0) 
        AS media_rating FROM (((products p LEFT JOIN reviews r ON p.id = r.product_id) JOIN shops 
        ON p.shop_id = shops.id) JOIN subcategories ON p.subcategory_id = subcategories.id) JOIN categories 
        on subcategories.category_id = categories.id 
        WHERE p.name LIKE ? OR p.description LIKE ?
        GROUP BY p.id, p.name, p.price,p.discount,p.shop_id, shops.name,categories.id,p.subcategory_id
        ORDER BY p.created_at DESC",[$str,$str]);
        return $products;
    }

    public function createProduct(Request $request)
    {
         $this->product->create([
            'name' => $request->name,
            'price' => $request->price,
            'description'=> $request->description,
            'discount' => $request->discount,
            'stock'=> $request->stock,
            'availability' =>  $request->availability,
            'subcategory_id' => $request->subcategory_id,
            'trademark_id' => $request->trademark_id,
            'shop_id' => $request->shop_id
         ]);

         return response()->json(['message' => 'Producto creado correctamente']);
    }

    public function updateProduct(int $id, Request $request)
    {
        $this->product->find($id)->update([
            'name' => $request->name,
            'price' => $request->price,
            'description' => $request->description,
            'discount' => $request->discount,
            'stock'=> $request->stock,
            'availability' =>  $request->availability,
            'subcategory_id' => $request->subcategory_id,
            'trademark_id' =>  $request->trademark_i,
        ]);

    }

    public function deleteProduct(int $id)
    {
        $this->product->destroy($id);
    }

    public function uploadProductImage(Request $request)
    {
        
        $this->product->find($request->product_id)
        ->images()->create([
        'image' => $request->image,
        'product_id' => $request->product_id
        ]);
    }

    public function deleteProductImage($img_id)
    {
        ProductImage::find($img_id)->delete();
    }


}
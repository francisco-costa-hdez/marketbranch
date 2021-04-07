<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function findAllProducts()
    {
        $allProducts = DB::select('SELECT p.id, p.name,p.price,p.discount,p.shop_id,shops.name as shop_name,
        categories.id as category_id,p.subcategory_id as subcategory_id,ifnull(round(AVG(r.rating),1),0) 
        AS media_rating FROM (((products p LEFT JOIN reviews r ON p.id = r.product_id) JOIN shops 
        ON p.shop_id = shops.id) JOIN subcategories ON p.subcategory_id = subcategories.id) JOIN categories 
        on subcategories.category_id = categories.id GROUP By p.id, p.name, p.price,p.discount,p.shop_id,
        shops.name,categories.id,p.subcategory_id
        ORDER BY p.created_at DESC');
        return response()->json(['products'=> $allProducts],200);
    }

    public function findProductBySubcategory($subcategory_id)
    {
        $products = DB::select('SELECT p.id, p.name,p.price,p.discount,p.shop_id, ifnull(round(AVG(r.rating),1),0)  AS media_rating
        FROM products p LEFT JOIN reviews r 
        ON p.id = r.product_id
        WHERE p.subcategory_id = ?
        GROUP By p.id, p.name, p.price,p.discount,p.shop_id
        ORDER By p.created_at DESC',[$subcategory_id]);
         return response()->json(['products'=> $products],200);
    }

    public function findProductByCategory($category_id)
    {
        $products = DB::select('SELECT p.id, p.name,p.price,p.discount,p.shop_id, ifnull(round(AVG(r.rating),1),0)  AS media_rating
        FROM (products p LEFT JOIN reviews r 
        ON p.id = r.product_id) JOIN subcategories s ON p.subcategory_id = s.id
        WHERE s.category_id = ?
        GROUP By p.id, p.name,p.price,p.discount,p.shop_id
        ORDER BY p.created_at DESC',[$category_id]);
        return response()->json(['products'=> $products],200);

    }

    public function findProductById($id)
    {
        $product = DB::select('SELECT p.*, ifnull(round(AVG(r.rating),1),0)  AS media_rating
        FROM (products p LEFT JOIN reviews r 
        ON p.id = r.product_id)
        WHERE p.id = ?
        GROUP By p.id, p.name,p.price,p.discount,p.shop_id,p.description,p.stock,p.availability,p.subcategory_id,p.trademark_id,p.created_at,p.updated_at
        ORDER BY p.created_at DESC',[$id]);
        return response()->json(['product'=> $product],200);
    }

    public function findProductByShop($shop_id)    
    {
        $products = DB::select('SELECT p.id, p.name,p.price,p.discount, ifnull(round(AVG(r.rating),1),0)  AS media_rating
        FROM products p LEFT JOIN reviews r 
        ON p.id = r.product_id
        WHERE p.shop_id = ?
        GROUP By p.id, p.name, p.price,p.discount,p.shop_id
        ORDER BY p.created_at DESC',[$shop_id]);
        return response()->json(['products'=> $products],200);
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
        return response()->json(['products'=> $products],200);
    }

    public function createProduct(Request $request){
         Product::create([
            'name' => $request->name,
            'price' => $request->price,
            'discount' => $request->discount,
            'stock' => $request->stock,
            'availability' => $request->availability,
            'description' => $request->description,
            'shop_id'=> $request->shop_id,
            'subcategory_id' => $request->subcategory_id,
            'trademark_id' => $request->trademark_id
        ]);
    }
    public function updateProduct(Request $request){
           
        $product = Product::find($request->id);
            $product->name = $request->name;
            $product->price = $request->price;
            $product->description= $request->description;
            $product->discount = $request->discount;
            $product->stock= $request->stock;
            $product->availability =  $request->availability;
        $product->save();
    }

    public function deleteProduct($id){
        $product = Product::find($id);
        $product->delete();
    }

    public function uploadProductImage(Request $request){
        ProductImage::create([
            'image' => $request->image,
            'product_id' => $request->product_id
        ]);
    }

    public function deleteProductImage($img_id){
        $img = ProductImage::find($img_id);
        $img->delete();
    }
}

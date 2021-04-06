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
        $allProducts = DB::select('SELECT p.id, p.name,p.price,p.discount,p.shop_id, ifnull(AVG(r.rating),0) AS media_rating
        FROM products p LEFT JOIN reviews r 
        ON p.id = r.product_id
        GROUP By p.id, p.name, p.price,p.discount,p.shop_id
        ORDER BY p.created_at ASC');
        return response()->json(['products'=> $allProducts],200);
    }

    public function findProductBySubcategory($subcategory_id)
    {
        $products = DB::select('SELECT p.id, p.name,p.price,p.discount,p.shop_id, ifnull(AVG(r.rating),0) AS media_rating
        FROM products p LEFT JOIN reviews r 
        ON p.id = r.product_id
        WHERE p.subcategory_id = ?
        GROUP By p.id, p.name, p.price,p.discount,p.shop_id',[$subcategory_id]);
         return response()->json(['products'=> $products],200);
    }

    public function findProductByCategory($category_id)
    {
        $products = DB::select('SELECT p.id, p.name,p.price,p.discount,p.shop_id, ifnull(AVG(r.rating),0) AS media_rating
        FROM (products p LEFT JOIN reviews r 
        ON p.id = r.product_id) JOIN subcategories s ON p.subcategory_id = s.id
        WHERE s.category_id = ?
        GROUP By p.id, p.name,p.price,p.discount,p.shop_id
        ORDER BY p.created_at ASC',[$category_id]);
        return response()->json(['products'=> $products],200);

    }

    public function findProductById($id)
    {
        $product = DB::select('SELECT p.*, ifnull(AVG(r.rating),0) AS media_rating
        FROM (products p LEFT JOIN reviews r 
        ON p.id = r.product_id)
        WHERE p.id = ?
        GROUP By p.id, p.name,p.price,p.discount,p.shop_id,p.description,p.stock,p.availability,p.subcategory_id,p.trademark_id,p.created_at,p.updated_at
        ORDER BY p.created_at ASC',[$id]);
        return response()->json(['product'=> $product],200);
    }

    public function findProductByShop($shop_id)    
    {
        $products = DB::select('SELECT p.id, p.name,p.price,p.discount, ifnull(AVG(r.rating),0) AS media_rating
        FROM products p LEFT JOIN reviews r 
        ON p.id = r.product_id
        WHERE p.shop_id = ?
        GROUP By p.id, p.name, p.price,p.discount,p.shop_id
        ORDER BY p.created_at ASC',[$shop_id]);
        return response()->json(['products'=> $products],200);
    }
    public function findProductsByString($string)    
    {
        $str = '%'.$string.'%';
        $products = DB::select("SELECT p.id, p.name,p.price,p.discount,p.shop_id, ifnull(AVG(r.rating),0) AS media_rating
        FROM products p LEFT JOIN reviews r 
        ON p.id = r.product_id
        WHERE p.name LIKE ? OR p.description LIKE ?
        GROUP By p.id, p.name, p.price,p.discount,p.shop_id
        ORDER BY p.created_at ASC",[$str,$str]);
        return response()->json(['products'=> $products],200);
    }

    public function createProduct(Request $request){
         $product = Product::create([
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
        $product->image = $request->image;
    }
    // public function update(Request $request,Product $product){

    //     $product = Product::create([ 
    //         'name'=>$request->name,
    //         'price' => $request->price,
    //         'description'=>$request->description,
    //         'discount' => $request->discount,
    //         'stock'=>$request->stock,
    //         'availability' => $request->availability,
    //     ]);
    //     $product->images = $request->images;
    //     $product->save();
    // }
}

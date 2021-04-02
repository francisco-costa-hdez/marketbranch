<?php

namespace App\Http\Controllers;

use App\Models\Product;
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
        $allProducts = Product::orderBy('created_at','asc')->get();
        return response()->json($allProducts,200);
    }

    public function findProductBySubcategory($subcategory_id)
    {
        $products = Product::where('subcategory_id',$subcategory_id)->get();
         return response()->json($products,200);
    }

    public function findProductByCategory($category_id)
    {
        $products = DB::select('SELECT * 
        FROM products JOIN subcategories on products.subcategory_id = subcategories.id
        WHERE subcategories.category_id = ?',[$category_id]);
        return response()->json($products,200);

    }

    public function findProductById($id)
    {
        $product = Product::find($id);
        return response()->json($product,200);
    }

    public function findProductByShop($shop_id)    
    {
        $products = Product::where('shop_id',$shop_id)->get();
        return response()->json($products,200);
    }
    public function findProductByString($string)    
    {
        $products = Product::where('name','LIKE','%'.$string.'%','OR','description','LIKE','%'.$string.'%')->get();
        return response()->json($products,200);
    }

    // public function storeProduct(Request $request){
    //     $product = Product::create([
    //         'name'=>$request->name,
    //         'price' => $request->price,
    //         'description'=>$request->description,
    //         'discount' => $request->discount,
    //         'stock'=>$request->stock,
    //         'availability' => $request->availability,
    //     ]);
    //     $product->save();
    // }
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

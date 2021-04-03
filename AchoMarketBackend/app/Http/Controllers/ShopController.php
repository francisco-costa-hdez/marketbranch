<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ShopController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    //ordenar por valoracion, por creacion, por cant
    public function findAllShops()
    {
        $allShops = Shop::orderBy('created_at','asc')->get();
        return response()->json($allShops,200);
    }

    public function findShopByString($string){
       $shops = Shop::where('name','LIKE','%'.$string.'%','OR','description','LIKE','%'.$string.'%')->get();
       return response()->json($shops,200);
    }
    public function findShopByProduct($product_id){
        $shops = DB::select('SELECT shops.* 
        FROM shops JOIN products ON shops.id = products.shop_id
        WHERE products.id = ?',[$product_id]);
        return response()->json($shops,200);
     }

}

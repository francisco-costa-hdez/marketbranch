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
    public function findShopById($id)
    {
        $shop = Shop::find($id);
        return response()->json(['shop'=> $shop],200);
    }
    public function findAllShops()
    {
        $allShops = Shop::orderBy('created_at','desc')->get();
        return response()->json(['shops'=> $allShops],200);
    }

    public function findShopByString($string){
        $str = "%". $string . "%";
        $shops = DB::select('select * from shops where name like ? OR description like ? order by created_at desc', [$str,$str]);
       return response()->json(['shops' =>$shops],200);

    }
    public function findShopByProduct($product_id){
        $shops = DB::select('SELECT shops.* 
        FROM shops JOIN products ON shops.id = products.shop_id
        WHERE products.id = ?',[$product_id]);
        return response()->json(['shops'=> $shops],200);
     }

     public function createShop(Request $request){
        Shop::create([
           'name' => $request->name,
           'tlf' => $request->tlf,
           'description' => $request->description,
           'address'=> $request->address,
           'email' => $request->email,
           'shop_user_id' => $request->shop_user_id
       ]);
   }
   public function updateShop(Request $request){
          
       $shop = Shop::find($request->id);
           $shop->name = $request->name;
           $shop->description = $request->description;
           $shop->address= $request->address;
           $shop->email = $request->email;
           $shop->shop_user_id= $request->shop_user_id;
       $shop->save();
   }
}

<?php

namespace App\Http\Controllers;

use App\Models\ShopUser;
use Illuminate\Http\Request;

class ShopUserController extends Controller
{
    public function findShopUserById($id)
    {
        $user = ShopUser::find($id);
        return response()->json(['user' => $user], 200);
    }

    public function createShopUser(Request $request)
    {
        $user = ShopUser::create([
            "admin_name" => $request->name,
            "email" => $request->email,
            "nif" => $request->nif,
            "profile_img" => $request->profile_img,
            "password" => encrypt($request->password)
        ]);
        $user->save();
    }

    public function updateshopUser(Request $request)
    {
            $shopUser = ShopUser::find($request->id);
            $shopUser->name = $request->name;
            $shopUser->email = $request->email;
            $shopUser->nif = $request->nif;
            $shopUser->profile_img = $request->profile_img;
            $shopUser->password = encrypt($request->password);
            $shopUser->save();
    }

    
    public function deleteShopUser($id){
        $user = ShopUser::find($id);
        $user->delete();
    }
}

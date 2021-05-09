<?php

namespace App\Http\Controllers;

use App\Models\ShopUser;
use App\Services\ShopUserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ShopUserController extends Controller
{
    protected $user;

    public function __construct(ShopUserService $ss)
    {
        $this->user = $ss;
    }

    public function findShopUserById(int $id)
    {
        if(auth()->user()->id == $id && auth()->user()->tokenCan('shop_user'))
        {
            $user = $this->user->findShopUserById($id);
            return response()->json(['user' => $user], 200);
        }
        return response()->json(['message'=>'No tienes acceso a esta página']);
    }

    public function createShopUser(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:shop_users,email',
            "nif" => 'required|unique:shop_users,nif|max:9',
            "profile_img" => 'required',
            "password" => 'required|min:8|max:16'
        ]);
        if ($validator->fails()) 
        {
            return response()->json($validator->errors(), 404);
        }
        return $this->user->createShopUser($request);
    }

    public function login(Request $request)
    {
        return $this->user->login($request);
    }

    public function logout(Request $request)
    {
        return $this->user->logout($request);
    }

    public function updateShopUser(Request $request)
    {
        if(auth()->user()->id == $request->id && auth()->user()->tokenCan('shop_user'))
        {
            return $this->user->updateShopUser($request);  
        }
        else return response()->json(['message'=>'Usuario no autorizado']);
    }
    
    public function deleteShopUser(int $id)
    {
        if(auth()->user()->id == $id && auth()->user()->tokenCan('shop_user'))
        {
            return $this->user->deleteShopUser($id);  
        }
        else return response()->json(['message'=>'Usuario no autorizado']);
    }
}

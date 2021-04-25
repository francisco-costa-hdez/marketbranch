<?php

namespace App\Services\Repositories;

use App\Models\ShopUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ShopUserRepository
{
    protected $user;

    public function __construct(ShopUser $user)
    {
        $this->user = $user;
    }

    public function findShopUserById(int $id)
    {
        return $this->user->find($id);
    }

    public function createShopUser(Request $request)
    {
        $user = $this->user->create([
            "admin_name" => $request->name,
            "email" => $request->email,
            "nif" => $request->nif,
            "profile_img" => $request->profile_img,
            "password" => bcrypt($request->password)
        ])->assignRole('shop_user');

        $token = $user->createToken('shop_user',['shop_user','user'])->plainTextToken;
        $response = [
            'user' => $user,
            'token' => $token,
        ];

        return response($response, 201);
    }

    public function updateShopUser(Request $request)
    {
            $this->user->find($request->id)->update([
                'name' => $request->name,
                'email' => $request->email,
                'nif' => $request->nif,
                'profile_img' => $request->profile_img,
                'password' => bcrypt($request->password),
            ]);

            return response()->json(['message' => 'Los datos se han actualizado correctamente']);
    }

    public function login(Request $request)
    {
       $user = $this->user->where('email',$request->email)->first();
       
       if(!$user || !Hash::check($request->password, $user->password))
       {
            return response(['message' => 'credenciales no válidas'],401);
       }

       $token = $user->createToken('shop')->plainTextToken;
       $response = [
           'message' => 'Sesión iniciada',
           'user' => $user,
           'token' => $token,
       ];

       return response($response, 201);
    }

    public function logout(Request $request)
    {
        $this->user->find($request->id)->tokens()->delete();
        return ['message' => 'logged out'];
    }
    
    public function deleteShopUser(int $id)
    {
        $this->user->destroy($id);
        return response()->json(['message' => 'El usuario se ha borrado correctamente']);
    }
    
}

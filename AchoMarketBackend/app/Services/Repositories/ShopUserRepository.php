<?php

namespace App\Services\Repositories;

use App\Models\Shop;
use App\Models\ShopUser;
use App\Services\Repositories\Interfaces\IShopUserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ShopUserRepository implements IShopUserRepository
{
    protected $user;

    public function __construct(ShopUser $user)
    {
        $this->user = $user;
    }

    public function findShopUserById(int $id)
    {
        return DB::select('select shop_users.*,shops.id as shop_id from shop_users join shops on shop_users.id = 
        shops.shop_user_id where shop_users.id = ?', [$id]);
    }

    public function createShopUser(Request $request)
    {
        $user = $this->user->create([
            "admin_name" => $request->admin_name,
            "email" => $request->email,
            "nif" => $request->nif,
            "profile_img" => $request->profile_img,
            "password" => Hash::make($request->password)
        ])->assignRole('shop_user');

        Shop::create([
            'shop_user_id' => $user->id
        ]);
        $token = $user->createToken('shop_user', ['shop_user', 'user'])->plainTextToken;
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
        ]);

        return response()->json(['message' => 'Los datos se han actualizado correctamente']);
    }

    public function updatePassword(Request $request)
    {
        $user = $this->user->find(auth()->user()->id);
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Los contraseña anterior no es correcta']);
        }
        $user->update([
            'password' => Hash::make($request->new_password)
        ]);
        return response()->json(['message' => 'Los contraseña se ha actualizado correctamente']);
    }

    public function login(Request $request)
    {
        $user = $this->user->where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response(['message' => 'credenciales no válidas']);
        }

        $token = $user->createToken('shop')->plainTextToken;
        $response = [
            'message' => 'Sesión iniciada',
            'user' => $user,
            'shop_id' => $this->user->find($user->id)->shop->id,
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

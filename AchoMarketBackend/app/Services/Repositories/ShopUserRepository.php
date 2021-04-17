<?php

namespace App\Services\Repositories;

use App\Models\ShopUser;
use Illuminate\Http\Request;

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
        $this->user->create([
            "admin_name" => $request->name,
            "email" => $request->email,
            "nif" => $request->nif,
            "profile_img" => $request->profile_img,
            "password" => encrypt($request->password)
        ])->assignRole('shop_user');
    }

    public function updateshopUser(Request $request)
    {
            $this->user->find($request->id)->update([
                'name' => $request->name,
                'email' => $request->email,
                'nif' => $request->nif,
                'profile_img' => $request->profile_img,
                'password' => encrypt($request->password),
            ]);
    }
    
    public function deleteShopUser(int $id)
    {
        $this->user->destroy($id);
    }

}

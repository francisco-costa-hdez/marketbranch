<?php

namespace App\Http\Controllers;

use App\Models\ShopUser;
use App\Services\ShopUserService;
use Illuminate\Http\Request;

class ShopUserController extends Controller
{
    protected $user;

    public function __construct(ShopUserService $ss)
    {
        $this->user = $ss;
    }

    public function findShopUserById(int $id)
    {
        $user = $this->user->findShopUserById($id);
        return response()->json(['user' => $user], 200);
    }

    public function createShopUser(Request $request)
    {
        $this->user->createShopUser($request);
    }

    public function updateshopUser(Request $request)
    {
        $this->user->updateshopUser($request);
    }
    
    public function deleteShopUser(int $id)
    {
        $this->user->deleteShopUser($id);
    }
}

<?php

namespace App\Http\Controllers;

use App\Services\CartService;
use Illuminate\Http\Request;

class CartController extends Controller
{
    protected $cartService;

    public function __construct(CartService $cs)
    {
        $this->cartService = $cs;
    }

    public function addProduct(int $product_id, int $user_id)
    {
        return $this->cartService->addProduct($product_id,$user_id);
    }

    public function deleteProduct(int $product_id, int $user_id)
    {
        return $this->cartService->deleteProduct($product_id,$user_id);
    }

    public function getProducts(int $user_id)
    {
        return $this->cartService->getProducts($user_id);
    }

        public function updateQuantity( int $user_id, int $quantity, int $product_id)
    {
        return $this->cartService->updateQuantity($quantity, $user_id, $product_id);
    }
}

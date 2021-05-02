<?php

namespace App\Services;

use App\Services\Interfaces\ICartService;
use App\Services\Repositories\CartRepository;
use Illuminate\Http\Request;

class CartService implements ICartService
{
    protected $cartRepository;

    public function __construct(CartRepository $cr)
    {
        $this->cartRepository = $cr;
    }

    public function addProduct(int $product_id, int $user_id)
    {
        return $this->cartRepository->addProduct($product_id,$user_id);
    }

    public function deleteProduct(int $product_id, int $user_id)
    {
        return $this->cartRepository->deleteProduct($product_id,$user_id);
    }

    public function getProducts(int $cart_id)
    {
        return $this->cartRepository->getProducts($cart_id);
    }

    public function updateQuantity(int $quantity, int $cart_id, int $product_id)
    {
        return $this->cartRepository->updateQuantity($quantity, $cart_id, $product_id);
    }
}
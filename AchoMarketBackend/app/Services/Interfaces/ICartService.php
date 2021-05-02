<?php

namespace App\Services\Interfaces;

use Illuminate\Http\Request;

interface ICartService
{
    public function addProduct(int $product_id, int $user_id);

    public function deleteProduct(int $product_id, int $user_id);

    public function getProducts(int $cart_id);

    public function updateQuantity(int $quantity, int $cart_id, int $product_id);
}

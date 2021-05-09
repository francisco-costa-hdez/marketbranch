<?php

namespace App\Services\Interfaces;

use Illuminate\Http\Request;

interface ICartService
{
    public function addProduct(int $product_id, int $user_id);

    public function deleteProduct(int $product_id, int $user_id);

    public function getProducts(int $user_id);

    public function updateQuantity(int $quantity, int $user_id, int $product_id);
}

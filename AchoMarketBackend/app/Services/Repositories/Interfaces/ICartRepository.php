<?php

namespace App\Services\Repositories\Interfaces;

use Illuminate\Http\Request;

interface ICartRepository
{
    public function addProduct(int $product_id, int $user_id);

    public function deleteProduct(int $product_id, int $user_id);

    public function getProducts(int $user_id);

    public function updateQuantity(int $quantity, int $user_id, int $product_id);
}
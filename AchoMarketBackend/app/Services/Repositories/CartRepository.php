<?php

namespace App\Services\Repositories;

use App\Models\Cart;
use App\Models\ClientUser;
use App\Models\Product;
use App\Services\Repositories\Interfaces\ICartRepository;
use Illuminate\Support\Facades\DB;

class CartRepository implements ICartRepository
{
    protected $cart;

    public function __construct(Cart $cart)
    {
        $this->cart = $cart;
    }

    public function addProduct(int $product_id, int $user_id)
    {
        if(auth()->user())
        {
            if(auth()->user()->id == $user_id && auth()->user()->tokenCan('client_user'))
            {
                $cart = ClientUser::find($user_id)->cart;
                DB::insert('insert into cart_product (cart_id, product_id, quantity) values (?, ?, ?)', [$cart->id, $product_id, 1]);
                return response()->json(['message' => 'El producto se ha añadido al carrito']);
            }
        }
        return response()->json(['message'=>'Inicia sesión para acceder al carrito']);
    }

    public function deleteProduct(int $product_id, int $user_id)
    {
        if(auth()->user())
        {
            if(auth()->user()->id == $user_id && auth()->user()->tokenCan('client_user'))
            {
                $cart = ClientUser::find($user_id)->cart;
                DB::delete('delete from cart_product where product_id = ? and cart_id = ?', [$product_id, $cart->id]);
                return response()->json(['message' => 'El producto se ha retirado del carrito']);
            }
        }
        return response()->json(['message'=>'Inicia sesión para acceder al carrito']);

    }

    public function getProducts(int $user_id)
    {
        $cart_id = ClientUser::find($user_id)->cart->id;
        if(auth()->user())
        {
            if(auth()->user()->id == $user_id && auth()->user()->tokenCan('client_user'))
            {
                $products = DB::select('select p.id, p.name, p.price, p.discount, cp.quantity from products p join 
                cart_product cp on p.id = cp.product_id WHERE cp.cart_id = ?', [$cart_id]);
                return response()->json(['products' => $products]);
            }
        }
        return response()->json(['message'=>'Inicia sesión para acceder al carrito']);


    }

    public function updateQuantity(int $quantity, int $user_id, int $product_id)
    {
        $cart_id = ClientUser::find($user_id)->cart->id;
        if(auth()->user())
        {
            if(auth()->user()->id == $user_id && auth()->user()->tokenCan('client_user'))
            {
                DB::update('UPDATE cart_product SET quantity = ? WHERE cart_id = ? and product_id = ?', [$quantity, $cart_id, $product_id]);
                return response()->json(['message' => 'Acción completada correctamente']);
            }
        }
        return response()->json(['message'=>'Inicia sesión para acceder al carrito']);
    }
}

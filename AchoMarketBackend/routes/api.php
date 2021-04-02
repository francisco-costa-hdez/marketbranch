<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ShopController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('products',[ProductController::class, 'findAllProducts']);
Route::get('products/{id}',[ProductController::class, 'findProductById']);
Route::get('products/shop/{shop_id}',[ProductController::class, 'findProductByShop']);
Route::get('products/subcategory/{subcategory_id}',[ProductController::class, 'findProductBySubcategory']);
Route::get('products/category/{category_id}',[ProductController::class, 'findProductByCategory']);
Route::get('products/str/{string}',[ProductController::class, 'findProductByString']);
// Route::post('products/{shop_id}/create',[ProductController::class, 'store'])->name('store.product');

Route::get('shops',[ShopController::class, 'findAllShops']);
Route::get('shops/{string}',[ShopController::class, 'findShopByString']);
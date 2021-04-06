<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClientUserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\ShopUserController;
use App\Models\ClientUser;
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
Route::get('products/str/{string}',[ProductController::class, 'findProductsByString']);
Route::post('products/create',[ProductController::class, 'createProduct']);
Route::delete('products/delete/{id}',[ProductController::class, 'deleteProduct']);
Route::post('products/uploadImage', [ProductController::class, 'uploadProductImage']);
Route::delete('products/delete/img/{img_id}',[ProductController::class, 'deleteProductImage']);

Route::get('shops',[ShopController::class, 'findAllShops']);
Route::get('shops/{id}',[ShopController::class, 'findShopById']);
Route::get('shops/product/{product_id}',[ShopController::class, 'findShopByProduct']);
Route::get('shops/str/{string}',[ShopController::class, 'findShopByString']);
Route::post('shop/create',[ShopController::class, 'createShop']);
Route::put('shop/update',[ShopController::class, 'updateShop']);
Route::post('shop/uploadImage', [ShopController::class, 'uploadShopImage']);
Route::delete('shop/delete/img/{img_id}',[ShopController::class, 'deleteShopImage']);
Route::delete('shop/delete/{id}',[ShopController::class,'deleteShop']);

Route::get('categories',[CategoryController::class,'findAllCategories']);
Route::get('subcategories/{category_id}',[CategoryController::class,'findSubcategoryByCategoryId']);
Route::get('category/subcategory/{subcategory_id}',[CategoryController::class,'findCategoryBySubcategoryId']);

Route::get('clientuser/{id}',[ClientUserController::class,'findClientUserById']);
Route::post('clientuser/create',[ClientUserController::class,'createClientUser']);
Route::put('clientuser/update', [ClientUserController::class, 'updateClientUser']);
Route::delete('clientuser/delete/{id}',[ClientUserController::class,'deleteClientUser']);

Route::get('shopuser/{id}',[ShopUserController::class,'findShopUserById']);
Route::post('shopuser/create',[ShopUserController::class,'createShopUser']);
Route::put('shopuser/update', [ShopUserController::class, 'updateShopUser']);
Route::delete('shopuser/delete/{id}',[ShopUserController::class,'deleteShopUser']);
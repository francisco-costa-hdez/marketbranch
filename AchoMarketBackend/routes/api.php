<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClientUserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\ShopUserController;
use Illuminate\Support\Facades\Route;




Route::get('products', [ProductController::class, 'findAllProducts']);
Route::get('products/{id}', [ProductController::class, 'findProductById']);
Route::get('products/shop/{shop_id}', [ProductController::class, 'findProductByShop']);
Route::get('products/subcategory/{subcategory_id}', [ProductController::class, 'findProductBySubcategory']);
Route::get('products/category/{subcategory_id}/name/{name}', [ProductController::class, 'findProductByCategoryAndName']);
Route::get('products/category/{category_id}', [ProductController::class, 'findProductByCategory']);
Route::get('products/str/{string}', [ProductController::class, 'findProductsByString']);

Route::get('shops', [ShopController::class, 'findAllShops']);
Route::get('shops/{id}', [ShopController::class, 'findShopById']);
Route::get('shops/product/{product_id}', [ShopController::class, 'findShopByProduct']);
Route::get('shops/str/{str}', [ShopController::class, 'findShopByStr']);

Route::get('categories', [CategoryController::class, 'findAllCategories']);
Route::get('subcategories/{category_id}', [CategoryController::class, 'findSubcategoryByCategoryId']);
Route::get('category/subcategory/{subcategory_id}', [CategoryController::class, 'findCategoryBySubcategoryId']);

Route::post('clientuser/create', [ClientUserController::class, 'createClientUser']);
Route::post('clientuser/login', [ClientUserController::class, 'login']);

Route::post('shopuser/create', [ShopUserController::class, 'createShopUser']);
Route::post('shopuser/login', [ShopUserController::class, 'login']);


Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('products/create', [ProductController::class, 'createProduct']);
    Route::put('products/update/{id}', [ProductController::class, 'updateProduct']);
    Route::delete('products/delete/{id}', [ProductController::class, 'deleteProduct']);
    Route::post('products/uploadImage', [ProductController::class, 'uploadProductImage']);
    Route::delete('products/delete/img/{img_id}', [ProductController::class, 'deleteProductImage']);

    Route::post('shop/create', [ShopController::class, 'createShop']);
    Route::post('shop/uploadImage', [ShopController::class, 'uploadShopImage']);
    Route::put('shop/update', [ShopController::class, 'updateShop']);
    Route::delete('shop/delete/img/{img_id}', [ShopController::class, 'deleteShopImage']);
    Route::delete('shop/delete/{id}', [ShopController::class, 'deleteShop']);

    Route::put('clientuser/update', [ClientUserController::class, 'updateClientUser']);
    Route::delete('clientuser/delete/{id}', [ClientUserController::class, 'deleteClientUser']);
    Route::get('clientuser/{id}', [ClientUserController::class, 'findClientUserById']);
    Route::post('clientuser/logout', [ClientUserController::class, 'logout']);

    Route::get('shopuser/{id}', [ShopUserController::class, 'findShopUserById']);
    Route::put('shopuser/update', [ShopUserController::class, 'updateShopUser']);
    Route::delete('shopuser/delete/{id}', [ShopUserController::class, 'deleteShopUser']);
    Route::post('shopuser/logout', [ShopUserController::class, 'logout']);

    Route::get('cart/products/{cart_id}', [CartController::class, 'getProducts']);
    Route::post('cart/add/{product_id}/{user_id}', [CartController::class, 'addProduct']);
    Route::delete('cart/delete/{product_id}/{user_id}', [CartController::class, 'deleteProduct']);
    Route::put('cart/update_quantity/{cart_id}/{quantity}/{product_id}', [CartController::class, 'updateQuantity']);
});


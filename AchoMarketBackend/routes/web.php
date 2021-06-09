<?php

use App\Http\Controllers\ClientUserController;
use App\Http\Controllers\ShopUserController;
use App\Models\ClientUser;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $user = ClientUser::find(1);
    return view('welcome',['clientUser' => $user]);
});
Route::get('/register/verification/{confirmation_code}', [ClientUserController::class, 'verify']);
Route::get('/register-2/verification/{confirmation_code}', [ShopUserController::class, 'verify']);
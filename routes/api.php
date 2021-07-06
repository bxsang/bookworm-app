<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\BookController;
use App\Http\Controllers\API\UserController;

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

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::apiResource('users', UserController::class)->middleware('auth:api');
Route::apiResource('books', BookController::class)->middleware('auth:api');
Route::get('most-discount-books', [BookController::class, 'getMostDiscount'])->middleware('auth:api');
Route::get('recommended-books', [BookController::class, 'getRecommended'])->middleware('auth:api');
Route::get('popular-books', [BookController::class, 'getPopular'])->middleware('auth:api');

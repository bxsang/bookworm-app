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

Route::get('books/most-discount', [BookController::class, 'getMostDiscount'])->middleware('auth:api');
Route::get('books/recommended', [BookController::class, 'getRecommended'])->middleware('auth:api');
Route::get('books/popular', [BookController::class, 'getPopular'])->middleware('auth:api');
Route::get('books/by/category/{category_id}', [BookController::class, 'getByCategory'])->middleware('auth:api');
Route::get('books/by/author/{author_id}', [BookController::class, 'getByAuthor'])->middleware('auth:api');
Route::get('books/{book_id}/reviews', [BookController::class, 'getReviews'])->middleware('auth:api');

Route::apiResource('users', UserController::class)->middleware('auth:api');
Route::apiResource('books', BookController::class)->middleware('auth:api');

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\AuthorController;
use App\Http\Controllers\API\BookController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\DiscountController;
use App\Http\Controllers\API\ReviewController;
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

Route::get('books/on-sale', [BookController::class, 'getOnSale']);
Route::get('books/recommended', [BookController::class, 'getRecommended']);
Route::get('books/popular', [BookController::class, 'getPopular']);
Route::get('books/by/category/{category_id}', [BookController::class, 'getByCategory']);
Route::get('books/by/author/{author_id}', [BookController::class, 'getByAuthor']);
Route::get('books/{book_id}/reviews', [BookController::class, 'getReviews']);
Route::get('books/filter', [BookController::class, 'filterAndSort']);

Route::apiResource('users', UserController::class);
Route::apiResource('books', BookController::class);
Route::apiResource('authors', AuthorController::class);
Route::apiResource('categories', CategoryController::class);
Route::apiResource('discounts', DiscountController::class);
Route::apiResource('reviews', ReviewController::class);

<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookRequest;
use App\Http\Resources\BookResource;
use App\Models\Book;
use App\Models\Discount;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * Display a listing of the book.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return BookResource::collection(Book::paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\BookRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(BookRequest $request)
    {
        $validated_request = $request->validated();
        $book = Book::create($validated_request);

        return response(new BookResource($book), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function show(Book $book)
    {
        return new BookResource($book);
    }

    /**
     * Update the specified book in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Book $book)
    {
        $book->update($request->all());

        return new BookResource($book);
    }

    /**
     * Remove the specified book from storage.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function destroy(Book $book)
    {
        $book->delete();

        return response(['success' => true]);
    }

    public function getMostDiscountItems()
    {
        $discounts = Discount::whereDate('discount_start_date', '<=', now())
                                ->whereDate('discount_start_date', '<=', now())
                                ->where(function ($query) {
                                    $query->whereDate('discount_end_date', '>=', now())
                                            ->orWhere('discount_end_date', null);
                                })
                                ->orderBy('discount_price', 'DESC')
                                ->take(10)
                                ->get();
        $books = [];
        foreach ($discounts as $key => $value) {
            array_push($books, $value->book);
        }
        return BookResource::collection($books);
    }
}
<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookRequest;
use App\Http\Resources\BookResource;
use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Models\Discount;
use App\Models\Review;
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

    public function getMostDiscount()
    {
        $discounts = Discount::mostDiscount()->get();

        $books = [];
        foreach ($discounts as $key => $value) {
            array_push($books, $value->book);
        }

        return BookResource::collection($books);
    }

    public function getRecommended()
    {
        $reviews = Review::mostStar()->get();

        $books = [];
        foreach ($reviews as $key => $value) {
            array_push($books, $value->book);
        }

        return BookResource::collection($books)->sortBy('book_price');
    }

    public function getPopular()
    {
        $reviews = Review::mostReview()->get();

        $books = [];
        foreach ($reviews as $key => $value) {
            array_push($books, $value->book);
        }

        return BookResource::collection($books)->sortBy('book_price');
    }

    public function getByCategory($category_id)
    {
        $category = Category::find($category_id);

        return BookResource::collection($category->books);
    }

    public function getByAuthor($author_id)
    {
        $author = Author::find($author_id);

        return BookResource::collection($author->books);
    }

    public function getReviews($book_id)
    {
        $book = Book::find($book_id);

        return $book->reviews;
    }
}

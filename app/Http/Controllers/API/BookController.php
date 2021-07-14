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

    public function getOnSale()
    {
        $books = Book::onSale()->take(10)->get();
        return BookResource::collection($books);
    }

    public function getRecommended()
    {
        $books = Book::recommended()->take(8)->get();
        return BookResource::collection($books);
    }

    public function getPopular()
    {
        $books = Book::popular()->take(8)->get();
        return BookResource::collection($books);
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

    public function filterAndSort(Request $request)
    {
        $categories = explode(',', $request->categories);
        $authors = explode(',', $request->authors);
        $rating_stars = explode(',', $request->rating_stars);

        $books = Book::whereHas('category', function($query) use($categories) {
            $query->whereIn('category_id', $categories);
        })
            ->whereHas('author', function($query) use($authors) {
                $query->whereIn('author_id', $authors);
            })
            ->whereHas('reviews', function($query) use($rating_stars) {
                $query->whereIn('rating_start', $rating_stars);
            })
            ->get();

        return $books;
    }
}

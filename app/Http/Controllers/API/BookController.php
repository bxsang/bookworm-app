<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookRequest;
use App\Http\Resources\BookResource;
use App\Http\Resources\ReviewResource;
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
        return BookResource::collection(Book::selectFinalPrice()->paginate(10));
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
    public function show($book_id)
    {
        $book = Book::where('id', $book_id)
                        ->selectFinalPrice()
                        ->selectReviewsCount()
                        ->selectAvgStar()
                        ->first();
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

    public function getReviews(Request $request, $book_id)
    {
        $star = $request->star;
        $sort_by = $request->sort_by;
        $per_page = $request->per_page;

        $reviews = Review::where('book_id', '=', $book_id);

        if (isset($star) && $star != 'all') {
            $reviews = $reviews->where('rating_start', '=', $star);
        }

        switch ($sort_by) {
            case 'date_asc':
                $reviews = $reviews->orderBy('review_date');
                break;

            case 'date_desc':
                $reviews = $reviews->orderByDesc('review_date');
                break;

            default:
                return response(['message' => 'Invalid sort field'], 400);
                break;
        }

        return ReviewResource::collection($reviews->paginate((int)$per_page));
    }

    private function filter($categories, $authors, $rating_stars)
    {
        $books = Book::whereHas('category', function($query) use($categories) {
            $query->whereIn('category_id', $categories);
        })
            ->whereHas('author', function($query) use($authors) {
                $query->whereIn('author_id', $authors);
            });

        if (!in_array('all', $rating_stars)) {
            $books = $books->whereHas('reviews', function($query) use($rating_stars) {
                $query->whereIn('rating_start', $rating_stars);
            });
        }

        return $books;
    }

    public function filterAndSort(Request $request)
    {
        $categories = explode(',', $request->categories);
        $authors = explode(',', $request->authors);
        $rating_stars = explode(',', $request->rating_stars);
        $sort_by = $request->sort_by;
        $per_page = $request->per_page;

        $books = $this->filter($categories, $authors, $rating_stars);

        switch ($sort_by) {
            case 'on-sale':
                $books = $books->onSale();
                break;

            case 'popularity':
                $books = $books->popular();
                break;

            case 'price_asc':
                $books = $books->selectFinalPrice()->orderBy('final_price');
                break;

            case 'price_desc':
                $books = $books->selectFinalPrice()->orderByDesc('final_price');
                break;

            default:
                return response(['message' => 'Invalid sort field'], 400);
                break;
        }

        return BookResource::collection($books->paginate((int)$per_page));
    }
}

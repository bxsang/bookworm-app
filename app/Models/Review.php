<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Review extends Model
{
    use HasFactory, SoftDeletes;

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'book_id',
        'review_title',
        'review_details',
        'review_date',
        'rating_start',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function scopeMostStar($query)
    {
        return $query->select(DB::raw('avg(rating_start::int), book_id'))
                        ->groupBy('book_id')
                        ->orderBy('avg', 'desc')
                        ->take(8);
    }

    public function scopeMostReview($query)
    {
        return $query->select(DB::raw('count(book_id), book_id'))
                        ->groupBy('book_id')
                        ->orderBy('count', 'DESC')
                        ->take(8);
    }
}

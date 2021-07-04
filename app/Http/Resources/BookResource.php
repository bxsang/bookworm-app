<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'book_title' => $this->book_title,
            'book_summary' => $this->book_summary,
            'book_price' => $this->book_price,
            'book_cover_photo' => $this->book_cover_photo,
            'category' => $this->category,
            'author' => $this->author,
        ];
    }
}

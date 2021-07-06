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
        $final_price = $this->book_price;
        if ($this->discount->isNotEmpty()) {
            $final_price = $this->book_price - $this->discount[0]->discount_price;
        }

        return [
            'id' => $this->id,
            'book_title' => $this->book_title,
            'book_summary' => $this->book_summary,
            'book_price' => $this->book_price,
            'book_cover_photo' => $this->book_cover_photo,
            'category' => $this->category,
            'author' => $this->author,
            'discount' => $this->discount,
            'final_price' => $final_price,
        ];
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
class Article extends Model
{
    protected $fillable = ['title', 'content'];

    protected $dates = ['created_at', 'updated_at'];


    public function getCreatedAtAttribute($date)
    {
        return Carbon::parse($date)->format('d.m.Y.');
    }

    public function getUpdatedAtAttribute($date)
    {
        return Carbon::parse($date)->format('d.m.Y');
    }
}

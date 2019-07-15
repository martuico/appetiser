<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MomentEvent extends Model
{
    protected $table = 'events';
    protected $fillable = ['name', 'to', 'end', 'days'];
}

<?php

namespace App\Http\Controllers\Moments;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\MomentEvent;

class EventController extends Controller
{
    protected $moments;

    public function __construct(MomentEvent $moments)
    {
        $this->moments = $moments;
    }

    public function index(Request $request)
    {
        return $this->moments;
    }

    public function store(Request $request)
    {
        $event = $this->moments->create($request->all());
        return response()->json($event, 200);
    }
}

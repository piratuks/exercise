<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use App\Services\MainService;

class MainController extends BaseController
{
    function test()
    {
        return response()->json(['success'=>1, 'message'=>'Test OK']);
    }

    function data(Request $request)
    {     
        try {
            $from = '2018-01-01';
            $to = '2018-01-31';
            if($request->input('from') !== null){
                $from = $request->input('from');
            }
            if($request->input('to') !== null){
                $to = $request->input('to');
            }
            
            $client = new MainService();
            $response = $client->getData($from, $to);

           return response()->json(['success'=>200, 'data'=>$response]);
        }
        catch (\Exception $e) {
            return Response::json( [
                'error' => [
                    'exception' =>"Cannot load data. Please try again...",
                ]
            ], 500 );
        }

    }
}

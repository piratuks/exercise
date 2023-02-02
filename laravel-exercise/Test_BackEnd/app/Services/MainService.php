<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\HandlerStack;
use League\Flysystem\Adapter\Local;
use Kevinrob\GuzzleCache\CacheMiddleware;
use Kevinrob\GuzzleCache\Strategy\PrivateCacheStrategy;
use Kevinrob\GuzzleCache\Storage\FlysystemStorage;
use Kevinrob\GuzzleCache\Strategy\GreedyCacheStrategy;

class MainService
{
    protected $base_url;
    protected $client;
    protected $stack;

    public function __construct()
    {
        $this->stack = HandlerStack::create();
        $this->stack->push(
            new CacheMiddleware(
              new GreedyCacheStrategy(
                new FlysystemStorage(
                  new Local("/tmp/sitex")
                ),
                180
              )
            ), 
            "cache"
          );
      

        $this->base_url = config('main.base_url');    

        $this->client = new \GuzzleHttp\Client([
            "handler"  => $this->stack,
            "base_uri"  => $this->base_url,
            "timeout"   => 2.0,
        ]);

    }

    private function getStructuredData($data)
    {
        $data_1 = [];
        $data_2 = [];
        foreach($data as $item){
            $to = \Carbon\Carbon::createFromFormat('Y-m-d H:s:i', $item->start);
            $from = \Carbon\Carbon::createFromFormat('Y-m-d H:s:i', $item->end);

            $diff_in_hours = $to->diffInHours($from);
            $month = $from->format('F');

            if(array_key_exists($month, $data_1)){
                $id = $item->employee_id;
                $arr = array_filter($data_1[$month], function($arr) use ($id) {
                    return $arr['employee_id'] === $id;
                }, ARRAY_FILTER_USE_BOTH);
                if(sizeof($arr )<=0){
                    $data_1[$month][] = [
                        "id" => $item->id,
                        "employee_id" => $item->employee_id,
                        'fname' => $item->employee->fname,
                        'lname' => $item->employee->lname,
                        'email' => $item->employee->email,
                        'phone' => $item->employee->phone,
                        'address' => $item->employee->address,
                        'working_hours_total' => $diff_in_hours
                    ];
                }else{
                    $key = array_search($item->employee_id, array_column($data_1[$month], 'employee_id'));
                    $data_1[$month][$key]["working_hours_total"] += $diff_in_hours; 
                }
            }else{
                $data_1[$month][] = [
                    "id" => $item->id,
                    "employee_id" => $item->employee_id,
                    'fname' => $item->employee->fname,
                    'lname' => $item->employee->lname,
                    'email' => $item->employee->email,
                    'phone' => $item->employee->phone,
                    'address' => $item->employee->address,
                    'working_hours_total' => $diff_in_hours
                ];
            }

            if(array_key_exists($month, $data_2)){
                $id = $item->employee->company->id;
                $arr = array_filter($data_2[$month], function($arr) use ($id) {
                    return $arr['id'] === $id;
                }, ARRAY_FILTER_USE_BOTH);
                if(sizeof($arr )<=0){
                    $data_2[$month][] = [
                        "id" => $item->employee->company->id,
                        "name" => $item->employee->company->name,
                        'email' => $item->employee->company->email,
                        'phone' => $item->employee->company->phone,
                        'address' => $item->employee->company->address,
                        'phone' => $item->employee->company->phone,
                        'working_hours_total' => $diff_in_hours
                    ];
                }else{
                    $key = array_search($item->employee->company->id, array_column($data_2[$month], 'id'));
                    $data_2[$month][$key]["working_hours_total"] += $diff_in_hours; 
                }
            }else{
                $data_2[$month][] = [
                    "id" => $item->employee->company->id,
                    "name" => $item->employee->company->name,
                    'email' => $item->employee->company->email,
                    'phone' => $item->employee->company->phone,
                    'address' => $item->employee->company->address,
                    'phone' => $item->employee->company->phone,
                    'working_hours_total' => $diff_in_hours
                ];
            }
        }

        return (object)["employees_data" => $data_1, "companies_data" => $data_2];
    }

    public function getData($from, $to)
    {
        $request = $this->client->request("GET", '/workhours?start='.$from.'&end='.$to);
        $response = json_decode($request->getBody()->getContents());
        $data = $this->getStructuredData($response);
     
        return  $data;
    }

  
}
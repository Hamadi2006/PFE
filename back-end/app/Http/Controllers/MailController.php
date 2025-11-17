<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\adminMail;

class MailController extends Controller
{
    public function sendMail()
    {
        try
        {
            Mail::to('ayoubehamadi5@gmail.com')->send(new adminMail());
            
            return response()->json([
                'message' => 'Mail sent successfully',
            ]);
        }
        catch(\Exception $e)
        {
            return response()->json([
                'message' => 'Mail could not be sent',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

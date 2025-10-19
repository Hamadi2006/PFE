<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Call only AdminSeeder
        $this->call([
            AdminSeeder::class,
        ]);
    }
}
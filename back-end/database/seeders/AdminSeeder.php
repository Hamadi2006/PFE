<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\Admin;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        // Liste des admins à créer
        $admins = [
            [
                'nom' => 'Admin',
                'prenom' => 'SakanCom',
                'email' => 'admin@sakancom.ma',
                'mot_de_passe' => Hash::make('admin123'),
                'telephone' => '+212600000000',
                'photo' => null,
                'actif' => true,
                'derniere_connexion' => null,
            ],
            [
                'nom' => 'Alami',
                'prenom' => 'Mohamed',
                'email' => 'mohamed@sakancom.ma',
                'mot_de_passe' => Hash::make('password123'),
                'telephone' => '+212611111111',
                'photo' => null,
                'actif' => true,
                'derniere_connexion' => null,
            ],
            [
                'nom' => 'Benali',
                'prenom' => 'Fatima',
                'email' => 'fatima@sakancom.ma',
                'mot_de_passe' => Hash::make('password123'),
                'telephone' => '+212622222222',
                'photo' => null,
                'actif' => true,
                'derniere_connexion' => null,
            ],
            [
                'nom' => 'Tazi',
                'prenom' => 'Ahmed',
                'email' => 'ahmed@sakancom.ma',
                'mot_de_passe' => Hash::make('password123'),
                'telephone' => '+212633333333',
                'photo' => null,
                'actif' => false, // Admin désactivé
                'derniere_connexion' => null,
            ],
        ];

        // Créer les admins avec foreach
        foreach ($admins as $adminData) {
            Admin::create($adminData);
            echo "✅ Admin créé: {$adminData['prenom']} {$adminData['nom']} ({$adminData['email']})\n";
        }

        echo "\n🎉 Tous les admins ont été créés avec succès!\n\n";
        echo "📧 Login principal:\n";
        echo "   Email: admin@sakancom.ma\n";
        echo "   Password: admin123\n\n";
        echo "📧 Autres admins:\n";
        echo "   Email: mohamed@sakancom.ma | Password: password123\n";
        echo "   Email: fatima@sakancom.ma | Password: password123\n";
        echo "   Email: ahmed@sakancom.ma | Password: password123 (⚠️ Désactivé)\n";
    }
}
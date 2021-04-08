<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role1 = Role::create(['name' => 'admin']);
        $role2 = Role::create(['name' => 'shop_user']);
        $role3 = Role::create(['name' => 'client_user']);

        Permission::create(['name' => 'product.create'])->syncRoles([$role1,$role2]);
        Permission::create(['name' => 'product.update'])->syncRoles([$role1,$role2]);
        Permission::create(['name' => 'product.delete'])->syncRoles([$role1,$role2]);
        Permission::create(['name' => 'product.uploadImage'])->syncRoles([$role1,$role2]);
        Permission::create(['name' => 'product.deleteImage'])->syncRoles([$role1,$role2]);

        Permission::create(['name' => 'shop.create'])->syncRoles([$role1,$role2]);
        Permission::create(['name' => 'shop.update'])->syncRoles([$role1,$role2]);
        Permission::create(['name' => 'shop.delete'])->syncRoles([$role1,$role2]);
        Permission::create(['name' => 'shop.uploadImage'])->syncRoles([$role1,$role2]);
        Permission::create(['name' => 'shop.deleteImage'])->syncRoles([$role1,$role2]);

        Permission::create(['name' => 'client_user.update'])->syncRoles([$role1,$role3]);
        Permission::create(['name' => 'client_user.delete'])->syncRoles([$role1,$role3]);

        Permission::create(['name' => 'shop_user.update'])->syncRoles([$role1,$role3]);
        Permission::create(['name' => 'shop_user.delete'])->syncRoles([$role1,$role3]);
    }
}

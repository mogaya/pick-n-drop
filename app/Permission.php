<?php

namespace App;

enum Permission: string
{
    case Orders = 'orders';
    case Deliveries = 'deliveries';
    case Inventory = 'inventory';
    case Staff = 'staff';
    case Businesses = 'businesses';
    case Shelves = 'shelves';
    case Billing = 'billing';
}

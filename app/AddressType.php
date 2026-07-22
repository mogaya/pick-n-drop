<?php

namespace App;

enum AddressType: string
{
    case Shipping = 'shipping';
    case Billing = 'billing';
    case Pickup = 'pickup';
}

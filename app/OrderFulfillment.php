<?php

namespace App;

enum OrderFulfillment: string
{
    case Pickup = 'pickup';
    case Delivery = 'delivery';
}

<?php

namespace App;

enum OrderStatus: string
{
    case New = 'new';
    case Packed = 'packed';
    case Ready = 'ready';
    case OutForDelivery = 'out_for_delivery';
    case Delivered = 'delivered';
    case Cancelled = 'cancelled';
}

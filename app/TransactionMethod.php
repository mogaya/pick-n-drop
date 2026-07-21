<?php

namespace App;

enum TransactionMethod: string
{
    case Card = 'card';
    case Stripe = 'stripe';
    case Cash = 'cash';
    case Mpesa = 'mpesa';
}

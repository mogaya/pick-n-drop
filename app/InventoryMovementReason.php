<?php

namespace App;

enum InventoryMovementReason: string
{
    case Sale = 'sale';
    case Restock = 'restock';
    case Adjustment = 'adjustment';
    case Transfer = 'transfer';
}

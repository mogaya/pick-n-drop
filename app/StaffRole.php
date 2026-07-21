<?php

namespace App;

enum StaffRole: string
{
    case Manager = 'manager';
    case Picker = 'picker';
    case Packer = 'packer';
    case Driver = 'driver';
}

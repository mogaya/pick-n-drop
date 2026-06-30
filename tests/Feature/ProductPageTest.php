<?php

test('product page renders the marketplace experience', function () {
    $response = $this->get('/product');

    $response->assertOk();
    $response->assertSee('product/index');
    $response->assertSee('data-page');
});

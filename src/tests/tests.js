//DOCS: http://api.qunitjs.com/category/test/
module("Storage Table Tests");
test("basic", function() {
    ok(true, "ok test is true");
    //DOCS: http://api.qunitjs.com/ok/ 
   equal(1, true, "equal test with 1");
   notEqual(0, true, "not equal test with 0");
});
test("real tests", function (assert) {
    $('#table-1').storageTable({        
        title: "Example 1 + Z",
        get: "http://api.flickr.com/services/feeds/photos_public.gne?tags=cat&tagmode=any&format=json&jsoncallback=?"
    })
    //Rather then create a settings to set it.
    .children('table').addClass("table table-bordered");
    $('#table-2').storageTable();
    assert.strictEqual($('#table-2 thead th').length, 10);
    assert.strictEqual($('#table-2 tbody td').length, 10);
});
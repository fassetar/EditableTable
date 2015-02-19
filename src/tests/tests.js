//DOCS: http://api.qunitjs.com/category/test/
module("Storage Table Tests");
test("basic", function() {
   ok(true, "ok test is true"); //http://api.qunitjs.com/ok/ 
   equal(1, true, "equal test with 1");
   notEqual(0, true, "not equal test with 0");
});
test("real tests", function (assert) {
    $('#table-1').storageTable({
        dataType: "json",
        title: "Example 1 + Z"
    });
    $('#table-2').storageTable({
        dataType: "json"        
    });
    assert.strictEqual($('#table-1 thead th').length, 10);
    assert.strictEqual($('#table-1 tbody td').length, 10);
});
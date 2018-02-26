var cityName = "";
var city = "";

$(function() {
  $("#city").on('change', function() {
    cityName = $("#city option:selected").text();
    city = parseInt($("#city").val());
    // if the user changes the city without changing the adm, we have to fetch the form option again
    getCollectParams();
  });
});

$(function() {
  $("#city").on('focus', function() {
    $('#administration').removeAttr('disabled');
  });
});

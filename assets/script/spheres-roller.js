spheresTable = {
  symbols: [],
  sources: [],
  spirits: []
};

function spheres_generate_all() {
  spheres_generate_symbol();
  spheres_generate_source();
  spheres_generate_spirit();
}
function spheres_generate_symbol() {
  var result = spheres_getRandomArrayMember(spheresTable.symbols);
  $(".js-spheres-symbol_result").text(result);
}
function spheres_generate_source() {
  var result = spheres_getRandomArrayMember(spheresTable.sources);
  $(".js-spheres-source_result").text(result);
}
function spheres_generate_spirit() {
  var result = spheres_getRandomArrayMember(spheresTable.spirits);
  $(".js-spheres-spirit_result").text(result);
}

function spheres_ajax_recieved_lists(data, status) {
  updateSpheresTable(data);
  refillSpheresList();
}

function spheres_getRandomArrayMember(list) {
  var rand = Math.floor(Math.random()*list.length);
  return list[rand];
}

function updateSpheresTable(data) {
  spheresTable.symbols = data.symbols;
  spheresTable.sources = data.sources;
  spheresTable.spirits = data.spirits;
}

function refillSpheresList() {
  // Symbols list
  var symbols_ol = $(".js-spheres-symbols_list")
  symbols_ol.empty();
  spheresTable.symbols.forEach((item, i) => {
    symbols_ol.append("<li>" + item + "</li>");
  });
  // Sources
  var sources_ol = $(".js-spheres-sources_list");
  sources_ol.empty();
  spheresTable.sources.forEach((item, i) => {
    sources_ol.append("<li>" + item + "</li>");
  });
  // Spirits
  var spirits_ol = $(".js-spheres-spirits_list");
  spirits_ol.empty();
  spheresTable.spirits.forEach((item, i) => {
    spirits_ol.append("<li>" + item + "</li>");
  });
}

// READY
$(document).ready(function() {
  console.log("Loading");
  // Retrieve data
  $.getJSON("/assets/script/spheres.json", null, spheres_ajax_recieved_lists);

  // Buttons
  $(".js-spheres-generate_all").on("click", spheres_generate_all);
  $(".js-spheres-generate_symbol").on("click", spheres_generate_symbol);
  $(".js-spheres-generate_source").on("click", spheres_generate_source);
  $(".js-spheres-generate_spirit").on("click", spheres_generate_spirit);
});

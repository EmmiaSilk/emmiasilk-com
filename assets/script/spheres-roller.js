spheresTable = {
  symbols: {},
  sources: {},
  spirits: {}
};

function spheres_generate_all() {
  spheres_generate_symbol();
  spheres_generate_source();
  spheres_generate_spirit();
}
function spheres_generate_symbol() {
  var result = spheres_getRandomArrayMember(spheresTable.symbols);
  var text = result.name;
  if(result.extra_table) {
    var result2 = spheres_getRandomArrayMember(spheresTable[result.extra_table]);
    text = `${result.name} (${result2.name})`
  }
  $(".js-spheres-symbol_result").text(text);
}
function spheres_generate_source() {
  var result = spheres_getRandomArrayMember(spheresTable.sources);
  var text = result.name;
  if(result.extra_table) {
    var result2 = spheres_getRandomArrayMember(spheresTable[result.extra_table]);
    text = `${result.name} (${result2.name})`
  }
  $(".js-spheres-source_result").text(text);
}
function spheres_generate_spirit() {
  var result = spheres_getRandomArrayMember(spheresTable.spirits);
  var text = result.name;
  if(result.extra_table) {
    var result2 = spheres_getRandomArrayMember(spheresTable[result.extra_table]);
    text = `${result.name} (${result2.name})`
  }
  $(".js-spheres-spirit_result").text(text);
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
  Object.entries(spheresTable.symbols).forEach(entry => {
    const [id, item] = entry;
    symbols_ol.append("<li>" + item.name + "</li>");
  });
  // Sources
  var sources_ol = $(".js-spheres-sources_list");
  sources_ol.empty();
  Object.entries(spheresTable.sources).forEach(entry => {
    const [id, item] = entry;
    sources_ol.append("<li>" + item.name + "</li>");
  });
  // Spirits
  var spirits_ol = $(".js-spheres-spirits_list");
  spirits_ol.empty();
  Object.entries(spheresTable.spirits).forEach(entry => {
    const [id, item] = entry;
    spirits_ol.append("<li>" + item.name + "</li>");
  });
}

// READY
$(document).ready(function() {
  console.log("Loading");
  // Retrieve data
  var jsonPath = "/assets/script/spheres.json"
  var buildTime = $("meta[property='js-buildtime']").attr('content');
  console.log(buildTime);
  $.getJSON(`${jsonPath}?${buildTime}`, null, spheres_ajax_recieved_lists);

  // Buttons
  $(".js-spheres-generate_all").on("click", spheres_generate_all);
  $(".js-spheres-generate_symbol").on("click", spheres_generate_symbol);
  $(".js-spheres-generate_source").on("click", spheres_generate_source);
  $(".js-spheres-generate_spirit").on("click", spheres_generate_spirit);
});

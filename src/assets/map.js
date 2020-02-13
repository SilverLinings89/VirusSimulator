 

    
  var defaultsettings = {
    elementid: "body",
    width: $( window ).width()-$( window ).width()/10,
    height: $( window ).height(),
    mapstyle: {
        ocean: "#4A5B62",
        region: "#F3F3F3",
        border : "#ffffff"
    },
    project: {
        //name: "Orthographic",
        name: "Mercator",
        zoomlevel: 1,
        zoomarea:false,
        center: [38,-97]
    },
   // projection: 'equirectangular',
    dataType: false,
    dataurl: false,
    data: [],
    plugin: false,
    keys: ["default","Data","color","size"],
    graticule: 'false',
    editpanel: 'true',
    showtable: 'true',
    animate: 'false',
    delay: 500,
    animduration: 1000,
    colorscale: d3.scale.category20(),
    defaultfill: "#4682B4",
    defaultsize: 30,
    font: {
        family: 'ANTON',
        color: false,
        size : false
    },
    image: {
        url: 'https://cdn3.iconfinder.com/data/icons/softwaredemo/PNG/24x24/DrawingPin1_Blue.png',
        width: 30,
        height : 30
    },
    antartica:false,
    zoomable:true,
    shownames:false,
    region:false

}
        

var projectionnames={
 "Aitoff": d3.geo.aitoff(),
  "Boggs Eumorphic": d3.geo.boggs(),
  "Craster Parabolic (Putnins P4)": d3.geo.craster(),
  "Cylindrical Equal-Area": d3.geo.cylindricalEqualArea(),
  "Eckert I": d3.geo.eckert1(),
  "Eckert III": d3.geo.eckert3(),
  "Eckert IV": d3.geo.eckert4(),
  "Eckert V": d3.geo.eckert5(),
  "Equidistant Cylindrical (Plate CarrÃ©e)": d3.geo.equirectangular(),
  "Fahey": d3.geo.fahey(),
  "Foucaut Sinusoidal": d3.geo.foucaut(),
  "Gall (Gall Stereographic)": d3.geo.cylindricalStereographic(),
  "Ginzburg VIII (TsNIIGAiK 1944)": d3.geo.ginzburg8(),
  "Kavraisky VII": d3.geo.kavrayskiy7(),
  "LarrivÃ©e": d3.geo.larrivee(),
  "McBryde-Thomas Flat-Pole Sine (No. 2)": d3.geo.mtFlatPolarSinusoidal(),
  "Mercator": d3.geo.mercator(),
  "Miller Cylindrical I": d3.geo.miller(),
  "Mollweide": d3.geo.mollweide(),
  "Natural Earth": d3.geo.naturalEarth(),
  "Nell-Hammer": d3.geo.nellHammer(),
  "Robinson": d3.geo.robinson(),
  "Sinusoidal": d3.geo.sinusoidal(),
  "van der Grinten (I)": d3.geo.vanDerGrinten(),
  "Wagner VI": d3.geo.wagner6(),
  "Wagner VII": d3.geo.wagner7(),
  "Winkel Tripel": d3.geo.winkel3(),
  "Orthographic": d3.geo.orthographic() 
    
}
var regionnames={
  "US": "us.json",
  "CL": "chile.json",
  "AR": "argentina.json",
  "BR": "brazil.json",
  "ES": "espana.json",
  "JP": "japan.json",
  "DE": "germany.json",
  "CN": "china.json",
  "GB": "uk.json",
  "IT": "italy.json",
  "IN": "india.json",
  "INdistricts": "indiadistricts.json",
  "FR": "france.json",
  "PK": "pakistan.json",
  "NL": "netherlands.json",
  "IE": "ireland.json",
  "ZA": "southafrica.json",
  "DK": "denmark.json",
  "TR": "turkey.json",
  "PT": "portugal.json",
  "SE": "sweden.json",
  "NZ": "newzealand.json",
  "PH": "philippines.json",
  "FI": "finland.json",
  "PL": "poland.json",
  "DZ": "algeria.json",
  "AZ": "azerbaijan.json",
  "PE": "peru.json",
  "MX": "mexico.json",
  "RU": "russia.json",
  false: "worldtemplate.json"
    
};
//var Worldmap = (function(settings){
function Worldmap(settings){
   var self=this; 
    
    this.settings = defaults(settings, defaultsettings);
    this.settings.mapstyle = defaults(settings.mapstyle, defaultsettings.mapstyle);
    this.settings.project = defaults(settings.project, defaultsettings.project);
    this.settings.image = defaults(settings.image, defaultsettings.image);
 

  $(document).ready(function () {$(settings.elementid).append('<div id="progress_bar"><div class="percent">0%</div></div><div class="container demo" id="containerdemo"><!-- Modal --><div class="modal left fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">Table & Plugins</h4></div><div class="modal-body">                                    <div id="info"></div>        <select id="plugin" class="selectpicker" data-width="fit">  <option value="default">Plugins</option>  <option value="cloropleth">Cloropleth</option>  <option value="circles">Bubble</option>  <option value="pulse">Pulse</option>  <option value="text">Text</option>  <option value="arcs">Arcs</option>  <option value="barchart">Barchart</option>  <option value="stackedbar">StackedBar</option></select>                                                                 <select id="category" class="selectpicker" multiple data-width="fit" title="Location">                      </select>                                                       <div id="appendable"></div>        <button type="button" id="addplugin" class="btn btn-secondary">Add</button>        <button type="button" id="adv" class="btn btn-secondary">Advanced</button>        <button type="button" id="reset" class="btn btn-secondary">Reset</button>                <div id="advanced" style="display: none;"><label>Settings:</label> <br>             <select id="colorcolumn" class="selectpicker" data-width="fit">            <option value="color">ColorColumn</option>          </select>        <select id="sizecolumn" class="selectpicker" data-width="fit">            <option value="size">SizeColumn</option>          </select><input type="checkbox" id="anim" value="animate" > <label for="anim">Animate</label> <button type="button" id="savesvg" class="btn btn-secondary">Save SVG</button>         <br><br>FillColor: <input id="top" class="jscolor" value="4682b4">        <div id="custom" style="display: none;"> <input id="font" type="text" /> </div>       </div>        <br><br><table id="datatable-responsive" class="table table-striped table-bordered responsive no-wrap" cellspacing="0" width="100%"></table>    </div></div><!-- modal-content --></div><!-- modal-dialog --></div><!-- modal --><!-- Modal --><div class="modal right fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel2">Draw & Edit</h4></div><div class="modal-body"><div id="menu8">  Select Style:     <select id="stylesel" class="selectpicker" data-width="fit">            <option value="default">Default</option>            <option value="soft">Soft</option>            <option value="blackwhite">Black and White</option>            <option value="greyscale">Greyscale</option>            <option value="classic">Classic</option>            <option value="paper">Paper</option>            <option value="strong">Strong</option>            <option value="doom">Doom</option>       </select> <br> <br>                                             Load file:     <span id="load"><input type="file" class="upload" id="files" /></span>     <p>Draw: <button id="target" class="btn btn-secondary">Polygon</button>    <button id="other" class="btn btn-secondary">Line</button>    <button id="point" class="btn btn-secondary">Bubble</button></p>    Edit: <button id="delete" class="btn btn-secondary">Delete</button>    <button id="save" class="btn btn-secondary">Save</button>    <button id="finish" class="btn btn-secondary">Apply</button><br>    <br>Color&nbsp;    &nbsp;<p><input class="jscolor" value="000000"></p>&nbsp;    &nbsp;LineSize: <span id="nRadius-value"></span>&nbsp;    &nbsp;<input type="range" id="nRadius" step="0.05" min="0" max="12" value="2" class="slider-width100">&nbsp;    &nbsp;PointRadius: <span id="pRadius-value"></span>&nbsp;    &nbsp;<input type="range" id="pRadius" step="0.1" min="0.01" max="16" value="3" class="slider-width100">&nbsp;    <br>    &nbsp;<input type="checkbox" id="removepath" value="1">Hide regions<br>&nbsp;    &nbsp;<input type="checkbox" id="addnames" value="1">Show names<br>&nbsp;    &nbsp;<input type="checkbox" id="addgraticule" value="1">Show graticule<br>&nbsp;  </div></div></div><!-- modal-content --></div><!-- modal-dialog --></div><!-- modal --></div><!-- container --><div id="map"><div class="text-center">                        <input type="button" value="Table" id="rotate"  data-toggle="modal" data-target="#myModal"/>            <input type="button" value="Edit" id="rotate2"  data-toggle="modal" data-target="#myModal2"/></div><div id="playeranim" class="play-button"></div><span id="showinfo"></span></div>');});
  
 
   function loadlocal(error,world){
    
      loaded(false,world,settings.data); 
       if (error) throw error;
   }
    
    function loaded(error, world,dataload) {
        
     $("#map").width(settings.width).height(settings.height);
     
      
   var borrar=0,
    identificador=0,
    poligonost=[],
    lineast=[];
var poligonos = new Array();
//var poligonos = {};
var lineas = new Array();
var color = "#000000";
var ancho = 2;
var pradius = 3;
var addpoint = 0;
var addtext = 0;
var done = 1;
var namelin = new Array();
var textlin = new Array();
var namepol = new Array();
var textpol = new Array();
var topp=0;

//var projection = d3.geo.aitoff()
var projection =projectionnames[settings.project.name] // cambiar el color de fondo a blanco.
//var projection = d3.geo.eckert5()
//var projection = d3.geo.mercator()
    .scale(280)
    .translate([settings.width / 2, settings.height / 2]);
    
    
    

    
 if(!settings.dataurl){dataload=settings.data;error=false;}

 var save={"type":"FeatureCollection"};
 fpoligonos=[];
 flineas=[];
 fpuntos=[];
 save.features=[];
var path = d3.geo.path()
    .projection(projection);

var graticule = d3.geo.graticule(); // create a graticule
/*var zoom = d3.behavior.zoom()
    .translate(projection.translate())
    .scale(scale0)
    .scaleExtent([scale0, 8 * scale0])
    .on("zoom", zoomed);*/

var svg = d3.select("#map").append("svg")
    .attr("width", settings.width)
    .attr("height", settings.height);
    
  var div = d3.select("#map").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);    


var g = svg.append("g");
var h = svg.append('g');


if(settings.project.name==="Orthographic"){       
//var elmnt = document.getElementById("contenedor");
g.append("circle")
    .attr("class", "ocean")
    .attr("cx", settings.width / 2)
    .attr("cy", settings.height / 2)
   // .attr("r", function() { if(settings.height<settings.width)return settings.height/2;else return settings.width/2; });
   //  .attr("r",  $(window).height() / 2 );
   .attr("r", 275);
  // .attr("r",  settings.height / 2 );
 
}
    else{
g.append("rect")
    .attr("class", "background")
    .attr("width", settings.width)
    .attr("height", settings.height);
    
 /*   world.objects.states.geometries.filter(function (el) {
  return el.id !== "10";});*/
if(!settings.antartica&&!settings.region){world.objects.states.geometries.forEach(function(d, i) {
    if(d.id==="10"){d.arcs=[];}
});}
   }     
 
    

    
//vvar coordinates=[50, 50];
var markers=[];

//d3.json("topojson/worldtemplate.json", function(error, world) { 
  
 if (error) throw error;
     
  var states = topojson.feature(world, world.objects.states);
  
  projection
      .scale(1)
      .translate([0, 0]);

  var b = path.bounds(states),
      s = .95 / Math.max((b[1][0] - b[0][0]) / settings.width, (b[1][1] - b[0][1]) / settings.height),
      t = [(settings.width - s * (b[1][0] + b[0][0])) / 2, (settings.height - s * (b[1][1] + b[0][1])) / 2];


 projection
      .scale(s)
      .translate(t);
 
  
 var fields=["name","code","code3","lat","lon"] 
 var features = topojson.feature(world, world.objects.states).features; // this ones are country data.
// add names to features through topojson
        features = features.filter(function(d) {
    return world.objects.states.geometries.some(function(n) {
      if (d.id === n.id){ var temp=[]
      for (var i = 0; i <fields.length; i++) {
          if (typeof(n[fields[i]]) !== 'undefined'){
              d[fields[i]]=n[fields[i]];
        temp.push(d[fields[i]]);   
          }
       }return temp;
       
        }
    });
  });
  

  
if(settings.project.name==="Orthographic"){
    projection
    .scale(280)
    .clipAngle(90)
    .precision(.1);
    
 var r1 = d3.scale.linear()
    .domain([0, settings.width])
    .range([-180, 180]);

var r2 = d3.scale.linear()
    .domain([0, settings.height])
    .range([90, -90]);
  
//var init=[626, 434];

projection.scale(280).rotate([-settings.project.center[1], -settings.project.center[0]]);
// el primero, si es pos rota a la izquierda, si es negativo a la derecha
// el segundo se es pos baja, si es negativo sube
// 
// valor para inglaterra 0, -50,
// valor argentina 64, 34  // al parecer es lon, lat * factor negativo
//projection.scale(280).rotate([300, 0]);
// primer valor en rotate gira horizontal. segundo vertical es en grados
// r1 y r2 son escalas,  .range([-180, 180]); .range([90, -90]);
           

// on mousedown set center for rotation ex: d3.mouse is the new 480,480

/*svg.on("mousedown", function() { dragging = 1; coordinates = d3.mouse(this);});svg.on(".zoom", null);
svg.on("mouseup", function() {  dragging = 0;
    var p = d3.mouse(this);
    init=[init[0]+(p[0]-coordinates[0]),init[1]+(p[1]-coordinates[1])];});


svg.on("mousemove", function() {if (dragging){
  var p = d3.mouse(this);
  var newp=[init[0]+(p[0]-coordinates[0]),init[1]+(p[1]-coordinates[1])];
  console.log(newp);
 projection.rotate([r1(newp[0]), r2(newp[1])]);
  svg.selectAll("path").attr("d", path);
  
        }
});*/
} 

// TopoJSON
  g.append("g")  // regions
      .attr("id", "states")
    .selectAll("path")
      .data(features)
    .enter().append("path")
      .attr("d", path)
      .on("click", function(d) { if (d3.event.defaultPrevented) return; if(addpoint)coordinates = d3.mouse(this),clicked(d); })
          .on("mouseover", function(d) { this.style.fill = "#ff8532";d3.select('#showinfo').html("<b>"+d.name+"</b>"+"<br>Latitude: "+d.lat+"<br>Longitude: "+d.lon); })
      .on("mouseout", function() { this.style.fill = settings.mapstyle.region; })
   
    g.append("path")
      .datum(topojson.mesh(world, world.objects.states, function(a, b) { return a !== b; }))
      .attr("id", "state-borders")
      .attr("d", path)
  
// Geojson        
/*g.append("g")  // regions
      .attr("id", "states")
    .selectAll("path")
      .data(world.features)
    .enter().append("path")
      .attr("d", path);

  g.append("path")
    
      .datum(world, world.features)
      .attr("id", "state-borders")
      .attr("d", path);  */ 
        

     
$("#save").click(function() {
    
  /* var topp= save.poligonos.length,
  topl=save.lineas.length,
  topc=save.puntos.length;*/
 
  for (var i = 0; i <poligonos.length; i++) {topp=topp+1;
         for (var j = 0; j <poligonos[i].coordinates.length; j++) {
      poligonos[i].coordinates[j]=projection.invert(poligonos[i].coordinates[j]);
    }
   // poligonos[i]=
    save.features.push({"type":"Feature","id":topp,"properties":{"name":poligonos[i].name,"fill":poligonos[i].color, "texto":poligonos[i].texto},"geometry":{"type":"Polygon","coordinates": [poligonos[i].coordinates]}});
    
        }
    
    for (var i = 0; i <lineas.length; i++) {topp=topp+1;
         for (var j = 0; j <lineas[i].coordinates.length; j++) {
      lineas[i].coordinates[j]=projection.invert(lineas[i].coordinates[j]);
    }

    save.features.push({"type":"Feature","id":topp,"properties":{"name":lineas[i].name,"fill":lineas[i].color,"size":lineas[i].size, "texto":lineas[i].texto},"geometry":{"type":"LineString","coordinates": lineas[i].coordinates}}); // LineString format tiene 1 bracket menos.
    }
    
   for (var i = 0; i <markers.length; i++) {topp=topp+1;
       
    save.features.push({"type":"Feature","id":topp,"properties":{"name":markers[i].name,"fill":markers[i].color,"size":markers[i].size, "texto":markers[i].texto},"geometry":{"type":"Point","coordinates": markers[i].coordinates}}); // LineString format tiene 1 bracket menos.
    } 
    
  // world.poligonos=poligonos;
  // var archivo={"type":"FeatureCollection","features":poligonos};
  /* console.log(JSON.stringify(save.poligonos));
   console.log(JSON.stringify(save.lineas));
   console.log(JSON.stringify(save.puntos));*/
saveText( JSON.stringify(save), "filename.json" );

});

    self.getg = function() {
        return g;
    };
        self.getfeatures = function() {
        return features;
    };
        self.getpath = function() {
        return path;
    };
    self.getsettings = function() {
        return settings;
    }; 
    self.getprojection = function() {
        return projection;
    }; 
    self.geth = function() {
        return h;
    }; 
    

 $('.background').css('fill', settings.mapstyle.ocean);
      $("#map").css('background-color', settings.mapstyle.ocean);
      $('#states').css('fill', settings.mapstyle.region);
      $('#state-borders').css('stroke', settings.mapstyle.border);


switch(settings.plugin) {
      case "cloropleth": 
          settings.keys[0] = "location";
          settings.keys[1] = "values";
          docloropleth(g, features, path, dataload,settings);
      break;
      case "bubble":
          setkeys("coordinates");
     var points=formatgeo(dataload, "circle",settings);
        addcircles(g, points, projection);     
      break;
      case "pulse": 
               setkeys("coordinates"); 
        var points=formatgeo(dataload, "circle",settings);
        if(settings.animate)dopulseanimation(g, points, projection,settings);
            else dopulse(g, points, projection,settings);
      break;
      case "text": 
         if(!setlatlon())features=addsometext(features, dataload,settings),addnames(features, g,path,settings,1)
    else addnamecoord(dataload, g,projection,settings);
      break;
      case "images":
          
        addimagecoord(dataload, g,projection,settings);
      break;
      case "arcs": 
         var arcdata=findCoordinatesByAttribute(features,dataload);
             if(settings.animate)fly2animate(h,arcdata, projection,settings);
            else fly2(h,arcdata, projection,settings);
      break;
      case "barchart": 
          setkeys("location");
          dobarchart(g,projection,features,path,dataload,settings);
      break;
      case "stackedbar": 
          setkeys("location");
          dostackedbar(g,projection,features,path,dataload,settings);
      break;
  default:
      break;
      
      }
function setkeys(id){
 var keyset = d3.keys(dataload[0]);
 settings.keys[0] = id;
 var found = keyset.indexOf(settings.keys[0]);
        keyset.splice(found, 1);
 settings.keys[1] = keyset;
 console.log(settings.keys[0])
 console.log(settings.keys[1])
}
function setlatlon(){
 var keyset = d3.keys(dataload[0]);
 if ($.inArray('latitude', keyset) > -1 ) {settings.keys[0] = ["latitude","longitude"];return true;}
 else {return false;}

}

//docloropleth(g,features,path);
var headers = d3.keys(dataload[0]);
if(settings.showtable&&(settings.dataurl||settings.plugin))var Table= new drawtable(dataload,headers);
else{$('#rotate').css('display', 'none');}
if(!settings.editpanel)$('#rotate2').css('display', 'none');

// Table.getdata(); get modified data from the Table object
var option = '';
headers.forEach(function(d, i) {
    option += '<option value="'+ d + '">' + d + '</option>';
});
$('#colorcolumn').append(option).selectpicker('refresh');
$('#sizecolumn').append(option).selectpicker('refresh');
 $('#category').append(option);
 $('#category').selectpicker('refresh');
 // to save colorcolumn and sizecolumn
$('#plugin').on('change', function() {
    $('#custom').css('display', 'none');
    $('#category').selectpicker('show');  
    $( "#appendable" ).empty();
    $( "#info" ).empty();
  var field = this.value;
  switch(field) {
      case "cloropleth":
           $('#info').text('Select the column that has the location and a column with the data.');
var sel = $('<select id="one" data-width="fit">').appendTo('#appendable');
sel.append('<option value="default">Data</option>');
sel.append(option);
      break;
       case "circles":
            $('#info').text('Select the lat/lon coordinates from the dropdown and the data for the size (press advanced for colors).')
           var sel = $('<select id="one" data-width="fit">').appendTo('#appendable');
sel.append('<option value="default">Data</option>');
sel.append(option);
// In case no number and classes, count number of clases if too many alert
        break;
       case "pulse":
             $('#info').text('Select the lat/lon coordinates from the dropdown and the data for the size (press advanced for colors).')
     var sel = $('<select id="one" data-width="fit">').appendTo('#appendable');
sel.append('<option value="default">Data</option>');
sel.append(option);
//in pulse show infomation about pulse on corner
        break;
       case "text":
             $('#info').text('Select the location or lat/lon coordinates from the dropdown and the text (advanced for more options).')
     var sel = $('<select id="one" data-width="fit">').appendTo('#appendable');
sel.append('<option value="default">Data</option>');
sel.append(option);
$('#custom').css('display', 'inline-block');

//var sel = $('<br>Text <input id="font" type="text" />').appendTo('#advanced');


//in pulse show infomation about pulse on corner
        break;
       case "arcs":
           $('#info').text('Select a location or the lat/lon coordinates for the origin and the target.')
           $('#category').selectpicker('hide');
           var sel = $('<select id="one" multiple data-width="fit" title="Source">').appendTo('#appendable');
sel.append(option);
var sel = $('<select id="two" multiple data-width="fit" title="Target">').appendTo('#appendable');
sel.append(option);
        break;
       case "barchart":
           $('#info').text('Select a location and the columns with the data you want to show')
           var sel = $('<select id="one" multiple data-width="fit" title="Data Columns">').appendTo('#appendable');
sel.append(option);
        break;
       case "stackedbar":
               $('#info').text('Select a location and the columns with the data you want to show')
           var sel = $('<select id="one"  multiple data-width="fit" title="Data Columns">').appendTo('#appendable');
sel.append(option);
        break;
      
      default:
      
  }
 $('#one').selectpicker();
 $('#two').selectpicker();
  
})

$('#addnames').click(function() {
    var $this = $(this);
    // $this will contain a reference to the checkbox   
    if ($this.is(':checked')) {
addnames(features,g,path,settings,0);
    } else {
        g.selectAll('.subunit-label').remove();
    }
});
$('#savesvg').click(function() {
startdownload();
});

$('#anim').click(function() {
    var $this = $(this);
      
    if ($this.is(':checked')) {
settings.animate=true;
    } else {
        settings.animate=false;
    }
});
$('#addgraticule').click(function() {
    var $this = $(this);
    // $this will contain a reference to the checkbox   
    if ($this.is(':checked')) {
addgraticule(g,graticule,path);
    } else {
        g.selectAll('.graticule').remove();
    }
});
$('#adv').click(function() {
    if($('#advanced').css('display') === 'none')
{
$('#advanced').css('display', 'inline-block');
}
else{$('#advanced').css('display', 'none');}
    
});
$('#addplugin').click(function() {
    settings.urldata=1;
var oncat=$("#category :selected").text();
var doplugin=$("#plugin :selected").val();

settings.keys[2]=$("#colorcolumn :selected").text();
settings.keys[3]=$("#sizecolumn :selected").text();
switch(doplugin) {
    case "cloropleth":
        getkeys();
       // console.log($(settings.keys[0]).size())
        //var clordata1=createmap.filterename(Table.getdata(),settings);
        //var clorodata=[{country:"US", value:"one"}, {country:"CL", value:"one"},{country:"AR", value:"two"},{country:"BR", value:"two"},{country:"EG", value:"three"},{country:"BE", value:"three"},{country:"DE", value:"three"},{country:"NL", value:"three"}];
     //   var clorodata=[{country:"US", value:1}, {country:"CL", value:2},{country:"AR", value:3},{country:"BR", value:3},{country:"EG", value:5},{country:"BE", value:6},{country:"DE", value:6},{country:"NL", value:7}];
        docloropleth(g, features, path, dataload,settings);
        break;
    case "circles":
        getkeys();
   var points1= [
 {coordinates: [21.32,  -7.32], color: 'red',size: 45, name: 'Bubble 1', texto: 'red'},
 {coordinates: [12.32, 27.32], color: 'blue', size: 25, name: 'Bubble 2'},
 {coordinates: [0.32, 23.32], color: 'magenta', size: 35, name: 'Bubble 3'},
 {coordinates: [-31.32, 23.32], color: 'black', size: 55, name: 'Bubble 4'}
];       // drawtable(points,settings.dataType,0);
       var points=formatgeo(dataload, "circle",settings);
        addcircles(g, points, projection);
        break;
    case "pulse":
    getkeys();
     var points1= [
 {coordinates: [21.32,  -7.32], color: 'red',size: 45, name: 'Bubble 1', texto: 'red'},
 {coordinates: [12.32, 27.32], color: 'blue', size: 25, name: 'Bubble 2'},
 {coordinates: [0.32, 23.32], color: 'magenta', size: 35, name: 'Bubble 3'},
 {coordinates: [-31.32, 23.32], color: 'black', size: 55, name: 'Bubble 4'}
];var points=formatgeo(dataload, "circle",settings);
        if(settings.animate)dopulseanimation(g, points, projection,settings);
            else dopulse(g, points, projection,settings);
        
        break;
    case "text":
    getkeys();
    if($(settings.keys[0]).size()===1)features=addsometext(features, dataload,settings),addnames(features, g,path,settings,1)
    else addnamecoord(dataload, g,projection,settings);
        break;
    case "arcs":
    settings.keys[0] = [];
$.each($("#one option:selected"), function(){
settings.keys[0].push($(this).val());
});
$.each($("#two option:selected"), function(){
settings.keys[0].push($(this).val());
});

// 2 arccases, coordinates given, or code given. Also can get coordinates from geomapping
//var arcdata=[{origin:"ES",target:"US"},{origin:"US",target:"CL"},{origin:"CL",target:"AR"},{origin:"AR",target:"BR"},{origin:"BR",target:"EG"},{origin:"EG",target:"BE"}];
if(settings.dataurl)var arcdata=formatforarc(dataload,settings,features);
else var arcdata=findCoordinatesByAttribute(features,dataload);
            if(settings.animate)fly2animate(h,arcdata, projection,settings);
            else fly2(h,arcdata, projection,settings);
        break;
    case "stackedbar":
         settings.keys[0] = [];
         settings.keys[1] = [];
$.each($("#category option:selected"), function(){
settings.keys[0].push($(this).val());
});
$.each($("#one option:selected"), function(){
settings.keys[1].push($(this).val());
});
        dostackedbar(g,projection,features,path,dataload,settings);
        break;
    case "barchart":
                 settings.keys[0] = [];
         settings.keys[1] = [];
$.each($("#category option:selected"), function(){
settings.keys[0].push($(this).val());
});
$.each($("#one option:selected"), function(){
settings.keys[1].push($(this).val());
});
if(!settings.dataurl){setkeys();}
        dobarchart(g,projection,features,path,dataload,settings);
        break; 
    default:
       
} 
//

//$("#elementId").val(); 
});
function getkeys(){
 settings.keys[0] = [];
$.each($("#category option:selected"), function(){
settings.keys[0].push($(this).val());
});
        settings.keys[1]=$("#one :selected").text();   
}


$('#reset').click(function() {

doagain(settings);
});
        



var zoom = d3.behavior.zoom()
    .on("zoom",function() {settings.project.zoomlevel=zoom.scale();
        g.attr("transform","translate("+ 
            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        h.attr("transform","translate("+ 
            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        g.selectAll("image")
        .attr("d", path.projection(projection))
        g.selectAll("#state-borders")
        .style("stroke-width", 0.2+1/(zoom.scale()));
        
        /*g.selectAll("circle")
        .attr("r", 6/zoom.scale());*/
          //.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")")
        /*h.selectAll('polygon');
        g.selectAll('polygon');
        g.selectAll('circle');*/
        //g.selectAll(".subunit-label")
        //.style("font-size", 15/zoom.scale());
        //.style("font-size", function() {return d3.select(this).style("font-size").replace("px", "")*zoom.scale();});
        g.selectAll("path")  
            .attr("d", path.projection(projection)); 
  });
svg.call(zoom); 
if(settings.project.zoomarea) {
svg     
        .call(zoomTo(1, 4).event);
    }  
    
    

  function zoomTo(){      
var point = projection(settings.project.zoomarea);
return  zoom
      .translate([settings.width / 2 - point[0] * settings.project.zoomlevel, settings.height / 2 - point[1] * settings.project.zoomlevel])
      .scale(settings.project.zoomlevel); 
  }
if(!settings.zoomable){ svg.on(".zoom", null);}
if(settings.shownames){addnames(features,g,path,settings,0);}

$(document).ready(function(){
      $("#nRadius-value").text(ancho);
      $("#pRadius-value").text(pradius);
$("#target").click(function() {addpoint=0,done=0;
 // alert( "Handler for .click() called." );
 svg.on(".zoom", null);
    drawpolygon();
    drawpoli=1;
    drawlinea=0;
    borrar=0;
 
});
$("#other").click(function() {addpoint=0,done=0;
 // alert( "Handler for .click() called." );
 svg.on(".zoom", null);
    drawline();
    drawlinea=1;
    drawpoli=0;
    borrar=0;
 

 
});
$("#delete").click(function() {addpoint=0,done=0;
 // alert( "Handler for .click() called." );
     svg.on('mouseup', function(){});
    // h.selectAll("circle")
    // h.selectAll("circle").remove();
            svg.call(zoom);
    borrar=1;
    drawlinea=0;
    drawpoli=0; 
 
});
$("#finish").click(function() {addpoint=0;
 // alert( "Handler for .click() called." );

     svg.on('mouseup', function(){});
    // h.selectAll("circle")
    // h.selectAll("circle").remove();
            svg.call(zoom);
    borrar=0;
    drawlinea=0;
    drawpoli=0;
    done=1;
});
$("#point").click(function() {done=0;
 // alert( "Handler for .click() called." );
  addpoint=1;
     svg.on('mouseup', function(){});
    // h.selectAll("circle")
    // h.selectAll("circle").remove();
            svg.call(zoom);
    borrar=0;
    drawlinea=0;
    drawpoli=0;
 
});
$( ".jscolor" ).change(function() {
    color="#"+$( ".jscolor" ).val();
    settings.defaultfill=color;

});

 $('#font').fontselect().change(function(){
        
          // replace + signs with spaces for css
          var font = $(this).val().replace(/\+/g, ' ');
          
          // split font into family and weight
          settings.font.family = font.split(':')[0];
          
          // $('p').css('font-family', font[0]);
          
});
   
$( "#nRadius" ).change(function() {
    ancho=$( "#nRadius" ).val();
  $("#nRadius-value").text(ancho);
});
$( "#pRadius" ).change(function() {
    pradius=$( "#pRadius" ).val();
  $("#pRadius-value").text(pradius);
});
$('#addtext').click(function() {
    var $this = $(this);
    // $this will contain a reference to the checkbox   
    if ($this.is(':checked')) {
        addtext=1;
    } else {
        addtext=0;
    }
});
$('#removepath').click(function() {
    var $this = $(this);
    // $this will contain a reference to the checkbox   
    if ($this.is(':checked')) {
   
        //document.getElementById(state-borders).style.stroke="#000";
        d3.selectAll("path").style("stroke", "transparent");
    } else {
        d3.selectAll("path").style("stroke", "#e0ebeb");
    }
});

$('#load').click(function() {
 load();   
});
$('#stylesel').on('change', function() {
  var field = this.value;
  switch(field) {
      case "default":
      $('.background').css('fill', '#5F8791');
      $('#map').css('background-color', '#5F8791');
      $('#states').css('fill', '#F3F3F3');
      $('#state-borders').css('stroke', '#ffffff');
      settings.mapstyle.ocean= '#5F8791';
      settings.mapstyle.region='#F3F3F3';
      settings.mapstyle.border= "#ffffff";
      break;    
      case "soft":     
      $('.background').css('fill', '#D0E8EA');
      $('#map').css('background-color', '#D0E8EA');
      $('#states').css('fill', '#f8f7f7');
      $('#state-borders').css('stroke', '#ffffff');
      settings.mapstyle.ocean= '#D0E8EA';
      settings.mapstyle.region='#f8f7f7';
      settings.mapstyle.border= "#ffffff";
      break;      
      case "blackwhite":
      $('.background').css('fill', '#0E001C');
      $('#map').css('background-color', '#0E001C');
      $('#states').css('fill', '#F0F0F0');
      $('#state-borders').css('stroke', '#D1D1D1');
      settings.mapstyle.ocean= '#0E001C';
      settings.mapstyle.region='#F0F0F0';
      settings.mapstyle.border= "#D1D1D1";            
      break;
      case "greyscale":
      $('.background').css('fill', '#ABABAB');
      $('#map').css('background-color', '#ABABAB');
      $('#states').css('fill', '#CFCFCF');
      $('#state-borders').css('stroke', '#F6F6F6');
      settings.mapstyle.ocean= '#ABABAB';
      settings.mapstyle.region='#CFCFCF';
      settings.mapstyle.border= "#F6F6F6";             
      break;
      case "classic":
      $('.background').css('fill', '#A3CDFF');
      $('#map').css('background-color', '#A3CDFF');
      $('#states').css('fill', '#EAE5E1');
      $('#state-borders').css('stroke', '#FFFFFF');
      settings.mapstyle.ocean= '#A3CDFF';
      settings.mapstyle.region='#EAE5E1';
      settings.mapstyle.border= "#FFFFFF";            
      break;
      case "paper":
      $('.background').css('fill', '#E9F0FF');
      $('#map').css('background-color', '#E9F0FF');
      $('#states').css('fill', '#FFFFFF');
      $('#state-borders').css('stroke', '#F5F5F5');
      settings.mapstyle.ocean= '#E9F0FF';
      settings.mapstyle.region='#FFFFFF';
      settings.mapstyle.border= "#F5F5F5";            
      break;
      case "strong":
      $('.background').css('fill', '#4A5B62');
      $('#map').css('background-color', '#4A5B62');
      $('#states').css('fill', '#F6F6F6');
      $('#state-borders').css('stroke', '#FFFFFF');
      settings.mapstyle.ocean= '#4A5B62';
      settings.mapstyle.region='#F6F6F6';
      settings.mapstyle.border= "#FFFFFF";           
      break;
      case "doom":
      $('.background').css('fill', '#24282B');
      $('#map').css('background-color', '#24282B');
      $('#states').css('fill', '#51625C');
      $('#state-borders').css('stroke', '#869791');
      settings.mapstyle.ocean= '#24282B';
      settings.mapstyle.region='#51625C';
      settings.mapstyle.border= "#869791";            
      break;
      
      default:
          
    }
});
});
drawpolygon = function () {
//console.log(zoom.scale());  console.log(zoom.translate());    
var dragging = false, drawing = false, startPoint;
var points = [], g;
// behaviors
/*var dragger = d3.behavior.drag()
    .on('drag', handleDrag)
    .on('dragend', function(d){
        dragging = false;
    });*/
svg.on('mouseup', function(){
    if(dragging) return;
    drawing = true;
    startPoint = [d3.mouse(this)[0], d3.mouse(this)[1]];
   // console.log(d3.mouse(this));
  // h.selectAll("polygon").style("stroke", "transparent");
   // h.select("polygon").stroke = 'transparent';
    if(svg.select('g.drawPoly').empty()) g = svg.append('g').attr('class', 'drawPoly');
    if(d3.event.target.hasAttribute('is-handle')) {
        
        closePolygon();
        return;
    };
    points.push(startPoint);
    g.select('polyline').remove();
    var polyline = g.append('polyline').attr('points', points)
                    .style('fill', 'none')
                    .attr('stroke', '#000');
    for(var i = 0; i < points.length; i++) {
        g.append('circle')
        .attr('cx', points[i][0])
        .attr('cy', points[i][1])
        .attr('r', 4)
        .attr('fill', 'yellow')
        .attr('stroke', '#000')
        .attr('is-handle', 'true')
        .style({cursor: 'pointer'});
    }
});
function closePolygon() {
   // h = svg.append('g');
//   console.log(points[0][0]-zoom.translate()[0])
    namepol.push("");
    textpol.push("");
    for(var i = 0; i < points.length; i++) {
        points[i][0]=(points[i][0]-zoom.translate()[0])/zoom.scale();
        points[i][1]=(points[i][1]-zoom.translate()[1])/zoom.scale();
      //  console.log(points[i][0]),console.log(points[i][1]);
        var circle = h.selectAll('circles')
        .data([points[i]])
        .enter()
        .append('circle')
        .attr('cx', points[i][0])
        .attr('cy', points[i][1])
        .attr('r', 4/zoom.scale())
        .attr('fill', '#FDBC07')
        .attr('stroke', '#000')
        .attr('is-handle', 'true')
        /*.style({cursor: 'move'})
        .call(dragger);*/
    }
    if(polygonArea(points)<0)points=reverse(points); // hacer CCW
   // points.push({"id":identificador});
  // console.log(points);
    svg.select('g.drawPoly').remove();
    h.append('polygon')
    .data(points)
    .attr('points', points)
    .style('fill', color)
    .attr("class", 'polygon');
    //.style('stroke', "#ff8532")
    /*.on("mouseover", function(d) { if(done||borrar)this.style.stroke = "#ff8532";})
    .on("mouseout", function(d) { if(done||borrar)this.style.stroke = 'transparent';})
    .on("click", function(a) { console.log(a);if(borrar)borra(a,1),this.remove();  // usar el primer punto como identificador para borrar.
//
////ask if delete
})*/


   // poligonos.push.apply(poligonos, [[].concat.apply([], points)]); // cada poli es un arreglo distinto
   // 
   //points=reverse(points);
     // revertir CCW
  // console.log(polygonArea(points));
   poligonost=[];
   poligonost.push.apply(poligonost, points);
   poligonos.push({"color":color, "coordinates":poligonost});
    points.splice(0);
    drawing = false;
    h.selectAll("circle").remove();
    
    if(addtext){
 var loading = document.getElementById ( "contact" );
    loading.style.visibility = "visible" ;
         $(function() {
    var dialogx, form;
    
 
   function sendemail() {
       var elemail=$( "#pregunta" ).val();
       var elenom=$( "#fname" ).val();
       poligonos[poligonos.length - 1].texto=elemail;
       poligonos[poligonos.length - 1].name=elenom;
       namepol[namepol.length - 1]=elenom;
       textpol[textpol.length - 1]=elemail;
      // marks[0].texto=elenom;
       
       
    dialogx.dialog(  "close" );
  
    }
 
    dialogx = $( "#contact" ).dialog({
      autoOpen: false,
      resizable: false,
      width: 400,
      modal: true,
      buttons: {
        "Enviar": sendemail,
        Cancel: function() {
          dialogx.dialog(  "close" );
        }
      },
      close: function() {
        $( "#pregunta" ).val(''),$( "#fname" ).val('');
     //   allFields.removeClass( "ui-state-error" );
      }
    });
 
  dialogx.dialog( "open" );
  });}
  h.selectAll("polygon")
    .on("mouseover", function(d) { if(done||borrar)this.style.stroke = "#ff8532";})
    .on("mouseout", function(d) { if(done||borrar)this.style.stroke = 'transparent';})
    .on("click", function(a,i) { if(borrar)borra(a,1),this.remove();else{showbox(namepol[i],textpol[i])}  // usar los primeros dos puntos como identificador

}); 
}
svg.on('mousemove', function() {
    if(!drawing) return;
    var g = d3.select('g.drawPoly');
    g.select('line').remove();
    var line = g.append('line')
                .attr('x1', startPoint[0])
                .attr('y1', startPoint[1])
                .attr('x2', d3.mouse(this)[0] + 2)
                .attr('y2', d3.mouse(this)[1])
                .attr('stroke', '#53DBF3')
                .attr('stroke-width', 1);
})



}

drawline = function () {
//console.log(zoom.scale());  console.log(zoom.translate());    
var dragging = false, drawing = false, startPoint;
var points = [], g;

svg.on('mouseup', function(){
    if(dragging) return;
    drawing = true;
    startPoint = [d3.mouse(this)[0], d3.mouse(this)[1]];
   // console.log(d3.mouse(this));
    if(svg.select('g.drawPoly').empty()) g = svg.append('g').attr('class', 'drawPoly');
    if(d3.event.target.hasAttribute('is-handle')) { // doble click on las point to end
        closeLine();
        return;
    };
  
    points.push(startPoint);
    g.select('polyline').remove();
    var polyline = g.append('polyline').attr('points', points)
                    .style('fill', 'none')
                    .attr('stroke', '#000');
    for(var i = 0; i < points.length; i++) {
        g.append('circle')
        .attr('cx', points[i][0])
        .attr('cy', points[i][1])
        .attr('r', 4)
        .attr('fill', 'yellow')
        .attr('stroke', '#000')
        .attr('is-handle', 'true')
        .style({cursor: 'pointer'});
    }
});

function closeLine() {
   // h = svg.append('g');
//   console.log(points[0][0]-zoom.translate()[0])
    namelin.push("");
    textlin.push("");
    for(var i = 0; i < points.length; i++) {
        points[i][0]=(points[i][0]-zoom.translate()[0])/zoom.scale();
        points[i][1]=(points[i][1]-zoom.translate()[1])/zoom.scale();
        var circle = h.selectAll('circles')
        .data([points[i]])
        .enter()
        .append('circle')
        .attr('cx', points[i][0])
        .attr('cy', points[i][1])
        .attr('r', 4/zoom.scale())
        .attr('fill', '#FDBC07')
        .attr('stroke', '#000')
        .attr('is-handle', 'true')
        /*.style({cursor: 'move'})
        .call(dragger);*/
    }
    svg.select('g.drawPoly').remove();
    h.append('polyline')
    .data(points)
    .attr('points', points)
    .style('fill', 'none')
    .attr('stroke', color)
    .attr('stroke-width', ancho)
    .attr("id", 'linea'); 
   // .on("mouseover", function(d) { if(done||borrar)d3.select(this).style("stroke-opacity", 0.2);})
   // .on("mouseout", function(d) { if(done||borrar)d3.select(this).style("stroke-opacity", 1);})
    
   // lineas.push.apply(lineas, [[].concat.apply([], points)]);
   lineast=[];
   lineast.push.apply(lineast, points);
   lineas.push({"color":color, "size":ancho, "coordinates":lineast});
    points.splice(0);
    drawing = false;
    h.selectAll("circle").remove();
if(addtext){
 var loading = document.getElementById ( "contact" );
    loading.style.visibility = "visible" ;
         $(function() {
    var dialogx, form;
    
 
   function sendemail() {
       var elemail=$( "#pregunta" ).val();
       var elenom=$( "#fname" ).val();
       namelin[namelin.length - 1]=elenom;
       textlin[textlin.length - 1]=elemail;
       lineas[lineas.length - 1].texto=elemail;
       lineas[lineas.length - 1].name=elenom;
      // marks[0].texto=elenom;
       
       
    dialogx.dialog(  "close" );
  
    }
 
    dialogx = $( "#contact" ).dialog({
      autoOpen: false,
      resizable: false,
      width: 400,
      modal: true,
      buttons: {
        "Enviar": sendemail,
        Cancel: function() {
          dialogx.dialog(  "close" );
        }
      },
      close: function() {
        $( "#pregunta" ).val(''),$( "#fname" ).val('');
     //   allFields.removeClass( "ui-state-error" );
      }
    });
 
  dialogx.dialog( "open" );
  });}    
   h.selectAll("polyline")
    .on("mouseover", function(d,i) { if(done||borrar)d3.select(this).style("stroke-opacity", 1);})
    .on("mouseout", function(d,i) { if(done||borrar)d3.select(this).style("stroke-opacity", 0.6);})
    .on("click", function(a,i) { if(borrar)borra(a,2),this.remove();else{showbox(namelin[i],textlin[i]);}  // usar los primeros dos puntos como identificador

});
}
svg.on('mousemove', function() {
    if(!drawing) return;
    var g = d3.select('g.drawPoly');
    g.select('line').remove();
    var line = g.append('line')
                .attr('x1', startPoint[0])
                .attr('y1', startPoint[1])
                .attr('x2', d3.mouse(this)[0] + 2)
                .attr('y2', d3.mouse(this)[1])
                .attr('stroke', color)
                .attr('stroke-width', 1);
})

}
function borra(punto, tipo) {//console.log(punto)
    if (tipo===1){
    for (var i = 0; i < poligonos.length; i++) {
        
        if(poligonos[i].coordinates[0]===punto)poligonos.splice(i, 1);
    }

}
if (tipo===2){
 for (var i = 0; i <lineas.length; i++) {
        
         if(lineas[i].coordinates[0]===punto)lineas.splice(i, 1);
    }
   
}
else{
    
markers.splice(punto, 1);

}   
}


reverse = function(obj){ // reverse from counterclockwise
    var tmp = [];
    for(var i=0, N=obj.length; i!==N; i++){
        tmp.push(obj.pop());
    }
    return tmp;
};

function polygonArea(obj) { 
    var area = 0;
    for (var i = 0; i < obj.length; i++) {
        j = (i + 1) % obj.length;
        area += obj[i][0] * obj[j][1];
        area -= obj[j][0]* obj[i][1];
    }
    return area / 2;
}
function clicked(d) {

         coordinates = projection.invert(coordinates)
         var marks = [{id:identificador, long: coordinates[0], lat: coordinates[1]}];
         markers.push({"color":color, "size":pradius, "coordinates":[coordinates[0],coordinates[1]]});
         identificador += 1;
         if(addtext){
 var loading = document.getElementById ( "contact" );
    loading.style.visibility = "visible" ;
         $(function() {
    var dialogx, form;
    
 
   function sendemail() {
       var elemail=$( "#pregunta" ).val();
       var elenom=$( "#fname" ).val();
       markers[markers.length - 1].texto=elemail;
       markers[markers.length - 1].name=elenom;
       marks[0].name=elenom;
       marks[0].texto=elemail;
       
       
    dialogx.dialog(  "close" );
  
    }
 
    dialogx = $( "#contact" ).dialog({
      autoOpen: false,
      resizable: false,
      width: 400,
      modal: true,
      buttons: {
        "Enviar": sendemail,
        Cancel: function() {
          dialogx.dialog(  "close" );
        }
      },
      close: function() {
        $( "#pregunta" ).val(''),$( "#fname" ).val('');
     //   allFields.removeClass( "ui-state-error" );
      }
    });
 
  dialogx.dialog( "open" );
  });}   
       
  /*  g.append("image") // add image
    .data(marks)
    .attr('class','mark')
    .attr('width', 5)
    .attr('height', 5)
    .attr("xlink:href",'https://cdn3.iconfinder.com/data/icons/softwaredemo/PNG/24x24/DrawingPin1_Blue.png')
    .attr("transform", function(d) {return "translate(" + projection([d.long,d.lat]) + ")";});*/
        
        g.append("circle") // aÃ±adir cirdulos
		.data(marks)
                .attr("class", 'circle')
		.attr("cx", function (d) { return projection([d.long, d.lat])[0]; })
		.attr("cy", function (d) { return projection([d.long, d.lat])[1]; })
		.attr("r", pradius)
                .attr("fill", color)
                .style("stroke", color)
                .style('stroke-width',pradius/30)
                .on("mouseover", function(d) { 
      if(done||borrar)this.style.stroke = "#ff8532";
      
    
    
    })
      .on("mouseout", function() { 
     if(done||borrar)this.style.stroke = color;
     
    })
    .on("click", function(a) { if(borrar)borra(a.id,3),this.remove();else{showbox(a.name, a.texto);}  // usar los primeros dos puntos como identificador
//
////ask if delete
});
		//.attr("fill", "red");
}
function saveText(text, filename){
  var a = document.createElement('a');
  a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
  a.setAttribute('download', filename);
  a.click()
}
function load(){

     var reader;
var arbol = 0;

  var progress = document.querySelector('.percent');

 

  function errorHandler(evt) {
    switch(evt.target.error.code) {
      case evt.target.error.NOT_FOUND_ERR:
        alert('File Not Found!');
        break;
      case evt.target.error.NOT_READABLE_ERR:
        alert('File is not readable');
        break;
      case evt.target.error.ABORT_ERR:
        break; // noop
      default:
        alert('An error occurred reading this file.');
    };
  }

  function updateProgress(evt) {
    // evt is an ProgressEvent.
    if (evt.lengthComputable) {
      var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
      // Increase the progress bar length.
      if (percentLoaded < 100) {
        progress.style.width = percentLoaded + '%';
        progress.textContent = percentLoaded + '%';
      }
    }
  }

  function handleFileSelect(evt) {
    // Reset progress indicator on new file selection.
    progress.style.width = '0%';
    progress.textContent = '0%';

    reader = new FileReader();
    reader.onerror = errorHandler;
    reader.onprogress = updateProgress;
    reader.onabort = function(e) {
      alert('File read cancelled');
    };
    reader.onloadstart = function(e) {
      document.getElementById('progress_bar').className = 'loading';
    };
    reader.onload = function(e) {
      // Ensure that the progress bar displays 100% at the end.
      progress.style.width = '100%';
      progress.textContent = '100%';
      setTimeout("document.getElementById('progress_bar').className='';", 2000);
      //alert(d3.csv.parse(reader.result));
     // alert(reader.result);
   // loadobjects(reader.result);
 
            loadobjects(reader.result);
      
      //loadobjectsmap(reader.result)
    };

    // Read in the image file as a binary string.
    reader.readAsText(evt.target.files[0]);
    //reader.readAsBinaryString(evt.target.files[0]);
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false); 
        function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}      
    
    
}

function loadobjects(poligon){
   // console.log(poligon);
    poligon=JSON.parse(poligon);
    save.features=poligon.features;
    topp= save.features[save.features.length-1].id;
   poligon.features.forEach(function(d, i) {
     if (d.geometry.type==="Polygon")fpoligonos.push(d);
         if (d.geometry.type==="LineString")flineas.push(d)
             if (d.geometry.type==="Point")fpuntos.push(d)
    
  });
   /* fpoligonos=poligon.features.filter(function(d) {
     return d.geometry.type="Polygon";
    
  });
  flineas=poligon.features.filter(function(d) {
     return d.geometry.type="LineString";
    
  });
  fpuntos=poligon.features.filter(function(d) {
     return d.geometry.type="Point";
    
  });*/
  
   /* save.poligonos=save.poligonos.concat(poligon.poligonos);
    save.lineas=save.lineas.concat(poligon.lineas);
    save.puntos=save.puntos.concat(poligon.puntos);*/
/* save.lineas=poligon.lineas;
 save.puntos=poligon.puntos;*/
        
   g.selectAll("polygon")
		.data(fpoligonos).enter()
		.append("polygon")
                .attr("class", 'polygon')
                //.attr('points', function(d) { return projection(d.geometry.coordinates);}) // project array not points
                .attr('points', projectarr ) // project array not points
		.attr("fill", function(d) { return d.properties.fill;})
                .on("mouseover", function(d) { if(done||borrar)this.style.stroke = "#ff8532";})
      .on("mouseout", function(d) { if(done||borrar)this.style.stroke = 'transparent';})
      .on("click", function(a) { if(borrar)save.features.removeValue('id', a.id),this.remove();else{showbox(a.properties.name, a.properties.texto);} });
    

   /* g.append("g")  // poly
      .attr("id", "poly")
    .selectAll("path")
      .data(fpoligonos)
    .enter().append("path")
    .style('fill', function(d) { return d.properties.color;})
      .attr("d", path)
      .on("mouseover", function(d) { if(done||borrar)this.style.stroke = "#ff8532";})
      .on("mouseout", function(d) { if(done||borrar)this.style.stroke = 'transparent';})
      .on("click", function(a) { if(borrar)save.features.removeValue('id', a.id),this.remove(); });*/

    g.append("g")  // lineas
      .attr("id", "linea")
    .selectAll("path")
      .data(flineas)
    .enter().append("path")
    .style('stroke', function(d) { return d.properties.fill;})
    .style('stroke-width', function(d) { return d.properties.size;})
    //.style('stroke', "#ff8532")
      .attr("d", path)
      .on("mouseover", function(d) { if(done||borrar)d3.select(this).style("stroke-opacity", 1);})
      .on("mouseout", function(d) { if(done||borrar)d3.select(this).style("stroke-opacity", 0.6);})
      .on("click", function(a) { if(borrar)save.features.removeValue('id', a.id),this.remove();else{showbox(a.properties.name, a.properties.texto);} }); 
        
        // add circles to svg
    addcircles(g,fpuntos,projection);    
 
        function projectarr(arr){
      var narr=[];
      arr.geometry.coordinates[0].forEach(function(d, i) {
                  narr.push(projection(d));      
                });
      return [narr];
  }       
    
}

Array.prototype.removeValue = function(name, value){
   var array = $.map(this, function(v,i){
      return v[name] === value ? null : v;
   });
   this.length = 0; //clear original array
   this.push.apply(this, array); //push all elements except the one we want to delete
}
function showbox(name, texto){
 var hiddin1 = d3.select(".box1");
  if (hiddin1.style("visibility") === "hidden") {
    
    if(name!==""&&name){hiddin1.style("visibility", "");
    $('h1').text(name);
    $("#textadd").text(texto);}
  } else {
    hiddin1.style("visibility", "hidden");
  
  }
  $("#opc1").click(function() {
   hiddin1.style("visibility", "hidden");
   $('h1').text("");
    $("#textadd").text("");
  });
}
/* mapstreet
function loadobjectsmap(collection){
    $("#map").css("width", "100vw");
    $("#map").css("height", "100vh");
    d3.select("body").selectAll("svg").remove();
    var hiddin1 = d3.select("#menu8");
    hiddin1.style("visibility", "hidden");
    collection=JSON.parse(collection);
var map = new L.Map("map", {center: [-30, -71], zoom: 5})
    .addLayer(new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"));

var svg = d3.select(map.getPanes().overlayPane).append("svg"),
    g = svg.append("g").attr("class", "leaflet-zoom-hide");


var fpoligonos=[];
var flineas=[];
var fpuntos=[];


collection.features.forEach(function(d, i) {
     if (d.geometry.type==="Polygon")fpoligonos.push(d);
         if (d.geometry.type==="LineString")flineas.push(d)
             if (d.geometry.type==="Point")fpuntos.push(d)
    
  });

  var transform = d3.geo.transform({point: projectPoint}),
      path = d3.geo.path().projection(transform);

  var feature = g.selectAll("path")
      .data(fpoligonos)
    .enter().append("path").style('fill', function(d) { return d.properties.fill;})
    .on("mouseover", function(d) { this.style.stroke = "#ff8532",d3.select(this).style("cursor", "pointer");})
                .on("mouseout", function(d) { this.style.stroke = "transparent", d3.select(this).style("cursor", "default");});

  var feature1 = g.selectAll("linea")
      .data(flineas)
    .enter().append("path").attr("class", 'linea')
    .style('stroke', function(d) { return d.properties.fill;})
    .style('stroke-width', function(d) { return d.properties.size;})
    .on("mouseover", function(d) { d3.select(this).style("stroke-opacity", 1),d3.select(this).style("cursor", "pointer");})
      .on("mouseout", function(d) { d3.select(this).style("stroke-opacity", 0.6), d3.select(this).style("cursor", "default");})
      
  var feature2 = g.selectAll("circle")
      .data(fpuntos)
    .enter().append("path")
    .attr("class", 'circle')
    .attr("r", function(d) { return d.properties.size;})
		.style("fill", function(d) { return d.properties.fill;})
                .on("mouseover", function(d) { this.style.stroke = "#ff8532",d3.select(this).style("cursor", "pointer");})
                .on("mouseout", function(d) { this.style.stroke = "transparent", d3.select(this).style("cursor", "default");})


  map.on("viewreset", reset);
  reset();

  // Reposition the SVG to cover the features.
  function reset() {
    var bounds = path.bounds(collection),
        topLeft = bounds[0],
        bottomRight = bounds[1];

    svg .attr("width", bottomRight[0] - topLeft[0])
        .attr("height", bottomRight[1] - topLeft[1])
        .style("left", topLeft[0] + "px")
        .style("top", topLeft[1] + "px");

    g   .attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

    feature.attr("d", path)
    .on("click", function(a,i) {showbox(a.properties.name, a.properties.texto); // usar los primeros dos puntos como identificador

});
feature1.attr("d", path)
    .on("click", function(a,i) {showbox(a.properties.name, a.properties.texto); // usar los primeros dos puntos como identificador

});
feature2.attr("d", path)
    .on("click", function(a,i) {showbox(a.properties.name, a.properties.texto); // usar los primeros dos puntos como identificador

});
  }

  // Use Leaflet to implement a D3 geometric transformation.
  function projectPoint(x, y) {
    var point = map.latLngToLayerPoint(new L.LatLng(y, x));
    this.stream.point(point.x, point.y);
  }

function showbox(name, texto){
 var hiddin1 = d3.select(".box1");
  if (hiddin1.style("visibility") === "hidden") {
    
    if(name!==""&&name){hiddin1.style("visibility", "");
    $('h1').text(name);
    $("#textadd").text(texto);}
  } else {
    hiddin1.style("visibility", "hidden");
  
  }
  $("#opc1").click(function() {
   hiddin1.style("visibility", "hidden");
   $('h1').text("");
    $("#textadd").text("");
  });
}
}*/ 
function polygonArea(points) {
  var sum = 0.0;
  var length = points.length;
  if (length < 3) {
    return sum;
  }
  points.forEach(function(d1, i1) {
    i2 = (i1 + 1) % length;
    d2 = points[i2];
    sum += (d2[1] * d1[0]) - (d1[1] * d2[0]);
  });
  return sum / 2;
}
    }
   
switch(settings.dataType) {
    
    case "csv":
        queue().defer(d3.json, "topojson/"+regionnames[settings.region])
        .defer(d3.csv,settings.dataurl)
        .await(loaded);
    break;
    case "json":
        queue().defer(d3.json, "topojson/"+regionnames[settings.region])
        .defer(d3.json,settings.dataurl)
        .await(loaded);
    break;
    default:
    queue().defer(d3.json, "topojson/"+regionnames[settings.region])
        // access settings.data inside loaded.
        .await(loadlocal);
    break;
            
            }

}

  function fly(g,path,arcdata, arc) {
//TEXT ON ARCS https://www.visualcinnamon.com/2015/09/placing-text-on-arcs.html
      arcdata.forEach(function(d, i) {
    var route = g.append("path")
                   .datum({type: "LineString", coordinates: d})
                   .attr("class", "route")
                   .style('stroke-linecap', 'round')
                   .attr("d", path);
           });
           

  }

  function fly2(h,arcdata, projection,settings) {
//TEXT ON ARCS https://www.visualcinnamon.com/2015/09/placing-text-on-arcs.html

  var defs = h.append("defs")
  
  

		defs.append("marker")
				.attr({
					"id":"arrow",
					"viewBox":"0 -5 10 10",
					"refX":5,
					"refY":0,
					"markerWidth":4,
					"markerHeight":4,
                                        "fill":settings.defaultfill,
					"orient":"auto"
				})
				.append("path")
					.attr("d", "M0,-5L10,0L0,5")
					.attr("class","arrowHead");
                                
                                
                                		defs.append("marker")
				.attr({
					"id":"arrow2",
					"viewBox":"0 -5 10 10",
					"refX":5,
					"refY":0,
					"markerWidth":4,
					"markerHeight":4,
                                        "fill":settings.defaultfill,
					"orient":"auto-start-reverse"
				})
				.append("path")
                                        
					.attr("d", "M0,-5L10,0L0,5")
					.attr("class","arrowHead");

  var arcs= h.append("g")
			.attr("class","arcs")
                        .selectAll("path")
			.data(arcdata)
			.enter()
			.append("path")
                        .style("stroke-width", settings.defaultsize/10)
                        .style("stroke", settings.defaultfill) 
                
                       
                       /* .transition() // wait between arcs
                        .duration(1000)
                        .delay(function(d, i){
                                  return i*30
                          })*/
			.attr('d', function(d) {
				return lngLatToArc(d[0], d[1], 1.3); // A bend of 2 looks nice
			})                
                        .call(transition)
                       
 
 
 function addarrow(){
     arcs
      .attr('marker-end', "url(#arrow)");
     // .attr('marker-start', "url(#arrow)");*/
 }

function transition(path) {
  path.transition()
      .duration(settings.animduration)
      .attrTween("stroke-dasharray", tweenDash)
      .each("end", function() { addarrow(); });
}

function tweenDash() {
  var l = this.getTotalLength(),
      i = d3.interpolateString("0," + l, l + "," + l);
  return function(t) { return i(t); };
}
                        
                        
                       // var totalLength = arcs.node().getTotalLength();
                        

       

/* ANIMATION, NEGATIVE VALUES ON PATH AFFECT IT 
 * http://bl.ocks.org/duopixel/4063326
 * http://www.tnoda.com/blog/2014-04-02
 * https://bl.ocks.org/mbostock/5649592
 * https://bl.ocks.org/mbostock/1705868
    arcs
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
        .duration(5000)
        .ease("linear")
        .attr("stroke-dashoffset", 0);
                        */
              
      /*  h.selectAll("ellipse")
		.data(arcdata).enter()
		.append("ellipse")
                .attr("class", 'ellipse')
		.attr("cx", function (d) { return projection(d[1])[0]; })
		.attr("cy", function (d) { return projection(d[1])[1]; })
		.attr("rx", 5)           // set the x radius
                .attr("ry", 2)
		.attr("fill", "steelblue")
                .attr('fill-opacity',0.2);*/
      
      
      
/*h.selectAll("circle")
		.data(arcdata).enter()
		.append("circle")
                .attr("class", 'circle')
		.attr("cx", function (d) { return projection(d.geometry.coordinates)[0]; })
		.attr("cy", function (d) { return projection(d.geometry.coordinates)[1]; })
		.attr("r", function(d) { return d.properties.size;})
		.attr("fill", function(d) { return d.properties.fill;})
                .style("stroke", function(d) { return d.properties.fill;})
                .style('stroke-width',function(d) { return d.properties.size/30;});
                */
       
 /*     svg.append("g")
       .attr("class", "airports")
       .selectAll("path")
       .data(topojson.feature(airports, airports.objects.airports).features)
       .enter()
       .append("path")
       .attr("id", function(d) {return d.id;})
       .attr("d", path);
   *  
   * 
   * var plane = g.append("path")
                   .attr("class", "plane")
                   .attr("d", "m25.21488,3.93375c-0.44355,0 -0.84275,0.18332 -1.17933,0.51592c-0.33397,0.33267 -0.61055,0.80884 -0.84275,1.40377c-0.45922,1.18911 -0.74362,2.85964 -0.89755,4.86085c-0.15655,1.99729 -0.18263,4.32223 -0.11741,6.81118c-5.51835,2.26427 -16.7116,6.93857 -17.60916,7.98223c-1.19759,1.38937 -0.81143,2.98095 -0.32874,4.03902l18.39971,-3.74549c0.38616,4.88048 0.94192,9.7138 1.42461,13.50099c-1.80032,0.52703 -5.1609,1.56679 -5.85232,2.21255c-0.95496,0.88711 -0.95496,3.75718 -0.95496,3.75718l7.53,-0.61316c0.17743,1.23545 0.28701,1.95767 0.28701,1.95767l0.01304,0.06557l0.06002,0l0.13829,0l0.0574,0l0.01043,-0.06557c0,0 0.11218,-0.72222 0.28961,-1.95767l7.53164,0.61316c0,0 0,-2.87006 -0.95496,-3.75718c-0.69044,-0.64577 -4.05363,-1.68813 -5.85133,-2.21516c0.48009,-3.77545 1.03061,-8.58921 1.42198,-13.45404l18.18207,3.70115c0.48009,-1.05806 0.86881,-2.64965 -0.32617,-4.03902c-0.88969,-1.03062 -11.81147,-5.60054 -17.39409,-7.89352c0.06524,-2.52287 0.04175,-4.88024 -0.1148,-6.89989l0,-0.00476c-0.15655,-1.99844 -0.44094,-3.6683 -0.90277,-4.8561c-0.22699,-0.59493 -0.50356,-1.07111 -0.83754,-1.40377c-0.33658,-0.3326 -0.73578,-0.51592 -1.18194,-0.51592l0,0l-0.00001,0l0,0z");
*/
  function lngLatToArc(sourceLngLat, targetLngLat, bend){

      bend = bend || 1;
		// `d[sourceName]` and `d[targetname]` are arrays of `[lng, lat]`
		// Note, people often put these in lat then lng, but mathematically we want x then y which is `lng,lat`

                   
		// If no bend is supplied, then do the plain square root
		bend = bend || 1;
		// `d[sourceName]` and `d[targetname]` are arrays of `[lng, lat]`
		// Note, people often put these in lat then lng, but mathematically we want x then y which is `lng,lat`

		if (targetLngLat && sourceLngLat) {
			var sourceXY = projection( sourceLngLat ),
					targetXY = projection( targetLngLat );
			// Uncomment this for testing, useful to see if you have any null lng/lat values
			// if (!targetXY) console.log(d, targetLngLat, targetXY)
			var sourceX = sourceXY[0],
					sourceY = sourceXY[1];
			var targetX = targetXY[0],
					targetY = targetXY[1];
			var dx = targetX - sourceX,
					dy = targetY - sourceY,
					dr = Math.sqrt(dx * dx + dy * dy)*bend;
			// To avoid a whirlpool effect, make the bend direction consistent regardless of whether the source is east or west of the target
			var west_of_source = (targetX - sourceX) < 0;
			if (west_of_source) return "M" + targetX + "," + targetY + "A" + dr + "," + dr + " 0 0,1 " + sourceX + "," + sourceY;
			return "M" + sourceX + "," + sourceY + "A" + dr + "," + dr + " 0 0,1 " + targetX + "," + targetY;
			
		} else {
			return "M0,0,l0,0z";
		}
	}
      
  }
    function fly2animate(h,arcdata, projection,settings) {


  var defs = h.append("defs")
  
  

		defs.append("marker")
				.attr({
					"id":"arrow",
					"viewBox":"0 -5 10 10",
					"refX":5,
					"refY":0,
					"markerWidth":4,
					"markerHeight":4,
                                        "fill":settings.defaultfill,
					"orient":"auto"
				})
				.append("path")
					.attr("d", "M0,-5L10,0L0,5")
					.attr("class","arrowHead");
                                
                                
                                		defs.append("marker")
				.attr({
					"id":"arrow2",
					"viewBox":"0 -5 10 10",
					"refX":5,
					"refY":0,
					"markerWidth":4,
					"markerHeight":4,
                                        "fill":settings.defaultfill,
					"orient":"auto-start-reverse"
				})
				.append("path")
                                        
					.attr("d", "M0,-5L10,0L0,5")
					.attr("class","arrowHead");

  var arcs= h.append("g")
			.attr("class","arcs")
                        .selectAll("path")
			.data(arcdata)
			.enter()
			.append("path")
                        .style("stroke-width", settings.defaultsize/10)
                        .style("stroke", settings.defaultfill)
                         .style("stroke-dasharray", "10,2")
         
        
                        .transition() // wait between arcs
                        .duration(settings.animduration)
                        .delay(function(d, i){
                                  return i*settings.delay;
                         
                          })
                   
                  
                          .ease("linear")
			.attr('d', function(d) {
				return lngLatToArc(d[0], d[1], 1.3); // A bend of 2 looks nice
			})                
                        //.call(transition)
                        .attr('marker-start', function(d) { if((typeof(d[1]) !== 'undefined')&&(typeof(d[0]) !== 'undefined')){if((d[1][0]-d[0][0])<0)return "url(#arrow2)"}})
                        .attr('marker-end', function(d) { if((typeof(d[1]) !== 'undefined')&&(typeof(d[0]) !== 'undefined')){if((d[1][0]-d[0][0])>0)return "url(#arrow)"}})                                   


function transition(path) {
  path.transition()
      .duration(settings.delay)
      .attrTween("stroke-dasharray", tweenDash)

}

function tweenDash() {
  var l = this.getTotalLength(),
      i = d3.interpolateString("0," + l, l + "," + l);
  return function(t) { return i(t); };
}
                        
                  
                  
  function lngLatToArc(sourceLngLat, targetLngLat, bend){

      bend = bend || 1;
		// `d[sourceName]` and `d[targetname]` are arrays of `[lng, lat]`
		// Note, people often put these in lat then lng, but mathematically we want x then y which is `lng,lat`

                   
		// If no bend is supplied, then do the plain square root
		bend = bend || 1;
		// `d[sourceName]` and `d[targetname]` are arrays of `[lng, lat]`
		// Note, people often put these in lat then lng, but mathematically we want x then y which is `lng,lat`

		if (targetLngLat && sourceLngLat) {
			var sourceXY = projection( sourceLngLat ),
					targetXY = projection( targetLngLat );
			// Uncomment this for testing, useful to see if you have any null lng/lat values
			// if (!targetXY) console.log(d, targetLngLat, targetXY)
			var sourceX = sourceXY[0],
					sourceY = sourceXY[1];
			var targetX = targetXY[0],
					targetY = targetXY[1];
			var dx = targetX - sourceX,
					dy = targetY - sourceY,
					dr = Math.sqrt(dx * dx + dy * dy)*bend;
			// To avoid a whirlpool effect, make the bend direction consistent regardless of whether the source is east or west of the target
			var west_of_source = (targetX - sourceX) < 0;
			if (west_of_source) return "M" + targetX + "," + targetY + "A" + dr + "," + dr + " 0 0,1 " + sourceX + "," + sourceY;
			return "M" + sourceX + "," + sourceY + "A" + dr + "," + dr + " 0 0,1 " + targetX + "," + targetY;
			
		} else {
			return "M0,0,l0,0z";
		}
	}
      
  }
function addsometext(features,data,settings)
{
if (!settings.dataurl){settings.keys[0]="location",settings.keys[1]="text",settings.keys[2]="color",settings.keys[3]="size";}    
var key=settings.keys;
    
    var datatype=0;
//if(!settings.dataurl){ key=d3.keys(data[0]);}
/*var array = $.map(data, function(value, index) {
    return [value];
});*/
        var array = data.map(function(obj) {    
  return [obj[key[0]],obj[key[1]],obj[key[2]],obj[key[3]]]});
var identify=checkformat(array[0][0]);

features.forEach(function(d, i) {
  for (var j = 0; j < array.length; j++) { 
  if(d[identify]===array[j][0]){d.text=array[j][1];   
  if(typeof array[j][2] !== 'undefined') d.color= array[j][2];  
  if(typeof array[j][3] !== 'undefined') d.size=array[j][3];
        }
      }
  
   });
  return features;  
}


function addnames(features, g,path,settings,control){   
        g.selectAll(".subunit-label")
    .data(features)
  .enter().append("text")
    .attr("class", function(d) { return "subunit-label " + d.id; })
    .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
    .attr("dy", ".35em")
     .style("font-family", settings.font.family)
     .style("fill", function(d) { 
if (typeof d.color === 'undefined'&&!settings.font.color)return settings.font.color;
else if (settings.font.color) return settings.font.color;
else return d.color;})
    .style("font-size", function(d) { //console.log(d.name),console.log(path.area(d));
//return 5+Math.log(Math.abs(polygonArea(d.geometry.coordinates[0])));
//return 5+polygonArea(path.bounds(d));
if (typeof d.size === 'undefined'&&!settings.font.size)return Math.log(1+path.area(d)/2);
else if (settings.font.size) return settings.font.size;
else return d.size; 
})
    .text(function(d) { if (typeof d.text === 'undefined'&&!control) { return d.name;}else {return d.text;} })
       .on("mouseover", function(d) { this.style.stroke = "#ff8532";})
      .on("mouseout", function() { this.style.stroke = "transparent"; })
     // .on("click", function(d) { var newstyle=clickedit(d); this.style({"fill":"red","font-size": 20})});
     
}


    
function addgraticule(g,graticule,path){
    
    g.append("path")    // use path generator to draw a graticule
      .datum(graticule)
      .attr("class", "graticule")
      .attr("d", path);
}
function docloropleth(g,features,path, data,settings){
    var key=settings.keys;
    
    var datatype=0;
if(!settings.dataurl){ key=d3.keys(data[0]);}
/*var array = $.map(data, function(value, index) {
    return [value];
});*/
        var array = data.map(function(obj) {
  return obj[key[0]]});
var identify=checkformat(array[0]);
console.log(array);

if(!isNaN(data[0][key[1]])){datatype=1;console.log(key[1]);
var maxval=Math.max.apply(Math,data.map(function(obj) {return obj[key[1]];}));
var minval=Math.min.apply(Math,data.map(function(obj) {return obj[key[1]];}));
var rangeval=maxval-minval;console.log(minval);
var domain=[minval,(rangeval/4).toFixed(2),(rangeval/2).toFixed(2),(3*rangeval/4).toFixed(2),maxval];
}
   console.log(domain);
      g.append("g")
  .attr("id", "states")
  .selectAll("path")
  .data(features)
 // .data(topojson.object(map, map.objects.russia).geometries)
  //.data(topojson.feature(map, map.objects.russia).features) <-- in case topojson.v1.js
  .enter().append("path")
  .attr("d", path)
  .attr("id", "state-borders")
  .style("fill", function(d) {var check=$.inArray(d[identify], array);if(check>-1){
         if(!datatype){if(typeof data[check].color === 'undefined')return fill(data[check][key[1]]);else return data[check].color;}
         else {return settings.defaultfill;}
  }
    //return getColor(Math.floor(Math.random() * 6) + 1,6); 
     
     //else if (datatype) return settings.defaultfill;
     else {return settings.mapstyle.region;}
  })
  .style("stroke", settings.mapstyle.border)
  .style("stroke-width", 0.2+1/(settings.project.zoomlevel))
  .attr('fill-opacity', function(d) {var check=$.inArray(d[identify], array);
     if (datatype&&check>-1)return (data[check][key[1]]/rangeval);  // give them an opacity value based on their current value
    else{return 0.65;};
  })
   .on("mouseover", function(d) { this.style.stroke = "#ff8532";var check=$.inArray(d[identify], array);
     if (check>-1)d3.select('#showinfo').html("<b>"+d[identify]+"</b>"+"<br>Value: "+data[check][key[1]]); })
      .on("mouseout", function() { this.style.stroke = settings.mapstyle.border; });
 
if (datatype)addlegend(g,domain,"clor",settings);    
}
function dostackedbar(g, projection, features,path,dataload,settings){
    
//var header = d3.keys(dataload[0]);

//console.log(JSON.stringify(data))

var values = [];

var locations=[];

dataload.forEach(function(d, i) {
    locations.push(d[settings.keys[0]]); var pusher=[];
    settings.keys[1].forEach(function(l, j) {
     pusher.push(d[l]);   
}); values.push(pusher);   
});

 /* locations = locations.map(function(obj) {
  return Object.keys(obj).map(function(key) { 
    return obj[key];
  });
    
});*/

  values = values.map(function(obj) {
  return Object.keys(obj).map(function(key) { 
    return obj[key];
  });
    
});
    
var names = settings.keys[1];
var data = [{}];
var region=findCoordinatesAndArea(features,locations,path);
//var position=projection([21.32,-7.32]); +
for(var j = 0; j < locations.length; j++) {
if (typeof region[j] === 'undefined') { continue; }
    
var position=projection(region[j]); 


var scaleval=3*Math.log(3+region[j][2])/4;
var factor=d3.sum(values[j]);
//only works for negative latitude check other countries

if(position>0)var yOffset = position[1]+(scaleval*4);
else var yOffset = position[1]-(scaleval*4);
var xOffset = position[0]-(scaleval/2);
for(var i = 0; i < values[j].length; i++) {
    
    var datum = {
        
        value : values[j][i],
        colour : settings.colorscale((names[i])),
        name: names[i],
        x: xOffset,
        y: yOffset

    }
    
    yOffset += values[j][i]*scaleval*4/factor;
    
    data.push(datum);
        
}

//console.log(JSON.stringify(data));

      g.selectAll("rect")
		.data(data).enter()
		.append("rect")
                //.attr("class", 'circle')
                .on("mouseover", function(d) {this.style.stroke = "#ff8532"; d3.select('#showinfo').html("<b>"+d.name+"</b><br>"+d.value); })
                .on("mouseout", function(d) { this.style.stroke = "transparent"; d3.select('#showinfo').html("");})
		.attr("x", function (d) { return d.x })
		//.attr("cy", function (d) { return projection(-7.32); })
		.attr("width", scaleval)
                .attr("height", 0)
                .transition().duration(settings.animduration).ease("linear")
                .attr("height", function(d) { return d.value*scaleval*4/factor;})
                .attr("y", function(d) { return d.y;})
                .style("fill", function(d) { return d.colour;});
                //.attr("r", function(d) { return d.properties.size;})
               // .on("mouseover", function(d) { this.style.stroke = "#ff8532"; if ( typeof d.properties.texto !== 'undefined' )d3.select('#showinfo').html("<b>"+d.properties.name+"</b><br>"+d.properties.texto);else if( typeof d.properties.name !== 'undefined' )+d3.select('#showinfo').html("<b>"+d.properties.name+"</b>");})
               // .on("mouseout", function(d) { this.style.stroke = d.properties.fill;})
               // .on("click", function(a) { if(borrar)save.features.removeValue('id', a.id),this.remove();else{showbox(a.properties.name, a.properties.texto);} });
           }
       
addlegend(g,names,"bar",settings);

}

function dobarchart(g, projection, features,path,dataload,settings){
    
//var header = d3.keys(dataload[0]);

var values = [];

var locations=[];

dataload.forEach(function(d, i) {
    locations.push(d[settings.keys[0]]); var pusher=[];
    settings.keys[1].forEach(function(l, j) {
     pusher.push(d[l]);   
}); values.push(pusher);   
});

 /* locations = locations.map(function(obj) {
  return Object.keys(obj).map(function(key) { 
    return obj[key];
  });
    
});*/

  values = values.map(function(obj) {
  return Object.keys(obj).map(function(key) { 
    return obj[key];
  });
    
});
    
var names = settings.keys[1];
var data = [{}];
var region=findCoordinatesAndArea(features,locations,path);
//var position=projection([21.32,-7.32]); +
for(var j = 0; j < locations.length; j++) {
if (typeof region[j] === 'undefined') { continue; }
    
var position=projection(region[j]); 


var scaleval=3*Math.log(3+region[j][2])/4;
var factor=d3.sum(values[j]);
//only works for negative latitude check other countries

var yOffset = position[1];


var xOffset=position[0]-(scaleval/2);
for(var i = 0; i < values[j].length; i++) {
    
    var datum = {
        
        value : values[j][i]*scaleval*4/factor,
        colour : settings.colorscale((names[i])),
        name: names[i],
        x: xOffset,
        y: yOffset

    }
    xOffset += scaleval;
    
    data.push(datum);
        
}

//console.log(JSON.stringify(data));

      g.selectAll("rect")
		.data(data).enter()
		.append("rect")
                //.attr("class", 'circle')
                .on("mouseover", function(d) {this.style.stroke = "#ff8532"; d3.select('#showinfo').html("<b>"+d.name+"</b><br>"+d.value); })
                .on("mouseout", function(d) { this.style.stroke = "transparent"; d3.select('#showinfo').html("");})
		.attr("x", function (d) { return d.x; })
		//.attr("cy", function (d) { return projection(-7.32); })
		.attr("width", 3*scaleval/4)
                .attr("height", 0)
                .transition().duration(settings.animduration).ease("linear")
                .attr("height", function(d) { return d.value*2;})
                .attr("y", function(d) { return d.y-(d.value*2);})
                .style("fill", function(d) { return d.colour;});
                //.attr("r", function(d) { return d.properties.size;})
               
               // 
               // .on("click", function(a) { if(borrar)save.features.removeValue('id', a.id),this.remove();else{showbox(a.properties.name, a.properties.texto);} });
           }
       
addlegend(g,names,"bar",settings);

}


function addlegend(g,domain,type,settings){
    //Adding legend for our Choropleth

  var legend = g.selectAll("g.legend")
  .data(domain)
  .enter().append("g")
  .attr("class", "legend");

  var ls_w = 20, ls_h = 20;
if(type==="clor"){
  legend.append("rect")
  .attr("x", 20)
  .attr("y", function(d, i){ return settings.height - (i*ls_h) - 2*ls_h;})
  .attr("width", ls_w)
  .attr("height", ls_h)
  .style("fill", settings.defaultfill)
  .attr('fill-opacity', function(d,i) {return (d/(domain[4]-domain[0]));})
}
if(type==="bar"){
  legend.append("rect")
  .attr("x", 20)
  .attr("y", function(d, i){ return settings.height - (i*ls_h) - 2*ls_h;})
  .attr("width", ls_w)
  .attr("height", ls_h)
  .style("fill", function(d){ return settings.colorscale(d); });
}


  legend.append("text")
  .attr("x", 50)
  .attr("y", function(d, i){ return settings.height - (i*ls_h) - ls_h - 4;})
  .text(function(d, i){ return d; });
}
function addcircles(g,fpuntos,projection){
  g.selectAll("circle")
		.data(fpuntos).enter()
		.append("circle")
                .attr("class", 'circle')
		.attr("cx", function (d) { return projection(d.geometry.coordinates)[0]; })
		.attr("cy", function (d) { return projection(d.geometry.coordinates)[1]; })
		.attr("r", function(d) { return d.properties.size;})
    
		.attr("fill", function(d) { return d.properties.fill;})
                .style("stroke", function(d) { return d.properties.fill;})
                .style('stroke-width',function(d) { return d.properties.size/30;})
                .on("mouseover", function(d) { this.style.stroke = "#ff8532"; if ( typeof d.properties.texto !== 'undefined' )d3.select('#showinfo').html("<b>"+d.properties.name+"</b><br>"+d.properties.texto);else if( typeof d.properties.name !== 'undefined' )+d3.select('#showinfo').html("<b>"+d.properties.name+"</b>");})
                .on("mouseout", function(d) { this.style.stroke = d.properties.fill;})
                .on("click", function(a) { if(borrar)save.features.removeValue('id', a.id),this.remove();else{showbox(a.properties.name, a.properties.texto);} });
         }

 function dopulse(g,fpuntosp,projection,settings){
  
g.selectAll("circle")
		.data(fpuntosp).enter()
		.append("circle")
                .attr("class", 'circle')
		.attr("cx", function (d) { console.log(d.geometry.coordinates[0]);return projection(d.geometry.coordinates)[0]; })
		.attr("cy", function (d) {  return projection(d.geometry.coordinates)[1]; })
		.attr("r", function(d) { return 0;})
         .transition()
          .duration(settings.animduration)
          
          .attr("r", function(d) { return d.properties.size;})
          .style("fill-opacity", 1e-4)
          .style("stroke-opacity", 1e-4)
          .remove()
		.attr("fill", function(d) { return d.properties.fill;})
                .style("stroke", function(d) { return d.properties.fill;});
              //  .style('fill-opacity',1)
                     

 
 }
 function dopulseanimation(g,fpuntos,projection,settings){
  g.selectAll("circle")
		.data(fpuntos).enter()
		.append("circle")
                .attr("class", 'circle')
		.attr("cx", function (d) { return projection(d.geometry.coordinates)[0]; })
		.attr("cy", function (d) {  return projection(d.geometry.coordinates)[1]; })
		.attr("r", function(d) { return 0;})
         .transition()
          .duration(settings.animduration)
          .delay(function(d, i){return i*settings.delay;})
          .ease(Math.sqrt)
          .attr("r", function(d) { return d.properties.size;})
          .style("fill-opacity", 1e-4)
          .style("stroke-opacity", 1e-4)
          .remove()
		.attr("fill", function(d) { return d.properties.fill;})
                .style("stroke", function(d) { return d.properties.fill;});
              //  .style('fill-opacity',1)
                     

 
 }

 function addnamecoord(dataload, g,projection,settings){
 // console.log(dataload[0].latitude)
                    
 g.selectAll(".subunit-label")
    .data(dataload)
  .enter().append("text")
    .attr("x", function(d) {return projection([d[settings.keys[0][1]],d[settings.keys[0][0]]])[0]; })
    .attr("y", function(d) { return projection([d[settings.keys[0][1]],d[settings.keys[0][0]]])[1]; })
    .attr("dy", ".35em")
     .style("font-family", settings.font.family)
     .style("fill", function(d) { 
 if (settings.font.color) return settings.font.color;
else if (typeof d[settings.keys[2]] !== 'undefined') return d[settings.keys[2]];
else if (typeof d.color !== 'undefined')return d.color;
else return "#000";})
    .style("font-size", function(d) { //console.log(d.name),console.log(path.area(d));
//return 5+Math.log(Math.abs(polygonArea(d.geometry.coordinates[0])));
//return 5+polygonArea(path.bounds(d));
 if (settings.font.size) return settings.font.size;
else if (typeof d[settings.keys[3]] !== 'undefined') return d[settings.keys[3]];
else if (typeof d.size !== 'undefined')return d.size; 
else return "10"; 
})
    .text(function(d) { if (typeof d.text === 'undefined') { return d[settings.keys[1]];}else {return d.text;} })
       .on("mouseover", function(d) { this.style.stroke = "#ff8532";})
      .on("mouseout", function() { this.style.stroke = "transparent"; })
     // .on("click", function(d) { var newstyle=clickedit(d); this.style({"fill":"red","font-size": 20})});
  
 
 }
 
 function addimagecoord(dataload, g,projection,settings){
settings.keys[0] = ["latitude","longitude"];
  
     g.selectAll("image")
    .data(dataload)
  .enter().append("svg:image")
  .attr('class','mark')
    .attr("width", function(d) { 

if (typeof d.width !== 'undefined')return d.width;
else if (settings.image.width) return settings.image.width;
else return 30; 
})
        .attr("height", function(d) { 
if (typeof d.height !== 'undefined')return d.height;
else if (settings.image.height) return settings.image.height;
else return 30; 
})
    .attr("xlink:href",function(d) {return d.image;})
    .attr("transform", function(d) {return "translate(" + projection([d[settings.keys[0][1]],d[settings.keys[0][0]]]) + ")";})
     .on("mouseover", function() { this.style.stroke = "#ff8532";})
      .on("mouseout", function() { this.style.stroke = "transparent"; });

         
  /*    g.selectAll("img")
    .data(dataload)
  .enter().append("img")
    .attr("x", function(d) {console.log(projection([d[settings.keys[0][1]],d[settings.keys[0][0]]])[0]);return projection([d[settings.keys[0][1]],d[settings.keys[0][0]]])[0]; })
    .attr("y", function(d) { return projection([d[settings.keys[0][1]],d[settings.keys[0][0]]])[1]; })
    //.attr("xlink:href", function(d) {if (typeof d.image !== 'undefined')return d.image; else return settings.image.url;})
    .attr("xlink:href", "http://www.myiconfinder.com/uploads/iconsets/256-256-a5485b563efc4511e0cd8bd04ad0fe9e.png")
   
             .attr("width", function(d) { 

if (typeof d.width !== 'undefined')return d.width;
else if (settings.image.width) return settings.image.width;
else return 30; 
})
        .attr("height", function(d) { 
if (typeof d.height !== 'undefined')return d.height;
else if (settings.image.height) return settings.image.height;
else return 30; 
})
           .on("mouseover", function(d) { this.style.stroke = "#ff8532";})
      .on("mouseout", function() { this.style.stroke = "transparent"; });
     // .on("click", function(d) { var newstyle=clickedit(d); this.style({"fill":"red","font-size": 20})});
  
   */
}

     
     function doagain(settings){
d3.select("#map").selectAll("svg").remove();



var createmap= new Worldmap(settings); 
    
}
function formatforarc(data,settings,features){
var array=[];
var sizesel=$(settings.keys[0]).size();
if(sizesel===2){
 array = data.map(function(obj) {
     
return [obj[settings.keys[0][0]],obj[settings.keys[0][1]]]});
return findCoordinatesByAttribute(features,array); 
}
if(sizesel===4){
 array = data.map(function(obj) {
return [[obj[settings.keys[0][1]],obj[settings.keys[0][0]]],[obj[settings.keys[0][3]],obj[settings.keys[0][2]]]]});
  array = array.map(function(obj) {
  return Object.keys(obj).map(function(key) { 
    return obj[key];
  });
    
}); 
return array;
}

    
    
}
function findCoordinatesByAttribute (items, source) {
    
    

 var attributes = source.map(function(obj) {
  return Object.keys(obj).map(function(key) { 
    return obj[key];
  });
    
});   
    
var identify=checkformat(attributes[0][0]);
    var output=[],out=[],single=0;
  for (var j = 0; j < attributes.length; j++) {
      out=[];
      for (var l = 0; l < attributes[j].length; l++) {
     var target=attributes[j][l];
  for (var i = 0; i < items.length; i++) {    
if (items[i][identify] === target){out.push([items[i].lon,items[i].lat]);}
}}
output.push(out);
  //console.log(JSON.stringify(items[i].code));
  }
  return output;
}

function findCoordinatesByAttribute1 (items, source) {

 var attributes = source.map(function(obj) {
  return Object.keys(obj).map(function(key) { 
    return obj[key];
  });
    
});   
if($(attributes[0][0]).size()===2){return attributes;}   
else{var identify=checkformat(attributes[0][0]);
    var output=[],out=[],single=0;
  for (var j = 0; j < attributes.length; j++) {
     var targetone=attributes[j][0],targettwo=attributes[j][1],out=[0,0];
  for (var i = 0; i < items.length; i++) {    
if (items[i][identify] === targetone){out[0]=[items[i].lon,items[i].lat];}
if (items[i][identify] === targettwo){out[1]=[items[i].lon,items[i].lat];}
if (out[0]!==0&&out[1]!==0){output.push(out); }
  //console.log(JSON.stringify(items[i].code));
  }}
  return output;}
}
function findCoordinatesAndArea (items, attributes,path) {
    var identify=checkformat(attributes[0]);
    var output=[];
  for (var j = 0; j < attributes.length; j++) {
  for (var i = 0; i < items.length; i++) {
if(items[i][identify] === attributes[j])output.push([items[i].lon,items[i].lat,path.area(items[i])]); 
  //console.log(JSON.stringify(items[i].code));
  }}
  return output;
}

function formatgeo(data, type,settings){var topp=0;
 var output=[];   
    switch(type) {
    case "circle":
           for (var i = 0; i <data.length; i++) {topp=topp+1;
               //NOTE REVERSED DATAURL, TEST ON NORMAL CONDITIONS
     if(settings.dataurl){  if(settings.keys[1]==="Data"){data[i].Data=settings.defaultsize;}
       if(typeof data[i].color === "undefined"){data[i].color=settings.defaultfill;}
       if($(settings.keys[0]).size()===2){data[i].coordinates=[data[i][settings.keys[0][1]],data[i][settings.keys[0][0]]];}
       if($(settings.keys[0]).size()===1){data[i].coordinates=data[i][settings.keys[0]];}}
   else{settings.keys[1]="size"}
    output.push({"type":"Feature","id":topp,"properties":{"name":data[i].name,"fill":data[i].color,"size":data[i][settings.keys[1]], "texto":data[i].texto},"geometry":{"type":"Point","coordinates": data[i].coordinates}}); // LineString format tiene 1 bracket menos.
    } 
        break;
    case "line":
        
        for (var i = 0; i <data.length; i++) {topp=topp+1;

    output.push({"type":"Feature","id":topp,"properties":{"name":data[i].name,"fill":data[i].color,"size":data[i].size, "texto":data[i].texto},"geometry":{"type":"LineString","coordinates": data[i].coordinates}}); // LineString format tiene 1 bracket menos.
    }
        
        break;
    case "polygon":
     for (var i = 0; i <data.length; i++) {topp=topp+1;

    output.push({"type":"Feature","id":topp,"properties":{"name":data[i].name,"fill":data[i].color, "texto":data[i].texto},"geometry":{"type":"Polygon","coordinates": [data[i].coordinates]}});
    
        }    
        break;
    default:
        alert('An error occurred parsing the file.');
    }
       
return output;       
}


function checkformat(format){
 
 switch(true) {
    case !isNaN(format):
        return "id";
        break;
    case format.length===2:
        return "code";
        break;
    case format.length===3:
        return "code3";
        break;
    case format.length>3:
        return "name";
        break;
    default:
        alert('Wrong format');
    
}}

function drawtable(source,headers){

var source = source;   
   

      /*  var data = $.map(csv, function(value, index) {
    return [value];
});
          console.log(JSON.stringify(data[0]););*/
                


var headerNames=[];
var data = source.map(function(obj) {
  return Object.keys(obj).map(function(key) { 
    return obj[key];
  });
    
});
//console.log(JSON.stringify(data))

headers.forEach(function(d, i) {
    headerNames.push({title: d});
});


    this.getData = function() {
        return source;
    };

$(document).ready(function() {
   
  var table =  $('#datatable-responsive').DataTable( {
        retrieve: true,
        data: data,
        columns: headerNames,
        "pageLength": 25,
        responsive: true
    } );
     $('.dataTables_filter input').attr("placeholder", "Search...");
     
$('#datatable-responsive tbody').on( 'click', 'td', function () {
    alert( table.cell( this ).data() );
} );
} );
}
  function defaults(obj) {
    Array.prototype.slice.call(arguments, 1).forEach(function(source) {
      if (source) {
        for (var prop in source) {
          // Deep copy if property not set
          if (obj[prop] == null) {
            if (typeof source[prop] == 'function') {
              obj[prop] = source[prop];
            }
            else {
              obj[prop] = JSON.parse(JSON.stringify(source[prop]));
            }
          }
        }
      }
    });
    return obj;
  }


drawtable.prototype.getnames = function() { alert(this.getNames()); };
drawtable.prototype.getdata = function() { return (this.getData()); };
//function(data,filter)
Worldmap.prototype.filterename  = function(data,settings) {
// Scale the range of the data
  //  x.domain(d3.extent(data, function(d) { return d.date; }));
   // y.domain([0, d3.max(data, function(d) { return d.close; })]);
   var filteredData = data.filter(function(d) 
{  
    });

};
Worldmap.prototype.update  = function(data,plugin) {
  
     /*(this.getg());
     (this.getfeatures());
     (this.getpath())
     (this.getsettings())
      (this.getprojection())
       (this.geth())*/
    var newsett=(this.getsettings());
  switch(plugin) {
      case "cloropleth": 
           setkeys("location"); 
          docloropleth((this.getg()), (this.getfeatures()), (this.getpath()), data,newsett);
      break;
      case "bubbles": 
          setkeys("coordinates");
          newsett.dataurl=false;
     var points=formatgeo(data, "circle",newsett);
        addcircles((this.getg()), points, (this.getprojection()));     
      break;
      case "pulse": 
              setkeys("coordinates");
              newsett.dataurl=false;
        var points=formatgeo(data, "circle",newsett);
        dopulse((this.getg()), points, (this.getprojection()),this.getsettings());
      break;
      case "text": 
          if (setlatlon()){addnamecoord(data,(this.getg()),(this.getprojection()),newsett);}
       else { var featuresx=addsometext((this.getfeatures()), data,(this.getsettings()));
        addnames(featuresx, (this.getg()),(this.getpath()),(this.getsettings()),1);}
      break;
      case "images":
     
        addimagecoord(data,(this.getg()),(this.getprojection()),(this.getsettings()));
      break;
      case "arcs": 
         var arcdata=findCoordinatesByAttribute((this.getfeatures()),data);
            newsett.defaultfill="brown";
            fly2((this.geth()),arcdata, (this.getprojection()),newsett);
      break;
      case "barchart": 
          setkeys("location");
          dobarchart((this.getg()),(this.getprojection()),(this.getfeatures()),(this.getpath()),data,newsett);
      break;
      case "stackedbar": 
          setkeys("location");
          dostackedbar((this.getg()),(this.getprojection()),(this.getfeatures()),(this.getpath()),data,newsett);

      break;
  default:
      break;}
  
  function setkeys(id){
 var keyset = d3.keys(data[0]);
 newsett.keys[0] = id;
 var found = keyset.indexOf(newsett.keys[0]);
        keyset.splice(found, 1);
 newsett.keys[1] = keyset;

}
function setlatlon(){
 var keyset = d3.keys(data[0]);
 if ($.inArray('latitude', keyset) > -1 ) {newsett.keys[0] = ["latitude","longitude"];return true;}
 else {return false;}

} 
}; 
   /*
 * jQuery.fontselect - A font selector for the Google Web Fonts api
 * Tom Moor, http://tommoor.com
 * Copyright (c) 2011 Tom Moor
 * MIT Licensed
 * @version 0.1
*/ 
!function(t){t.fn.fontselect=function(){var e=function(t,e){return function(){return t.apply(e,arguments)}},i=["Aclonica","Allan","Annie+Use+Your+Telescope","Anonymous+Pro","Allerta+Stencil","Allerta","Amaranth","Anton","Architects+Daughter","Arimo","Artifika","Arvo","Asset","Astloch","Bangers","Bentham","Bevan","Bigshot+One","Bowlby+One","Bowlby+One+SC","Brawler","Buda:300","Cabin","Calligraffitti","Candal","Cantarell","Cardo","Carter One","Caudex","Cedarville+Cursive","Cherry+Cream+Soda","Chewy","Coda","Coming+Soon","Copse","Corben:700","Cousine","Covered+By+Your+Grace","Crafty+Girls","Crimson+Text","Crushed","Cuprum","Damion","Dancing+Script","Dawning+of+a+New+Day","Didact+Gothic","Droid+Sans","Droid+Sans+Mono","Droid+Serif","EB+Garamond","Expletus+Sans","Fontdiner+Swanky","Forum","Francois+One","Geo","Give+You+Glory","Goblin+One","Goudy+Bookletter+1911","Gravitas+One","Gruppo","Hammersmith+One","Holtwood+One+SC","Homemade+Apple","Inconsolata","Indie+Flower","IM+Fell+DW+Pica","IM+Fell+DW+Pica+SC","IM+Fell+Double+Pica","IM+Fell+Double+Pica+SC","IM+Fell+English","IM+Fell+English+SC","IM+Fell+French+Canon","IM+Fell+French+Canon+SC","IM+Fell+Great+Primer","IM+Fell+Great+Primer+SC","Irish+Grover","Irish+Growler","Istok+Web","Josefin+Sans","Josefin+Slab","Judson","Jura","Jura:500","Jura:600","Just+Another+Hand","Just+Me+Again+Down+Here","Kameron","Kenia","Kranky","Kreon","Kristi","La+Belle+Aurore","Lato:100","Lato:100italic","Lato:300","Lato","Lato:bold","Lato:900","League+Script","Lekton","Limelight","Lobster","Lobster Two","Lora","Love+Ya+Like+A+Sister","Loved+by+the+King","Luckiest+Guy","Maiden+Orange","Mako","Maven+Pro","Maven+Pro:500","Maven+Pro:700","Maven+Pro:900","Meddon","MedievalSharp","Megrim","Merriweather","Metrophobic","Michroma","Miltonian Tattoo","Miltonian","Modern Antiqua","Monofett","Molengo","Mountains of Christmas","Muli:300","Muli","Neucha","Neuton","News+Cycle","Nixie+One","Nobile","Nova+Cut","Nova+Flat","Nova+Mono","Nova+Oval","Nova+Round","Nova+Script","Nova+Slim","Nova+Square","Nunito:light","Nunito","OFL+Sorts+Mill+Goudy+TT","Old+Standard+TT","Open+Sans:300","Open+Sans","Open+Sans:600","Open+Sans:800","Open+Sans+Condensed:300","Orbitron","Orbitron:500","Orbitron:700","Orbitron:900","Oswald","Over+the+Rainbow","Reenie+Beanie","Pacifico","Patrick+Hand","Paytone+One","Permanent+Marker","Philosopher","Play","Playfair+Display","Podkova","PT+Sans","PT+Sans+Narrow","PT+Sans+Narrow:regular,bold","PT+Serif","PT+Serif Caption","Puritan","Quattrocento","Quattrocento+Sans","Radley","Raleway:100","Redressed","Rock+Salt","Rokkitt","Ruslan+Display","Schoolbell","Shadows+Into+Light","Shanti","Sigmar+One","Six+Caps","Slackey","Smythe","Sniglet:800","Special+Elite","Stardos+Stencil","Sue+Ellen+Francisco","Sunshiney","Swanky+and+Moo+Moo","Syncopate","Tangerine","Tenor+Sans","Terminal+Dosis+Light","The+Girl+Next+Door","Tinos","Ubuntu","Ultra","Unkempt","UnifrakturCook:bold","UnifrakturMaguntia","Varela","Varela Round","Vibur","Vollkorn","VT323","Waiting+for+the+Sunrise","Wallpoet","Walter+Turncoat","Wire+One","Yanone+Kaffeesatz","Yanone+Kaffeesatz:300","Yanone+Kaffeesatz:400","Yanone+Kaffeesatz:700","Yeseva+One","Zeyada"],o={style:"font-select",placeholder:"Select a font",lookahead:2,api:"//fonts.googleapis.com/css?family="},a=function(){function o(e,i){this.$original=t(e),this.options=i,this.active=!1,this.setupHtml(),this.getVisibleFonts(),this.bindEvents();var o=this.$original.val();o&&(this.updateSelected(),this.addFontLink(o))}return o.prototype.bindEvents=function(){t("li",this.$results).click(e(this.selectFont,this)).mouseenter(e(this.activateFont,this)).mouseleave(e(this.deactivateFont,this)),t("span",this.$select).click(e(this.toggleDrop,this)),this.$arrow.click(e(this.toggleDrop,this))},o.prototype.toggleDrop=function(){this.active?(this.$element.removeClass("font-select-active"),this.$drop.hide(),clearInterval(this.visibleInterval)):(this.$element.addClass("font-select-active"),this.$drop.show(),this.moveToSelected(),this.visibleInterval=setInterval(e(this.getVisibleFonts,this),500)),this.active=!this.active},o.prototype.selectFont=function(){var e=t("li.active",this.$results).data("value");this.$original.val(e).change(),this.updateSelected(),this.toggleDrop()},o.prototype.moveToSelected=function(){var e,i=this.$original.val();e=i?t("li[data-value='"+i+"']",this.$results):t("li",this.$results).first(),this.$results.scrollTop(e.addClass("active").position().top)},o.prototype.activateFont=function(e){t("li.active",this.$results).removeClass("active"),t(e.currentTarget).addClass("active")},o.prototype.deactivateFont=function(e){t(e.currentTarget).removeClass("active")},o.prototype.updateSelected=function(){var e=this.$original.val();t("span",this.$element).text(this.toReadable(e)).css(this.toStyle(e))},o.prototype.setupHtml=function(){this.$original.empty().hide(),this.$element=t("<div>",{"class":this.options.style}),this.$arrow=t("<div><b></b></div>"),this.$select=t("<a><span>"+this.options.placeholder+"</span></a>"),this.$drop=t("<div>",{"class":"fs-drop"}),this.$results=t("<ul>",{"class":"fs-results"}),this.$original.after(this.$element.append(this.$select.append(this.$arrow)).append(this.$drop)),this.$drop.append(this.$results.append(this.fontsAsHtml())).hide()},o.prototype.fontsAsHtml=function(){for(var t,e,o=i.length,a="",n=0;o>n;n++)t=this.toReadable(i[n]),e=this.toStyle(i[n]),a+='<li data-value="'+i[n]+'" style="font-family: '+e["font-family"]+"; font-weight: "+e["font-weight"]+'">'+t+"</li>";return a},o.prototype.toReadable=function(t){return t.replace(/[\+|:]/g," ")},o.prototype.toStyle=function(t){var e=t.split(":");return{"font-family":this.toReadable(e[0]),"font-weight":e[1]||400}},o.prototype.getVisibleFonts=function(){if(!this.$results.is(":hidden")){var e=this,i=this.$results.scrollTop(),o=i+this.$results.height();if(this.options.lookahead){var a=t("li",this.$results).first().height();o+=a*this.options.lookahead}t("li",this.$results).each(function(){var a=t(this).position().top+i,n=a+t(this).height();if(n>=i&&o>=a){var s=t(this).data("value");e.addFontLink(s)}})}},o.prototype.addFontLink=function(e){var i=this.options.api+e;0===t("link[href*='"+e+"']").length&&t("link:last").after('<link href="'+i+'" rel="stylesheet" type="text/css">')},o}();return this.each(function(e){return e&&t.extend(o,e),new a(this,o)})}}(jQuery);
"use strict";window.jscolor||(window.jscolor=function(){var e={register:function(){e.attachDOMReadyEvent(e.init),e.attachEvent(document,"mousedown",e.onDocumentMouseDown),e.attachEvent(document,"touchstart",e.onDocumentTouchStart),e.attachEvent(window,"resize",e.onWindowResize)},init:function(){e.jscolor.lookupClass&&e.jscolor.installByClassName(e.jscolor.lookupClass)},tryInstallOnElements:function(t,n){var r=new RegExp("(^|\\s)("+n+")(\\s*(\\{[^}]*\\})|\\s|$)","i");for(var i=0;i<t.length;i+=1){if(t[i].type!==undefined&&t[i].type.toLowerCase()=="color"&&e.isColorAttrSupported)continue;var s;if(!t[i].jscolor&&t[i].className&&(s=t[i].className.match(r))){var o=t[i],u=null,a=e.getDataAttr(o,"jscolor");a!==null?u=a:s[4]&&(u=s[4]);var f={};if(u)try{f=(new Function("return ("+u+")"))()}catch(l){e.warn("Error parsing jscolor options: "+l+":\n"+u)}o.jscolor=new e.jscolor(o,f)}}},isColorAttrSupported:function(){var e=document.createElement("input");if(e.setAttribute){e.setAttribute("type","color");if(e.type.toLowerCase()=="color")return!0}return!1}(),isCanvasSupported:function(){var e=document.createElement("canvas");return!!e.getContext&&!!e.getContext("2d")}(),fetchElement:function(e){return typeof e=="string"?document.getElementById(e):e},isElementType:function(e,t){return e.nodeName.toLowerCase()===t.toLowerCase()},getDataAttr:function(e,t){var n="data-"+t,r=e.getAttribute(n);return r!==null?r:null},attachEvent:function(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on"+t,n)},detachEvent:function(e,t,n){e.removeEventListener?e.removeEventListener(t,n,!1):e.detachEvent&&e.detachEvent("on"+t,n)},_attachedGroupEvents:{},attachGroupEvent:function(t,n,r,i){e._attachedGroupEvents.hasOwnProperty(t)||(e._attachedGroupEvents[t]=[]),e._attachedGroupEvents[t].push([n,r,i]),e.attachEvent(n,r,i)},detachGroupEvents:function(t){if(e._attachedGroupEvents.hasOwnProperty(t)){for(var n=0;n<e._attachedGroupEvents[t].length;n+=1){var r=e._attachedGroupEvents[t][n];e.detachEvent(r[0],r[1],r[2])}delete e._attachedGroupEvents[t]}},attachDOMReadyEvent:function(e){var t=!1,n=function(){t||(t=!0,e())};if(document.readyState==="complete"){setTimeout(n,1);return}if(document.addEventListener)document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1);else if(document.attachEvent){document.attachEvent("onreadystatechange",function(){document.readyState==="complete"&&(document.detachEvent("onreadystatechange",arguments.callee),n())}),window.attachEvent("onload",n);if(document.documentElement.doScroll&&window==window.top){var r=function(){if(!document.body)return;try{document.documentElement.doScroll("left"),n()}catch(e){setTimeout(r,1)}};r()}}},warn:function(e){window.console&&window.console.warn&&window.console.warn(e)},preventDefault:function(e){e.preventDefault&&e.preventDefault(),e.returnValue=!1},captureTarget:function(t){t.setCapture&&(e._capturedTarget=t,e._capturedTarget.setCapture())},releaseTarget:function(){e._capturedTarget&&(e._capturedTarget.releaseCapture(),e._capturedTarget=null)},fireEvent:function(e,t){if(!e)return;if(document.createEvent){var n=document.createEvent("HTMLEvents");n.initEvent(t,!0,!0),e.dispatchEvent(n)}else if(document.createEventObject){var n=document.createEventObject();e.fireEvent("on"+t,n)}else e["on"+t]&&e["on"+t]()},classNameToList:function(e){return e.replace(/^\s+|\s+$/g,"").split(/\s+/)},hasClass:function(e,t){return t?-1!=(" "+e.className.replace(/\s+/g," ")+" ").indexOf(" "+t+" "):!1},setClass:function(t,n){var r=e.classNameToList(n);for(var i=0;i<r.length;i+=1)e.hasClass(t,r[i])||(t.className+=(t.className?" ":"")+r[i])},unsetClass:function(t,n){var r=e.classNameToList(n);for(var i=0;i<r.length;i+=1){var s=new RegExp("^\\s*"+r[i]+"\\s*|"+"\\s*"+r[i]+"\\s*$|"+"\\s+"+r[i]+"(\\s+)","g");t.className=t.className.replace(s,"$1")}},getStyle:function(e){return window.getComputedStyle?window.getComputedStyle(e):e.currentStyle},setStyle:function(){var e=document.createElement("div"),t=function(t){for(var n=0;n<t.length;n+=1)if(t[n]in e.style)return t[n]},n={borderRadius:t(["borderRadius","MozBorderRadius","webkitBorderRadius"]),boxShadow:t(["boxShadow","MozBoxShadow","webkitBoxShadow"])};return function(e,t,r){switch(t.toLowerCase()){case"opacity":var i=Math.round(parseFloat(r)*100);e.style.opacity=r,e.style.filter="alpha(opacity="+i+")";break;default:e.style[n[t]]=r}}}(),setBorderRadius:function(t,n){e.setStyle(t,"borderRadius",n||"0")},setBoxShadow:function(t,n){e.setStyle(t,"boxShadow",n||"none")},getElementPos:function(t,n){var r=0,i=0,s=t.getBoundingClientRect();r=s.left,i=s.top;if(!n){var o=e.getViewPos();r+=o[0],i+=o[1]}return[r,i]},getElementSize:function(e){return[e.offsetWidth,e.offsetHeight]},getAbsPointerPos:function(e){e||(e=window.event);var t=0,n=0;return typeof e.changedTouches!="undefined"&&e.changedTouches.length?(t=e.changedTouches[0].clientX,n=e.changedTouches[0].clientY):typeof e.clientX=="number"&&(t=e.clientX,n=e.clientY),{x:t,y:n}},getRelPointerPos:function(e){e||(e=window.event);var t=e.target||e.srcElement,n=t.getBoundingClientRect(),r=0,i=0,s=0,o=0;return typeof e.changedTouches!="undefined"&&e.changedTouches.length?(s=e.changedTouches[0].clientX,o=e.changedTouches[0].clientY):typeof e.clientX=="number"&&(s=e.clientX,o=e.clientY),r=s-n.left,i=o-n.top,{x:r,y:i}},getViewPos:function(){var e=document.documentElement;return[(window.pageXOffset||e.scrollLeft)-(e.clientLeft||0),(window.pageYOffset||e.scrollTop)-(e.clientTop||0)]},getViewSize:function(){var e=document.documentElement;return[window.innerWidth||e.clientWidth,window.innerHeight||e.clientHeight]},redrawPosition:function(){if(e.picker&&e.picker.owner){var t=e.picker.owner,n,r;t.fixed?(n=e.getElementPos(t.targetElement,!0),r=[0,0]):(n=e.getElementPos(t.targetElement),r=e.getViewPos());var i=e.getElementSize(t.targetElement),s=e.getViewSize(),o=e.getPickerOuterDims(t),u,a,f;switch(t.position.toLowerCase()){case"left":u=1,a=0,f=-1;break;case"right":u=1,a=0,f=1;break;case"top":u=0,a=1,f=-1;break;default:u=0,a=1,f=1}var l=(i[a]+o[a])/2;if(!t.smartPosition)var c=[n[u],n[a]+i[a]-l+l*f];else var c=[-r[u]+n[u]+o[u]>s[u]?-r[u]+n[u]+i[u]/2>s[u]/2&&n[u]+i[u]-o[u]>=0?n[u]+i[u]-o[u]:n[u]:n[u],-r[a]+n[a]+i[a]+o[a]-l+l*f>s[a]?-r[a]+n[a]+i[a]/2>s[a]/2&&n[a]+i[a]-l-l*f>=0?n[a]+i[a]-l-l*f:n[a]+i[a]-l+l*f:n[a]+i[a]-l+l*f>=0?n[a]+i[a]-l+l*f:n[a]+i[a]-l-l*f];var h=c[u],p=c[a],d=t.fixed?"fixed":"absolute",v=(c[0]+o[0]>n[0]||c[0]<n[0]+i[0])&&c[1]+o[1]<n[1]+i[1];e._drawPosition(t,h,p,d,v)}},_drawPosition:function(t,n,r,i,s){var o=s?0:t.shadowBlur;e.picker.wrap.style.position=i,e.picker.wrap.style.left=n+"px",e.picker.wrap.style.top=r+"px",e.setBoxShadow(e.picker.boxS,t.shadow?new e.BoxShadow(0,o,t.shadowBlur,0,t.shadowColor):null)},getPickerDims:function(t){var n=!!e.getSliderComponent(t),r=[2*t.insetWidth+2*t.padding+t.width+(n?2*t.insetWidth+e.getPadToSliderPadding(t)+t.sliderSize:0),2*t.insetWidth+2*t.padding+t.height+(t.closable?2*t.insetWidth+t.padding+t.buttonHeight:0)];return r},getPickerOuterDims:function(t){var n=e.getPickerDims(t);return[n[0]+2*t.borderWidth,n[1]+2*t.borderWidth]},getPadToSliderPadding:function(e){return Math.max(e.padding,1.5*(2*e.pointerBorderWidth+e.pointerThickness))},getPadYComponent:function(e){switch(e.mode.charAt(1).toLowerCase()){case"v":return"v"}return"s"},getSliderComponent:function(e){if(e.mode.length>2)switch(e.mode.charAt(2).toLowerCase()){case"s":return"s";case"v":return"v"}return null},onDocumentMouseDown:function(t){t||(t=window.event);var n=t.target||t.srcElement;n._jscLinkedInstance?n._jscLinkedInstance.showOnClick&&n._jscLinkedInstance.show():n._jscControlName?e.onControlPointerStart(t,n,n._jscControlName,"mouse"):e.picker&&e.picker.owner&&e.picker.owner.hide()},onDocumentTouchStart:function(t){t||(t=window.event);var n=t.target||t.srcElement;n._jscLinkedInstance?n._jscLinkedInstance.showOnClick&&n._jscLinkedInstance.show():n._jscControlName?e.onControlPointerStart(t,n,n._jscControlName,"touch"):e.picker&&e.picker.owner&&e.picker.owner.hide()},onWindowResize:function(t){e.redrawPosition()},onParentScroll:function(t){e.picker&&e.picker.owner&&e.picker.owner.hide()},_pointerMoveEvent:{mouse:"mousemove",touch:"touchmove"},_pointerEndEvent:{mouse:"mouseup",touch:"touchend"},_pointerOrigin:null,_capturedTarget:null,onControlPointerStart:function(t,n,r,i){var s=n._jscInstance;e.preventDefault(t),e.captureTarget(n);var o=function(s,o){e.attachGroupEvent("drag",s,e._pointerMoveEvent[i],e.onDocumentPointerMove(t,n,r,i,o)),e.attachGroupEvent("drag",s,e._pointerEndEvent[i],e.onDocumentPointerEnd(t,n,r,i))};o(document,[0,0]);if(window.parent&&window.frameElement){var u=window.frameElement.getBoundingClientRect(),a=[-u.left,-u.top];o(window.parent.window.document,a)}var f=e.getAbsPointerPos(t),l=e.getRelPointerPos(t);e._pointerOrigin={x:f.x-l.x,y:f.y-l.y};switch(r){case"pad":switch(e.getSliderComponent(s)){case"s":s.hsv[1]===0&&s.fromHSV(null,100,null);break;case"v":s.hsv[2]===0&&s.fromHSV(null,null,100)}e.setPad(s,t,0,0);break;case"sld":e.setSld(s,t,0)}e.dispatchFineChange(s)},onDocumentPointerMove:function(t,n,r,i,s){return function(t){var i=n._jscInstance;switch(r){case"pad":t||(t=window.event),e.setPad(i,t,s[0],s[1]),e.dispatchFineChange(i);break;case"sld":t||(t=window.event),e.setSld(i,t,s[1]),e.dispatchFineChange(i)}}},onDocumentPointerEnd:function(t,n,r,i){return function(t){var r=n._jscInstance;e.detachGroupEvents("drag"),e.releaseTarget(),e.dispatchChange(r)}},dispatchChange:function(t){t.valueElement&&e.isElementType(t.valueElement,"input")&&e.fireEvent(t.valueElement,"change")},dispatchFineChange:function(e){if(e.onFineChange){var t;typeof e.onFineChange=="string"?t=new Function(e.onFineChange):t=e.onFineChange,t.call(e)}},setPad:function(t,n,r,i){var s=e.getAbsPointerPos(n),o=r+s.x-e._pointerOrigin.x-t.padding-t.insetWidth,u=i+s.y-e._pointerOrigin.y-t.padding-t.insetWidth,a=o*(360/(t.width-1)),f=100-u*(100/(t.height-1));switch(e.getPadYComponent(t)){case"s":t.fromHSV(a,f,null,e.leaveSld);break;case"v":t.fromHSV(a,null,f,e.leaveSld)}},setSld:function(t,n,r){var i=e.getAbsPointerPos(n),s=r+i.y-e._pointerOrigin.y-t.padding-t.insetWidth,o=100-s*(100/(t.height-1));switch(e.getSliderComponent(t)){case"s":t.fromHSV(null,o,null,e.leavePad);break;case"v":t.fromHSV(null,null,o,e.leavePad)}},_vmlNS:"jsc_vml_",_vmlCSS:"jsc_vml_css_",_vmlReady:!1,initVML:function(){if(!e._vmlReady){var t=document;t.namespaces[e._vmlNS]||t.namespaces.add(e._vmlNS,"urn:schemas-microsoft-com:vml");if(!t.styleSheets[e._vmlCSS]){var n=["shape","shapetype","group","background","path","formulas","handles","fill","stroke","shadow","textbox","textpath","imagedata","line","polyline","curve","rect","roundrect","oval","arc","image"],r=t.createStyleSheet();r.owningElement.id=e._vmlCSS;for(var i=0;i<n.length;i+=1)r.addRule(e._vmlNS+"\\:"+n[i],"behavior:url(#default#VML);")}e._vmlReady=!0}},createPalette:function(){var t={elm:null,draw:null};if(e.isCanvasSupported){var n=document.createElement("canvas"),r=n.getContext("2d"),i=function(e,t,i){n.width=e,n.height=t,r.clearRect(0,0,n.width,n.height);var s=r.createLinearGradient(0,0,n.width,0);s.addColorStop(0,"#F00"),s.addColorStop(1/6,"#FF0"),s.addColorStop(2/6,"#0F0"),s.addColorStop(.5,"#0FF"),s.addColorStop(4/6,"#00F"),s.addColorStop(5/6,"#F0F"),s.addColorStop(1,"#F00"),r.fillStyle=s,r.fillRect(0,0,n.width,n.height);var o=r.createLinearGradient(0,0,0,n.height);switch(i.toLowerCase()){case"s":o.addColorStop(0,"rgba(255,255,255,0)"),o.addColorStop(1,"rgba(255,255,255,1)");break;case"v":o.addColorStop(0,"rgba(0,0,0,0)"),o.addColorStop(1,"rgba(0,0,0,1)")}r.fillStyle=o,r.fillRect(0,0,n.width,n.height)};t.elm=n,t.draw=i}else{e.initVML();var s=document.createElement("div");s.style.position="relative",s.style.overflow="hidden";var o=document.createElement(e._vmlNS+":fill");o.type="gradient",o.method="linear",o.angle="90",o.colors="16.67% #F0F, 33.33% #00F, 50% #0FF, 66.67% #0F0, 83.33% #FF0";var u=document.createElement(e._vmlNS+":rect");u.style.position="absolute",u.style.left="-1px",u.style.top="-1px",u.stroked=!1,u.appendChild(o),s.appendChild(u);var a=document.createElement(e._vmlNS+":fill");a.type="gradient",a.method="linear",a.angle="180",a.opacity="0";var f=document.createElement(e._vmlNS+":rect");f.style.position="absolute",f.style.left="-1px",f.style.top="-1px",f.stroked=!1,f.appendChild(a),s.appendChild(f);var i=function(e,t,n){s.style.width=e+"px",s.style.height=t+"px",u.style.width=f.style.width=e+1+"px",u.style.height=f.style.height=t+1+"px",o.color="#F00",o.color2="#F00";switch(n.toLowerCase()){case"s":a.color=a.color2="#FFF";break;case"v":a.color=a.color2="#000"}};t.elm=s,t.draw=i}return t},createSliderGradient:function(){var t={elm:null,draw:null};if(e.isCanvasSupported){var n=document.createElement("canvas"),r=n.getContext("2d"),i=function(e,t,i,s){n.width=e,n.height=t,r.clearRect(0,0,n.width,n.height);var o=r.createLinearGradient(0,0,0,n.height);o.addColorStop(0,i),o.addColorStop(1,s),r.fillStyle=o,r.fillRect(0,0,n.width,n.height)};t.elm=n,t.draw=i}else{e.initVML();var s=document.createElement("div");s.style.position="relative",s.style.overflow="hidden";var o=document.createElement(e._vmlNS+":fill");o.type="gradient",o.method="linear",o.angle="180";var u=document.createElement(e._vmlNS+":rect");u.style.position="absolute",u.style.left="-1px",u.style.top="-1px",u.stroked=!1,u.appendChild(o),s.appendChild(u);var i=function(e,t,n,r){s.style.width=e+"px",s.style.height=t+"px",u.style.width=e+1+"px",u.style.height=t+1+"px",o.color=n,o.color2=r};t.elm=s,t.draw=i}return t},leaveValue:1,leaveStyle:2,leavePad:4,leaveSld:8,BoxShadow:function(){var e=function(e,t,n,r,i,s){this.hShadow=e,this.vShadow=t,this.blur=n,this.spread=r,this.color=i,this.inset=!!s};return e.prototype.toString=function(){var e=[Math.round(this.hShadow)+"px",Math.round(this.vShadow)+"px",Math.round(this.blur)+"px",Math.round(this.spread)+"px",this.color];return this.inset&&e.push("inset"),e.join(" ")},e}(),jscolor:function(t,n){function i(e,t,n){e/=255,t/=255,n/=255;var r=Math.min(Math.min(e,t),n),i=Math.max(Math.max(e,t),n),s=i-r;if(s===0)return[null,0,100*i];var o=e===r?3+(n-t)/s:t===r?5+(e-n)/s:1+(t-e)/s;return[60*(o===6?0:o),100*(s/i),100*i]}function s(e,t,n){var r=255*(n/100);if(e===null)return[r,r,r];e/=60,t/=100;var i=Math.floor(e),s=i%2?e-i:1-(e-i),o=r*(1-t),u=r*(1-t*s);switch(i){case 6:case 0:return[r,u,o];case 1:return[u,r,o];case 2:return[o,r,u];case 3:return[o,u,r];case 4:return[u,o,r];case 5:return[r,o,u]}}function o(){e.unsetClass(d.targetElement,d.activeClass),e.picker.wrap.parentNode.removeChild(e.picker.wrap),delete e.picker.owner}function u(){function l(){var e=d.insetColor.split(/\s+/),n=e.length<2?e[0]:e[1]+" "+e[0]+" "+e[0]+" "+e[1];t.btn.style.borderColor=n}d._processParentElementsInDOM(),e.picker||(e.picker={owner:null,wrap:document.createElement("div"),box:document.createElement("div"),boxS:document.createElement("div"),boxB:document.createElement("div"),pad:document.createElement("div"),padB:document.createElement("div"),padM:document.createElement("div"),padPal:e.createPalette(),cross:document.createElement("div"),crossBY:document.createElement("div"),crossBX:document.createElement("div"),crossLY:document.createElement("div"),crossLX:document.createElement("div"),sld:document.createElement("div"),sldB:document.createElement("div"),sldM:document.createElement("div"),sldGrad:e.createSliderGradient(),sldPtrS:document.createElement("div"),sldPtrIB:document.createElement("div"),sldPtrMB:document.createElement("div"),sldPtrOB:document.createElement("div"),btn:document.createElement("div"),btnT:document.createElement("span")},e.picker.pad.appendChild(e.picker.padPal.elm),e.picker.padB.appendChild(e.picker.pad),e.picker.cross.appendChild(e.picker.crossBY),e.picker.cross.appendChild(e.picker.crossBX),e.picker.cross.appendChild(e.picker.crossLY),e.picker.cross.appendChild(e.picker.crossLX),e.picker.padB.appendChild(e.picker.cross),e.picker.box.appendChild(e.picker.padB),e.picker.box.appendChild(e.picker.padM),e.picker.sld.appendChild(e.picker.sldGrad.elm),e.picker.sldB.appendChild(e.picker.sld),e.picker.sldB.appendChild(e.picker.sldPtrOB),e.picker.sldPtrOB.appendChild(e.picker.sldPtrMB),e.picker.sldPtrMB.appendChild(e.picker.sldPtrIB),e.picker.sldPtrIB.appendChild(e.picker.sldPtrS),e.picker.box.appendChild(e.picker.sldB),e.picker.box.appendChild(e.picker.sldM),e.picker.btn.appendChild(e.picker.btnT),e.picker.box.appendChild(e.picker.btn),e.picker.boxB.appendChild(e.picker.box),e.picker.wrap.appendChild(e.picker.boxS),e.picker.wrap.appendChild(e.picker.boxB));var t=e.picker,n=!!e.getSliderComponent(d),r=e.getPickerDims(d),i=2*d.pointerBorderWidth+d.pointerThickness+2*d.crossSize,s=e.getPadToSliderPadding(d),o=Math.min(d.borderRadius,Math.round(d.padding*Math.PI)),u="crosshair";t.wrap.style.clear="both",t.wrap.style.width=r[0]+2*d.borderWidth+"px",t.wrap.style.height=r[1]+2*d.borderWidth+"px",t.wrap.style.zIndex=d.zIndex,t.box.style.width=r[0]+"px",t.box.style.height=r[1]+"px",t.boxS.style.position="absolute",t.boxS.style.left="0",t.boxS.style.top="0",t.boxS.style.width="100%",t.boxS.style.height="100%",e.setBorderRadius(t.boxS,o+"px"),t.boxB.style.position="relative",t.boxB.style.border=d.borderWidth+"px solid",t.boxB.style.borderColor=d.borderColor,t.boxB.style.background=d.backgroundColor,e.setBorderRadius(t.boxB,o+"px"),t.padM.style.background=t.sldM.style.background="#FFF",e.setStyle(t.padM,"opacity","0"),e.setStyle(t.sldM,"opacity","0"),t.pad.style.position="relative",t.pad.style.width=d.width+"px",t.pad.style.height=d.height+"px",t.padPal.draw(d.width,d.height,e.getPadYComponent(d)),t.padB.style.position="absolute",t.padB.style.left=d.padding+"px",t.padB.style.top=d.padding+"px",t.padB.style.border=d.insetWidth+"px solid",t.padB.style.borderColor=d.insetColor,t.padM._jscInstance=d,t.padM._jscControlName="pad",t.padM.style.position="absolute",t.padM.style.left="0",t.padM.style.top="0",t.padM.style.width=d.padding+2*d.insetWidth+d.width+s/2+"px",t.padM.style.height=r[1]+"px",t.padM.style.cursor=u,t.cross.style.position="absolute",t.cross.style.left=t.cross.style.top="0",t.cross.style.width=t.cross.style.height=i+"px",t.crossBY.style.position=t.crossBX.style.position="absolute",t.crossBY.style.background=t.crossBX.style.background=d.pointerBorderColor,t.crossBY.style.width=t.crossBX.style.height=2*d.pointerBorderWidth+d.pointerThickness+"px",t.crossBY.style.height=t.crossBX.style.width=i+"px",t.crossBY.style.left=t.crossBX.style.top=Math.floor(i/2)-Math.floor(d.pointerThickness/2)-d.pointerBorderWidth+"px",t.crossBY.style.top=t.crossBX.style.left="0",t.crossLY.style.position=t.crossLX.style.position="absolute",t.crossLY.style.background=t.crossLX.style.background=d.pointerColor,t.crossLY.style.height=t.crossLX.style.width=i-2*d.pointerBorderWidth+"px",t.crossLY.style.width=t.crossLX.style.height=d.pointerThickness+"px",t.crossLY.style.left=t.crossLX.style.top=Math.floor(i/2)-Math.floor(d.pointerThickness/2)+"px",t.crossLY.style.top=t.crossLX.style.left=d.pointerBorderWidth+"px",t.sld.style.overflow="hidden",t.sld.style.width=d.sliderSize+"px",t.sld.style.height=d.height+"px",t.sldGrad.draw(d.sliderSize,d.height,"#000","#000"),t.sldB.style.display=n?"block":"none",t.sldB.style.position="absolute",t.sldB.style.right=d.padding+"px",t.sldB.style.top=d.padding+"px",t.sldB.style.border=d.insetWidth+"px solid",t.sldB.style.borderColor=d.insetColor,t.sldM._jscInstance=d,t.sldM._jscControlName="sld",t.sldM.style.display=n?"block":"none",t.sldM.style.position="absolute",t.sldM.style.right="0",t.sldM.style.top="0",t.sldM.style.width=d.sliderSize+s/2+d.padding+2*d.insetWidth+"px",t.sldM.style.height=r[1]+"px",t.sldM.style.cursor="default",t.sldPtrIB.style.border=t.sldPtrOB.style.border=d.pointerBorderWidth+"px solid "+d.pointerBorderColor,t.sldPtrOB.style.position="absolute",t.sldPtrOB.style.left=-(2*d.pointerBorderWidth+d.pointerThickness)+"px",t.sldPtrOB.style.top="0",t.sldPtrMB.style.border=d.pointerThickness+"px solid "+d.pointerColor,t.sldPtrS.style.width=d.sliderSize+"px",t.sldPtrS.style.height=m+"px",t.btn.style.display=d.closable?"block":"none",t.btn.style.position="absolute",t.btn.style.left=d.padding+"px",t.btn.style.bottom=d.padding+"px",t.btn.style.padding="0 15px",t.btn.style.height=d.buttonHeight+"px",t.btn.style.border=d.insetWidth+"px solid",l(),t.btn.style.color=d.buttonColor,t.btn.style.font="12px sans-serif",t.btn.style.textAlign="center";try{t.btn.style.cursor="pointer"}catch(c){t.btn.style.cursor="hand"}t.btn.onmousedown=function(){d.hide()},t.btnT.style.lineHeight=d.buttonHeight+"px",t.btnT.innerHTML="",t.btnT.appendChild(document.createTextNode(d.closeText)),a(),f(),e.picker.owner&&e.picker.owner!==d&&e.unsetClass(e.picker.owner.targetElement,d.activeClass),e.picker.owner=d,e.isElementType(v,"body")?e.redrawPosition():e._drawPosition(d,0,0,"relative",!1),t.wrap.parentNode!=v&&v.appendChild(t.wrap),e.setClass(d.targetElement,d.activeClass)}function a(){switch(e.getPadYComponent(d)){case"s":var t=1;break;case"v":var t=2}var n=Math.round(d.hsv[0]/360*(d.width-1)),r=Math.round((1-d.hsv[t]/100)*(d.height-1)),i=2*d.pointerBorderWidth+d.pointerThickness+2*d.crossSize,o=-Math.floor(i/2);e.picker.cross.style.left=n+o+"px",e.picker.cross.style.top=r+o+"px";switch(e.getSliderComponent(d)){case"s":var u=s(d.hsv[0],100,d.hsv[2]),a=s(d.hsv[0],0,d.hsv[2]),f="rgb("+Math.round(u[0])+","+Math.round(u[1])+","+Math.round(u[2])+")",l="rgb("+Math.round(a[0])+","+Math.round(a[1])+","+Math.round(a[2])+")";e.picker.sldGrad.draw(d.sliderSize,d.height,f,l);break;case"v":var c=s(d.hsv[0],d.hsv[1],100),f="rgb("+Math.round(c[0])+","+Math.round(c[1])+","+Math.round(c[2])+")",l="#000";e.picker.sldGrad.draw(d.sliderSize,d.height,f,l)}}function f(){var t=e.getSliderComponent(d);if(t){switch(t){case"s":var n=1;break;case"v":var n=2}var r=Math.round((1-d.hsv[n]/100)*(d.height-1));e.picker.sldPtrOB.style.top=r-(2*d.pointerBorderWidth+d.pointerThickness)-Math.floor(m/2)+"px"}}function l(){return e.picker&&e.picker.owner===d}function c(){d.importColor()}this.value=null,this.valueElement=t,this.styleElement=t,this.required=!0,this.refine=!0,this.hash=!1,this.uppercase=!0,this.onFineChange=null,this.activeClass="jscolor-active",this.minS=0,this.maxS=100,this.minV=0,this.maxV=100,this.hsv=[0,0,100],this.rgb=[255,255,255],this.width=181,this.height=101,this.showOnClick=!0,this.mode="HSV",this.position="bottom",this.smartPosition=!0,this.sliderSize=16,this.crossSize=8,this.closable=!1,this.closeText="Close",this.buttonColor="#000000",this.buttonHeight=18,this.padding=12,this.backgroundColor="#FFFFFF",this.borderWidth=1,this.borderColor="#BBBBBB",this.borderRadius=8,this.insetWidth=1,this.insetColor="#BBBBBB",this.shadow=!0,this.shadowBlur=15,this.shadowColor="rgba(0,0,0,0.2)",this.pointerColor="#4C4C4C",this.pointerBorderColor="#FFFFFF",this.pointerBorderWidth=1,this.pointerThickness=2,this.zIndex=1e3,this.container=null;for(var r in n)n.hasOwnProperty(r)&&(this[r]=n[r]);this.hide=function(){l()&&o()},this.show=function(){u()},this.redraw=function(){l()&&u()},this.importColor=function(){this.valueElement?e.isElementType(this.valueElement,"input")?this.refine?!this.required&&/^\s*$/.test(this.valueElement.value)?(this.valueElement.value="",this.styleElement&&(this.styleElement.style.backgroundImage=this.styleElement._jscOrigStyle.backgroundImage,this.styleElement.style.backgroundColor=this.styleElement._jscOrigStyle.backgroundColor,this.styleElement.style.color=this.styleElement._jscOrigStyle.color),this.exportColor(e.leaveValue|e.leaveStyle)):this.fromString(this.valueElement.value)||this.exportColor():this.fromString(this.valueElement.value,e.leaveValue)||(this.styleElement&&(this.styleElement.style.backgroundImage=this.styleElement._jscOrigStyle.backgroundImage,this.styleElement.style.backgroundColor=this.styleElement._jscOrigStyle.backgroundColor,this.styleElement.style.color=this.styleElement._jscOrigStyle.color),this.exportColor(e.leaveValue|e.leaveStyle)):this.exportColor():this.exportColor()},this.exportColor=function(t){if(!(t&e.leaveValue)&&this.valueElement){var n=this.toString();this.uppercase&&(n=n.toUpperCase()),this.hash&&(n="#"+n),e.isElementType(this.valueElement,"input")?this.valueElement.value=n:this.valueElement.innerHTML=n}t&e.leaveStyle||this.styleElement&&(this.styleElement.style.backgroundImage="none",this.styleElement.style.backgroundColor="#"+this.toString(),this.styleElement.style.color=this.isLight()?"#000":"#FFF"),!(t&e.leavePad)&&l()&&a(),!(t&e.leaveSld)&&l()&&f()},this.fromHSV=function(e,t,n,r){if(e!==null){if(isNaN(e))return!1;e=Math.max(0,Math.min(360,e))}if(t!==null){if(isNaN(t))return!1;t=Math.max(0,Math.min(100,this.maxS,t),this.minS)}if(n!==null){if(isNaN(n))return!1;n=Math.max(0,Math.min(100,this.maxV,n),this.minV)}this.rgb=s(e===null?this.hsv[0]:this.hsv[0]=e,t===null?this.hsv[1]:this.hsv[1]=t,n===null?this.hsv[2]:this.hsv[2]=n),this.exportColor(r)},this.fromRGB=function(e,t,n,r){if(e!==null){if(isNaN(e))return!1;e=Math.max(0,Math.min(255,e))}if(t!==null){if(isNaN(t))return!1;t=Math.max(0,Math.min(255,t))}if(n!==null){if(isNaN(n))return!1;n=Math.max(0,Math.min(255,n))}var o=i(e===null?this.rgb[0]:e,t===null?this.rgb[1]:t,n===null?this.rgb[2]:n);o[0]!==null&&(this.hsv[0]=Math.max(0,Math.min(360,o[0]))),o[2]!==0&&(this.hsv[1]=o[1]===null?null:Math.max(0,this.minS,Math.min(100,this.maxS,o[1]))),this.hsv[2]=o[2]===null?null:Math.max(0,this.minV,Math.min(100,this.maxV,o[2]));var u=s(this.hsv[0],this.hsv[1],this.hsv[2]);this.rgb[0]=u[0],this.rgb[1]=u[1],this.rgb[2]=u[2],this.exportColor(r)},this.fromString=function(e,t){var n;if(n=e.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i))return n[1].length===6?this.fromRGB(parseInt(n[1].substr(0,2),16),parseInt(n[1].substr(2,2),16),parseInt(n[1].substr(4,2),16),t):this.fromRGB(parseInt(n[1].charAt(0)+n[1].charAt(0),16),parseInt(n[1].charAt(1)+n[1].charAt(1),16),parseInt(n[1].charAt(2)+n[1].charAt(2),16),t),!0;if(n=e.match(/^\W*rgba?\(([^)]*)\)\W*$/i)){var r=n[1].split(","),i=/^\s*(\d*)(\.\d+)?\s*$/,s,o,u;if(r.length>=3&&(s=r[0].match(i))&&(o=r[1].match(i))&&(u=r[2].match(i))){var a=parseFloat((s[1]||"0")+(s[2]||"")),f=parseFloat((o[1]||"0")+(o[2]||"")),l=parseFloat((u[1]||"0")+(u[2]||""));return this.fromRGB(a,f,l,t),!0}}return!1},this.toString=function(){return(256|Math.round(this.rgb[0])).toString(16).substr(1)+(256|Math.round(this.rgb[1])).toString(16).substr(1)+(256|Math.round(this.rgb[2])).toString(16).substr(1)},this.toHEXString=function(){return"#"+this.toString().toUpperCase()},this.toRGBString=function(){return"rgb("+Math.round(this.rgb[0])+","+Math.round(this.rgb[1])+","+Math.round(this.rgb[2])+")"},this.isLight=function(){return.213*this.rgb[0]+.715*this.rgb[1]+.072*this.rgb[2]>127.5},this._processParentElementsInDOM=function(){if(this._linkedElementsProcessed)return;this._linkedElementsProcessed=!0;var t=this.targetElement;do{var n=e.getStyle(t);n&&n.position.toLowerCase()==="fixed"&&(this.fixed=!0),t!==this.targetElement&&(t._jscEventsAttached||(e.attachEvent(t,"scroll",e.onParentScroll),t._jscEventsAttached=!0))}while((t=t.parentNode)&&!e.isElementType(t,"body"))};if(typeof t=="string"){var h=t,p=document.getElementById(h);p?this.targetElement=p:e.warn("Could not find target element with ID '"+h+"'")}else t?this.targetElement=t:e.warn("Invalid target element: '"+t+"'");if(this.targetElement._jscLinkedInstance){e.warn("Cannot link jscolor twice to the same element. Skipping.");return}this.targetElement._jscLinkedInstance=this,this.valueElement=e.fetchElement(this.valueElement),this.styleElement=e.fetchElement(this.styleElement);var d=this,v=this.container?e.fetchElement(this.container):document.getElementsByTagName("body")[0],m=3;if(e.isElementType(this.targetElement,"button"))if(this.targetElement.onclick){var g=this.targetElement.onclick;this.targetElement.onclick=function(e){return g.call(this,e),!1}}else this.targetElement.onclick=function(){return!1};if(this.valueElement&&e.isElementType(this.valueElement,"input")){var y=function(){d.fromString(d.valueElement.value,e.leaveValue),e.dispatchFineChange(d)};e.attachEvent(this.valueElement,"keyup",y),e.attachEvent(this.valueElement,"input",y),e.attachEvent(this.valueElement,"blur",c),this.valueElement.setAttribute("autocomplete","off")}this.styleElement&&(this.styleElement._jscOrigStyle={backgroundImage:this.styleElement.style.backgroundImage,backgroundColor:this.styleElement.style.backgroundColor,color:this.styleElement.style.color}),this.value?this.fromString(this.value)||this.exportColor():this.importColor()}};return e.jscolor.lookupClass="jscolor",e.jscolor.installByClassName=function(t){var n=document.getElementsByTagName("input"),r=document.getElementsByTagName("button");e.tryInstallOnElements(n,t),e.tryInstallOnElements(r,t)},e.register(),e.jscolor}());
                                                                                                                                                /*!
 * Bootstrap-select v1.9.3 (http://silviomoreto.github.io/bootstrap-select)
 *
 * Copyright 2013-2015 bootstrap-select
 * Licensed under MIT (https://github.com/silviomoreto/bootstrap-select/blob/master/LICENSE)
 */



!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],function(a){return b(a)}):"object"==typeof exports?module.exports=b(require("jquery")):b(jQuery)}(this,function(a){!function(a){"use strict";function b(b){var c=[{re:/[\xC0-\xC6]/g,ch:"A"},{re:/[\xE0-\xE6]/g,ch:"a"},{re:/[\xC8-\xCB]/g,ch:"E"},{re:/[\xE8-\xEB]/g,ch:"e"},{re:/[\xCC-\xCF]/g,ch:"I"},{re:/[\xEC-\xEF]/g,ch:"i"},{re:/[\xD2-\xD6]/g,ch:"O"},{re:/[\xF2-\xF6]/g,ch:"o"},{re:/[\xD9-\xDC]/g,ch:"U"},{re:/[\xF9-\xFC]/g,ch:"u"},{re:/[\xC7-\xE7]/g,ch:"c"},{re:/[\xD1]/g,ch:"N"},{re:/[\xF1]/g,ch:"n"}];return a.each(c,function(){b=b.replace(this.re,this.ch)}),b}function c(a){var b={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},c="(?:"+Object.keys(b).join("|")+")",d=new RegExp(c),e=new RegExp(c,"g"),f=null==a?"":""+a;return d.test(f)?f.replace(e,function(a){return b[a]}):f}function d(b,c){var d=arguments,f=b,g=c;[].shift.apply(d);var h,i=this.each(function(){var b=a(this);if(b.is("select")){var c=b.data("selectpicker"),i="object"==typeof f&&f;if(c){if(i)for(var j in i)i.hasOwnProperty(j)&&(c.options[j]=i[j])}else{var k=a.extend({},e.DEFAULTS,a.fn.selectpicker.defaults||{},b.data(),i);k.template=a.extend({},e.DEFAULTS.template,a.fn.selectpicker.defaults?a.fn.selectpicker.defaults.template:{},b.data().template,i.template),b.data("selectpicker",c=new e(this,k,g))}"string"==typeof f&&(h=c[f]instanceof Function?c[f].apply(c,d):c.options[f])}});return"undefined"!=typeof h?h:i}String.prototype.includes||!function(){var a={}.toString,b=function(){try{var a={},b=Object.defineProperty,c=b(a,a,a)&&b}catch(d){}return c}(),c="".indexOf,d=function(b){if(null==this)throw new TypeError;var d=String(this);if(b&&"[object RegExp]"==a.call(b))throw new TypeError;var e=d.length,f=String(b),g=f.length,h=arguments.length>1?arguments[1]:void 0,i=h?Number(h):0;i!=i&&(i=0);var j=Math.min(Math.max(i,0),e);return g+j>e?!1:-1!=c.call(d,f,i)};b?b(String.prototype,"includes",{value:d,configurable:!0,writable:!0}):String.prototype.includes=d}(),String.prototype.startsWith||!function(){var a=function(){try{var a={},b=Object.defineProperty,c=b(a,a,a)&&b}catch(d){}return c}(),b={}.toString,c=function(a){if(null==this)throw new TypeError;var c=String(this);if(a&&"[object RegExp]"==b.call(a))throw new TypeError;var d=c.length,e=String(a),f=e.length,g=arguments.length>1?arguments[1]:void 0,h=g?Number(g):0;h!=h&&(h=0);var i=Math.min(Math.max(h,0),d);if(f+i>d)return!1;for(var j=-1;++j<f;)if(c.charCodeAt(i+j)!=e.charCodeAt(j))return!1;return!0};a?a(String.prototype,"startsWith",{value:c,configurable:!0,writable:!0}):String.prototype.startsWith=c}(),Object.keys||(Object.keys=function(a,b,c){c=[];for(b in a)c.hasOwnProperty.call(a,b)&&c.push(b);return c}),a.fn.triggerNative=function(a){var b,c=this[0];c.dispatchEvent?("function"==typeof Event?b=new Event(a,{bubbles:!0}):(b=document.createEvent("Event"),b.initEvent(a,!0,!1)),c.dispatchEvent(b)):(c.fireEvent&&(b=document.createEventObject(),b.eventType=a,c.fireEvent("on"+a,b)),this.trigger(a))},a.expr[":"].icontains=function(b,c,d){var e=a(b),f=(e.data("tokens")||e.text()).toUpperCase();return f.includes(d[3].toUpperCase())},a.expr[":"].ibegins=function(b,c,d){var e=a(b),f=(e.data("tokens")||e.text()).toUpperCase();return f.startsWith(d[3].toUpperCase())},a.expr[":"].aicontains=function(b,c,d){var e=a(b),f=(e.data("tokens")||e.data("normalizedText")||e.text()).toUpperCase();return f.includes(d[3].toUpperCase())},a.expr[":"].aibegins=function(b,c,d){var e=a(b),f=(e.data("tokens")||e.data("normalizedText")||e.text()).toUpperCase();return f.startsWith(d[3].toUpperCase())};var e=function(b,c,d){d&&(d.stopPropagation(),d.preventDefault()),this.$element=a(b),this.$newElement=null,this.$button=null,this.$menu=null,this.$lis=null,this.options=c,null===this.options.title&&(this.options.title=this.$element.attr("title")),this.val=e.prototype.val,this.render=e.prototype.render,this.refresh=e.prototype.refresh,this.setStyle=e.prototype.setStyle,this.selectAll=e.prototype.selectAll,this.deselectAll=e.prototype.deselectAll,this.destroy=e.prototype.destroy,this.remove=e.prototype.remove,this.show=e.prototype.show,this.hide=e.prototype.hide,this.init()};e.VERSION="1.9.3",e.DEFAULTS={noneSelectedText:"Nothing selected",noneResultsText:"No results matched {0}",countSelectedText:function(a,b){return 1==a?"{0} item selected":"{0} items selected"},maxOptionsText:function(a,b){return[1==a?"Limit reached ({n} item max)":"Limit reached ({n} items max)",1==b?"Group limit reached ({n} item max)":"Group limit reached ({n} items max)"]},selectAllText:"Select All",deselectAllText:"Deselect All",doneButton:!1,doneButtonText:"Close",multipleSeparator:", ",styleBase:"btn",style:"btn-default",size:"auto",title:null,selectedTextFormat:"values",width:!1,container:!1,hideDisabled:!1,showSubtext:!1,showIcon:!0,showContent:!0,dropupAuto:!0,header:!1,liveSearch:!1,liveSearchPlaceholder:null,liveSearchNormalize:!1,liveSearchStyle:"contains",actionsBox:!1,iconBase:"glyphicon",tickIcon:"glyphicon-ok",template:{caret:'<span class="caret"></span>'},maxOptions:!1,mobile:!1,selectOnTab:!1,dropdownAlignRight:!1},e.prototype={constructor:e,init:function(){var b=this,c=this.$element.attr("id");this.liObj={},this.multiple=this.$element.prop("multiple"),this.autofocus=this.$element.prop("autofocus"),this.$newElement=this.createView(),this.$element.after(this.$newElement).appendTo(this.$newElement),this.$button=this.$newElement.children("button"),this.$menu=this.$newElement.children(".dropdown-menu"),this.$menuInner=this.$menu.children(".inner"),this.$searchbox=this.$menu.find("input"),this.options.dropdownAlignRight&&this.$menu.addClass("dropdown-menu-right"),"undefined"!=typeof c&&(this.$button.attr("data-id",c),a('label[for="'+c+'"]').click(function(a){a.preventDefault(),b.$button.focus()})),this.checkDisabled(),this.clickListener(),this.options.liveSearch&&this.liveSearchListener(),this.render(),this.setStyle(),this.setWidth(),this.options.container&&this.selectPosition(),this.$menu.data("this",this),this.$newElement.data("this",this),this.options.mobile&&this.mobile(),this.$newElement.on({"hide.bs.dropdown":function(a){b.$element.trigger("hide.bs.select",a)},"hidden.bs.dropdown":function(a){b.$element.trigger("hidden.bs.select",a)},"show.bs.dropdown":function(a){b.$element.trigger("show.bs.select",a)},"shown.bs.dropdown":function(a){b.$element.trigger("shown.bs.select",a)}}),b.$element[0].hasAttribute("required")&&this.$element.on("invalid",function(){b.$button.addClass("bs-invalid").focus(),b.$element.on({"focus.bs.select":function(){b.$button.focus(),b.$element.off("focus.bs.select")},"shown.bs.select":function(){b.$element.val(b.$element.val()).off("shown.bs.select")},"rendered.bs.select":function(){this.validity.valid&&b.$button.removeClass("bs-invalid"),b.$element.off("rendered.bs.select")}})}),setTimeout(function(){b.$element.trigger("loaded.bs.select")})},createDropdown:function(){var b=this.multiple?" show-tick":"",d=this.$element.parent().hasClass("input-group")?" input-group-btn":"",e=this.autofocus?" autofocus":"",f=this.options.header?'<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>'+this.options.header+"</div>":"",g=this.options.liveSearch?'<div class="bs-searchbox"><input type="text" class="form-control" autocomplete="off"'+(null===this.options.liveSearchPlaceholder?"":' placeholder="'+c(this.options.liveSearchPlaceholder)+'"')+"></div>":"",h=this.multiple&&this.options.actionsBox?'<div class="bs-actionsbox"><div class="btn-group btn-group-sm btn-block"><button type="button" class="actions-btn bs-select-all btn btn-default">'+this.options.selectAllText+'</button><button type="button" class="actions-btn bs-deselect-all btn btn-default">'+this.options.deselectAllText+"</button></div></div>":"",i=this.multiple&&this.options.doneButton?'<div class="bs-donebutton"><div class="btn-group btn-block"><button type="button" class="btn btn-sm btn-default">'+this.options.doneButtonText+"</button></div></div>":"",j='<div class="btn-group bootstrap-select'+b+d+'"><button type="button" class="'+this.options.styleBase+' dropdown-toggle" data-toggle="dropdown"'+e+'><span class="filter-option pull-left"></span>&nbsp;<span class="bs-caret">'+this.options.template.caret+'</span></button><div class="dropdown-menu open">'+f+g+h+'<ul class="dropdown-menu inner" role="menu"></ul>'+i+"</div></div>";return a(j)},createView:function(){var a=this.createDropdown(),b=this.createLi();return a.find("ul")[0].innerHTML=b,a},reloadLi:function(){this.destroyLi();var a=this.createLi();this.$menuInner[0].innerHTML=a},destroyLi:function(){this.$menu.find("li").remove()},createLi:function(){var d=this,e=[],f=0,g=document.createElement("option"),h=-1,i=function(a,b,c,d){return"<li"+("undefined"!=typeof c&""!==c?' class="'+c+'"':"")+("undefined"!=typeof b&null!==b?' data-original-index="'+b+'"':"")+("undefined"!=typeof d&null!==d?'data-optgroup="'+d+'"':"")+">"+a+"</li>"},j=function(a,e,f,g){return'<a tabindex="0"'+("undefined"!=typeof e?' class="'+e+'"':"")+("undefined"!=typeof f?' style="'+f+'"':"")+(d.options.liveSearchNormalize?' data-normalized-text="'+b(c(a))+'"':"")+("undefined"!=typeof g||null!==g?' data-tokens="'+g+'"':"")+">"+a+'<span class="'+d.options.iconBase+" "+d.options.tickIcon+' check-mark"></span></a>'};if(this.options.title&&!this.multiple&&(h--,!this.$element.find(".bs-title-option").length)){var k=this.$element[0];g.className="bs-title-option",g.appendChild(document.createTextNode(this.options.title)),g.value="",k.insertBefore(g,k.firstChild),void 0===a(k.options[k.selectedIndex]).attr("selected")&&(g.selected=!0)}return this.$element.find("option").each(function(b){var c=a(this);if(h++,!c.hasClass("bs-title-option")){var g=this.className||"",k=this.style.cssText,l=c.data("content")?c.data("content"):c.html(),m=c.data("tokens")?c.data("tokens"):null,n="undefined"!=typeof c.data("subtext")?'<small class="text-muted">'+c.data("subtext")+"</small>":"",o="undefined"!=typeof c.data("icon")?'<span class="'+d.options.iconBase+" "+c.data("icon")+'"></span> ':"",p=this.disabled||"OPTGROUP"===this.parentNode.tagName&&this.parentNode.disabled;if(""!==o&&p&&(o="<span>"+o+"</span>"),d.options.hideDisabled&&p)return void h--;if(c.data("content")||(l=o+'<span class="text">'+l+n+"</span>"),"OPTGROUP"===this.parentNode.tagName&&c.data("divider")!==!0){var q=" "+this.parentNode.className||"";if(0===c.index()){f+=1;var r=this.parentNode.label,s="undefined"!=typeof c.parent().data("subtext")?'<small class="text-muted">'+c.parent().data("subtext")+"</small>":"",t=c.parent().data("icon")?'<span class="'+d.options.iconBase+" "+c.parent().data("icon")+'"></span> ':"";r=t+'<span class="text">'+r+s+"</span>",0!==b&&e.length>0&&(h++,e.push(i("",null,"divider",f+"div"))),h++,e.push(i(r,null,"dropdown-header"+q,f))}e.push(i(j(l,"opt "+g+q,k,m),b,"",f))}else c.data("divider")===!0?e.push(i("",b,"divider")):c.data("hidden")===!0?e.push(i(j(l,g,k,m),b,"hidden is-hidden")):(this.previousElementSibling&&"OPTGROUP"===this.previousElementSibling.tagName&&(h++,e.push(i("",null,"divider",f+"div"))),e.push(i(j(l,g,k,m),b)));d.liObj[b]=h}}),this.multiple||0!==this.$element.find("option:selected").length||this.options.title||this.$element.find("option").eq(0).prop("selected",!0).attr("selected","selected"),e.join("")},findLis:function(){return null==this.$lis&&(this.$lis=this.$menu.find("li")),this.$lis},render:function(b){var c,d=this;b!==!1&&this.$element.find("option").each(function(a){var b=d.findLis().eq(d.liObj[a]);d.setDisabled(a,this.disabled||"OPTGROUP"===this.parentNode.tagName&&this.parentNode.disabled,b),d.setSelected(a,this.selected,b)}),this.tabIndex();var e=this.$element.find("option").map(function(){if(this.selected){if(d.options.hideDisabled&&(this.disabled||"OPTGROUP"===this.parentNode.tagName&&this.parentNode.disabled))return;var b,c=a(this),e=c.data("icon")&&d.options.showIcon?'<i class="'+d.options.iconBase+" "+c.data("icon")+'"></i> ':"";return b=d.options.showSubtext&&c.data("subtext")&&!d.multiple?' <small class="text-muted">'+c.data("subtext")+"</small>":"","undefined"!=typeof c.attr("title")?c.attr("title"):c.data("content")&&d.options.showContent?c.data("content"):e+c.html()+b}}).toArray(),f=this.multiple?e.join(this.options.multipleSeparator):e[0];if(this.multiple&&this.options.selectedTextFormat.indexOf("count")>-1){var g=this.options.selectedTextFormat.split(">");if(g.length>1&&e.length>g[1]||1==g.length&&e.length>=2){c=this.options.hideDisabled?", [disabled]":"";var h=this.$element.find("option").not('[data-divider="true"], [data-hidden="true"]'+c).length,i="function"==typeof this.options.countSelectedText?this.options.countSelectedText(e.length,h):this.options.countSelectedText;f=i.replace("{0}",e.length.toString()).replace("{1}",h.toString())}}void 0==this.options.title&&(this.options.title=this.$element.attr("title")),"static"==this.options.selectedTextFormat&&(f=this.options.title),f||(f="undefined"!=typeof this.options.title?this.options.title:this.options.noneSelectedText),this.$button.attr("title",a.trim(f.replace(/<[^>]*>?/g,""))),this.$button.children(".filter-option").html(f),this.$element.trigger("rendered.bs.select")},setStyle:function(a,b){this.$element.attr("class")&&this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi,""));var c=a?a:this.options.style;"add"==b?this.$button.addClass(c):"remove"==b?this.$button.removeClass(c):(this.$button.removeClass(this.options.style),this.$button.addClass(c))},liHeight:function(b){if(b||this.options.size!==!1&&!this.sizeInfo){var c=document.createElement("div"),d=document.createElement("div"),e=document.createElement("ul"),f=document.createElement("li"),g=document.createElement("li"),h=document.createElement("a"),i=document.createElement("span"),j=this.options.header&&this.$menu.find(".popover-title").length>0?this.$menu.find(".popover-title")[0].cloneNode(!0):null,k=this.options.liveSearch?document.createElement("div"):null,l=this.options.actionsBox&&this.multiple&&this.$menu.find(".bs-actionsbox").length>0?this.$menu.find(".bs-actionsbox")[0].cloneNode(!0):null,m=this.options.doneButton&&this.multiple&&this.$menu.find(".bs-donebutton").length>0?this.$menu.find(".bs-donebutton")[0].cloneNode(!0):null;if(i.className="text",c.className=this.$menu[0].parentNode.className+" open",d.className="dropdown-menu open",e.className="dropdown-menu inner",f.className="divider",i.appendChild(document.createTextNode("Inner text")),h.appendChild(i),g.appendChild(h),e.appendChild(g),e.appendChild(f),j&&d.appendChild(j),k){var n=document.createElement("span");k.className="bs-searchbox",n.className="form-control",k.appendChild(n),d.appendChild(k)}l&&d.appendChild(l),d.appendChild(e),m&&d.appendChild(m),c.appendChild(d),document.body.appendChild(c);var o=h.offsetHeight,p=j?j.offsetHeight:0,q=k?k.offsetHeight:0,r=l?l.offsetHeight:0,s=m?m.offsetHeight:0,t=a(f).outerHeight(!0),u="function"==typeof getComputedStyle?getComputedStyle(d):!1,v=u?null:a(d),w=parseInt(u?u.paddingTop:v.css("paddingTop"))+parseInt(u?u.paddingBottom:v.css("paddingBottom"))+parseInt(u?u.borderTopWidth:v.css("borderTopWidth"))+parseInt(u?u.borderBottomWidth:v.css("borderBottomWidth")),x=w+parseInt(u?u.marginTop:v.css("marginTop"))+parseInt(u?u.marginBottom:v.css("marginBottom"))+2;document.body.removeChild(c),this.sizeInfo={liHeight:o,headerHeight:p,searchHeight:q,actionsHeight:r,doneButtonHeight:s,dividerHeight:t,menuPadding:w,menuExtras:x}}},setSize:function(){if(this.findLis(),this.liHeight(),this.options.header&&this.$menu.css("padding-top",0),this.options.size!==!1){var b,c,d,e,f=this,g=this.$menu,h=this.$menuInner,i=a(window),j=this.$newElement[0].offsetHeight,k=this.sizeInfo.liHeight,l=this.sizeInfo.headerHeight,m=this.sizeInfo.searchHeight,n=this.sizeInfo.actionsHeight,o=this.sizeInfo.doneButtonHeight,p=this.sizeInfo.dividerHeight,q=this.sizeInfo.menuPadding,r=this.sizeInfo.menuExtras,s=this.options.hideDisabled?".disabled":"",t=function(){d=f.$newElement.offset().top-i.scrollTop(),e=i.height()-d-j};if(t(),"auto"===this.options.size){var u=function(){var i,j=function(b,c){return function(d){return c?d.classList?d.classList.contains(b):a(d).hasClass(b):!(d.classList?d.classList.contains(b):a(d).hasClass(b))}},p=f.$menuInner[0].getElementsByTagName("li"),s=Array.prototype.filter?Array.prototype.filter.call(p,j("hidden",!1)):f.$lis.not(".hidden"),u=Array.prototype.filter?Array.prototype.filter.call(s,j("dropdown-header",!0)):s.filter(".dropdown-header");t(),b=e-r,f.options.container?(g.data("height")||g.data("height",g.height()),c=g.data("height")):c=g.height(),f.options.dropupAuto&&f.$newElement.toggleClass("dropup",d>e&&c>b-r),f.$newElement.hasClass("dropup")&&(b=d-r),i=s.length+u.length>3?3*k+r-2:0,g.css({"max-height":b+"px",overflow:"hidden","min-height":i+l+m+n+o+"px"}),h.css({"max-height":b-l-m-n-o-q+"px","overflow-y":"auto","min-height":Math.max(i-q,0)+"px"})};u(),this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.getSize",u),i.off("resize.getSize scroll.getSize").on("resize.getSize scroll.getSize",u)}else if(this.options.size&&"auto"!=this.options.size&&this.$lis.not(s).length>this.options.size){var v=this.$lis.not(".divider").not(s).children().slice(0,this.options.size).last().parent().index(),w=this.$lis.slice(0,v+1).filter(".divider").length;b=k*this.options.size+w*p+q,f.options.container?(g.data("height")||g.data("height",g.height()),c=g.data("height")):c=g.height(),f.options.dropupAuto&&this.$newElement.toggleClass("dropup",d>e&&c>b-r),g.css({"max-height":b+l+m+n+o+"px",overflow:"hidden","min-height":""}),h.css({"max-height":b-q+"px","overflow-y":"auto","min-height":""})}}},setWidth:function(){if("auto"===this.options.width){this.$menu.css("min-width","0");var a=this.$menu.parent().clone().appendTo("body"),b=this.options.container?this.$newElement.clone().appendTo("body"):a,c=a.children(".dropdown-menu").outerWidth(),d=b.css("width","auto").children("button").outerWidth();a.remove(),b.remove(),this.$newElement.css("width",Math.max(c,d)+"px")}else"fit"===this.options.width?(this.$menu.css("min-width",""),this.$newElement.css("width","").addClass("fit-width")):this.options.width?(this.$menu.css("min-width",""),this.$newElement.css("width",this.options.width)):(this.$menu.css("min-width",""),this.$newElement.css("width",""));this.$newElement.hasClass("fit-width")&&"fit"!==this.options.width&&this.$newElement.removeClass("fit-width")},selectPosition:function(){this.$bsContainer=a('<div class="bs-container" />');var b,c,d=this,e=function(a){d.$bsContainer.addClass(a.attr("class").replace(/form-control|fit-width/gi,"")).toggleClass("dropup",a.hasClass("dropup")),b=a.offset(),c=a.hasClass("dropup")?0:a[0].offsetHeight,d.$bsContainer.css({top:b.top+c,left:b.left,width:a[0].offsetWidth})};this.$button.on("click",function(){var b=a(this);d.isDisabled()||(e(d.$newElement),d.$bsContainer.appendTo(d.options.container).toggleClass("open",!b.hasClass("open")).append(d.$menu))}),a(window).on("resize scroll",function(){e(d.$newElement)}),this.$element.on("hide.bs.select",function(){d.$menu.data("height",d.$menu.height()),d.$bsContainer.detach()})},setSelected:function(a,b,c){c||(c=this.findLis().eq(this.liObj[a])),c.toggleClass("selected",b)},setDisabled:function(a,b,c){c||(c=this.findLis().eq(this.liObj[a])),b?c.addClass("disabled").children("a").attr("href","#").attr("tabindex",-1):c.removeClass("disabled").children("a").removeAttr("href").attr("tabindex",0)},isDisabled:function(){return this.$element[0].disabled},checkDisabled:function(){var a=this;this.isDisabled()?(this.$newElement.addClass("disabled"),this.$button.addClass("disabled").attr("tabindex",-1)):(this.$button.hasClass("disabled")&&(this.$newElement.removeClass("disabled"),this.$button.removeClass("disabled")),-1!=this.$button.attr("tabindex")||this.$element.data("tabindex")||this.$button.removeAttr("tabindex")),this.$button.click(function(){return!a.isDisabled()})},tabIndex:function(){this.$element.data("tabindex")!==this.$element.attr("tabindex")&&-98!==this.$element.attr("tabindex")&&"-98"!==this.$element.attr("tabindex")&&(this.$element.data("tabindex",this.$element.attr("tabindex")),this.$button.attr("tabindex",this.$element.data("tabindex"))),this.$element.attr("tabindex",-98)},clickListener:function(){var b=this,c=a(document);this.$newElement.on("touchstart.dropdown",".dropdown-menu",function(a){a.stopPropagation()}),c.data("spaceSelect",!1),this.$button.on("keyup",function(a){/(32)/.test(a.keyCode.toString(10))&&c.data("spaceSelect")&&(a.preventDefault(),c.data("spaceSelect",!1))}),this.$button.on("click",function(){b.setSize(),b.$element.on("shown.bs.select",function(){if(b.options.liveSearch||b.multiple){if(!b.multiple){var a=b.liObj[b.$element[0].selectedIndex];if("number"!=typeof a||b.options.size===!1)return;var c=b.$lis.eq(a)[0].offsetTop-b.$menuInner[0].offsetTop;c=c-b.$menuInner[0].offsetHeight/2+b.sizeInfo.liHeight/2,b.$menuInner[0].scrollTop=c}}else b.$menuInner.find(".selected a").focus()})}),this.$menuInner.on("click","li a",function(c){var d=a(this),e=d.parent().data("originalIndex"),f=b.$element.val(),g=b.$element.prop("selectedIndex");if(b.multiple&&c.stopPropagation(),c.preventDefault(),!b.isDisabled()&&!d.parent().hasClass("disabled")){var h=b.$element.find("option"),i=h.eq(e),j=i.prop("selected"),k=i.parent("optgroup"),l=b.options.maxOptions,m=k.data("maxOptions")||!1;if(b.multiple){if(i.prop("selected",!j),b.setSelected(e,!j),d.blur(),l!==!1||m!==!1){var n=l<h.filter(":selected").length,o=m<k.find("option:selected").length;if(l&&n||m&&o)if(l&&1==l)h.prop("selected",!1),i.prop("selected",!0),b.$menuInner.find(".selected").removeClass("selected"),b.setSelected(e,!0);else if(m&&1==m){k.find("option:selected").prop("selected",!1),i.prop("selected",!0);var p=d.parent().data("optgroup");b.$menuInner.find('[data-optgroup="'+p+'"]').removeClass("selected"),b.setSelected(e,!0)}else{var q="function"==typeof b.options.maxOptionsText?b.options.maxOptionsText(l,m):b.options.maxOptionsText,r=q[0].replace("{n}",l),s=q[1].replace("{n}",m),t=a('<div class="notify"></div>');q[2]&&(r=r.replace("{var}",q[2][l>1?0:1]),s=s.replace("{var}",q[2][m>1?0:1])),i.prop("selected",!1),b.$menu.append(t),l&&n&&(t.append(a("<div>"+r+"</div>")),b.$element.trigger("maxReached.bs.select")),m&&o&&(t.append(a("<div>"+s+"</div>")),b.$element.trigger("maxReachedGrp.bs.select")),setTimeout(function(){b.setSelected(e,!1)},10),t.delay(750).fadeOut(300,function(){a(this).remove()})}}}else h.prop("selected",!1),i.prop("selected",!0),b.$menuInner.find(".selected").removeClass("selected"),b.setSelected(e,!0);b.multiple?b.options.liveSearch&&b.$searchbox.focus():b.$button.focus(),(f!=b.$element.val()&&b.multiple||g!=b.$element.prop("selectedIndex")&&!b.multiple)&&(b.$element.triggerNative("change"),b.$element.trigger("changed.bs.select",[e,i.prop("selected"),j]))}}),this.$menu.on("click","li.disabled a, .popover-title, .popover-title :not(.close)",function(c){c.currentTarget==this&&(c.preventDefault(),c.stopPropagation(),b.options.liveSearch&&!a(c.target).hasClass("close")?b.$searchbox.focus():b.$button.focus())}),this.$menuInner.on("click",".divider, .dropdown-header",function(a){a.preventDefault(),a.stopPropagation(),b.options.liveSearch?b.$searchbox.focus():b.$button.focus()}),this.$menu.on("click",".popover-title .close",function(){b.$button.click()}),this.$searchbox.on("click",function(a){a.stopPropagation()}),this.$menu.on("click",".actions-btn",function(c){b.options.liveSearch?b.$searchbox.focus():b.$button.focus(),c.preventDefault(),c.stopPropagation(),a(this).hasClass("bs-select-all")?b.selectAll():b.deselectAll(),b.$element.triggerNative("change")}),this.$element.change(function(){b.render(!1)})},liveSearchListener:function(){var d=this,e=a('<li class="no-results"></li>');this.$button.on("click.dropdown.data-api touchstart.dropdown.data-api",function(){d.$menuInner.find(".active").removeClass("active"),d.$searchbox.val()&&(d.$searchbox.val(""),d.$lis.not(".is-hidden").removeClass("hidden"),e.parent().length&&e.remove()),d.multiple||d.$menuInner.find(".selected").addClass("active"),setTimeout(function(){d.$searchbox.focus()},10)}),this.$searchbox.on("click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api",function(a){a.stopPropagation()}),this.$searchbox.on("input propertychange",function(){if(d.$searchbox.val()){var f=d.$lis.not(".is-hidden").removeClass("hidden").children("a");f=d.options.liveSearchNormalize?f.not(":a"+d._searchStyle()+'("'+b(d.$searchbox.val())+'")'):f.not(":"+d._searchStyle()+'("'+d.$searchbox.val()+'")'),f.parent().addClass("hidden"),d.$lis.filter(".dropdown-header").each(function(){var b=a(this),c=b.data("optgroup");0===d.$lis.filter("[data-optgroup="+c+"]").not(b).not(".hidden").length&&(b.addClass("hidden"),d.$lis.filter("[data-optgroup="+c+"div]").addClass("hidden"))});var g=d.$lis.not(".hidden");g.each(function(b){var c=a(this);c.hasClass("divider")&&(c.index()===g.first().index()||c.index()===g.last().index()||g.eq(b+1).hasClass("divider"))&&c.addClass("hidden")}),d.$lis.not(".hidden, .no-results").length?e.parent().length&&e.remove():(e.parent().length&&e.remove(),e.html(d.options.noneResultsText.replace("{0}",'"'+c(d.$searchbox.val())+'"')).show(),d.$menuInner.append(e))}else d.$lis.not(".is-hidden").removeClass("hidden"),e.parent().length&&e.remove();d.$lis.filter(".active").removeClass("active"),d.$searchbox.val()&&d.$lis.not(".hidden, .divider, .dropdown-header").eq(0).addClass("active").children("a").focus(),a(this).focus()})},_searchStyle:function(){var a={begins:"ibegins",startsWith:"ibegins"};return a[this.options.liveSearchStyle]||"icontains"},val:function(a){return"undefined"!=typeof a?(this.$element.val(a),this.render(),this.$element):this.$element.val()},changeAll:function(b){"undefined"==typeof b&&(b=!0),this.findLis();for(var c=this.$element.find("option"),d=this.$lis.not(".divider, .dropdown-header, .disabled, .hidden").toggleClass("selected",b),e=d.length,f=[],g=0;e>g;g++){var h=d[g].getAttribute("data-original-index");f[f.length]=c.eq(h)[0]}a(f).prop("selected",b),this.render(!1)},selectAll:function(){return this.changeAll(!0)},deselectAll:function(){return this.changeAll(!1)},keydown:function(c){var d,e,f,g,h,i,j,k,l,m=a(this),n=m.is("input")?m.parent().parent():m.parent(),o=n.data("this"),p=":not(.disabled, .hidden, .dropdown-header, .divider)",q={32:" ",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9"};if(o.options.liveSearch&&(n=m.parent().parent()),o.options.container&&(n=o.$menu),d=a("[role=menu] li",n),l=o.$newElement.hasClass("open"),!l&&(c.keyCode>=48&&c.keyCode<=57||c.keyCode>=96&&c.keyCode<=105||c.keyCode>=65&&c.keyCode<=90)&&(o.options.container?o.$button.trigger("click"):(o.setSize(),o.$menu.parent().addClass("open"),l=!0),o.$searchbox.focus()),o.options.liveSearch&&(/(^9$|27)/.test(c.keyCode.toString(10))&&l&&0===o.$menu.find(".active").length&&(c.preventDefault(),o.$menu.parent().removeClass("open"),o.options.container&&o.$newElement.removeClass("open"),o.$button.focus()),d=a("[role=menu] li"+p,n),m.val()||/(38|40)/.test(c.keyCode.toString(10))||0===d.filter(".active").length&&(d=o.$menuInner.find("li"),d=o.options.liveSearchNormalize?d.filter(":a"+o._searchStyle()+"("+b(q[c.keyCode])+")"):d.filter(":"+o._searchStyle()+"("+q[c.keyCode]+")"))),d.length){if(/(38|40)/.test(c.keyCode.toString(10)))e=d.index(d.find("a").filter(":focus").parent()),g=d.filter(p).first().index(),h=d.filter(p).last().index(),f=d.eq(e).nextAll(p).eq(0).index(),i=d.eq(e).prevAll(p).eq(0).index(),j=d.eq(f).prevAll(p).eq(0).index(),o.options.liveSearch&&(d.each(function(b){a(this).hasClass("disabled")||a(this).data("index",b)}),e=d.index(d.filter(".active")),g=d.first().data("index"),h=d.last().data("index"),f=d.eq(e).nextAll().eq(0).data("index"),i=d.eq(e).prevAll().eq(0).data("index"),j=d.eq(f).prevAll().eq(0).data("index")),k=m.data("prevIndex"),38==c.keyCode?(o.options.liveSearch&&e--,e!=j&&e>i&&(e=i),g>e&&(e=g),e==k&&(e=h)):40==c.keyCode&&(o.options.liveSearch&&e++,-1==e&&(e=0),e!=j&&f>e&&(e=f),e>h&&(e=h),e==k&&(e=g)),m.data("prevIndex",e),o.options.liveSearch?(c.preventDefault(),m.hasClass("dropdown-toggle")||(d.removeClass("active").eq(e).addClass("active").children("a").focus(),m.focus())):d.eq(e).children("a").focus();else if(!m.is("input")){var r,s,t=[];d.each(function(){a(this).hasClass("disabled")||a.trim(a(this).children("a").text().toLowerCase()).substring(0,1)==q[c.keyCode]&&t.push(a(this).index())}),r=a(document).data("keycount"),r++,a(document).data("keycount",r),s=a.trim(a(":focus").text().toLowerCase()).substring(0,1),s!=q[c.keyCode]?(r=1,a(document).data("keycount",r)):r>=t.length&&(a(document).data("keycount",0),r>t.length&&(r=1)),d.eq(t[r-1]).children("a").focus()}if((/(13|32)/.test(c.keyCode.toString(10))||/(^9$)/.test(c.keyCode.toString(10))&&o.options.selectOnTab)&&l){if(/(32)/.test(c.keyCode.toString(10))||c.preventDefault(),o.options.liveSearch)/(32)/.test(c.keyCode.toString(10))||(o.$menuInner.find(".active a").click(),m.focus());else{var u=a(":focus");u.click(),u.focus(),c.preventDefault(),a(document).data("spaceSelect",!0)}a(document).data("keycount",0)}(/(^9$|27)/.test(c.keyCode.toString(10))&&l&&(o.multiple||o.options.liveSearch)||/(27)/.test(c.keyCode.toString(10))&&!l)&&(o.$menu.parent().removeClass("open"),o.options.container&&o.$newElement.removeClass("open"),o.$button.focus())}},mobile:function(){this.$element.addClass("mobile-device")},refresh:function(){this.$lis=null,this.liObj={},this.reloadLi(),this.render(),this.checkDisabled(),this.liHeight(!0),this.setStyle(),this.setWidth(),this.$lis&&this.$searchbox.trigger("propertychange"),this.$element.trigger("refreshed.bs.select")},hide:function(){this.$newElement.hide()},show:function(){this.$newElement.show()},remove:function(){this.$newElement.remove(),this.$element.remove()},destroy:function(){this.$newElement.remove(),this.$bsContainer?this.$bsContainer.remove():this.$menu.remove(),this.$element.off(".bs.select").removeData("selectpicker").removeClass("bs-select-hidden selectpicker")}};var f=a.fn.selectpicker;a.fn.selectpicker=d,a.fn.selectpicker.Constructor=e,a.fn.selectpicker.noConflict=function(){return a.fn.selectpicker=f,this},a(document).data("keycount",0).on("keydown.bs.select",'.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="menu"], .bs-searchbox input',e.prototype.keydown).on("focusin.modal",'.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="menu"], .bs-searchbox input',function(a){a.stopPropagation()}),a(window).on("load.bs.select.data-api",function(){a(".selectpicker").each(function(){var b=a(this);d.call(b,b.data())})})}(a)});
//# sourceMappingURL=bootstrap-select.js.map



  var doctype = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';

  window.URL = (window.URL || window.webkitURL);

  var body = document.body,
      emptySvg;

  var prefix = {
    xmlns: "http://www.w3.org/2000/xmlns/",
    xlink: "http://www.w3.org/1999/xlink",
    svg: "http://www.w3.org/2000/svg"
  };
 

  function startdownload() {
    var documents = [window.document],
        SVGSources = [];
        iframes = document.querySelectorAll("iframe"),
        objects = document.querySelectorAll("object");

    // add empty svg element
    var emptySvg = window.document.createElementNS(prefix.svg, 'svg');
    window.document.body.appendChild(emptySvg);
    var emptySvgDeclarationComputed = getComputedStyle(emptySvg);

    [].forEach.call(iframes, function(el) {
      try {
        if (el.contentDocument) {
          documents.push(el.contentDocument);
        }
      } catch(err) {
        console.log(err);
      }
    });

    [].forEach.call(objects, function(el) {
      try {
        if (el.contentDocument) {
          documents.push(el.contentDocument);
        }
      } catch(err) {
        console.log(err)
      }
    });

    documents.forEach(function(doc) {
      var newSources = getSources(doc, emptySvgDeclarationComputed);
      // because of prototype on NYT pages
     download(newSources[0],"d3World");
    });
 
  }



  function getSources(doc, emptySvgDeclarationComputed) {
    var svgInfo = [],
        svgs = doc.querySelectorAll("svg");

    [].forEach.call(svgs, function (svg) {

      svg.setAttribute("version", "1.1");

      // removing attributes so they aren't doubled up
      svg.removeAttribute("xmlns");
      svg.removeAttribute("xlink");

      // These are needed for the svg
      if (!svg.hasAttributeNS(prefix.xmlns, "xmlns")) {
        svg.setAttributeNS(prefix.xmlns, "xmlns", prefix.svg);
      }

      if (!svg.hasAttributeNS(prefix.xmlns, "xmlns:xlink")) {
        svg.setAttributeNS(prefix.xmlns, "xmlns:xlink", prefix.xlink);
      }

      setInlineStyles(svg, emptySvgDeclarationComputed);

      var source = (new XMLSerializer()).serializeToString(svg);
      var rect = svg.getBoundingClientRect();
      svgInfo.push({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        class: svg.getAttribute("class"),
        id: svg.getAttribute("id"),
        childElementCount: svg.childElementCount,
        source: [doctype + source]
      });
    });
    return svgInfo;
  }

  function download(source, name) {
     

    var url = window.URL.createObjectURL(new Blob(source.source, { "type" : "text\/xml" }));

    var a = document.createElement("a");
    body.appendChild(a);
    a.setAttribute("class", "d3World");
    a.setAttribute("download", name + ".svg");
    a.setAttribute("href", url);
    a.style["display"] = "none";
    a.click();

    setTimeout(function() {
      window.URL.revokeObjectURL(url);
    }, 10);
  }


  function setInlineStyles(svg, emptySvgDeclarationComputed) {

    function explicitlySetStyle (element) {
      var cSSStyleDeclarationComputed = getComputedStyle(element);
      var i, len, key, value;
      var computedStyleStr = "";
      for (i=0, len=cSSStyleDeclarationComputed.length; i<len; i++) {
        key=cSSStyleDeclarationComputed[i];
        value=cSSStyleDeclarationComputed.getPropertyValue(key);
        if (value!==emptySvgDeclarationComputed.getPropertyValue(key)) {
          computedStyleStr+=key+":"+value+";";
        }
      }
      element.setAttribute('style', computedStyleStr);
    }
    function traverse(obj){
      var tree = [];
      tree.push(obj);
      visit(obj);
      function visit(node) {
        if (node && node.hasChildNodes()) {
          var child = node.firstChild;
          while (child) {
            if (child.nodeType === 1 && child.nodeName != 'SCRIPT'){
              tree.push(child);
              visit(child);
            }
            child = child.nextSibling;
          }
        }
      }
      return tree;
    }
    // hardcode computed css styles inside svg
    var allElements = traverse(svg);
    var i = allElements.length;
    while (i--){
      explicitlySetStyle(allElements[i]);
    }
  }
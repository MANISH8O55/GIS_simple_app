// map class intiatize
    var map = L.map('map').setView([20.5937, 78.9629], 7);
    map.zoomControl.setPosition('topright');
    
    // Addng  osm titlelayer
    var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var USGS_USTopo = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 20,
        attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'

    });

    var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        minZoom: 1,
        maxZoom: 16,
        ext: 'jpg'

    });

    var Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA',
        maxZoom: 16

    });

    var USGS_USImageryTopo = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 20,
        attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'

    });

    var Stamen_Toner = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png'
    });

    // Adding maker in the center of map
    var singleMarker = L.marker([20.5937, 78.9629])
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();

    // add map scale
    L.control.scale().addTo(map);
    
    //Map coordinate display
    map.on('mousemove', function(e) {
        console.log(e)
        $('.coordinate').html(`Latitude: ${e.latlng.lat}   Longitude: ${e.latlng.lng}`)
    })

    //Geojson load
    var marker = L.markerClusterGroup();
    var taji = L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
        const popupContent = `
        <b>Name:</b> ${feature.properties.name}<br>
        <b>Shop:</b> ${feature.properties.shop || "N/A"}<br>
        <b>City:</b> ${feature.properties["addr:city"] || "N/A"}<br>
        <b>Postcode:</b> ${feature.properties["addr:postcode"] || "N/A"}<br>
        <b>Opening Hours:</b> ${feature.properties.opening_hours || "N/A"}<br>
        `;
        layer.bindPopup(popupContent);
    }
    });
    taji.addTo(marker);
    marker.addTo(map);


    //Leaflet Layer control
    var baseMaps = {
        'OSM':osm,
        'Stamen Water color': Stamen_Watercolor,
        'Esri NatGeo WorldMap': Esri_NatGeoWorldMap,
        'USGS US ImageryTopo' : USGS_USImageryTopo,
        'Stamen Toner': Stamen_Toner
    }

    var overlayMaps = {
        'GeoJSON Markers': marker,
        'Single Marker' : singleMarker
    }
 

L.control.layers(baseMaps, overlayMaps, { collapsed: false, position: 'topleft' }).addTo(map);

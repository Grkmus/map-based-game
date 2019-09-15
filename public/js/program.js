document.addEventListener('DOMContentLoaded', function () {



    // var alignments = {
    //     ibrMal: L.tileLayer.wms('http://localhost:7000/geoserver/gwc/service/wms', {
    //         layers: 'Marmaray:IBR-MAL_ALN',
    //         format: 'image/png',
    //         transparent: true,
    //         maxZoom: 21
    //     }),
    //     kazYsk: L.tileLayer.wms('http://localhost:7000/geoserver/gwc/service/wms', {
    //         layers: 'Marmaray:KAZ-YSK_ALN',
    //         format: 'image/png',
    //         transparent: true,
    //         maxZoom: 20
    //     }) 
    // }
    
    // var ho = L.tileLayer.wms('http://localhost:7000/geoserver/gwc/service/wms', {
    //         layers: 'Marmaray:HO',
    //         format: 'image/png',
    //         transparent: true,
    //         maxZoom: 20
    //     });
        
    // var chainageText = { 
    //     ibrMal: L.tileLayer.wms('http://localhost:7000/geoserver/gwc/service/wms', {
    //                 layers: 'Marmaray:IBR-MAL_ALN-ChainageText',
    //                 format: 'image/png',
    //                 transparent: true,
    //                 maxZoom: 20
    //             }),
    //     kazYsk: L.tileLayer.wms('http://localhost:7000/geoserver/gwc/service/wms', {
    //                 layers: 'Marmaray:KAZ-YSK_ALN-ChainageText',
    //                 format: 'image/png',
    //                 transparent: true,
    //                 maxZoom: 20
    //             })
    //     }
        
    
    var baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    	maxZoom: 20,
    	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    	opacity: 0.5
    }); 
    


    var map = L.map('map', {
        center: [38.7198, 34.6728],
        zoom: 5,
        maxZoom: 21,
        layers: [
            baseLayer, 
            // alignments.ibrMal, 
            // alignments.kazYsk, 
            // ho, 
            // chainageText.ibrMal, 
            // chainageText.kazYsk 
        ]
    });
    
    var i = 1;
    $('#cekbox').on('change', function () {
        if (i == 1) {
            map.removeLayer(ho);
            map.removeLayer(ho);
            i = 0;
        } else {
            map.addLayer(ho);
            map.addLayer(ho);
            i = 1;
        }
    });

    map.on('click', function (e) {
        console.log(e);
    })        
    //     $.ajax({
    //         type:'POST',
    //         url: '/addMarker',
    //         data: {
    //             lat: array.lat,
    //             lng: array.lng
    //         },
    //         success: function () {
    //             console.log('success');
    //         }
    //     });
    // });
    var cityLayerGroup = L.layerGroup()
    var prevCity = null
    $('#getChainage').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/city/all',
            dataType: "json",
            success: function (cities) {                
                cities.forEach(city => {
                    city.leafletPolygon = L.polygon(city.geolocation.polygons).addTo(map)
                    cityLayerGroup.addLayer(city.leafletPolygon)
                    city.leafletPolygon.setStyle({fillColor: 'blue', weight: 1})
                    city.leafletPolygon.on('mouseover', e => { e.target.setStyle({fillColor: 'red'}) })
                    city.leafletPolygon.on('mouseout', e => { e.target.setStyle({fillColor: 'blue'}) })
                    
                    city.leafletPolygon.on('click', async e => {
                        if (prevCity != null) {
                            map.addLayer(prevCity.leafletPolygon)
                            prevCity.leafletPolygon.setStyle({fillColor: 'blue', weight: 1})
                            prevCity.towns.forEach( town => {
                                town.leafletPolygon.remove()
                            })
                        }
                        map.fitBounds(e.target._bounds)
                        await getTowns(city)
                        map.removeLayer(city.leafletPolygon)
                        console.log(prevCity)
                        prevCity = city
                    })
                })
            }
        })
    })

    function citiesHandle () {
        
    }
    

    async function getTowns(city) {
        $.ajax({
            type:'GET',
            url: "/city/" + city._id + "/town/all",
            success: function (towns) {
                towns.forEach(town => {
                    town.leafletPolygon = L.polygon(town.geolocation.polygons).addTo(map)
                    town.leafletPolygon.setStyle({fillColor: 'green', weight: 1})
                    town.leafletPolygon.on('mouseover', e => { e.target.setStyle({fillColor: 'red'}) })
                    town.leafletPolygon.on('mouseout', e => { e.target.setStyle({fillColor: 'green'}) })
                    town.leafletPolygon.on('click', e => { 
                        map.fitBounds(e.target._bounds)
                    })
                })
                city.towns = towns
            }
        })

        
    }

    $.getJSON("test.geojson",function(data){
        
        // add GeoJSON layer to the map once the file is loaded
        L.geoJson(data).addTo(map);
    });

    





      

});

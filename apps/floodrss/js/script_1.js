let map;
const iowaCoords = { lat: 42.0, lng: -93.6 };
let zoom = 8;

// Function to reinitialize map if it's been destroyed
function reinitializeMap() {
    const mapDiv = document.getElementById('map');
    if (mapDiv && !map) {
        initMap();
    }
}


let currentLayer = null;

let currentSocioLayer = null;
let currentSocioLegend = null;
let currentPhysicalLayer = null;
let currentLegend = null;
let combinedLayer = null;

function handlePhysicalCheckboxChange(currentCheckbox, layerFunction, legendId, boundary) {
    // Hide the current physical layer if it exists
    if (currentPhysicalLayer) {
        currentPhysicalLayer.setMap(null);
    }

    // Hide the current socio-economic layer if it exists
    if (currentSocioLayer) {
        currentSocioLayer.setMap(null);
    }

    // Hide the current legend if it exists
    if (currentLegend) {
        document.getElementById(currentLegend).style.display = 'none';
    }

    // Uncheck all other checkboxes under the physical indicators
    const checkboxes = document.querySelectorAll('#additional-checkboxes input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        if (checkbox !== currentCheckbox) {
            checkbox.checked = false;
        }
    });

    // Check if the current checkbox is selected
    if (currentCheckbox.checked) {
        // Create and display the layer using the provided layer function
        currentPhysicalLayer = layerFunction(boundary);

        // Show the corresponding legend
        currentLegend = legendId;
        document.getElementById(legendId).style.display = 'block';

        // Zoom and center map to the boundary of the selected layer
        const centerLat = (boundary.north + boundary.south) / 2;
        const centerLng = (boundary.east + boundary.west) / 2;
        map.setCenter({ lat: centerLat, lng: centerLng });
        map.setZoom(12); // Adjust zoom level as needed
    } else {
        // If the checkbox is unchecked, clear the current layer and legend
        currentPhysicalLayer = null;
        currentLegend = null;
    }
}


function toggleLayer(imageUrl, boundary) {
    const layer = new google.maps.GroundOverlay(imageUrl, boundary);
    layer.setMap(map);
    return layer;
}

// function toggle_combinedLayer() {
//     const boundary = {
//         north: 42.1811079,
//         south: 41.8435635,
//         east: -91.3491833,
//         west: -91.9754965,
//     };
    
//     const checked = document.getElementById("combinedLayer").checked;
//     if (checked) {
//         combinedLayer = new google.maps.Data();
//         combinedLayer.loadGeoJson("cedarRapids2.json");

//         combinedLayer.setStyle(function (feature) {
//             return {
//                 fillColor: "white",
//                 opacity: 0,
//                 zIndex: 90,
//             };
//         });

//         combinedLayer.setMap(map);
//     } else if (combinedLayer) {
//         combinedLayer.setMap(null);
//     }
// }

// Make initMap available globally for Google Maps API callback
window.initMap = function initMap() {
    const iowaCoords = { lat: 42.0, lng: -93.6 };
    map = new google.maps.Map(document.getElementById("map"), {
        center: iowaCoords,
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        streetViewControl: true,
        fullscreenControl: true,
        fullscreenControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
        },
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
        },
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DEFAULT,
            position: google.maps.ControlPosition.LEFT_BOTTOM
        }
    });

    const overlayLayer = new google.maps.Data();
    overlayLayer.loadGeoJson("data/iowa_overlay.geojson");
    overlayLayer.setStyle(() => ({ strokeWeight: 0 }));
    overlayLayer.setMap(map);
}


document.addEventListener('DOMContentLoaded', () => {
    const boundary = {
        north: 42.1811079,
        south: 41.8435635,
        east: -91.3491833,
        west: -91.9754965,
    };

    document.getElementById('riverdistImageToggle').addEventListener('change', function () {
        handlePhysicalCheckboxChange(this, () => toggleLayer("images/maps/riverdist2.png", boundary), 'legend_con_riverdistImage', boundary);
    });

    document.getElementById('lulcImageToggle').addEventListener('change', function () {
        handlePhysicalCheckboxChange(this, () => toggleLayer("images/maps/lulc2.png", boundary), 'legend_con_lulcImageToggle', boundary);
    });

    document.getElementById('soilImageToggle').addEventListener('change', function () {
        handlePhysicalCheckboxChange(this, () => toggleLayer("images/maps/soil2.png", boundary), 'legend_con_soilImageToggle', boundary);
    });

    document.getElementById('demLayer').addEventListener('change', function () {
        handlePhysicalCheckboxChange(this, () => toggleLayer("images/maps/dem2.png", boundary), 'legend_con_dem', boundary);
    });

    document.getElementById('slopeImageToggle').addEventListener('change', function () {
        handlePhysicalCheckboxChange(this, () => toggleLayer("images/maps/slope2.png", boundary), 'legend_con_slopeImageToggle', boundary);
    });
});


function handleSocioCheckboxChange(currentCheckbox, layerFunction, legendId) {
    const checkboxes = document.querySelectorAll('#socio-economic-checkboxes input[type="checkbox"]');

    // Remove the current socio-economic layer if there is one
    if (currentSocioLayer) {
        currentSocioLayer.setMap(null);  // Remove the previous layer
    }

    if(currentPhysicalLayer)
    {
        currentPhysicalLayer.setMap(null);
    }

    // Hide the current legend if there is one
    if (currentSocioLegend) {
        document.getElementById(currentSocioLegend).style.display = 'none';  // Hide the previous legend
    }

    // Uncheck all other checkboxes
    checkboxes.forEach(checkbox => {
        if (checkbox !== currentCheckbox) {
            checkbox.checked = false;
        }
    });

    // Call the layer function to display the new layer and show the corresponding legend
    if (currentCheckbox.checked) {
        currentSocioLayer = layerFunction();  // Set the new layer
        currentSocioLegend = legendId;  // Set the new legend ID
        document.getElementById(legendId).style.display = 'block';  // Show the new legend
    } else {
        currentSocioLayer = null;  // No layer active
        currentSocioLegend = null;  // No legend active
    }
}


function toggleGeoJsonLayer(jsonUrl) {
    const layer = new google.maps.Data();
    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            layer.addGeoJson(data);
        });
    layer.setMap(map);
    return layer;
}

function toggleImageLayer(imageUrl, boundary) {
    const layer = new google.maps.GroundOverlay(imageUrl, boundary);
    layer.setMap(map);
    return layer;
}

document.addEventListener('DOMContentLoaded', () => {
    const boundary = {
        north: 42.1811079,
        south: 41.8435635,
        east: -91.3491833,
        west: -91.9754965,
    };

    document.getElementById('populationLayer').addEventListener('change', function () {
        if (this.checked) {
            toggle_populationLayer();
            document.getElementById('legend_con_population').style.display = 'block';
        } else {
            if (layer) layer.setMap(null);
            document.getElementById('legend_con_population').style.display = 'none';
        }
    });

    document.getElementById('incomeLayer').addEventListener('change', function () {
        if (this.checked) {
            toggle_incomeLayer();
            document.getElementById('legend_con_income').style.display = 'block';
        } else {
            if (layer) layer.setMap(null);
            document.getElementById('legend_con_income').style.display = 'none';
        }
    });

    document.getElementById('roadLayer').addEventListener('change', function () {
        if (this.checked) {
            toggle_roadLayer();
            document.getElementById('legend_con_road').style.display = 'block';
        } else {
            if (roadImageOverlay) roadImageOverlay.setMap(null);
            document.getElementById('legend_con_road').style.display = 'none';
        }
    });

    document.getElementById('childAgedLayer').addEventListener('change', function () {
        if (this.checked) {
            toggle_childAgedLayer();
            document.getElementById('legend_con_childAged').style.display = 'block';
        } else {
            if (layer) layer.setMap(null);
            document.getElementById('legend_con_childAged').style.display = 'none';
        }
    });

    document.getElementById('renterLayer').addEventListener('change', function () {
        if (this.checked) {
            toggle_renterLayer();
            document.getElementById('legend_con_renter').style.display = 'block';
        } else {
            if (layer) layer.setMap(null);
            document.getElementById('legend_con_renter').style.display = 'none';
        }
    });
});




// function initMap() {
//     map = new google.maps.Map(document.getElementById("map"), {
//         center: iowaCoords,
//         zoom: zoom,
//         mapTypeId: google.maps.MapTypeId.SATELLITE,
//         streetViewControl: false,
//         fullscreenControl: false,
//         mapTypeControl: true,
//         mapTypeControlOptions: {
//             style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
//             position: google.maps.ControlPosition.BOTTOM_LEFT,
//         },
//     });

//     var overlayLayer = new google.maps.Data();
//     overlayLayer.loadGeoJson("data/iowa_overlay.geojson");
//     overlayLayer.setStyle(function (feature) {
//         return {
//             strokeWeight: 0,
//         };
//     });
//     overlayLayer.setMap(map);
//     //loadArcGISLinkScript();
// }

// Function to toggle the display of child checkboxes based on the parent checkbox
function togglePhysicalIndicators() {
    var physicalCheckbox = document.getElementById('physicalIndicatorsToggle');
    var childCheckboxes = document.querySelectorAll('#ltw-drought-info-items input[type="checkbox"]');
    childCheckboxes.forEach(function (checkbox) {
        checkbox.disabled = !physicalCheckbox.checked;
        checkbox.checked = false;
    });
}

//place holder for ArcGIS function

/*function loadArcGISLinkScript() {
  var script = document.createElement("script");
  script.src = "arcgislink.js"; // Replace 'path/to/arcgislink.js' with the actual path to your arcgislink.js file
  document.head.appendChild(script);
}*/

// DEM example toggle
var demImageOverlay;  // Global variable for the dem image overlay

function toggle_demlayer() {
    var checkbox = document.getElementById('demLayer'); // Get the checkbox element
    // Define the boundaries for the overlay
    var boundary = {
        north: 42.1811079,
        south: 41.8435635,
        east: -91.3491833,
        west: -91.9754965
    };

    if (checkbox.checked) {
        // If the checkbox is checked, create and display the overlay
        var demImage = "images/maps/dem2.png";  // URL to the image you want to overlay
        demImageOverlay = new google.maps.GroundOverlay(demImage, boundary);
        demImageOverlay.setMap(map);

        // Zoom and center map to the boundaries of the river distanceLayer
        var centerLat = (boundary.north + boundary.south) / 2;
        var centerLng = (boundary.east + boundary.west) / 2;
        map.setCenter({ lat: centerLat, lng: centerLng });
        map.setZoom(12);  // Adjust zoom level as needed
    } else {
        // If the checkbox is unchecked, remove the overlay from the map
        if (demImageOverlay) {
            demImageOverlay.setMap(null);
            // Optional: Reset the map view when unchecked
            map.setCenter(iowaCoords);  // Reset to original center
            map.setZoom(zoom);  // Reset to original zoom level
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var demImageLayerCheckbox = document.getElementById('demLayer');
    if (demImageLayerCheckbox) {
        demImageLayerCheckbox.addEventListener('change', function () {
            var legend = document.getElementById('legend_con_dem');
            if (this.checked) {
                legend.style.display = 'block'; // Show the legend
            } else {
                legend.style.display = 'none'; // Hide the legend
            }
        });
    }
});


// River distance  toggle
var riverdistImageOverlay;  // Global variable for the slope image overlay

function toggleriverdistImage() {
    var checkbox = document.getElementById('riverdistImageToggle'); // Get the checkbox element
    // Define the boundaries for the overlay
    var boundary = {
        north: 42.1811079,
        south: 41.8435635,
        east: -91.3491833,
        west: -91.9754965
    };

    if (checkbox.checked) {
        // If the checkbox is checked, create and display the overlay
        var riverdistImage = "images/maps/riverdist2.png";  // URL to the image you want to overlay
        riverdistImageOverlay = new google.maps.GroundOverlay(riverdistImage, boundary);
        riverdistImageOverlay.setMap(map);

        // Zoom and center map to the boundaries of the river distanceLayer
        var centerLat = (boundary.north + boundary.south) / 2;
        var centerLng = (boundary.east + boundary.west) / 2;
        map.setCenter({ lat: centerLat, lng: centerLng });
        map.setZoom(12);  // Adjust zoom level as needed
    } else {
        // If the checkbox is unchecked, remove the overlay from the map
        if (riverdistImageOverlay) {
            riverdistImageOverlay.setMap(null);
            // Optional: Reset the map view when unchecked
            map.setCenter(iowaCoords);  // Reset to original center
            map.setZoom(zoom);  // Reset to original zoom level
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var riverdistImageLayerCheckbox = document.getElementById('riverdistImageToggle');
    if (riverdistImageLayerCheckbox) {
        riverdistImageLayerCheckbox.addEventListener('change', function () {
            var legend = document.getElementById('legend_con_riverdistImage');
            if (this.checked) {
                legend.style.display = 'block'; // Show the legend
            } else {
                legend.style.display = 'none'; // Hide the legend
            }
        });
    }
});


// LULC image toggle
var lulcImageOverlay;  // Global variable for the slope image overlay

function togglelulcImage() {
    var checkbox = document.getElementById('lulcImageToggle'); // Get the checkbox element
    // Define the boundaries for the overlay
    var boundary = {
        north: 42.1811079,
        south: 41.8435635,
        east: -91.3491833,
        west: -91.9754965
    };

    if (checkbox.checked) {
        // If the checkbox is checked, create and display the overlay
        var lulcImage = "images/maps/lulc2.png";  // URL to the image you want to overlay
        lulcImageOverlay = new google.maps.GroundOverlay(lulcImage, boundary);
        lulcImageOverlay.setMap(map);

        // Zoom and center map to the boundaries of the lulc Layer
        var centerLat = (boundary.north + boundary.south) / 2;
        var centerLng = (boundary.east + boundary.west) / 2;
        map.setCenter({ lat: centerLat, lng: centerLng });
        map.setZoom(12);  // Adjust zoom level as needed
    } else {
        // If the checkbox is unchecked, remove the overlay from the map
        if (lulcImageOverlay) {
            lulcImageOverlay.setMap(null);
            // Optional: Reset the map view when unchecked
            map.setCenter(iowaCoords);  // Reset to original center
            map.setZoom(zoom);  // Reset to original zoom level
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var lulcImageToggleCheckbox = document.getElementById('lulcImageToggle');
    if (lulcImageToggleCheckbox) {
        lulcImageToggleCheckbox.addEventListener('change', function () {
            var legend = document.getElementById('legend_con_lulcImageToggle');
            if (this.checked) {
                legend.style.display = 'block'; // Show the legend
            } else {
                legend.style.display = 'none'; // Hide the legend
            }
        });
    }
});

// Soil Type Image toggle
var soilImageOverlay;  // Global variable for the slope image overlay

function togglesoilImage() {
    var checkbox = document.getElementById('soilImageToggle'); // Get the checkbox element
    // Define the boundaries for the overlay
    var boundary = {
        north: 42.1811079,
        south: 41.8435635,
        east: -91.3491833,
        west: -91.9754965
    };

    if (checkbox.checked) {
        // If the checkbox is checked, create and display the overlay
        var soilImage = "images/maps/soil2.png";  // URL to the image you want to overlay
        soilImageOverlay = new google.maps.GroundOverlay(soilImage, boundary);
        soilImageOverlay.setMap(map);

        // Zoom and center map to the boundaries of the soil Layer
        var centerLat = (boundary.north + boundary.south) / 2;
        var centerLng = (boundary.east + boundary.west) / 2;
        map.setCenter({ lat: centerLat, lng: centerLng });
        map.setZoom(12);  // Adjust zoom level as needed
    } else {
        // If the checkbox is unchecked, remove the overlay from the map
        if (soilImageOverlay) {
            soilImageOverlay.setMap(null);
            // Optional: Reset the map view when unchecked
            map.setCenter(iowaCoords);  // Reset to original center
            map.setZoom(zoom);  // Reset to original zoom level
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var soilImageToggleCheckbox = document.getElementById('soilImageToggle');
    if (soilImageToggleCheckbox) {
        soilImageToggleCheckbox.addEventListener('change', function () {
            var legend = document.getElementById('legend_con_soilImageToggle');
            if (this.checked) {
                legend.style.display = 'block'; // Show the legend
            } else {
                legend.style.display = 'none'; // Hide the legend
            }
        });
    }
});

// Slope image toggle
var slopeImageOverlay;  // Global variable for the slope image overlay

function toggleSlopeImage() {
    var checkbox = document.getElementById('slopeImageToggle'); // Get the checkbox element
    // Define the boundaries for the overlay
    var boundary = {
        north: 42.099134,
        south: 41.901045,
        east: -91.784894,
        west: -91.566917
    };



    if (checkbox.checked) {
        // If the checkbox is checked, create and display the overlay
        var slopeImage = "images/maps/slope2.png";  // URL to the image you want to overlay
        slopeImageOverlay = new google.maps.GroundOverlay(slopeImage, boundary);
        slopeImageOverlay.setMap(map);

        // Zoom and center map to the boundaries of the slope Layer
        var centerLat = (boundary.north + boundary.south) / 2;
        var centerLng = (boundary.east + boundary.west) / 2;
        map.setCenter({ lat: centerLat, lng: centerLng });
        map.setZoom(12);  // Adjust zoom level as needed
    } else {
        // If the checkbox is unchecked, remove the overlay from the map
        if (slopeImageOverlay) {
            slopeImageOverlay.setMap(null);
            // Optional: Reset the map view when unchecked
            map.setCenter(iowaCoords);  // Reset to original center
            map.setZoom(zoom);  // Reset to original zoom level
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var slopeImageToggleCheckbox = document.getElementById('slopeImageToggle');
    if (slopeImageToggleCheckbox) {
        slopeImageToggleCheckbox.addEventListener('change', function () {
            var legend = document.getElementById('legend_con_slopeImageToggle');
            if (this.checked) {
                legend.style.display = 'block'; // Show the legend
            } else {
                legend.style.display = 'none'; // Hide the legend
            }
        });
    }
});

let layer = null;
// GeoJSON Example
//for population Layer
function toggle_populationLayer() {
    roadImageOverlay ? roadImageOverlay.setMap(null):null;
    layer ? layer.setMap(null) : null;
    var checked = document.getElementById("populationLayer").checked;
    if (checked) {
        layer = new google.maps.Data();
        layer.loadGeoJson("data/cedarRapids2.json");
        layer.setStyle(function (feature) {
            return {
                fillColor: "white",
                opacity: 0.9,
                zIndex: 99,
            };
        });
        layer.setMap(map);

        // Zoom and center map to a specific area when checkbox is checked
        map.setCenter({ lat: 41.98942313295139, lng: -91.67085975719746 });  // Update these coordinates to your target
        map.setZoom(12);  // Adjust zoom level as needed

    } else {
        layer.setMap(null);


    }

    layer.setStyle(function (feature) {
        var population = feature.getProperty('popden_sqk');
        var color;

        if (population > 3740) {
            color = '#993404'; // dark red
        } else if (population > 2317 && population <= 3740) {
            color = '#d95f0e'; // red
        } else if (population > 1616 && population <= 2317) {
            color = '#fe9929'; // light red
        } else if (population > 1054 && population <= 1616) {
            color = '#fed98e'; // very light red
        } else {
            color = '#ffffd4'; // same as light red to represent the light green in the example, adjust as needed
        }

        return {
            fillColor: color,
            fillOpacity: 0.9,
            strokeWeight: 0.2
        };
    });

}

document.addEventListener('DOMContentLoaded', function () {
    var populationLayerCheckbox = document.getElementById('populationLayer');
    if (populationLayerCheckbox) {
        populationLayerCheckbox.addEventListener('change', function () {
            var legend = document.getElementById('legend_con_population');
            if (this.checked) {
                legend.style.display = 'block'; // Show the legend
            } else {
                legend.style.display = 'none'; // Hide the legend
            }
        });
    }
});

//for income Layer
function toggle_incomeLayer() {
    layer.setMap(null);
    roadImageOverlay ? roadImageOverlay.setMap(null):null;
    var checked = document.getElementById("incomeLayer").checked;
    if (checked) {
        layer = new google.maps.Data();
        layer.loadGeoJson("data/cedarRapids2.json");
        layer.setStyle(function (feature) {
            return {
                fillColor: "white",
                opacity: 0,
                zIndex: 90,
            };
        });
        layer.setMap(map);

        // Zoom and center map to a specific area when checkbox is checked
        map.setCenter({ lat: 41.98942313295139, lng: -91.67085975719746 });  // Update these coordinates to your target
        map.setZoom(12);  // Adjust zoom level as needed

    } else {
        layer.setMap(null);

    }

    layer.setStyle(function (feature) {
        var income = feature.getProperty('medinc') || feature.getProperty('medInc');
        var color;

        if (income > 127689) {
            color = '#4b0082'; // dark purple
        } else if (income > 87701 && income <= 127689) {
            color = '#800080'; // purple
        } else if (income > 65238 && income <= 87701) {
            color = '#9370db'; // medium purple
        } else if (income > 45688 && income <= 65238) {
            color = '#b0c4de'; // light steel blue
        } else {
            color = '#add8e6'; // light blue
        }

        return {
            fillColor: color,
            fillOpacity: 0.8,
            strokeWeight: 0.2
        };
    });

}

document.addEventListener('DOMContentLoaded', function () {
    var incomeLayerCheckbox = document.getElementById('incomeLayer');
    if (incomeLayerCheckbox) {
        incomeLayerCheckbox.addEventListener('change', function () {
            var legend = document.getElementById('legend_con_income');
            if (this.checked) {
                legend.style.display = 'block'; // Show the legend
            } else {
                legend.style.display = 'none'; // Hide the legend
            }
        });
    }
});

let roadImageOverlay = null;

// Road Density image toggle
function toggle_roadLayer() {
    layer.setMap(null);
    var checkbox = document.getElementById('roadLayer'); // Get the checkbox element
    // Define the boundaries for the overlay
    var boundary = {
        north: 42.1811079,
        south: 41.8435635,
        east: -91.3491833,
        west: -91.9754965
    };

    if (checkbox.checked) {
        // If the checkbox is checked, create and display the overlay
        var roadLayer = "images/maps/road2.png";  // URL to the image you want to overlay
        roadImageOverlay = new google.maps.GroundOverlay(roadLayer, boundary);
        roadImageOverlay.setMap(map);

        // Zoom and center map to the boundaries of the roadLayer
        var centerLat = (boundary.north + boundary.south) / 2;
        var centerLng = (boundary.east + boundary.west) / 2;
        map.setCenter({ lat: centerLat, lng: centerLng });
        map.setZoom(12);  // Adjust zoom level as needed
    } else {
        // If the checkbox is unchecked, remove the overlay from the map
        if (roadImageOverlay) {
            roadImageOverlay.setMap(null);
            // // Optional: Reset the map view when unchecked
            // map.setCenter(iowaCoords);  // Reset to original center
            // map.setZoom(zoom);  // Reset to original zoom level
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var roadLayerCheckbox = document.getElementById('roadLayer');
    if (roadLayerCheckbox) {
        roadLayerCheckbox.addEventListener('change', function () {
            var legend = document.getElementById('legend_con_road');
            if (this.checked) {
                legend.style.display = 'block'; // Show the legend
            } else {
                legend.style.display = 'none'; // Hide the legend
            }
        });
    }
});

//for % Child (<5 yrs) and Aged (>65 yrs) population' Layer
function toggle_childAgedLayer() {
    layer.setMap(null);
    roadImageOverlay ? roadImageOverlay.setMap(null):null;
    var checked = document.getElementById("childAgedLayer").checked;
    if (checked) {
        layer = new google.maps.Data();
        layer.loadGeoJson("data/cedarRapids2.json");
        layer.setStyle(function (feature) {
            return {
                fillColor: "white",
                opacity: 0,
                zIndex: 90,
            };
        });
        layer.setMap(map);

        // Zoom and center map to a specific area when checkbox is checked
        map.setCenter({ lat: 41.98942313295139, lng: -91.67085975719746 });  // Update these coordinates to your target
        map.setZoom(12);  // Adjust zoom level as needed

    } else {
        layer.setMap(null);

    }

    layer.setStyle(function (feature) {
        var childAgedLayer = parseFloat(feature.getProperty('pecb5a65') || feature.getProperty('pecB5A65') || 0);
        var color;

        if (childAgedLayer >= 51.65) {
            color = '#a50f15';
        } else if (childAgedLayer > 33.46 && childAgedLayer <= 51.65) {
            color = '#de2d26';
        } else if (childAgedLayer > 23.89 && childAgedLayer <= 33.46) {
            color = '#fb6a4a';
        } else if (childAgedLayer > 15.28 && childAgedLayer <= 23.89) {
            color = '#fcae91';
        } else {
            color = '#fee5d9';
        }

        return {
            fillColor: color,
            fillOpacity: 0.9,
            strokeWeight: 0.2
        };
    });

}

document.addEventListener('DOMContentLoaded', function () {
    var childAgedCheckbox = document.getElementById('childAgedLayer');
    if (childAgedCheckbox) {
        childAgedCheckbox.addEventListener('change', function () {
            var legend = document.getElementById('legend_con_childAged');
            if (this.checked) {
                legend.style.display = 'block'; // Show the legend
            } else {
                legend.style.display = 'none'; // Hide the legend
            }
        });
    }
});

//for % Renters' Layer
function toggle_renterLayer() {
    layer.setMap(null);
    roadImageOverlay ? roadImageOverlay.setMap(null):null;
    var checked = document.getElementById("renterLayer").checked;
    if (checked) {
        layer = new google.maps.Data();
        layer.loadGeoJson("data/cedarRapids2.json");
        layer.setStyle(function (feature) {
            return {
                fillColor: "white",
                opacity: 0,
                zIndex: 90,
            };
        });
        layer.setMap(map);

        // Zoom and center map to a specific area when checkbox is checked
        map.setCenter({ lat: 41.98942313295139, lng: -91.67085975719746 });  // Update these coordinates to your target
        map.setZoom(12);  // Adjust zoom level as needed

    } else {
        layer.setMap(null);

    }

    layer.setStyle(function (feature) {
        var renter = parseFloat(feature.getProperty('renters') || 0);
        var color;

        if (renter >= 69.3) {
            color = '#b30000';
        } else if (renter > 46.46 && renter <= 69.2) {
            color = '#e34a33';
        } else if (renter > 30.02 && renter <= 46.46) {
            color = '#fc8d59';
        } else if (renter > 12.82 && renter <= 30.02) {
            color = '#fdcc8a';
        } else {
            color = '#fef0d9';
        }

        return {
            fillColor: color,
            fillOpacity: 0.9,
            strokeWeight: 0.2
        };
    });

}

document.addEventListener('DOMContentLoaded', function () {
    var renterCheckbox = document.getElementById('renterLayer');
    if (renterCheckbox) {
        renterCheckbox.addEventListener('change', function () {
            var legend = document.getElementById('legend_con_renter');
            if (this.checked) {
                legend.style.display = 'block'; // Show the legend
            } else {
                legend.style.display = 'none'; // Hide the legend
            }
        });
    }
});


// Global variables to track the current active layer and legend
let currentVulnerabilityLayer = null;
let currentVulnerabilityLegend = null;

// Function to handle toggling layers and legends
function toggleVulnerabilityLayer(layerType, geoJsonFile, legendId) {
    // Clear the current active layer if it exists
    if (currentVulnerabilityLayer) {
        currentVulnerabilityLayer.setMap(null);
        currentVulnerabilityLayer = null; // Reset the layer
    }

    // Hide the current legend if it exists
    if (currentVulnerabilityLegend) {
        document.getElementById(currentVulnerabilityLegend).style.display = 'none';
        currentVulnerabilityLegend = null; // Reset the legend
    }

    // If a new layer type is being selected
    if (layerType) {
        // Create a new layer
        const newLayer = new google.maps.Data();
        newLayer.loadGeoJson(geoJsonFile);

        // Apply styles based on the selected layer type
        newLayer.setStyle(function (feature) {
            let value, color;

            if (layerType === "physical") {
                value = feature.getProperty('physical_c');
                if (value > 2.7) color = '#3F007D';
                else if (value > 2.3) color = '#6A51A3';
                else if (value > 2.1) color = '#9E9AC8';
                else if (value > 1.7) color = '#DADAEB';
                else color = '#FCFBFD';
            } else if (layerType === "social") {
                value = feature.getProperty('social_com');
                if (value > 2.7) color = '#3F007D';
                else if (value > 2.3) color = '#6A51A3';
                else if (value > 2.1) color = '#9E9AC8';
                else if (value > 1.7) color = '#DADAEB';
                else color = '#FCFBFD';
            } else if (layerType === "combined") {
                value = feature.getProperty('both_ind_1');
                if (value > 2.7) color = '#3F007D';
                else if (value > 2.3) color = '#6A51A3';
                else if (value > 2.1) color = '#9E9AC8';
                else if (value > 1.7) color = '#DADAEB';
                else color = '#FCFBFD';
            }
            
            return {
                fillColor: color,
                fillOpacity: 0.9,
                strokeColor: "#000000",
                strokeWeight: 0.2, // make border thinner
                strokeOpacity: 0.7,
            };
        });

        // Set the new layer on the map
        newLayer.setMap(map);

        // Update the active layer and legend
        currentVulnerabilityLayer = newLayer;
        currentVulnerabilityLegend = legendId;

        // Show the corresponding legend
        document.getElementById(legendId).style.display = 'block';

        // Center and zoom the map to focus on the relevant area
        map.setCenter({ lat: 41.98942313295139, lng: -91.67085975719746 });
        map.setZoom(12); // Adjust zoom level as needed
    }
}

// Function to reset all checkboxes when a new layer is selected
function resetCheckboxes(exceptId) {
    const checkboxes = document.querySelectorAll('#vulnerability-maps input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        if (checkbox.id !== exceptId) {
            checkbox.checked = false;
        }
    });
}

// Add event listeners for each vulnerability map checkbox
document.addEventListener('DOMContentLoaded', function () {
    // Physical Layer
    const physicalCheckbox = document.getElementById('physicalLayer');
    if (physicalCheckbox) {
        physicalCheckbox.addEventListener('change', function () {
            resetCheckboxes('physicalLayer'); // Reset other checkboxes
            toggleVulnerabilityLayer(
                this.checked ? "physical" : null, // Layer type
                "data/cedarRapids2.json", // GeoJSON file
                "legend_con_physicalLayer" // Legend ID
            );
        });
    }

    // Social Layer
    const socialCheckbox = document.getElementById('socialLayer');
    if (socialCheckbox) {
        socialCheckbox.addEventListener('change', function () {
            resetCheckboxes('socialLayer'); // Reset other checkboxes
            toggleVulnerabilityLayer(
                this.checked ? "social" : null, // Layer type
                "data/cedarRapids2.json", // GeoJSON file
                "legend_con_socialLayer" // Legend ID
            );
        });
    }

    // Combined Layer
    const combinedCheckbox = document.getElementById('combinedLayer');
    if (combinedCheckbox) {
        combinedCheckbox.addEventListener('change', function () {
            resetCheckboxes('combinedLayer'); // Reset other checkboxes
            toggleVulnerabilityLayer(
                this.checked ? "combined" : null, // Layer type
                "data/cedarRapids2.json", // GeoJSON file
                "legend_con_combinedLayer" // Legend ID
            );
        });
    }
});

// function initMap() {
//     // Initialize the map
//     const iowaCoords = { lat: 42.0, lng: -93.6 };
//     map = new google.maps.Map(document.getElementById("map"), {
//         center: iowaCoords,
//         zoom: 8,
//         mapTypeId: google.maps.MapTypeId.SATELLITE,
//     });
// }








function handleCheckboxChange(current) {
    var checkboxes = document.querySelectorAll('input[name="weightOption"]');
    checkboxes.forEach(function (checkbox) {
        if (checkbox !== current) {
            checkbox.checked = false;
        }
    });

    // Hide all content sections initially
    var contents = document.querySelectorAll('.slider-container > div');
    contents.forEach(function (content) {
        content.style.display = 'none';
    });

    // Handle the display of the popup based on the checked checkbox
    var popup = document.getElementById('sliderPopup');
    if (document.getElementById('CustomizedPhysical').checked) {
        popup.style.display = 'block';
        document.getElementById('contentPhysical').style.display = 'block';
    } else if (document.getElementById('CustomizedSocial').checked) {
        popup.style.display = 'block';
        document.getElementById('contentSocial').style.display = 'block';
    } else if (document.getElementById('CustomizedCombined').checked) {
        popup.style.display = 'block';
        document.getElementById('contentCombined').style.display = 'block';
    } else {
        popup.style.display = 'none';
    }
}



document.addEventListener('DOMContentLoaded', function() {
    var mainPhysicalIndicators = document.getElementById('main-physical-indicators');
    mainPhysicalIndicators.addEventListener('change', function() {
        const additionalCheckboxes = document.getElementById('additional-checkboxes');
        if (this.checked) {
            additionalCheckboxes.classList.add('expanded');
            additionalCheckboxes.classList.remove('hidden');
        } else {
            additionalCheckboxes.classList.remove('expanded');
            additionalCheckboxes.classList.add('hidden');
        }
    });

    var mainSocioEconomic = document.getElementById('main-socio-economic');
    mainSocioEconomic.addEventListener('change', function() {
        const socioEconomicCheckboxes = document.getElementById('socio-economic-checkboxes');
        if (this.checked) {
            socioEconomicCheckboxes.classList.add('expanded');
            socioEconomicCheckboxes.classList.remove('hidden');
        } else {
            socioEconomicCheckboxes.classList.remove('expanded');
            socioEconomicCheckboxes.classList.add('hidden');
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const calculateButton = document.getElementById('calculate-button');
    if (calculateButton) {
        calculateButton.addEventListener('click', calculateResult);
    }
});


// function toggle_combinedLayer() {
//     const checkbox = document.getElementById('combinedLayer');
//     if (checkbox.checked) {
//         combinedLayer = new google.maps.Data(); // Initialize it as a Google Maps Data Layer
//         combinedLayer.loadGeoJson("combined_geojson.json"); // Load GeoJSON data
//         combinedLayer.setMap(map); // Set it on the map

//         // Add additional style settings here...
//     } else if (combinedLayer) {
//         combinedLayer.setMap(null); // Remove the layer from the map if unchecked
//     }
// }



// Function to get slider values
function getSliderValue(sliderId) {
    return parseFloat(document.getElementById(sliderId).value);
}
function updateSliderValue(sliderNum) {
    const sliderElement = document.getElementById('slider' + sliderNum);
    const sliderValue = sliderElement.value;
    document.getElementById('sliderValue' + sliderNum).textContent = sliderValue;

    console.log(`Slider ${sliderNum} updated to: ${sliderValue}`); // Add this for debugging
}

document.addEventListener('DOMContentLoaded', function() {
    for (let i = 1; i <= 10; i++) { // Assuming you have 10 sliders
        const sliderElement = document.getElementById('slider' + i);
        if (sliderElement) {
            sliderElement.addEventListener('input', function() {
                updateSliderValue(i);
            });
        }
    }
});



document.addEventListener('DOMContentLoaded', function() {
    const calculateButton = document.getElementById('calculate-button');
    if (calculateButton) {
        calculateButton.addEventListener('click', function() {
            calculateResult();
        });
    } else {
        console.error('Error: calculate-button not found in the DOM.');
    }
});



function calculateResult() {
    console.log("Calculating result...");
    if (document.getElementById('CustomizedPhysical').checked) {
        calculatePhysicalResult();
    } else if (document.getElementById('CustomizedSocial').checked) {
        calculateSocialResult();
    } else if (document.getElementById('CustomizedCombined').checked) {
        calculateCombinedResult();
    }
}





function calculatePhysicalResult() {
    map.data.forEach(function(feature) {
        map.data.remove(feature); // Clear previous GeoJSON data
    });

    // Get slider values
    const demWeight = getSliderValue('slider1');
    const slopeWeight = getSliderValue('slider2');
    const soilWeight = getSliderValue('slider3');
    const lulcWeight = getSliderValue('slider4');
    const riverDistWeight = getSliderValue('slider5');

    fetch('data/cedarRapids2.json')
        .then(response => response.json())
        .then(data => {
            //map.data.addGeoJson(data);
            // Create a new separate layer for Integrated Map
const combinedLayer = new google.maps.Data();

// Add your data to this new layer
combinedLayer.addGeoJson(data);

// Style it
combinedLayer.setStyle({
    fillColor: '#fb6a4a',       // you can keep your color logic if you have one
    fillOpacity: 0.9,
    strokeColor: '#000000',
    strokeOpacity: 0.7,
    strokeWeight: 0.4           // ✅ thin border
});

// Remove old integrated layer if any
if (window.combinedLayer && typeof window.combinedLayer.setMap === 'function') {
    window.combinedLayer.setMap(null);
}
window.combinedLayer = combinedLayer;

// Show it on the map
combinedLayer.setMap(map);


            map.data.setStyle(function(feature) {
                const dem = feature.getProperty('dem_class');
                const slope = feature.getProperty('slope_clas');
                const soil = feature.getProperty('soil');
                const lulc = feature.getProperty('lulc');
                const riverdist = feature.getProperty('riverdist_');

                // Calculate the result using slider weights
                const result = (
                    dem * demWeight +
                    slope * slopeWeight +
                    soil * soilWeight +
                    lulc * lulcWeight +
                    riverdist * riverDistWeight
                ) / (demWeight + slopeWeight + soilWeight + lulcWeight + riverDistWeight);

                // Classify the result into color categories
                let color;
                if (result <= 1) {
                    color = '#fee5d9';
                } else if (result <= 1.7) {
                    color = '#fcae91';
                } else if (result <= 2.2) {
                    color = '#fb6a4a';
                } else if (result <= 2.8) {
                    color = '#de2d26';
                } else {
                    color = '#a50f15';
                }

                return {
                    fillColor: color,
                    strokeWeight: 0.2,
                    fillOpacity: 0.9,
                };
            });
        });
}









function calculateSocialResult() {
    map.data.forEach(function(feature) {
        map.data.remove(feature); // Clear previous GeoJSON data
    });

    // Get slider values
    const populationWeight = getSliderValue('slider6');
    const incomeWeight = getSliderValue('slider7');
    const roadWeight = getSliderValue('slider8');
    const childAgedWeight = getSliderValue('slider9');
    const renterWeight = getSliderValue('slider10');

    fetch('data/cedarRapids2.json')
        .then(response => response.json())
        .then(data => {
            map.data.addGeoJson(data);

            map.data.setStyle(function(feature) {
                const population = feature.getProperty('popden_cla');
                const income = feature.getProperty('medinc_cla');
                const road = feature.getProperty('road_class');
                const childAged = feature.getProperty('b5a65_clas');
                const renter = feature.getProperty('renter_cla');

                // Calculate the result using slider weights
                const result = (
                    population * populationWeight +
                    income * incomeWeight +
                    road * roadWeight +
                    childAged * childAgedWeight +
                    renter * renterWeight
                ) / (populationWeight + incomeWeight + roadWeight + childAgedWeight + renterWeight);

                // Classify the result into color categories
                let color;
                if (result <= 1) {
                    color = '#fee5d9';
                } else if (result <= 1.7) {
                    color = '#fcae91';
                } else if (result <= 2.2) {
                    color = '#fb6a4a';
                } else if (result <= 2.8) {
                    color = '#de2d26';
                } else {
                    color = '#a50f15';
                }

                return {
                    fillColor: color,
                    strokeWeight: 0.2,
                    fillOpacity: 0.9,
                };
            });
        });
}

function calculateCombinedResult() {
    console.log("Calculating combined result...");

    // Remove previous integrated layer if exists
    if (window.integratedLayer && typeof window.integratedLayer.setMap === 'function') {
        window.integratedLayer.setMap(null);
    }

    // Create a new, independent data layer
    const integratedLayer = new google.maps.Data();
    window.integratedLayer = integratedLayer; // keep a reference globally

    fetch('data/cedarRapids2.json')
        .then(response => response.json())
        .then(data => {
            integratedLayer.addGeoJson(data);

            integratedLayer.setStyle(function(feature) {
                // Extract values
                const dem = feature.getProperty('dem_class');
                const slope = feature.getProperty('slope_clas');
                const soil = feature.getProperty('soil');
                const lulc = feature.getProperty('lulc');
                const riverdist = feature.getProperty('riverdist_');
                const population = feature.getProperty('popden_cla');
                const income = feature.getProperty('medinc_cla');
                const road = feature.getProperty('road_class');
                const childAged = feature.getProperty('b5a65_clas');
                const renter = feature.getProperty('renter_cla');

                // Combine results
                const physicalResult = (riverdist + lulc + soil + dem + slope) / 5;
                const socialResult = (population + income + road + childAged + renter) / 5;
                const combinedResult = (physicalResult + socialResult) / 2;

                // Assign color
                let color;
                if (combinedResult <= 0.5) color = '#fee5d9';
                else if (combinedResult <= 1) color = '#fcae91';
                else if (combinedResult <= 2.5) color = '#fb6a4a';
                else if (combinedResult <= 3) color = '#de2d26';
                else color = '#a50f15';

                return {
                    fillColor: color,
                    fillOpacity: 0.9,
                    strokeColor: "#000000",
                    strokeWeight: 0.2,   // ✅ consistent thin border
                    strokeOpacity: 0.7,
                };
            });

            // Add the layer to the map
            integratedLayer.setMap(map);

            // Re-center
            map.setCenter({ lat: 41.98942313295139, lng: -91.67085975719746 });
            map.setZoom(12);
        })
        .catch(error => console.error("Error loading GeoJSON:", error));
}

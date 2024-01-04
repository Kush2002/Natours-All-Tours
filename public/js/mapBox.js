/* eslint-disable */

export const displayMap = (locations) => {

    mapboxgl.accessToken = 
    'pk.eyJ1IjoiYXJqdW4wMiIsImEiOiJjbHFuYjg5MDcydTluMmtubTdyOTJ5a3J0In0.0Ne5oLNT3izIqdsWUSbNYQ';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v11',
        scrollZoom: false
        // center:[-118.113491, 34.111745],
        // zoom:9,
        // interactive: false
    });

    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach(loc => {
        // Create Marker
        const el = document.createElement('div');
        el.className = 'marker';
        // Add Marker
        new mapboxgl.Marker({
            element: el,
            anchor:'bottom'
        })
            .setLngLat(loc.coordinates)
            .addTo(map);

        // Add POPUP
        new mapboxgl.Popup({
            offset:30
        })
        .setLngLat(loc.coordinates)
        .setHTML(`<p>${loc.description}</p>`)
        .addTo(map);

        // Extend Map Bounds to include current Location
        bounds.extend(loc.coordinates);
    });
    map.fitBounds(bounds,{
        padding: {
            top:200,
            bottom:150,
            left:100,
            right: 100
        }
    });
}


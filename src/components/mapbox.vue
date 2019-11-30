<template>
    <div>
        <vue-mapbox-map id='map' ref='mapbox' :access-token='scene.accessToken' :interactive='true' :geocoder='false' :lng='scene.lng' :lat='scene.lat' :zoom='scene.zoom' :pitch='scene.pitch' :bearing='scene.bearing' @mapbox-ready='setMap' @mapbox-destroyed='unsetMap'>
        </vue-mapbox-map>
    </div>
</template>
<script>
import VueMapboxMap from 'vue-mapbox-map'; // https://www.npmjs.com/package/vue-mapbox-map
const MapboxLanguage = require('@mapbox/mapbox-gl-language');
const accessToken = 'pk.eyJ1IjoibWljaGFlbGphY2siLCJhIjoiY2psM3VvdDlnMXlpczNxcjBiMDJ2ZXJmYiJ9.eqYKSE9EV_Wd2DJMBbxsww';
// https://www.mapbox.com/mapbox-gl-js/api/#map#dragpan

export default {
    name: 'mapbox',
    data () {
        return {
            map: null,
            scene: {
                accessToken,
                lng: 121.4828743743559,
                lat: 31.220355916422704,
                zoom: 13,
                pitch: 20,
                bearing: 0
            }
        };
    },
    methods: {
        setMap (map) {
            this.map = map;
            this.mapInit(map);
        },
        unsetMap () {
            this.map = null;
        },
        mapInit (map) {
            this.addImage(map);
            this.setLanguage(map);
            map.setLayoutProperty('country-label-lg', 'text-field', ['get', 'name_' + 'zh']);
            map.on('load', this.mapLoad(map));
        },
        mapLoad (map) {
            return () => {
                console.info(map, '-------');
            };
        },
        setLanguage (map) {
            map.addControl(new MapboxLanguage());
        },
        addImage (map) {
            map.on('load', function () {
                map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png', function (error, image) {
                    if (error) throw error;
                    map.addImage('cat', image);
                    map.addLayer({
                        'id': 'points',
                        'type': 'symbol',
                        'source': {
                            'type': 'geojson',
                            'data': {
                                'type': 'FeatureCollection',
                                'features': [{
                                    'type': 'Feature',
                                    'geometry': {
                                        'type': 'Point',
                                        'coordinates': [0, 0]
                                    }
                                }]
                            }
                        },
                        'layout': {
                            'icon-image': 'cat',
                            'icon-size': 0.25
                        }
                    });
                });
            });
        }
    },
    components: {
        VueMapboxMap
    }
};
</script>
<style lang="scss" scoped>
#map {
    position: relative;
    left: 0;
    height: 600px;
}

</style>

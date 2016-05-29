// ==UserScript==
// @name         WME KYTC Lookup
// @namespace    
// @version      0.2
// @description  Look up KY road info from KYTC.  Mouse over a road and hit 'k'.
// @author       MapOMatic
// @match        https://www.waze.com/*editor/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var alertUpdate = false;
    var debugLevel = 0;
    var scriptVersion = 0.2;
    var scriptChanges = 'WME KYTC Lookup, v' + scriptVersion + '\nMove the mouse over a road and hit "k" to look it up.\n\n New in version ' + scriptVersion + ':\n';
    scriptChanges += '- Roads are easier to select at lower zoom levels (zoomed out).'

    function processKYTCRouteInfo(routeInfos) {
        log(routeInfos, 1);
        var jsonRouteInfos = $.parseJSON(routeInfos);
        if (jsonRouteInfos.RouteInfos.length > 0) {
            var routeInfo = jsonRouteInfos.RouteInfos[0];
            var out;
            out = 'Number     : ' + routeInfo.RTUnique + "\n";
            out += 'Name       : ' + routeInfo.Routename + "\n";
            out += 'County     : ' + routeInfo.CountyName + "\n" ;
            out += 'District   : ' + routeInfo.District + "\n";
            out += 'Mile Point : ' + routeInfo.MilePoint + "\n";
            out += 'Gov Level  : ' + routeInfo.GovLevelValue + "\n";
            out += 'FC         : ' + routeInfo.FunctionalClass + "\n";
            out += 'Posted SL  : ' + routeInfo.PostedSpeedLimit;
            alert(out);
        }
        log('no road found', 0);
    }

    function processKYTCCoords(coordsIn) {
        log(coordsIn, 1);
        var jsonCoords = $.parseJSON(coordsIn);
        var searchRadius = W.map.zoom <= 6 ? 640 / Math.pow(2, W.map.zoom): 10;
        log("searchRadius = " + searchRadius, 1);
        var url = 'https://maps.kytc.ky.gov/arcgis/rest/services/MeasuredRoute/MapServer/exts/KYTCGISREST/GetRouteInfo?X=';
        url += jsonCoords.geometries[0].x + '&Y=' + jsonCoords.geometries[0].y + '&SearchRadius=' + searchRadius + '&f=json';
        $.ajax({
            url: url,
            method: 'GET',
            success: processKYTCRouteInfo
        });
    }

    function checkKeyDown(e) {
        if(e.keyCode==75) {
            var mousePosition = $('.mouse-position').text().split(' ');
            log('looking up road at coordinate ' + mousePosition,0);
            var url = 'https://kygisserver.ky.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer/project?inSR=4326&outSR=102763&geometries=';
            url += mousePosition[0] + '%2C' + mousePosition[1] + '&transformation=&transformForward=true&f=json';
            log(url, 1);
            $.ajax({
                url: url,
                method: 'GET',
                success: processKYTCCoords
            });
        }
    }

    function log(message, level) {
        if (message && level <= debugLevel) {
            console.log('KYTC Lookup: ' + message);
        }
    }

    function init() {
        'use strict';

        /* Check version and alert on update */
        if (alertUpdate && ('undefined' === window.localStorage.kytcLookupVersion ||
                            kytcLookupVersion !== window.localStorage.kytcLookupVersion)) {
            alert(kytcLookupChanges);
            window.localStorage.closestVersion = kytcLookupVersion;
        }

        /* Event listeners */
        W.loginManager.events.register('afterloginchanged', this, init);
        //W.selectionManager.events.register('selectionchanged', this, checkSelection);
        document.addEventListener('keydown', checkKeyDown, false);

        log('Initialized.', 0);
    }

    function bootstrap() {
        if (window.W && window.W.loginManager &&
            window.W.loginManager.events.register &&
            window.W.map) {
            log('Initializing...', 0);
            init();
        } else {
            log('Bootstrap failed. Trying again...', 0);
            window.setTimeout(function () {
                bootstrap();
            }, 1000);
        }
    }

    log('Bootstrap...', 0);
    bootstrap();
})();
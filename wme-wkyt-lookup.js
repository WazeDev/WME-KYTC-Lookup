// ==UserScript==
// @name         WME KYTC Lookup
// @namespace
// @version      0.4
// @description  Look up KY road info from KYTC.  Mouse over a road and hit 'ALT+k'.
// @author       MapOMatic
// @match        https://www.waze.com/*editor/*
// @grant        none
// @icon         data:image/png;base64,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
// ==/UserScript==

(function() {
    'use strict';

    var alertUpdate = true;
    var debugLevel = 0;
    var kytcLookupVersion = "0.4";
    var kytcLookupChanges = "WME KYTC Lookup\nv" + kytcLookupVersion + "\nMove the mouse over a road and hit ALT+k to look it up.\n\nWhat's New\n------------------------------";
    kytcLookupChanges += '\n- Changed the position of the KYTC link in the footer to avoid conflict with other scripts.';

    function log(message, level) {
        if (message && level <= debugLevel) {
            console.log('KYTC Lookup: ' + message);
        }
    }

    function processKYTCRouteInfo(routeInfos) {
        log(routeInfos, 1);
        $('#kytc-button').text("KYTC").css('color','blue');
        var jsonRouteInfos = $.parseJSON(routeInfos);
        if (jsonRouteInfos.RouteInfos.length > 0) {
            var routeInfo = jsonRouteInfos.RouteInfos[0];
            var out;
            var match = routeInfo.RTUnique.match(/\d+-(.*-\d+)\s+/);
            var number = (match && match.length) > 1 ? match[1] : routeInfo.RTUnique;
            out = 'NUMBER:  ' + number + "\n";
            out += 'NAME:  ' + routeInfo.Routename + "\n";
            out += 'COUNTY:  ' + routeInfo.CountyName + "\n" ;
            out += 'DISTRICT:  ' + routeInfo.District + "\n";
            out += 'MILE POINT:  ' + routeInfo.MilePoint + "\n";
            out += 'GOV LEVEL:  ' + routeInfo.GovLevelValue + "\n";
            out += 'FC:  ' + routeInfo.FunctionalClass + "\n";
            out += 'POSTED SL:  ' + routeInfo.PostedSpeedLimit;
            alert(out);
        } else {
            log('no road found', 0);
            alert('No road found at this location.  Try again, or click the KYTC button in the footer to open the KYTC map.');
        }
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
        if(e.keyCode==75 && e.altKey) {
            $('#kytc-button').text("KYTC...").css('color','gray');
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

    function kytcButton_click() {
        var wazeExt = W.map.getExtent();
        var url = 'https://kygisserver.ky.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer/project?inSR=3857&outSR=102763&geometries=';
        url += wazeExt.left + '%2C' + wazeExt.bottom + '%2C' + wazeExt.right + '%2C' + wazeExt.top + '&transformation=&transformForward=true&f=json';
        log(url, 1);
        $.ajax({
            url: url,
            method: 'GET',
            success: function(ext) {
                var pts = $.parseJSON(ext).geometries;
                var url = 'http://maps.kytc.ky.gov/photolog/?config=functionalclass&x1=' + pts[0].x + '&y1=' + pts[0].y + '&x2=' + pts[1].x + '&y2=' + pts[1].y + '&MODE=APP';
                log(url, 1);
                window.open(url, '_blank');
            }
        });
    }

    function init() {
        'use strict';

        /* Check version and alert on update */
        if (alertUpdate && ('undefined' === window.localStorage.kytcLookupVersion ||
                            kytcLookupVersion !== window.localStorage.kytcLookupVersion)) {
            alert(kytcLookupChanges);
            window.localStorage.kytcLookupVersion = kytcLookupVersion;
        }
/*  TBD...
        var navTabs = $('.nav-tabs');
        if(navTabs !== null) {
            var kyImg = $('<img>', {width:20, src:'data:image/png;base64,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'});
            var kyAnchor = $('<a>', {href:'#sidepanel-wkl','data-toggle':'tab'}).text(' Lookup').prepend(kyImg);
            var kyTab = $('<li>').html('<!--suppress HtmlUnknownAnchorTarget -->').append(kyAnchor);
            navTabs.append(kyTab);
        }
*/	
        $('.WazeControlPermalink').prepend(
            $('<div>').css({float:'left',dispaly:'inline-block', padding:'0px 5px 0px 3px'}).append(
                $('<a>',{id:'kytc-button',title:'Open the KYTC map in a new window'}).text('KYTC').attr('href','javascript:void(0)').css({float:'left',textDecoration:'none', color:'blue', fontWeight:'bold'}).click(kytcButton_click)
            )
        );


        /* Event listeners */
        W.loginManager.events.register('afterloginchanged', this, init);
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
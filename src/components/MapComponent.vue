<template>
  <div id="map" style="width: 100%; height: 100%">
    <div id="oltb"></div>
  </div>
</template>
<script setup lang="ts">


import 'ol/ol.css'
import {Map, View} from 'ol';
import {fromLonLat} from 'ol/proj';
import {get as getProjection} from 'ol/proj'
import {defaults as defaultControls} from 'ol/control'
import { platformModifierKeyOnly, altShiftKeysOnly, shiftKeyOnly, targetNotEditable } from 'ol/events/condition';
import { defaults as defaultInterctions, MouseWheelZoom, DragPan, DragRotate, KeyboardZoom, KeyboardPan } from 'ol/interaction';

// Layers
import '../layers/Maps'
// import '../layers/Wind'
//import '../layers/Capitals'
//import '../layers/Countries'
//import '../layers/Continents'

// Browser prototype extensions
import 'oltb/src/oltb/js/helpers/extensions/Cycle';
import 'oltb/src/oltb/js/helpers/prototypes/String';
import 'oltb/src/oltb/js/helpers/prototypes/SlideToggle';

// Core Toolbar
import 'oltb/src/oltb/scss/oltb.scss';
import {Settings} from 'oltb/src/oltb/js/helpers/constants/Settings';
import {ContextMenu} from 'oltb/src/oltb/js/common/ContextMenu';
import {LocalStorageKeys} from 'oltb/src/oltb/js/helpers/constants/LocalStorageKeys';

// Core Managers
import {LogManager} from 'oltb/src/oltb/js/managers/LogManager';
import {UrlManager} from 'oltb/src/oltb/js/managers/UrlManager';
import {ToolManager} from 'oltb/src/oltb/js/managers/ToolManager';
import {SnapManager} from 'oltb/src/oltb/js/managers/SnapManager';
import {StyleManager} from 'oltb/src/oltb/js/managers/StyleManager';
import {LayerManager} from 'oltb/src/oltb/js/managers/LayerManager';
import {StateManager} from 'oltb/src/oltb/js/managers/StateManager';
import {TippyManager} from 'oltb/src/oltb/js/managers/TippyManager';
import {ErrorManager} from 'oltb/src/oltb/js/managers/ErrorManager';
import {ConfigManager} from 'oltb/src/oltb/js/managers/ConfigManager';
import {ElementManager} from 'oltb/src/oltb/js/managers/ElementManager';
import {TooltipManager} from 'oltb/src/oltb/js/managers/TooltipManager';
import {FeatureManager} from 'oltb/src/oltb/js/managers/FeatureManager';
import {SettingsManager} from 'oltb/src/oltb/js/managers/SettingsManager';
import {BootstrapManager} from 'oltb/src/oltb/js/managers/BootstrapManager';
import {InfoWindowManager} from 'oltb/src/oltb/js/managers/InfoWindowManager';
import {ProjectionManager} from 'oltb/src/oltb/js/managers/ProjectionManager';
import {TranslationManager} from 'oltb/src/oltb/js/managers/TranslationManager';
import {ColorPickerManager} from 'oltb/src/oltb/js/managers/ColorPickerManager';
import {AccessibilityManager} from 'oltb/src/oltb/js/managers/AccessibilityManager';


// Toolbar Tools
import { HomeTool } from 'oltb/src/oltb/js/tools/HomeTool';
import { HiddenMarkerTool } from 'oltb/src/oltb/js/tools/hidden-tools/HiddenMarkerTool';
import { HiddenMapNavigationTool } from 'oltb/src/oltb/js/tools/hidden-tools/HiddenMapNavigationTool';
import {HiddenAboutTool} from 'oltb/src/oltb/js/tools/hidden-tools/HiddenAboutTool';

BootstrapManager.initAsync([
  { manager: LogManager },
    { manager: StyleManager },
    { manager: ErrorManager },
    { manager: FeatureManager },
    { manager: StateManager, options: {
        ignoredKeys: []
    }},
    { manager: ElementManager },
    { manager: ConfigManager },
    { manager: TranslationManager },
    { manager: ProjectionManager },
    { manager: LayerManager },
    { manager: ColorPickerManager },
    { manager: TippyManager },
    { manager: TooltipManager },
    { manager: UrlManager },
    { manager: ToolManager },
    { manager: SettingsManager },
    { manager: SnapManager },
    { manager: InfoWindowManager },
    { manager: AccessibilityManager }
]).then(() => {
    initMapAndToolbar();
});
const initMapAndToolbar = () => {
    const defaultLocation = ConfigManager.getConfig().location.default;
    const localStorageNodeName = LocalStorageKeys.mapData;
    const localStorageDefaults = Object.freeze({
        lon: defaultLocation.lon,
        lat: defaultLocation.lat,
        zoom: defaultLocation.zoom,
        rotation: defaultLocation.rotation,
    });

    const localStorage = StateManager.getAndMergeStateObject(
        localStorageNodeName,
        localStorageDefaults
    );

    const defaultProjection = ConfigManager.getConfig().projection.default;
    const map = new Map({
        interactions: defaultInterctions({
            mouseWheelZoom: false,
            altShiftDragRotate: false,
            dragPan: false,
            keyboard: false
        }).extend([
            new MouseWheelZoom({
                condition: function(event) {
                    return (
                        platformModifierKeyOnly(event) ||
                        SettingsManager.getSetting(Settings.mouseWheelZoom)
                    );
                }
            }),
            new DragRotate({
                condition: function(event) {
                    return (
                        altShiftKeysOnly(event) &&
                        SettingsManager.getSetting(Settings.altShiftDragRotate)
                    );
                }
            }),
            new DragPan({
                condition: function(event) {
                    return (
                        (
                            platformModifierKeyOnly(event) ||
                            SettingsManager.getSetting(Settings.dragPan)
                        ) && !altShiftKeysOnly(event) && !shiftKeyOnly(event)
                    );
                }
            }),
            new KeyboardZoom({
                condition: function(event) {
                    return (
                        SettingsManager.getSetting(Settings.keyboardZoom) &&
                        targetNotEditable(event)
                    );
                }
            }),
            new KeyboardPan({
                condition: function(event) {
                    return (
                        SettingsManager.getSetting(Settings.keyboardPan) &&
                        targetNotEditable(event)
                    );
                }
            })
        ]),
        controls: defaultControls({
            zoom: false,
            rotate: false
        }).extend([
            new HiddenMarkerTool({
                onAdded: function(marker: any) {
                    console.log('HiddenMarkerTool: Marker added', marker);
                },
                onRemoved: function(marker: any) {
                    console.log('HiddenMarkerTool: Marker removed', marker);
                },
                onEdited: function(before: any, after: any) {
                    console.log('HiddenMarkerTool: Marker edited', before, after);
                }
            }),
            new HiddenMapNavigationTool({
                focusZoom: 10
            }),
            new HomeTool({
                lon: 18.1201,
                lat: 35.3518,
                zoom: 3,
                onInitiated: function() {
                    console.log('HomeTool: Initiated');
                },
                onClicked: function() {
                    console.log('HomeTool: Clicked');
                },
                onBrowserStateCleared: function() {
                    console.log('HomeTool: State cleared');
                },
                onNavigatedHome: function(result: any) {
                    console.log('HomeTool: Navigated home', result);
                }
            }),
            new HiddenAboutTool(),
            new ContextMenu()
        ]),
        target: ElementManager.getMapElement(),
        view: new View({
            projection: getProjection(defaultProjection),
            center: fromLonLat([
                Number(localStorage.lon),
                Number(localStorage.lat)
            ], defaultProjection),
            zoom: localStorage.zoom,
            rotation: localStorage.rotation
        })
    });

    BootstrapManager.setMap(map);
    BootstrapManager.ready();
}
</script>

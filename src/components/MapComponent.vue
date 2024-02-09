<template>
  <div id="map" class="mapa" tabindex="0">
    <div id="oltb"></div>
    <div id="submenu"></div>
  </div>
</template>
<script setup lang="ts">

import {defineStore} from 'pinia';

import 'ol/ol.css'
import {Map, View} from 'ol';
import {fromLonLat} from 'ol/proj';
import {get as getProjection} from 'ol/proj'
import {defaults as defaultControls} from 'ol/control'
import { platformModifierKeyOnly, altShiftKeysOnly, shiftKeyOnly, targetNotEditable } from 'ol/events/condition';
import { defaults as defaultInterctions, MouseWheelZoom, DragPan, DragRotate, KeyboardZoom, KeyboardPan } from 'ol/interaction';

// Layers
import '../layers/Maps'
//import '../layers/Wind'
//import '../layers/Capitals'
//import '../layers/Countries'
//import '../layers/Continents'

// Browser prototype extensions
import 'oltb-mira/src/oltb/js/helpers/extensions/Cycle';
import 'oltb-mira/src/oltb/js/helpers/prototypes/String';
import 'oltb-mira/src/oltb/js/helpers/prototypes/SlideToggle';

// Core Toolbar
import 'oltb-mira/src/oltb/scss/oltb.scss';
import {Settings} from 'oltb-mira/src/oltb/js/helpers/constants/Settings';
import {ContextMenu} from 'oltb-mira/src/oltb/js/common/ContextMenu';
import {LocalStorageKeys} from 'oltb-mira/src/oltb/js/helpers/constants/LocalStorageKeys';

// Core Managers
import {LogManager} from 'oltb-mira/src/oltb/js/managers/LogManager';
import {UrlManager} from 'oltb-mira/src/oltb/js/managers/UrlManager';
import {ToolManager} from 'oltb-mira/src/oltb/js/managers/ToolManager';
import {SnapManager} from 'oltb-mira/src/oltb/js/managers/SnapManager';
import {StyleManager} from 'oltb-mira/src/oltb/js/managers/StyleManager';
import {LayerManager} from 'oltb-mira/src/oltb/js/managers/LayerManager';
import {StateManager} from 'oltb-mira/src/oltb/js/managers/StateManager';
import {TippyManager} from 'oltb-mira/src/oltb/js/managers/TippyManager';
import {ErrorManager} from 'oltb-mira/src/oltb/js/managers/ErrorManager';
import {ConfigManager} from 'oltb-mira/src/oltb/js/managers/ConfigManager';
import {ElementManager} from 'oltb-mira/src/oltb/js/managers/ElementManager';
import {TooltipManager} from 'oltb-mira/src/oltb/js/managers/TooltipManager';
import {FeatureManager} from 'oltb-mira/src/oltb/js/managers/FeatureManager';
import {SettingsManager} from 'oltb-mira/src/oltb/js/managers/SettingsManager';
import {BootstrapManager} from 'oltb-mira/src/oltb/js/managers/BootstrapManager';
import {InfoWindowManager} from 'oltb-mira/src/oltb/js/managers/InfoWindowManager';
import {ProjectionManager} from 'oltb-mira/src/oltb/js/managers/ProjectionManager';
import {TranslationManager} from 'oltb-mira/src/oltb/js/managers/TranslationManager';
import {ColorPickerManager} from 'oltb-mira/src/oltb/js/managers/ColorPickerManager';
import {AccessibilityManager} from 'oltb-mira/src/oltb/js/managers/AccessibilityManager';

// Toolbar Tools
import { HomeTool } from 'oltb-mira/src/oltb/js/tools/HomeTool';
import { HiddenMarkerTool } from 'oltb-mira/src/oltb/js/tools/hidden-tools/HiddenMarkerTool';
import { HiddenMapNavigationTool } from 'oltb-mira/src/oltb/js/tools/hidden-tools/HiddenMapNavigationTool';
import {HiddenAboutTool} from 'oltb-mira/src/oltb/js/tools/hidden-tools/HiddenAboutTool';
import {ZoomInTool} from 'oltb-mira/src/oltb/js/tools/ZoomInTool'
import {ZoomOutTool} from 'oltb-mira/src/oltb/js/tools/ZoomOutTool'
import {FullscreenTool} from 'oltb-mira/src/oltb/js/tools/FullscreenTool';
import {LayerTool} from 'oltb-mira/src/oltb/js/tools/LayerTool'
import {GraticuleTool} from 'oltb-mira/src/oltb/js/tools/GraticuleTool'
import {DrawTool} from 'oltb-mira/src/oltb/js/tools/DrawTool'
import {ImportVectorLayerTool} from 'oltb-mira/src/oltb/js/tools/ImportVectorLayerTool'
import {ResetNorthTool} from 'oltb-mira/src/oltb/js/tools/ResetNorthTool'
import {MeasureTool} from 'oltb-mira/src/oltb/js/tools/MeasureTool'
import {CoordinatesTool} from 'oltb-mira/src/oltb/js/tools/CoordinatesTool'
import {InfoTool} from 'oltb-mira/src/oltb/js/tools/InfoTool'
import {SplitViewTool} from 'oltb-mira/src/oltb/js/tools/SplitViewTool'
import {ThemeTool} from 'oltb-mira/src/oltb/js/tools/ThemeTool'
import {DirectionTool} from 'oltb-mira/src/oltb/js/tools/DirectionTool'
import {BookmarkTool} from 'oltb-mira/src/oltb/js/tools/BookmarkTool'
import {SettingsTool} from 'oltb-mira/src/oltb/js/tools/SettingsTool'
import {ExportPngTool} from 'oltb-mira/src/oltb/js/tools/ExportPngTool'
import {EditTool} from 'oltb-mira/src/oltb/js/tools/EditTool'
import {OverviewTool} from 'oltb-mira/src/oltb/js/tools/OverviewTool'
import {MagnifyTool} from 'oltb-mira/src/oltb/js/tools/MagnifyTool'
import {HelpTool} from 'oltb-mira/src/oltb/js/tools/HelpTool'
import {MyLocationTool} from 'oltb-mira/src/oltb/js/tools/MyLocationTool'
import {DebugInfoTool} from 'oltb-mira/src/oltb/js/tools/DebugInfoTool'
import {ComponentSubmenu} from 'src/utils/ComponentSubmenu'
import {SubmenuTool} from 'src/utils/SubmenuTool';

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
            mouseWheelZoom: true,
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
                onAdded: function(marker: never) {
                    console.log('HiddenMarkerTool: Marker added', marker);
                },
                onRemoved: function(marker: never) {
                    console.log('HiddenMarkerTool: Marker removed', marker);
                },
                onEdited: function(before: never, after: never) {
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
                onNavigatedHome: function(result: never) {
                    console.log('HomeTool: Navigated home', result);
                }
            }),
            new ZoomInTool({
                onInitiated: function() {
                    console.log('ZoomInTool: Initiated');
                },
                onClicked: function() {
                    console.log('ZoomInTool: Clicked');
                },
                onZoomed: function(result: any) {
                    console.log('ZoomInTool: Zoomed in', result);
                }
            }),
            new ZoomOutTool({
                onInitiated: function() {
                    console.log('ZoomOutTool: Initiated');
                },
                onClicked: function() {
                    console.log('ZoomOutTool: Clicked');
                },
                onZoomed: function(result: any) {
                    console.log('ZoomOutTool: Zoomed out', result);
                }
            }),
            new LayerTool({
                onInitiated: function() {
                    console.log('LayerTool: Initiated');
                },
                onClicked: function() {
                    console.log('LayerTool: Clicked');
                },
                onBrowserStateCleared: function() {
                    console.log('LayerTool: State cleared');
                },
                onMapLayerAdded: function(layerWrapper: any) {
                    console.log('LayerTool: Map layer added', layerWrapper);
                },
                onMapLayerRemoved: function(layerWrapper: any) {
                    console.log('LayerTool: Map layer removed', layerWrapper);
                },
                onMapLayerRenamed: function(layerWrapper: any) {
                    console.log('LayerTool: Map layer renamed', layerWrapper);
                },
                onMapLayerVisibilityChanged: function(layerWrapper: any) {
                    console.log('LayerTool: Map layer visibility change', layerWrapper);
                },
                onMapLayerDragged(item: any, list: any) {
                    console.log('LayerTool: Map layer dragged', item, list);
                },
                onFeatureLayerAdded: function(layerWrapper: any) {
                    console.log('LayerTool: Feature layer added', layerWrapper);
                },
                onFeatureLayerRemoved: function(layerWrapper: any) {
                    console.log('LayerTool: Feature layer removed', layerWrapper);
                },
                onFeatureLayerRenamed: function(layerWrapper: any) {
                    console.log('LayerTool: Feature layer renamed', layerWrapper);
                },
                onFeatureLayerVisibilityChanged: function(layerWrapper: any) {
                    console.log('LayerTool: Feature layer visibility change', layerWrapper);
                },
                onFeatureLayerDownloaded: function(layerWrapper: any, filename: any, content: any) {
                    console.log('LayerTool: Feature layer downloaded', layerWrapper, filename, content);
                },
                onFeatureLayerDragged(item: any, list: any) {
                    console.log('LayerTool: Feature layer dragged', item, list);
                }
            }),
            new ImportVectorLayerTool({
                onInitiated: function() {
                    console.log('ImportVectorLayerTool: Initiated');
                },
                onClicked: function() {
                    console.log('ImportVectorLayerTool: Clicked');
                },
                onImported: function(features: any) {
                    console.log('ImportVectorLayerTool: Imported', features);
                },
                onError: function(filename: any, error: any) {
                    console.log('ImportVectorLayerTool: Error', filename, error);
                }
            }),
            new ResetNorthTool({
                onInitiated: function() {
                    console.log('ResetNorthTool: Initiated');
                },
                onClicked: function() {
                    console.log('ResetNorthTool: Clicked');
                },
                onReset: function(result: any) {
                    console.log('ResetNorthTool: North reset', result);
                }
            }),
            new MeasureTool({
                onInitiated: function() {
                    console.log('MeasureTool: Initiated');
                },
                onClicked: function() {
                    console.log('MeasureTool: Clicked');
                },
                onBrowserStateCleared: function() {
                    console.log('MeasureTool: State cleared');
                },
                onStart: function(event: any) {
                    console.log('MeasureTool: Start');
                },
                onEnd: function(event: { feature: any; }) {
                    console.log('MeasureTool: End', event.feature);
                },
                onAbort: function(event: any) {
                    console.log('MeasureTool: Abort');
                },
                onError: function(event: any) {
                    console.log('MeasureTool: Error');
                }
            }),
            new CoordinatesTool({
                onInitiated: function() {
                    console.log('CoordinatesTool: Initiated');
                },
                onClicked: function() {
                    console.log('CoordinatesTool: Clicked');
                },
                onBrowserStateCleared: function() {
                    console.log('CoordinatesTool: State cleared');
                },
                onMapClicked: function(coordinates: any) {
                    console.log('CoordinatesTool: Map clicked at', coordinates);
                }
            }),
            new InfoTool({
                title: 'Hey!',
                content: '<p>This is a <strong>modal window</strong>, here you can place some text about your application or links to external resources.</p>',
                onInitiated: function() {
                    console.log('InfoTool: Initiated');
                },
                onClicked: function() {
                    console.log('InfoTool: Clicked');
                }
            }),
            new SplitViewTool({
                onInitiated: function() {
                    console.log('SplitViewTool: Initiated');
                },
                onClicked: function() {
                    console.log('SplitViewTool: Clicked');
                },
                onBrowserStateCleared: function() {
                    console.log('SplitViewTool: State cleared');
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
    new ComponentSubmenu(map)

    // eslint-disable-next-line vue/no-export-in-script-setup
    BootstrapManager.setMap(map);
    BootstrapManager.ready();
}


</script>

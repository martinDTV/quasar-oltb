<template>
  <div id="map" class="mapa" tabindex="0">
    <div id="oltb"></div>
    <div id="submenu"></div>
  </div>
</template>
<script setup lang="ts">

import {useRoute} from 'vue-router';
import {onMounted, watch} from 'vue';
import 'ol/ol.css'
import {Map, View} from 'ol';
import {fromLonLat} from 'ol/proj';
import {get as getProjection} from 'ol/proj'
import {defaults as defaultControls} from 'ol/control'
import { platformModifierKeyOnly, altShiftKeysOnly, shiftKeyOnly, targetNotEditable } from 'ol/events/condition';
import { defaults as defaultInterctions, MouseWheelZoom, DragPan, DragRotate, KeyboardZoom, KeyboardPan } from 'ol/interaction';

// Layers
import '../layers/Geonode'
import '../css/layerswitcher.scss'
//import '../layers/Wind'
//import '../layers/Capitals'
//import '../layers/Countries'
//import '../layers/Continents'
//import 'ol-layerswitcher/dist/ol-layerswitcher.css';
// import '../layers/Maps'

// style
import 'oltb/src/oltb/scss/oltb.scss';
import '../css/toolbar.scss'

// Browser prototype extensions
import 'oltb/src/oltb/js/helpers/extensions/Cycle';
import 'oltb/src/oltb/js/helpers/prototypes/String';
import 'oltb/src/oltb/js/helpers/prototypes/SlideToggle';

// Core Toolbar
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
import {ZoomInTool} from 'oltb/src/oltb/js/tools/ZoomInTool'
import {ZoomOutTool} from 'oltb/src/oltb/js/tools/ZoomOutTool'
import {ImportVectorLayerTool} from 'oltb/src/oltb/js/tools/ImportVectorLayerTool'
import {ResetNorthTool} from 'oltb/src/oltb/js/tools/ResetNorthTool'
import {MeasureTool} from 'oltb/src/oltb/js/tools/MeasureTool'
import {CoordinatesTool} from 'oltb/src/oltb/js/tools/CoordinatesTool'
import {InfoTool} from 'oltb/src/oltb/js/tools/InfoTool'
import {SplitViewTool} from 'oltb/src/oltb/js/tools/SplitViewTool'
import {ScaleLineTool} from 'oltb/src/oltb/js/tools/ScaleLineTool'
import {LayerTool} from '../utils/Herramientas/Layer'
import {ThemeTool} from 'oltb/src/oltb/js/tools/ThemeTool';
import {BookmarkTool} from 'oltb/src/oltb/js/tools/BookmarkTool';
import {SettingsTool} from 'oltb/src/oltb/js/tools/SettingsTool';
import {ExportPngTool} from 'oltb/src/oltb/js/tools/ExportPngTool';
import {FullscreenTool} from 'oltb/src/oltb/js/tools/FullscreenTool';
import {DrawTool} from 'oltb/src/oltb/js/tools/DrawTool';
import {EditTool} from 'oltb/src/oltb/js/tools/EditTool';
import {OverviewTool} from 'oltb/src/oltb/js/tools/OverviewTool';
import {GraticuleTool} from 'oltb/src/oltb/js/tools/GraticuleTool';
import {MagnifyTool} from 'oltb/src/oltb/js/tools/MagnifyTool';
import {HelpTool} from 'oltb/src/oltb/js/tools/HelpTool';
import {MyLocationTool} from 'oltb/src/oltb/js/tools/MyLocationTool';
import {DebugInfoTool} from 'oltb/src/oltb/js/tools/DebugInfoTool';
// import {ComponentSubmenu} from 'src/utils/Herramientas/ComponentSubmenu'

import LayerGroup from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';
import {OSM, XYZ} from 'ol/source';
import LayerSwitcher from 'ol-layerswitcher';
import {BaseLayerOptions, GroupLayerOptions} from 'ol-layerswitcher';
import {BuscarMapaPk} from 'src/layers/GeonodePk';

import {watchEffect, ref} from 'vue';

import {useQuasar} from 'quasar';

onMounted(() => {
  const router = useRoute()

  watchEffect(() => {
    BuscarMapaPk(router.params.pk)
  })


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

      const osm = new TileLayer({
        title: 'Open Street Map',
        type: 'base',
        visible: true,
        source: new OSM()
      } as BaseLayerOptions);

      const Monterrey2022 = new TileLayer({
        title: 'Ortofoto Monterrey 2022',
        type: 'base',
        visible: false,
        source: new XYZ({
          crossOrigin: 'anonymous',
          url:'https://engine.ec.appsmty.gob.mx/stiles/5ba54d62469b11eebe7f00155d649203/{z}/{x}/{-y}.jpg'
        })
      } as BaseLayerOptions);

      const satelite = new TileLayer({
        title: 'Satelite',
        type: 'base',
        visible: false,
        source: new XYZ({
          crossOrigin: 'anonymous',
          url:'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        })
      } as BaseLayerOptions);

      const topo = new TileLayer({
        title: 'Topo',
        type:'base',
        visible: false,
        source: new XYZ({
          crossOrigin:'anonymous',
          url:'https://tile.opentopomap.org/{z}/{x}/{y}.png'
        })
      } as BaseLayerOptions)

      const baseMaps = new LayerGroup({
        title: 'Mapas base',
        layers: [osm, Monterrey2022, satelite, topo]
      } as GroupLayerOptions);


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
          layers:[baseMaps],
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
                      console.log();
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
              new ContextMenu(),
              new ThemeTool({
                click: function() {
                  console.log('ThemeTool clicked');
                },
                changed: function() {
                  console.log('Theme changed to');
                }
              }),
            new BookmarkTool({
                markerLayerVisibleOnLoad: false,
                markerLabelUseEllipsisAfter: 20,
                markerLabelUseUpperCase: false,
                bookmarks: [{
                  id: '6812cc22-f490-46b7-a9f3-42eb9ea58ac2',
                  name: 'Custom Bookmark',
                  zoom: 5,
                  coordinates: [57.123, 16.456]
                }],
                onInitiated: function() {
                  console.log('BookmarkTool: Initiated');
                },
                onClicked: function() {
                  console.log('BookmarkTool: Clicked');
                },
                onBrowserStateCleared: function() {
                  console.log('BookmarkTool: State cleared');
                },
                onAdded: function() {
                  console.log('BookmarkTool: Added');
                },
                onRemoved: function() {
                  console.log('BookmarkTool: Removed');
                },
                onRenamed: function() {
                  console.log('BookmarkTool: Renamed');
                },
                onZoomedTo: function() {
                  console.log('BookmarkTool: Zoomed to');
                },
                onCleared: function() {
                  console.log('BookmarkTool: Cleared');
                },
                onDragged: function() {
                  console.log('BookmarkTool: Dragged');
                }
            }),
            new SettingsTool({
                  onInitiated: function() {
                      console.log('SettingsTool: Initiated');
                  },
                  onClicked: function() {
                      console.log('SettingsTool: Clicked');
                  },
                  onBrowserStateCleared: function() {
                      console.log('SettingsTool: State cleared');
                  }
              }),
            new ExportPngTool({
                  filename: 'map-image-export',
                  appendTime: true,
                  onInitiated: function() {
                      console.log('ExportPngTool: Initiated');
                  },
                  onClicked: function() {
                      console.log('ExportPngTool: Clicked');
                  },
                  onExported: function() {
                      console.log('ExportPngTool: PNG exported');
                  },
                  onError: function() {
                      console.log('ExportPngTool: Error');
                  }
              }),
            new FullscreenTool({
                  onInitiated: function() {
                      console.log('FullscreenTool: Initiated');
                  },
                  onClicked: function() {
                      console.log('FullscreenTool: Clicked');
                  },
                  onEnter: function() {
                      console.log('FullscreenTool: Enter fullscreen');
                  },
                  onLeave: function() {
                      console.log('FullscreenTool: Leave fullscreen');
                  }
              }),
            new DrawTool({
                  onInitiated: function() {
                      console.log('DrawTool: Initiated');
                  },
                  onClicked: function() {
                      console.log('DrawTool: Clicked');
                  },
                  onBrowserStateCleared: function() {
                      console.log('DrawTool: State cleared');
                  },
                  onStart: function(event: any) {
                      console.log('DrawTool: Start');
                  },
                  onEnd: function(event: { feature: any; }) {
                      console.log('DrawTool: End', event.feature);
                  },
                  onAbort: function(event: any) {
                      console.log('DrawTool: Abort');
                  },
                  onError: function(event: any) {
                      console.log('DrawTool: Error');
                  },
                  onIntersected: function(event: { feature: any; }, intersectedFeatures: any) {
                      console.log('DrawTool: Intersected', event.feature);
                      console.log('DrawTool: Intersected features', intersectedFeatures);
                  },
                  onSnapped: function(event: any) {
                      console.log('DrawTool: Snapped');
                  }
              }),
            new EditTool({
                  hitTolerance: 5,
                  onInitiated: function() {
                      console.log('EditTool: Initiated');
                  },
                  onClicked: function() {
                      console.log('EditTool: Clicked');
                  },
                  onBrowserStateCleared: function() {
                      console.log('EditTool: Sstate cleared');
                  },
                  onStyleChange: function(event: any, style: any) {
                      console.log('EditTool: Style changed');
                  },
                  onShapeOperation: function(type: any, a: any, b: any, result: any) {
                      console.log('EditTool: Shape operation', type);
                  },
                  onSelectAdd: function(event: any) {
                      console.log('EditTool: Selected feature');
                  },
                  onSelectRemove: function(event: any) {
                      console.log('EditTool: Deselected feature');
                  },
                  onModifyStart: function(event: any) {
                      console.log('EditTool: Modify start');
                  },
                  onModifyEnd: function(event: any) {
                      console.log('EditTool: Modify end');
                  },
                  onTranslateStart: function(event: any) {
                      console.log('EditTool: Translate start');
                  },
                  onTranslatEend: function(event: any) {
                      console.log('EditTool: Translate end');
                  },
                  onRemovedFeature: function(feature: any) {
                      console.log('EditTool: Removed feature', feature);
                  },
                  onError: function(event: any) {
                      console.log('EditTool: Error');
                  },
                  onSnapped: function(event: any) {
                      console.log('EditTool: Snapped');
                  }
              }),
            new OverviewTool({
                  onInitiated: function() {
                      console.log('OverviewTool: Initiated');
                  },
                  onClicked: function() {
                      console.log('OverviewTool: Clicked');
                  },
                  onBrowserStateCleared: function() {
                      console.log('OverviewTool: State cleared');
                  }
              }),
            new GraticuleTool({
                  color: '#3B4352E6',
                  dashed: true,
                  width: 2,
                  showLabels: true,
                  wrapX: true,
                  onInitiated: function() {
                      console.log('GraticuleTool: Initiated');
                  },
                  onClicked: function() {
                      console.log('GraticuleTool: Clicked');
                  },
                  onBrowserStateCleared: function() {
                      console.log('GraticuleTool: State cleared');
                  }
              }),
            new MagnifyTool({
                  onInitiated: function() {
                      console.log('MagnifyTool: Initiated');
                  },
                  onClicked: function() {
                      console.log('MagnifyTool: Clicked');
                  },
                  onBrowserStateCleared: function() {
                      console.log('MagnifyTool: State cleared');
                  }
              }),
            new HelpTool({
                  url: 'https://github.com/qulle/oltb',
                  target: '_blank',
                  onInitiated: function() {
                      console.log('HelpTool: Initiated');
                  },
                  onClicked: function() {
                      console.log('HelpTool: Clicked');
                  }
              }),
            new MyLocationTool({
                  enableHighAccuracy: true,
                  timeout: 10000,
                  description: 'This is the location that the browser was able to find. It might not be your actual location.',
                  markerLabelUseEllipsisAfter: 20,
                  markerLabelUseUpperCase: false,
                  onInitiated: function() {
                      console.log('MyLocationTool: Initiated');
                  },
                  onClicked: function() {
                      console.log('MyLocationTool: Clicked');
                  },
                  onLocationFound: function(location: any) {
                      console.log('MyLocationTool: Location found', location);
                  },
                  onError: function(error: any) {
                      console.log('MyLocationTool: Error', error);
                  }
              }),
            new DebugInfoTool({
                  onlyWhenGetParameter: false,
                  onInitiated: function() {
                      console.log('DebugInfoTool: Initiated');
                  },
                  onClicked: function() {
                      console.log('DebugInfoTool: Clicked');
                  }
              }),
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
          }),

      });

      const layerSwitcher = new LayerSwitcher({
        reverse: true,
        groupSelectStyle: 'group'
      });

      // eslint-disable-next-line vue/no-export-in-script-setup
      BootstrapManager.setMap(map);
      BootstrapManager.ready();
      map.addControl(layerSwitcher);

  }

  })

</script>

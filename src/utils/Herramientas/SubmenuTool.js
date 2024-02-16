import {Control} from 'ol/control';
import {DOM} from 'oltb/src/oltb/js/helpers/browser/DOM';
import element from 'ol-ext/util/element';

// Tools
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


class SubmenuTool extends Control{
  constructor(options = {}) {

    super({
      element: document.getElementById('submenu'),
      target: options.target
    });

    const themeTool = new ThemeTool({
      click: function() {
        console.log('ThemeTool clicked');
      },
      changed: function(theme) {
        console.log('Theme changed to', theme);
      }
    });
    const bookmarkTool = new BookmarkTool({
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
      onAdded: function(bookmark) {
        console.log('BookmarkTool: Added', bookmark);
      },
      onRemoved: function(bookmark) {
        console.log('BookmarkTool: Removed', bookmark);
      },
      onRenamed: function(bookmark) {
        console.log('BookmarkTool: Renamed', bookmark);
      },
      onZoomedTo: function(bookmark) {
        console.log('BookmarkTool: Zoomed to', bookmark);
      },
      onCleared: function() {
        console.log('BookmarkTool: Cleared');
      },
      onDragged: function(item, list) {
        console.log('BookmarkTool: Dragged', item, list);
      }
    })

    const settingsTool = new SettingsTool({
      onInitiated: function() {
        console.log('SettingsTool: Initiated');
      },
      onClicked: function() {
        console.log('SettingsTool: Clicked');
      },
      onBrowserStateCleared: function() {
        console.log('SettingsTool: State cleared');
      }
    })

    const exportPng = new ExportPngTool({
      filename: 'map-image-export',
      appendTime: true,
      onInitiated: function() {
        console.log('ExportPngTool: Initiated');
      },
      onClicked: function() {
        console.log('ExportPngTool: Clicked');
      },
      onExported: function(filename, content) {
        console.log('ExportPngTool: PNG exported', filename, content);
      },
      onError: function(error) {
        console.log('ExportPngTool: Error', error);
      }
    })
    const fullScreen = new FullscreenTool({
      onInitiated: function() {
        console.log('FullscreenTool: Initiated');
      },
      onClicked: function() {
        console.log('FullscreenTool: Clicked');
      },
      onEnter: function(event) {
        console.log('FullscreenTool: Enter fullscreen', event);
      },
      onLeave: function(event) {
        console.log('FullscreenTool: Leave fullscreen', event);
      }
    })
    const draw = new DrawTool({
      onInitiated: function() {
        console.log('DrawTool: Initiated');
      },
      onClicked: function() {
        console.log('DrawTool: Clicked');
      },
      onBrowserStateCleared: function() {
        console.log('DrawTool: State cleared');
      },
      onStart: function(event) {
        console.log('DrawTool: Start');
      },
      onEnd: function(event) {
        console.log('DrawTool: End', event.feature);
      },
      onAbort: function(event) {
        console.log('DrawTool: Abort');
      },
      onError: function(event) {
        console.log('DrawTool: Error');
      },
      onIntersected: function(event, intersectedFeatures) {
        console.log('DrawTool: Intersected', event.feature);
        console.log('DrawTool: Intersected features', intersectedFeatures);
      },
      onSnapped: function(event) {
        console.log('DrawTool: Snapped');
      }
    })

    const edit = new EditTool({
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
      onStyleChange: function(event, style) {
        console.log('EditTool: Style changed');
      },
      onShapeOperation: function(type, a, b, result) {
        console.log('EditTool: Shape operation', type);
      },
      onSelectAdd: function(event) {
        console.log('EditTool: Selected feature');
      },
      onSelectRemove: function(event) {
        console.log('EditTool: Deselected feature');
      },
      onModifyStart: function(event) {
        console.log('EditTool: Modify start');
      },
      onModifyEnd: function(event) {
        console.log('EditTool: Modify end');
      },
      onTranslateStart: function(event) {
        console.log('EditTool: Translate start');
      },
      onTranslatEend: function(event) {
        console.log('EditTool: Translate end');
      },
      onRemovedFeature: function(feature) {
        console.log('EditTool: Removed feature', feature);
      },
      onError: function(event) {
        console.log('EditTool: Error');
      },
      onSnapped: function(event) {
        console.log('EditTool: Snapped');
      }
    })

    const overView = new OverviewTool({
      onInitiated: function() {
        console.log('OverviewTool: Initiated');
        },
      onClicked: function() {
        console.log('OverviewTool: Clicked');
        },
      onBrowserStateCleared: function() {
        console.log('OverviewTool: State cleared');
      }
    })

    const graticule = new GraticuleTool({
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
    })
    const magnifyTool = new MagnifyTool({
      onInitiated: function() {
        console.log('MagnifyTool: Initiated');
        },
      onClicked: function() {
        console.log('MagnifyTool: Clicked');
        },
      onBrowserStateCleared: function() {
        console.log('MagnifyTool: State cleared');
      }
    })
    const helptool = new HelpTool({
      url: 'https://github.com/qulle/oltb',
      target: '_blank',
      onInitiated: function() {
        console.log('HelpTool: Initiated');
        },
      onClicked: function() {
        console.log('HelpTool: Clicked');
      }
    })

    const mylocation = new MyLocationTool({
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
      onLocationFound: function(location) {
        console.log('MyLocationTool: Location found', location);
        },
      onError: function(error) {
        console.log('MyLocationTool: Error', error);
      }
    })

    const debuginfo = new DebugInfoTool({
      onlyWhenGetParameter: false,
      onInitiated: function() {
        console.log('DebugInfoTool: Initiated');
        },
      onClicked: function() {
        console.log('DebugInfoTool: Clicked');
      }
    })
    function RemoveSubmenu (status){
      if(status){

        bookmarkTool.deactivateTool()
        graticule.deactivateTool()
        draw.deactivateTool()
        edit.deactivateTool()
        overView.deactivateTool()
        if(magnifyTool.onPostrenderListeners === undefined){
          console.log('Maginify no se desactiva')
        }else{
          magnifyTool.deactivateTool()
        }

        DOM.removeElement(themeTool.button)
        DOM.removeElement(bookmarkTool.button)
        DOM.removeElement(settingsTool.button)
        DOM.removeElement(exportPng.button)
        DOM.removeElement(fullScreen.button)
        DOM.removeElement(draw.button)
        DOM.removeElement(edit.button)
        DOM.removeElement(overView.button)
        DOM.removeElement(graticule.button)
        DOM.removeElement(magnifyTool.button)
        DOM.removeElement(helptool.button)
        DOM.removeElement(mylocation.button)
        DOM.removeElement(debuginfo.button)
      }
    }

    this.removeSubmenu = RemoveSubmenu;

    function AddMap(mapa){
      exportPng.setMap(mapa)
      fullScreen.setMap(mapa)
      draw.setMap(mapa)
      edit.setMap(mapa)
      overView.setMap(mapa)
      graticule.setMap(mapa)
      magnifyTool.setMap(mapa)
      helptool.setMap(mapa)
      mylocation.setMap(mapa)
    }

    this.addMap = AddMap;
  }
}
export {SubmenuTool}

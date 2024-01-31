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
import 'oltb/src/oltb/js/helpers/extensions/Cycle'
import 'oltb/src/oltb/js/helpers/prototypes/String'
import 'oltb/src/oltb/js/helpers/prototypes/SlideToggle'

// Core Toolbar
import 'oltb/src/oltb/scss/oltb.scss'
import {Settings} from 'oltb/src/oltb/js/helpers/constants/Settings'
import {ContextMenu} from 'oltb/src/oltb/js/common/ContextMenu'
import {LocalStorageKeys} from 'oltb/src/oltb/js/helpers/constants/LocalStorageKeys'

// Core Managers
import {LogManager} from 'oltb/src/oltb/js/managers/LogManager';
import {UrlManager} from 'oltb/src/oltb/js/managers/UrlManager'
import {ToolManager} from 'oltb/src/oltb/js/managers/ToolManager'
import {SnapManager} from 'oltb/src/oltb/js/managers/SnapManager'
import {StyleManager} from 'oltb/src/oltb/js/managers/StyleManager'
import {LayerManager} from 'oltb/src/oltb/js/managers/LayerManager';
import {StateManager} from 'oltb/src/oltb/js/managers/StateManager'
import {TippyManager} from 'oltb/src/oltb/js/managers/TippyManager'

</script>

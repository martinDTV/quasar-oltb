import {DOM} from 'oltb/src/oltb/js/helpers/browser/DOM';
import {Events} from 'oltb/src/oltb/js/helpers/constants/Events'
import { Control } from 'ol/control';
import {LogManager} from 'oltb/src/oltb/js/managers/LogManager';
import {StateManager} from 'oltb/src/oltb/js/managers/StateManager';
import {ShortcutKeys} from 'oltb/src/oltb/js/helpers/constants/ShortcutKeys';
import {ElementManager} from 'oltb/src/oltb/js/managers/ElementManager';
import {LocalStorageKeys} from 'oltb/src/oltb/js/helpers/constants/LocalStorageKeys';
import {SvgPaths, getIcon} from 'src/utils/Iconos/getIcon';
import {isShortcutKeyOnly} from 'oltb/src/oltb/js/helpers/browser/IsShortcutKeyOnly';
import { SubmenuTool } from 'src/utils/Herramientas/SubmenuTool';
//import {SubmenuTool} from 'src/utils/SubmenuTool';


const FILENAME = 'utils/ComponentSubmenu.js';
const CLASS_TOOL_BUTTON = 'oltb-tool-button';

const DefaultOptions = Object.freeze({
    onInitiated: undefined,
    onClicked: undefined,
    onBrowserStateCleared: undefined
});

const LocalStorageNodeName = LocalStorageKeys.splitViewTool;
const LocalStorageDefaults = Object.freeze({
    isActive: false,
});

/**
 * About:
 * Review two overlapping Map layers side by side
 *
 * Description:
 * Compares two different Map images and enables staggered overlap.
 */
class ComponentSubmenu extends Control {
    constructor(mapa,options = {}) {

        LogManager.logDebug(FILENAME, 'constructor', 'init');
        super({
            element: ElementManager.getToolbarElement()
        });

        this.map = mapa

        const icon = getIcon({
            path: SvgPaths.SubMenuIcon.stroked,
            class: `${CLASS_TOOL_BUTTON}__icon`
        });

        const button = DOM.createElement({
            element: 'button',
            html: icon,
            class: CLASS_TOOL_BUTTON,
            attributes: {
                type: 'button',
                'data-tippy-content': 'Submenu'
            },
            listeners: {
                'click':this.handleClick.bind(this)
            }
        });

        DOM.appendChildren(this.element, [
            button
        ]);

        this.submenu = null
        this.button = button;
        this.active = false;
        this.options = { ...DefaultOptions, ...options };


        this.localStorage = StateManager.getAndMergeStateObject(
            LocalStorageNodeName,
            LocalStorageDefaults
        );

        window.addEventListener(Events.browser.keyUp, this.onWindowKeyUp.bind(this));
        window.addEventListener(Events.browser.contentLoaded, this.onDOMContentLoaded.bind(this));
    }

    onDOMContentLoaded() {
        if(this.localStorage.active) {
            this.deActivateTool();
        }
    }

    onWindowKeyUp(event) {
        if(isShortcutKeyOnly(event, ShortcutKeys.scaleLineTool)) {
            this.handleClick(event);
        }
    }

    handleClick() {
        LogManager.logDebug(FILENAME, 'handleClick', 'User clicked tool');

        if(this.options.click instanceof Function) {
            this.options.click();
        }

        if(this.active){
            this.deActivateTool();


        }else {
            this.activateTool();


        }
    }
    activateTool() {
        this.active = true;
        this.button.classList.add(`${CLASS_TOOL_BUTTON}--active`);
        this.submenu = new SubmenuTool()
        this.submenu.addMap(this.map)
    }
    deActivateTool() {

        this.active = false;
        this.button.classList.remove(`${CLASS_TOOL_BUTTON}--active`);

        this.localStorage.active = false;
        StateManager.setStateObject(LocalStorageNodeName, this.localStorage);
        this.submenu.removeSubmenu(true)

    }

}

export { ComponentSubmenu };

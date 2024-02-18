import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, ViewChild, ViewEncapsulation, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { TimesIcon } from 'primeng/icons/times';
import { TimesCircleIcon } from 'primeng/icons/timescircle';
import { InputTextModule } from 'primeng/inputtext';
import { UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export const CHIPS_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Chips),
    multi: true
};
/**
 * Chips groups a collection of contents in tabs.
 * @group Components
 */
export class Chips {
    document;
    el;
    cd;
    /**
     * Inline style of the element.
     * @group Props
     */
    style;
    /**
     * Style class of the element.
     * @group Props
     */
    styleClass;
    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    disabled;
    /**
     * Name of the property to display on a chip.
     * @group Props
     */
    field;
    /**
     * Advisory information to display on input.
     * @group Props
     */
    placeholder;
    /**
     * Maximum number of entries allowed.
     * @group Props
     */
    max;
    /**
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    ariaLabel;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex;
    /**
     * Identifier of the focus input to match a label defined for the component.
     * @group Props
     */
    inputId;
    /**
     * Whether to allow duplicate values or not.
     * @group Props
     */
    allowDuplicate = true;
    /**
     * Defines whether duplication check should be case-sensitive
     * @group Props
     */
    caseSensitiveDuplication = true;
    /**
     * Inline style of the input field.
     * @group Props
     */
    inputStyle;
    /**
     * Style class of the input field.
     * @group Props
     */
    inputStyleClass;
    /**
     * Whether to add an item on tab key press.
     * @group Props
     */
    addOnTab;
    /**
     * Whether to add an item when the input loses focus.
     * @group Props
     */
    addOnBlur;
    /**
     * Separator char to add an item when pressed in addition to the enter key.
     * @group Props
     */
    separator;
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @group Props
     */
    showClear = false;
    /**
     * Callback to invoke on chip add.
     * @param {ChipsAddEvent} event - Custom chip add event.
     * @group Emits
     */
    onAdd = new EventEmitter();
    /**
     * Callback to invoke on chip remove.
     * @param {ChipsRemoveEvent} event - Custom chip remove event.
     * @group Emits
     */
    onRemove = new EventEmitter();
    /**
     * Callback to invoke on focus of input field.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onFocus = new EventEmitter();
    /**
     * Callback to invoke on blur of input field.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onBlur = new EventEmitter();
    /**
     * Callback to invoke on chip clicked.
     * @param {ChipsClickEvent} event - Custom chip click event.
     * @group Emits
     */
    onChipClick = new EventEmitter();
    /**
     * Callback to invoke on clear token clicked.
     * @group Emits
     */
    onClear = new EventEmitter();
    inputViewChild;
    containerViewChild;
    templates;
    itemTemplate;
    removeTokenIconTemplate;
    clearIconTemplate;
    value;
    onModelChange = () => { };
    onModelTouched = () => { };
    valueChanged;
    id = UniqueComponentId();
    focused;
    focusedIndex;
    filled;
    get focusedOptionId() {
        return this.focusedIndex !== null ? `${this.id}_chips_item_${this.focusedIndex}` : null;
    }
    get isMaxedOut() {
        return this.max && this.value && this.max === this.value.length;
    }
    constructor(document, el, cd) {
        this.document = document;
        this.el = el;
        this.cd = cd;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                case 'removetokenicon':
                    this.removeTokenIconTemplate = item.template;
                    break;
                case 'clearicon':
                    this.clearIconTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
        this.updateFilledState();
    }
    onWrapperClick() {
        this.inputViewChild?.nativeElement.focus();
    }
    onContainerFocus() {
        this.focused = true;
    }
    onContainerBlur() {
        this.focusedIndex = -1;
        this.focused = false;
    }
    onContainerKeyDown(event) {
        switch (event.code) {
            case 'ArrowLeft':
                this.onArrowLeftKeyOn();
                break;
            case 'ArrowRight':
                this.onArrowRightKeyOn();
                break;
            case 'Backspace':
                this.onBackspaceKeyOn(event);
                break;
            default:
                break;
        }
    }
    onArrowLeftKeyOn() {
        if (this.inputViewChild.nativeElement.value.length === 0 && this.value && this.value.length > 0) {
            this.focusedIndex = this.focusedIndex === null ? this.value.length - 1 : this.focusedIndex - 1;
            if (this.focusedIndex < 0)
                this.focusedIndex = 0;
        }
    }
    onArrowRightKeyOn() {
        if (this.inputViewChild.nativeElement.value.length === 0 && this.value && this.value.length > 0) {
            if (this.focusedIndex === this.value.length - 1) {
                this.focusedIndex = null;
                this.inputViewChild?.nativeElement.focus();
            }
            else {
                this.focusedIndex++;
            }
        }
    }
    onBackspaceKeyOn(event) {
        if (this.focusedIndex !== null) {
            this.removeItem(event, this.focusedIndex);
        }
    }
    onInput() {
        this.updateFilledState();
        this.focusedIndex = null;
    }
    onPaste(event) {
        if (!this.disabled) {
            if (this.separator) {
                const pastedData = (event.clipboardData || this.document.defaultView['clipboardData']).getData('Text');
                pastedData.split(this.separator).forEach((val) => {
                    this.addItem(event, val, true);
                });
                this.inputViewChild.nativeElement.value = '';
            }
            this.updateFilledState();
        }
    }
    updateFilledState() {
        if (!this.value || this.value.length === 0) {
            this.filled = this.inputViewChild && this.inputViewChild.nativeElement && this.inputViewChild.nativeElement.value != '';
        }
        else {
            this.filled = true;
        }
    }
    onItemClick(event, item) {
        this.onChipClick.emit({
            originalEvent: event,
            value: item
        });
    }
    writeValue(value) {
        this.value = value;
        this.updateMaxedOut();
        this.updateFilledState();
        this.cd.markForCheck();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(val) {
        this.disabled = val;
        this.cd.markForCheck();
    }
    resolveFieldData(data, field) {
        if (data && field) {
            if (field.indexOf('.') == -1) {
                return data[field];
            }
            else {
                let fields = field.split('.');
                let value = data;
                for (var i = 0, len = fields.length; i < len; ++i) {
                    value = value[fields[i]];
                }
                return value;
            }
        }
        else {
            return null;
        }
    }
    onInputFocus(event) {
        this.focused = true;
        this.focusedIndex = null;
        this.onFocus.emit(event);
    }
    onInputBlur(event) {
        this.focused = false;
        this.focusedIndex = null;
        if (this.addOnBlur && this.inputViewChild.nativeElement.value) {
            this.addItem(event, this.inputViewChild.nativeElement.value, false);
        }
        this.onModelTouched();
        this.onBlur.emit(event);
    }
    removeItem(event, index) {
        if (this.disabled) {
            return;
        }
        let removedItem = this.value[index];
        this.value = this.value.filter((val, i) => i != index);
        this.focusedIndex = null;
        this.inputViewChild.nativeElement.focus();
        this.onModelChange(this.value);
        this.onRemove.emit({
            originalEvent: event,
            value: removedItem
        });
        this.updateFilledState();
        this.updateMaxedOut();
    }
    addItem(event, item, preventDefault) {
        this.value = this.value || [];
        if (item && item.trim().length) {
            const newItemIsDuplicate = this.caseSensitiveDuplication ? this.value.includes(item) : this.value.some((val) => val.toLowerCase() === item.toLowerCase());
            if ((this.allowDuplicate || !newItemIsDuplicate) && !this.isMaxedOut) {
                this.value = [...this.value, item];
                this.onModelChange(this.value);
                this.onAdd.emit({
                    originalEvent: event,
                    value: item
                });
            }
        }
        this.updateFilledState();
        this.updateMaxedOut();
        this.inputViewChild.nativeElement.value = '';
        if (preventDefault) {
            event.preventDefault();
        }
    }
    clear() {
        this.value = null;
        this.updateFilledState();
        this.onModelChange(this.value);
        this.updateMaxedOut();
        this.onClear.emit();
    }
    onKeyDown(event) {
        const inputValue = event.target.value;
        switch (event.code) {
            case 'Backspace':
                if (inputValue.length === 0 && this.value && this.value.length > 0) {
                    if (this.focusedIndex !== null) {
                        this.removeItem(event, this.focusedIndex);
                    }
                    else
                        this.removeItem(event, this.value.length - 1);
                }
                break;
            case 'Enter':
            case 'NumpadEnter':
                if (inputValue && inputValue.trim().length && !this.isMaxedOut) {
                    this.addItem(event, inputValue, true);
                }
                break;
            case 'Tab':
                if (this.addOnTab && inputValue && inputValue.trim().length && !this.isMaxedOut) {
                    this.addItem(event, inputValue, true);
                    event.preventDefault();
                }
                break;
            case 'ArrowLeft':
                if (inputValue.length === 0 && this.value && this.value.length > 0) {
                    this.containerViewChild?.nativeElement.focus();
                }
                break;
            case 'ArrowRight':
                event.stopPropagation();
                break;
            default:
                if (this.separator) {
                    if (this.separator === event.key || event.key.match(this.separator)) {
                        this.addItem(event, inputValue, true);
                    }
                }
                break;
        }
    }
    updateMaxedOut() {
        if (this.inputViewChild && this.inputViewChild.nativeElement) {
            if (this.isMaxedOut) {
                // Calling `blur` is necessary because firefox does not call `onfocus` events
                // for disabled inputs, unlike chromium browsers.
                this.inputViewChild.nativeElement.blur();
                this.inputViewChild.nativeElement.disabled = true;
            }
            else {
                if (this.disabled) {
                    this.inputViewChild.nativeElement.blur();
                }
                this.inputViewChild.nativeElement.disabled = this.disabled || false;
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Chips, deps: [{ token: DOCUMENT }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: Chips, selector: "p-chips", inputs: { style: "style", styleClass: "styleClass", disabled: "disabled", field: "field", placeholder: "placeholder", max: "max", ariaLabel: "ariaLabel", ariaLabelledBy: "ariaLabelledBy", tabindex: "tabindex", inputId: "inputId", allowDuplicate: "allowDuplicate", caseSensitiveDuplication: "caseSensitiveDuplication", inputStyle: "inputStyle", inputStyleClass: "inputStyleClass", addOnTab: "addOnTab", addOnBlur: "addOnBlur", separator: "separator", showClear: "showClear" }, outputs: { onAdd: "onAdd", onRemove: "onRemove", onFocus: "onFocus", onBlur: "onBlur", onChipClick: "onChipClick", onClear: "onClear" }, host: { properties: { "class.p-inputwrapper-filled": "filled", "class.p-inputwrapper-focus": "focused", "class.p-chips-clearable": "showClear" }, classAttribute: "p-element p-inputwrapper" }, providers: [CHIPS_VALUE_ACCESSOR], queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "inputViewChild", first: true, predicate: ["inputtext"], descendants: true }, { propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }], ngImport: i0, template: `
        <div
            [ngClass]="{
                'p-chips p-component p-input-wrapper': true,
                'p-disabled': disabled,
                'p-focus': focused,
                'p-inputwrapper-filled': (value && value.length) || (this.inputViewChild?.nativeElement.value && this.inputViewChild?.nativeElement.value.length),
                'p-inputwrapper-focus': focused,
            }"
            [ngStyle]="style"
            [class]="styleClass"
            [attr.data-pc-name]="'chips'"
            [attr.data-pc-section]="'root'"
        >
            <ul
                #container
                [ngClass]="{ 'p-inputtext p-chips-multiple-container': true }"
                tabindex="-1"
                role="listbox"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.aria-label]="ariaLabel"
                [attr.aria-activedescendant]="focused ? focusedOptionId : undefined"
                [attr.aria-orientation]="'horizontal'"
                (click)="onWrapperClick()"
                (focus)="onContainerFocus()"
                (blur)="onContainerBlur()"
                (keydown)="onContainerKeyDown($event)"
                [attr.data-pc-section]="'container'"
            >
                <li
                    #token
                    *ngFor="let item of value; let i = index"
                    [attr.id]="id + '_chips_item_' + i"
                    role="option"
                    [attr.ariaLabel]="item"
                    [attr.aria-selected]="true"
                    [attr.aria-setsize]="value.length"
                    [attr.aria-posinset]="i + 1"
                    [attr.data-p-focused]="focusedIndex === i"
                    [ngClass]="{ 'p-chips-token': true, 'p-focus': focusedIndex === i }"
                    (click)="onItemClick($event, item)"
                    [attr.data-pc-section]="'token'"
                >
                    <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"></ng-container>
                    <span *ngIf="!itemTemplate" class="p-chips-token-label" [attr.data-pc-section]="'label'">{{ field ? resolveFieldData(item, field) : item }}</span>
                    <ng-container *ngIf="!disabled">
                        <TimesCircleIcon [styleClass]="'p-chips-token-icon'" *ngIf="!removeTokenIconTemplate" (click)="removeItem($event, i)" [attr.data-pc-section]="'removeTokenIcon'" [attr.aria-hidden]="true" />
                        <span *ngIf="removeTokenIconTemplate" class="p-chips-token-icon" (click)="removeItem($event, i)" [attr.data-pc-section]="'removeTokenIcon'" [attr.aria-hidden]="true">
                            <ng-template *ngTemplateOutlet="removeTokenIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                </li>
                <li class="p-chips-input-token" [ngClass]="{ 'p-chips-clearable': showClear && !disabled }" [attr.data-pc-section]="'inputToken'" role="option">
                    <input
                        #inputtext
                        type="text"
                        [attr.id]="inputId"
                        [attr.placeholder]="value && value.length ? null : placeholder"
                        [attr.tabindex]="tabindex"
                        (keydown)="onKeyDown($event)"
                        (input)="onInput()"
                        (paste)="onPaste($event)"
                        (focus)="onInputFocus($event)"
                        (blur)="onInputBlur($event)"
                        [disabled]="disabled || isMaxedOut"
                        [ngStyle]="inputStyle"
                        [class]="inputStyleClass"
                    />
                </li>
                <li *ngIf="value != null && filled && !disabled && showClear">
                    <TimesIcon *ngIf="!clearIconTemplate" [styleClass]="'p-chips-clear-icon'" (click)="clear()" />
                    <span *ngIf="clearIconTemplate" class="p-chips-clear-icon" (click)="clear()">
                        <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                    </span>
                </li>
            </ul>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-chips{display:inline-flex}.p-chips-multiple-container{margin:0;padding:0;list-style-type:none;cursor:text;overflow:hidden;display:flex;align-items:center;flex-wrap:wrap}.p-chips-token{cursor:default;display:inline-flex;align-items:center;flex:0 0 auto;max-width:100%}.p-chips-token-label{min-width:0%;overflow:auto}.p-chips-token-label::-webkit-scrollbar{display:none}.p-chips-input-token{flex:1 1 auto;display:inline-flex}.p-chips-token-icon{cursor:pointer}.p-chips-input-token input{border:0 none;outline:0 none;background-color:transparent;margin:0;padding:0;box-shadow:none;border-radius:0;width:100%}.p-fluid .p-chips{display:flex}.p-chips-clear-icon{position:absolute;top:50%;margin-top:-.5rem;cursor:pointer}.p-chips-clearable .p-inputtext{position:relative}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i0.forwardRef(() => TimesCircleIcon), selector: "TimesCircleIcon" }, { kind: "component", type: i0.forwardRef(() => TimesIcon), selector: "TimesIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Chips, decorators: [{
            type: Component,
            args: [{ selector: 'p-chips', template: `
        <div
            [ngClass]="{
                'p-chips p-component p-input-wrapper': true,
                'p-disabled': disabled,
                'p-focus': focused,
                'p-inputwrapper-filled': (value && value.length) || (this.inputViewChild?.nativeElement.value && this.inputViewChild?.nativeElement.value.length),
                'p-inputwrapper-focus': focused,
            }"
            [ngStyle]="style"
            [class]="styleClass"
            [attr.data-pc-name]="'chips'"
            [attr.data-pc-section]="'root'"
        >
            <ul
                #container
                [ngClass]="{ 'p-inputtext p-chips-multiple-container': true }"
                tabindex="-1"
                role="listbox"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.aria-label]="ariaLabel"
                [attr.aria-activedescendant]="focused ? focusedOptionId : undefined"
                [attr.aria-orientation]="'horizontal'"
                (click)="onWrapperClick()"
                (focus)="onContainerFocus()"
                (blur)="onContainerBlur()"
                (keydown)="onContainerKeyDown($event)"
                [attr.data-pc-section]="'container'"
            >
                <li
                    #token
                    *ngFor="let item of value; let i = index"
                    [attr.id]="id + '_chips_item_' + i"
                    role="option"
                    [attr.ariaLabel]="item"
                    [attr.aria-selected]="true"
                    [attr.aria-setsize]="value.length"
                    [attr.aria-posinset]="i + 1"
                    [attr.data-p-focused]="focusedIndex === i"
                    [ngClass]="{ 'p-chips-token': true, 'p-focus': focusedIndex === i }"
                    (click)="onItemClick($event, item)"
                    [attr.data-pc-section]="'token'"
                >
                    <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"></ng-container>
                    <span *ngIf="!itemTemplate" class="p-chips-token-label" [attr.data-pc-section]="'label'">{{ field ? resolveFieldData(item, field) : item }}</span>
                    <ng-container *ngIf="!disabled">
                        <TimesCircleIcon [styleClass]="'p-chips-token-icon'" *ngIf="!removeTokenIconTemplate" (click)="removeItem($event, i)" [attr.data-pc-section]="'removeTokenIcon'" [attr.aria-hidden]="true" />
                        <span *ngIf="removeTokenIconTemplate" class="p-chips-token-icon" (click)="removeItem($event, i)" [attr.data-pc-section]="'removeTokenIcon'" [attr.aria-hidden]="true">
                            <ng-template *ngTemplateOutlet="removeTokenIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                </li>
                <li class="p-chips-input-token" [ngClass]="{ 'p-chips-clearable': showClear && !disabled }" [attr.data-pc-section]="'inputToken'" role="option">
                    <input
                        #inputtext
                        type="text"
                        [attr.id]="inputId"
                        [attr.placeholder]="value && value.length ? null : placeholder"
                        [attr.tabindex]="tabindex"
                        (keydown)="onKeyDown($event)"
                        (input)="onInput()"
                        (paste)="onPaste($event)"
                        (focus)="onInputFocus($event)"
                        (blur)="onInputBlur($event)"
                        [disabled]="disabled || isMaxedOut"
                        [ngStyle]="inputStyle"
                        [class]="inputStyleClass"
                    />
                </li>
                <li *ngIf="value != null && filled && !disabled && showClear">
                    <TimesIcon *ngIf="!clearIconTemplate" [styleClass]="'p-chips-clear-icon'" (click)="clear()" />
                    <span *ngIf="clearIconTemplate" class="p-chips-clear-icon" (click)="clear()">
                        <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                    </span>
                </li>
            </ul>
        </div>
    `, host: {
                        class: 'p-element p-inputwrapper',
                        '[class.p-inputwrapper-filled]': 'filled',
                        '[class.p-inputwrapper-focus]': 'focused',
                        '[class.p-chips-clearable]': 'showClear'
                    }, providers: [CHIPS_VALUE_ACCESSOR], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: ["@layer primeng{.p-chips{display:inline-flex}.p-chips-multiple-container{margin:0;padding:0;list-style-type:none;cursor:text;overflow:hidden;display:flex;align-items:center;flex-wrap:wrap}.p-chips-token{cursor:default;display:inline-flex;align-items:center;flex:0 0 auto;max-width:100%}.p-chips-token-label{min-width:0%;overflow:auto}.p-chips-token-label::-webkit-scrollbar{display:none}.p-chips-input-token{flex:1 1 auto;display:inline-flex}.p-chips-token-icon{cursor:pointer}.p-chips-input-token input{border:0 none;outline:0 none;background-color:transparent;margin:0;padding:0;box-shadow:none;border-radius:0;width:100%}.p-fluid .p-chips{display:flex}.p-chips-clear-icon{position:absolute;top:50%;margin-top:-.5rem;cursor:pointer}.p-chips-clearable .p-inputtext{position:relative}}\n"] }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }], propDecorators: { style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], disabled: [{
                type: Input
            }], field: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], max: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], inputId: [{
                type: Input
            }], allowDuplicate: [{
                type: Input
            }], caseSensitiveDuplication: [{
                type: Input
            }], inputStyle: [{
                type: Input
            }], inputStyleClass: [{
                type: Input
            }], addOnTab: [{
                type: Input
            }], addOnBlur: [{
                type: Input
            }], separator: [{
                type: Input
            }], showClear: [{
                type: Input
            }], onAdd: [{
                type: Output
            }], onRemove: [{
                type: Output
            }], onFocus: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], onChipClick: [{
                type: Output
            }], onClear: [{
                type: Output
            }], inputViewChild: [{
                type: ViewChild,
                args: ['inputtext']
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class ChipsModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ChipsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: ChipsModule, declarations: [Chips], imports: [CommonModule, InputTextModule, SharedModule, TimesCircleIcon, TimesIcon], exports: [Chips, InputTextModule, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ChipsModule, imports: [CommonModule, InputTextModule, SharedModule, TimesCircleIcon, TimesIcon, InputTextModule, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ChipsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, InputTextModule, SharedModule, TimesCircleIcon, TimesIcon],
                    exports: [Chips, InputTextModule, SharedModule],
                    declarations: [Chips]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvY2hpcHMvY2hpcHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQW9CLHVCQUF1QixFQUFxQixTQUFTLEVBQUUsZUFBZSxFQUFjLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQTBCLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdFAsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzFELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRXBELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBR2xELE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFRO0lBQ3JDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7SUFDcEMsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBQ0Y7OztHQUdHO0FBNEZILE1BQU0sT0FBTyxLQUFLO0lBbUt3QjtJQUEyQjtJQUF1QjtJQWxLeEY7OztPQUdHO0lBQ00sS0FBSyxDQUE4QztJQUM1RDs7O09BR0c7SUFDTSxVQUFVLENBQXFCO0lBQ3hDOzs7T0FHRztJQUNNLFFBQVEsQ0FBc0I7SUFDdkM7OztPQUdHO0lBQ00sS0FBSyxDQUFxQjtJQUNuQzs7O09BR0c7SUFDTSxXQUFXLENBQXFCO0lBQ3pDOzs7T0FHRztJQUNNLEdBQUcsQ0FBcUI7SUFDakM7OztPQUdHO0lBQ00sU0FBUyxDQUFxQjtJQUN2Qzs7O09BR0c7SUFDTSxjQUFjLENBQXFCO0lBQzVDOzs7T0FHRztJQUNNLFFBQVEsQ0FBcUI7SUFDdEM7OztPQUdHO0lBQ00sT0FBTyxDQUFxQjtJQUNyQzs7O09BR0c7SUFDTSxjQUFjLEdBQVksSUFBSSxDQUFDO0lBQ3hDOzs7T0FHRztJQUNNLHdCQUF3QixHQUFZLElBQUksQ0FBQztJQUNsRDs7O09BR0c7SUFDTSxVQUFVLENBQThDO0lBQ2pFOzs7T0FHRztJQUNNLGVBQWUsQ0FBcUI7SUFDN0M7OztPQUdHO0lBQ00sUUFBUSxDQUFzQjtJQUN2Qzs7O09BR0c7SUFDTSxTQUFTLENBQXNCO0lBQ3hDOzs7T0FHRztJQUNNLFNBQVMsQ0FBOEI7SUFDaEQ7OztPQUdHO0lBQ00sU0FBUyxHQUFZLEtBQUssQ0FBQztJQUNwQzs7OztPQUlHO0lBQ08sS0FBSyxHQUFnQyxJQUFJLFlBQVksRUFBaUIsQ0FBQztJQUNqRjs7OztPQUlHO0lBQ08sUUFBUSxHQUFtQyxJQUFJLFlBQVksRUFBb0IsQ0FBQztJQUMxRjs7OztPQUlHO0lBQ08sT0FBTyxHQUF3QixJQUFJLFlBQVksRUFBUyxDQUFDO0lBQ25FOzs7O09BSUc7SUFDTyxNQUFNLEdBQXdCLElBQUksWUFBWSxFQUFTLENBQUM7SUFDbEU7Ozs7T0FJRztJQUNPLFdBQVcsR0FBa0MsSUFBSSxZQUFZLEVBQW1CLENBQUM7SUFDM0Y7OztPQUdHO0lBQ08sT0FBTyxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO0lBRXZDLGNBQWMsQ0FBYztJQUU1QixrQkFBa0IsQ0FBYztJQUV4QixTQUFTLENBQWtCO0lBRXBELFlBQVksQ0FBNkI7SUFFaEQsdUJBQXVCLENBQTZCO0lBRXBELGlCQUFpQixDQUE2QjtJQUU5QyxLQUFLLENBQU07SUFFWCxhQUFhLEdBQWEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0lBRW5DLGNBQWMsR0FBYSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7SUFFcEMsWUFBWSxDQUFvQjtJQUVoQyxFQUFFLEdBQUcsaUJBQWlCLEVBQUUsQ0FBQztJQUV6QixPQUFPLENBQW9CO0lBRTNCLFlBQVksQ0FBbUI7SUFFL0IsTUFBTSxDQUFvQjtJQUUxQixJQUFJLGVBQWU7UUFDZixPQUFPLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLGVBQWUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDNUYsQ0FBQztJQUVELElBQUksVUFBVTtRQUNWLE9BQU8sSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDcEUsQ0FBQztJQUVELFlBQXNDLFFBQWtCLEVBQVMsRUFBYyxFQUFTLEVBQXFCO1FBQXZFLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBUyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVMsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7SUFBRyxDQUFDO0lBRWpILGtCQUFrQjtRQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDNUIsUUFBUSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ3BCLEtBQUssTUFBTTtvQkFDUCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ2xDLE1BQU07Z0JBRVYsS0FBSyxpQkFBaUI7b0JBQ2xCLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUM3QyxNQUFNO2dCQUVWLEtBQUssV0FBVztvQkFDWixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDdkMsTUFBTTtnQkFFVjtvQkFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ2xDLE1BQU07YUFDYjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELGNBQWM7UUFDVixJQUFJLENBQUMsY0FBYyxFQUFFLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBRUQsZ0JBQWdCO1FBQ1osSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBQztJQUVELGVBQWU7UUFDWCxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxLQUFLO1FBQ3BCLFFBQVEsS0FBSyxDQUFDLElBQUksRUFBRTtZQUNoQixLQUFLLFdBQVc7Z0JBQ1osSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3hCLE1BQU07WUFFVixLQUFLLFlBQVk7Z0JBQ2IsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3pCLE1BQU07WUFFVixLQUFLLFdBQVc7Z0JBQ1osSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM3QixNQUFNO1lBRVY7Z0JBQ0ksTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQUVELGdCQUFnQjtRQUNaLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDN0YsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztZQUMvRixJQUFJLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQztnQkFBRSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztTQUNwRDtJQUNMLENBQUM7SUFFRCxpQkFBaUI7UUFDYixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzdGLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzdDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2dCQUN6QixJQUFJLENBQUMsY0FBYyxFQUFFLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUM5QztpQkFBTTtnQkFDSCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDdkI7U0FDSjtJQUNMLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxLQUFLO1FBQ2xCLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzdDO0lBQ0wsQ0FBQztJQUVELE9BQU87UUFDSCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUM3QixDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQVU7UUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2hCLE1BQU0sVUFBVSxHQUFXLENBQUMsS0FBSyxDQUFDLGFBQWEsSUFBSyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQW1CLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3hILFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO29CQUNsRCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ25DLENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7YUFDaEQ7WUFFRCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFFRCxpQkFBaUI7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDeEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7U0FDM0g7YUFBTTtZQUNILElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFZLEVBQUUsSUFBUztRQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUNsQixhQUFhLEVBQUUsS0FBSztZQUNwQixLQUFLLEVBQUUsSUFBSTtTQUNkLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBVTtRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsRUFBWTtRQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBWTtRQUMxQixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsR0FBWTtRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxJQUFTLEVBQUUsS0FBYTtRQUNyQyxJQUFJLElBQUksSUFBSSxLQUFLLEVBQUU7WUFDZixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7Z0JBQzFCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3RCO2lCQUFNO2dCQUNILElBQUksTUFBTSxHQUFhLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3hDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDakIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRTtvQkFDL0MsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDNUI7Z0JBQ0QsT0FBTyxLQUFLLENBQUM7YUFDaEI7U0FDSjthQUFNO1lBQ0gsT0FBTyxJQUFJLENBQUM7U0FDZjtJQUNMLENBQUM7SUFFRCxZQUFZLENBQUMsS0FBaUI7UUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFpQjtRQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFO1lBQzNELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN2RTtRQUNELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQVksRUFBRSxLQUFhO1FBQ2xDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLE9BQU87U0FDVjtRQUVELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQVEsRUFBRSxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUUxQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUNmLGFBQWEsRUFBRSxLQUFLO1lBQ3BCLEtBQUssRUFBRSxXQUFXO1NBQ3JCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQVksRUFBRSxJQUFZLEVBQUUsY0FBdUI7UUFDdkQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUU5QixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFO1lBQzVCLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUUxSixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNsRSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7b0JBQ1osYUFBYSxFQUFFLEtBQUs7b0JBQ3BCLEtBQUssRUFBRSxJQUFJO2lCQUNkLENBQUMsQ0FBQzthQUNOO1NBQ0o7UUFFRCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUU3QyxJQUFJLGNBQWMsRUFBRTtZQUNoQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDMUI7SUFDTCxDQUFDO0lBRUQsS0FBSztRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBSztRQUNYLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBRXRDLFFBQVEsS0FBSyxDQUFDLElBQUksRUFBRTtZQUNoQixLQUFLLFdBQVc7Z0JBQ1osSUFBSSxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDaEUsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksRUFBRTt3QkFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO3FCQUM3Qzs7d0JBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQ3hEO2dCQUVELE1BQU07WUFFVixLQUFLLE9BQU8sQ0FBQztZQUNiLEtBQUssYUFBYTtnQkFDZCxJQUFJLFVBQVUsSUFBSSxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtvQkFDNUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUN6QztnQkFFRCxNQUFNO1lBRVYsS0FBSyxLQUFLO2dCQUNOLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxVQUFVLElBQUksVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7b0JBQzdFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDdEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2lCQUMxQjtnQkFFRCxNQUFNO1lBRVYsS0FBSyxXQUFXO2dCQUNaLElBQUksVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ2hFLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ2xEO2dCQUVELE1BQU07WUFFVixLQUFLLFlBQVk7Z0JBQ2IsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN4QixNQUFNO1lBRVY7Z0JBQ0ksSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO29CQUNoQixJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssS0FBSyxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7d0JBQ2pFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztxQkFDekM7aUJBQ0o7Z0JBRUQsTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQUVELGNBQWM7UUFDVixJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUU7WUFDMUQsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNqQiw2RUFBNkU7Z0JBQzdFLGlEQUFpRDtnQkFDakQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7YUFDckQ7aUJBQU07Z0JBQ0gsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNmLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUM1QztnQkFFRCxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUM7YUFDdkU7U0FDSjtJQUNMLENBQUM7dUdBbGNRLEtBQUssa0JBbUtNLFFBQVE7MkZBbktuQixLQUFLLHUwQkFMSCxDQUFDLG9CQUFvQixDQUFDLG9EQXdJaEIsYUFBYSw0T0E1TnBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQTZFVCxvaERBa2RzRCxlQUFlLGlGQUFFLFNBQVM7OzJGQXRjeEUsS0FBSztrQkEzRmpCLFNBQVM7K0JBQ0ksU0FBUyxZQUNUOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQTZFVCxRQUNLO3dCQUNGLEtBQUssRUFBRSwwQkFBMEI7d0JBQ2pDLCtCQUErQixFQUFFLFFBQVE7d0JBQ3pDLDhCQUE4QixFQUFFLFNBQVM7d0JBQ3pDLDJCQUEyQixFQUFFLFdBQVc7cUJBQzNDLGFBQ1UsQ0FBQyxvQkFBb0IsQ0FBQyxtQkFDaEIsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSTs7MEJBc0t4QixNQUFNOzJCQUFDLFFBQVE7a0dBOUpuQixLQUFLO3NCQUFiLEtBQUs7Z0JBS0csVUFBVTtzQkFBbEIsS0FBSztnQkFLRyxRQUFRO3NCQUFoQixLQUFLO2dCQUtHLEtBQUs7c0JBQWIsS0FBSztnQkFLRyxXQUFXO3NCQUFuQixLQUFLO2dCQUtHLEdBQUc7c0JBQVgsS0FBSztnQkFLRyxTQUFTO3NCQUFqQixLQUFLO2dCQUtHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBS0csUUFBUTtzQkFBaEIsS0FBSztnQkFLRyxPQUFPO3NCQUFmLEtBQUs7Z0JBS0csY0FBYztzQkFBdEIsS0FBSztnQkFLRyx3QkFBd0I7c0JBQWhDLEtBQUs7Z0JBS0csVUFBVTtzQkFBbEIsS0FBSztnQkFLRyxlQUFlO3NCQUF2QixLQUFLO2dCQUtHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBS0csU0FBUztzQkFBakIsS0FBSztnQkFLRyxTQUFTO3NCQUFqQixLQUFLO2dCQUtHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBTUksS0FBSztzQkFBZCxNQUFNO2dCQU1HLFFBQVE7c0JBQWpCLE1BQU07Z0JBTUcsT0FBTztzQkFBaEIsTUFBTTtnQkFNRyxNQUFNO3NCQUFmLE1BQU07Z0JBTUcsV0FBVztzQkFBcEIsTUFBTTtnQkFLRyxPQUFPO3NCQUFoQixNQUFNO2dCQUVpQixjQUFjO3NCQUFyQyxTQUFTO3VCQUFDLFdBQVc7Z0JBRUUsa0JBQWtCO3NCQUF6QyxTQUFTO3VCQUFDLFdBQVc7Z0JBRVUsU0FBUztzQkFBeEMsZUFBZTt1QkFBQyxhQUFhOztBQXVVbEMsTUFBTSxPQUFPLFdBQVc7dUdBQVgsV0FBVzt3R0FBWCxXQUFXLGlCQTFjWCxLQUFLLGFBc2NKLFlBQVksRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxTQUFTLGFBdGN4RSxLQUFLLEVBdWNHLGVBQWUsRUFBRSxZQUFZO3dHQUdyQyxXQUFXLFlBSlYsWUFBWSxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFDaEUsZUFBZSxFQUFFLFlBQVk7OzJGQUdyQyxXQUFXO2tCQUx2QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxTQUFTLENBQUM7b0JBQ2xGLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxlQUFlLEVBQUUsWUFBWSxDQUFDO29CQUMvQyxZQUFZLEVBQUUsQ0FBQyxLQUFLLENBQUM7aUJBQ3hCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5wdXQsIE5nTW9kdWxlLCBPdXRwdXQsIFF1ZXJ5TGlzdCwgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb24sIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFByaW1lVGVtcGxhdGUsIFNoYXJlZE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IFRpbWVzSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvdGltZXMnO1xuaW1wb3J0IHsgVGltZXNDaXJjbGVJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy90aW1lc2NpcmNsZSc7XG5pbXBvcnQgeyBJbnB1dFRleHRNb2R1bGUgfSBmcm9tICdwcmltZW5nL2lucHV0dGV4dCc7XG5pbXBvcnQgeyBOdWxsYWJsZSB9IGZyb20gJ3ByaW1lbmcvdHMtaGVscGVycyc7XG5pbXBvcnQgeyBVbmlxdWVDb21wb25lbnRJZCB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuaW1wb3J0IHsgQ2hpcHNBZGRFdmVudCwgQ2hpcHNDbGlja0V2ZW50LCBDaGlwc1JlbW92ZUV2ZW50IH0gZnJvbSAnLi9jaGlwcy5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY29uc3QgQ0hJUFNfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBDaGlwcyksXG4gICAgbXVsdGk6IHRydWVcbn07XG4vKipcbiAqIENoaXBzIGdyb3VwcyBhIGNvbGxlY3Rpb24gb2YgY29udGVudHMgaW4gdGFicy5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1jaGlwcycsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwie1xuICAgICAgICAgICAgICAgICdwLWNoaXBzIHAtY29tcG9uZW50IHAtaW5wdXQtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgJ3AtZGlzYWJsZWQnOiBkaXNhYmxlZCxcbiAgICAgICAgICAgICAgICAncC1mb2N1cyc6IGZvY3VzZWQsXG4gICAgICAgICAgICAgICAgJ3AtaW5wdXR3cmFwcGVyLWZpbGxlZCc6ICh2YWx1ZSAmJiB2YWx1ZS5sZW5ndGgpIHx8ICh0aGlzLmlucHV0Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50LnZhbHVlICYmIHRoaXMuaW5wdXRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQudmFsdWUubGVuZ3RoKSxcbiAgICAgICAgICAgICAgICAncC1pbnB1dHdyYXBwZXItZm9jdXMnOiBmb2N1c2VkLFxuICAgICAgICAgICAgfVwiXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJzdHlsZVwiXG4gICAgICAgICAgICBbY2xhc3NdPVwic3R5bGVDbGFzc1wiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLXBjLW5hbWVdPVwiJ2NoaXBzJ1wiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3Jvb3QnXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPHVsXG4gICAgICAgICAgICAgICAgI2NvbnRhaW5lclxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtaW5wdXR0ZXh0IHAtY2hpcHMtbXVsdGlwbGUtY29udGFpbmVyJzogdHJ1ZSB9XCJcbiAgICAgICAgICAgICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgICAgICAgICAgICByb2xlPVwibGlzdGJveFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImFyaWFMYWJlbGxlZEJ5XCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1hY3RpdmVkZXNjZW5kYW50XT1cImZvY3VzZWQgPyBmb2N1c2VkT3B0aW9uSWQgOiB1bmRlZmluZWRcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtb3JpZW50YXRpb25dPVwiJ2hvcml6b250YWwnXCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwib25XcmFwcGVyQ2xpY2soKVwiXG4gICAgICAgICAgICAgICAgKGZvY3VzKT1cIm9uQ29udGFpbmVyRm9jdXMoKVwiXG4gICAgICAgICAgICAgICAgKGJsdXIpPVwib25Db250YWluZXJCbHVyKClcIlxuICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uQ29udGFpbmVyS2V5RG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2NvbnRhaW5lcidcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICAgICAgICAjdG9rZW5cbiAgICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgdmFsdWU7IGxldCBpID0gaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5pZF09XCJpZCArICdfY2hpcHNfaXRlbV8nICsgaVwiXG4gICAgICAgICAgICAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhTGFiZWxdPVwiaXRlbVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtc2V0c2l6ZV09XCJ2YWx1ZS5sZW5ndGhcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXBvc2luc2V0XT1cImkgKyAxXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wLWZvY3VzZWRdPVwiZm9jdXNlZEluZGV4ID09PSBpXCJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1jaGlwcy10b2tlbic6IHRydWUsICdwLWZvY3VzJzogZm9jdXNlZEluZGV4ID09PSBpIH1cIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50LCBpdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCIndG9rZW4nXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBpdGVtIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhaXRlbVRlbXBsYXRlXCIgY2xhc3M9XCJwLWNoaXBzLXRva2VuLWxhYmVsXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidsYWJlbCdcIj57eyBmaWVsZCA/IHJlc29sdmVGaWVsZERhdGEoaXRlbSwgZmllbGQpIDogaXRlbSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFkaXNhYmxlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFRpbWVzQ2lyY2xlSWNvbiBbc3R5bGVDbGFzc109XCIncC1jaGlwcy10b2tlbi1pY29uJ1wiICpuZ0lmPVwiIXJlbW92ZVRva2VuSWNvblRlbXBsYXRlXCIgKGNsaWNrKT1cInJlbW92ZUl0ZW0oJGV2ZW50LCBpKVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCIncmVtb3ZlVG9rZW5JY29uJ1wiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJyZW1vdmVUb2tlbkljb25UZW1wbGF0ZVwiIGNsYXNzPVwicC1jaGlwcy10b2tlbi1pY29uXCIgKGNsaWNrKT1cInJlbW92ZUl0ZW0oJGV2ZW50LCBpKVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCIncmVtb3ZlVG9rZW5JY29uJ1wiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJyZW1vdmVUb2tlbkljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicC1jaGlwcy1pbnB1dC10b2tlblwiIFtuZ0NsYXNzXT1cInsgJ3AtY2hpcHMtY2xlYXJhYmxlJzogc2hvd0NsZWFyICYmICFkaXNhYmxlZCB9XCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidpbnB1dFRva2VuJ1wiIHJvbGU9XCJvcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAjaW5wdXR0ZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5pZF09XCJpbnB1dElkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnBsYWNlaG9sZGVyXT1cInZhbHVlICYmIHZhbHVlLmxlbmd0aCA/IG51bGwgOiBwbGFjZWhvbGRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJvbktleURvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoaW5wdXQpPVwib25JbnB1dCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChwYXN0ZSk9XCJvblBhc3RlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGZvY3VzKT1cIm9uSW5wdXRGb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChibHVyKT1cIm9uSW5wdXRCbHVyKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkIHx8IGlzTWF4ZWRPdXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW25nU3R5bGVdPVwiaW5wdXRTdHlsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3NdPVwiaW5wdXRTdHlsZUNsYXNzXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cInZhbHVlICE9IG51bGwgJiYgZmlsbGVkICYmICFkaXNhYmxlZCAmJiBzaG93Q2xlYXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPFRpbWVzSWNvbiAqbmdJZj1cIiFjbGVhckljb25UZW1wbGF0ZVwiIFtzdHlsZUNsYXNzXT1cIidwLWNoaXBzLWNsZWFyLWljb24nXCIgKGNsaWNrKT1cImNsZWFyKClcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImNsZWFySWNvblRlbXBsYXRlXCIgY2xhc3M9XCJwLWNoaXBzLWNsZWFyLWljb25cIiAoY2xpY2spPVwiY2xlYXIoKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiY2xlYXJJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCBwLWlucHV0d3JhcHBlcicsXG4gICAgICAgICdbY2xhc3MucC1pbnB1dHdyYXBwZXItZmlsbGVkXSc6ICdmaWxsZWQnLFxuICAgICAgICAnW2NsYXNzLnAtaW5wdXR3cmFwcGVyLWZvY3VzXSc6ICdmb2N1c2VkJyxcbiAgICAgICAgJ1tjbGFzcy5wLWNoaXBzLWNsZWFyYWJsZV0nOiAnc2hvd0NsZWFyJ1xuICAgIH0sXG4gICAgcHJvdmlkZXJzOiBbQ0hJUFNfVkFMVUVfQUNDRVNTT1JdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vY2hpcHMuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ2hpcHMgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGVuIHByZXNlbnQsIGl0IHNwZWNpZmllcyB0aGF0IHRoZSBlbGVtZW50IHNob3VsZCBiZSBkaXNhYmxlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBOYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBkaXNwbGF5IG9uIGEgY2hpcC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBmaWVsZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEFkdmlzb3J5IGluZm9ybWF0aW9uIHRvIGRpc3BsYXkgb24gaW5wdXQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBNYXhpbXVtIG51bWJlciBvZiBlbnRyaWVzIGFsbG93ZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbWF4OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBhIHN0cmluZyB0aGF0IGxhYmVscyB0aGUgaW5wdXQgZm9yIGFjY2Vzc2liaWxpdHkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYXJpYUxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRXN0YWJsaXNoZXMgcmVsYXRpb25zaGlwcyBiZXR3ZWVuIHRoZSBjb21wb25lbnQgYW5kIGxhYmVsKHMpIHdoZXJlIGl0cyB2YWx1ZSBzaG91bGQgYmUgb25lIG9yIG1vcmUgZWxlbWVudCBJRHMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYXJpYUxhYmVsbGVkQnk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmRleCBvZiB0aGUgZWxlbWVudCBpbiB0YWJiaW5nIG9yZGVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRhYmluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSWRlbnRpZmllciBvZiB0aGUgZm9jdXMgaW5wdXQgdG8gbWF0Y2ggYSBsYWJlbCBkZWZpbmVkIGZvciB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGlucHV0SWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGFsbG93IGR1cGxpY2F0ZSB2YWx1ZXMgb3Igbm90LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFsbG93RHVwbGljYXRlOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHdoZXRoZXIgZHVwbGljYXRpb24gY2hlY2sgc2hvdWxkIGJlIGNhc2Utc2Vuc2l0aXZlXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgY2FzZVNlbnNpdGl2ZUR1cGxpY2F0aW9uOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIGlucHV0IGZpZWxkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGlucHV0U3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIGlucHV0IGZpZWxkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGlucHV0U3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gYWRkIGFuIGl0ZW0gb24gdGFiIGtleSBwcmVzcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhZGRPblRhYjogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGFkZCBhbiBpdGVtIHdoZW4gdGhlIGlucHV0IGxvc2VzIGZvY3VzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFkZE9uQmx1cjogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTZXBhcmF0b3IgY2hhciB0byBhZGQgYW4gaXRlbSB3aGVuIHByZXNzZWQgaW4gYWRkaXRpb24gdG8gdGhlIGVudGVyIGtleS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzZXBhcmF0b3I6IHN0cmluZyB8IFJlZ0V4cCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGVuIGVuYWJsZWQsIGEgY2xlYXIgaWNvbiBpcyBkaXNwbGF5ZWQgdG8gY2xlYXIgdGhlIHZhbHVlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNob3dDbGVhcjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSBvbiBjaGlwIGFkZC5cbiAgICAgKiBAcGFyYW0ge0NoaXBzQWRkRXZlbnR9IGV2ZW50IC0gQ3VzdG9tIGNoaXAgYWRkIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkFkZDogRXZlbnRFbWl0dGVyPENoaXBzQWRkRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxDaGlwc0FkZEV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSBvbiBjaGlwIHJlbW92ZS5cbiAgICAgKiBAcGFyYW0ge0NoaXBzUmVtb3ZlRXZlbnR9IGV2ZW50IC0gQ3VzdG9tIGNoaXAgcmVtb3ZlIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblJlbW92ZTogRXZlbnRFbWl0dGVyPENoaXBzUmVtb3ZlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxDaGlwc1JlbW92ZUV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSBvbiBmb2N1cyBvZiBpbnB1dCBmaWVsZC5cbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIEJyb3dzZXIgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uRm9jdXM6IEV2ZW50RW1pdHRlcjxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSBvbiBibHVyIG9mIGlucHV0IGZpZWxkLlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gQnJvd3NlciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25CbHVyOiBFdmVudEVtaXR0ZXI8RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugb24gY2hpcCBjbGlja2VkLlxuICAgICAqIEBwYXJhbSB7Q2hpcHNDbGlja0V2ZW50fSBldmVudCAtIEN1c3RvbSBjaGlwIGNsaWNrIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkNoaXBDbGljazogRXZlbnRFbWl0dGVyPENoaXBzQ2xpY2tFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPENoaXBzQ2xpY2tFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugb24gY2xlYXIgdG9rZW4gY2xpY2tlZC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25DbGVhcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2lucHV0dGV4dCcpIGlucHV0Vmlld0NoaWxkITogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIGNvbnRhaW5lclZpZXdDaGlsZCE6IEVsZW1lbnRSZWY7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlcyE6IFF1ZXJ5TGlzdDxhbnk+O1xuXG4gICAgcHVibGljIGl0ZW1UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICByZW1vdmVUb2tlbkljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBjbGVhckljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICB2YWx1ZTogYW55O1xuXG4gICAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgdmFsdWVDaGFuZ2VkOiBOdWxsYWJsZTxib29sZWFuPjtcblxuICAgIGlkID0gVW5pcXVlQ29tcG9uZW50SWQoKTtcblxuICAgIGZvY3VzZWQ6IE51bGxhYmxlPGJvb2xlYW4+O1xuXG4gICAgZm9jdXNlZEluZGV4OiBOdWxsYWJsZTxudW1iZXI+O1xuXG4gICAgZmlsbGVkOiBOdWxsYWJsZTxib29sZWFuPjtcblxuICAgIGdldCBmb2N1c2VkT3B0aW9uSWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvY3VzZWRJbmRleCAhPT0gbnVsbCA/IGAke3RoaXMuaWR9X2NoaXBzX2l0ZW1fJHt0aGlzLmZvY3VzZWRJbmRleH1gIDogbnVsbDtcbiAgICB9XG5cbiAgICBnZXQgaXNNYXhlZE91dCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF4ICYmIHRoaXMudmFsdWUgJiYgdGhpcy5tYXggPT09IHRoaXMudmFsdWUubGVuZ3RoO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LCBwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdpdGVtJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3JlbW92ZXRva2VuaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlVG9rZW5JY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2NsZWFyaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXBkYXRlRmlsbGVkU3RhdGUoKTtcbiAgICB9XG5cbiAgICBvbldyYXBwZXJDbGljaygpIHtcbiAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIG9uQ29udGFpbmVyRm9jdXMoKSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgb25Db250YWluZXJCbHVyKCkge1xuICAgICAgICB0aGlzLmZvY3VzZWRJbmRleCA9IC0xO1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvbkNvbnRhaW5lcktleURvd24oZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25BcnJvd0xlZnRLZXlPbigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dSaWdodEtleU9uKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0JhY2tzcGFjZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkJhY2tzcGFjZUtleU9uKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQXJyb3dMZWZ0S2V5T24oKSB7XG4gICAgICAgIGlmICh0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUubGVuZ3RoID09PSAwICYmIHRoaXMudmFsdWUgJiYgdGhpcy52YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzZWRJbmRleCA9IHRoaXMuZm9jdXNlZEluZGV4ID09PSBudWxsID8gdGhpcy52YWx1ZS5sZW5ndGggLSAxIDogdGhpcy5mb2N1c2VkSW5kZXggLSAxO1xuICAgICAgICAgICAgaWYgKHRoaXMuZm9jdXNlZEluZGV4IDwgMCkgdGhpcy5mb2N1c2VkSW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25BcnJvd1JpZ2h0S2V5T24oKSB7XG4gICAgICAgIGlmICh0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUubGVuZ3RoID09PSAwICYmIHRoaXMudmFsdWUgJiYgdGhpcy52YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5mb2N1c2VkSW5kZXggPT09IHRoaXMudmFsdWUubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNlZEluZGV4ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNlZEluZGV4Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkJhY2tzcGFjZUtleU9uKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmZvY3VzZWRJbmRleCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVJdGVtKGV2ZW50LCB0aGlzLmZvY3VzZWRJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbklucHV0KCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUZpbGxlZFN0YXRlKCk7XG4gICAgICAgIHRoaXMuZm9jdXNlZEluZGV4ID0gbnVsbDtcbiAgICB9XG5cbiAgICBvblBhc3RlKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZXBhcmF0b3IpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXN0ZWREYXRhOiBzdHJpbmcgPSAoZXZlbnQuY2xpcGJvYXJkRGF0YSB8fCAodGhpcy5kb2N1bWVudC5kZWZhdWx0VmlldyBhcyBhbnkpWydjbGlwYm9hcmREYXRhJ10pLmdldERhdGEoJ1RleHQnKTtcbiAgICAgICAgICAgICAgICBwYXN0ZWREYXRhLnNwbGl0KHRoaXMuc2VwYXJhdG9yKS5mb3JFYWNoKCh2YWw6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEl0ZW0oZXZlbnQsIHZhbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlRmlsbGVkU3RhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUZpbGxlZFN0YXRlKCkge1xuICAgICAgICBpZiAoIXRoaXMudmFsdWUgfHwgdGhpcy52YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZmlsbGVkID0gdGhpcy5pbnB1dFZpZXdDaGlsZCAmJiB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQgJiYgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlICE9ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5maWxsZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JdGVtQ2xpY2soZXZlbnQ6IEV2ZW50LCBpdGVtOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vbkNoaXBDbGljay5lbWl0KHtcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgdmFsdWU6IGl0ZW1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXhlZE91dCgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUZpbGxlZFN0YXRlKCk7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKHZhbDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gdmFsO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHJlc29sdmVGaWVsZERhdGEoZGF0YTogYW55LCBmaWVsZDogc3RyaW5nKTogYW55IHtcbiAgICAgICAgaWYgKGRhdGEgJiYgZmllbGQpIHtcbiAgICAgICAgICAgIGlmIChmaWVsZC5pbmRleE9mKCcuJykgPT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YVtmaWVsZF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBmaWVsZHM6IHN0cmluZ1tdID0gZmllbGQuc3BsaXQoJy4nKTtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBkYXRhO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBmaWVsZHMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZVtmaWVsZHNbaV1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5wdXRGb2N1cyhldmVudDogRm9jdXNFdmVudCkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmZvY3VzZWRJbmRleCA9IG51bGw7XG4gICAgICAgIHRoaXMub25Gb2N1cy5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBvbklucHV0Qmx1cihldmVudDogRm9jdXNFdmVudCkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb2N1c2VkSW5kZXggPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5hZGRPbkJsdXIgJiYgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmFkZEl0ZW0oZXZlbnQsIHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICAgICAgdGhpcy5vbkJsdXIuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlSXRlbShldmVudDogRXZlbnQsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZW1vdmVkSXRlbSA9IHRoaXMudmFsdWVbaW5kZXhdO1xuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZS5maWx0ZXIoKHZhbDogYW55LCBpOiBudW1iZXIpID0+IGkgIT0gaW5kZXgpO1xuICAgICAgICB0aGlzLmZvY3VzZWRJbmRleCA9IG51bGw7XG4gICAgICAgIHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgdGhpcy5vblJlbW92ZS5lbWl0KHtcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgdmFsdWU6IHJlbW92ZWRJdGVtXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnVwZGF0ZUZpbGxlZFN0YXRlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlTWF4ZWRPdXQoKTtcbiAgICB9XG5cbiAgICBhZGRJdGVtKGV2ZW50OiBFdmVudCwgaXRlbTogc3RyaW5nLCBwcmV2ZW50RGVmYXVsdDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZSB8fCBbXTtcblxuICAgICAgICBpZiAoaXRlbSAmJiBpdGVtLnRyaW0oKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0l0ZW1Jc0R1cGxpY2F0ZSA9IHRoaXMuY2FzZVNlbnNpdGl2ZUR1cGxpY2F0aW9uID8gdGhpcy52YWx1ZS5pbmNsdWRlcyhpdGVtKSA6IHRoaXMudmFsdWUuc29tZSgodmFsKSA9PiB2YWwudG9Mb3dlckNhc2UoKSA9PT0gaXRlbS50b0xvd2VyQ2FzZSgpKTtcblxuICAgICAgICAgICAgaWYgKCh0aGlzLmFsbG93RHVwbGljYXRlIHx8ICFuZXdJdGVtSXNEdXBsaWNhdGUpICYmICF0aGlzLmlzTWF4ZWRPdXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gWy4uLnRoaXMudmFsdWUsIGl0ZW1dO1xuICAgICAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQWRkLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGl0ZW1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlRmlsbGVkU3RhdGUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXhlZE91dCgpO1xuICAgICAgICB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcblxuICAgICAgICBpZiAocHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IG51bGw7XG4gICAgICAgIHRoaXMudXBkYXRlRmlsbGVkU3RhdGUoKTtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1heGVkT3V0KCk7XG4gICAgICAgIHRoaXMub25DbGVhci5lbWl0KCk7XG4gICAgfVxuXG4gICAgb25LZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGlucHV0VmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdCYWNrc3BhY2UnOlxuICAgICAgICAgICAgICAgIGlmIChpbnB1dFZhbHVlLmxlbmd0aCA9PT0gMCAmJiB0aGlzLnZhbHVlICYmIHRoaXMudmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mb2N1c2VkSW5kZXggIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlSXRlbShldmVudCwgdGhpcy5mb2N1c2VkSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgdGhpcy5yZW1vdmVJdGVtKGV2ZW50LCB0aGlzLnZhbHVlLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBjYXNlICdOdW1wYWRFbnRlcic6XG4gICAgICAgICAgICAgICAgaWYgKGlucHV0VmFsdWUgJiYgaW5wdXRWYWx1ZS50cmltKCkubGVuZ3RoICYmICF0aGlzLmlzTWF4ZWRPdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtKGV2ZW50LCBpbnB1dFZhbHVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnVGFiJzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZGRPblRhYiAmJiBpbnB1dFZhbHVlICYmIGlucHV0VmFsdWUudHJpbSgpLmxlbmd0aCAmJiAhdGhpcy5pc01heGVkT3V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkSXRlbShldmVudCwgaW5wdXRWYWx1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICAgICAgaWYgKGlucHV0VmFsdWUubGVuZ3RoID09PSAwICYmIHRoaXMudmFsdWUgJiYgdGhpcy52YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyVmlld0NoaWxkPy5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlcGFyYXRvcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXBhcmF0b3IgPT09IGV2ZW50LmtleSB8fCBldmVudC5rZXkubWF0Y2godGhpcy5zZXBhcmF0b3IpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEl0ZW0oZXZlbnQsIGlucHV0VmFsdWUsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVNYXhlZE91dCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaW5wdXRWaWV3Q2hpbGQgJiYgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc01heGVkT3V0KSB7XG4gICAgICAgICAgICAgICAgLy8gQ2FsbGluZyBgYmx1cmAgaXMgbmVjZXNzYXJ5IGJlY2F1c2UgZmlyZWZveCBkb2VzIG5vdCBjYWxsIGBvbmZvY3VzYCBldmVudHNcbiAgICAgICAgICAgICAgICAvLyBmb3IgZGlzYWJsZWQgaW5wdXRzLCB1bmxpa2UgY2hyb21pdW0gYnJvd3NlcnMuXG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmJsdXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuYmx1cigpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5kaXNhYmxlZCA9IHRoaXMuZGlzYWJsZWQgfHwgZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSW5wdXRUZXh0TW9kdWxlLCBTaGFyZWRNb2R1bGUsIFRpbWVzQ2lyY2xlSWNvbiwgVGltZXNJY29uXSxcbiAgICBleHBvcnRzOiBbQ2hpcHMsIElucHV0VGV4dE1vZHVsZSwgU2hhcmVkTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtDaGlwc11cbn0pXG5leHBvcnQgY2xhc3MgQ2hpcHNNb2R1bGUge31cbiJdfQ==
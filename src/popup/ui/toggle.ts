﻿module DarkReader.Popup {

    /**
     * Toggle switch.
     */
    export class Toggle extends xp.Element {
        //switchedOn: boolean;
        value: any|string;
        valueOn: any|string;
        valueOff: any|string;
        labelOn: string;
        labelOff: string;

        constructor(markup: ToggleMarkup) {
            super(markup);
        }

        protected getTemplate() {
            return xp.Dom.create(`
                <div class="Toggle">
                  <span class="on">On</span>
                  <span class="off">Off</span>
                </div>
                `, {
                    '.on': (el) => this.elementOn = el,
                    '.off': (el) => this.elementOff = el
                });
        }
        protected elementOn: HTMLElement;
        protected elementOff: HTMLElement;

        protected defineProperties() {
            super.defineProperties();
            //this.defineProperty('switchedOn', {
            //    setter: (switchedOn:boolean) => {
            //        if (switchedOn) {
            //            this.elementOn.classList.add('active');
            //            this.elementOff.classList.remove('active');
            //        } else {
            //            this.elementOff.classList.add('active');
            //            this.elementOn.classList.remove('active');
            //        }
            //    }
            //});
            this.defineProperty('value', {
                setter: (v) => {
                    //if (v !== this.valueOn || v !== this.valueOff) {
                    //    throw new Error('Unexpected value.');
                    //}
                    var switchedOn = v === this.valueOn;
                    if (switchedOn) {
                        this.elementOn.classList.add('active');
                        this.elementOff.classList.remove('active');
                        this.domElement.classList.add('switchedOn');
                    } else {
                        this.elementOff.classList.add('active');
                        this.elementOn.classList.remove('active');
                        this.domElement.classList.remove('switchedOn');
                    }
                }
            });
            this.defineProperty('labelOn', {
                setter: (text: string) => {
                    this.elementOn.textContent = text;
                }
            });
            this.defineProperty('labelOff', {
                setter: (text: string) => {
                    this.elementOff.textContent = text;
                }
            });
        }

        protected initEvents() {
            super.initEvents();
            this.elementOn.addEventListener('click',(e) => {
                this.onInput('value', this.valueOn);
            });
            this.elementOff.addEventListener('click',(e) => {
                this.onInput('value', this.valueOff);
            });
        }

        protected setDefaults() {
            super.setDefaults();
            this.valueOn = true;
            this.valueOff = false;
            this.labelOn = 'On';
            this.labelOff = 'Off';
        }
    }

    export interface ToggleMarkup extends xp.ElementMarkup<Toggle> {
        //switchedOn?: boolean|string;
        value?: any|string;
        valueOn?: any|string;
        valueOff?: any|string;
        labelOn?: string;
        labelOff?: string;
    }
} 
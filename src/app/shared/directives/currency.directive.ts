import { OnInit, Directive, HostListener, ElementRef, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

export const CURRENCY_INPUT_MASK_DIRECTIVE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CurrencyDirective),
  multi: true
};

@Directive({
  selector: '[appCurrency]',
  providers: [CURRENCY_INPUT_MASK_DIRECTIVE_VALUE_ACCESSOR, DecimalPipe]
})
export class CurrencyDirective implements ControlValueAccessor, OnInit {
  private el: HTMLInputElement;
  private onModelChange;
  private onModelTouched;
  private lastNumVal: number;
  private lastStrVal: string;
  private DECIMAL_MARK = '.';

  @Input() decimal? = false;

  constructor(private elementRef: ElementRef, private decimalPipe: DecimalPipe) {}

  ngOnInit() {
    this.el = this.elementRef.nativeElement;
  }

  @HostListener('focus', ['$event'])
  handleFocus(event: any) {
    const strVal: string = this.getInputValue();
    const unmaskedStr: string = this.getUnmaskedValue(strVal);
    this.updateInputValue(unmaskedStr);
  }

  @HostListener('cut', ['$event'])
  handleCut(event: any) {
    setTimeout(() => {
      this.inputUpdated();
    }, 0);
  }

  @HostListener('keypress', ['$event'])
  handleKeypress(event: any) {
    // Restrict characters
    const newChar: string = String.fromCharCode(event.which);
    const allowedChars: RegExp = /^[\d.]+$/;
    if (!allowedChars.test(newChar)) {
      event.preventDefault();
      return;
    }
    // Handle decimal mark input
    const currentValue: string = event.target.value;
    const separatorIdx: number = currentValue.indexOf(this.DECIMAL_MARK);
    const hasFractionalPart: boolean = separatorIdx >= 0;
    if (!hasFractionalPart || newChar !== this.DECIMAL_MARK) {
      return;
    }
    const isOutsideSelection = !this.isIdxBetweenSelection(separatorIdx);
    if (isOutsideSelection) {
      const positionAfterMark = separatorIdx + 1;
      this.setCursorPosition(positionAfterMark);
      event.preventDefault();
      return;
    }
  }

  @HostListener('input', ['$event'])
  handleInput(event: any) {
    this.inputUpdated();
  }

  // @HostListener('paste', ['$event'])
  // handlePaste(event: any) {
  //   setTimeout(() => {
  //     this.inputUpdated();
  //   }, 1);
  // }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const pastedInput: string = event.clipboardData.getData('text/plain');
    console.log(pastedInput);
    let pasted = false;
    if (this.decimal) {
      pasted = document.execCommand('insertText', false, pastedInput.replace(/[^0-9]/g, ''));
    } else if (this.isValidDecimal(pastedInput)) {
      pasted = document.execCommand('insertText', false, pastedInput.replace(/[^0-9.]/g, ''));
    }
    if (pasted) {
      event.preventDefault();
    } else {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(pastedInput);
        document.execCommand('paste');
      }
    }
  }

  @HostListener('blur', ['$event'])
  handleBlur(event: any) {
    const strVal: string = this.getInputValue();
    const numVal: number = this.convertStrToDecimal(strVal);
    this.maskInput(numVal);
    this.onModelTouched.apply(event);
  }

  registerOnChange(callbackFunction: Function): void {
    this.onModelChange = callbackFunction;
  }

  registerOnTouched(callbackFunction: Function): void {
    this.onModelTouched = callbackFunction;
  }

  setDisabledState(value: boolean): void {
    this.el.disabled = value;
  }

  writeValue(numValue: number): void {
    this.maskInput(numValue);
  }

  private maskInput(numVal: number): void {
    if (!this.isNumeric(numVal)) {
      this.updateInputValue('');
      return;
    }
    const strVal: string = this.convertDecimalToStr(numVal);
    const newVal: string = this.transformWithPipe(strVal);
    this.updateInputValue(newVal);
  }

  private inputUpdated() {
    this.restrictDecimalValue();
    const strVal: string = this.getInputValue();
    const unmaskedVal: string = this.getUnmaskedValue(strVal);
    const numVal: number = this.convertStrToDecimal(unmaskedVal);

    if (numVal >= 10000000000000) {
      this.updateInputValue(this.lastStrVal, true);
      return;
    }

    if (numVal !== this.lastNumVal) {
      this.lastNumVal = numVal;
      this.lastStrVal = strVal;
      this.onModelChange(numVal);
    }
  }

  private restrictDecimalValue(): void {
    const strVal: string = this.getInputValue();
    const dotIdx: number = strVal.indexOf(this.DECIMAL_MARK);
    const hasFractionalPart: boolean = dotIdx >= 0;
    if (hasFractionalPart) {
      const fractionalPart: string = strVal.substring(dotIdx + 1);
      if (fractionalPart.length > 2) {
        const choppedVal: string = strVal.substring(0, dotIdx + 3);
        this.updateInputValue(choppedVal, true);
        return;
      }
    }
  }

  private transformWithPipe(str: string): string {
    return this.decimalPipe.transform(str, '1.2-2');
  }

  private getUnmaskedValue(value: string): string {
    return value.replace(/[^-\d\\.]/g, '');
  }

  private updateInputValue(value: string, savePosition = false) {
    if (savePosition) {
      this.saveCursorPosition();
    }
    this.el.value = value;
  }

  private getInputValue(): string {
    return this.el.value;
  }

  private convertStrToDecimal(str: string): number {
    return this.isNumeric(str) ? parseFloat(str) : null;
  }

  private convertDecimalToStr(n: number): string {
    return this.isNumeric(n) ? n + '' : '';
  }

  private isNumeric(n: any): boolean {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  private saveCursorPosition() {
    const position: number = this.el.selectionStart;
    setTimeout(() => {
      this.setCursorPosition(position);
    }, 1);
  }

  private setCursorPosition(position: number) {
    this.el.selectionStart = position;
    this.el.selectionEnd = position;
  }

  private isIdxBetweenSelection(idx: number) {
    if (this.el.selectionStart === this.el.selectionEnd) {
      return false;
    }
    return idx >= this.el.selectionStart && idx < this.el.selectionEnd;
  }

  isValidDecimal(string: string): boolean {
    return string.split('.').length <= 2;
  }
}

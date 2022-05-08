import {
  AfterViewChecked,
  Directive,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appResizeHeight]',
})
export class ResizeHeightDirective implements AfterViewChecked {
  @Input() public parentClass: string = '';

  public constructor(private el?: ElementRef<HTMLElement>) {}

  @HostListener('window:resize', ['$event']) public setheight(): void {
    this.resize();
  }

  public ngAfterViewChecked(): void {
    this.resize();
  }

  private resize(): void {
    const parent: HTMLElement | null | undefined =
      this.el?.nativeElement.closest(`.${this.parentClass}`);
    if (!parent || !this.el) return;

    const minHeight: number = this.getMinHeight();
    const parentHeight: number = parseFloat(getComputedStyle(parent).height);
    const elemHeight: number = this.getChildrenHeight() + minHeight;
    if (parentHeight - elemHeight >= 0) {
      this.el.nativeElement.style.height = `fit-content`;
    } else {
      this.el.nativeElement.style.height = `${parentHeight - minHeight}px`;
    }
  }

  private getChildrenHeight(): number {
    const children: HTMLCollection | undefined =
      this.el?.nativeElement.children;
    if (!children || !children[0]) return 0;
    const childMargin: number = parseFloat(
      getComputedStyle(children[0]).margin
    );
    const childPadding: number = parseFloat(
      getComputedStyle(children[0]).padding
    );
    const sum: number =
      children[0].clientHeight + 2 * (childMargin + childPadding);
    return children[0] ? children.length * sum : 0;
  }

  private getMinHeight(): number {
    const parent: HTMLElement | null | undefined =
      this.el?.nativeElement.closest('.column');
    if (!parent) return 0;

    const constHeight: number =
      window.innerWidth < parent.scrollWidth ? Number('121') : Number('111');
    const title: HTMLElement | null = parent.querySelector('.column__title');
    return title
      ? parseFloat(getComputedStyle(title).height) + constHeight
      : constHeight;
  }
}

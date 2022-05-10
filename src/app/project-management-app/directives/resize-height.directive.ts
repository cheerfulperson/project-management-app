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

    const minHeight: number = this.getMinHeight(parent);
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
    let childrenHeight: number = 0;
    if (!children) return 0;
    Array.from(children).forEach(
      (el: Element) =>
        (childrenHeight +=
          el.clientHeight +
          parseFloat(
            getComputedStyle(el).margin +
              parseFloat(getComputedStyle(el).padding)
          ))
    );

    return children[0] ? childrenHeight : 0;
  }

  private getMinHeight(parentBlock: HTMLElement): number {
    const parent: HTMLElement | null | undefined =
      this.el?.nativeElement.closest('.column');
    if (!parent) return 0;
    const title: HTMLElement | null = parent.querySelector('.column__title');
    const footer: HTMLElement | null = parent.querySelector('.column__footer');

    const constHeight: number =
      window.innerWidth < parentBlock.scrollWidth ? Number('75') : Number('65');
    return title && footer
      ? parseFloat(getComputedStyle(title).height) +
          (footer?.clientHeight || 0) +
          constHeight
      : constHeight;
  }
}

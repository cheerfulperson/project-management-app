import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]',
})
export class ScrollAnimationDirective implements OnInit {
  private isAnimated: boolean = false;
  public constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('window:scroll', ['$event']) public setOpacity(): void {
    const windowH: number = window.innerHeight;
    const elemY: number = this.el.nativeElement.getBoundingClientRect().y;
    const screenPart: number = 80;

    if (elemY < windowH - screenPart) {
      this.animate();
    } else if (this.isAnimated) {
      this.isAnimated = false;
      this.setElementOpacity(0);
    }
  }

  public ngOnInit(): void {
    this.setElementOpacity(0);
    this.setOpacity();
  }

  private animate(): void {
    if (!this.isAnimated) {
      this.el.nativeElement.animate(
        [
          { transform: 'translateY(30px) scale(0.9)' },
          { transform: 'translateY(0px) scale(1)' },
        ],
        {
          duration: 400,
          iterations: 1,
        }
      );
      this.setElementOpacity(1);
      this.isAnimated = true;
    }
  }

  private setElementOpacity(opacity: number): void {
    this.el.nativeElement.style.cssText = `opacity: ${opacity}; transition: 0.4s`;
  }
}

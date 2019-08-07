import { Component, h, Host } from '@stencil/core';

/**
 * LoaderError is a simple component that solely renders
 * an animated svg in case of an unsuccessfull async event
 *
 * @export
 * @class LoaderError
 */
@Component({
  tag: 'loader-error',
  styleUrl: 'loader-error.component.scss',
  shadow: true
})
export class LoaderError {
  render() {
    return <Host>
    <div class="svg-box">
      <svg class="circular white-stroke">
          <circle class="path" cx="75" cy="75" r="50" fill="none" stroke-width="5" stroke-miterlimit="10"/>
      </svg>
      <svg class="cross white-stroke">
          <g transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-502.652,-204.518)">
              <path class="first-line" d="M634.087,300.805L673.361,261.53" fill="none"/>
          </g>
          <g transform="matrix(-1.28587e-16,-0.79961,0.79961,-1.28587e-16,-204.752,543.031)">
              <path class="second-line" d="M634.087,300.805L673.361,261.53"/>
          </g>
      </svg>
    </div>
  </Host>
  }
}
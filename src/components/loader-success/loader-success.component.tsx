import { Component, h } from '@stencil/core';

/**
 * LoaderSuccess is a simple component that solely renders
 * an animated svg in case of an asynchronous successful operation
 *
 * @export
 * @class LoaderSuccess
 */
@Component({
  tag: 'loader-success',
  styleUrl: 'loader-success.component.scss',
  shadow: true
})
export class LoaderSuccess {
  render() {
    return <div class="svg-box">
    <svg class="circular white-stroke">
        <circle class="path" cx="75" cy="75" r="50" fill="none" stroke-width="5" stroke-miterlimit="10"/>
    </svg>
    <svg class="checkmark white-stroke">
        <g transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-489.57,-205.679)">
            <path class="checkmark__check" fill="none" d="M616.306,283.025L634.087,300.805L673.361,261.53"/>
        </g>
    </svg>
  </div>
  }
}
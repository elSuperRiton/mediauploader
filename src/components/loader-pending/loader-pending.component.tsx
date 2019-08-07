import { Component, h } from '@stencil/core';

@Component({
  tag: 'loader-pending',
  styleUrl: 'loader-pending.component.scss',
  shadow: true
})
export class LoaderPending {

  render() {
    return <div class="lds-roller">
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
    </div>
  }
}
// import { Buffer } from 'buffer';
import process from 'process';

// Polyfill global objects
if (typeof global === 'undefined') {
  window.global = window;
}
window.process = process;
// window.Buffer = Buffer;
  
import type { Directive } from 'vue';

/**
 * WeakMap stores event handlers keyed by their DOM elements.
 * Why WeakMap? When a DOM element is removed and garbage collected,
 * its WeakMap entry is automatically cleaned up — no manual deletion needed,
 * no memory leaks. A regular Map would keep elements alive forever.
 */
const handlers = new WeakMap<HTMLElement, { input: HTMLInputElement; handler: () => void }>();

const vSelectAll: Directive = {
  mounted(el: HTMLElement) {
    const input = el.querySelector('input');
    if (input) {
      const handler = () => {
        if (input.value.length) {
          input.select();
        }
      };
      input.addEventListener('focus', handler);
      handlers.set(el, { input, handler });
    }
  },
  unmounted(el: HTMLElement) {
    const data = handlers.get(el);
    if (data) {
      data.input.removeEventListener('focus', data.handler);
      handlers.delete(el);
    }
  },
};

export default vSelectAll;

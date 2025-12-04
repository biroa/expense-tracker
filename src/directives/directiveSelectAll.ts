import type { Directive } from 'vue';

const vSelectAll: Directive = {
  mounted(el: HTMLElement) {
    const input = el.querySelector('input');
    if (input) {
      input.addEventListener('focus', () => {
        if (input.value.length) {
          input.select();
        }
      });
    }
  },
};

export default vSelectAll;

const blurMap: Record<string, string> = {
  '/images/DSC08151.webp': 'data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAACwAQCdASoKAAoABUB8JbACdADcdFwqAP2okskQREkZ9z9xF3i7dzVh9N9SH0NTCzI4si6ifPq67l7Mmae2JgAA',
  '/images/DSC07958.webp': 'data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAACwAQCdASoKAAoABUB8JQBOgB9hnqiAAP2Y5+1FV01nT8Nk5ESc+PO7k+pXVEb7Fbdrk/dXVVcmFP/R7sKoCNengAA=',
  '/slider/baski-malzemeleri.webp': 'data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAADwAQCdASoKAAoABUB8JbACdADdRrg1lAAA/uNs0dNR0DNihPAZEtHZKnm7vFeitv6mgAAA',
  '/slider/baski-gorsel.webp': 'data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAADwAQCdASoKAAoABUB8JYgCdADzfIaz66gA/tmPbuHMod3q38ZiX4SNaeOixhEl/WnqL2TvEAAAAA==',
  '/images/DSC08042-500x600.webp': 'data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADwAQCdASoKAAoABUB8JYwAAiX6+osHhAAA/tlv19TTSV1SDbBUUIqrzUQgz2eOMS2YnwIaP0bXrq5z83YgYzLVpSAAAA==',
  '/images/sim-baski-ve-matbaa-malzemeleri-rgb-renk-ve-rgb-murekkep.webp': 'data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAACQAQCdASoKAAoABUB8JZwAAlbaXkAA998/wCas6zkGIwhXnqkwhwHKDBbXwlcoVzqgAAAA',
  '/images/sim-baski-malzemeleri-ve-matbaa-malzemeleri-Ozel-renk-uretimi2.webp': 'data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAADwAQCdASoKAAoABUB8JagCdADhaBdpi6gAoeSD9pTVF9FhtWFvM8oDk4uTFC4pRikwje3ylIrUB4DQ0k72QP9njmgqzsoRyEwsoAAA',
  '/images/sim-baski-malzemeleri-ve-matbaa-malzemeleri-Ozel-renk-uretimi.webp': 'data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAADwAQCdASoKAAoABUB8JbAC7AEfUNS9sgAA/uCqsvmPkw+L+82kHrjHYcW+tLCxDVqrOtgIeVOo3O06AAA=',
  '/images/NEW-Gold-Aile.webp': 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAADQAQCdASoKAAoABUB8JZwAAqrjL/WGAAD+W+zo6v7g5r0p8EmhXm3ALAWUYAAA',
  '/images/HIP09900.webp': 'data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAACQAQCdASoKAAoABUB8JQBOgBtgGQAA/rI6qRlnRKS9IwHqguHqImemWVFrZwBung1t4BlyUmtA8ILtQAAAAA==',
  '/images/blanket2.webp': 'data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAACwAQCdASoKAAoABUB8JbACdADcz5/AAP7XlMlSZj4Pc9MfUXVgsavmsdCIqe220/mturDcYb1X+VWCIEmQAA==',
  '/images/HIP08190.webp': 'data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAADQAQCdASoKAAoABUB8JZwAAubBZ/uAAAD+W+0Bh+tws3UV248FeCVHXgDMq2RCQAA=',
  '/images/HIP09894.webp': 'data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAACQAQCdASoKAAoABUB8JZwAAuZttgAA3meicrXAYNZuvS8EX39Za8ioX0ifw8XTm8A9XszifL1AAA==',
  '/images/sakata2.webp': 'data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAADQAQCdASoKAAoABUB8JZwAAt0OOaSknAD+x3s6MEaGn3NhZCLEuR37l2AAAA==',
  '/images/HIP09924.webp': 'data:image/webp;base64,UklGRjQAAABXRUJQVlA4ICgAAACwAQCdASoKAAoABUB8JZwAAsaW9DTAAP7VnpTd1k0vWSIuBeIAAAAA',
  '/images/HIP09896.webp': 'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACQAQCdASoKAAoABUB8JZwAAua4niAA/uppRLE8pJLwIftPIAAAAA==',
  '/images/Blanket.webp': 'data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAADwAQCdASoKAAoABUB8JbACdAELZSZ29tAA/t9JRgWAkbhtibbrGakw/0u3gDxxS/rhZZQ6GVvc39JgAAA=',
  '/images/HIP09892.webp': 'data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAADQAQCdASoKAAoABUB8JZwAAubBZ/uAAAD+W+0Bh+tws3UV248FeCVHXgDMq2RCQAA=',
  '/images/HIP09897.webp': 'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACQAQCdASoKAAoABUB8JZwAAua4niAA/uppRLE8pJLwIftPIAAAAA==',
  '/images/HIP09898.webp': 'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACQAQCdASoKAAoABUB8JZwAAua4niAA/uppRLE8pJLwIftPIAAAAA==',
  '/images/HIP09899.webp': 'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACQAQCdASoKAAoABUB8JZwAAua4niAA/uppRLE8pJLwIftPIAAAAA==',
  '/images/HIP099222.webp': 'data:image/webp;base64,UklGRjQAAABXRUJQVlA4ICgAAACwAQCdASoKAAoABUB8JZwAAsaW9DTAAP7VnpTd1k0vWSIuBeIAAAAA',
  '/images/NEW-Pantone874-Gold.webp': 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAADQAQCdASoKAAoABUB8JZwAAqrjL/WGAAD+W+zo6v7g5r0p8EmhXm3ALAWUYAAA',
  '/images/NEW-Pantone875-Gold.webp': 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAADQAQCdASoKAAoABUB8JZwAAqrjL/WGAAD+W+zo6v7g5r0p8EmhXm3ALAWUYAAA',
  '/images/NEW-Pantone876-Gold.webp': 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAADQAQCdASoKAAoABUB8JZwAAqrjL/WGAAD+W+zo6v7g5r0p8EmhXm3ALAWUYAAA',
  '/images/HIP09901.webp': 'data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAACQAQCdASoKAAoABUB8JQBOgBtgGQAA/rI6qRlnRKS9IwHqguHqImemWVFrZwBung1t4BlyUmtA8ILtQAAAAA==',
};

export function getBlurDataURL(src: string): string | undefined {
  return blurMap[src];
}

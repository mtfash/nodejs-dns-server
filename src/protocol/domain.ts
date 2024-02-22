import { decodeLabel, encodeLabel } from './label';

export function encodeDomain(domain: string): Buffer {
  if (domain.length > 253) {
    throw new Error(`Invalid domain length: ${domain} (${domain.length})`);
  }

  const labels = domain.split('.');

  const hasLastDot = domain.endsWith('.');

  if (!hasLastDot) {
    labels.push('');
  }

  const extraLength = hasLastDot ? 1 : 2;
  const domainBuf = Buffer.alloc(domain.length + extraLength, 0, 'ascii');

  let index = 0;

  labels.forEach((label) => {
    const labelBuf = encodeLabel(label);
    domainBuf.set(labelBuf, index);
    index += labelBuf.length;
  });

  return domainBuf;
}

export function decodeDomain(domain: Uint8Array): string {
  let labels: string[] = [];

  let index = 0;
  let length = domain[index];

  while (length && length !== 0) {
    const offset = index + length + 1;

    labels.push(decodeLabel(domain.slice(index, offset)));

    index += length + 1;
    length = domain[index];
  }

  return labels.join('.');
}

export function decodeDomainFrom(
  buffer: Uint8Array,
  offset = 0
): {
  domain: string;
  endOffset: number;
} {
  let labels: string[] = [];

  let index = offset;
  let length = buffer[index];

  while (length && length !== 0) {
    const offset = index + length + 1;

    labels.push(decodeLabel(buffer.slice(index, offset)));

    index += length + 1;
    length = buffer[index];
  }

  return {
    domain: labels.join('.'),
    endOffset: index,
  };
}

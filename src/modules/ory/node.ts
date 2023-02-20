import { view, lensPath, find, pipe, equals } from 'ramda';
import { UiNode } from '@ory/client';

export function extractFlowNode(attribute: string): (nodes: UiNode[]) => UiNode {
  const name = view(lensPath(['attributes', 'name']));

  return find(pipe(name, equals(attribute)));
}

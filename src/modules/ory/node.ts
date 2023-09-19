import { view, lensPath, find, pipe, equals } from 'ramda';
import { UiNode, UiNodeAnchorAttributes } from '@ory/client';

export function extractFlowNode(attribute: string): (nodes: UiNode[]) => UiNode {
  const name = view(lensPath(['attributes', 'name']));

  return find(pipe(name, equals(attribute)));
}

export function extractFlowNodeAttribute(attribute: string): (nodes: UiNode[]) => UiNode {
  const name = view(lensPath(['attributes', 'id']));

  return find(pipe(name, equals(attribute)));
}

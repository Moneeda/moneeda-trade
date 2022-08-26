import { CardColor } from "./cards/types";

const generateId = () => {
  const extraDigits = parseInt(Math.random() * 10000);
  return parseInt(performance.now() * extraDigits);
};

const mapNode = (node, type) => {
  return {
    type,
    id: node._id || generateId(),
    label: node.method,
    position: {
      x: node.positionX,
      y: node.positionY,
    },
    data: {
      action: node,
      condition: node,
      strategyId: node.strategyId,
    },
    meta: {
      ...node,
    },
    draggable: true,
  };
};

export const createRawNode = () => {
  return {
    type: "New",
    method: "New",
    positionX: 50,
    positionY: 50,
  };
};

const mapNodes = (nodes, type) => {
  const items = [];
  const edges = [];

  nodes.forEach((node) => {
    items.push(mapNode(node, type));

    const conditions = node.successConditionIds || [];
    const actions = node.successActionIds || [];

    if (conditions.length > 0) {
      conditions.forEach((resultId) => {
        edges.push({
          id: `${node._id}-${resultId}`,
          source: node._id,
          target: resultId,
          animated: true,
          type: "custom",
          style: {
            stroke: CardColor.INFO,
            strokeWidth: 3,
          },
        });
      });
    }
    if (actions.length > 0) {
      actions.forEach((resultId) => {
        edges.push({
          id: `${node._id}-${resultId}`,
          source: node._id,
          target: resultId,
          animated: true,
          type: "custom",
          style: {
            stroke: CardColor.SUCCESS,
            strokeWidth: 3,
          },
        });
      });
    }
  });

  return { items, edges };
};

export const buildNodes = (conditions, actions) => {
  const { items: condItems, edges: condEdges } = mapNodes(
    conditions,
    "condition"
  );
  const { items: actItems, edges: actEdges } = mapNodes(actions, "action");

  return [...condItems, ...actItems, ...condEdges, ...actEdges];
};

export const NodeType = {
  CONDITION: "condition",
  ACTION: "action",
};

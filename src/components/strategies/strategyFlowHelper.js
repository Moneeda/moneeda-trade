const mapNode = (node, type) => {
  return {
    type,
    id: node._id,
    label: node.method,
    position: {
      x: node.positionX,
      y: node.positionY,
    },
    meta: {
      ...node,
    },
  };
};

const mapNodes = (nodes, type) => {
  const items = [];
  const edges = [];

  nodes.forEach((node) => {
    items.push(mapNode(node, type));

    const results = [
      ...(node.successConditionIds || []),
      ...(node.successActionIds || []),
    ];

    if (results.length > 0) {
      results.forEach((resultId) => {
        edges.push({
          id: `e${node._id}-${resultId}`,
          source: node._id,
          target: resultId,
          type: "smoothstep",
        });
      });
    }
  });

  return { items, edges };
};

export const buildNodes = (conditions, actions) => {
  const { items: condItems, edges: condEdges } = mapNodes(conditions, "input");
  const { items: actItems, edges: actEdges } = mapNodes(actions, "output");

  return [...condItems, ...actItems, ...condEdges, ...actEdges];
};

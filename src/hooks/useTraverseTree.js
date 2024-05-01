import React from "react";

const useTraverseTree = () => {
  function insertNode(tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: [],
      });
      return tree;
    }
    let updatedTree = tree.items.map((obj) => {
      return insertNode(obj, folderId, item, isFolder);
    });

    return { ...tree, items: updatedTree };
  }

  function deleteNode(tree, id) {
    if (tree.id === id && tree.isFolder) {
      return { ...tree, items: [] };
    }

    let updatedItems = tree.items.filter((item) => {
      if (item.isFolder) {
        const updatedSubTree = deleteNode(item, id);
        return updatedSubTree.items.length > 0;
      }
      return item.id !== id;
    });
    return { ...tree, items: updatedItems };
  }

  return { insertNode, deleteNode };
};

export default useTraverseTree;

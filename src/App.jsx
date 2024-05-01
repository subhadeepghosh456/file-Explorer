import { useState } from "react";
import "./App.css";
import Folder from "./component/Folder";
import explorer from "./Data/Explorer";
import useTraverseTree from "./hooks/useTraverseTree";

function App() {
  const [data, setData] = useState(explorer);

  const { insertNode, deleteNode } = useTraverseTree();
  const handleInsertNode = (folderId, item, isFolder) => {
    const tree = insertNode(data, folderId, item, isFolder);
    setData(tree);
  };
  const handleDeleteNode = (tree, id) => {
    const updatedtree = deleteNode(tree, id);
    console.log(updatedtree);
    setData(updatedtree);
  };

  return (
    <div>
      <Folder
        explorer={data}
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
      />
    </div>
  );
}

export default App;

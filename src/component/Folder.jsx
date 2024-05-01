import React, { useState } from "react";

const Folder = ({ explorer, handleInsertNode, handleDeleteNode }) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handlePropagation = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };
  // console.log(explorer);

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    handleDeleteNode(explorer, id);
    setShowInput({ ...showInput, visible: false });
    // console.log(id);
  };

  if (explorer.isFolder) {
    return (
      <div>
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span>
            {expand ? "📂" : "📁"}
            {explorer.name}
          </span>
          <div style={{ display: "flex", gap: "2px" }}>
            <button onClick={(e) => handlePropagation(e, true)} className="btn">
              +📁
            </button>
            <button
              onClick={(e) => handlePropagation(e, false)}
              className="btn"
            >
              +📃
            </button>
            <button
              onClick={(e) => handleDelete(e, explorer.id)}
              className="btn"
            >
              ✖
            </button>
          </div>
        </div>
        <div
          style={{ display: expand ? "block" : "none", paddingLeft: "21px" }}
        >
          {showInput.visible && (
            <div className="input__Container">
              <span>{showInput.isFolder ? "📁" : "📃"}</span>
              <input
                type="text"
                className="input"
                onKeyDown={onAddFolder}
                autoFocus
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}
          {explorer.items.map((exp) => {
            return (
              <Folder
                key={exp.id}
                explorer={exp}
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <span className="file">
        {" "}
        <span>
          {" "}
          📃{explorer.name}{" "}
          <button className="btn" onClick={(e) => handleDelete(e, explorer.id)}>
            ✖
          </button>{" "}
        </span>
      </span>
    );
  }
};

export default Folder;

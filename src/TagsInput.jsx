import React from "react";
import tagStore from "./tagStore.js";
import CustomModal from "./CustomModal.jsx";
import { observer } from "mobx-react-lite";
import ContentEditable from "react-contenteditable";
import ColorPicker from "./ColorPicker.jsx";
const TagsInput = observer(function TagsInput(props) {
  return (
    <div>
      {tagStore.tags.map(tag => (
        <React.Fragment>
          <ColorPicker
            setColor={color => tagStore.updateColor(tag.id, color)}
            color={tag.color}
          />
          <Tag
            name={tag.name}
            updateTag={text => tagStore.updateTag(tag.id, text)}
            canDelete={tag.canDelete}
            deleteTag={() => tagStore.deleteTag(tag.id)}
          />
        </React.Fragment>
      ))}

      <TagForm />
    </div>
  );
});
const Tag = observer(function Tag({ name, updateTag, canDelete, deleteTag }) {
  return (
    <span>
      <ContentEditable
        html={name} // innerHTML of the editable div
        disabled={false} // use true to disable editing
        onChange={e => updateTag(e.target.value)} // handle innerHTML change
        tagName="span" // Use a custom HTML tag (uses a div by default)
      />
      {canDelete ? (
        <CustomModal modalText="X" contentLabel="Delete tag">
          <span>
            Are you sure you want to delete the tag? Everything related to it
            will be set to Other.
            <button onClick={() => deleteTag()}>Delete tag</button>
          </span>
        </CustomModal>
      ) : null}
    </span>
  );
});
function TagForm({ updateTags }) {
  const [value, onChange] = React.useState("");

  const onEnter = e => {
    if (e.key === "Enter" && value != "") {
      tagStore.addTag(value);
      onChange("");
    }
  };
  return (
    <input
      onKeyDown={onEnter}
      onChange={e => onChange(e.target.value)}
      value={value}
    />
  );
}
export default TagsInput;

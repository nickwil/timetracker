import React from "react";
import { observer } from "mobx-react-lite";

const Tags = observer(function Tags({ tags, onChange, defaultTagId }) {
  return (
    <select data-testid="tags-selection" onChange={e => onChange(e.target.value)}>
      {tags.map((tag, index) => (
        <Tag tag={tag} defaultTagId={defaultTagId} />
      ))}
    </select>
  );
});

const Tag = observer(function Tag({ tag, defaultTagId }) {
  if (defaultTagId == tag.id) {
    return (
      <option selected="selected" value={tag.id}>
        {tag.name}
      </option>
    );
  } else {
    return <option value={tag.id}>{tag.name}</option>;
  }
});
export default Tags;

import React from 'react'
import { observer } from 'mobx-react-lite'

const Tags = observer(function Tags({ tags, onChange, defaultTagId }) {
  const defaultTag = tags.filter(tag => tag.id === defaultTagId)[0].id
  return (
    <select
      defaultValue={defaultTag}
      data-testid="tags-selection"
      onChange={e => onChange(e.target.value)}
    >
      {tags.map((tag, index) => (
        <option key={'tag-key-id' + tag.id} value={tag.id}>
          {tag.name}
        </option>
      ))}
    </select>
  )
})
export default Tags

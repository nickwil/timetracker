import React from 'react'
import CustomModal from '../general/CustomModal.jsx'
import { observer } from 'mobx-react-lite'
import ColorPicker from './ColorPicker.jsx'
import Button from "../general/Button.jsx"
import styles from "./TagsInput.module.css"

const TagsInput = observer(function TagsInput({ tagStore }) {
  return (
    <section>
      <h2>Tags Editor</h2>
      <section aria-labelledby="current-tags-header">
        <h3 id="current-tags-header">Current Tags</h3>
        {tagStore.tags.map(tag => (
          <div key={'tags-input-editor-' + tag.id}>
            <Tag
              tagStore={tagStore}
              name={tag.name}
              updateTag={text => tagStore.updateTag(tag.id, text)}
              canDelete={tag.canDelete}
              deleteTag={() => tagStore.deleteTag(tag.id)}
            />
            <ColorPicker
              setColor={color => tagStore.updateColor(tag.id, color)}
              color={tag.color}
            />
          </div>
        ))}
      </section>

      <TagForm tagStore={tagStore} />
    </section>
  )
})
const Tag = observer(function Tag({
  name,
  updateTag,
  canDelete,
  deleteTag,
  tagStore,
}) {
  const [editing, updateEditing] = React.useState(false)
  return (
    <span>
      {editing ? (
        <label>
          Editing tag:{' '}
          <input onChange={e => updateTag(e.target.value)} value={name} />
        </label>
      ) : (
        <span>{name}</span>
      )}

      <Button className={styles.big} onClick={() => updateEditing(!editing)}>
        {editing ? 'Save' : 'Edit'}
      </Button>

      {canDelete ? (
        <CustomModal modalText="X" contentLabel="Delete tag">
          <span>
            Are you sure you want to delete the tag? Everything related to it
            will be set to Other.
            <Button onClick={() => deleteTag()}>Delete tag</Button>
          </span>
        </CustomModal>
      ) : null}
    </span>
  )
})
function TagForm({ updateTags, tagStore }) {
  const [value, onInputChange] = React.useState('')

  const onSubmit = e => {
    e.preventDefault()

    if (value !== '') {
      tagStore.addTag(value)
      onInputChange('')
    }
  }
  return (
    <div>
      <h3>Add a new tag</h3>
      <form onSubmit={e => onSubmit(e)}>
        <label>
          New tag:
          <input onChange={e => onInputChange(e.target.value)} value={value} />
        </label>
        <Button className={styles.big} type="submit"> Add </Button>
      </form>
    </div>
  )
}
export default TagsInput

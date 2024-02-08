# `useFormField()`

```jsx
import {useFormInstance, useFormField} from '@formulier/react'

function TextInput({name, label}) {
  const form = useFormInstance()
  const [field, meta] = useFormField(form, {name})

  return (
    <>
      <label htmlFor={field.id}>{label}</label>
      <input name={name} type="text" {...field} />
      {meta.error && <span>{meta.error}</span>}
    </>
  )
}
```

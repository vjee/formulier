# `useFormField()`

```jsx
import {useFormInstance, useFormField} from '@formulier/react'

function TextInput({name, label}) {
  const form = useFormInstance()
  const [field, meta] = useFormField(form, {name})

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input id={name} type="text" {...fieldProps} />
      {meta.error && <span>{meta.error}</span>}
    </>
  )
}
```

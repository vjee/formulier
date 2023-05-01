# `useFormInstance()`

```jsx
import {Form, useFormInstance} from '@formulier/react'

function Component() {
  const form = useCreateForm({
    initialValues: {name: 'Jeff'},
  })

  return (
    <Form form={form}>
      <SubComponent />
    </Form>
  )
}

function SubComponent({name, label}) {
  const form = useFormInstance()
}
```

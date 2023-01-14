# `useCreateForm()`

```tsx
import {useCreateForm} from '@formulier/react'

interface FormState {
  name: string
}

function Component() {
  const form = useCreateForm({
    initialValues: {name: 'Jeff'},
  })
}
```

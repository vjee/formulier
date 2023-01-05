# `useForm()`

```tsx
import { useForm } from '@formulier/react'

interface FormState {
  name: string
}

function Component() {
  const form = useForm({
    initialValues: { name: 'Jeff' },
  })
}
```

# `useCreateForm()`

```ts
function useCreateForm<V extends Values, P = Primitives>(
  options: FormulierOptions<V, P>,
): Formulier<V, P>
```

## Example

```jsx
import {useCreateForm} from '@formulier/react'

function Component() {
  const form = useCreateForm({
    initialValues: {name: 'Jeff'},
  })
}
```

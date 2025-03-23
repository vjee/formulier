# `useFormFieldValue()`

```ts
function useFormFieldValue<V extends Values, P, F extends string>(
  form: Formulier<V, P>,
  name: F,
  options?: FormFieldValueOptions<V, F>,
): UseFormFieldValueResult<V, F>
```

## Example

```jsx
import {useCreateForm, useFormFieldValue} from '@formulier/react'

function Component() {
  const form = useCreateForm({
    initialValues: {name: 'Jeff'},
  })
  const name = useFormFieldValue('name')
}
```

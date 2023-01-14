<p align="center">
  <a href="https://github.com/vjee/formulier" target="_blank" rel="noopener noreferrer">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/vjee/formulier/main/.github/formulier-logotype-banner-dark.svg">
      <img src="https://raw.githubusercontent.com/vjee/formulier/main/.github/formulier-logotype-banner-light.svg" alt="Formulier logo">
    </picture>
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/@formulier/react?style=flat-square" alt="Version">
  <img src="https://img.shields.io/bundlephobia/minzip/@formulier/react?style=flat-square" alt="Bundle size">
  <img src="https://img.shields.io/npm/l/@formulier/react?style=flat-square" alt="License">
</p>

# @formulier/react

> Simple, performant form library for React

## Docs

Find the docs at [https://vjee.github.io/formulier/](https://vjee.github.io/formulier/).

## Example

```jsx
import {
  Form,
  useCreateForm,
  useFormInstance,
  useFormField,
} from '@formulier/react'

function MyForm() {
  const form = useCreateForm({
    initialValues: {
      firstName: 'Nico',
      age: 26,
    },
  })

  const handleSubmit = values => {
    // handle form submission
    console.log(`${values.firstName} is ${values.age} years old.`)
  }

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <TextField name="firstName" placeholder="First name" />
      <IntegerField name="age" placeholder="Age" />

      <button type="submit">Submit</button>
    </Form>
  )
}

function TextField({name, placeholder}) {
  const form = useFormInstance()
  const [field] = useFormField(form, {name})

  return (
    <input
      type="text"
      placeholder={placeholder}
      {...field}
      value={field.value || ''}
      onChange={event => field.onChange(event.target.value)}
    />
  )
}

function IntegerField({name, placeholder}) {
  const form = useFormInstance()
  const [field] = useFormField(form, {name})

  return (
    <input
      type="number"
      placeholder={placeholder}
      {...field}
      value={field.value || ''}
      onChange={event => field.onChange(parseInt(event.target.value, 10))}
    />
  )
}
```

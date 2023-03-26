<p align="center">
  <a href="https://github.com/vjee/formulier" target="_blank" rel="noopener noreferrer">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/vjee/formulier/main/.github/formulier-logotype-banner-dark.svg">
      <img src="https://raw.githubusercontent.com/vjee/formulier/main/.github/formulier-logotype-banner-light.svg" alt="Formulier logo">
    </picture>
  </a>
</p>

# Formulier

> Simple, performant form library for React

## Docs

Find the docs at [https://vjee.github.io/formulier/](https://vjee.github.io/formulier/).

## Packages

| Package                                                                        | Details                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@formulier/core](https://github.com/vjee/formulier/tree/main/packages/core)   | [![version](https://img.shields.io/npm/v/@formulier/core?style=flat-square)](https://github.com/vjee/formulier/blob/main/packages/core/CHANGELOG.md) ![bundle size](https://img.shields.io/bundlephobia/minzip/@formulier/core?style=flat-square) ![license](https://img.shields.io/npm/l/@formulier/core?style=flat-square)     |
| [@formulier/react](https://github.com/vjee/formulier/tree/main/packages/react) | [![version](https://img.shields.io/npm/v/@formulier/react?style=flat-square)](https://github.com/vjee/formulier/blob/main/packages/react/CHANGELOG.md) ![bundle size](https://img.shields.io/bundlephobia/minzip/@formulier/react?style=flat-square) ![license](https://img.shields.io/npm/l/@formulier/react?style=flat-square) |

## React example

```jsx
import {
  FormProvider,
  useCreateForm,
  useFormInstance,
  useFormField,
  useSubmitHandler,
} from '@formulier/react'

function MyForm() {
  const form = useCreateForm({
    initialValues: {
      firstName: 'Nico',
      age: 26,
    },
  })

  const onSubmit = useSubmitHandler(form, values => {
    // handle form submission
    console.log(`${values.firstName} is ${values.age} years old.`)
  })

  return (
    <form onSubmit={onSubmit}>
      <FormProvider form={form}>
        <TextField name="firstName" placeholder="First name" />
        <IntegerField name="age" placeholder="Age" />
        <button type="submit">Submit</button>
      </FormProvider>
    </form>
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

# Getting Started

## Basic Example

Let's start with a basic example.\
Below is a form that asks for a first name, last name and email address.

```jsx
import { Form, useForm, useFormField, useFormContext } from '@formulier/react'

function Example() {
  const form = useForm({ firstName: '', lastName: '', email: '' })

  return (
    <Form
      form={form}
      onSubmit={values => {
        alert(JSON.stringify(values, null, 2))
      }}
    >
      <InputField name="firstName" label="First name" />
      <InputField name="lastName" label="Last name" />
      <InputField name="email" label="Email" type="email" />

      <button type="submit">Submit</button>
    </Form>
  )
}

function InputField({ name, label, type = 'text' }) {
  const form = useFormContext()
  const [field] = useFormField(form, { name })

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input {...field} type={type} />
    </div>
  )
}
```

<react-component name="example" />

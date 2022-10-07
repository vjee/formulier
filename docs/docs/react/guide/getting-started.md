# Getting Started

## Basic Example

Let's start with a basic example.\
Below is a form that asks for a first name, last name and email address.

<<< @/react-components/guide-getting-started-example.jsx
<ReactComponent name="react-components/guide-getting-started-example.jsx" />

## Quick Explination

The first thing we need to set up a form is the `useForm` hook.
This hook creates a form store with initial values for its form fields.
This form store contains all the form's data and usefull methods to set values and more.

Then we render the `Form` component provided by `@formulier/react` and pass it the form store and a submit handler that's called with the form values when the user submits the form.

The last piece to the puzzle is the `useFormField` hook.
We pass this hook the form store, a name and an optional validator function.
`useFormField` provides us with everything we need to render the input elements for our form.

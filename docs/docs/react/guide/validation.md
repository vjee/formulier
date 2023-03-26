# Validation

_Formulier_ supports field-level validation.
This means you provide each form field that needs validation with an optional validator function.
This makes it easy to validate when the form has conditional fields or requires dynamic validation rules depending on other fields for example.

## Example: Min Length

Let's validate that the `firstName` and `lastName` are at least 2 characters long.\
We start with the form we made on the [Getting Started](./getting-started) page.

<<< @/react-components/guide-validation-min-length.jsx{20,21,30,32-43,45,59}

## Example: Required

Let's also make sure that all our fields are always filled out.\
Continuing on where we left off:

<<< @/react-components/guide-validation-required.jsx{20-22,30,35-39,47}

## Example: Results

Below you can see the result of our changes.

<ReactComponent title="" name="react-components/guide-validation-required.jsx" />

## Validation Timing

`validation` functions are called:

- When the user tries to submit the form
- When the field loses focus (Meaning the user "touched" the field)
- When the field is touched and the value changes (E.g. the user types a character in the input)

### Example

Imagine the user focuses the `firstName` field and tabs to the `lastName` field.
The `firstName` field will now show the `"Value is required!"` error.
If the user then goes back to `firstName` and types one character, the validation function is run again and now the error will be `"Value should be at least 2 characters long!"`.
Adding 2 more characters will make the error disappear.

## Validation Order

It's important to note that a field can only have one error at a time.
Therefore whichever error string is returned by our `validate` function is the one that's available from `meta.error`.

In our example above it makes sense to validate `required` _before_ `minLength` so if we leave the field empty, we will see the required error instead of the min length one.

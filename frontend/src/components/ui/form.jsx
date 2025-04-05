import React, { createContext, useContext } from 'react';
import { Slot } from "@radix-ui/react-slot"
import { useFormContext, useFormState  } from 'react-hook-form';
import { cn } from "@/lib/utils"

// --- Form Context ---
const FormFieldContext = createContext(undefined);

// --- Form Field Hook ---
const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext?.name });
  const fieldState = fieldContext ? getFieldState(fieldContext.name, formState) : { error: undefined };

  if (!fieldContext) {
    throw new Error("useFormField should be used within a <FormField> component.");
  }

  const { id } = useContext(FormItemContext);

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

// --- Form Item Context ---
const FormItemContext = createContext({ id: '' });

// --- Form ---
const Form = ({ children, ...props }) => {
    const methods = useForm(); 
    return (
        <FormProvider {...props} {...methods}>
            {children}
        </FormProvider>
    )
};

// --- Form Item ---
function FormItem({ className, children, ...props }) {
  const id = React.useId();

  return (
    React.createElement(FormItemContext.Provider, { value: { id } },
      React.createElement("div", { "data-slot": "form-item", className: cn("grid gap-2", className), ...props },
        children
      )
    )
  );
}

// --- Form Label ---
function FormLabel({ className, children, ...props }) {
  const { error, formItemId } = useFormField();

  return (
    React.createElement("label", {
      "data-slot": "form-label",
      "data-error": !!error,
      className: cn("text-sm font-medium", error && "text-destructive", className),
      htmlFor: formItemId,
      ...props
    }, children)
  );
}

// --- Form Control ---
function FormControl({ children, ...props }) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  const ariaProps = {
    id: formItemId,
    "aria-describedby": !error
      ? formDescriptionId
      : `${formDescriptionId} ${formMessageId}`,
    "aria-invalid": !!error,
  };

  return (
    React.createElement(Slot, { "data-slot": "form-control", ...props, ...ariaProps },
      children
    )
  );
}

// --- Form Description ---
function FormDescription({ className, children, ...props }) {
  const { formDescriptionId } = useFormField();
  return (
    React.createElement("p", {
      "data-slot": "form-description",
      id: formDescriptionId,
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }, children)
  );
}

// --- Form Message ---
function FormMessage({ className, children, ...props }) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : children;

  if (!body) {
    return null;
  }

  return (
    React.createElement("p", {
      "data-slot": "form-message",
      id: formMessageId,
      className: cn("text-destructive text-sm", className),
      ...props
    }, body)
  );
}

// --- Form Field ---
function FormField({ name, children, control, ...props }) {
  const methods = useFormContext();
  const resolvedControl = control || methods;

    return (
        React.createElement(FormFieldContext.Provider, { value: { name: name } },
            children
        )
    );
}

// --- Example Component ---
const MyForm = () => {
  const form = useForm({ // Assumes useForm is in scope
    defaultValues: {
      username: "",
      email: "",
      role: "",
      bio: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    React.createElement(Form, { ...form },
      React.createElement("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-6 p-6 bg-white/5 backdrop-blur-md rounded-xl shadow-lg border border-white/10 max-w-2xl mx-auto" },
        React.createElement(FormField, {
          control: form.control,
          name: "username",
          render: ({ field }) => (
            React.createElement(FormItem, null,
              React.createElement(FormLabel, null, "Username"),
              React.createElement(FormControl, null,
                React.createElement("input", {
                    placeholder: "Enter your username",
                    ...field,
                    className: "bg-black/20 text-white border-purple-500/30 placeholder:text-gray-500 focus:ring-purple-500 focus:border-purple-500/50",
                })
              ),
              React.createElement(FormDescription, null, "This is your public display name."),
              React.createElement(FormMessage, null)
            )
          ),
        }),
        React.createElement(FormField, {
          control: form.control,
          name: "email",
          render: ({ field }) => (
            React.createElement(FormItem, null,
              React.createElement(FormLabel, null, "Email"),
              React.createElement(FormControl, null,
                React.createElement("input", {
                    placeholder: "Enter your email",
                    type: "email",
                    ...field,
                    className: "bg-black/20 text-white border-purple-500/30 placeholder:text-gray-500 focus:ring-purple-500 focus:border-purple-500/50",
                })
              ),
              React.createElement(FormMessage, null)
            )
          ),
        }),
        React.createElement(FormField, {
          control: form.control,
          name: "role",
          render: ({ field }) => (
            React.createElement(FormItem, null,
              React.createElement(FormLabel, null, "Role"),
              React.createElement(FormControl, null,
                React.createElement("select", {
                    onValueChange: field.onChange,
                    value: field.value,
                    className: "w-full bg-black/20 text-white border-purple-500/30 placeholder:text-gray-500 focus:ring-purple-500 focus:border-purple-500/50 rounded-md py-2 px-3", // Added classes
                  },
                  React.createElement("option", { value: "" }, "Select a role"),
                  React.createElement("option", { value: "admin" }, "Admin"),
                  React.createElement("option", { value: "editor" }, "Editor"),
                  React.createElement("option", { value: "viewer" }, "Viewer"),
                ),
              ),
              React.createElement(FormMessage, null)
            )
          ),
        }),

        React.createElement(FormField, {
          control: form.control,
          name: "bio",
          render: ({ field }) => (
            React.createElement(FormItem, null,
              React.createElement(FormLabel, null, "Bio"),
              React.createElement(FormControl, null,
                React.createElement("textarea", {
                    placeholder: "Tell us about yourself",
                    ...field,
                    className: "bg-black/20 text-white border-purple-500/30 placeholder:text-gray-500 focus:ring-purple-500 focus:border-purple-500/50 rounded-md py-2 px-3",
                })
              ),
              React.createElement(FormDescription, null, "Max 250 characters."),
              React.createElement(FormMessage, null)
            )
          ),
        }),

        React.createElement("button", {
            type: "submit",
            className: "bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300",
          },
          "Submit"
        )
      )
    )
  );
};

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  MyForm
};

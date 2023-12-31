/**
 * React component that displays a feedback form and a thank you message.
 * Uses the Transition component from the "@headlessui/react" library to animate the form and thank you message based on the state of the form submission.
 *
 * Example Usage:
 * import { Feedback } from "./Feedback"
 *
 * function App() {
 *   return (
 *     <div>
 *       <h1>Welcome to My Website</h1>
 *       <Feedback />
 *     </div>
 *   )
 * }
 *
 * Inputs: None
 *
 * Flow:
 * 1. Renders a form with a question asking if the page was helpful.
 * 2. Form has two buttons, "Evet" (Yes) and "Hayır" (No), wrapped in a div with a grid layout.
 * 3. When the form is submitted, the `onSubmit` function is called, which prevents the default form submission behavior.
 * 4. The `onSubmit` function sets the `submitted` state to `true`, triggering the transition to the thank you message.
 * 5. The thank you message is displayed using the `Transition` component when the `submitted` state is `true`.
 *
 * Outputs:
 * - Renders a feedback form with a question and two buttons for the user to provide feedback.
 * - After submitting the form, a thank you message is displayed.
 */
"use client"

import { forwardRef, Fragment, useState } from "react"
import { Transition } from "@headlessui/react"

function CheckIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <circle cx="10" cy="10" r="10" strokeWidth="0" />
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m6.75 10.813 2.438 2.437c1.218-4.469 4.062-6.5 4.062-6.5"
      />
    </svg>
  )
}

function FeedbackButton(
  props: Omit<React.ComponentPropsWithoutRef<"button">, "type" | "className">
) {
  return (
    <button
      type="submit"
      className="hover:bg-zinc-900/2.5 px-3 text-sm font-medium text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
      {...props}
    />
  )
}

const FeedbackForm = forwardRef<
  React.ElementRef<"form">,
  Pick<React.ComponentPropsWithoutRef<"form">, "onSubmit">
>(function FeedbackForm({ onSubmit }, ref) {
  return (
    <form
      ref={ref}
      onSubmit={onSubmit}
      className="absolute inset-0 flex items-center justify-center gap-6 md:justify-start"
    >
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Bu sayfa yardımcı oldu mu?
      </p>
      <div className="group grid h-8 grid-cols-[1fr,1px,1fr] overflow-hidden rounded-full border border-zinc-900/10 dark:border-white/10">
        <FeedbackButton data-response="yes">Evet</FeedbackButton>
        <div className="bg-zinc-900/10 dark:bg-white/10" />
        <FeedbackButton data-response="no">Hayır</FeedbackButton>
      </div>
    </form>
  )
})

const FeedbackThanks = forwardRef<React.ElementRef<"div">>(
  function FeedbackThanks(_props, ref) {
    return (
      <div
        ref={ref}
        className="absolute inset-0 flex justify-center md:justify-start"
      >
        <div className="flex items-center gap-3 rounded-full bg-emerald-50/50 py-1 pl-1.5 pr-3 text-sm text-emerald-900 ring-1 ring-inset ring-emerald-500/20 dark:bg-emerald-500/5 dark:text-emerald-200 dark:ring-emerald-500/30">
          <CheckIcon className="h-5 w-5 flex-none fill-emerald-500 stroke-white dark:fill-emerald-200/20 dark:stroke-emerald-200" />
          Thanks for your feedback!
        </div>
      </div>
    )
  }
)

export function Feedback() {
  let [submitted, setSubmitted] = useState(false)

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // event.nativeEvent.submitter.dataset.response
    // => "yes" or "no"

    setSubmitted(true)
  }

  return (
    <div className="relative h-8">
      <Transition
        show={!submitted}
        as={Fragment}
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        leave="pointer-events-none duration-300"
      >
        <FeedbackForm onSubmit={onSubmit} />
      </Transition>
      <Transition
        show={submitted}
        as={Fragment}
        enterFrom="opacity-0"
        enterTo="opacity-100"
        enter="delay-150 duration-300"
      >
        <FeedbackThanks />
      </Transition>
    </div>
  )
}

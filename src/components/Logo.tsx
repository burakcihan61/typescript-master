export function Logo(props: React.ComponentProps<"div">) {
  return (
    <div {...props}>
      <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
        <span className="sr-only">Twilio</span>
        <span className="text-blue-600">TypeScript</span>
        <span className="text-blue-400">MASTER</span>
      </h1>
    </div>
  )
}

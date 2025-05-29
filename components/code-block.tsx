'use client';

interface CodeBlockProps {
  node: any;
  inline: boolean;
  className: string;
  children: any;
}

export function CodeBlock({
  node,
  inline,
  className,
  children,
  ...props
}: CodeBlockProps) {
  if (!inline) {
    return (
      <code 
        className="whitespace-pre-wrap break-words text-sm dark:text-zinc-50 text-zinc-900"
        {...props}
      >
        {children}
      </code>
    );
  } else {
    return (
      <code
        className={`${className} inline text-sm bg-zinc-100 dark:bg-zinc-800 py-0.5 px-1 rounded-md`}
        {...props}
      >
        {children}
      </code>
    );
  }
}

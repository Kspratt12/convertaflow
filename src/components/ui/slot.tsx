import * as React from "react"

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
}

const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, ...props }, ref) => {
    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...mergeProps(props, children.props as Record<string, unknown>),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref: ref as any,
      } as Record<string, unknown>)
    }

    if (React.Children.count(children) > 1) {
      React.Children.only(null)
    }

    return null
  }
)
Slot.displayName = "Slot"

function mergeProps(
  slotProps: Record<string, unknown>,
  childProps: Record<string, unknown>
) {
  const overrideProps = { ...childProps }

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName]
    const childPropValue = childProps[propName]

    if (
      propName === "style" &&
      typeof slotPropValue === "object" &&
      typeof childPropValue === "object"
    ) {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue }
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue]
        .filter(Boolean)
        .join(" ")
    } else if (
      typeof slotPropValue === "function" &&
      typeof childPropValue === "function"
    ) {
      overrideProps[propName] = (...args: unknown[]) => {
        childPropValue(...args)
        slotPropValue(...args)
      }
    } else if (slotPropValue !== undefined) {
      overrideProps[propName] = slotPropValue
    }
  }

  return { ...slotProps, ...overrideProps }
}

export { Slot }

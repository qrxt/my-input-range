import Props from "@interfaces/Props.interface";

export default
  (props: Props, children: JQuery<HTMLElement> | null | string): JQuery<HTMLElement> => {
    const {
      className
    } = props;

    const elem = $("<div>").addClass(className);

    if (children && typeof children === "object") {
      children.appendTo(elem);
    }

    if (typeof children === "string") {
      elem.text(children);
    }

    return elem;
  }

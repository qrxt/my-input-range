import Props from "@interfaces/Props.interface";

export default interface HandleProps extends Props {
  pos?: number
  parent?: JQuery<HTMLElement>
}

export default interface Model {
  value?: number
  percent?: number,

  min?: number,
  max?: number,
  step?: number,

  handleWidth: number | null,
  baseWidth: number | null,

  colors?: Array<string>
}

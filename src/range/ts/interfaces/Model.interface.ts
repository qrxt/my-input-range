export default interface Model {
  value?: number
  percent?: number,

  min?: number,
  max?: number,
  step?: number,

  vertical?: boolean,

  handleWidth: number | null,
  baseWidth: number | null,

  colors?: Array<string>
}

export default interface Model {
  value?: number
  percent?: number,

  min?: number,
  max?: number,
  step?: number,

  colors?: Array<string>
}

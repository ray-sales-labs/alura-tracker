import IProjectItem from "./IProjectItem";

export default interface ITaskItem {
  secondsDuration: number,
  description: string,
  project: IProjectItem
}
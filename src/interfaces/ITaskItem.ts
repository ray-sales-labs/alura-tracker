import IProjectItem from "./IProjectItem";

export default interface ITaskItem {
  id: number,
  secondsDuration: number,
  description: string,
  project: IProjectItem
}
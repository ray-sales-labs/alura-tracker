import IProjectItem from "./IProjectItem";

export default interface ITaskItem {
  id: string,
  secondsDuration: number,
  description: string,
  project: IProjectItem
}
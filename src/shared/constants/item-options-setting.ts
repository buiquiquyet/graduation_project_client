import { ListIcons } from "./list-icons";

export enum ItemOptionsKey {
    EDIT = "edit",
    DELETE = "delete",
  
}
export const  itemOptions = [
    { key: ItemOptionsKey.EDIT, label: ListIcons.getIcon("Chỉnh sửa") },
    { key: ItemOptionsKey.DELETE, label: ListIcons.getIcon("Xóa") },
  ];
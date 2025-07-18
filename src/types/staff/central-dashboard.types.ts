export type NavItemId = "prog" | "cert" | "reqs" | "sche";

export interface NavState {
  activeItem: NavItemId;
  setActiveItem: (id: NavItemId) => void;
}

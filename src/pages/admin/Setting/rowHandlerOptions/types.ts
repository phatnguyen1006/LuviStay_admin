export interface IHandlerProps {
  handler: () => void;
  options?: IOptions;
  disabled?: boolean;
}

export interface IOptions {
  selectList?: Array<ISelectList>;
  onTitle?: string;
  offTitle?: string;
  extraInformation?: string;
  title?: string;
}

export interface ISelectList {
  title: string;
  value: string;
}
export interface IDynamic {
  [key: string]: string | number | object | [] | null | undefined | boolean;
}

export interface ITableField extends IDynamic {
  key: string;
  label?: string;
  style?: {
    header?: {
      width?: number | string;
      display?: string;
      align?: string;
    };
    body?: object;
  };
  calssName?: {
    header?: string;
    body?: string;
  };
  component?: {
    obj?: object;
    callback?(row: object): void;
  };
  sort?: string;
  align?: 'center' | 'left' | 'right';
  isCollapse?: boolean;
}

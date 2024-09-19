export interface DropdownOptionType {
  type: string;
  name?: string;
  title?: string;
  description?: string;
}

export enum CategoryType {
  Symbol = 'symbol',
  Page = 'page',
  Person = 'person',
  Headline = 'headline'
}

export interface CVTemplate {
  name: string
  primaryColor: string;
  personal: PersonalComponent[];
  layout: Column[];
}
export interface PersonalComponent {
  title: string;
  field: string;
  icon: string;
  fieldName: string;
}
export interface Column {
  backgroudColor: string;
  size: number;
  componentList: CVComponent[];
}
export interface CVComponent {
  componentName: string;
  icon: string;
  title: string;
  header: string;
  dataType: 'image' | 'information' | 'text';
  description: string;
}

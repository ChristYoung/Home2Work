import {DemoItem} from 'app/domain/demo-item';

export interface DemoListItem {
  demoClass: string;
  demoItems: Array<DemoItem>;
}

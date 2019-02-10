import * as fromRoot from '../../store/app.state';
import { CustomGridState } from './entities/custom-grid.entity';

export interface AppState extends fromRoot.AppState {
  customGrids: CustomGridState;
}

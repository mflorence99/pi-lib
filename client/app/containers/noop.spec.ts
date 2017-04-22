import { TestBed, async } from '@angular/core/testing';

import { AppModule } from '../app.module';
import { NoopComponent } from './noop';

describe('NoopComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ],
      declarations: [ ],
    }).compileComponents();
  }));
});

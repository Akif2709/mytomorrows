import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
// import { ChildrenOutletContexts } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  // const mockContexts = {
  //   getContext: jest.fn(() => ({
  //     route: {
  //       snapshot: {
  //         data: {
  //           animation: 'slide-in',
  //         },
  //       },
  //     },
  //   })),
  // };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should get route animation data', () => {
  //   const animationData = component.getRouteAnimationData();

  //   expect(animationData).toEqual('slide-in');
  //   expect(mockContexts.getContext).toHaveBeenCalledWith('primary');
  // });
});

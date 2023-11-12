import {
  trigger,
  transition,
  animate,
  style,
  query,
  group,
} from '@angular/animations';

const distances = {
  normalX: 'translateX(0%)',
  right: 'translateX(150%)',
  left: 'translateX(-150%)',
};

export const slideInAnimation = trigger('routeAnimations', [
  transition('LeftPage => RightPage', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        width: '100%',
      }),
    ]),
    query(':leave', [style({ transform: distances.normalX })]),
    query(':enter', [style({ transform: distances.right })]),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ transform: distances.left })),
      ]),
      query(':enter', [
        animate('300ms ease-out', style({ transform: distances.normalX })),
      ]),
    ]),
  ]),

  transition('RightPage => LeftPage', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        width: '100%',
      }),
    ]),
    query(':leave', [style({ transform: distances.normalX })]),
    query(':enter', [style({ transform: distances.left })]),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ transform: distances.right })),
      ]),
      query(':enter', [
        animate('300ms ease-out', style({ transform: distances.normalX })),
      ]),
    ]),
  ]),
]);

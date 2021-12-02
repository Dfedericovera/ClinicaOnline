import { trigger, transition, style, query, group, animateChild, animate } from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    /*  transition('login <=> home', [
       style({ position: 'relative' }),
       query(':enter, :leave', [
         style({
           position: 'absolute',
           top: 0,
           left: 0,
           width: '100%'
         })
       ]),
       query(':enter', [
         style({ left: '-100%'})
       ]),
       query(':leave', animateChild()),
       group([
         query(':leave', [
           animate('1000ms ease-out', style({ left: '100%'}))
         ]),
         query(':enter', [
           animate('1000ms ease-out', style({ left: '0%'}))
         ])
       ]),
       query(':enter', animateChild()),
     ]), */
    /* transition('login <=> signupPatient', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ right: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('1000ms ease-out', style({ right: '100%' }))
        ]),
        query(':enter', [
          animate('1000ms ease-out', style({ right: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]), */
    /* 
    transition('login <=> home', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ right: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('1000ms ease-out', style({ right: '100%' }))
        ]),
        query(':enter', [
          animate('1000ms ease-out', style({ right: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]), */
    /* 
    transition('home <=> signupPatient', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ right: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('1000ms ease-out', style({ right: '100%' }))
        ]),
        query(':enter', [
          animate('1000ms ease-out', style({ right: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]), */
    /* 
    transition('home <=> signupProfessional', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ right: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('1000ms ease-out', style({ right: '100%' }))
        ]),
        query(':enter', [
          animate('1000ms ease-out', style({ right: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]), */
    /* 
    transition('home <=> signupAdministrator', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ right: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('1000ms ease-out', style({ right: '100%' }))
        ]),
        query(':enter', [
          animate('1000ms ease-out', style({ right: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]), */
    /* 
    transition('HomePage <=> AboutPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '100%' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]), */

    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0,
          transform: 'scale(1) translateY(-100%)'
        })
      ], { optional: true }
      ),
      query(':enter', [
        animate('600ms ease',
          style({ opacity: 1, transform: 'scale(1) translateY(0)' })
        )
      ],{ optional: true }),
      query(':leave', [
        animate('600ms ease',
          style({ opacity: 1, transform: 'scale(1) translateY(0)' })
        )
      ],{ optional: true }),
      /*       query(':leave', animateChild()),
            group([
              query(':leave', [
                animate('1000ms ease-out', style({ top: '100%' }))
              ]),
              query(':enter', [
                animate('1000ms ease-out', style({ top: '0%' }))
              ])
            ]),
            query(':enter', animateChild()), */
    ])

  ]);
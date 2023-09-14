# Why Separate SCSS from React code?

This is admittedly idiosyncratic. There are three reasons:

1. _Portability_ Same SCSS folder can be used across projects.
2. _Maintainability_ Easy to give SCSS work to a pure front-end team or outsource.
3. _Consistency_ If the SCSS (including design system lib, e.g. MUI) is good, there should be little need for Component-specific SCSS. A text input in one Component should as a rule with rare exceptions look exactly like a text input in all the other Components.

## Notes for refactor

Move _component_ scss to live with respective components. Code here should be for the app "skin"

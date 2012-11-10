#CatsJS

The goal of this project is to create a light-weight DOM API that optionally supports legacy browsers.  *This project is currently "pre-alpha" and is subject to major changes.*

## Currently Supported APIs


- Attributes
-- attr - behaves much like jQuery **this might change to expose setAttribute and getAttribute directly**
-- removeAttr

- Classes
-- addClass
-- removeClass
-- hasClass

- CSS
-- css - behaves much like jQuery

- Events (currently does not support delegation)
-- on
-- off
-- fire

- Misc utilities
-- indexOf (`Array.prototype.indexOf`)
-- each - `Array.forEach` replacement; *Note: does not set `this` keyword*


##Contributing

Please do. We accept all sorts of pull requests.  **Every change should have corresponding unit tests.**  If you found a bug, make sure you add a unit test that covers that bug.

Please enjoy this cat:

	/\___/\
	\ -.- /
	`-.^.-'
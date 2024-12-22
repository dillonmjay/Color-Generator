# Color generator
A color generator application using react.js along with state management and other libaries.

## Libraries used
### 1) Values.js
Allows us to generate tints and shades for colors.
```
import Values from 'values.js'
let colors = new Values(initialColor)

let tints = colors.tints(10).map(tint =>"#"+tint.hex) // accessing tints
let shades = colors.shades(10).map(shade =>"#"+shade.hex) // accessing shades
```

### 2) ClipBoard API
We can use the `navigator` keyword to access the clipboard in order to copy text from it and use it later.
```
 navigator.clipboard.writeText(color);
```

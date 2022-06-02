# amgif

Convert Figma Components to SVG files

## Example

```yml
runs-on: ubuntu-latest
steps:
    - uses: actions/checkout@v3
    - uses: hrdtbs/amgif@main
    with:
        token: ${{ secrets.FIGMA_TOKEN }}
        id: 7DMwX32ceqkPjENx1xSS5G
        output: source
```

## Local run

ref: https://github.com/actions/toolkit/blob/main/packages/core/src/core.ts#L128-L140

```command
INPUT_TOKEN=[Figma Personal Access Token] INPUT_OUTPUT=[Output Directory] INPUT_ID=[Figma Project ID] node ./dist/main.js
```

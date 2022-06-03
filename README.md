# figma2svg

Convert Figma components to SVG files

## Example

```yml
runs-on: ubuntu-latest
steps:
    - uses: actions/checkout@v3
    - uses: hrdtbs/figma2svg@main
    with:
        token: ${{ secrets.FIGMA_TOKEN }}
        id: 7DMwX32ceqkPjENx1xSS5G
        output: source
        keep_directory: true
```

## Example: Figma components to React components

Use [@svgr/cli
](https://www.npmjs.com/package/@svgr/cli)

```yml
on: workflow_dispatch

jobs:
  main:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Figma components to SVG
        uses: hrdtbs/figma2svg@main
        with:
          token: ${{ secrets.FIGMA_TOKEN }}
          id: 7DMwX32ceqkPjENx1xSS5G
          output: svg

      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: [14.x]
          
      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: SVG to React components
        run: npx svgr svg/**/*.svg --out-dir src

      - name: Create commits
        run: |
          git config user.name github-actions[bot]
          git config user.email github-actions[bot]@users.noreply.github.com
          git add .
          git commit -m 'feat(svg): update'

      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v4
        with:
          title: "feat(svg): update"
          branch: "feat/${{ github.run_id }}-${{ github.run_attempt }}"
```


## Local run

ref: https://github.com/actions/toolkit/blob/main/packages/core/src/core.ts#L128-L140

```command
INPUT_TOKEN=[Figma Personal Access Token] INPUT_OUTPUT=[Output Directory] INPUT_ID=[Figma Project ID] node ./dist/main.js
```

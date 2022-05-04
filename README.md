# vue-hierarchical-select

A Hierarchical select plugin for vue2

##  DEMO

[http://wdda.github.io/vue-hierarchical-select/demo](http://wdda.github.io/vue-hierarchical-select/demo)

##  NPM

```bash
    npm install vue-hierarchical-select
```

##  ES6

```javascript
    import HierarchicalSelect from  'vue-hierarchical-select'
	
    new Vue({
      components: {
        HierarchicalSelect
      }
    })
```

## Usage

```html
    <div id="app">
        <hierarchical-select :nodes="nodes"></hierarchical-select>
    </div>
    
   <script>
      new Vue({
        el: '#app',
        data: {
          nodes: [
            {
              name: 'test1',
              id: 2,
              children: [
                {name: 'test2', id: 3},
                {name: 'test3', id: 4},
              ]
            }
          ],
        }
      })
    </script>
```

## API

| Props               | Type               | Default                 | Description                                                                                    |
|---------------------|--------------------|-------------------------|------------------------------------------------------------------------------------------------|
| nodes               | Array              |                         | Tree of data                                                                                   |
| selected            | String  or  Number | null                    | Selected value                                                                                 |
| name                | String             | name[]                  | Input name                                                                                     |
| option-value        | String             | id                      |                                                                                                |
| option-name         | String             | name                    |                                                                                                |
| option-name-default | String             | - choice -              |                                                                                                |
| css-classes         | Array  or  Object  | vue-hierarchical-select | For input element                                                                                  |
| css-styles          | String             | null                    | For input element                                                                              |
| onlyLast            | Boolean            | false                   | Return only last selected option                                                               |
| transitionName      | String             | null                    | Name of transition classes                                                                     |
| maxColumnWidth      | Number             | 10000                   | max-width for change direction to 'row' or 'column', where 0 is only row and 10000 only column |


## Methods

| Method        | Params        |
| ------------- |:-------------:|
| changeSelect      | value |


## License

Licensed under the [MIT license](https://opensource.org/licenses/mit-license.php).

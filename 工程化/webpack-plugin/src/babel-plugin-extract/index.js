/**
 * 
  import { cloneDeep, get } from 'lodash';
  ↓ ↓ ↓ ↓ ↓ ↓
  import cloneDeep from 'lodash/cloneDeep'
  import get from 'lodash/get'
 */
function myPlugin (babel) {
    const { types: t } = babel;
    
    return {
      visitor: {
        // 路径节点、插件选项
        ImportDeclaration(path, _ref = {opts:{}}){
          const specifiers = path.node.specifiers; // 说明符 
          const source = path.node.source;         // source 来源
         // 判断是不是来自 import
         if (!t.isImportDefaultSpecifier(specifiers[0]) ) {
               //遍历  cloneDeep get
              var declarations = specifiers.map((specifier) => {  
                //创建importImportDeclaration节点，两个参数，后面的参数替代前面的
                return t.ImportDeclaration(                     
                      [t.importDefaultSpecifier(specifier.local)],
                      t.StringLiteral(`${source.value}/${specifier.local.name}`)
                  )
              })
              path.replaceWithMultiple(declarations)
          }
        }
      }
    };
  }
  
  module.exports = myPlugin
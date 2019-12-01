export default function (babel) {
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
                //创建importImportDeclaration节点
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
  
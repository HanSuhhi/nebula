module.exports = (source) => {
  // 获取style
  const styleIndex = source.lastIndexOf("style:");
  let style = source.slice(styleIndex, source.length);
  style = style.slice(style.indexOf("{") + 1, style.lastIndexOf("}")).trim();
  source = source.slice(0, styleIndex);
  // 获取变量
  source = source.split("{{");
  source = source.map((sour) => {
    return sour.trim();
  });
  source = source.join("{{");
  source = source.split("}}");
  source = source.map((sour) => {
    return sour.trim();
  });
  source = source.join("}}");
  console.log(source);
  let variates = source.match(/\{\{(.+?)\}\}/g);
  // 正文
  let securityNum = 0;
  let treeNodes = [];
  let tree = [];
  // 获取模板语法树
  while (source.length !== 0) {
    const ending = source.indexOf("\n");
    let statement =
      ending === -1 ? source.slice(0, source.length) : source.slice(0, ending);
    // 最后一句
    let blank = statement.match(/^\s*/)[0].length;
    let index = 0;
    // 确认父子次序
    let lastNode = treeNodes[securityNum - 1];
    if (lastNode) {
      if (blank !== lastNode[0]) {
        index = lastNode[1];
        let fatherBlank = lastNode[0];
        let childrenBlank = blank;

        index -= (fatherBlank - childrenBlank) / 2;
      } else {
        index = lastNode[1];
      }
    }
    // 确认语句
    statement = statement.slice(blank, statement.length);
    // 1 确认标签
    let type = statement.slice(0, statement.indexOf(" "));
    statement = statement
      .slice(statement.indexOf(" "), statement.length)
      .trim();
    // 2 确认text
    let text = undefined;
    // 2.1 仅还有一条属性
    if (statement.indexOf(" ") === -1 || statement.indexOf("-- ") === 0) {
      if (statement.indexOf("--") !== -1) {
        let stateIndex = statement.indexOf(" --");
        text = statement.slice(stateIndex + 3, statement.length).trim();
        statement = "";
      }
    } else {
      if (statement.indexOf(" --") !== -1) {
        let stateIndex = statement.indexOf(" --");
        text = statement.slice(stateIndex + 3, statement.length).trim();
        statement = statement.slice(0, stateIndex);
      }
    }
    // 3 确认key 及 props
    let key = undefined;
    let props = {
      class: undefined,
      id: undefined,
    };
    let nu = {};
    while (statement !== "") {
      if (statement.indexOf(" ") !== -1) {
        let fragment = statement.slice(0, statement.indexOf(" "));
        let back = decideProps(fragment.slice(0, 1), fragment);
        switch (back.length) {
          case 1:
            key = back[0];
            break;
          case 2:
            props[back[0]] = back[1];
            break;
          case 3:
            nu[back[0]] = back[1];
            break;
        }
        statement = statement.slice(
          statement.indexOf(" ") + 1,
          statement.length
        );
      } else {
        decideProps(statement.slice(0, 1), statement);
        let back = decideProps(statement.slice(0, 1), statement);
        switch (back.length) {
          case 1:
            key = back[0];
            break;
          case 2:
            props[back[0]] = back[1];
            break;
          case 3:
            nu[back[0]] = back[1];
            break;
        }
        statement = "";
      }
    }

    // 保存节点
    treeNodes[securityNum] = [
      blank,
      index,
      type,
      text,
      key,
      props,
      nu,
      (children = []),
    ];
    source = ending === -1 ? "" : source.slice(ending + 1, source.length);
    // 安全阀值，防止爆栈
    if (securityNum++ > 20000) {
      throw Error("nubu has some questions");
    }
  }

  // 根据节点生成虚拟Dom树
  let stack = [];
  let answers = [];
  for (let i = 0; i < treeNodes.length; i++) {
    let node = {
      index: treeNodes[i][1],
      type: treeNodes[i][2],
      text: treeNodes[i][3]
        ? treeNodes[i][3].slice(0, treeNodes[i][3].length)
        : undefined,
      key: treeNodes[i][4],
      props: treeNodes[i][5],
      nu: treeNodes[i][6],
      children: treeNodes[i][7],
    };
    if (stack.length === 0) {
      stack.push(node);
      continue;
    }
    let lastNode = treeNodes[i - 1];
    let lastNodeIndex = lastNode[1];
    if (node.index >= lastNodeIndex) {
      stack.push(node);
    } else {
      if (node.index === 0) {
        // 出现第二个顶点
        stack[0].children.push(stack.splice(1, stack.length));
        answers.push(stack.pop());
      } else {
        // stack 内向上冒泡
        let nowIndex = node.index;
        let childrenArr = [];
        while (stack[stack.length - 1].index > nowIndex) {
          if (nowIndex + 1 === stack[stack.length - 1].index) {
            while (nowIndex + 1 === stack[stack.length - 1].index) {
              childrenArr.push(stack.pop());
            }
            stack[stack.length - 1].children.push(...childrenArr.reverse());
            childrenArr.length = 0;
            stack.push(node);
          } else {
            if (
              stack[stack.length - 2] &&
              stack[stack.length - 1].index === stack[stack.length - 2].index
            ) {
              childrenArr.push(stack.pop());
            } else {
              childrenArr.push(stack.pop());
              stack[stack.length - 1].children.push(...childrenArr.reverse());
              childrenArr.length = 0;
            }
          }
        }
      }
    }
  }
  if (answers.length > 0 && stack.length > 0) {
    stack[0].children.push(...stack.splice(1, stack.length));
    answers.push(stack[0]);
    tree = answers;
  } else if (answers.length === 0 && stack.length > 0) {
    stack[0].children.push(...stack.splice(1, stack.length));
    tree.push(stack[0]);
  } else if (answers.length > 0 && stack.length === 0) {
    tree = answers;
  }
  if (tree.length === 1) {
    tree = tree[0];
  } else {
    tree = {
      type: "div",
      text: "",
      key: "",
      props: [],
      nu: [],
      children: tree,
    };
  }
  tree.style = style;
  tree.variates = variates;
  return "module.exports =" + JSON.stringify(tree);
};

function decideProps(prop, statement) {
  switch (prop) {
    case ".":
      return ["class", statement.slice(1, statement.length)];
    case "#":
      return ["id", statement.slice(1, statement.length)];
    case ":":
      return [statement.slice(1, statement.length)];
    case "*":
      return [
        statement.slice(1, statement.indexOf("=")),
        statement.slice(statement.indexOf("=") + 1, statement.length),
        0,
      ];
    default:
      return [
        statement.slice(0, statement.indexOf("=")),
        statement.slice(statement.indexOf("=") + 1, statement.length),
      ];
  }
}

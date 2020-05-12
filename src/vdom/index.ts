export interface VNode {
  index: number;
  type: string;
  text?: string | undefined;
  key?: string | undefined;
  props?: any;
  nu?: any;
  children?: Array<VNode>;
  Dom?: any;
}

export class VDOM {
  private node: VNode;
  constructor(node: VNode) {
    this.node = node;
  }
  /**
   * @description 渲染虚拟节点
   * @param {VNode} [node=this.node]
   * @param {*} [container=document.querySelector("#nubule")]
   * @memberof VDOM 虚拟节点
   */
  public render(
    node: VNode = this.node,
    container: any = document.querySelector("#nubule")
  ) {
    let ele = this.createDomElementFrom(node);
    container.appendChild(ele);
  }
  /**
   * @description 生成DOM/
   * @private
   * @param {VNode} node
   * @returns
   * @memberof VDOM
   */
  private createDomElementFrom(node: VNode) {
    node.Dom = document.createElement(node.type);
    this.updateProperties(node);
    node.children &&
      node.children.forEach((child) => {
        this.render(child, node.Dom);
      });
    return node.Dom;
  }
  /**
   * @description 更新DOM 属性
   * @private
   * @param {*} domNode
   * @param {VNode} vnode
   * @param {*} [oldProperties={}]
   * @memberof VDOM
   */
  private updateProperties(vnode: VNode, oldProperties: any = {}) {
    let domElement = vnode.Dom;
    let props = vnode.props;
    if (vnode.text) {
      domElement.innerText = vnode.text;
    }
    // 新有旧无
    for (let prop in props) {
      domElement.setAttribute(prop, props[prop]);
    }
    // 旧有新无
    for (let prop in oldProperties) {
      if (!props[prop]) {
        delete domElement[prop];
      }
    }
  }
}

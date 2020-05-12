import { LoaderOptionsPlugin } from "webpack";
import { splitBrackets } from "../common/string";
import { VNode } from "../vdom";

const path = require("path");

export class BaseService {
  private SYMBOL!: symbol;
  private node: any;
  private nodeStyle: any;
  private variates: Map<string, any> = new Map();
  /**
   * @description 设置基本参数
   * @protected
   * @param {string} name
   * @memberof BaseService
   */
  protected create(name: string) {
    this.SYMBOL = Symbol(name);
    // 确认style
    const node = require(`./${name}.nubu`);
    console.log(node);
    this.nodeStyle = node.style;
    // 处理变量
    const variates = node.variates;
    let map = new Map();
    for (let variate of variates) {
      variate = variate
        .slice(variate.indexOf("{{") + 2, variate.indexOf("}}"))
        .trim();
      map.set(variate, -1);
    }
    this.variates = map;
    // 删除无关变量
    delete node.style;
    delete node.variates;
    this.node = node;
  }
  /**
   * @description 获取symbol
   * @protected
   * @returns
   * @memberof BaseService
   */
  public getOwnSymbol() {
    return this.SYMBOL;
  }
  /**
   * @description 获取节点
   * @protected
   * @returns
   * @memberof BaseService
   */
  public getNode() {
    return this.node;
  }
  /**
   * @description 获取style
   * @protected
   * @returns
   * @memberof BaseService
   */
  public getNodeStyle() {
    return this.nodeStyle;
  }
  /**
   * @description 获取变量
   * @protected
   * @returns
   * @memberof BaseService
   */
  public getvariates() {
    return this.variates;
  }
  /**
   * @description 设置变量
   * @param {string} title 变量名
   * @param {*} value 变量值
   * @memberof BaseService
   */
  public setVariate(title: string, value: any) {
    this.variates.set(title, value);
    this.replaceNodeVal(this.node, title, value);
  }
  private replaceNodeVal(node: VNode, title: string, value: any) {
    let index = 0;
    while (true) {
      if (node.text && node.text.indexOf(`{{${title}}}`) >= index) {
        node.text = node.text.replace(`{{${title}}}`, value);
        index = node.text.indexOf("{{");
        if (index === -1) {
          break;
        }
      } else {
        break;
      }
    }
    node.children?.forEach((child) => {
      this.replaceNodeVal(child, title, value);
    });
  }
}

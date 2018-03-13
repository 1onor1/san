/**
 * @file 生成子元素html
 * @author errorrik(errorrik@gmail.com)
 */

var escapeHTML = require('../runtime/escape-html');
var htmlBufferPush = require('../runtime/html-buffer-push');
var evalExpr = require('../runtime/eval-expr');
var getANodeProp = require('./get-a-node-prop');
var createNode = require('./create-node');

/**
 * 生成子元素html
 *
 * @param {Element} element 元素
 * @param {Object} buf html串存储对象
 */
function genElementChildrenHTML(element, buf) {
    if (element.tagName === 'textarea') {
        var valueProp = getANodeProp(element.aNode, 'value');
        if (valueProp) {
            htmlBufferPush(buf, escapeHTML(evalExpr(valueProp.expr, element.scope, element.owner)));
        }
    }
    else {
        var htmlDirective = element.aNode.directives.html;

        if (htmlDirective) {
            htmlBufferPush(buf, evalExpr(htmlDirective.value, element.scope, element.owner));
        }
        else {
            var aNodeChildren = element.aNode.children;
            for (var i = 0, l = aNodeChildren.length; i < l; i++) {
                var child = createNode(aNodeChildren[i], element);
                element.children.push(child);
                child._attachHTML(buf);
            }
        }
    }
}

exports = module.exports = genElementChildrenHTML;

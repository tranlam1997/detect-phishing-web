const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');


function generateDomTree(htmlFile) {
    var domTree = [];
    var {document: doc} = (new JSDOM(htmlFile)).window;
    var docBody = doc.body;
    var domTree = [];
    function buildDomTree(node, domTree) {
        if (node.hasChildNodes()) {
            for (var i = 0; i < node.childNodes.length; i++) {
                var childNode = node.childNodes[i];
                if (childNode.nodeType === doc.ELEMENT_NODE) {
                    var childNodeName = childNode.nodeName.toLowerCase();
                    var childNodeAttributes = childNode.attributes;
                    var childNodeAttributeNames = [];
                    var childNodeAttributeValues = [];
                    for (var j = 0; j < childNodeAttributes.length; j++) {
                        childNodeAttributeNames.push(childNodeAttributes[j].nodeName);
                        childNodeAttributeValues.push(childNodeAttributes[j].nodeValue);
                    }
                    var childNodeObject = {
                        name: childNodeName,
                        attributes: {
                            name: childNodeAttributeNames,
                            value: childNodeAttributeValues
                        }
                    }
                    domTree.push(childNodeObject);
                    buildDomTree(childNode, domTree);
                }
            }
        }
    }
    buildDomTree(docBody, domTree);
    return domTree;
}


const htmlFile = fs.readFileSync('./templates/index.html', 'utf8');
const domTree = generateDomTree(htmlFile);
module.exports = domTree;
